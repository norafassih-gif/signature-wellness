import { json } from './_lib/reponse.js';
import { placesRestantes } from './_lib/creneaux.js';
import { occupationAgenda } from './_lib/agenda.js';
import { dateReservable } from './_lib/regles.js';

// GET /api/disponibilites?date=AAAA-MM-JJ -> { creneaux: { "11:00": 1, ... } }
// Ne renvoie aucune donnee personnelle.
export async function GET(request) {
  const date = new URL(request.url).searchParams.get('date');
  if (!dateReservable(date)) return json({ creneaux: {} });
  try {
    const agenda = await occupationAgenda(date).catch((err) => {
      console.error('Agenda indisponible :', err.message);
      return null;
    });
    return json({ creneaux: await placesRestantes(date, { agenda }) });
  } catch (err) {
    console.error(err);
    return json({ erreur: 'Disponibilités indisponibles' }, 500);
  }
}
