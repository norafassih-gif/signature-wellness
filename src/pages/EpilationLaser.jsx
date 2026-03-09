import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import imgLaser from '../assets/laser.jpg';

export default function EpilationLaser() {
  
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
        <title>Épilation Laser Définitive Paris | Signature Wellness</title>
        <meta name="description" content="Centre expert en épilation laser définitive et électrolyse. Technologie médicale sécurisée pour tous types de peaux. Réservez votre diagnostic offert." />
      </Helmet>

      {/* --- HEADER --- */}
      <div className="text-center pt-12 pb-16 px-4 reveal active">
         <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
           Technologie Médicale
         </span>
         <h1 className="text-4xl md:text-6xl text-[#57534e] mb-6" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
           Épilation Définitive
         </h1>
         <div className="h-[1px] w-24 bg-[#57534e] mx-auto mb-8"></div>
         <p className="text-[#78716c] italic max-w-2xl mx-auto font-light text-lg">
           "La liberté d'une peau douce, toute l'année. Une expertise clinique pour des résultats durables."
         </p>
      </div>

      {/* --- SECTION PRINCIPALE (TEXTE + IMAGE FLOTTANTE) --- */}
      <section className="max-w-7xl mx-auto px-4 md:px-0 mb-24">
        <div className="flex flex-col md:flex-row items-center border-y border-[#e7e5e4] py-24">
          
          {/* TEXTE TECHNIQUE SEO */}
          <div className="md:w-1/2 md:pr-16 md:pl-8 mb-12 md:mb-0 text-left reveal">
            <h2 className="text-3xl md:text-4xl mb-6 text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
              Haute Technologie & Sécurité
            </h2>
            <p className="text-[#57534e] leading-relaxed mb-6 font-light">
              Nous utilisons des lasers médicaux de dernière génération (Alexandrite & Nd:YAG) pour garantir une élimination 
              du poil efficace, rapide et sécurisée. Contrairement à la lumière pulsée, le laser cible la mélanine 
              avec une précision extrême pour détruire le bulbe pileux sans endommager la peau.
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-[#78716c] mr-4 text-xs">01</span>
                <span className="text-[#57534e] text-sm uppercase tracking-widest font-bold">Efficace sur tous types de poils</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#78716c] mr-4 text-xs">02</span>
                <span className="text-[#57534e] text-sm uppercase tracking-widest font-bold">Adapté aux peaux claires, mates et noires</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#78716c] mr-4 text-xs">03</span>
                <span className="text-[#57534e] text-sm uppercase tracking-widest font-bold">Système de refroidissement (Air Froid)</span>
              </li>
            </ul>

            <div className="bg-[#fafaf9] p-6 border-l-2 border-[#78716c]">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#57534e] mb-2">Le complément : L'Électrolyse</h3>
              <p className="text-xs text-[#78716c] font-light leading-relaxed">
                Pour les zones hormono-dépendantes (visage) ou les poils blonds/blancs qui résistent au laser, 
                nous intégrons l'électrolyse haute fréquence pour une finition 100% parfaite.
              </p>
            </div>
          </div>

          {/* IMAGE FLOTTANTE */}
          <div className="md:w-1/2 w-full h-[600px] reveal">
             <img 
               src={imgLaser} 
               alt="Machine Laser Epilation" 
               className="w-full h-full object-cover shadow-2xl animate-float" 
             />
          </div>
        </div>
      </section>

      {/* --- LE PROCESSUS (CHIFFRES ARABES COMME ACCUEIL) --- */}
      <section className="bg-[#fafaf9] py-24 mb-24 reveal">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <h2 className="text-3xl md:text-4xl text-[#57534e] mb-16" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
             Votre Parcours Laser
           </h2>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* ETAPE 01 */}
              <div className="group">
                 <div className="text-7xl font-serif text-[#e7e5e4] mb-6 group-hover:text-[#BFA997] transition-colors duration-500">01</div>
                 <h3 className="text-sm font-bold uppercase tracking-widest text-[#57534e] mb-3">La Consultation</h3>
                 <p className="text-xs text-[#78716c] font-light leading-relaxed">
                   Un bilan gratuit obligatoire pour analyser votre peau, vérifier les contre-indications et établir vos paramètres.
                 </p>
              </div>
              {/* ETAPE 02 */}
              <div className="group">
                 <div className="text-7xl font-serif text-[#e7e5e4] mb-6 group-hover:text-[#BFA997] transition-colors duration-500">02</div>
                 <h3 className="text-sm font-bold uppercase tracking-widest text-[#57534e] mb-3">La Séance</h3>
                 <p className="text-xs text-[#78716c] font-light leading-relaxed">
                   Rapide et quasi-indolore grâce au froid. La zone est quadrillée et traitée flash par flash par nos expertes.
                 </p>
              </div>
              {/* ETAPE 03 */}
              <div className="group">
                 <div className="text-7xl font-serif text-[#e7e5e4] mb-6 group-hover:text-[#BFA997] transition-colors duration-500">03</div>
                 <h3 className="text-sm font-bold uppercase tracking-widest text-[#57534e] mb-3">Le Résultat</h3>
                 <p className="text-xs text-[#78716c] font-light leading-relaxed">
                   Les poils tombent dans les jours suivants. Une peau lisse et nette séance après séance (6 à 8 en moyenne).
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* --- CTA : PRISE DE RDV + MENTION SUR DEVIS --- */}
      <section className="max-w-4xl mx-auto px-4 text-center mb-24 reveal">
         <div className="border border-[#e7e5e4] p-12 bg-white shadow-xl">
            <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
              Prête à commencer ?
            </span>
            <h2 className="text-3xl md:text-5xl text-[#57534e] mb-8" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
              Réservez votre Bilan Offert
            </h2>
            <p className="text-[#57534e] font-light mb-6 leading-relaxed max-w-lg mx-auto">
              Ne laissez plus vos poils dicter votre quotidien. Prenez rendez-vous dès maintenant pour votre consultation diagnostic.
            </p>
            
            {/* MENTION SUR DEVIS */}
            <div className="mb-8">
               <span className="bg-[#fafaf9] border border-[#e7e5e4] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#57534e]">
                 Tarification sur Devis Personnalisé
               </span>
            </div>
            
            <Link 
              to="/reservation" 
              className="inline-block bg-[#57534e] text-white px-12 py-4 uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#78716c] transition-colors shadow-lg hover:scale-105 transform duration-300"
            >
              Je prends rendez-vous
            </Link>
            
            <p className="mt-6 text-[10px] text-[#a8a29e] uppercase tracking-wider">
              Consultation sans engagement
            </p>
         </div>
      </section>

    </div>
  );
}