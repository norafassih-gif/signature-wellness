import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
// Importation de la photo
import imgFormation from '../assets/formation massage post operatoire.png';

export default function FormationDrainage() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white font-sans text-[#57534e] pt-24 pb-20">
      <Helmet>
        <title>Formation Drainage Lymphatique & Post-Opératoire | Signature Wellness</title>
        <meta name="description" content="Formation professionnelle de 3 jours en drainage lymphatique et soins post-opératoires. Devenez experte en remodelage et récupération." />
      </Helmet>

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16 mt-8">
        <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
          Soins du Corps
        </span>
        <h1 className="text-3xl md:text-5xl mb-6 text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
          Drainage Lymphatique & Soins Post-Opératoires
        </h1>
        
        <div className="h-[1px] w-24 bg-[#57534e] mx-auto mb-8"></div>
        
        <p className="text-[#78716c] italic max-w-2xl mx-auto font-light leading-relaxed mb-12">
          Maîtrisez les techniques de remodelage corporel et accompagnez la récupération après une chirurgie esthétique. Une formation complète sur 3 jours alliant théorie approfondie et pratique intensive.
        </p>

        {/* PHOTO DE FORMATION AJOUTÉE ICI */}
        <div className="max-w-4xl mx-auto h-[400px] md:h-[500px] overflow-hidden shadow-2xl mb-16">
            <img 
                src={imgFormation} 
                alt="Formation Massage Post Opératoire" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        
        {/* ENCART QUALIOPI (Les infos clés) */}
        <div className="bg-[#fafaf9] border border-[#e7e5e4] p-8 md:p-10 mb-16 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-light text-[#78716c]">
            <div>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Publics visés</strong>Professionnels de l'esthétique, du bien-être, de la santé ou personnes en reconversion souhaitant se spécialiser dans les soins post-chirurgie.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Prérequis</strong>Une pratique des techniques de base en massage ou esthétique est recommandée. Entretien préalable de positionnement.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Durée & Format</strong>3 jours (21 heures au total). Formation en présentiel avec pratique intensive sur modèles réels.</p>
            </div>
            <div>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Modalités d'accès</strong>Délai d'accès indicatif : 15 jours ouvrés avant le début de la session, sous réserve de places disponibles.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Tarifs & Financement</strong>Sur devis. Financements possibles selon votre profil (OPCO, FAFCEA). Devis transmis sous 48h.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Accessibilité</strong>Locaux accessibles aux PMR. Contactez notre référent handicap pour toute adaptation pédagogique.</p>
            </div>
          </div>
        </div>

        {/* OBJECTIFS ET COMPETENCES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#e7e5e4] pb-2 text-[#57534e]">Objectifs Opérationnels</h2>
            <ul className="space-y-3 text-sm font-light text-[#78716c] list-disc list-inside">
              <li>Comprendre l'anatomie et le fonctionnement du système lymphatique.</li>
              <li>Identifier les indications et contre-indications post-opératoires.</li>
              <li>Maîtriser les gestes, pressions et rythmes spécifiques au drainage.</li>
              <li>Adapter la technique selon l'intervention (Lipoaspiration, Abdominoplastie).</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#e7e5e4] pb-2 text-[#57534e]">Compétences Visées</h2>
            <ul className="space-y-3 text-sm font-light text-[#78716c] list-disc list-inside">
              <li>Exécution autonome d'un protocole structuré d'une heure.</li>
              <li>Accompagnement de la réduction des œdèmes et des fibroses.</li>
              <li>Conseil client et mise en place de cures de suivi.</li>
              <li>Respect des règles d'hygiène et d'ergonomie du praticien.</li>
            </ul>
          </div>
        </div>

        {/* PROGRAMME DETAILLE */}
        <div className="mb-16">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-[#e7e5e4] pb-2 text-[#57534e] text-center">Programme de la Formation</h2>
          
          <div className="space-y-8">
            <div className="bg-[#fafaf9] p-6 border border-[#e7e5e4]">
              <h3 className="font-bold text-[#57534e] uppercase tracking-widest text-sm mb-4">Jour 1 : Fondamentaux & Bases Théoriques</h3>
              <ul className="space-y-2 text-sm font-light text-[#78716c]">
                <li>Anatomie lymphatique et bienfaits de la méthode.</li>
                <li>Sécurité : indications, contre-indications et hygiène.</li>
                <li>Apprentissage des gestes de base et de la fluidité.</li>
              </ul>
            </div>

            <div className="bg-[#fafaf9] p-6 border border-[#e7e5e4]">
              <h3 className="font-bold text-[#57534e] uppercase tracking-widest text-sm mb-4">Jour 2 : Spécialisation Post-Opératoire</h3>
              <ul className="space-y-2 text-sm font-light text-[#78716c]">
                <li>Compréhension des interventions chirurgicales esthétiques.</li>
                <li>Gestion de l'œdème et prévention des fibroses.</li>
                <li>Pratique adaptée sur l'abdomen, les bras et le dos.</li>
              </ul>
            </div>

            <div className="bg-[#fafaf9] p-6 border border-[#e7e5e4]">
              <h3 className="font-bold text-[#57534e] uppercase tracking-widest text-sm mb-4">Jour 3 : Pratique Intensive & Business</h3>
              <ul className="space-y-2 text-sm font-light text-[#78716c]">
                <li>Enchaînement complet du protocole avec corrections.</li>
                <li>Expérience client, fidélisation et développement commercial.</li>
                <li>Évaluation finale pratique et remise des attestations.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-24 border-t border-[#e7e5e4] pt-16">
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-6 text-[#57534e]">
            Prête à développer votre expertise ?
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