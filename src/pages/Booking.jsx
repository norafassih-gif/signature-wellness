import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import PaymentButton from '../components/PaymentButton';
import emailjs from '@emailjs/browser';
import logo from '../assets/logoSW.png';

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
  const [isConfirmed, setIsConfirmed] = useState(false);

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

  // --- ENVOI DE L'EMAIL DE CONFIRMATION ---
  const sendConfirmationEmail = () => {
    const templateParams = {
      to_name: `${client.prenom} ${client.nom}`,
      to_email: client.email,
      date: new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }),
      time: selectedTime,
      address: "18 Rue d'Armenonville, 92200 Neuilly-sur-Seine",
      reply_to: "signature.wellnessacademy@gmail.com"
    };

    // Remplace par tes IDs EmailJS une fois ton compte créé
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY')
      .then((result) => {
          console.log("Email envoyé avec succès !");
      }, (error) => {
          console.log("Erreur lors de l'envoi de l'email :", error.text);
      });
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
    if (blockedDates.includes(dateStr)) return;
    
    setSelectedDate(dateStr);
    setSelectedTime('');
  };

  const changeMonth = (offset) => {
    const newDate = new Date(viewDate.setMonth(viewDate.getMonth() + offset));
    setViewDate(new Date(newDate));
  };

  const handleClientChange = (e) => setClient({ ...client, [e.target.name]: e.target.value });
  const handleInfoSubmit = (e) => { e.preventDefault(); setStep(2); };
  const handleDateSubmit = (e) => { e.preventDefault(); setStep(3); };
  
  const handleSuccessPayment = async () => {
    try {
      // 1. Enregistrement Firebase
      await addDoc(collection(db, "appointments"), {
        client, 
        date: selectedDate, 
        time: selectedTime, 
        status: "confirmé", 
        paid: true, 
        created_at: new Date()
      });

      // 2. Envoi de l'email
      sendConfirmationEmail();

      // 3. Affichage de l'écran de succès
      setIsConfirmed(true);
    } catch (error) { 
      console.error(error);
      alert("Erreur technique lors de l'enregistrement."); 
    }
  };

  // --- ECRAN DE SUCCÈS (RÉCAPITULATIF ÉLÉGANT) ---
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
                {new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} à {selectedTime}
              </p>
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

          {step === 2 && (
            <div className="flex flex-col md:flex-row gap-12">
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
                    const isClosed = dateObj.getDay() === 0 || dateObj.getDay() === 1;
                    const isBlocked = blockedDates.includes(dateStr) || isClosed;
                    const isSelected = selectedDate === dateStr;

                    return (
                      <button
                        key={day}
                        disabled={isBlocked}
                        onClick={() => handleDayClick(day)}
                        className={`h-10 w-10 rounded-full flex items-center justify-center text-xs transition-all duration-300 mx-auto
                          ${isSelected ? 'bg-stone-800 text-white shadow-lg scale-110 font-bold' : isBlocked ? 'text-stone-200 cursor-not-allowed' : 'text-stone-600 hover:bg-stone-100'}
                        `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex-1 border-l border-stone-100 md:pl-10">
                 {!selectedDate ? (
                   <div className="h-full flex flex-col items-center justify-center text-stone-300 space-y-4 opacity-50">
                     <p className="text-[10px] uppercase tracking-widest font-bold">Sélectionnez une date</p>
                   </div>
                 ) : (
                   <div className="animate-fade-in">
                     <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-8 text-center">Horaires disponibles</h3>
                     <div className="grid grid-cols-2 gap-3">
                       {timeSlots.map(time => (
                         <button key={time} onClick={() => setSelectedTime(time)} className={`py-4 rounded-xl text-xs font-bold transition-all border ${selectedTime === time ? 'bg-stone-800 text-white border-stone-800 shadow-md' : 'bg-white text-stone-500 border-stone-100 hover:border-stone-300'}`}>{time}</button>
                       ))}
                     </div>
                     <button onClick={handleDateSubmit} disabled={!selectedTime} className={`w-full mt-10 py-4 rounded-xl font-bold uppercase text-[10px] tracking-[0.2em] transition-all ${selectedTime ? 'bg-stone-800 text-white hover:bg-stone-700' : 'bg-stone-100 text-stone-300 cursor-not-allowed'}`}>Confirmer l'horaire</button>
                   </div>
                 )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center max-w-md mx-auto">
              <h2 className="text-sm font-bold text-stone-400 mb-10 uppercase tracking-[0.3em]">Récapitulatif & Acompte</h2>
              <div className="bg-stone-50 rounded-2xl p-8 mb-10 border border-stone-100">
                <p className="text-stone-800 font-bold text-sm uppercase tracking-widest mb-2 capitalize">
                  {new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
                <p className="text-stone-500 text-4xl font-light mb-8">{selectedTime}</p>
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