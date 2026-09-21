import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// FIREBASE_SERVICE_ACCOUNT : le contenu du fichier JSON du compte de service
// (colle tel quel dans Vercel), ou ce meme contenu encode en base64.
export function compteService() {
  const brut = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!brut) throw new Error('Variable FIREBASE_SERVICE_ACCOUNT manquante');
  const texte = brut.trim().startsWith('{') ? brut : Buffer.from(brut, 'base64').toString('utf8');
  return JSON.parse(texte);
}

export function db() {
  if (!getApps().length) initializeApp({ credential: cert(compteService()) });
  return getFirestore();
}
