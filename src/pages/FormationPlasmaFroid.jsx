import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
// J'ai mis à jour le nom de l'image tel que tu l'as demandé
import imgFormation from '../assets/Plasma Froid.png';

export default function FormationPlasmaFroid() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white font-sans text-[#57534e] pt-24 pb-20">
      <Helmet>
        <title>Formation Plasma Froid & Fusion | Signature Wellness</title>
        <meta name="description" content="Formation experte d'une journée sur la technologie du Plasma Fusion (Chaud & Froid). Maîtrisez le traitement de l'acné, l'anti-âge et le lifting non chirurgical." />
      </Helmet>

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16 mt-8">
        <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
          Haute Technologie Visage
        </span>
        <h1 className="text-3xl md:text-5xl mb-6 text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
          Formation Plasma Froid & Fusion
        </h1>
        
        <div className="h-[1px] w-24 bg-[#57534e] mx-auto mb-8"></div>
        
        <p className="text-[#78716c] italic max-w-2xl mx-auto font-light leading-relaxed mb-12">
          Découvrez la puissance du 4ème état de la matière. Une formation intensive d'une journée pour maîtriser la double technologie : le plasma froid pour traiter l'acné et l'inflammation, et le plasma fusion (chaud) pour un effet lifting non chirurgical (paupières, rides).
        </p>

        {/* PHOTO DE FORMATION */}
        <div className="max-w-4xl mx-auto h-[400px] md:h-[500px] overflow-hidden shadow-2xl mb-16">
            <img 
                src={imgFormation} 
                alt="Formation Plasma Froid Fusion" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        
        {/* ENCART QUALIOPI */}
        <div className="bg-[#fafaf9] border border-[#e7e5e4] p-8 md:p-10 mb-16 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-light text-[#78716c]">
            <div>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Publics visés</strong>Professionnels de l'esthétique, du paramédical et facialistes souhaitant intégrer le lifting non invasif et le traitement cutané de haute précision.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Prérequis</strong>Connaissances de base de l'anatomie de la peau. Un entretien préalable de positionnement valide l'inscription.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Durée & Format</strong>1 jour (7 heures). Format présentiel intensif combinant la théorie biophysique et la pratique clinique sur modèles réels.</p>
            </div>
            <div>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Modalités d'accès</strong>Évaluation des besoins et validation du dossier. Délai d'accès indicatif : 15 jours avant la date de session.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Tarifs & Financement</strong>Sur devis. Possibilité de prise en charge par les fonds d'assurance formation (OPCO, FAFCEA).</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Accessibilité</strong>Locaux accessibles PMR. Si vous avez des besoins spécifiques liés à un handicap, notre référent est à votre écoute.</p>
            </div>
          </div>
        </div>

        {/* OBJECTIFS ET COMPETENCES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#e7e5e4] pb-2 text-[#57534e]">Objectifs Opérationnels</h2>
            <ul className="space-y-3 text-sm font-light text-[#78716c] list-disc list-inside">
              <li>Distinguer les actions du Plasma Froid (stérilisation, acné) et du Plasma Fusion (arc électrique, rétractation des tissus).</li>
              <li>Maîtriser les réglages de l'appareil (intensité, fréquence) selon la zone et l'objectif (lifting des paupières, rides, cicatrices).</li>
              <li>Comprendre le principe d'électroporation pour optimiser l'infusion des principes actifs (sérums).</li>
              <li>Identifier les contre-indications absolues et gérer les suites de soin (éviction solaire, micro-croûtes).</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#e7e5e4] pb-2 text-[#57534e]">Compétences Visées</h2>
            <ul className="space-y-3 text-sm font-light text-[#78716c] list-disc list-inside">
              <li>Réaliser un diagnostic précis pour choisir entre le protocole froid (apaisant) ou fusion (anti-âge profond).</li>
              <li>Exécuter la technique de sublimation de manière sécurisée (quadrillage thermique) sans léser la couche basale de l'épiderme.</li>
              <li>Prescrire une routine de cicatrisation rigoureuse à la cliente.</li>
              <li>Argumenter sur la technologie pour vendre des prestations correctives à forte valeur ajoutée.</li>
            </ul>
          </div>
        </div>

        {/* PROGRAMME DETAILLE */}
        <div className="mb-16">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-[#e7e5e4] pb-2 text-[#57534e] text-center">Programme de la Journée</h2>
          
          <div className="space-y-8">
            <div className="bg-[#fafaf9] p-6 border border-[#e7e5e4]">
              <h3 className="font-bold text-[#57534e] uppercase tracking-widest text-sm mb-4">Matin : Maîtrise des Technologies (3h30)</h3>
              <ul className="space-y-2 text-sm font-light text-[#78716c]">
                <li><strong className="font-medium text-[#57534e]">La Double Technologie :</strong> Différence entre le plasma froid (bactéricide) et le plasma fusion/chaud (effet thermique et rétractation).</li>
                <li><strong className="font-medium text-[#57534e]">Le Plasma Froid :</strong> Traitement de l'acné, de la rosacée, et protocoles d'infusion de sérums (électroporation).</li>
                <li><strong className="font-medium text-[#57534e]">Le Plasma Fusion :</strong> Technique de "blepharoplastie médicale", lissage des rides péri-buccales et traitement des vergetures.</li>
                <li><strong className="font-medium text-[#57534e]">Sécurité :</strong> Hygiène, gestion de l'arc électrique, limites physiologiques et contre-indications.</li>
              </ul>
            </div>

            <div className="bg-[#fafaf9] p-6 border border-[#e7e5e4]">
              <h3 className="font-bold text-[#57534e] uppercase tracking-widest text-sm mb-4">Après-midi : Pratique Clinique & Business (3h30)</h3>
              <ul className="space-y-2 text-sm font-light text-[#78716c]">
                <li><strong className="font-medium text-[#57534e]">Atelier Plasma Froid :</strong> Pratique sur modèles pour les soins apaisants et purifiants sans douleur.</li>
                <li><strong className="font-medium text-[#57534e]">Atelier Plasma Fusion :</strong> Pratique de la sublimation thermique sur des zones spécifiques (rides, relâchement).</li>
                <li><strong className="font-medium text-[#57534e]">Gestion du Post-Soin :</strong> Expliquer l'évolution des croûtes à la cliente et prescrire les produits réparateurs.</li>
                <li><strong className="font-medium text-[#57534e]">Validation :</strong> Évaluation de la dextérité et remise du certificat de formation.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-24 border-t border-[#e7e5e4] pt-16">
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-6 text-[#57534e]">
            Proposez l'innovation anti-âge ultime
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