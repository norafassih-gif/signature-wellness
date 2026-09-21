import { db } from './firebase.js';
import { CRENEAUX, CAPACITE_PAR_DEFAUT, aujourdhuiParis, heureParis, dateReservable } from './regles.js';

// Un RDV "occupe" une place s'il est confirme, ou en attente de paiement et pas encore expire.
function occupePlace(rdv, maintenant) {
  if (rdv.status === 'confirmé') return true;
  if (rdv.status === 'en_attente') return (rdv.expires_at?.toMillis?.() ?? 0) > maintenant;
  return false;
}

// Places restantes par creneau pour une date : { "11:00": 1, "12:00": 0, ... }
// `transaction` (facultatif) : lectures faites dans une transaction Firestore.
// `agenda` : occupation issue de Google Calendar (ou null si indisponible).
export async function placesRestantes(date, { transaction = null, agenda = null } = {}) {
  const vide = Object.fromEntries(CRENEAUX.map(h => [h, 0]));
  if (!dateReservable(date)) return vide;

  const fs = db();
  const lire = (q) => (transaction ? transaction.get(q) : q.get());
  const [rdvSnap, exceptionsSnap] = await Promise.all([
    lire(fs.collection('appointments').where('date', '==', date)),
    lire(fs.collection('schedule_exceptions').where('date', '==', date)),
  ]);
  const exceptions = exceptionsSnap.docs.map(d => d.data());
  if (exceptions.some(e => e.type === 'blocked')) return vide;

  const rdvs = rdvSnap.docs.map(d => d.data());
  const maintenant = Date.now();
  const estAujourdhui = date === aujourdhuiParis();
  const heure = heureParis();

  const places = {};
  for (const h of CRENEAUX) {
    if (estAujourdhui && h <= heure) { places[h] = 0; continue; }
    if (rdvs.some(r => r.time === h && r.status === 'BLOQUÉ_ADMIN')) { places[h] = 0; continue; }
    const capacite = CAPACITE_PAR_DEFAUT + exceptions.filter(e => e.type === 'place_en_plus' && e.time === h).length;
    const occupees = rdvs.filter(r => r.time === h && occupePlace(r, maintenant)).length + (agenda?.[h] ?? 0);
    places[h] = Math.max(0, capacite - occupees);
  }
  return places;
}
