import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
// L'importation respecte l'orthographe exacte de ton fichier image
import imgFormation from '../assets/Blanchiement.jpg';

export default function FormationBlanchiment() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white font-sans text-[#57534e] pt-24 pb-20">
      <Helmet>
        <title>Formation Blanchiment Dentaire Cosmétique | Signature Wellness</title>
        <meta name="description" content="Devenez experte en blanchiment dentaire cosmétique. Formation professionnelle d'une journée axée sur la pratique, l'hygiène et la législation européenne." />
      </Helmet>

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16 mt-8">
        <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
          Esthétique du Sourire
        </span>
        <h1 className="text-3xl md:text-5xl mb-6 text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
          Formation Blanchiment Dentaire
        </h1>
        
        <div className="h-[1px] w-24 bg-[#57534e] mx-auto mb-8"></div>
        
        <p className="text-[#78716c] italic max-w-2xl mx-auto font-light leading-relaxed mb-12">
          Sublimez le sourire de vos clientes en toute sécurité. Une journée de formation intensive pour maîtriser les protocoles de blanchiment cosmétique, dans le strict respect des normes européennes.
        </p>

        {/* PHOTO DE FORMATION */}
        <div className="max-w-4xl mx-auto h-[400px] md:h-[500px] overflow-hidden shadow-2xl mb-16">
            <img 
                src={imgFormation} 
                alt="Formation Blanchiment Dentaire" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        
        {/* ENCART QUALIOPI */}
        <div className="bg-[#fafaf9] border border-[#e7e5e4] p-8 md:p-10 mb-16 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-light text-[#78716c]">
            <div>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Publics visés</strong>Professionnels de l'esthétique, gérants d'instituts de beauté ou personnes en reconversion souhaitant proposer des prestations de cosmétique dentaire.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Prérequis</strong>Aucun prérequis médical n'est exigé, l'acte étant strictement cosmétique. Un entretien de positionnement validera votre inscription.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Durée & Format</strong>1 jour (7 heures). Présentiel. Alternance de modules réglementaires théoriques et de mise en pratique sur modèles.</p>
            </div>
            <div>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Modalités d'accès</strong>Évaluation du projet et constitution du dossier. Délai d'accès indicatif : 15 jours avant le début de la session.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Tarifs & Financement</strong>Sur devis. Prestation éligible aux financements OPCO ou FAFCEA selon votre statut.</p>
              <p className="mb-4"><strong className="font-bold text-[#57534e] uppercase tracking-wider text-xs block mb-1">Accessibilité</strong>Locaux conformes aux normes PMR. Contactez-nous pour toute demande d'adaptation spécifique liée à un handicap.</p>
            </div>
          </div>
        </div>

        {/* OBJECTIFS ET COMPETENCES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#e7e5e4] pb-2 text-[#57534e]">Objectifs Opérationnels</h2>
            <ul className="space-y-3 text-sm font-light text-[#78716c] list-disc list-inside">
              <li>Connaître l'anatomie de la dent et comprendre l'échelle des teintes.</li>
              <li>Assimiler la législation européenne stricte régissant les produits de blanchiment (taux de peroxyde autorisés).</li>
              <li>Identifier les contre-indications (caries, gingivites, couronnes) pour garantir la sécurité.</li>
              <li>Maîtriser le protocole complet, de la préparation au passage sous lampe LED.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-[#e7e5e4] pb-2 text-[#57534e]">Compétences Visées</h2>
            <ul className="space-y-3 text-sm font-light text-[#78716c] list-disc list-inside">
              <li>Mener un entretien de découverte client et faire signer un consentement éclairé.</li>
              <li>Appliquer les gels cosmétiques et positionner la lampe LED de manière sécuritaire et hygiénique.</li>
              <li>Gérer le poste de travail et la stérilisation/désinfection du matériel non jetable.</li>
              <li>Éduquer le client sur les consignes post-soin (alimentation blanche, entretien).</li>
            </ul>
          </div>
        </div>

        {/* PROGRAMME DETAILLE */}
        <div className="mb-16">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-[#e7e5e4] pb-2 text-[#57534e] text-center">Programme de la Journée</h2>
          
          <div className="space-y-8">
            <div className="bg-[#fafaf9] p-6 border border-[#e7e5e4]">
              <h3 className="font-bold text-[#57534e] uppercase tracking-widest text-sm mb-4">Matin : Législation & Théorie (3h30)</h3>
              <ul className="space-y-2 text-sm font-light text-[#78716c]">
                <li><strong className="font-medium text-[#57534e]">Cadre Légal :</strong> Différence entre acte dentaire médical et cosmétique, limites d'intervention, directive européenne.</li>
                <li><strong className="font-medium text-[#57534e]">La Dent :</strong> Émail, dentine, causes du jaunissement (tabac, café, vieillissement).</li>
                <li><strong className="font-medium text-[#57534e]">Hygiène :</strong> Protocoles d'asepsie, utilisation des écarteurs à usage unique, protection des gencives.</li>
                <li><strong className="font-medium text-[#57534e]">Les Produits :</strong> Étude des différents gels (avec ou sans peroxyde) et fonctionnement des lampes LED.</li>
              </ul>
            </div>

            <div className="bg-[#fafaf9] p-6 border border-[#e7e5e4]">
              <h3 className="font-bold text-[#57534e] uppercase tracking-widest text-sm mb-4">Après-midi : Pratique & Installation (3h30)</h3>
              <ul className="space-y-2 text-sm font-light text-[#78716c]">
                <li><strong className="font-medium text-[#57534e]">Pratique :</strong> Réalisation complète du soin sur modèles (mesure de la teinte initiale, pose du produit, exposition LED, rinçage, mesure finale).</li>
                <li><strong className="font-medium text-[#57534e]">Cas Concrets :</strong> Gestion des sensibilités passagères et des attentes irréalistes.</li>
                <li><strong className="font-medium text-[#57534e]">Développement :</strong> Rentabilité, tarification des séances et choix des fournisseurs de matériel.</li>
                <li><strong className="font-medium text-[#57534e]">Évaluation :</strong> Validation des acquis pratiques et théoriques, remise du certificat.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-24 border-t border-[#e7e5e4] pt-16">
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-6 text-[#57534e]">
            Ajoutez l'esthétique du sourire à vos prestations
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