// Regles de reservation validees par la cliente (09/2026)
export const CRENEAUX = ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
export const JOURS_OUVERTS = [2, 3, 4, 5, 6]; // mardi -> samedi (0 = dimanche)
export const CAPACITE_PAR_DEFAUT = 1; // 1 RDV par creneau, places en plus ouvertes a la main dans /admin
export const ACOMPTE_CENTIMES = 5000;
export const DUREE_SESSION_STRIPE_MIN = 30; // minimum impose par Stripe
export const DUREE_BLOCAGE_MIN = 32; // le creneau reste reserve un peu plus longtemps que la session
export const CATEGORIES = { postop: 'Post-opératoire', autre: 'Autre soin' };
export const FUSEAU = 'Europe/Paris';

// Date du jour a Paris, format AAAA-MM-JJ
export function aujourdhuiParis() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: FUSEAU }).format(new Date());
}

// Heure actuelle a Paris, format HH:MM
export function heureParis() {
  return new Intl.DateTimeFormat('fr-FR', { timeZone: FUSEAU, hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
}

// Decalage horaire de Paris pour une date donnee, ex. "+02:00"
export function decalageParis(date) {
  const nom = new Intl.DateTimeFormat('en-US', { timeZone: FUSEAU, timeZoneName: 'longOffset' })
    .formatToParts(new Date(`${date}T12:00:00Z`))
    .find(p => p.type === 'timeZoneName').value; // "GMT+02:00"
  return nom === 'GMT' ? '+00:00' : nom.replace('GMT', '');
}

export function jourSemaine(date) {
  return new Date(`${date}T12:00:00Z`).getUTCDay();
}

export function dateReservable(date) {
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  if (Number.isNaN(new Date(`${date}T12:00:00Z`).getTime())) return false;
  if (date < aujourdhuiParis()) return false;
  return JOURS_OUVERTS.includes(jourSemaine(date));
}

export function dateLisible(date) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' });
}
