import { json } from './_lib/reponse.js';
import { db } from './_lib/firebase.js';
import { stripe } from './_lib/stripe.js';

// POST /api/annuler-reservation { id } : la cliente a quitte la page de paiement,
// on libere tout de suite le creneau (au lieu d'attendre 30 min).
export async function POST(request) {
  let id;
  try { ({ id } = await request.json()); } catch { return json({ erreur: 'Requête invalide' }, 400); }
  if (typeof id !== 'string' || !/^[A-Za-z0-9]{10,40}$/.test(id)) return json({ erreur: 'Identifiant invalide' }, 400);

  const ref = db().collection('appointments').doc(id);
  const snap = await ref.get();
  if (!snap.exists || snap.data().status !== 'en_attente') return json({ libere: false });

  const sessionId = snap.data().stripe_session_id;
  if (sessionId) {
    try {
      const session = await stripe().checkout.sessions.retrieve(sessionId);
      if (session.payment_status === 'paid') return json({ libere: false });
      if (session.status === 'open') await stripe().checkout.sessions.expire(sessionId);
    } catch (err) {
      console.error('Stripe :', err.message);
      return json({ libere: false });
    }
  }
  await ref.update({ status: 'annulé' });
  return json({ libere: true });
}
