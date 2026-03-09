import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export default function MentionsLegales() {
  
  // Scroll to top au chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20 px-4 bg-white font-sans text-[#57534e]">
      <Helmet>
        <title>Mentions Légales & Confidentialité | Signature Wellness</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl mb-12 text-center" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
          Mentions Légales
        </h1>

        <div className="space-y-12">
          
          {/* IDENTIFICATION */}
          <section>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-4 border-b border-[#e7e5e4] pb-2">1. Identification de la société</h2>
            <div className="grid md:grid-cols-2 gap-8 text-sm font-light leading-relaxed">
               <div>
                  <p><strong className="font-bold">Raison Sociale :</strong> SIGNATURE WELLNESS</p>
                  <p><strong className="font-bold">Forme Juridique :</strong> SASU (Société par actions simplifiée à associé unique)</p>
                  <p><strong className="font-bold">Capital Social :</strong> 1 000,00 Euros</p>
                  <p><strong className="font-bold">RCS :</strong> 904 773 751 R.C.S. Nanterre</p>
                  <p><strong className="font-bold">Date d'immatriculation :</strong> 02/11/2021</p>
               </div>
               <div>
                  <p><strong className="font-bold">Siège Social :</strong> 18 Rue d'Armenonville, 92200 Neuilly-sur-Seine</p>
                  <p><strong className="font-bold">Gérante / Présidente :</strong> Mme Cehem BOULOUDANI</p>
                  <p><strong className="font-bold">Contact :</strong> signature.wellness.paris@gmail.com</p>
                  <p><strong className="font-bold">Téléphone :</strong> 07 45 16 97 94</p>
               </div>
            </div>
          </section>

          {/* HÉBERGEMENT */}
          <section>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-4 border-b border-[#e7e5e4] pb-2">2. Hébergement & Réalisation</h2>
            <div className="text-sm font-light leading-relaxed">
              <p className="mb-2"><strong className="font-bold">Réalisation du site :</strong> LITTLE CREATRICE (https://littlecreatrice.com)</p>
              <p className="mb-2"><strong className="font-bold">Hébergement Technique :</strong> Google Firebase / Firestore (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irlande)</p>
              <p><strong className="font-bold">Nom de Domaine :</strong> Hostinger International Ltd (61 Lordou Vironos Street, 6023 Larnaca, Chypre)</p>
            </div>
          </section>

          {/* CONFIDENTIALITÉ */}
          <section>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-4 border-b border-[#e7e5e4] pb-2">3. Politique de Confidentialité & RGPD</h2>
            <div className="text-sm font-light leading-relaxed space-y-4">
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD), Signature Wellness s'engage à protéger la confidentialité de vos informations personnelles.
              </p>
              <p>
                <strong>Collecte des données :</strong> Les informations recueillies via le formulaire de réservation ou de contact (Nom, Prénom, Téléphone, Email) sont utilisées exclusivement pour la gestion de vos rendez-vous et la relation client. Elles ne sont jamais vendues à des tiers.
              </p>
              <p>
                <strong>Droit d'accès :</strong> Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour l'exercer, contactez-nous par email ou courrier.
              </p>
            </div>
          </section>

          {/* COOKIES */}
          <section>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-4 border-b border-[#e7e5e4] pb-2">4. Gestion des Cookies</h2>
            <div className="text-sm font-light leading-relaxed">
              <p>
                Ce site utilise des cookies techniques nécessaires à son bon fonctionnement (notamment pour la sécurité et la navigation). Des cookies de mesure d'audience peuvent être utilisés pour améliorer votre expérience. En continuant votre navigation, vous acceptez leur utilisation.
              </p>
            </div>
          </section>

          {/* PROPRIÉTÉ INTELLECTUELLE */}
          <section>
            <h2 className="text-xl font-bold uppercase tracking-widest mb-4 border-b border-[#e7e5e4] pb-2">5. Propriété Intellectuelle</h2>
            <div className="text-sm font-light leading-relaxed">
              <p>
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}