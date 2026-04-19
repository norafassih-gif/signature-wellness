import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import imgMassage from '../assets/massage.jpg';

export default function Massages() {
  
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
        <title>Massages & Drainage Lymphatique Paris | Signature Wellness</title>
        <meta name="description" content="Drainage lymphatique Renata França, Madérothérapie et massages relaxants. Détoxifiez votre corps et affinez votre silhouette." />
      </Helmet>

      {/* --- HEADER --- */}
      <div className="text-center pt-12 pb-16 px-4 reveal active">
         <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
           Bien-être & Silhouette
         </span>
         <h1 className="text-4xl md:text-6xl text-[#57534e] mb-6" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
           Massages & Remodelage
         </h1>
         <div className="h-[1px] w-24 bg-[#57534e] mx-auto mb-8"></div>
         <p className="text-[#78716c] italic max-w-2xl mx-auto font-light text-lg">
           "L'alliance parfaite entre détente absolue, détoxification de l'organisme et résultats visibles sur la silhouette."
         </p>
      </div>

      {/* --- SECTION PRINCIPALE --- */}
      <section className="max-w-7xl mx-auto px-4 md:px-0 mb-24">
        <div className="flex flex-col md:flex-row items-center border-y border-[#e7e5e4] py-24">
          
          {/* TEXTE TECHNIQUE */}
          <div className="md:w-1/2 md:pr-16 md:pl-8 mb-12 md:mb-0 text-left reveal">
            <h2 className="text-3xl md:text-4xl mb-6 text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
              L'Art du Toucher
            </h2>
            <p className="text-[#57534e] leading-relaxed mb-6 font-light">
              Nos protocoles manuels sont conçus pour relancer la circulation lymphatique, éliminer les toxines 
              et casser les amas graisseux. Une sensation de légèreté immédiate et une peau plus ferme.
            </p>
            <p className="text-[#57534e] leading-relaxed mb-8 font-light">
              Nous combinons des techniques brésiliennes (Drainage type Renata) et colombiennes (Madérothérapie) 
              pour sculpter le corps tout en procurant un bien-être mental profond.
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-[#78716c] mr-4 text-xs">01</span>
                <span className="text-[#57534e] text-sm uppercase tracking-widest font-bold">Drainage Lymphatique (Détox)</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#78716c] mr-4 text-xs">02</span>
                <span className="text-[#57534e] text-sm uppercase tracking-widest font-bold">Madérothérapie (Anti-Cellulite)</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#78716c] mr-4 text-xs">03</span>
                <span className="text-[#57534e] text-sm uppercase tracking-widest font-bold">Massage Signature (Relaxation)</span>
              </li>
            </ul>
          </div>

          {/* IMAGE FLOTTANTE */}
          <div className="md:w-1/2 w-full h-[600px] reveal">
             <img 
               src={imgMassage} 
               alt="Massage et Détente" 
               className="w-full h-full object-cover shadow-2xl animate-float" 
             />
          </div>
        </div>
      </section>

      {/* --- MENU DES SOINS (TARIFS) --- */}
      <section className="bg-[#fafaf9] py-24 mb-24 reveal">
        <div className="max-w-3xl mx-auto px-6">
           
           <div className="text-center mb-16">
              <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                Tarification
              </span>
              <h2 className="text-3xl md:text-4xl text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
                Menu des Rituels
              </h2>
           </div>

           {/* LISTE UNIQUE STYLE MENU */}
           <div className="bg-white shadow-xl border border-[#e7e5e4] p-8 md:p-12">
              
              <div className="mb-8">
                <PriceItem name="Drainage Lymphatique Corps" price="150€" />
                <PriceItem name="Madérothérapie (Remodelage)" price="150€" />
                <PriceItem name="Miracle Face (Drainage Visage)" price="120€" />
              </div>

              {/* SECTION CURES */}
              <div>
                <h3 className="text-center text-[#78716c] text-xs font-bold uppercase tracking-[0.4em] mb-8 mt-12 border-b border-[#e7e5e4] pb-4 w-1/2 mx-auto">
                   Les Cures
                </h3>
                <PriceItem name="Cure 6 Séances (Drainage)" price="750€" />
                <PriceItem name="Cure 10 Séances (Madérothérapie)" price="1200€" />
              </div>

           </div>
           
           <div className="text-center mt-10">
              <p className="text-[10px] text-[#a8a29e] uppercase tracking-wider italic">
                *Nos massages sont à but esthétique et de bien-être, non thérapeutique.
              </p>
           </div>
        </div>
      </section>

      {/* --- LE PROCESSUS --- */}
      <section className="max-w-7xl mx-auto px-4 text-center mb-24 reveal">
           <h2 className="text-3xl md:text-4xl text-[#57534e] mb-16" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
             Les Bienfaits
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="group">
                 <div className="text-7xl font-serif text-[#e7e5e4] mb-6 group-hover:text-[#BFA997] transition-colors duration-500">01</div>
                 <h3 className="text-sm font-bold uppercase tracking-widest text-[#57534e] mb-3">Légèreté</h3>
                 <p className="text-xs text-[#78716c] font-light leading-relaxed">Réduit la rétention d'eau et les gonflements immédiatement.</p>
              </div>
              <div className="group">
                 <div className="text-7xl font-serif text-[#e7e5e4] mb-6 group-hover:text-[#BFA997] transition-colors duration-500">02</div>
                 <h3 className="text-sm font-bold uppercase tracking-widest text-[#57534e] mb-3">Sculptant</h3>
                 <p className="text-xs text-[#78716c] font-light leading-relaxed">Redessine les contours du corps et lisse la cellulite.</p>
              </div>
              <div className="group">
                 <div className="text-7xl font-serif text-[#e7e5e4] mb-6 group-hover:text-[#BFA997] transition-colors duration-500">03</div>
                 <h3 className="text-sm font-bold uppercase tracking-widest text-[#57534e] mb-3">Immunité</h3>
                 <p className="text-xs text-[#78716c] font-light leading-relaxed">Booste le système immunitaire en éliminant les toxines.</p>
              </div>
           </div>
      </section>

      {/* --- CTA --- */}
      <section className="max-w-4xl mx-auto px-4 text-center mb-24 reveal">
         <div className="border border-[#e7e5e4] p-12 bg-white shadow-xl">
            <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
              Un moment pour vous
            </span>
            <h2 className="text-3xl md:text-5xl text-[#57534e] mb-8" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
              Réservez votre Parenthèse
            </h2>
            <p className="text-[#57534e] font-light mb-10 leading-relaxed max-w-lg mx-auto">
              Laissez nos expertes prendre soin de votre corps et de votre esprit. Vous en ressortirez transformée.
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