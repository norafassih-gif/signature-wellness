import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import imgMicroneedling from '../assets/microneedling.jpg';

export default function Microneedling() {
  
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
        <title>Microneedling, PRP & Soins Capillaires Paris | Signature Wellness</title>
        <meta name="description" content="Expertise en régénération cellulaire : Microneedling, Skinboosters, Exosomes et traitements chute de cheveux (PRP). Tarifs et réservation." />
      </Helmet>

      {/* --- HEADER --- */}
      <div className="text-center pt-12 pb-16 px-4 reveal active">
         <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
           Médecine Esthétique & Régénération
         </span>
         <h1 className="text-4xl md:text-6xl text-[#57534e] mb-6" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
           Soins Avancés & Capillaire
         </h1>
         <div className="h-[1px] w-24 bg-[#57534e] mx-auto mb-8"></div>
         <p className="text-[#78716c] italic max-w-2xl mx-auto font-light text-lg">
           "La puissance de la régénération cellulaire pour sublimer votre visage et redonner force à vos cheveux."
         </p>
      </div>

      {/* --- SECTION PRINCIPALE --- */}
      <section className="max-w-7xl mx-auto px-4 md:px-0 mb-24">
        <div className="flex flex-col md:flex-row items-center border-y border-[#e7e5e4] py-24">
          
          {/* TEXTE TECHNIQUE */}
          <div className="md:w-1/2 md:pr-16 md:pl-8 mb-12 md:mb-0 text-left reveal">
            <h2 className="text-3xl md:text-4xl mb-6 text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
              Bio-Stimulation Intense
            </h2>
            <p className="text-[#57534e] leading-relaxed mb-6 font-light">
              Nos protocoles de pointe (Microneedling, PRP, Exosomes) visent à réactiver la production naturelle 
              de collagène et d'élastine. C'est la solution idéale pour traiter le vieillissement cutané, 
              les cicatrices d'acné ou le manque d'éclat.
            </p>
            <p className="text-[#57534e] leading-relaxed mb-8 font-light">
              <strong>Expertise Capillaire :</strong> Nous proposons également des cocktails vitaminés et des facteurs 
              de croissance (PRP/Exosomes) pour stopper la chute de cheveux et stimuler la repousse, aussi bien 
              chez l'homme que chez la femme.
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-[#78716c] mr-4 text-xs">01</span>
                <span className="text-[#57534e] text-sm uppercase tracking-widest font-bold">Régénération Cutanée (Visage)</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#78716c] mr-4 text-xs">02</span>
                <span className="text-[#57534e] text-sm uppercase tracking-widest font-bold">Boosters & Vitamines (IV/Injection)</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#78716c] mr-4 text-xs">03</span>
                <span className="text-[#57534e] text-sm uppercase tracking-widest font-bold">Traitement Chute de Cheveux</span>
              </li>
            </ul>
          </div>

          {/* IMAGE FLOTTANTE */}
          <div className="md:w-1/2 w-full h-[600px] reveal">
             <img 
               src={imgMicroneedling} 
               alt="Soin Microneedling et PRP" 
               className="w-full h-full object-cover shadow-2xl animate-float" 
             />
          </div>
        </div>
      </section>

      {/* --- MENU DES SOINS (TARIFS COMPLETS) --- */}
      <section className="bg-[#fafaf9] py-24 mb-24 reveal">
        <div className="max-w-4xl mx-auto px-6">
           
           <div className="text-center mb-16">
              <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                Tarification
              </span>
              <h2 className="text-3xl md:text-4xl text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
                Menu des Protocoles
              </h2>
           </div>

           <div className="bg-white shadow-xl border border-[#e7e5e4] p-8 md:p-16">
              
              {/* CATEGORIE 1 : DERMOCOSMÉTIQUE */}
              <div className="mb-16">
                <h3 className="text-center text-[#78716c] text-xs font-bold uppercase tracking-[0.4em] mb-8 border-b border-[#e7e5e4] pb-4 w-1/2 mx-auto">
                   Dermocosmétique Visage
                </h3>
                <div className="space-y-0">
                   <PriceItem name="Needling Classique" price="150€" />
                   <PriceItem name="Hydraneedling" price="250€" />
                   <PriceItem name="Natural Peel" price="250€" />
                   <PriceItem name="Regeneration Peel" price="350€" />
                   <PriceItem name="Clear Peel / Clarity Peel" price="dès 330€" />
                   <PriceItem name="Exosomes Full Face" price="350€" />
                   <PriceItem name="Exosomes Full Face + Décolleté" price="450€" />
                   <PriceItem name="PRP Full Face" price="250€" />
                   <PriceItem name="PRP + Exosomes Full Face" price="450€" />
                </div>
              </div>

              {/* CATEGORIE 2 : SKIN BOOSTERS & VITAMINES */}
              <div className="mb-16">
                <h3 className="text-center text-[#78716c] text-xs font-bold uppercase tracking-[0.4em] mb-8 border-b border-[#e7e5e4] pb-4 w-1/2 mx-auto">
                   Skin Boosters & Vitamines
                </h3>
                <div className="space-y-0">
                   <PriceItem name="PDRN (ADN Saumon)" price="350€" />
                   <PriceItem name="Eyes Repair (Cernes)" price="200€" />
                   <PriceItem name="Collagen Booster" price="350€" />
                   <PriceItem name="PRF (Fibrine)" price="350€" />
                   <PriceItem name="Perfusion de Vitamines" price="300€" />
                   <PriceItem name="Glutathion Perf" price="300€" />
                   <PriceItem name="Cure Glutathion (8 séances)" price="1800€" />
                </div>
              </div>

              {/* CATEGORIE 3 : CAPILLAIRE */}
              <div>
                <h3 className="text-center text-[#78716c] text-xs font-bold uppercase tracking-[0.4em] mb-8 border-b border-[#e7e5e4] pb-4 w-1/2 mx-auto">
                   Traitements Capillaires
                </h3>
                <div className="space-y-0">
                   <PriceItem name="Cocktail Activateur de Pousse" price="120€" />
                   <PriceItem name="Traitement de Pelade" price="200€" />
                   <PriceItem name="PRP Cheveux" price="250€" />
                   <PriceItem name="Exosomes Cheveux" price="350€" />
                   <PriceItem name="PRP + Exosomes" price="450€" />
                   <div className="mt-8 pt-4 border-t border-dotted border-[#e7e5e4]">
                      <PriceItem name="Cure PRP (5 séances)" price="1000€" />
                      <PriceItem name="Cure Exosomes (5 séances)" price="1400€" />
                   </div>
                </div>
              </div>

           </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="max-w-4xl mx-auto px-4 text-center mb-24 reveal">
         <div className="border border-[#e7e5e4] p-12 bg-white shadow-xl">
            <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
              Révélez votre beauté
            </span>
            <h2 className="text-3xl md:text-5xl text-[#57534e] mb-8" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
              Prendre Rendez-vous
            </h2>
            <p className="text-[#57534e] font-light mb-10 leading-relaxed max-w-lg mx-auto">
              Que ce soit pour un coup d'éclat, une réparation profonde ou une stimulation capillaire, 
              nos experts sont là pour vous conseiller le protocole idéal.
            </p>
            
            <Link 
              to="/reservation" 
              className="inline-block bg-[#57534e] text-white px-12 py-4 uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#78716c] transition-colors shadow-lg hover:scale-105 transform duration-300"
            >
              Je réserve ma séance
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