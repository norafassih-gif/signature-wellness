import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import imgFormation from '../assets/Onde de choc.png';

export default function FormationOndesChoc() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white font-sans text-[#57534e] pt-24 pb-20">
      <Helmet>
        <title>Formation Ondes de Choc | Signature Wellness</title>
        <meta name="description" content="Spécialisez-vous dans la technologie des ondes de choc. Formation certifiante d'une journée pour le traitement de la cellulite et la récupération post-opératoire." />
      </Helmet>

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16 mt-8">
        <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
          Expertise Technologique
        </span>
        <h1 className="text-3xl md:text-5xl mb-6 text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
          Ondes de Choc : Cellulite & Fibrose
        </h1>
        
        <div className="h-[1px] w-24 bg-[#57534e] mx-auto mb-8"></div>
        
        <p className="text-[#78716c] italic max-w-2xl mx-auto font-light leading-relaxed mb-12">
          Maîtrisez l'une des technologies les plus puissantes du marché pour traiter les tissus fibreux, relancer la micro-circulation et lisser l'aspect peau d'orange de façon durable.
        </p>

        {/* PHOTO DE FORMATION */}
        <div className="max-w-4xl mx-auto h-[400px] md:h-[500px] overflow-hidden shadow-2xl mb-16">
            <img 
                src={imgFormation} 
                alt="Formation Ondes de Choc" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        
        {/* ENCART QUALIOPI */}
        <div className="bg-[#fafaf9] border border-[#e7e5e4] p-8 md:p-10 mb-16 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-light text-[#78716c]">
            <div>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Publics visés</strong>Professionnels de l'esthétique, du bien-être, ou experts du post-opératoire souhaitant traiter les fibroses cicatricielles.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Prérequis</strong>Connaissances de base de l'anatomie lymphatique et veineuse. Entretien préalable nécessaire.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Durée & Format</strong>1 jour (7 heures). Formation présentielle alliant théorie technique et ateliers pratiques intensifs.</p>
            </div>
            <div>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Modalités d'accès</strong>Positionnement pré-formation. Délai d'accès : 15 jours ouvrés selon les dates de sessions prévues.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Tarifs & Financement</strong>Sur devis. Éligible aux prises en charge par les OPCO ou fonds de formation dédiés aux indépendants.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Accessibilité</strong>Locaux aux normes PMR. Contactez notre référent handicap pour étudier toute adaptation nécessaire.</p>
            </div>
          </div>
        </div>

        {/* OBJECTIFS ET COMPETENCES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#e7e5e4] pb-2 text-[#57534e]">Objectifs Opérationnels</h2>
            <ul className="space-y-3 text-sm font-light text-[#78716c] list-disc list-inside">
              <li>Comprendre la biophysique des ondes de choc acoustiques et leurs effets tissulaires.</li>
              <li>Distinguer les différents applicateurs et réglages (fréquence, pression, nombre de coups).</li>
              <li>Savoir traiter les différents stades de cellulite et les fibroses post-chirurgie.</li>
              <li>Établir un protocole de sécurité rigoureux pour éviter tout dommage tissulaire.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#e7e5e4] pb-2 text-[#57534e]">Compétences Visées</h2>
            <ul className="space-y-3 text-sm font-light text-[#78716c] list-disc list-inside">
              <li>Mise en œuvre d'un protocole d'ondes de choc sécurisé et efficace.</li>
              <li>Analyse clinique des tissus pour une personnalisation des paramètres.</li>
              <li>Capacité à combiner les ondes de choc avec d'autres soins (drainage, radiofréquence).</li>
              <li>Respect de la charte de qualité et d'hygiène Signature Wellness.</li>
            </ul>
          </div>
        </div>

        {/* PROGRAMME DETAILLE */}
        <div className="mb-16">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-[#e7e5e4] pb-2 text-[#57534e] text-center">Programme de la Journée</h2>
          
          <div className="space-y-8">
            <div className="bg-[#fafaf9] p-6 border border-[#e7e5e4]">
              <h3 className="font-bold text-[#57534e] uppercase tracking-widest text-sm mb-4">Matin : Théorie Appliquée & Manipulation</h3>
              <ul className="space-y-2 text-sm font-light text-[#78716c]">
                <li><strong className="font-medium text-[#57534e]">Technologie :</strong> Physique des ondes acoustiques et impact sur les adipocytes et le collagène.</li>
                <li><strong className="font-medium text-[#57534e]">Cadre Légal :</strong> Responsabilités, contre-indications et limites d'intervention.</li>
                <li><strong className="font-medium text-[#57534e]">Manipulation :</strong> Découverte du matériel, entretien des têtes et réglages logiciels.</li>
              </ul>
            </div>

            <div className="bg-[#fafaf9] p-6 border border-[#e7e5e4]">
              <h3 className="font-bold text-[#57534e] uppercase tracking-widest text-sm mb-4">Après-midi : Pratique Clinique & Certification</h3>
              <ul className="space-y-2 text-sm font-light text-[#78716c]">
                <li><strong className="font-medium text-[#57534e]">Atelier Pratique :</strong> Application sur modèles réels (Focus sur les cuisses, fessiers et zones fibrosées).</li>
                <li><strong className="font-medium text-[#57534e]">Synergie :</strong> Apprentissage des protocoles combinés pour booster la rentabilité des cures.</li>
                <li><strong className="font-medium text-[#57534e]">Business :</strong> Positionnement tarifaire et communication marketing autour de la technologie.</li>
                <li><strong className="font-medium text-[#57534e]">Validation :</strong> Examen pratique final et remise des certificats de réussite.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-24 border-t border-[#e7e5e4] pt-16">
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-6 text-[#57534e]">
            Maîtrisez la puissance des ondes de choc
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <a 
              href="mailto:Signature.wellnessacademy@gmail.com"
              className="inline-block bg-[#57534e] text-white px-10 py-4 uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#78716c] transition-colors shadow-lg"
            >
              Demander un devis
            </a>
            <Link 
              to="/reservation" 
              className="inline-block bg-white text-[#57534e] border border-[#57534e] px-10 py-4 uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#fafaf9] transition-colors"
            >
              Voir le planning
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}