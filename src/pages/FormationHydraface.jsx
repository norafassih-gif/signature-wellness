import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import imgFormation from '../assets/hydrafacial formation.jpg';

export default function FormationHydraface() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white font-sans text-[#57534e] pt-24 pb-20">
      <Helmet>
        <title>Formation Hydraface & Soins Visage Haute Performance | Signature Wellness</title>
        <meta name="description" content="Devenez experte du soin Hydraface. Formation professionnelle d'une journée pour maîtriser le nettoyage profond et la revitalisation cutanée." />
      </Helmet>

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16 mt-8">
        <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
          Expertise Visage
        </span>
        <h1 className="text-3xl md:text-5xl mb-6 text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
          Formation Hydraface : Éclat & Pureté
        </h1>
        
        <div className="h-[1px] w-24 bg-[#57534e] mx-auto mb-8"></div>
        
        <p className="text-[#78716c] italic max-w-2xl mx-auto font-light leading-relaxed mb-12">
          Maîtrisez le soin visage le plus demandé du moment. Une journée intensive pour apprendre à réaliser un nettoyage profond par hydro-microdermabrasion et une infusion de sérums revitalisants.
        </p>

        {/* PHOTO DE FORMATION */}
        <div className="max-w-4xl mx-auto h-[400px] md:h-[500px] overflow-hidden shadow-2xl mb-16">
            <img 
                src={imgFormation} 
                alt="Formation Hydraface" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        
        {/* ENCART QUALIOPI */}
        <div className="bg-[#fafaf9] border border-[#e7e5e4] p-8 md:p-10 mb-16 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-light text-[#78716c]">
            <div>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Publics visés</strong>Professionnels de l'esthétique, du bien-être, ou entrepreneurs en cosmétique souhaitant proposer des soins visage haute technologie.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Prérequis</strong>Connaissances de base en soins de la peau. Test de positionnement théorique avant l'entrée en formation.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Durée & Format</strong>1 jour (7 heures). Formation en présentiel mêlant théorie scientifique et pratique sur modèles.</p>
            </div>
            <div>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Modalités d'accès</strong>Entretien et étude du dossier. Délai d'accès : 15 jours ouvrés selon le calendrier des sessions.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Tarifs & Financement</strong>Sur devis. Éligible aux prises en charge par les OPCO ou fonds de formation (FAFCEA...).</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Accessibilité</strong>Locaux aux normes PMR. Contactez notre référent handicap pour toute demande d'adaptation spécifique.</p>
            </div>
          </div>
        </div>

        {/* OBJECTIFS ET COMPETENCES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#e7e5e4] pb-2 text-[#57534e]">Objectifs Opérationnels</h2>
            <ul className="space-y-3 text-sm font-light text-[#78716c] list-disc list-inside">
              <li>Comprendre les différentes phases du protocole Hydraface (exfoliation, peeling, extraction, hydratation).</li>
              <li>Savoir analyser les différents types de peau et sélectionner les sérums adaptés.</li>
              <li>Maîtriser l'utilisation technique de la machine et l'entretien des pièces à main.</li>
              <li>Identifier les indications et contre-indications majeures aux soins par aspiration.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#e7e5e4] pb-2 text-[#57534e]">Compétences Visées</h2>
            <ul className="space-y-3 text-sm font-light text-[#78716c] list-disc list-inside">
              <li>Réaliser un protocole complet de 45 à 60 minutes en toute autonomie.</li>
              <li>Garantir un environnement de travail stérile et sécurisé pour la cliente.</li>
              <li>Argumenter sur les bienfaits du soin pour vendre des cures personnalisées.</li>
              <li>Assurer un suivi post-soin expert pour optimiser les résultats cutanés.</li>
            </ul>
          </div>
        </div>

        {/* PROGRAMME DETAILLE */}
        <div className="mb-16">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-[#e7e5e4] pb-2 text-[#57534e] text-center">Programme de la Journée</h2>
          
          <div className="space-y-8">
            <div className="bg-[#fafaf9] p-6 border border-[#e7e5e4]">
              <h3 className="font-bold text-[#57534e] uppercase tracking-widest text-sm mb-4">Matin : Théorie & Diagnostic (3h30)</h3>
              <ul className="space-y-2 text-sm font-light text-[#78716c]">
                <li><strong className="font-medium text-[#57534e]">Anatomie :</strong> Rappels sur la structure cutanée et les besoins cellulaires.</li>
                <li><strong className="font-medium text-[#57534e]">Le Système Hydraface :</strong> Fonctionnement de l'aspiration sous vide et de l'infusion de principes actifs.</li>
                <li><strong className="font-medium text-[#57534e]">Sécurité :</strong> Hygiène stricte, contre-indications et gestion des sensibilités.</li>
                <li><strong className="font-medium text-[#57534e]">Diagnostic :</strong> Apprendre à lire la peau pour personnaliser les boosters.</li>
              </ul>
            </div>

            <div className="bg-[#fafaf9] p-6 border border-[#e7e5e4]">
              <h3 className="font-bold text-[#57534e] uppercase tracking-widest text-sm mb-4">Après-midi : Pratique Intensive & Business (3h30)</h3>
              <ul className="space-y-2 text-sm font-light text-[#78716c]">
                <li><strong className="font-medium text-[#57534e]">Démonstration :</strong> Le formateur réalise un protocole complet étape par étape.</li>
                <li><strong className="font-medium text-[#57534e]">Mise en situation :</strong> Pratique guidée en binôme pour maîtriser le geste et la pression.</li>
                <li><strong className="font-medium text-[#57534e]">Vente & Marketing :</strong> Positionnement prix, rentabilité et stratégies de communication.</li>
                <li><strong className="font-medium text-[#57534e]">Évaluation :</strong> Test pratique final et remise des attestations de formation.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-24 border-t border-[#e7e5e4] pt-16">
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-6 text-[#57534e]">
            Devenez experte en soins visage haute performance
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