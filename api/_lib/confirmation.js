import { FieldValue } from 'firebase-admin/firestore';
import { db } from './firebase.js';
import { creerEvenementRdv } from './agenda.js';

const DELAI_RESERVATION_AGENDA_MS = 2 * 60 * 1000;

// Confirme le RDV lie a une session Stripe payee, puis l'ajoute a Google Calendar.
// Appelee par le webhook ET par la page de retour : le travail n'est jamais fait deux fois.
export async function confirmerRdv(session) {
  if (session.payment_status !== 'paid') return null;
  const id = session.metadata?.rdv_id;
  if (!id) throw new Error(`Session ${session.id} sans rdv_id`);

  const fs = db();
  const ref = fs.collection('appointments').doc(id);
  const maintenant = Date.now();

  const { rdv, creerEvenement } = await fs.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const existant = snap.exists ? snap.data() : null;
    const agendaEnCours = (existant?.gcal_en_cours ?? 0) > maintenant - DELAI_RESERVATION_AGENDA_MS;
    const creer = !existant?.gcal_event_id && !agendaEnCours;

    if (existant?.status === 'confirmé') {
      if (creer) tx.update(ref, { gcal_en_cours: maintenant });
      return { rdv: existant, creerEvenement: creer };
    }

    const m = session.metadata;
    const base = existant || {
      client: { prenom: m.prenom, nom: m.nom, email: m.email, tel: m.tel },
      date: m.date, time: m.time, category: m.category, source: 'site',
      created_at: FieldValue.serverTimestamp(),
    };
    const maj = {
      ...base,
      status: 'confirmé',
      paid: true,
      paid_at: FieldValue.serverTimestamp(),
      acompte: session.amount_total / 100,
      stripe_session_id: session.id,
      stripe_payment_intent: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id ?? null,
      expires_at: FieldValue.delete(),
      ...(creer ? { gcal_en_cours: maintenant } : {}),
    };
    tx.set(ref, maj, { merge: true });
    return { rdv: { ...base, status: 'confirmé' }, creerEvenement: creer };
  });

  if (creerEvenement) {
    try {
      const eventId = await creerEvenementRdv(id, rdv);
      await ref.update({ gcal_event_id: eventId, gcal_en_cours: FieldValue.delete(), gcal_erreur: FieldValue.delete() });
      rdv.gcal_event_id = eventId;
    } catch (err) {
      console.error('Google Calendar :', err.message);
      await ref.update({ gcal_en_cours: FieldValue.delete(), gcal_erreur: err.message.slice(0, 300) });
    }
  }
  return { id, ...rdv };
}
