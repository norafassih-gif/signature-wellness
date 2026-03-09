import React, { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // On vérifie si l'utilisateur a déjà accepté
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-fade-in-up">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md border border-stone-100 shadow-2xl rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-left">
          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-1">Confidentialité</p>
          <p className="text-xs text-stone-600 leading-relaxed max-w-xl">
            Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic de notre institut. En continuant, vous acceptez notre politique de soins et de dermo-cosmétique.
          </p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button 
            onClick={acceptCookies}
            className="flex-1 md:flex-none bg-stone-800 text-white text-[10px] uppercase tracking-widest font-bold px-8 py-3 rounded-xl hover:bg-stone-700 transition-all shadow-lg shadow-stone-200"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}