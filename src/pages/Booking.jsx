import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import PaymentButton from '../components/PaymentButton';

// --- CONFIGURATION DU CALENDRIER ---
const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export default function Booking() {
  const [step, setStep] = useState(1);
  const [client, setClient] = useState({ nom: '', prenom: '', email: '', tel: '' });
  
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [blockedDates, setBlockedDates] = useState([]);

  const timeSlots = ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  useEffect(() => {
    const loadBlockedDates = async () => {
      try {
        const q = query(collection(db, "schedule_exceptions"), where("type", "==", "blocked"));
        const snapshot = await getDocs(q);
        const dates = snapshot.docs.map(doc => doc.data().date);
        setBlockedDates(dates);
      } catch (err) { console.log(err); }
    };
    loadBlockedDates();
  }, []);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; 
  };

  const handleDayClick = (day) => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const dateObj = new Date(year, month, day);
    const dayOfWeek = dateObj.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 1) return; // Fermé Dimanche/Lundi

    const formattedDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    if (blockedDates.includes(formattedDate)) return;
    
    setSelectedDate(formattedDate);
    setSelectedTime('');
  };

  const changeMonth = (offset) => {
    const newDate = new Date(viewDate.setMonth(viewDate.getMonth() + offset));
    setViewDate(new Date(newDate));
  };

  const handleClientChange = (e) => setClient({ ...client, [e.target.name]: e.target.value });
  const handleInfoSubmit = (e) => { e.preventDefault(); setStep(2); };
  const handleDateSubmit = (e) => { e.preventDefault(); setStep(3); };
  
  // --- VERSION SANS EMAIL (Sécurisée) ---
  const handleSuccessPayment = async () => {
    try {
      // On sauvegarde juste dans la base de données
      await addDoc(collection(db, "appointments"), {
        client, date: selectedDate, time: selectedTime, status: "confirmé", paid: true, created_at: new Date()
      });

      alert(`Merci ${client.prenom} ! Votre RDV est confirmé et enregistré.`);
      window.location.href = "/";
    } catch (error) { 
      console.error(error);
      alert("Erreur technique lors de l'enregistrement."); 
    }
  };

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-stone-50 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light uppercase tracking-widest text-stone-800 mb-2">Réservation</h1>
          <p className="text-stone-500 text-xs font-bold tracking-widest uppercase">Étape {step} sur 3</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 overflow-hidden border border-stone-100 p-6 md:p-10">
          
          {step === 1 && (
            <form onSubmit={handleInfoSubmit} className="space-y-6 fade-in max-w-lg mx-auto">
              <h2 className="text-xl font-medium text-stone-800 text-center mb-8">Vos informations</h2>
              <div className="grid grid-cols-2 gap-4">
                <input required name="prenom" placeholder="Prénom" value={client.prenom} onChange={handleClientChange} className="w-full p-4 bg-stone-50 rounded-xl border-none" />
                <input required name="nom" placeholder="Nom" value={client.nom} onChange={handleClientChange} className="w-full p-4 bg-stone-50 rounded-xl border-none" />
              </div>
              <input required name="email" type="email" placeholder="Email" value={client.email} onChange={handleClientChange} className="w-full p-4 bg-stone-50 rounded-xl border-none" />
              <input required name="tel" type="tel" placeholder="Téléphone" value={client.tel} onChange={handleClientChange} className="w-full p-4 bg-stone-50 rounded-xl border-none" />
              <button type="submit" className="w-full bg-stone-800 text-white py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-stone-700 mt-4">Choisir mon créneau</button>
            </form>
          )}

          {step === 2 && (
            <div className="flex flex-col md:flex-row gap-12 fade-in">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-stone-700 uppercase tracking-wide">{months[viewDate.getMonth()]} {viewDate.getFullYear()}</h2>
                  <div className="flex gap-2">
                    <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-stone-100 rounded-full text-stone-500">←</button>
                    <button onClick={() => changeMonth(1)} className="p-2 hover:bg-stone-100 rounded-full text-stone-500">→</button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-2 text-center">
                  {daysOfWeek.map(d => <span key={d} className="text-xs font-bold text-stone-400 uppercase">{d}</span>)}
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth()) }).map((_, i) => <div key={`empty-${i}`} />)}
                  
                  {Array.from({ length: getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth()) }).map((_, i) => {
                    const day = i + 1;
                    const year = viewDate.getFullYear();
                    const month = viewDate.getMonth();
                    
                    const dateObj = new Date(year, month, day);
                    const dayOfWeek = dateObj.getDay();
                    const isWeekendClosed = dayOfWeek === 0 || dayOfWeek === 1;

                    const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                    const isBlockedAdmin = blockedDates.includes(dateStr);
                    const isBlocked = isBlockedAdmin || isWeekendClosed;
                    const isSelected = selectedDate === dateStr;

                    return (
                      <button
                        key={day}
                        onClick={() => handleDayClick(day)}
                        disabled={isBlocked}
                        className={`
                          h-10 w-10 rounded-full flex items-center justify-center text-sm transition-all duration-200 mx-auto
                          ${isSelected 
                            ? 'bg-stone-800 text-white shadow-md transform scale-110 font-bold' 
                            : isBlocked 
                              ? 'text-stone-300 bg-stone-100 cursor-not-allowed opacity-50' 
                              : 'text-stone-600 hover:bg-stone-200 font-medium'}
                        `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex-1 border-l border-stone-100 md:pl-10 pt-6 md:pt-0">
                 {!selectedDate ? (
                   <div className="h-full flex flex-col items-center justify-center text-stone-300 space-y-4">
                     <span className="text-4xl">📅</span>
                     <p className="text-sm">Sélectionnez une date</p>
                   </div>
                 ) : (
                   <div className="animate-fade-in-up">
                     <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-6">Horaires le {new Date(selectedDate).toLocaleDateString('fr-FR')}</h3>
                     <div className="grid grid-cols-2 gap-3">
                       {timeSlots.map(time => (
                         <button key={time} onClick={() => setSelectedTime(time)} className={`py-3 px-4 rounded-xl text-sm font-medium transition-all border ${selectedTime === time ? 'bg-stone-700 text-white' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'}`}>{time}</button>
                       ))}
                     </div>
                     <button onClick={handleDateSubmit} disabled={!selectedTime} className={`w-full mt-10 py-4 rounded-xl font-bold uppercase text-xs tracking-widest transition-all ${selectedTime ? 'bg-stone-800 text-white' : 'bg-stone-200 text-stone-400'}`}>Confirmer</button>
                   </div>
                 )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center fade-in max-w-md mx-auto">
              <h2 className="text-xl font-medium text-stone-800 mb-8">Récapitulatif</h2>
              <div className="bg-stone-50 rounded-2xl p-8 mb-8 border border-stone-100 relative">
                <p className="text-stone-800 font-bold text-lg mb-1 capitalize">{new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                <p className="text-stone-500 text-3xl font-light mb-6">{selectedTime}</p>
                <div className="border-t border-stone-200 pt-4 flex justify-between items-center text-sm"><span className="text-stone-500 font-medium">Acompte</span><span className="font-bold text-stone-800">50,00 €</span></div>
              </div>
              <PaymentButton amount="50.00" onSuccess={handleSuccessPayment} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}