import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logoSW.png'; 

// Icônes Minimalistes
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
);

export default function Footer() {
  return (
    <footer className="relative z-20 bg-[#fafaf9] border-t border-[#e7e5e4] pt-20 pb-10 font-sans text-[#57534e]">
      
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        
        {/* COLONNE 1 : MARQUE */}
        <div className="space-y-6 lg:col-span-1">
          <img src={logo} alt="Signature Wellness" className="h-12 w-auto opacity-80" />
          <p className="text-[11px] leading-relaxed font-light text-[#78716c] uppercase tracking-wider">
            L'excellence de la dermo-cosmétique & du soin esthetique.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="https://www.instagram.com/signature_wellness" target="_blank" rel="noreferrer" className="text-[10px] font-bold uppercase tracking-widest hover:text-[#BFA997] transition-colors">Instagram</a>
            <a href="https://www.facebook.com/p/-𝐒𝐈𝐆𝐍𝐀𝐓𝐔𝐑𝐄-𝐖𝐄𝐋𝐋𝐍𝐄𝐒𝐒--100075573892334/" target="_blank" rel="noreferrer" className="text-[10px] font-bold uppercase tracking-widest hover:text-[#BFA997] transition-colors">Facebook</a>
          </div>
        </div>

        {/* COLONNE 2 : NOS SOINS */}
        <div>
          <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] mb-6 text-[#57534e]">Nos Soins</h4>
          <ul className="space-y-3 text-[10px] font-medium uppercase tracking-widest text-[#78716c]">
            <li><Link to="/epilation-laser" className="hover:text-[#57534e] transition-colors">Épilation Laser</Link></li>
            <li><Link to="/soins-visage" className="hover:text-[#57534e] transition-colors">Hydraface</Link></li>
            <li><Link to="/microneedling" className="hover:text-[#57534e] transition-colors">Microneedling & PRP</Link></li>
            <li><Link to="/body-contouring" className="hover:text-[#57534e] transition-colors">Corps & Silhouette</Link></li>
            <li><Link to="/massages" className="hover:text-[#57534e] transition-colors">Massages Post-Op</Link></li>
          </ul>
        </div>

        {/* COLONNE 3 : NOS FORMATIONS */}
        <div>
          <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] mb-6 text-[#57534e]">Formations</h4>
          <ul className="space-y-3 text-[10px] font-medium uppercase tracking-widest text-[#78716c]">
            <li><Link to="/formation/drainage-post-op" className="hover:text-[#57534e] transition-colors">Drainage Post-Op</Link></li>
            <li><Link to="/formation/maderotherapie" className="hover:text-[#57534e] transition-colors">Madérothérapie</Link></li>
            <li><Link to="/formation/peeling" className="hover:text-[#57534e] transition-colors">Peelings Experts</Link></li>
            <li><Link to="/formation/hifu" className="hover:text-[#57534e] transition-colors">HIFU & Anti-Âge</Link></li>
            <li><Link to="/formation/blanchiment-dentaire" className="hover:text-[#57534e] transition-colors">Blanchiment</Link></li>
          </ul>
        </div>

        {/* COLONNE 4 : INFOS */}
        <div>
          <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] mb-6 text-[#57534e]">Infos</h4>
          <ul className="space-y-3 text-[10px] font-medium uppercase tracking-widest text-[#78716c]">
            <li><Link to="/reservation" className="hover:text-[#57534e] transition-colors">Réservation</Link></li>
            <li><Link to="/mentions-legales" className="hover:text-[#57534e] transition-colors">Mentions Légales</Link></li>
            <li><Link to="/mentions-legales" className="hover:text-[#57534e] transition-colors">Confidentialité</Link></li>
          </ul>
        </div>

        {/* COLONNE 5 : CONTACT */}
        <div className="flex flex-col items-start lg:items-end justify-start gap-4">
            <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] mb-2 text-[#57534e] lg:hidden">Contact</h4>
            <div className="flex lg:flex-col gap-4">
                <a 
                  href="https://wa.me/33745169794" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-[#e7e5e4] text-[#25D366] bg-white hover:bg-[#25D366] hover:text-white transition-all duration-300 shadow-sm"
                  title="WhatsApp"
                >
                   <WhatsAppIcon />
                </a>

                <a 
                  href="tel:+33745169794" 
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-[#e7e5e4] text-[#57534e] bg-white hover:bg-[#57534e] hover:text-white transition-all duration-300 shadow-sm"
                  title="Nous Appeler"
                >
                   <PhoneIcon />
                </a>
            </div>
            <p className="text-[9px] uppercase tracking-widest text-[#a8a29e] mt-2 lg:text-right">
              Neuilly-sur-Seine
            </p>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-[#e7e5e4] pt-8 flex flex-col md:flex-row justify-between items-center text-[9px] text-[#a8a29e] uppercase tracking-[0.2em] max-w-7xl mx-auto px-4 gap-4 md:gap-0">
        <div>© {new Date().getFullYear()} Signature Wellness. Tous droits réservés.</div>
        <div>
          Site réalisé par <a 
            href="https://littlecreatrice.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-bold text-[#78716c] hover:text-[#57534e] transition-colors duration-300 underline underline-offset-4 decoration-stone-200"
          >
            LITTLE CREATRICE
          </a>
        </div>
      </div>
    </footer>
  );
}