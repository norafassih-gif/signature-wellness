import { json } from './_lib/reponse.js';
import { db } from './_lib/firebase.js';
import { stripe } from './_lib/stripe.js';
import { confirmerRdv } from './_lib/confirmation.js';

// POST /api/stripe-webhook : Stripe previent le site quand un paiement aboutit ou expire.
// A declarer dans Stripe > Developpeurs > Webhooks avec les evenements
// checkout.session.completed, checkout.session.async_payment_succeeded et checkout.session.expired.
export async function POST(request) {
  const corps = await request.text();
  let evenement;
  try {
    evenement = stripe().webhooks.constructEvent(corps, request.headers.get('stripe-signature'), process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Signature webhook invalide :', err.message);
    return json({ erreur: 'Signature invalide' }, 400);
  }

  const session = evenement.data.object;
  try {
    switch (evenement.type) {
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded':
        await confirmerRdv(session);
        break;
      case 'checkout.session.expired': {
        const id = session.metadata?.rdv_id;
        if (id) {
          const ref = db().collection('appointments').doc(id);
          const snap = await ref.get();
          if (snap.exists && snap.data().status === 'en_attente') await ref.update({ status: 'expiré' });
        }
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.error(`Webhook ${evenement.type} :`, err);
    return json({ erreur: 'Traitement impossible' }, 500); // Stripe reessaiera
  }
  return json({ recu: true });
}
