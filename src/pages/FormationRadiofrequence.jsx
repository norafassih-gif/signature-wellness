import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import imgFormation from '../assets/Radiofrequence et cavitation.png';

export default function FormationRadiofrequence() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white font-sans text-[#57534e] pt-24 pb-20">
      <Helmet>
        <title>Formation Radiofréquence, Cavitation & Ultrasons | Signature Wellness</title>
        <meta name="description" content="Maîtrisez les technologies de pointe : Radiofréquence, Cavitation et Ultrasons. Formation certifiante d'une journée pour le remodelage corporel." />
      </Helmet>

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16 mt-8">
        <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
          Technologies Amincissantes
        </span>
        <h1 className="text-3xl md:text-5xl mb-6 text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
          Radiofréquence, Cavitation & Ultrasons
        </h1>
        
        <div className="h-[1px] w-24 bg-[#57534e] mx-auto mb-8"></div>
        
        <p className="text-[#78716c] italic max-w-2xl mx-auto font-light leading-relaxed mb-12">
          Devenez experte des technologies de pointe pour le traitement du relâchement cutané et des amas graisseux. Une journée intensive pour maîtriser les protocoles de remodelage non-invasif.
        </p>

        {/* PHOTO DE FORMATION */}
        <div className="max-w-4xl mx-auto h-[400px] md:h-[500px] overflow-hidden shadow-2xl mb-16">
            <img 
                src={imgFormation} 
                alt="Formation Radiofréquence et Cavitation" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        
        {/* ENCART QUALIOPI */}
        <div className="bg-[#fafaf9] border border-[#e7e5e4] p-8 md:p-10 mb-16 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-light text-[#78716c]">
            <div>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Publics visés</strong>Professionnels de l'esthétique, du médical/paramédical, ou créateurs d'entreprise en soins de beauté technologiques.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Prérequis</strong>Connaissances de base en anatomie de la peau. Test de positionnement préalable à l'inscription.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Durée & Format</strong>1 jour (7 heures). Présentiel. Alternance de théorie technologique et pratique intensive sur machines.</p>
            </div>
            <div>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Modalités d'accès</strong>Entretien téléphonique et validation du dossier. Délai d'accès : 15 jours avant la session.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Tarifs & Financement</strong>Sur devis. Financement possible via OPCO ou fonds de formation selon éligibilité.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Accessibilité</strong>Locaux accessibles. Adaptation pédagogique possible sur demande pour les personnes en situation de handicap.</p>
            </div>
          </div>
        </div>

        {/* OBJECTIFS ET COMPETENCES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#e7e5e4] pb-2 text-[#57534e]">Objectifs Opérationnels</h2>
            <ul className="space-y-3 text-sm font-light text-[#78716c] list-disc list-inside">
              <li>Comprendre les principes physiques de la radiofréquence, de la cavitation et des ultrasons.</li>
              <li>Analyser les besoins du client (relâchement, cellulite, graisse localisée).</li>
              <li>Paramétrer les appareils en fonction de la zone et de l'objectif visé.</li>
              <li>Maîtriser les protocoles de sécurité et les contre-indications absolues.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#e7e5e4] pb-2 text-[#57534e]">Compétences Visées</h2>
            <ul className="space-y-3 text-sm font-light text-[#78716c] list-disc list-inside">
              <li>Réaliser un diagnostic cutané et corporel expert.</li>
              <li>Appliquer les techniques de radiofréquence (visage/corps) et de cavitation de façon sécurisée.</li>
              <li>Établir un plan de cure personnalisé et optimiser les résultats.</li>
              <li>Gérer l'hygiène et l'entretien du parc machine.</li>
            </ul>
          </div>
        </div>

        {/* PROGRAMME DETAILLE */}
        <div className="mb-16">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-[#e7e5e4] pb-2 text-[#57534e] text-center">Programme de la Journée</h2>
          
          <div className="space-y-8">
            <div className="bg-[#fafaf9] p-6 border border-[#e7e5e4]">
              <h3 className="font-bold text-[#57534e] uppercase tracking-widest text-sm mb-4">Matin : Maîtrise Technologique & Sécurité</h3>
              <ul className="space-y-2 text-sm font-light text-[#78716c]">
                <li><strong className="font-medium text-[#57534e]">Radiofréquence :</strong> Thermolyse sélective, néocollagénèse et traitement du relâchement cutané.</li>
                <li><strong className="font-medium text-[#57534e]">Cavitation & Ultrasons :</strong> Lipolyse par ondes de choc et élimination des graisses.</li>
                <li><strong className="font-medium text-[#57534e]">Bilan & Sécurité :</strong> Consultation, anamnèse, hygiène et contre-indications majeures.</li>
              </ul>
            </div>

            <div className="bg-[#fafaf9] p-6 border border-[#e7e5e4]">
              <h3 className="font-bold text-[#57534e] uppercase tracking-widest text-sm mb-4">Après-midi : Protocoles Pratiques & Business</h3>
              <ul className="space-y-2 text-sm font-light text-[#78716c]">
                <li><strong className="font-medium text-[#57534e]">Pratique :</strong> Démonstration et mise en situation sur modèles (zones critiques : ventre, cuisses, ovale du visage).</li>
                <li><strong className="font-medium text-[#57534e]">Optimisation :</strong> Combinaison des technologies pour des résultats maximaux (cures combinées).</li>
                <li><strong className="font-medium text-[#57534e]">Commercialisation :</strong> Argumentaire de vente, tarifs de cure et rentabilité de la machine.</li>
                <li><strong className="font-medium text-[#57534e]">Validation :</strong> Évaluation des acquis et remise du certificat de formation.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-24 border-t border-[#e7e5e4] pt-16">
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-6 text-[#57534e]">
            Passez à l'expertise technologique
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