import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// --- IMPORTATION DES IMAGES (CORRIGÉES) ---
import imgMain from '../assets/Corp2.jpg'; // Corrigé : plus d'espace ici
import imgMadero from '../assets/maderotherapie.jpg';
import imgJambe from "../assets/soin-jambes.jpg";

export default function MiracleSculpt() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white font-sans text-[#57534e] pt-24 pb-20">
      <Helmet>
        <title>Miracle Sculpt & Remodelage Corporel | Signature Wellness</title>
        <meta name="description" content="Découvrez nos soins minceur et remodelants : Miracle Sculpt, Madérothérapie, Ondes de choc et Radiofréquence pour sculpter votre silhouette." />
      </Helmet>

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16 mt-8">
        <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
          Expertise Minceur & Fermeté
        </span>
        <h1 className="text-3xl md:text-5xl mb-6 text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
          Miracle Sculpt & Remodelage
        </h1>
        
        <div className="h-[1px] w-24 bg-[#57534e] mx-auto mb-8"></div>
        
        <p className="text-[#78716c] italic max-w-2xl mx-auto font-light leading-relaxed mb-12">
          Sculptez votre corps, lissez la cellulite et retrouvez des jambes légères grâce à nos techniques manuelles exclusives et nos technologies de pointe (Radiofréquence, Cavitation, Ondes de choc).
        </p>

        {/* PHOTO PRINCIPALE */}
        <div className="max-w-5xl mx-auto h-[400px] md:h-[600px] overflow-hidden shadow-2xl mb-24">
            <img 
                src={imgMain} 
                alt="Remodelage Corporel" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        
        {/* SECTION TARIFS / CARTE DES SOINS */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-12 text-center text-[#57534e]">
            Carte des Soins Remodelants
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Colonne 1 : Techniques Manuelles */}
            <div className="space-y-8">
              <h3 className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.3em] mb-6 border-b border-stone-100 pb-2">
                Techniques Manuelles
              </h3>

              <div className="border-b border-[#e7e5e4] pb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="text-lg font-bold text-[#57534e] uppercase tracking-wider">Miracle Sculpt</h4>
                  <span className="text-[#78716c] font-medium tracking-widest">200€</span>
                </div>
                <p className="text-sm text-[#78716c] font-light leading-relaxed">
                  Le soin signature par excellence. Un massage tonique et profond qui combine drainage lymphatique et remodelage pour redessiner la silhouette, dégonfler et sculpter les formes dès la première séance.
                </p>
              </div>

              <div className="border-b border-[#e7e5e4] pb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="text-lg font-bold text-[#57534e] uppercase tracking-wider">Madérothérapie</h4>
                  <span className="text-[#78716c] font-medium tracking-widest">150€</span>
                </div>
                <p className="text-sm text-[#78716c] font-light leading-relaxed">
                  Technique colombienne utilisant des instruments en bois naturel pour casser les amas graisseux, lisser la cellulite fibreuse et relancer la circulation.
                </p>
              </div>

              <div className="border-b border-[#e7e5e4] pb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="text-lg font-bold text-[#57534e] uppercase tracking-wider">Massage Anticellulite</h4>
                  <span className="text-[#78716c] font-medium tracking-widest">150€</span>
                </div>
                <p className="text-sm text-[#78716c] font-light leading-relaxed">
                  Des manœuvres intenses de palper-rouler manuel pour déloger les capitons, assouplir les tissus et améliorer l'aspect peau d'orange.
                </p>
              </div>
            </div>

            {/* Colonne 2 : Technologies & Spécifique */}
            <div className="space-y-8">
              <h3 className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.3em] mb-6 border-b border-stone-100 pb-2">
                Haute Technologie & Spécifique
              </h3>

              <div className="border-b border-[#e7e5e4] pb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="text-lg font-bold text-[#57534e] uppercase tracking-wider">Radiofréquence & Cavitation</h4>
                  <span className="text-[#78716c] font-medium tracking-widest">150€</span>
                </div>
                <p className="text-sm text-[#78716c] font-light leading-relaxed">
                  Duo technologique : la cavitation détruit les cellules graisseuses par ultrasons, tandis que la radiofréquence retend la peau et traite le relâchement cutané.
                </p>
              </div>

              <div className="border-b border-[#e7e5e4] pb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="text-lg font-bold text-[#57534e] uppercase tracking-wider">Ondes de Choc</h4>
                  <span className="text-[#78716c] font-medium tracking-widest">150€</span>
                </div>
                <p className="text-sm text-[#78716c] font-light leading-relaxed">
                  L'arme fatale contre la cellulite incrustée de stade 3. Les ondes acoustiques fracturent les cloisons fibreuses pour une peau lissée et défibrosée.
                </p>
              </div>

              <div className="border-b border-[#e7e5e4] pb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="text-lg font-bold text-[#57534e] uppercase tracking-wider">Ultrasons</h4>
                  <span className="text-[#78716c] font-medium tracking-widest">150€</span>
                </div>
                <p className="text-sm text-[#78716c] font-light leading-relaxed">
                  Idéal pour cibler les rondeurs localisées et stimuler la lipolyse en profondeur sans abîmer les tissus environnants.
                </p>
              </div>

              <div className="border-b border-[#e7e5e4] pb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="text-lg font-bold text-[#57534e] uppercase tracking-wider">Massage Jambes Lourdes</h4>
                  <span className="text-[#78716c] font-medium tracking-widest">150€</span>
                </div>
                <p className="text-sm text-[#78716c] font-light leading-relaxed">
                  Un soin drainant spécifique pour relancer le retour veineux, soulager la sensation de pesanteur et affiner les chevilles et les mollets.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* DOUBLE IMAGE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="h-[300px] md:h-[400px] overflow-hidden shadow-lg">
            <img 
                src={imgMadero} 
                alt="Madérothérapie" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="h-[300px] md:h-[400px] overflow-hidden shadow-lg">
            <img 
                src={imgJambe} 
                alt="Soin Jambes Lourdes" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

      </div>

      {/* --- CTA : PRISE DE RDV --- */}
      <section className="max-w-4xl mx-auto px-4 text-center mb-24">
         <div className="border border-[#e7e5e4] p-12 bg-white shadow-xl">
            <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
              Prête à commencer ?
            </span>
            <h2 className="text-3xl md:text-5xl text-[#57534e] mb-8" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
              Réservez votre Bilan Offert
            </h2>
            <p className="text-[#57534e] font-light mb-6 leading-relaxed max-w-lg mx-auto">
              Transformez votre silhouette. Prenez rendez-vous dès maintenant pour un bilan morphologique et la création de votre cure sur-mesure.
            </p>
            
            <div className="mb-8">
               <span className="bg-[#fafaf9] border border-[#e7e5e4] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#57534e]">
                 Cures Personnalisées sur Devis
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