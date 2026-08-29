import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-white font-sans text-[#57534e] pt-24">
      <Helmet>
        <title>Page introuvable | Signature Wellness</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="text-center max-w-lg">
        <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-6 block">
          Erreur 404
        </span>

        <h1
          className="text-3xl md:text-5xl mb-6 text-[#57534e]"
          style={{ fontFamily: "'Tenor Sans', sans-serif" }}
        >
          Cette page n'existe pas
        </h1>

        <div className="h-[1px] w-24 bg-[#57534e] mx-auto mb-8"></div>

        <p className="text-[#78716c] font-light leading-relaxed mb-12">
          L'adresse demandée est introuvable, ou la page a été déplacée.
          Retrouvez nos soins et nos formations depuis l'accueil.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="inline-block bg-[#57534e] text-white px-10 py-4 uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#78716c] transition-colors shadow-lg"
          >
            Retour à l'accueil
          </Link>
          <Link
            to="/reservation"
            className="inline-block bg-white text-[#57534e] border border-[#57534e] px-10 py-4 uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#fafaf9] transition-colors"
          >
            Prendre rendez-vous
          </Link>
        </div>
      </div>
    </div>
  );
}
