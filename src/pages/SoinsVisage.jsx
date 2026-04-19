import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import imgHydra from '../assets/hydrafacial.jpg'; // On garde l'image

export default function SoinsVisage() {
  
  // --- ANIMATIONS SCROLL (REVEAL) ---
  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach((reveal) => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
          reveal.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white font-sans overflow-x-hidden pt-24">
      <Helmet>
        <title>Soins Visage Hydro-Expert Paris | Signature Wellness</title>
        <meta name="description" content="Soin visage Hydro-Dermabrasion : Nettoyage, Extraction et Hydratation profonde. Le secret d'une peau éclatante." />
      </Helmet>

      {/* --- HEADER --- */}
      <div className="text-center pt-12 pb-16 px-4 reveal active">
         <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
           Skin Care & Éclat
         </span>
         {/* NOM GÉNÉRIQUE POUR ÉVITER LA MARQUE DÉPOSÉE */}
         <h1 className="text-4xl md:text-6xl text-[#57534e] mb-6" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
           Soin Hydro-Expert
         </h1>
         <div className="h-[1px] w-24 bg-[#57534e] mx-auto mb-8"></div>
         <p className="text-[#78716c] italic max-w-2xl mx-auto font-light text-lg">
           "La technologie brevetée 3-en-1 : Nettoyer, Extraire, Hydrater. Une peau transformée dès la première séance."
         </p>
      </div>

      {/* --- SECTION PRINCIPALE --- */}
      <section className="max-w-7xl mx-auto px-4 md:px-0 mb-24">
        <div className="flex flex-col md:flex-row items-center border-y border-[#e7e5e4] py-24">
          
          {/* TEXTE TECHNIQUE */}
          <div className="md:w-1/2 md:pr-16 md:pl-8 mb-12 md:mb-0 text-left reveal">
            <h2 className="text-3xl md:text-4xl mb-6 text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
              Hydro-Dermabrasion
            </h2>
            <p className="text-[#57534e] leading-relaxed mb-6 font-light">
              Ce soin révolutionnaire combine une exfoliation douce, une extraction des impuretés par aspiration 
              et une infusion de sérums intensifs (acide hyaluronique, antioxydants, peptides).
            </p>
            
            <p className="text-[#57534e] leading-relaxed mb-8 font-light">
              Contrairement aux soins manuels classiques, la technologie Hydro-Expert agit en profondeur 
              sans agresser l'épiderme. Le résultat ? Un "Glow" immédiat, des pores resserrés et un teint unifié.
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-[#78716c] mr-4 text-xs">01</span>
                <span className="text-[#57534e] text-sm uppercase tracking-widest font-bold">Nettoyage & Peeling Doux</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#78716c] mr-4 text-xs">02</span>
                <span className="text-[#57534e] text-sm uppercase tracking-widest font-bold">Extraction des comédons</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#78716c] mr-4 text-xs">03</span>
                <span className="text-[#57534e] text-sm uppercase tracking-widest font-bold">Hydratation Intense</span>
              </li>
            </ul>
          </div>

          {/* IMAGE FLOTTANTE */}
          <div className="md:w-1/2 w-full h-[600px] reveal">
             <img 
               src={imgHydra} 
               alt="Soin Visage Hydro" 
               className="w-full h-full object-cover shadow-2xl animate-float" 
             />
          </div>
        </div>
      </section>

      {/* --- CARTE DES TARIFS (MENU ÉLÉGANT) --- */}
      <section className="bg-[#fafaf9] py-24 mb-24 reveal">
        <div className="max-w-3xl mx-auto px-6">
           
           <div className="text-center mb-16">
              <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                Tarification
              </span>
              <h2 className="text-3xl md:text-4xl text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
                Menu Hydro-Expert
              </h2>
           </div>

           {/* LISTE DE PRIX ÉPURÉE */}
           <div className="space-y-0 bg-white shadow-xl border border-[#e7e5e4] p-8 md:p-12">
              <PriceItem name="Soin Signature Hydraface (60 min)" price="200€" />
              <PriceItem name="Soin Deluxe (90 min) — Hydraface + Skin Booster + Aqua Glow" price="250€" />
              <PriceItem name="Soin Platinum (120 min) — Hydraface + Needling + Skin Booster + Luminothérapie" price="300€" />
           </div>
           
           <div className="text-center mt-10">
              <p className="text-[10px] text-[#a8a29e] uppercase tracking-wider italic">
                *Nos protocoles incluent l'analyse de peau offerte.
              </p>
           </div>
        </div>
      </section>

      {/* --- LE PROCESSUS --- */}
      <section className="max-w-7xl mx-auto px-4 text-center mb-24 reveal">
           <h2 className="text-3xl md:text-4xl text-[#57534e] mb-16" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
             Votre Instant Beauté
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="group">
                 <div className="text-7xl font-serif text-[#e7e5e4] mb-6 group-hover:text-[#BFA997] transition-colors duration-500">01</div>
                 <h3 className="text-sm font-bold uppercase tracking-widest text-[#57534e] mb-3">Diagnostic</h3>
                 <p className="text-xs text-[#78716c] font-light leading-relaxed">Nous définissons les sérums adaptés à votre peau (anti-âge, anti-taches...).</p>
              </div>
              <div className="group">
                 <div className="text-7xl font-serif text-[#e7e5e4] mb-6 group-hover:text-[#BFA997] transition-colors duration-500">02</div>
                 <h3 className="text-sm font-bold uppercase tracking-widest text-[#57534e] mb-3">Le Soin</h3>
                 <p className="text-xs text-[#78716c] font-light leading-relaxed">Détendez-vous pendant que la technologie agit pour purifier et repulper.</p>
              </div>
              <div className="group">
                 <div className="text-7xl font-serif text-[#e7e5e4] mb-6 group-hover:text-[#BFA997] transition-colors duration-500">03</div>
                 <h3 className="text-sm font-bold uppercase tracking-widest text-[#57534e] mb-3">Le Glow</h3>
                 <p className="text-xs text-[#78716c] font-light leading-relaxed">Une peau lumineuse, fraîche et oxygénée immédiatement après la séance.</p>
              </div>
           </div>
      </section>

      {/* --- CTA : PRISE DE RDV --- */}
      <section className="max-w-4xl mx-auto px-4 text-center mb-24 reveal">
         <div className="border border-[#e7e5e4] p-12 bg-white shadow-xl">
            <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
              Prête à briller ?
            </span>
            <h2 className="text-3xl md:text-5xl text-[#57534e] mb-8" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
              Réservez votre Soin
            </h2>
            <p className="text-[#57534e] font-light mb-10 leading-relaxed max-w-lg mx-auto">
              Offrez à votre peau le meilleur nettoyage dermatologique du marché. Résultat visible dès la sortie de l'institut.
            </p>
            
            <Link 
              to="/reservation" 
              className="inline-block bg-[#57534e] text-white px-12 py-4 uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#78716c] transition-colors shadow-lg hover:scale-105 transform duration-300"
            >
              Je prends rendez-vous
            </Link>
         </div>
      </section>

    </div>
  );
}

// Composant Ligne de Prix
function PriceItem({ name, price }) {
  return (
    <div className="flex justify-between items-center py-4 border-b border-[#f5f5f4] hover:bg-[#fafaf9] transition-colors duration-300 px-4 group cursor-default">
      <span className="text-[#57534e] text-sm uppercase tracking-widest font-medium group-hover:text-[#78716c] transition-colors">{name}</span>
      <span className="text-[#78716c] font-bold text-sm bg-transparent">{price}</span>
    </div>
  );
}