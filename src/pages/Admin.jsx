import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const timeSlots = ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export default function Admin() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [blockedDays, setBlockedDays] = useState([]);
  
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        loadData();
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, []);

  const loadData = async () => {
    const qAppt = query(collection(db, "appointments"), orderBy("time"));
    const snapshotAppt = await getDocs(qAppt);
    setAppointments(snapshotAppt.docs.map(doc => ({ id: doc.id, ...doc.data() })));

    const qBlocked = query(collection(db, "schedule_exceptions"), where("type", "==", "blocked"));
    const snapshotBlocked = await getDocs(qBlocked);
    setBlockedDays(snapshotBlocked.docs.map(doc => ({ id: doc.id, date: doc.data().date })));
  };

  const handleDayClick = (day) => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    setSelectedDate(dateStr);
    setIsModalOpen(true);
  };

  const toggleWholeDay = async () => {
    const existingBlock = blockedDays.find(b => b.date === selectedDate);
    if (existingBlock) {
      await deleteDoc(doc(db, "schedule_exceptions", existingBlock.id));
    } else {
      await addDoc(collection(db, "schedule_exceptions"), { date: selectedDate, type: "blocked" });
    }
    await loadData();
  };

  const toggleTimeSlot = async (time) => {
    const existingAppt = appointments.find(appt => appt.date === selectedDate && appt.time === time);
    if (existingAppt) {
      if (existingAppt.status === "BLOQUÉ_ADMIN" || window.confirm("Annuler le RDV de ce client ?")) {
        await deleteDoc(doc(db, "appointments", existingAppt.id));
      }
    } else {
      await addDoc(collection(db, "appointments"), {
        date: selectedDate, time: time, status: "BLOQUÉ_ADMIN", client: { nom: "ADMIN", prenom: "Blocage", tel: "", email: "" }, paid: true
      });
    }
    await loadData();
  };

  const deleteAppointment = async (id) => {
    if (window.confirm("Supprimer ce rendez-vous ?")) {
      await deleteDoc(doc(db, "appointments", id));
      loadData();
    }
  };

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; 
  };
  const changeMonth = (offset) => {
    const newDate = new Date(viewDate.setMonth(viewDate.getMonth() + offset));
    setViewDate(new Date(newDate));
  };

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-stone-50 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-light uppercase tracking-widest text-stone-800">Tableau de Bord</h1>
            <p className="text-stone-500 text-sm mt-2 flex items-center gap-2">
              <IconUser className="w-4 h-4" /> Espace Gestionnaire
            </p>
          </div>
          <button onClick={() => { auth.signOut(); navigate('/'); }} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 border border-stone-300 px-6 py-3 rounded-full hover:bg-stone-800 hover:text-white transition-all">
            <IconLogout className="w-4 h-4" /> Déconnexion
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* --- CALENDRIER AVEC COULEURS --- */}
          <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 p-8 border border-stone-100 h-fit">
            <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-4">
              <div className="p-2 bg-stone-100 rounded-lg text-stone-600">
                <IconCalendar className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-medium text-stone-800">Planning & Ouvertures</h2>
            </div>
            
            <div className="flex justify-between items-center mb-6 px-2">
              <h3 className="text-md font-bold text-stone-700 uppercase tracking-wide">
                {months[viewDate.getMonth()]} {viewDate.getFullYear()}
              </h3>
              <div className="flex gap-2">
                <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-stone-100 rounded-full text-stone-400 hover:text-stone-800 transition-colors">
                  <IconChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={() => changeMonth(1)} className="p-2 hover:bg-stone-100 rounded-full text-stone-400 hover:text-stone-800 transition-colors">
                  <IconChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-3 text-center">
              {daysOfWeek.map(d => <span key={d} className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{d}</span>)}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth()) }).map((_, i) => <div key={`empty-${i}`} />)}
              
              {Array.from({ length: getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth()) }).map((_, i) => {
                const day = i + 1;
                const year = viewDate.getFullYear();
                const month = viewDate.getMonth();
                const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                
                const isWholeDayBlocked = blockedDays.some(b => b.date === dateStr);
                const dayAppts = appointments.filter(a => a.date === dateStr && a.status !== "BLOQUÉ_ADMIN");
                const hasAppts = dayAppts.length > 0;
                
                // --- LOGIQUE COULEURS RESTAURÉE ---
                let bgClass = "bg-white border border-stone-200 text-stone-600 hover:border-stone-800 hover:text-stone-800";
                
                if (isWholeDayBlocked) {
                  // ROUGE VIF pour fermé
                  bgClass = "bg-red-500 text-white border-red-500 shadow-md shadow-red-200"; 
                } else if (hasAppts) {
                  // NOIR/GRIS FONCÉ s'il y a des clients
                  bgClass = "bg-stone-800 text-white border-stone-800 font-bold";
                }

                return (
                  <button key={day} onClick={() => handleDayClick(day)} className={`h-10 w-10 rounded-xl flex items-center justify-center text-sm transition-all duration-200 mx-auto ${bgClass}`}>
                    {day}
                  </button>
                );
              })}
            </div>
            
            {/* LÉGENDE COULEURS */}
            <div className="mt-8 flex justify-center gap-6 text-xs text-stone-400">
               <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> Fermé</span>
               <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-stone-800"></span> RDV Clients</span>
               <span className="flex items-center gap-2"><div className="w-2 h-2 border border-stone-300 rounded-full"></div> Ouvert</span>
            </div>
          </div>

          {/* --- LISTE DES CLIENTS --- */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2 bg-stone-100 rounded-lg text-stone-600">
                <IconUsers className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-medium text-stone-800">Prochains Clients</h2>
            </div>
            
            {appointments.filter(a => a.status !== "BLOQUÉ_ADMIN").length === 0 ? (
              <div className="bg-stone-50 rounded-3xl p-12 text-center border border-dashed border-stone-200">
                <IconCalendar className="w-8 h-8 text-stone-300 mx-auto mb-3" />
                <p className="text-stone-400 text-sm">Aucun rendez-vous à venir.</p>
              </div>
            ) : (
              appointments
                .filter(a => a.status !== "BLOQUÉ_ADMIN")
                .sort((a,b) => new Date(a.date) - new Date(b.date))
                .map((apt) => (
                <div key={apt.id} className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 flex justify-between items-start hover:shadow-md transition-all group">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center justify-center bg-stone-50 w-16 h-16 rounded-xl border border-stone-100">
                      <span className="text-xs font-bold text-stone-400 uppercase">{new Date(apt.date).toLocaleDateString('fr-FR', { month: 'short' })}</span>
                      <span className="text-xl font-bold text-stone-800">{new Date(apt.date).getDate()}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-800 text-lg capitalize">{apt.client.prenom} {apt.client.nom}</h3>
                      <div className="flex items-center gap-4 text-xs text-stone-500 mt-2">
                        <span className="flex items-center gap-1 bg-stone-100 px-2 py-1 rounded"><IconClock className="w-3 h-3"/> {apt.time}</span>
                        <span className="flex items-center gap-1"><IconPhone className="w-3 h-3"/> {apt.client.tel}</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => deleteAppointment(apt.id)} className="p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                    <IconTrash className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* --- MODALE DE GESTION --- */}
        {isModalOpen && selectedDate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/30 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up border border-stone-100">
              
              <div className="bg-white p-6 border-b border-stone-100 flex justify-between items-center">
                <h3 className="text-md font-bold uppercase tracking-widest text-stone-800">
                  {new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-800">
                  <IconX className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 space-y-8">
                {/* --- BOUTON OUVRIR / FERMER JOURNEE --- */}
                <div className="flex justify-between items-center p-4 bg-stone-50 rounded-xl">
                  <div>
                    <p className="font-bold text-stone-800 text-sm">Journée entière</p>
                    <p className="text-xs text-stone-400">Statut actuel : {blockedDays.some(b => b.date === selectedDate) ? "FERMÉ ⛔️" : "OUVERT ✅"}</p>
                  </div>
                  
                  <button 
                    onClick={toggleWholeDay}
                    className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-md ${
                      blockedDays.some(b => b.date === selectedDate) 
                      ? "bg-green-100 text-green-700 hover:bg-green-200 border border-green-200" // SI FERMÉ -> VERT POUR OUVRIR
                      : "bg-red-500 text-white hover:bg-red-600 border border-red-500" // SI OUVERT -> ROUGE POUR FERMER
                    }`}
                  >
                    {blockedDays.some(b => b.date === selectedDate) ? "Ouvrir" : "Fermer"}
                  </button>
                </div>

                {!blockedDays.some(b => b.date === selectedDate) && (
                  <div>
                    <p className="font-bold text-stone-800 text-sm mb-4">Gérer les créneaux horaires</p>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map(time => {
                        const appt = appointments.find(a => a.date === selectedDate && a.time === time);
                        const isBlockedAdmin = appt && appt.status === "BLOQUÉ_ADMIN";
                        const isClient = appt && appt.status !== "BLOQUÉ_ADMIN";

                        return (
                          <button
                            key={time}
                            onClick={() => toggleTimeSlot(time)}
                            disabled={isClient}
                            className={`
                              py-2 rounded-lg text-xs font-bold transition-all border flex flex-col items-center justify-center
                              ${isClient 
                                ? "bg-stone-800 text-white border-stone-800 opacity-60 cursor-not-allowed" // Client
                                : isBlockedAdmin
                                  ? "bg-red-50 text-red-500 border-red-200 hover:bg-red-100" // Bloqué partiel (ROUGE CLAIR)
                                  : "bg-white text-stone-600 border-stone-200 hover:border-stone-400" // Libre
                              }
                            `}
                          >
                            {time}
                            {isClient && <span className="text-[8px] font-normal opacity-80 mt-1">CLIENT</span>}
                            {isBlockedAdmin && <span className="text-[8px] font-normal mt-1">FERMÉ</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- ICONES VECTORIELLES MODERNES (SVG) ---
const IconCalendar = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>);
const IconUser = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>);
const IconUsers = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>);
const IconPhone = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>);
const IconTrash = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>);
const IconChevronLeft = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>);
const IconChevronRight = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>);
const IconX = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);
const IconClock = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const IconLogout = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>);