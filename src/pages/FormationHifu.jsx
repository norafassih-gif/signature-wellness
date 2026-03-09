import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import imgFormation from '../assets/Hifu.jpg';

export default function FormationHifu() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white font-sans text-[#57534e] pt-24 pb-20">
      <Helmet>
        <title>Formation HIFU : Lifting Non Chirurgical | Signature Wellness</title>
        <meta name="description" content="Formation certifiante d'une journée sur la technologie HIFU. Maîtrisez le lifting non invasif, le traitement du relâchement cutané et la cartographie faciale." />
      </Helmet>

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16 mt-8">
        <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
          Haute Technologie Anti-Âge
        </span>
        <h1 className="text-3xl md:text-5xl mb-6 text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
          Formation HIFU
        </h1>
        
        <div className="h-[1px] w-24 bg-[#57534e] mx-auto mb-8"></div>
        
        <p className="text-[#78716c] italic max-w-2xl mx-auto font-light leading-relaxed mb-12">
          Devenez experte du lifting non chirurgical par Ultrasons Focalisés de Haute Intensité. Une journée de formation pointue pour maîtriser la stimulation du SMAS, le traitement du relâchement cutané et la sécurité anatomique.
        </p>

        {/* PHOTO DE FORMATION */}
        <div className="max-w-4xl mx-auto h-[400px] md:h-[500px] overflow-hidden shadow-2xl mb-16">
            <img 
                src={imgFormation} 
                alt="Formation HIFU" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        
        {/* ENCART QUALIOPI */}
        <div className="bg-[#fafaf9] border border-[#e7e5e4] p-8 md:p-10 mb-16 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-light text-[#78716c]">
            <div>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Publics visés</strong>Professionnels de l'esthétique anti-âge, paramédical, et facialistes souhaitant proposer une alternative au lifting chirurgical.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Prérequis</strong>Excellente connaissance de l'anatomie faciale exigée. Un entretien de positionnement validera vos acquis avant inscription.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Durée & Format</strong>1 jour (7 heures). Présentiel. Focus sur la théorie des ultrasons, la cartographie faciale et la pratique clinique.</p>
            </div>
            <div>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Modalités d'accès</strong>Évaluation des prérequis et validation du dossier. Délai d'accès indicatif : 15 jours avant la session.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Tarifs & Financement</strong>Sur devis. Prestation éligible aux financements de la formation professionnelle (OPCO, FAFCEA).</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Accessibilité</strong>Locaux conformes aux normes PMR. N'hésitez pas à solliciter notre référent handicap pour toute adaptation nécessaire.</p>
            </div>
          </div>
        </div>

        {/* OBJECTIFS ET COMPETENCES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#e7e5e4] pb-2 text-[#57534e]">Objectifs Opérationnels</h2>
            <ul className="space-y-3 text-sm font-light text-[#78716c] list-disc list-inside">
              <li>Comprendre la physique des ultrasons focalisés et le processus de néocollagénèse.</li>
              <li>Identifier les différentes profondeurs d'action (1.5mm, 3.0mm, 4.5mm pour le visage et le SMAS).</li>
              <li>Maîtriser parfaitement la cartographie faciale pour éviter les zones de danger (nerfs faciaux, glandes).</li>
              <li>Paramétrer la machine (joules, espacement, longueur de ligne) en fonction du diagnostic.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#e7e5e4] pb-2 text-[#57534e]">Compétences Visées</h2>
            <ul className="space-y-3 text-sm font-light text-[#78716c] list-disc list-inside">
              <li>Réaliser une anamnèse complète pour écarter les contre-indications formelles.</li>
              <li>Tracer les zones de traitement sur le patient de manière précise et sécurisée.</li>
              <li>Exécuter le protocole de tirs HIFU avec une pression et une inclinaison correctes.</li>
              <li>Accompagner le patient sur le suivi post-soin et la gestion des résultats progressifs.</li>
            </ul>
          </div>
        </div>

        {/* PROGRAMME DETAILLE */}
        <div className="mb-16">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-[#e7e5e4] pb-2 text-[#57534e] text-center">Programme de la Journée</h2>
          
          <div className="space-y-8">
            <div className="bg-[#fafaf9] p-6 border border-[#e7e5e4]">
              <h3 className="font-bold text-[#57534e] uppercase tracking-widest text-sm mb-4">Matin : Anatomie & Sécurité (3h30)</h3>
              <ul className="space-y-2 text-sm font-light text-[#78716c]">
                <li><strong className="font-medium text-[#57534e]">Théorie Technologique :</strong> Principe de la coagulation thermique ciblée, le système aponévrotique musculaire superficiel (SMAS).</li>
                <li><strong className="font-medium text-[#57534e]">Anatomie Pointue :</strong> Étude approfondie des nerfs faciaux, zones interdites et zones de prudence.</li>
                <li><strong className="font-medium text-[#57534e]">Cartographie :</strong> Apprentissage du marquage au crayon blanc sur le visage.</li>
                <li><strong className="font-medium text-[#57534e]">Sécurité :</strong> Les contre-indications absolues (implants, injections récentes) et les risques de brûlure.</li>
              </ul>
            </div>

            <div className="bg-[#fafaf9] p-6 border border-[#e7e5e4]">
              <h3 className="font-bold text-[#57534e] uppercase tracking-widest text-sm mb-4">Après-midi : Pratique Clinique & Rentabilité (3h30)</h3>
              <ul className="space-y-2 text-sm font-light text-[#78716c]">
                <li><strong className="font-medium text-[#57534e]">Démonstration :</strong> Cartographie et réglages sur modèle par la formatrice.</li>
                <li><strong className="font-medium text-[#57534e]">Mise en pratique :</strong> Réalisation d'un soin complet (ovale du visage, cou ou double menton) sous supervision stricte.</li>
                <li><strong className="font-medium text-[#57534e]">Développement Commercial :</strong> Explication du délai d'action (1 à 3 mois) au client, fixation des tarifs et rentabilité des cartouches.</li>
                <li><strong className="font-medium text-[#57534e]">Évaluation :</strong> Test théorique d'anatomie et validation pratique. Remise de l'attestation.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-24 border-t border-[#e7e5e4] pt-16">
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-6 text-[#57534e]">
            Intégrez le lifting sans chirurgie à votre carte
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