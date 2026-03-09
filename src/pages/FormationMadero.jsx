import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
// Importation de la photo
import imgFormation from '../assets/maderotherapie.jpg';

export default function FormationMadero() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white font-sans text-[#57534e] pt-24 pb-20">
      <Helmet>
        <title>Formation Madérothérapie Corps | Signature Wellness</title>
        <meta name="description" content="Formation professionnelle certifiante d'une journée en Madérothérapie. Maîtrisez l'art du remodelage corporel colombien avec les outils en bois." />
      </Helmet>

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16 mt-8">
        <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
          Soins du Corps
        </span>
        <h1 className="text-3xl md:text-5xl mb-6 text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
          Madérothérapie Corps : Remodelage & Anti-Cellulite
        </h1>
        
        <div className="h-[1px] w-24 bg-[#57534e] mx-auto mb-8"></div>
        
        <p className="text-[#78716c] italic max-w-2xl mx-auto font-light leading-relaxed mb-12">
          Devenez experte de cette technique ancestrale colombienne. Une formation intensive d'une journée pour maîtriser l'utilisation des outils en bois, casser la cellulite et sculpter la silhouette de vos clientes.
        </p>

        {/* PHOTO DE FORMATION */}
        <div className="max-w-4xl mx-auto h-[400px] md:h-[500px] overflow-hidden shadow-2xl mb-16">
            <img 
                src={imgFormation} 
                alt="Formation Madérothérapie" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        
        {/* ENCART QUALIOPI (Les infos clés) */}
        <div className="bg-[#fafaf9] border border-[#e7e5e4] p-8 md:p-10 mb-16 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-light text-[#78716c]">
            <div>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Publics visés</strong>Esthéticien(ne)s, praticien(ne)s en massage bien-être, ou personnes en reconversion professionnelle souhaitant proposer des soins minceur.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Prérequis</strong>Aucun prérequis technique exigé. Une sensibilité au toucher corporel et une bonne condition physique sont recommandées.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Durée & Format</strong>1 jour (soit 7 heures de formation). Présentiel, axé à 70% sur la pratique avec mise en situation réelle.</p>
            </div>
            <div>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Modalités d'accès</strong>Test de positionnement avant inscription. Délai d'accès indicatif : 15 jours ouvrés selon le planning des sessions.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Tarifs & Financement</strong>Sur devis. Éligible aux financements de la formation professionnelle (OPCO, FAFCEA...). Devis transmis sous 48h.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Accessibilité</strong>Locaux adaptés. Si vous êtes en situation de handicap, contactez-nous pour adapter la pédagogie et l'ergonomie de l'apprentissage.</p>
            </div>
          </div>
        </div>

        {/* OBJECTIFS ET COMPETENCES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#e7e5e4] pb-2 text-[#57534e]">Objectifs Opérationnels</h2>
            <ul className="space-y-3 text-sm font-light text-[#78716c] list-disc list-inside">
              <li>Identifier les différents types de cellulite (aqueuse, adipeuse, fibreuse) pour adapter le soin.</li>
              <li>Maîtriser chaque instrument en bois (rouleau strié, cubes, champignon, coupe suédoise, planche).</li>
              <li>Savoir alterner drainage manuel et outils en bois pour un résultat optimal et sécurisé.</li>
              <li>Intégrer les indications et contre-indications formelles liées à la madérothérapie.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#e7e5e4] pb-2 text-[#57534e]">Compétences Visées</h2>
            <ul className="space-y-3 text-sm font-light text-[#78716c] list-disc list-inside">
              <li>Exécution complète et autonome d'un protocole de madérothérapie de 60 minutes.</li>
              <li>Garantir sa propre intégrité physique en adoptant une posture ergonomique autour de la table.</li>
              <li>Réaliser un bilan minceur personnalisé pour conseiller une cure adaptée à la cliente.</li>
              <li>Appliquer des règles strictes de nettoyage et de désinfection des outils en bois.</li>
            </ul>
          </div>
        </div>

        {/* PROGRAMME DETAILLE */}
        <div className="mb-16">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-[#e7e5e4] pb-2 text-[#57534e] text-center">Programme de la Journée</h2>
          
          <div className="space-y-8">
            <div className="bg-[#fafaf9] p-6 border border-[#e7e5e4]">
              <h3 className="font-bold text-[#57534e] uppercase tracking-widest text-sm mb-4">Matin : Fondamentaux & Démonstration (3h30)</h3>
              <ul className="space-y-2 text-sm font-light text-[#78716c]">
                <li><strong className="font-medium text-[#57534e]">Théorie :</strong> Origines de la méthode, anatomie du système lymphatique et mécanismes de la cellulite.</li>
                <li><strong className="font-medium text-[#57534e]">Sécurité :</strong> Les contre-indications absolues et la préparation du matériel (hygiène des bois).</li>
                <li><strong className="font-medium text-[#57534e]">Les Outils :</strong> Présentation détaillée de chaque accessoire, de son rôle spécifique et de sa prise en main.</li>
                <li><strong className="font-medium text-[#57534e]">Démonstration :</strong> Le formateur montre le protocole complet par zones (jambes, fessiers, ventre, bras) en insistant sur la posture.</li>
              </ul>
            </div>

            <div className="bg-[#fafaf9] p-6 border border-[#e7e5e4]">
              <h3 className="font-bold text-[#57534e] uppercase tracking-widest text-sm mb-4">Après-midi : Pratique Intensive & Évaluation (3h30)</h3>
              <ul className="space-y-2 text-sm font-light text-[#78716c]">
                <li><strong className="font-medium text-[#57534e]">Pratique guidée :</strong> Entraînement en binôme. Chaque stagiaire donne et reçoit le soin pour ressentir la pression juste.</li>
                <li><strong className="font-medium text-[#57534e]">Correction :</strong> Ajustement individuel des gestes, du rythme, des pressions et de l'ergonomie corporelle du praticien.</li>
                <li><strong className="font-medium text-[#57534e]">Conseil Client :</strong> Comment construire un diagnostic minceur, vendre une cure et proposer un suivi post-soin.</li>
                <li><strong className="font-medium text-[#57534e]">Évaluation :</strong> Mise en situation finale sur un protocole complet, suivie du débriefing et remise de l'attestation.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* METHODES ET EVALUATIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#e7e5e4] pb-2 text-[#57534e]">Méthodes Pédagogiques</h2>
            <ul className="space-y-3 text-sm font-light text-[#78716c] list-disc list-inside">
              <li>Alternance d'apports théoriques (support livret fourni) et de démonstrations pratiques.</li>
              <li>Pratique à 70% : travail en binôme pour intégrer le toucher et l'utilisation des outils.</li>
              <li>Matériel fourni pendant la formation (table de massage, huiles, kits d'outils en bois).</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#e7e5e4] pb-2 text-[#57534e]">Modalités d'Évaluation</h2>
            <ul className="space-y-3 text-sm font-light text-[#78716c] list-disc list-inside">
              <li>Tour de table et questionnement oral pour valider l'acquisition de la théorie.</li>
              <li>Observation continue lors des ateliers de pratique (gestuelle, sécurité, ergonomie).</li>
              <li>Évaluation finale pratique validée par le formateur via une grille de compétences.</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-24 border-t border-[#e7e5e4] pt-16">
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-6 text-[#57534e]">
            Démarquez-vous avec cette expertise minceur
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