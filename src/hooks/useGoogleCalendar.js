import { useState, useEffect } from 'react';

// ─── À REMPLACER avec ton Client ID Google Cloud Console ───────────────────
// Instructions : https://console.cloud.google.com/apis/credentials
// Type : "Application Web" → copie le Client ID ci-dessous
const GOOGLE_CLIENT_ID = '628850780902-ho4dc3bqkogtl5anovjsc99g5acdds79.apps.googleusercontent.com';

// ID du calendrier cible (utilise 'primary' pour le calendrier principal)
const CALENDAR_ID = 'primary';

const SCOPE = 'https://www.googleapis.com/auth/calendar.events';
const TOKEN_KEY = 'gcal_access_token';
const TOKEN_EXPIRY_KEY = 'gcal_token_expiry';

// ─── Utilitaires token ──────────────────────────────────────────────────────

const saveToken = (accessToken) => {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(TOKEN_EXPIRY_KEY, (Date.now() + 3500 * 1000).toString());
};

const getValidToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiry = parseInt(localStorage.getItem(TOKEN_EXPIRY_KEY) || '0');
  if (token && Date.now() < expiry) return token;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
  return null;
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
};

const addOneHour = (timeStr) => {
  const [h, m] = timeStr.split(':').map(Number);
  return `${String(h + 1).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

// ─── Hook principal ─────────────────────────────────────────────────────────

export default function useGoogleCalendar() {
  const [isConnected, setIsConnected] = useState(!!getValidToken());
  const [tokenClient, setTokenClient] = useState(null);
  const [scriptReady, setScriptReady] = useState(false);

  // Attends que le script GIS soit chargé
  useEffect(() => {
    const check = setInterval(() => {
      if (window.google?.accounts?.oauth2) {
        clearInterval(check);
        setScriptReady(true);
      }
    }, 100);
    return () => clearInterval(check);
  }, []);

  // Initialise le token client dès que le script est prêt
  useEffect(() => {
    if (!scriptReady) return;
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: SCOPE,
      callback: (response) => {
        if (response.access_token) {
          saveToken(response.access_token);
          setIsConnected(true);
        }
      },
    });
    setTokenClient(client);
  }, [scriptReady]);

  // Connexion — DOIT être appelé depuis un onClick direct (sinon popup bloqué)
  const connect = () => {
    if (!tokenClient) {
      alert('Le script Google n\'est pas encore chargé. Réessaie dans quelques secondes.');
      return;
    }
    tokenClient.requestAccessToken();
  };

  // Déconnexion
  const disconnect = () => {
    const token = getValidToken();
    if (token && window.google?.accounts?.oauth2) {
      window.google.accounts.oauth2.revoke(token, () => {});
    }
    clearToken();
    setIsConnected(false);
  };

  // Ré-authentifie si le token a expiré (retourne une Promise)
  const ensureToken = () => {
    return new Promise((resolve, reject) => {
      const existing = getValidToken();
      if (existing) { resolve(existing); return; }
      if (!tokenClient) { reject(new Error('Non initialisé')); return; }
      // Patch temporaire du callback pour récupérer le token
      const originalCallback = tokenClient.callback;
      tokenClient.callback = (response) => {
        tokenClient.callback = originalCallback;
        if (response.access_token) {
          saveToken(response.access_token);
          setIsConnected(true);
          resolve(response.access_token);
        } else {
          reject(new Error('Authentification annulée'));
        }
      };
      tokenClient.requestAccessToken({ prompt: '' }); // silent si session active
    });
  };

  // Crée un événement Google Calendar pour un rendez-vous Firestore
  const syncAppointment = async (apt) => {
    const token = await ensureToken();

    const event = {
      summary: `RDV SW — ${apt.client.prenom} ${apt.client.nom}`,
      location: "18 Rue d'Armenonville, 92200 Neuilly-sur-Seine",
      description: `Client : ${apt.client.prenom} ${apt.client.nom}\nTél : ${apt.client.tel}\nEmail : ${apt.client.email}\nStatut : Confirmé — Acompte payé`,
      start: {
        dateTime: `${apt.date}T${apt.time}:00`,
        timeZone: 'Europe/Paris',
      },
      end: {
        dateTime: `${apt.date}T${addOneHour(apt.time)}:00`,
        timeZone: 'Europe/Paris',
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 60 },
        ],
      },
    };

    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      if (res.status === 401) {
        clearToken();
        setIsConnected(false);
        throw new Error('Session Google expirée. Reconnecte-toi.');
      }
      throw new Error(err.error?.message || 'Erreur Google Calendar');
    }

    const created = await res.json();
    return created.id;
  };

  // Récupère les événements Google Calendar des 3 prochains mois
  const fetchCalendarEvents = async () => {
    const token = await ensureToken();
    const timeMin = new Date().toISOString();
    const timeMax = new Date(Date.now() + 90 * 24 * 3600 * 1000).toISOString();

    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true&orderBy=startTime`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!res.ok) {
      const err = await res.json();
      if (res.status === 401) { clearToken(); setIsConnected(false); }
      throw new Error(err.error?.message || 'Erreur Google Calendar');
    }

    const data = await res.json();
    return data.items || [];
  };

  return { isConnected, connect, disconnect, syncAppointment, fetchCalendarEvents };
}
