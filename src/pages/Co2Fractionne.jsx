import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// --- IMPORTATION DES IMAGES (CORRIGÉES SANS ESPACES) ---
import imgMain from '../assets/Hifu.jpg';
import imgPlasma from "../assets/soin-plasma.png"; 
import imgBottom from "../assets/Corp4.jpg"; // Vérifie bien que c'est .jpg et sans espace

export default function Co2Fractionne() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white font-sans text-[#57534e] pt-24 pb-20">
      <Helmet>
        <title>CO2 Fractionné & Technologies Régénérantes | Signature Wellness</title>
        <meta name="description" content="Découvrez nos soins haute technologie : Laser CO2 fractionné, HIFU, Plasma Froid et Carboxythérapie pour une régénération cellulaire profonde." />
      </Helmet>

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16 mt-8">
        <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
          Haute Technologie Esthétique
        </span>
        <h1 className="text-3xl md:text-5xl mb-6 text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
          CO2 Fractionné & Régénération
        </h1>
        
        <div className="h-[1px] w-24 bg-[#57534e] mx-auto mb-8"></div>
        
        <p className="text-[#78716c] italic max-w-2xl mx-auto font-light leading-relaxed mb-12">
          L'alliance des technologies les plus avancées du marché pour traiter le relâchement cutané, les cicatrices, les rides profondes et l'oxygénation des tissus. Des résultats visibles et durables, sans chirurgie.
        </p>

        {/* PHOTO PRINCIPALE */}
        <div className="max-w-5xl mx-auto h-[400px] md:h-[600px] overflow-hidden shadow-2xl mb-24">
            <img 
                src={imgMain} 
                alt="Soin haute technologie CO2 Fractionné" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        
        {/* SECTION TARIFS / CARTE DES SOINS */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-12 text-center text-[#57534e]">
            Carte des Soins Technologiques
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Colonne 1 : CO2 & Carboxy */}
            <div className="space-y-8">
              <div className="border-b border-[#e7e5e4] pb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-bold text-[#57534e] uppercase tracking-wider">Laser CO2 Fractionné</h3>
                  <span className="text-[#78716c] font-medium tracking-widest">250€ - 450€</span>
                </div>
                <p className="text-sm text-[#78716c] font-light leading-relaxed">
                  Le traitement de référence pour le relissage cutané, la réduction des rides profondes, des cicatrices d'acné et des vergetures. Stimule la production de collagène de manière spectaculaire.
                </p>
              </div>

              <div className="border-b border-[#e7e5e4] pb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-bold text-[#57534e] uppercase tracking-wider">Carboxythérapie</h3>
                  <span className="text-[#78716c] font-medium tracking-widest">300€</span>
                </div>
                <p className="text-sm text-[#78716c] font-light leading-relaxed">
                  Infusion de CO2 stérile sous la peau pour forcer l'oxygénation des tissus. Idéal pour traiter les cernes foncés, la cellulite, la perte de tonicité et stimuler la microcirculation.
                </p>
              </div>
            </div>

            {/* Colonne 2 : HIFU & Plasma */}
            <div className="space-y-8">
              <div className="border-b border-[#e7e5e4] pb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-bold text-[#57534e] uppercase tracking-wider">HIFU (Lifting Ultrasons)</h3>
                </div>
                <div className="flex justify-between text-sm text-[#78716c] font-medium tracking-widest mb-2">
                  <span>Visage</span>
                  <span>250€</span>
                </div>
                <div className="flex justify-between text-sm text-[#78716c] font-medium tracking-widest mb-2">
                  <span>Corps</span>
                  <span>350€</span>
                </div>
                <p className="text-sm text-[#78716c] font-light leading-relaxed mt-2">
                  Ultrasons Focalisés de Haute Intensité. Un véritable lifting non chirurgical qui agit sur le muscle (SMAS) pour retendre l'ovale du visage ou raffermir les zones corporelles relâchées.
                </p>
              </div>

              <div className="border-b border-[#e7e5e4] pb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-bold text-[#57534e] uppercase tracking-wider">Plasma Froid</h3>
                  <span className="text-[#78716c] font-medium tracking-widest">300€</span>
                </div>
                <p className="text-sm text-[#78716c] font-light leading-relaxed">
                  Technologie révolutionnaire sans contact ni chaleur. Action hautement bactéricide contre l'acné, apaisement des peaux réactives et ouverture des canaux cellulaires pour une pénétration extrême des actifs.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* IMAGE INTERMÉDIAIRE */}
        <div className="max-w-4xl mx-auto h-[300px] md:h-[450px] overflow-hidden shadow-xl mb-24">
            <img 
                src={imgPlasma} 
                alt="Technologie Plasma Froid" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
        </div>

        {/* POURQUOI CHOISIR CES TECHNOLOGIES */}
        <div className="bg-[#fafaf9] p-8 md:p-12 border border-[#e7e5e4] mb-24">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-8 text-center text-[#57534e]">
            Pourquoi combiner ces technologies ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-sm font-light text-[#78716c]">
            <div>
              <h3 className="font-bold text-[#57534e] uppercase tracking-widest text-xs mb-3">Synergie</h3>
              <p>Chaque peau est unique. Nous associons ces machines pour traiter vos problématiques à tous les niveaux de la peau, de l'épiderme jusqu'au muscle.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#57534e] uppercase tracking-widest text-xs mb-3">Sécurité</h3>
              <p>Des protocoles strictement encadrés pour garantir des résultats visibles en toute sécurité, sans les contraintes d'une intervention chirurgicale.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#57534e] uppercase tracking-widest text-xs mb-3">Sur-Mesure</h3>
              <p>Un diagnostic précis est réalisé avant chaque séance afin d'adapter la technologie, l'intensité et les principes actifs à vos besoins immédiats.</p>
            </div>
          </div>
        </div>

        {/* IMAGE DU BAS */}
        <div className="max-w-5xl mx-auto h-[400px] md:h-[500px] overflow-hidden shadow-2xl mb-16">
            <img 
                src={imgBottom} 
                alt="Traitement Corps Haute Technologie" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
        </div>
      </div>

      {/* --- CTA --- */}
      <section className="max-w-4xl mx-auto px-4 text-center mb-24">
         <div className="border border-[#e7e5e4] p-12 bg-white shadow-xl">
            <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
              Prête à commencer ?
            </span>
            <h2 className="text-3xl md:text-5xl text-[#57534e] mb-8" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
              Réservez votre Bilan Offert
            </h2>
            <p className="text-[#57534e] font-light mb-6 leading-relaxed max-w-lg mx-auto">
              Révélez votre nouvelle peau. Prenez rendez-vous dès maintenant pour votre consultation et diagnostic personnalisé.
            </p>
            
            <div className="mb-8">
               <span className="bg-[#fafaf9] border border-[#e7e5e4] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#57534e]">
                 Tarification sur Devis ou à la séance
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