import Stripe from 'stripe';

let instance;
export function stripe() {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error('Variable STRIPE_SECRET_KEY manquante');
  if (!instance) instance = new Stripe(process.env.STRIPE_SECRET_KEY);
  return instance;
}
