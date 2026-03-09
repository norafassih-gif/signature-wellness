import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import imgFormation from '../assets/microneedling formation.jpg';

export default function FormationMicroneedling() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white font-sans text-[#57534e] pt-24 pb-20">
      <Helmet>
        <title>Formation Microneedling Expert : Visage & Corps | Signature Wellness</title>
        <meta name="description" content="Maîtrisez le Microneedling pour le visage, le corps, les vergetures et les cicatrices. Formation certifiante d'une journée alliant technique et sécurité." />
      </Helmet>

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16 mt-8">
        <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
          Soins Correctifs
        </span>
        <h1 className="text-3xl md:text-5xl mb-6 text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
          Microneedling Expert : Visage, Corps & Cicatrices
        </h1>
        
        <div className="h-[1px] w-24 bg-[#57534e] mx-auto mb-8"></div>
        
        <p className="text-[#78716c] italic max-w-2xl mx-auto font-light leading-relaxed mb-12">
          Devenez experte de l'induction collagénique par micro-perforation. Une formation intensive d'une journée pour apprendre à traiter efficacement le vieillissement cutané, les vergetures et les cicatrices d'acné ou post-opératoires.
        </p>

        {/* PHOTO DE FORMATION */}
        <div className="max-w-4xl mx-auto h-[400px] md:h-[500px] overflow-hidden shadow-2xl mb-16">
            <img 
                src={imgFormation} 
                alt="Formation Microneedling" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        
        {/* ENCART QUALIOPI */}
        <div className="bg-[#fafaf9] border border-[#e7e5e4] p-8 md:p-10 mb-16 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-light text-[#78716c]">
            <div>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Publics visés</strong>Esthéticien(ne)s, professionnel(le)s du paramédical, ou praticien(ne)s souhaitant se spécialiser dans les soins correctifs et anti-âge avancés.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Prérequis</strong>Connaissances fondamentales en anatomie et physiologie de la peau. Test de positionnement théorique préalable.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Durée & Format</strong>1 jour (7 heures). Présentiel. Enseignement théorique approfondi suivi d'une mise en pratique clinique sur modèles.</p>
            </div>
            <div>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Modalités d'accès</strong>Validation après étude du dossier et entretien. Délai d'accès indicatif : 15 jours ouvrés selon le calendrier annuel.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Tarifs & Financement</strong>Sur devis personnalisé. Financements possibles via les OPCO (ex: AKTO) ou le FAFCEA pour les artisans et indépendants.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Accessibilité</strong>Locaux aux normes PMR. Un accompagnement spécifique est possible pour les personnes en situation de handicap.</p>
            </div>
          </div>
        </div>

        {/* OBJECTIFS ET COMPETENCES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#e7e5e4] pb-2 text-[#57534e]">Objectifs Opérationnels</h2>
            <ul className="space-y-3 text-sm font-light text-[#78716c] list-disc list-inside">
              <li>Identifier les différentes couches de la peau et le processus de cicatrisation.</li>
              <li>Maîtriser la profondeur des aiguilles selon la zone (visage vs corps) et la problématique (cicatrices vs vergetures).</li>
              <li>Choisir et appliquer les principes actifs (sérums) adaptés aux besoins cutanés.</li>
              <li>Appliquer rigoureusement les protocoles d'asepsie et de sécurité sanitaire.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#e7e5e4] pb-2 text-[#57534e]">Compétences Visées</h2>
            <ul className="space-y-3 text-sm font-light text-[#78716c] list-disc list-inside">
              <li>Réaliser un diagnostic cutané expert pour définir le protocole de soin.</li>
              <li>Exécuter la technique de microneedling de façon sécurisée sur le visage et le corps.</li>
              <li>Concevoir des plans de cure personnalisés pour traiter les vergetures et les cicatrices.</li>
              <li>Informer la cliente sur les soins post-actes et assurer le suivi de la cicatrisation.</li>
            </ul>
          </div>
        </div>

        {/* PROGRAMME DETAILLE */}
        <div className="mb-16">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-[#e7e5e4] pb-2 text-[#57534e] text-center">Programme de la Journée</h2>
          
          <div className="space-y-8">
            <div className="bg-[#fafaf9] p-6 border border-[#e7e5e4]">
              <h3 className="font-bold text-[#57534e] uppercase tracking-widest text-sm mb-4">Matin : Science du Needling & Sécurité (3h30)</h3>
              <ul className="space-y-2 text-sm font-light text-[#78716c]">
                <li><strong className="font-medium text-[#57534e]">Théorie :</strong> Histologie de la peau, induction collagénique et physiopathologie des cicatrices et vergetures.</li>
                <li><strong className="font-medium text-[#57534e]">Hygiène :</strong> Gestion des déchets infectieux (DASRI), stérilisation et désinfection du poste.</li>
                <li><strong className="font-medium text-[#57534e]">Technique :</strong> Étude du matériel (Dermapen), réglages des aiguilles et choix des actifs (Mésothérapie).</li>
              </ul>
            </div>

            <div className="bg-[#fafaf9] p-6 border border-[#e7e5e4]">
              <h3 className="font-bold text-[#57534e] uppercase tracking-widest text-sm mb-4">Après-midi : Pratique Clinique & Business (3h30)</h3>
              <ul className="space-y-2 text-sm font-light text-[#78716c]">
                <li><strong className="font-medium text-[#57534e]">Mise en situation :</strong> Démonstration et pratique encadrée sur modèles (Focus visage/corps).</li>
                <li><strong className="font-medium text-[#57534e]">Soins Complémentaires :</strong> Utilisation du masque apaisant et de la photothérapie (LED) post-soin.</li>
                <li><strong className="font-medium text-[#57534e]">Marketing :</strong> Rentabilité, tarifs des cures correctives et développement de la clientèle spécialisée.</li>
                <li><strong className="font-medium text-[#57534e]">Évaluation :</strong> Test pratique et théorique final pour la validation des compétences.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-24 border-t border-[#e7e5e4] pt-16">
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-6 text-[#57534e]">
            Expertise en régénération cutanée
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