import { json } from './_lib/reponse.js';
import { stripe } from './_lib/stripe.js';
import { confirmerRdv } from './_lib/confirmation.js';
import { CATEGORIES } from './_lib/regles.js';

// GET /api/statut-reservation?session_id=cs_... : utilise par la page de retour apres paiement.
// Si le webhook n'est pas encore passe, la confirmation est faite ici.
export async function GET(request) {
  const id = new URL(request.url).searchParams.get('session_id');
  if (!id || !/^cs_[A-Za-z0-9_]+$/.test(id)) return json({ erreur: 'Session invalide' }, 400);
  try {
    const session = await stripe().checkout.sessions.retrieve(id);
    if (session.payment_status !== 'paid') return json({ paye: false });
    await confirmerRdv(session);
    const m = session.metadata;
    return json({ paye: true, prenom: m.prenom, date: m.date, time: m.time, categorie: CATEGORIES[m.category] || '' });
  } catch (err) {
    console.error(err);
    return json({ erreur: 'Vérification impossible' }, 500);
  }
}
