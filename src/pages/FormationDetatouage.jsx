import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import imgFormation from '../assets/Detatouage.jpg';

export default function FormationDetatouage() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white font-sans text-[#57534e] pt-24 pb-20">
      <Helmet>
        <title>Formation Détatouage Professionnel | Signature Wellness</title>
        <meta name="description" content="Apprenez les techniques de détatouage professionnelles. Formation certifiante d'une journée pour corriger les pigments et tatouages en toute sécurité." />
      </Helmet>

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16 mt-8">
        <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
          Expertise Corrective
        </span>
        <h1 className="text-3xl md:text-5xl mb-6 text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
          Formation Détatouage
        </h1>
        
        <div className="h-[1px] w-24 bg-[#57534e] mx-auto mb-8"></div>
        
        <p className="text-[#78716c] italic max-w-2xl mx-auto font-light leading-relaxed mb-12">
          Maîtrisez l'art de l'effacement et de la correction. Une formation d'une journée pour apprendre à retirer ou éclaircir les pigments de maquillage semi-permanent et les tatouages, tout en préservant l'intégrité de la peau.
        </p>

        {/* PHOTO DE FORMATION */}
        <div className="max-w-4xl mx-auto h-[400px] md:h-[500px] overflow-hidden shadow-2xl mb-16">
            <img 
                src={imgFormation} 
                alt="Formation Détatouage" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        
        {/* ENCART QUALIOPI */}
        <div className="bg-[#fafaf9] border border-[#e7e5e4] p-8 md:p-10 mb-16 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-light text-[#78716c]">
            <div>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Publics visés</strong>Professionnels du maquillage permanent, tatoueurs, ou spécialistes de l'esthétique corrective souhaitant proposer des services de retrait et correction.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Prérequis</strong>Connaissances de base en dermopigmentation ou hygiène et salubrité. Entretien préalable nécessaire pour valider le projet.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Durée & Format</strong>1 jour (7 heures). Présentiel. Enseignement théorique sur les pigments et mise en pratique sur supports et modèles.</p>
            </div>
            <div>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Modalités d'accès</strong>Positionnement pré-formation. Délai d'accès indicatif : 15 jours selon les sessions disponibles.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Tarifs & Financement</strong>Sur devis personnalisé. Financements possibles via OPCO, FAFCEA ou fonds d'assurance formation.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Accessibilité</strong>Locaux aux normes. Pour toute situation de handicap, contactez notre référent dédié pour une étude personnalisée.</p>
            </div>
          </div>
        </div>

        {/* OBJECTIFS ET COMPETENCES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#e7e5e4] pb-2 text-[#57534e]">Objectifs Opérationnels</h2>
            <ul className="space-y-3 text-sm font-light text-[#78716c] list-disc list-inside">
              <li>Comprendre la colorimétrie et la chimie des pigments pour adapter la méthode de retrait.</li>
              <li>Maîtriser les protocoles de détatouage selon la technique choisie (Laser ou solution osmotique).</li>
              <li>Identifier les profondeurs d'implantation et les types de peaux à traiter.</li>
              <li>Appliquer les règles d'hygiène et d'asepsie spécifiques aux actes invasifs.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#e7e5e4] pb-2 text-[#57534e]">Compétences Visées</h2>
            <ul className="space-y-3 text-sm font-light text-[#78716c] list-disc list-inside">
              <li>Réaliser une anamnèse complète et évaluer la faisabilité du détatouage.</li>
              <li>Exécuter le protocole de retrait de manière sécurisée et efficace.</li>
              <li>Gérer le suivi post-acte pour garantir une cicatrisation optimale sans cicatrices.</li>
              <li>Conseiller la cliente sur le nombre de séances et les résultats attendus.</li>
            </ul>
          </div>
        </div>

        {/* PROGRAMME DETAILLE */}
        <div className="mb-16">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-[#e7e5e4] pb-2 text-[#57534e] text-center">Programme de la Journée</h2>
          
          <div className="space-y-8">
            <div className="bg-[#fafaf9] p-6 border border-[#e7e5e4]">
              <h3 className="font-bold text-[#57534e] uppercase tracking-widest text-sm mb-4">Matin : Théorie & Colorimétrie (3h30)</h3>
              <ul className="space-y-2 text-sm font-light text-[#78716c]">
                <li><strong className="font-medium text-[#57534e]">Pigmentologie :</strong> Comportement des encres et des pigments dans le derme au fil du temps.</li>
                <li><strong className="font-medium text-[#57534e]">Techniques de Retrait :</strong> Comparatif des méthodes, avantages et limites.</li>
                <li><strong className="font-medium text-[#57534e]">Sécurité :</strong> Contre-indications, risques et gestion des attentes clientes.</li>
                <li><strong className="font-medium text-[#57534e]">Anesthésie & Hygiène :</strong> Cadre légal et protocole sanitaire strict.</li>
              </ul>
            </div>

            <div className="bg-[#fafaf9] p-6 border border-[#e7e5e4]">
              <h3 className="font-bold text-[#57534e] uppercase tracking-widest text-sm mb-4">Après-midi : Pratique & Cicatrisation (3h30)</h3>
              <ul className="space-y-2 text-sm font-light text-[#78716c]">
                <li><strong className="font-medium text-[#57534e]">Démonstration :</strong> Analyse d'un cas réel et démonstration du protocole complet.</li>
                <li><strong className="font-medium text-[#57534e]">Pratique :</strong> Travail sur peaux synthétiques puis sur modèles réels (selon niveau).</li>
                <li><strong className="font-medium text-[#57534e]">Post-Soin :</strong> Protocole de soins à domicile pour une régénération cutanée parfaite.</li>
                <li><strong className="font-medium text-[#57534e]">Validation :</strong> Évaluation finale et remise du certificat de formation.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-24 border-t border-[#e7e5e4] pt-16">
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-6 text-[#57534e]">
            Offrez une seconde chance à la peau de vos clientes
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