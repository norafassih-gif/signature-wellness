import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import logo from '../assets/logoSW.png';

// --- CONFIGURATION DU CALENDRIER ---
const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const timeSlots = ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
const JOURS_OUVERTS = [2, 3, 4, 5, 6]; // mardi -> samedi (0 = dimanche)

const CATEGORY_LABELS = {
  postop: 'Post-opératoire',
  autre: 'Autre soin',
};

const CLE_BROUILLON = 'sw_reservation_client';
const lireBrouillon = () => {
  try { return JSON.parse(sessionStorage.getItem(CLE_BROUILLON)) || null; } catch { return null; }
};
const ecrireBrouillon = (client) => {
  try { sessionStorage.setItem(CLE_BROUILLON, JSON.stringify(client)); } catch { /* navigation privee */ }
};

const formatDate = (dateStr) =>
  new Date(dateStr + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

export default function Booking() {
  const [step, setStep] = useState(1);
  const [client, setClient] = useState(() => lireBrouillon() || { nom: '', prenom: '', email: '', tel: '' });
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [blockedDates, setBlockedDates] = useState([]);
  const [places, setPlaces] = useState({});
  const [chargementCreneaux, setChargementCreneaux] = useState(false);
  const [accepteConditions, setAccepteConditions] = useState(false);
  const [paiementEnCours, setPaiementEnCours] = useState(false);
  const [message, setMessage] = useState('');
  const [confirmation, setConfirmation] = useState(null); // { prenom, date, time, categorie }
  const [verification, setVerification] = useState(false);

  // Retour depuis Stripe : paiement reussi (?session_id=) ou abandonne (?annule=)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    const annule = params.get('annule');

    if (sessionId) {
      setVerification(true);
      fetch(`/api/statut-reservation?session_id=${encodeURIComponent(sessionId)}`)
        .then(r => r.json())
        .then(data => {
          if (data.paye) {
            setConfirmation(data);
            try { sessionStorage.removeItem(CLE_BROUILLON); } catch { /* rien */ }
          } else {
            setMessage("Le paiement n'a pas été finalisé. Vous pouvez choisir à nouveau votre créneau.");
            setStep(lireBrouillon() ? 2 : 1);
          }
        })
        .catch(() => setMessage("Nous n'avons pas pu vérifier le paiement. Si vous avez été débitée, contactez l'institut."))
        .finally(() => setVerification(false));
    } else if (annule) {
      fetch('/api/annuler-reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: annule }),
      }).catch(() => {});
      setMessage('Paiement annulé : le créneau a été libéré. Vous pouvez en choisir un autre.');
      if (lireBrouillon()) setStep(2);
    }
    if (sessionId || annule) window.history.replaceState({}, '', '/reservation');
  }, []);

  // Charge les dates bloquées (journée entière)
  useEffect(() => {
    const loadBlockedDates = async () => {
      try {
        const q = query(collection(db, "schedule_exceptions"), where("type", "==", "blocked"));
        const snapshot = await getDocs(q);
        setBlockedDates(snapshot.docs.map(doc => doc.data().date));
      } catch (err) { console.log(err); }
    };
    loadBlockedDates();
  }, []);

  // Places restantes du jour sélectionné (calculées par le serveur, agenda Google inclus)
  const chargerPlaces = async (date) => {
    setChargementCreneaux(true);
    try {
      const res = await fetch(`/api/disponibilites?date=${date}`);
      const data = await res.json();
      setPlaces(data.creneaux || {});
    } catch {
      setPlaces({});
      setMessage('Impossible de charger les créneaux, merci de réessayer.');
    } finally {
      setChargementCreneaux(false);
    }
  };

  useEffect(() => {
    if (selectedDate) chargerPlaces(selectedDate);
    else setPlaces({});
  }, [selectedDate]);

  // --- Une date antérieure à aujourd'hui n'est jamais réservable ---
  const estPasse = (dateObj) => {
    const aujourdhui = new Date();
    aujourdhui.setHours(0, 0, 0, 0);
    return dateObj < aujourdhui;
  };

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const handleDayClick = (day) => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const dayOfWeek = new Date(year, month, day).getDay();
    if (blockedDates.includes(dateStr) || !JOURS_OUVERTS.includes(dayOfWeek) || estPasse(new Date(year, month, day))) return;
    setSelectedDate(dateStr);
    setSelectedTime('');
    setSelectedCategory('');
  };

  const changeMonth = (offset) => {
    const newDate = new Date(viewDate.setMonth(viewDate.getMonth() + offset));
    setViewDate(new Date(newDate));
  };

  const handleClientChange = (e) => setClient({ ...client, [e.target.name]: e.target.value });
  const handleInfoSubmit = (e) => { e.preventDefault(); ecrireBrouillon(client); setMessage(''); setStep(2); };
  const handleDateSubmit = () => { if (selectedTime && selectedCategory) { setMessage(''); setStep(3); } };

  // --- Paiement de l'acompte : redirection vers Stripe Checkout ---
  const payerAcompte = async () => {
    if (!accepteConditions || paiementEnCours) return;
    setPaiementEnCours(true);
    setMessage('');
    try {
      const res = await fetch('/api/creer-paiement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client, date: selectedDate, time: selectedTime, category: selectedCategory, accepteConditions }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        ecrireBrouillon(client);
        window.location.href = data.url;
        return;
      }
      setMessage(data.erreur || 'Erreur technique, merci de réessayer.');
      if (data.complet) {
        setSelectedTime('');
        setStep(2);
        chargerPlaces(selectedDate);
      }
    } catch {
      setMessage('Connexion impossible, merci de réessayer.');
    }
    setPaiementEnCours(false);
  };

  // --- VÉRIFICATION DU PAIEMENT ---
  if (verification) {
    return (
      <div className="pt-40 pb-20 px-4 min-h-screen bg-white text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold">Vérification du paiement…</p>
      </div>
    );
  }

  // --- ECRAN DE SUCCÈS ---
  if (confirmation) {
    return (
      <div className="pt-40 pb-20 px-4 min-h-screen bg-white text-center animate-fade-in">
        <img loading="lazy" decoding="async" src={logo} alt="Signature Wellness" className="h-16 mx-auto mb-10" />
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-stone-50 text-stone-800 rounded-full flex items-center justify-center mx-auto mb-8 text-3xl border border-stone-100 italic font-serif">
            SW
          </div>
          <h1 className="text-3xl font-light uppercase tracking-[0.2em] text-stone-800 mb-6" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
            Rendez-vous Confirmé
          </h1>
          <p className="text-stone-500 font-light leading-relaxed mb-10">
            Merci de votre confiance, {confirmation.prenom}. <br />
            Votre acompte de 50 € a bien été réglé.
          </p>
          <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 text-left space-y-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold mb-2">Prestation & Horaire</p>
              <p className="text-stone-800 font-medium capitalize">
                {formatDate(confirmation.date)} à {confirmation.time}
              </p>
              <p className="text-stone-500 text-sm mt-1">{confirmation.categorie}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold mb-2">Lieu du rendez-vous</p>
              <p className="text-stone-800 font-medium leading-relaxed">
                18 Rue d'Armenonville<br />92200 Neuilly-sur-Seine
              </p>
            </div>
          </div>
          <button
            onClick={() => window.location.href = "/"}
            className="mt-12 text-[10px] uppercase tracking-[0.3em] text-stone-400 hover:text-stone-800 transition-colors duration-300"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const creneauxLibres = timeSlots.filter(t => (places[t] ?? 0) > 0);

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-stone-50 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light uppercase tracking-widest text-stone-800 mb-2" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>Réservation</h1>
          <p className="text-stone-400 text-[10px] font-bold tracking-[0.3em] uppercase">Étape {step} sur 3</p>
        </div>

        {message && (
          <div role="status" className="max-w-2xl mx-auto mb-6 bg-white border border-stone-200 text-stone-600 text-sm rounded-2xl px-5 py-4 text-center">
            {message}
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 overflow-hidden border border-stone-100 p-6 md:p-10">

          {/* ─── ÉTAPE 1 : Informations client ─── */}
          {step === 1 && (
            <form onSubmit={handleInfoSubmit} className="space-y-6 max-w-lg mx-auto">
              <h2 className="text-xl font-medium text-stone-800 text-center mb-8 uppercase tracking-widest text-sm">Vos informations</h2>
              <div className="grid grid-cols-2 gap-4">
                <input required name="prenom" placeholder="Prénom" value={client.prenom} onChange={handleClientChange} className="w-full p-4 bg-stone-50 rounded-xl border-none focus:ring-1 focus:ring-stone-200 outline-none text-sm" />
                <input required name="nom" placeholder="Nom" value={client.nom} onChange={handleClientChange} className="w-full p-4 bg-stone-50 rounded-xl border-none focus:ring-1 focus:ring-stone-200 outline-none text-sm" />
              </div>
              <input required name="email" type="email" placeholder="Email" value={client.email} onChange={handleClientChange} className="w-full p-4 bg-stone-50 rounded-xl border-none focus:ring-1 focus:ring-stone-200 outline-none text-sm" />
              <input required name="tel" type="tel" placeholder="Téléphone" value={client.tel} onChange={handleClientChange} className="w-full p-4 bg-stone-50 rounded-xl border-none focus:ring-1 focus:ring-stone-200 outline-none text-sm" />
              <button type="submit" className="w-full bg-stone-800 text-white py-4 rounded-xl font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-stone-700 transition-colors mt-4">Choisir mon créneau</button>
            </form>
          )}

          {/* ─── ÉTAPE 2 : Date + Créneau + Type de soin ─── */}
          {step === 2 && (
            <div className="flex flex-col md:flex-row gap-12">

              {/* Calendrier */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-sm font-bold text-stone-700 uppercase tracking-widest">{months[viewDate.getMonth()]} {viewDate.getFullYear()}</h2>
                  <div className="flex gap-4">
                    <button onClick={() => changeMonth(-1)} aria-label="Mois précédent" className="text-stone-400 hover:text-stone-800 transition-colors text-xl">←</button>
                    <button onClick={() => changeMonth(1)} aria-label="Mois suivant" className="text-stone-400 hover:text-stone-800 transition-colors text-xl">→</button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2 mb-4 text-center">
                  {daysOfWeek.map(d => <span key={d} className="text-[10px] font-bold text-stone-300 uppercase tracking-widest">{d}</span>)}
                </div>
                <div className="grid grid-cols-7 gap-3">
                  {Array.from({ length: getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth()) }).map((_, i) => <div key={`empty-${i}`} />)}
                  {Array.from({ length: getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth()) }).map((_, i) => {
                    const day = i + 1;
                    const dateStr = `${viewDate.getFullYear()}-${(viewDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                    const dateObj = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
                    const isClosed = !JOURS_OUVERTS.includes(dateObj.getDay());
                    const isBlocked = blockedDates.includes(dateStr) || isClosed || estPasse(dateObj);
                    const isSelected = selectedDate === dateStr;
                    return (
                      <button
                        key={day}
                        disabled={isBlocked}
                        onClick={() => handleDayClick(day)}
                        className={`h-10 w-10 rounded-full flex items-center justify-center text-xs transition-all duration-300 mx-auto
                          ${isSelected ? 'bg-stone-800 text-white shadow-lg scale-110 font-bold' : isBlocked ? 'text-stone-200 cursor-not-allowed' : 'text-stone-600 hover:bg-stone-100'}`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Créneaux + Type de soin */}
              <div className="flex-1 border-l border-stone-100 md:pl-10">
                {!selectedDate ? (
                  <div className="h-full flex flex-col items-center justify-center text-stone-300 opacity-50">
                    <p className="text-[10px] uppercase tracking-widest font-bold">Sélectionnez une date</p>
                  </div>
                ) : (
                  <div className="animate-fade-in">
                    <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-6 text-center">Créneaux disponibles</h3>
                    {chargementCreneaux ? (
                      <p className="text-center text-[10px] uppercase tracking-widest text-stone-300 font-bold py-8">Chargement…</p>
                    ) : creneauxLibres.length === 0 ? (
                      <p className="text-center text-sm text-stone-400 py-8">Plus aucun créneau ce jour-là.</p>
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        {creneauxLibres.map(time => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-3 rounded-lg text-xs font-bold tracking-wider transition-all border ${
                              selectedTime === time
                                ? 'bg-stone-800 text-white border-stone-800 shadow-md'
                                : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    )}

                    {selectedTime && (
                      <div className="mt-8 animate-fade-in">
                        <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4 text-center">Type de soin</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(CATEGORY_LABELS).map(([cle, label]) => (
                            <button
                              key={cle}
                              onClick={() => setSelectedCategory(cle)}
                              className={`px-3 py-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${
                                selectedCategory === cle
                                  ? 'bg-stone-800 text-white border-stone-800 shadow-md'
                                  : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
                              }`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleDateSubmit}
                      disabled={!selectedTime || !selectedCategory}
                      className={`w-full mt-8 py-4 rounded-xl font-bold uppercase text-[10px] tracking-[0.2em] transition-all ${
                        selectedTime && selectedCategory
                          ? 'bg-stone-800 text-white hover:bg-stone-700'
                          : 'bg-stone-100 text-stone-300 cursor-not-allowed'
                      }`}
                    >
                      Confirmer le créneau
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── ÉTAPE 3 : Récapitulatif & Paiement ─── */}
          {step === 3 && (
            <div className="text-center max-w-md mx-auto">
              <h2 className="text-sm font-bold text-stone-400 mb-10 uppercase tracking-[0.3em]">Récapitulatif & Acompte</h2>
              <div className="bg-stone-50 rounded-2xl p-8 mb-8 border border-stone-100">
                <p className="text-stone-800 font-bold text-sm uppercase tracking-widest mb-1 capitalize">
                  {formatDate(selectedDate)}
                </p>
                <p className="text-stone-500 text-4xl font-light mb-2">{selectedTime}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-8">
                  {CATEGORY_LABELS[selectedCategory]}
                </p>
                <div className="border-t border-stone-200 pt-6 flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Acompte</span>
                  <span className="font-bold text-stone-800">50,00 €</span>
                </div>
              </div>

              <label className="flex items-start gap-3 text-left text-xs text-stone-500 leading-relaxed mb-8 cursor-pointer">
                <input
                  type="checkbox"
                  checked={accepteConditions}
                  onChange={(e) => setAccepteConditions(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-stone-800 shrink-0"
                />
                <span>J'ai bien noté que l'acompte de 50 € est <strong className="text-stone-700">non remboursable</strong>, y compris en cas d'annulation ou d'absence.</span>
              </label>

              <button
                onClick={payerAcompte}
                disabled={!accepteConditions || paiementEnCours}
                className={`w-full py-4 rounded-xl font-bold uppercase text-[10px] tracking-[0.2em] transition-colors ${
                  accepteConditions && !paiementEnCours
                    ? 'bg-stone-800 text-white hover:bg-stone-700'
                    : 'bg-stone-100 text-stone-300 cursor-not-allowed'
                }`}
              >
                {paiementEnCours ? 'Redirection vers le paiement…' : "Payer l'acompte par carte"}
              </button>
              <button onClick={() => setStep(2)} className="mt-6 text-[10px] uppercase tracking-[0.3em] text-stone-400 hover:text-stone-800 transition-colors">
                Modifier le créneau
              </button>
              <p className="mt-8 text-[10px] text-stone-300 uppercase tracking-widest">Paiement sécurisé par carte bancaire via Stripe</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
