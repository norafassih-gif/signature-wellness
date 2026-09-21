import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { json } from './_lib/reponse.js';
import { db } from './_lib/firebase.js';
import { stripe } from './_lib/stripe.js';
import { placesRestantes } from './_lib/creneaux.js';
import { occupationAgenda } from './_lib/agenda.js';
import {
  ACOMPTE_CENTIMES, CATEGORIES, CRENEAUX, DUREE_BLOCAGE_MIN, DUREE_SESSION_STRIPE_MIN,
  dateLisible, dateReservable,
} from './_lib/regles.js';

const texte = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

// POST /api/creer-paiement
// Reserve le creneau 30 min (statut "en_attente") puis renvoie l'URL de paiement Stripe.
export async function POST(request) {
  let corps;
  try { corps = await request.json(); } catch { return json({ erreur: 'Requête invalide' }, 400); }

  const client = {
    prenom: texte(corps?.client?.prenom, 60),
    nom: texte(corps?.client?.nom, 60),
    email: texte(corps?.client?.email, 120).toLowerCase(),
    tel: texte(corps?.client?.tel, 30),
  };
  const { date, time, category, accepteConditions } = corps || {};

  if (!client.prenom || !client.nom || !client.tel || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client.email)) {
    return json({ erreur: 'Merci de compléter vos coordonnées.' }, 400);
  }
  if (!dateReservable(date) || !CRENEAUX.includes(time) || !CATEGORIES[category]) {
    return json({ erreur: 'Créneau invalide.' }, 400);
  }
  if (accepteConditions !== true) {
    return json({ erreur: "Merci d'accepter les conditions de l'acompte." }, 400);
  }

  const fs = db();
  const ref = fs.collection('appointments').doc();

  try {
    const agenda = await occupationAgenda(date).catch((err) => {
      console.error('Agenda indisponible :', err.message);
      return null;
    });
    // Transaction : deux clientes ne peuvent pas prendre la derniere place en meme temps.
    await fs.runTransaction(async (tx) => {
      const places = await placesRestantes(date, { transaction: tx, agenda });
      if ((places[time] ?? 0) < 1) throw new Error('COMPLET');
      tx.set(ref, {
        client, date, time, category,
        status: 'en_attente',
        paid: false,
        source: 'site',
        created_at: FieldValue.serverTimestamp(),
        expires_at: Timestamp.fromMillis(Date.now() + DUREE_BLOCAGE_MIN * 60 * 1000),
      });
    });
  } catch (err) {
    if (err.message === 'COMPLET') {
      return json({ erreur: "Ce créneau vient d'être réservé. Merci d'en choisir un autre.", complet: true }, 409);
    }
    console.error(err);
    return json({ erreur: 'Erreur technique, merci de réessayer.' }, 500);
  }

  try {
    const origine = process.env.SITE_URL || new URL(request.url).origin;
    const session = await stripe().checkout.sessions.create({
      mode: 'payment',
      locale: 'fr',
      customer_email: client.email,
      client_reference_id: ref.id,
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: ACOMPTE_CENTIMES,
          product_data: {
            name: 'Acompte de réservation · Signature Wellness',
            description: `${dateLisible(date)} à ${time} · ${CATEGORIES[category]}`,
          },
        },
      }],
      metadata: { rdv_id: ref.id, date, time, category, ...client },
      payment_intent_data: {
        description: `Acompte RDV ${date} ${time} · ${client.prenom} ${client.nom}`,
        metadata: { rdv_id: ref.id },
      },
      custom_text: { submit: { message: "L'acompte de 50 € est non remboursable." } },
      expires_at: Math.floor(Date.now() / 1000) + DUREE_SESSION_STRIPE_MIN * 60,
      success_url: `${origine}/reservation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origine}/reservation?annule=${ref.id}`,
    });
    await ref.update({ stripe_session_id: session.id });
    return json({ url: session.url });
  } catch (err) {
    console.error('Stripe :', err.message);
    await ref.delete().catch(() => {});
    return json({ erreur: 'Le paiement est momentanément indisponible.' }, 502);
  }
}
