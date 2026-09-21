import { JWT } from 'google-auth-library';
import { compteService } from './firebase.js';
import { CRENEAUX, CATEGORIES, FUSEAU, decalageParis } from './regles.js';

// Agenda de l'institut. Il doit etre partage avec l'adresse du compte de service
// (droit "Modifier les evenements") et l'API Google Calendar activee sur le projet.
const AGENDA_ID = process.env.GOOGLE_CALENDAR_ID || 'signature.wellnessagenda@gmail.com';
const API = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(AGENDA_ID)}/events`;

// Compte de service utilise pour l'agenda : celui du projet Google Cloud de l'agenda
// (GOOGLE_CALENDAR_SERVICE_ACCOUNT, JSON ou base64) s'il est fourni, sinon celui de Firebase.
function compteAgenda() {
  const brut = process.env.GOOGLE_CALENDAR_SERVICE_ACCOUNT;
  if (!brut) return compteService();
  const texte = brut.trim().startsWith('{') ? brut : Buffer.from(brut, 'base64').toString('utf8');
  return JSON.parse(texte);
}

async function appelGoogle(url, options = {}) {
  const c = compteAgenda();
  const client = new JWT({ email: c.client_email, key: c.private_key, scopes: ['https://www.googleapis.com/auth/calendar.events'] });
  const { token } = await client.getAccessToken();
  const res = await fetch(url, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error(`Google Calendar ${res.status} : ${await res.text()}`);
  return res.json();
}

// Nombre d'evenements de l'agenda Google qui chevauchent chaque creneau du jour.
// Les RDV crees par le site sont ignores (deja comptes dans Firestore).
export async function occupationAgenda(date) {
  const decalage = decalageParis(date);
  const debutJour = `${date}T00:00:00${decalage}`;
  const finJour = `${date}T23:59:59${decalage}`;
  const url = `${API}?singleEvents=true&maxResults=250&timeMin=${encodeURIComponent(debutJour)}&timeMax=${encodeURIComponent(finJour)}`;
  const { items = [] } = await appelGoogle(url);

  const occupation = Object.fromEntries(CRENEAUX.map(h => [h, 0]));
  for (const ev of items) {
    if (ev.status === 'cancelled' || ev.transparency === 'transparent') continue;
    if (ev.extendedProperties?.private?.sw_rdv) continue;
    if (!ev.start?.dateTime || !ev.end?.dateTime) continue; // evenement "journee entiere" : ignore
    const debut = new Date(ev.start.dateTime).getTime();
    const fin = new Date(ev.end.dateTime).getTime();
    for (const h of CRENEAUX) {
      const debutCreneau = new Date(`${date}T${h}:00${decalage}`).getTime();
      const finCreneau = debutCreneau + 60 * 60 * 1000;
      if (debut < finCreneau && fin > debutCreneau) occupation[h] += 1;
    }
  }
  return occupation;
}

const plusUneHeure = (h) => {
  const [hh, mm] = h.split(':').map(Number);
  return `${String(hh + 1).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
};

export async function creerEvenementRdv(id, rdv) {
  const { client } = rdv;
  const evenement = {
    summary: `RDV SW · ${client.prenom} ${client.nom} (${CATEGORIES[rdv.category] || rdv.category})`,
    location: "18 Rue d'Armenonville, 92200 Neuilly-sur-Seine",
    description: [
      `Cliente : ${client.prenom} ${client.nom}`,
      `Tél : ${client.tel}`,
      `Email : ${client.email}`,
      `Soin : ${CATEGORIES[rdv.category] || rdv.category}`,
      'Acompte 50 € payé par carte (Stripe), non remboursable',
    ].join('\n'),
    start: { dateTime: `${rdv.date}T${rdv.time}:00`, timeZone: FUSEAU },
    end: { dateTime: `${rdv.date}T${plusUneHeure(rdv.time)}:00`, timeZone: FUSEAU },
    extendedProperties: { private: { sw_rdv: id } },
    reminders: { useDefault: false, overrides: [{ method: 'popup', minutes: 60 }] },
  };
  const cree = await appelGoogle(API, { method: 'POST', body: JSON.stringify(evenement) });
  return cree.id;
}
