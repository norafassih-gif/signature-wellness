import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logoSW.png';

export default function Navbar() {
  const [isPrestationsOpen, setIsPrestationsOpen] = useState(false);
  const [isFormationsOpen, setIsFormationsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-stone-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* LOGO */}
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex-shrink-0 flex items-center">
            <img className="h-14 w-auto hover:opacity-80 transition-opacity" src={logo} alt="Signature Wellness" />
          </Link>

          {/* MENU ORDINATEUR */}
          <div className="hidden md:flex space-x-12 items-center">
            
            {/* MEGA MENU PRESTATIONS */}
            <div 
              className="relative group h-full flex items-center"
              onMouseEnter={() => setIsPrestationsOpen(true)}
              onMouseLeave={() => setIsPrestationsOpen(false)}
            >
              <button className="text-stone-800 hover:text-stone-500 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center gap-2 h-full py-4">
                Nos Prestations
                <span className={`text-[8px] transition-transform duration-300 ${isPrestationsOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {/* Panneau Déroulant PANORAMIQUE PRESTATIONS */}
              <div 
                className={`absolute top-[90px] left-1/2 transform -translate-x-1/2 w-[800px] bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] border-t border-stone-100 transition-all duration-300 ease-out ${
                  isPrestationsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                <div className="h-[1px] w-full bg-stone-100 mb-8"></div>

                <div className="p-8 pb-12 grid grid-cols-3 gap-8">
                  {/* Colonne 1 : Visage & Laser */}
                  <div className="space-y-8">
                    <MenuLink 
                      to="/soins-visage" 
                      title="Hydraface" 
                      desc="Éclat & Pureté immédiate" 
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <MenuLink 
                      to="/microneedling" 
                      title="Microneedling" 
                      desc="Régénération cellulaire" 
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <MenuLink 
                      to="/epilation-laser"
                      title="Épilation Laser" 
                      desc="Technologie définitive" 
                      onClick={() => setIsMenuOpen(false)}
                    />
                  </div>

                  {/* Colonne 2 : Corps & Technologies */}
                  <div className="space-y-8">
                    <MenuLink 
                      to="/body-contouring" 
                      title="Corps & Silhouette" 
                      desc="Minceur & Remodelage" 
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <MenuLink 
                      to="/co2-fractionne" 
                      title="CO2 Fractionné" 
                      desc="Lissage cutané profond" 
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <MenuLink 
                      to="/miracle-sculpt" 
                      title="Miracle Sculpt" 
                      desc="Remodelage haute précision" 
                      onClick={() => setIsMenuOpen(false)}
                    />
                  </div>

                  {/* Colonne 3 : Massages & Post-Op */}
                  <div className="space-y-8">
                    <MenuLink 
                      to="/massages" 
                      title="Post opératoire" 
                      desc="Massage bien-être" 
                      onClick={() => setIsMenuOpen(false)}
                    />
                    
                    {/* Lien Planning ANIMÉ */}
                    <Link to="/reservation" onClick={() => setIsMenuOpen(false)} className="block group mt-2 pl-4 border-l-2 border-transparent hover:border-stone-800 transition-all duration-300">
                       <div className="relative inline-block">
                         <h3 className="font-bold text-stone-800 text-xs uppercase tracking-widest mb-1">
                           Planning
                         </h3>
                         <div className="h-[1px] w-0 bg-stone-800 transition-all duration-500 ease-out group-hover:w-full"></div>
                       </div>
                       <p className="text-[10px] text-stone-400 group-hover:text-stone-600 transition-colors mt-1">Voir les disponibilités →</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* MEGA MENU FORMATIONS */}
            <div 
              className="relative group h-full flex items-center"
              onMouseEnter={() => setIsFormationsOpen(true)}
              onMouseLeave={() => setIsFormationsOpen(false)}
            >
              <button className="text-stone-800 hover:text-stone-500 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center gap-2 h-full py-4">
                Formations
                <span className={`text-[8px] transition-transform duration-300 ${isFormationsOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {/* Panneau Déroulant PANORAMIQUE FORMATIONS */}
              <div 
                className={`absolute top-[90px] left-1/2 transform -translate-x-1/2 w-[900px] bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] border-t border-stone-100 transition-all duration-300 ease-out ${
                  isFormationsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                <div className="h-[1px] w-full bg-stone-100 mb-8"></div>

                <div className="p-8 pb-12 grid grid-cols-3 gap-8 text-left">
                  
                  {/* Colonne 1 : Soins du Corps */}
                  <div className="space-y-6">
                    <h4 className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.3em] mb-4 border-b border-stone-100 pb-2">Corps & Remodelage</h4>
                    <MenuLink 
                      to="/formation/drainage-post-op" 
                      title="Drainage & Post-Op" 
                      desc="3 jours - Soin Corps" 
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <MenuLink 
                      to="/formation/maderotherapie" 
                      title="Madérothérapie" 
                      desc="1 jour - Anti-Cellulite" 
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <MenuLink 
                      to="/formation/radiofrequence-cavitation" 
                      title="Radiofréq. & Cavitation" 
                      desc="1 jour - Technologie Minceur" 
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <MenuLink 
                      to="/formation/ondes-de-choc" 
                      title="Ondes de Choc" 
                      desc="1 jour - Fibrose cutanée" 
                      onClick={() => setIsMenuOpen(false)}
                    />
                  </div>

                  {/* Colonne 2 : Visage & Anti-âge */}
                  <div className="space-y-6">
                    <h4 className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.3em] mb-4 border-b border-stone-100 pb-2">Visage & Anti-Âge</h4>
                    <MenuLink 
                      to="/formation/hydraface" 
                      title="Hydraface" 
                      desc="1 jour - Soin Profond" 
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <MenuLink 
                      to="/formation/peeling" 
                      title="Peelings (5 protocoles)" 
                      desc="2 jours - Acides & Sécurité" 
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <MenuLink 
                      to="/formation/hifu" 
                      title="HIFU" 
                      desc="1 jour - Lifting sans chirurgie" 
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <MenuLink 
                      to="/formation/plasma-froid" 
                      title="Plasma Froid & Fusion" 
                      desc="1 jour - Technologie avancée" 
                      onClick={() => setIsMenuOpen(false)}
                    />
                  </div>

                  {/* Colonne 3 : Correctif & Esthétique */}
                  <div className="space-y-6">
                    <h4 className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.3em] mb-4 border-b border-stone-100 pb-2">Correctif & Esthétique</h4>
                    <MenuLink 
                      to="/formation/microneedling" 
                      title="Microneedling" 
                      desc="1 jour - Visage, Corps & Cicatrices" 
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <MenuLink 
                      to="/formation/detatouage" 
                      title="Détatouage" 
                      desc="1 jour - Correction pigments" 
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <MenuLink 
                      to="/formation/blanchiment-dentaire" 
                      title="Blanchiment Dentaire" 
                      desc="1 jour - Cosmétique du sourire" 
                      onClick={() => setIsMenuOpen(false)}
                    />
                  </div>

                </div>
              </div>
            </div>

            {/* BOUTON RDV RECTANGULAIRE */}
            <Link to="/reservation" onClick={() => setIsMenuOpen(false)} className="ml-4 text-stone-600 font-bold px-6 py-3 text-[11px] uppercase tracking-widest border border-stone-400 hover:bg-stone-500 hover:text-white transition-colors rounded-none">
              Prendre RDV
            </Link>
            
          </div>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-stone-800 p-2 focus:outline-none">
              <span className="text-2xl">{isMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-6 py-8 space-y-6 flex flex-col h-screen absolute w-full shadow-xl z-50 overflow-y-auto pb-32">
          
          <div className="mb-6 text-left">
            <h3 className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.3em] mb-4 border-b border-stone-100 pb-2">Nos Prestations</h3>
            <MobileLink to="/soins-visage" text="Hydraface" onClick={() => setIsMenuOpen(false)} />
            <MobileLink to="/microneedling" text="Microneedling" onClick={() => setIsMenuOpen(false)} />
            <MobileLink to="/epilation-laser" text="Épilation Laser" onClick={() => setIsMenuOpen(false)} />
            <MobileLink to="/body-contouring" text="Corps & Silhouette" onClick={() => setIsMenuOpen(false)} />
            <MobileLink to="/massages" text="Post opératoire" onClick={() => setIsMenuOpen(false)} />
            <MobileLink to="/miracle-sculpt" text="Miracle Sculpt" onClick={() => setIsMenuOpen(false)} />
            <MobileLink to="/co2-fractionne" text="CO2 Fractionné" onClick={() => setIsMenuOpen(false)} />
          </div>

          <div className="mb-6 text-left">
            <h3 className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.3em] mb-4 border-b border-stone-100 pb-2">Nos Formations</h3>
            <MobileLink to="/formation/drainage-post-op" text="Drainage Post-Op" onClick={() => setIsMenuOpen(false)} />
            <MobileLink to="/formation/maderotherapie" text="Madérothérapie" onClick={() => setIsMenuOpen(false)} />
            <MobileLink to="/formation/hydraface" text="Hydraface" onClick={() => setIsMenuOpen(false)} />
            <MobileLink to="/formation/peeling" text="Peelings" onClick={() => setIsMenuOpen(false)} />
            <MobileLink to="/formation/microneedling" text="Microneedling" onClick={() => setIsMenuOpen(false)} />
            <MobileLink to="/formation/hifu" text="HIFU" onClick={() => setIsMenuOpen(false)} />
            <MobileLink to="/formation/plasma-froid" text="Plasma Froid & Fusion" onClick={() => setIsMenuOpen(false)} />
            <MobileLink to="/formation/radiofrequence-cavitation" text="Radiofréq. & Cavitation" onClick={() => setIsMenuOpen(false)} />
            <MobileLink to="/formation/ondes-de-choc" text="Ondes de Choc" onClick={() => setIsMenuOpen(false)} />
            <MobileLink to="/formation/detatouage" text="Détatouage" onClick={() => setIsMenuOpen(false)} />
            <MobileLink to="/formation/blanchiment-dentaire" text="Blanchiment Dentaire" onClick={() => setIsMenuOpen(false)} />
          </div>

          <div className="border-t border-stone-100 my-4 pt-4">
            <MobileLink to="/reservation" text="PRENDRE RDV" highlight={true} onClick={() => setIsMenuOpen(false)} />
          </div>
        </div>
      )}
    </nav>
  );
}

// --- COMPOSANT LIEN MEGA MENU ---
function MenuLink({ title, desc, to, onClick }) {
  return (
    <Link to={to} onClick={onClick} className="group block pl-5 border-l-2 border-transparent hover:border-stone-800 transition-all duration-300 text-left">
      <div className="relative inline-block w-full">
        <h3 className="font-bold text-stone-800 text-sm uppercase tracking-widest mb-1 group-hover:text-stone-500 transition-colors">
          {title}
        </h3>
        <div className="h-[1px] w-0 bg-stone-800 transition-all duration-500 ease-out group-hover:w-2/3 mt-1"></div>
      </div>
      <p className="text-[10px] text-stone-400 font-medium group-hover:text-stone-600 transition-colors tracking-wide mt-2">
        {desc}
      </p>
    </Link>
  );
}

// --- COMPOSANT LIEN MOBILE ---
function MobileLink({ to, text, highlight, onClick }) {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={`block uppercase text-xs tracking-[0.2em] font-bold py-3 ${
        highlight 
        ? 'text-white bg-stone-800 text-center rounded-none mt-4 py-4 px-4' 
        : 'text-stone-500 hover:text-stone-800 border-b border-stone-50'
      }`}
    >
      {text}
    </Link>
  );
}