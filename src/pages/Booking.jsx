import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import PaymentButton from '../components/PaymentButton';
import emailjs from '@emailjs/browser';
import logo from '../assets/logoSW.png';

// --- CONFIGURATION DU CALENDRIER ---
const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const timeSlots = ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

// --- DISPONIBILITÉS PAR JOUR (0=Dim, 1=Lun, ..., 6=Sam) ---
// null = fermé
const DAY_SLOTS = {
  0: null,                       // Dimanche — fermé
  1: null,                       // Lundi — fermé
  2: { postop: 2, autre: 1 },   // Mardi
  3: { postop: 1, autre: 1 },   // Mercredi
  4: { postop: 2, autre: 1 },   // Jeudi
  5: { postop: 1, autre: 1 },   // Vendredi
  6: { postop: 2, autre: 1 },   // Samedi
};

const CATEGORY_LABELS = {
  postop: 'Post-opératoire',
  autre: 'Autre',
};

export default function Booking() {
  const [step, setStep] = useState(1);
  const [client, setClient] = useState({ nom: '', prenom: '', email: '', tel: '' });
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [blockedDates, setBlockedDates] = useState([]);
  const [dayAppointments, setDayAppointments] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);

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

  // Charge les RDV du jour sélectionné pour calculer les disponibilités
  useEffect(() => {
    if (!selectedDate) { setDayAppointments([]); return; }
    const loadDayAppts = async () => {
      try {
        const q = query(collection(db, "appointments"), where("date", "==", selectedDate));
        const snapshot = await getDocs(q);
        setDayAppointments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) { console.log(err); }
    };
    loadDayAppts();
  }, [selectedDate]);

  // --- Calcule les places restantes pour un créneau donné ---
  const getSlotAvailability = (time) => {
    if (!selectedDate) return null;
    const dayOfWeek = new Date(selectedDate + 'T12:00:00').getDay();
    const config = DAY_SLOTS[dayOfWeek];
    if (!config) return null;

    // Créneau bloqué par l'admin ?
    const adminBlocked = dayAppointments.some(a => a.time === time && a.status === 'BLOQUÉ_ADMIN');
    if (adminBlocked) return null;

    const appts = dayAppointments.filter(a => a.time === time && a.status !== 'BLOQUÉ_ADMIN');
    return {
      postop: Math.max(0, config.postop - appts.filter(a => a.category === 'postop').length),
      autre:  Math.max(0, config.autre  - appts.filter(a => a.category === 'autre').length),
    };
  };

  // --- ENVOI DE L'EMAIL DE CONFIRMATION ---
  const sendConfirmationEmail = () => {
    const templateParams = {
      to_name: `${client.prenom} ${client.nom}`,
      to_email: client.email,
      date: new Date(selectedDate + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }),
      time: selectedTime,
      category: CATEGORY_LABELS[selectedCategory] || selectedCategory,
      address: "18 Rue d'Armenonville, 92200 Neuilly-sur-Seine",
      reply_to: "signature.wellnessagenda@gmail.com"
    };
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY')
      .then(() => console.log("Email envoyé !"))
      .catch(err => console.log("Erreur email :", err));
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
    if (blockedDates.includes(dateStr) || !DAY_SLOTS[dayOfWeek]) return;
    setSelectedDate(dateStr);
    setSelectedTime('');
    setSelectedCategory('');
  };

  const changeMonth = (offset) => {
    const newDate = new Date(viewDate.setMonth(viewDate.getMonth() + offset));
    setViewDate(new Date(newDate));
  };

  const handleClientChange = (e) => setClient({ ...client, [e.target.name]: e.target.value });
  const handleInfoSubmit = (e) => { e.preventDefault(); setStep(2); };
  const handleDateSubmit = () => { if (selectedTime && selectedCategory) setStep(3); };

  const handleSuccessPayment = async () => {
    try {
      await addDoc(collection(db, "appointments"), {
        client,
        date: selectedDate,
        time: selectedTime,
        category: selectedCategory,
        status: "confirmé",
        paid: true,
        created_at: new Date()
      });
      sendConfirmationEmail();
      setIsConfirmed(true);
    } catch (error) {
      console.error(error);
      alert("Erreur technique lors de l'enregistrement.");
    }
  };

  // --- ECRAN DE SUCCÈS ---
  if (isConfirmed) {
    return (
      <div className="pt-40 pb-20 px-4 min-h-screen bg-white text-center animate-fade-in">
        <img src={logo} alt="Signature Wellness" className="h-16 mx-auto mb-10" />
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-stone-50 text-stone-800 rounded-full flex items-center justify-center mx-auto mb-8 text-3xl border border-stone-100 italic font-serif">
            SW
          </div>
          <h1 className="text-3xl font-light uppercase tracking-[0.2em] text-stone-800 mb-6" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
            Rendez-vous Confirmé
          </h1>
          <p className="text-stone-500 font-light leading-relaxed mb-10">
            Merci de votre confiance, {client.prenom}. <br />
            Un récapitulatif détaillé vous a été envoyé par e-mail.
          </p>
          <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 text-left space-y-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold mb-2">Prestation & Horaire</p>
              <p className="text-stone-800 font-medium capitalize">
                {new Date(selectedDate + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} à {selectedTime}
              </p>
              <p className="text-stone-500 text-sm mt-1">{CATEGORY_LABELS[selectedCategory]}</p>
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

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-stone-50 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light uppercase tracking-widest text-stone-800 mb-2" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>Réservation</h1>
          <p className="text-stone-400 text-[10px] font-bold tracking-[0.3em] uppercase">Étape {step} sur 3</p>
        </div>

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

          {/* ─── ÉTAPE 2 : Date + Créneau + Catégorie ─── */}
          {step === 2 && (
            <div className="flex flex-col md:flex-row gap-12">

              {/* Calendrier */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-sm font-bold text-stone-700 uppercase tracking-widest">{months[viewDate.getMonth()]} {viewDate.getFullYear()}</h2>
                  <div className="flex gap-4">
                    <button onClick={() => changeMonth(-1)} className="text-stone-400 hover:text-stone-800 transition-colors text-xl">←</button>
                    <button onClick={() => changeMonth(1)} className="text-stone-400 hover:text-stone-800 transition-colors text-xl">→</button>
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
                    const isClosed = !DAY_SLOTS[dateObj.getDay()];
                    const isBlocked = blockedDates.includes(dateStr) || isClosed;
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

              {/* Créneaux + Catégories */}
              <div className="flex-1 border-l border-stone-100 md:pl-10">
                {!selectedDate ? (
                  <div className="h-full flex flex-col items-center justify-center text-stone-300 opacity-50">
                    <p className="text-[10px] uppercase tracking-widest font-bold">Sélectionnez une date</p>
                  </div>
                ) : (
                  <div className="animate-fade-in">
                    <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-6 text-center">Créneaux disponibles</h3>
                    <div className="space-y-3">
                      {timeSlots.map(time => {
                        const avail = getSlotAvailability(time);
                        if (!avail || (avail.postop === 0 && avail.autre === 0)) return null;
                        return (
                          <div key={time} className="border border-stone-100 rounded-xl p-3 bg-stone-50/50">
                            <p className="text-xs font-bold text-stone-700 mb-2">{time}</p>
                            <div className="flex flex-wrap gap-2">
                              {avail.postop > 0 && (
                                <button
                                  onClick={() => { setSelectedTime(time); setSelectedCategory('postop'); }}
                                  className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${
                                    selectedTime === time && selectedCategory === 'postop'
                                      ? 'bg-stone-800 text-white border-stone-800 shadow-md'
                                      : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
                                  }`}
                                >
                                  Post-opératoire
                                  <span className="ml-1 opacity-60">({avail.postop})</span>
                                </button>
                              )}
                              {avail.autre > 0 && (
                                <button
                                  onClick={() => { setSelectedTime(time); setSelectedCategory('autre'); }}
                                  className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${
                                    selectedTime === time && selectedCategory === 'autre'
                                      ? 'bg-stone-800 text-white border-stone-800 shadow-md'
                                      : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
                                  }`}
                                >
                                  Autre
                                  <span className="ml-1 opacity-60">({avail.autre})</span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
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
              <div className="bg-stone-50 rounded-2xl p-8 mb-10 border border-stone-100">
                <p className="text-stone-800 font-bold text-sm uppercase tracking-widest mb-1 capitalize">
                  {new Date(selectedDate + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
                <p className="text-stone-500 text-4xl font-light mb-2">{selectedTime}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-8">
                  {CATEGORY_LABELS[selectedCategory]}
                </p>
                <div className="border-t border-stone-200 pt-6 flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Acompte sécurisé</span>
                  <span className="font-bold text-stone-800">50,00 €</span>
                </div>
              </div>
              <PaymentButton amount="50.00" onSuccess={handleSuccessPayment} />
              <p className="mt-8 text-[10px] text-stone-300 uppercase tracking-widest">Paiement 100% sécurisé via PayPal</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
