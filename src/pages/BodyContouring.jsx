import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import imgBody from '../assets/maderotherapie.jpg';

export default function BodyContouring() {
  
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
        <title>Soins Corps & Cicatrices Paris | Signature Wellness</title>
        <meta name="description" content="Traitement expert des vergetures, cicatrices et imperfections du corps. Laser CO2, Needling et Peeling. Réservez votre consultation." />
      </Helmet>

      {/* --- HEADER --- */}
      <div className="text-center pt-12 pb-16 px-4 reveal active">
         <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
           Expertise Corporelle
         </span>
         <h1 className="text-4xl md:text-6xl text-[#57534e] mb-6" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
           Corps & Imperfections
         </h1>
         <div className="h-[1px] w-24 bg-[#57534e] mx-auto mb-8"></div>
         <p className="text-[#78716c] italic max-w-2xl mx-auto font-light text-lg">
           "Des solutions médicales avancées pour restaurer l'intégrité de votre peau et sublimer votre silhouette."
         </p>
      </div>

      {/* --- SECTION PRINCIPALE --- */}
      <section className="max-w-7xl mx-auto px-4 md:px-0 mb-24">
        <div className="flex flex-col md:flex-row items-center border-y border-[#e7e5e4] py-24">
          
          {/* TEXTE TECHNIQUE */}
          <div className="md:w-1/2 md:pr-16 md:pl-8 mb-12 md:mb-0 text-left reveal">
            <h2 className="text-3xl md:text-4xl mb-6 text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
              Réparer & Lisser
            </h2>
            <p className="text-[#57534e] leading-relaxed mb-6 font-light">
              Notre approche combine des technologies de pointe pour traiter les marques du temps et de la vie. 
              Que ce soit pour des cicatrices, des vergetures ou des irrégularités de texture, nous utilisons 
              le resurfaçage cutané (Laser CO2, Needling Médical) pour faire peau neuve.
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-[#78716c] mr-4 text-xs">01</span>
                <span className="text-[#57534e] text-sm uppercase tracking-widest font-bold">Cicatrices & Chéloïdes</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#78716c] mr-4 text-xs">02</span>
                <span className="text-[#57534e] text-sm uppercase tracking-widest font-bold">Vergetures (Blanches & Rouges)</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#78716c] mr-4 text-xs">03</span>
                <span className="text-[#57534e] text-sm uppercase tracking-widest font-bold">Grain de peau & Hyperpigmentation</span>
              </li>
            </ul>
          </div>

          {/* IMAGE FLOTTANTE */}
          <div className="md:w-1/2 w-full h-[600px] reveal">
             <img 
               src={imgBody} 
               alt="Traitement Corps et Cicatrices" 
               className="w-full h-full object-cover shadow-2xl animate-float" 
             />
          </div>
        </div>
      </section>

      {/* --- CARTE DES TARIFS (VERSION LISTE LONGUE ÉLÉGANTE) --- */}
      <section className="bg-[#fafaf9] py-24 mb-24 reveal">
        <div className="max-w-3xl mx-auto px-6">
           
           <div className="text-center mb-16">
              <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                Tarification
              </span>
              <h2 className="text-3xl md:text-4xl text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
                Menu des Soins
              </h2>
           </div>

           {/* LISTE UNIQUE ET LONGUE */}
           <div className="space-y-0 bg-white shadow-xl border border-[#e7e5e4] p-8 md:p-12">
              
              {/* GROUPE 1 : CICATRICES */}
              <div className="mb-8">
                <h3 className="text-center text-[#78716c] text-xs font-bold uppercase tracking-[0.4em] mb-8 border-b border-[#e7e5e4] pb-4 w-1/2 mx-auto">
                   Cicatrices & Imperfections
                </h3>
                <PriceItem name="Traitement de Chéloïdes" price="à partir de 80€" />
                <PriceItem name="Traitement Cicatrice (Needling)" price="à partir de 120€" />
                <PriceItem name="Traitement Cicatrice (Laser CO2)" price="à partir de 250€" />
                <PriceItem name="Carboxythérapie Cicatrice" price="à partir de 200€" />
                <PriceItem name="Traitement Accrochordons" price="à partir de 150€" />
              </div>

              {/* GROUPE 2 : VERGETURES & PEELING */}
              <div>
                <h3 className="text-center text-[#78716c] text-xs font-bold uppercase tracking-[0.4em] mb-8 mt-12 border-b border-[#e7e5e4] pb-4 w-1/2 mx-auto">
                   Vergetures & Peeling
                </h3>
                <PriceItem name="Traitement Vergetures (Needling)" price="à partir de 200€" />
                <PriceItem name="Traitement Vergetures (Laser CO2)" price="à partir de 250€" />
                <PriceItem name="Peeling Corps" price="à partir de 250€" />
                <PriceItem name="Peeling Parties Intimes" price="300€" />
              </div>

           </div>
           
           <div className="text-center mt-10">
              <p className="text-[10px] text-[#a8a29e] uppercase tracking-wider italic">
                *Tarifs indicatifs, un devis précis sera établi lors de votre consultation.
              </p>
           </div>
        </div>
      </section>

      {/* --- LE PROCESSUS --- */}
      <section className="max-w-7xl mx-auto px-4 text-center mb-24 reveal">
           <h2 className="text-3xl md:text-4xl text-[#57534e] mb-16" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
             Protocole de Soin
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="group">
                 <div className="text-7xl font-serif text-[#e7e5e4] mb-6 group-hover:text-[#BFA997] transition-colors duration-500">01</div>
                 <h3 className="text-sm font-bold uppercase tracking-widest text-[#57534e] mb-3">Diagnostic</h3>
                 <p className="text-xs text-[#78716c] font-light leading-relaxed">Analyse de la profondeur et du type de lésion.</p>
              </div>
              <div className="group">
                 <div className="text-7xl font-serif text-[#e7e5e4] mb-6 group-hover:text-[#BFA997] transition-colors duration-500">02</div>
                 <h3 className="text-sm font-bold uppercase tracking-widest text-[#57534e] mb-3">Traitement</h3>
                 <p className="text-xs text-[#78716c] font-light leading-relaxed">Application du protocole (Laser, Needling ou Peeling).</p>
              </div>
              <div className="group">
                 <div className="text-7xl font-serif text-[#e7e5e4] mb-6 group-hover:text-[#BFA997] transition-colors duration-500">03</div>
                 <h3 className="text-sm font-bold uppercase tracking-widest text-[#57534e] mb-3">Régénération</h3>
                 <p className="text-xs text-[#78716c] font-light leading-relaxed">La peau se renouvelle progressivement pour un aspect lissé.</p>
              </div>
           </div>
      </section>

      {/* --- CTA --- */}
      <section className="max-w-4xl mx-auto px-4 text-center mb-24 reveal">
         <div className="border border-[#e7e5e4] p-12 bg-white shadow-xl">
            <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
              Une peau neuve
            </span>
            <h2 className="text-3xl md:text-5xl text-[#57534e] mb-8" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
              Réservez votre Consultation
            </h2>
            <p className="text-[#57534e] font-light mb-10 leading-relaxed max-w-lg mx-auto">
              Chaque cicatrice et chaque peau est unique. Prenons le temps d'étudier votre besoin lors d'un bilan personnalisé.
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

// Composant Ligne de Prix : Minimaliste & Long
function PriceItem({ name, price }) {
  return (
    <div className="flex justify-between items-center py-4 border-b border-[#f5f5f4] hover:bg-[#fafaf9] transition-colors duration-300 px-4 group cursor-default">
      <span className="text-[#57534e] text-sm uppercase tracking-widest font-medium group-hover:text-[#78716c] transition-colors">{name}</span>
      <span className="text-[#78716c] font-bold text-sm bg-transparent">{price}</span>
    </div>
  );
}