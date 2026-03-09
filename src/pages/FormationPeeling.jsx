import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
// CORRECTION ICI : Le bon nom et la bonne extension (.jpg)
import imgFormation from '../assets/peeling.jpg';

export default function FormationPeeling() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white font-sans text-[#57534e] pt-24 pb-20">
      <Helmet>
        <title>Formation Peeling Professionnel : 5 Protocoles | Signature Wellness</title>
        <meta name="description" content="Formation experte de 2 jours sur les peelings chimiques et cosmétologiques. Maîtrisez 5 protocoles pour traiter l'acné, les taches et le vieillissement." />
      </Helmet>

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16 mt-8">
        <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
          Expertise Peau & Anti-Âge
        </span>
        <h1 className="text-3xl md:text-5xl mb-6 text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
          Peelings Professionnels : Les 5 Protocoles
        </h1>
        
        <div className="h-[1px] w-24 bg-[#57534e] mx-auto mb-8"></div>
        
        <p className="text-[#78716c] italic max-w-2xl mx-auto font-light leading-relaxed mb-12">
          Devenez une véritable experte de la peau. Une formation intensive de 2 jours pour maîtriser l'action des acides (AHA, BHA...) et réaliser 5 protocoles ciblés : anti-âge, anti-taches, anti-acné, coup d'éclat et peaux sensibles.
        </p>

        {/* PHOTO DE FORMATION */}
        <div className="max-w-4xl mx-auto h-[400px] md:h-[500px] overflow-hidden shadow-2xl mb-16">
            <img 
                src={imgFormation} 
                alt="Formation Peeling" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        
        {/* ENCART QUALIOPI */}
        <div className="bg-[#fafaf9] border border-[#e7e5e4] p-8 md:p-10 mb-16 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-light text-[#78716c]">
            <div>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Publics visés</strong>Esthéticiennes diplômées, praticiennes en dermo-cosmétique, ou professionnels de santé souhaitant intégrer les peelings à leur carte de soins.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Prérequis</strong>Maîtrise de l'anatomie et de la physiologie de la peau. Entretien de positionnement obligatoire avant l'inscription.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Durée & Format</strong>2 jours (14 heures). Formation présentielle alliant théorie biochimique et pratique rigoureuse sur modèles réels.</p>
            </div>
            <div>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Modalités d'accès</strong>Dossier de candidature et validation des prérequis. Délai d'accès : 15 jours ouvrés selon le planning.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Tarifs & Financement</strong>Sur devis. Financement possible via les OPCO (AKTO, etc.) ou FAFCEA pour les dirigeantes de salons.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Accessibilité</strong>Locaux adaptés aux normes PMR. Contactez notre référent handicap pour évaluer les adaptations pédagogiques nécessaires.</p>
            </div>
          </div>
        </div>

        {/* OBJECTIFS ET COMPETENCES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#e7e5e4] pb-2 text-[#57534e]">Objectifs Opérationnels</h2>
            <ul className="space-y-3 text-sm font-light text-[#78716c] list-disc list-inside">
              <li>Comprendre la biochimie des différents acides (Glycolique, Salicylique, Lactique, Mandélique, etc.) et les notions de pH/pKa.</li>
              <li>Identifier précisément les phototypes (classification de Fitzpatrick) et les indications cutanées.</li>
              <li>Maîtriser 5 protocoles distincts de peeling selon l'objectif (acné, taches, rides, éclat, sensibilité).</li>
              <li>Connaître les contre-indications strictes et savoir gérer les réactions cutanées (érythème, blanchiment/frost).</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#e7e5e4] pb-2 text-[#57534e]">Compétences Visées</h2>
            <ul className="space-y-3 text-sm font-light text-[#78716c] list-disc list-inside">
              <li>Mener une consultation experte et réaliser un diagnostic de peau approfondi.</li>
              <li>Appliquer les solutions exfoliantes en toute sécurité (dosage, temps de pose, neutralisation).</li>
              <li>Prescrire une routine de préparation de la peau (pré-peeling) et de réparation (post-peeling).</li>
              <li>Informer la cliente sur les évictions sociales, solaires et garantir un suivi rigoureux.</li>
            </ul>
          </div>
        </div>

        {/* PROGRAMME DETAILLE */}
        <div className="mb-16">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-[#e7e5e4] pb-2 text-[#57534e] text-center">Programme des 2 Jours</h2>
          
          <div className="space-y-8">
            <div className="bg-[#fafaf9] p-6 border border-[#e7e5e4]">
              <h3 className="font-bold text-[#57534e] uppercase tracking-widest text-sm mb-4">Jour 1 : L'Expertise des Acides & Sécurité (7h)</h3>
              <ul className="space-y-2 text-sm font-light text-[#78716c]">
                <li><strong className="font-medium text-[#57534e]">Théorie Biochimique :</strong> Les AHA, BHA, PHA et leurs actions. Comprendre la différence entre pourcentage, pH et biodisponibilité.</li>
                <li><strong className="font-medium text-[#57534e]">Anamnèse :</strong> Phototypes, altérations cutanées (mélasma, acné rétentionnelle, vieillissement) et contre-indications.</li>
                <li><strong className="font-medium text-[#57534e]">Les 5 Protocoles :</strong> Étude détaillée de chaque protocole, du nettoyage préparatoire à la neutralisation.</li>
                <li><strong className="font-medium text-[#57534e]">Démonstration :</strong> Le formateur réalise le protocole "Coup d'éclat" et le protocole "Anti-Acné".</li>
              </ul>
            </div>

            <div className="bg-[#fafaf9] p-6 border border-[#e7e5e4]">
              <h3 className="font-bold text-[#57534e] uppercase tracking-widest text-sm mb-4">Jour 2 : Pratique Clinique & Protocoles Avancés (7h)</h3>
              <ul className="space-y-2 text-sm font-light text-[#78716c]">
                <li><strong className="font-medium text-[#57534e]">Pratique (Matin) :</strong> Ateliers de pratique sur modèles pour les peelings superficiels (éclat, hydratation, peaux sensibles).</li>
                <li><strong className="font-medium text-[#57534e]">Pratique (Après-midi) :</strong> Protocoles ciblés sur modèles (dépigmentant, anti-âge profond).</li>
                <li><strong className="font-medium text-[#57534e]">Post-Acte :</strong> Utilisation de masques réparateurs, photothérapie LED et prescription de la routine domicile.</li>
                <li><strong className="font-medium text-[#57534e]">Évaluation :</strong> Mise en situation complète, QCM théorique et remise des certificats de réussite.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-24 border-t border-[#e7e5e4] pt-16">
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-6 text-[#57534e]">
            Passez au niveau supérieur en dermo-esthétique
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