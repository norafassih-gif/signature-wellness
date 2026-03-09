import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// --- IMPORTATION DES IMAGES ---

// 1. Images Principales (Slider, Soins)
import imgFemme1 from '../assets/femmescouleurs1.jpg';
import imgFemme2 from '../assets/femmescouleurs2.jpg';
import imgFemme3 from '../assets/femmescouleurs3.jpg';
import imgLaser from '../assets/laser.jpg';
import imgHydra from '../assets/hydrafacial.jpg';
import imgMassage from '../assets/massage.jpg';
import imgNeedling from '../assets/microneedling.jpg';

// 2. Image pour l'Effet Rideau
import imgParallax from '../assets/Corp 3.jpg';

// 3. Toutes les images pour le Carrousel Instagram
import imgHifu from '../assets/Hifu.jpg';
import imgCorp1 from '../assets/Corp 1.jpg';
import imgCorp2 from '../assets/Corp 2.jpg';
import imgJambes from '../assets/jambes.jpg';
import imgBlanchiment from '../assets/Blanchiement.jpg';
import imgDetatouage from '../assets/Detatouage.jpg';
import imgPeeling from '../assets/Peeling.jpg';
import imgPlasmaFroid from '../assets/Plasma Froid.png';

export default function Home() {
  // --- SLIDER HERO ---
  const slides = [imgFemme1, imgFemme2, imgFemme3];
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- IMAGES POUR LE CARROUSEL INSTAGRAM ---
  const instagramPhotos = [
    imgNeedling, imgLaser, imgMassage, imgHydra, imgFemme1, imgHifu, 
    imgCorp1, imgCorp2, imgJambes, imgBlanchiment, imgDetatouage, imgPeeling, imgPlasmaFroid
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // --- ANIMATIONS SCROLL ---
  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach((reveal) => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
          reveal.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans">
      <Helmet>
        <title>Institut Esthétique & Bien-Être | Signature Wellness</title>
        <meta name="description" content="Découvrez nos soins esthétiques haute technologie : Épilation Laser, Hydraface, Body Contouring et massages post-opératoires." />
      </Helmet>
      
      {/* ========================================================
          LE BLOC BLANC (Il cache l'image et glisse vers le haut)
          ======================================================== */}
      <div className="relative z-10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        
        {/* --- HERO SLIDER --- */}
        <div className="relative h-screen flex items-center justify-center overflow-hidden bg-[#57534e]">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              <img 
                src={slide} 
                alt={`Institut Esthétique Paris - Slide ${index + 1}`} 
                className="w-full h-full object-cover opacity-70 animate-float-delay"
              />
            </div>
          ))}
          
          <div className="relative z-10 text-center text-white px-4 reveal active">
            <p className="text-sm md:text-base uppercase tracking-[0.4em] mb-6 font-light">
              Expertise & Médecine Esthétique
            </p>
            <h1 
              className="text-4xl md:text-7xl lg:text-8xl uppercase tracking-widest mb-10 text-white drop-shadow-lg" 
              style={{ fontFamily: "'Tenor Sans', sans-serif" }}
            >
              Signature<br/>Wellness
            </h1>
            <Link 
              to="/reservation" 
              className="inline-block border border-white text-white px-10 py-4 uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-[#57534e] transition-all duration-500 hover:scale-105"
            >
              Prendre Rendez-vous
            </Link>
          </div>
        </div>

        {/* --- BANDEAU DÉFILANT --- */}
        <div className="-mt-4 bg-[#78716c] text-white py-3 overflow-hidden relative z-20 shadow-lg border-y border-[#8c857f]">
          <div className="animate-marquee whitespace-nowrap flex gap-16 text-[10px] md:text-xs font-medium uppercase tracking-[0.4em]">
            <span>•</span><span>Expertise Médicale</span>
            <span>•</span><span>Technologies de Pointe</span>
            <span>•</span><span>Résultats Visibles</span>
            <span>•</span><span>Bien-être Absolu</span>
            <span>•</span><span>Signature Wellness</span>
            <span>•</span><span>Expertise Médicale</span>
            <span>•</span><span>Technologies de Pointe</span>
            <span>•</span><span>Résultats Visibles</span>
            <span>•</span><span>Bien-être Absolu</span>
            <span>•</span><span>Signature Wellness</span>
          </div>
        </div>

        {/* --- LE PROCESSUS --- */}
        <section className="py-24 bg-[#fafaf9] border-b border-[#e7e5e4] reveal">
          <div className="max-w-7xl mx-auto px-4">
             <div className="text-center mb-16">
                <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-3 block">
                  Expérience Client
                </span>
                <h2 className="text-3xl md:text-5xl text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
                  Votre Parcours Beauté
                </h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
                <div className="text-center group">
                   <div className="text-7xl font-serif text-[#e7e5e4] mb-6 group-hover:text-[#BFA997] transition-colors duration-500">01</div>
                   <h3 className="text-sm font-bold uppercase tracking-widest text-[#57534e] mb-3">Le Rituel</h3>
                   <p className="text-xs text-[#78716c] font-medium leading-relaxed uppercase tracking-wide">Sélectionnez le soin adapté<br/>à vos besoins</p>
                </div>
                <div className="text-center group">
                   <div className="text-7xl font-serif text-[#e7e5e4] mb-6 group-hover:text-[#BFA997] transition-colors duration-500">02</div>
                   <h3 className="text-sm font-bold uppercase tracking-widest text-[#57534e] mb-3">L'Agenda</h3>
                   <p className="text-xs text-[#78716c] font-medium leading-relaxed uppercase tracking-wide">Choisissez votre date<br/>et votre créneau idéal</p>
                </div>
                <div className="text-center group">
                   <div className="text-7xl font-serif text-[#e7e5e4] mb-6 group-hover:text-[#BFA997] transition-colors duration-500">03</div>
                   <h3 className="text-sm font-bold uppercase tracking-widest text-[#57534e] mb-3">La Validation</h3>
                   <p className="text-xs text-[#78716c] font-medium leading-relaxed uppercase tracking-wide">Confirmez votre réservation<br/>en toute sécurité</p>
                </div>
                <div className="text-center group">
                   <div className="text-7xl font-serif text-[#e7e5e4] mb-6 group-hover:text-[#BFA997] transition-colors duration-500">04</div>
                   <h3 className="text-sm font-bold uppercase tracking-widest text-[#57534e] mb-3">L'Instant Révélation</h3>
                   <p className="text-xs text-[#78716c] font-medium leading-relaxed uppercase tracking-wide">Profitez de votre transformation<br/>le Jour J</p>
                </div>
             </div>
             <div className="text-center mt-12">
                <Link to="/reservation" className="inline-block bg-[#57534e] text-white px-12 py-4 uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#78716c] transition-colors shadow-lg">
                  Commencer l'expérience
                </Link>
             </div>
          </div>
        </section>

        {/* --- SECTIONS SOINS --- */}
        <section className="py-24 px-4 md:px-0 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center border-b border-[#e7e5e4] pb-24">
            <div className="md:w-1/2 md:pr-16 md:pl-8 mb-12 md:mb-0 text-left reveal">
              <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">Technologie Définitive</span>
              <h2 className="text-3xl md:text-5xl mb-6 text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>Épilation Laser Médicale</h2>
              <p className="text-[#57534e] leading-relaxed mb-6 font-light">Dites adieu aux poils indésirables grâce à notre technologie laser de dernière génération.</p>
              <Link to="/epilation-laser" className="group relative inline-block text-[#57534e] uppercase text-xs tracking-widest font-bold mt-4">
                <span className="relative z-10">Découvrir le protocole</span>
                <span className="absolute left-0 -bottom-2 h-[1px] w-0 bg-[#57534e] transition-all duration-700 ease-out group-hover:w-full"></span>
              </Link>
            </div>
            <div className="md:w-1/2 w-full h-[600px] reveal">
              <img src={imgLaser} alt="Epilation Laser" className="w-full h-full object-cover shadow-2xl animate-float" />
            </div>
          </div>
        </section>

        <section className="py-12 px-4 md:px-0 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row-reverse items-center border-b border-[#e7e5e4] pb-24">
            <div className="md:w-1/2 md:pl-16 md:pr-8 mb-12 md:mb-0 text-left reveal">
              <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">Soins Visage & Éclat</span>
              <h2 className="text-3xl md:text-5xl mb-6 text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>HydraFace & Skin Care</h2>
              <p className="text-[#57534e] leading-relaxed mb-6 font-light">Révélez l'éclat de votre peau avec le soin HydraFace, une technologie brevetée unique qui nettoie, extrait et hydrate.</p>
              <Link to="/soins-visage" className="group relative inline-block text-[#57534e] uppercase text-xs tracking-widest font-bold mt-4">
                <span className="relative z-10">Voir nos soins visage</span>
                <span className="absolute left-0 -bottom-2 h-[1px] w-0 bg-[#57534e] transition-all duration-700 ease-out group-hover:w-full"></span>
              </Link>
            </div>
            <div className="md:w-1/2 w-full h-[600px] reveal">
              <img src={imgHydra} alt="Soin Visage" className="w-full h-full object-cover shadow-2xl animate-float-delay" />
            </div>
          </div>
        </section>

        <section className="py-24 px-4 md:px-0 max-w-7xl mx-auto border-b border-[#e7e5e4] reveal">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-16 md:pl-8 mb-12 md:mb-0 text-left reveal">
              <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">Détente Absolue</span>
              <h2 className="text-3xl md:text-5xl mb-6 text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>Massages & Body Contouring</h2>
              <p className="text-[#57534e] leading-relaxed mb-6 font-light">Lâchez prise dans un cadre d'exception. Nos massothérapeutes maîtrisent des techniques ancestrales.</p>
               <Link to="/massages" className="group relative inline-block text-[#57534e] uppercase text-xs tracking-widest font-bold mt-4">
                <span className="relative z-10">Explorer la carte des massages</span>
                <span className="absolute left-0 -bottom-2 h-[1px] w-0 bg-[#57534e] transition-all duration-700 ease-out group-hover:w-full"></span>
              </Link>
            </div>
            <div className="md:w-1/2 w-full h-[600px] reveal">
              <img src={imgMassage} alt="Massage" className="w-full h-full object-cover shadow-2xl animate-float" />
            </div>
          </div>
        </section>

        {/* --- CARROUSEL INSTAGRAM DÉFILANT (INFINI ET TOUTES PHOTOS) --- */}
        <div className="pt-24 pb-12 overflow-hidden reveal bg-[#fafaf9]">
           <div className="text-center mb-12">
              <p className="text-[#78716c] text-xs uppercase tracking-[0.3em] mb-2">Rejoignez-nous</p>
              <a href="https://instagram.com/Signature_Wellness" target="_blank" rel="noreferrer" className="text-2xl text-[#57534e] hover:text-[#BFA997] transition-colors" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
                @Signature_Wellness
              </a>
           </div>
           
           <div className="relative flex overflow-x-hidden group border-t border-[#e7e5e4] pt-2">
             <div className="flex animate-carousel whitespace-nowrap group-hover:pause">
               {instagramPhotos.map((img, idx) => (
                 <img key={`first-${idx}`} src={img} className="w-64 h-64 md:w-80 md:h-80 object-cover mx-1 shadow-sm hover:opacity-80 transition-opacity cursor-pointer" alt="Gallery item" />
               ))}
               {instagramPhotos.map((img, idx) => (
                 <img key={`second-${idx}`} src={img} className="w-64 h-64 md:w-80 md:h-80 object-cover mx-1 shadow-sm hover:opacity-80 transition-opacity cursor-pointer" alt="Gallery item" />
               ))}
             </div>
           </div>
        </div>
      
      </div> 
      {/* FIN DU BLOC BLANC */}


      {/* ========================================================
          L'EFFET RIDEAU (L'image fixée tout au fond)
          ======================================================== */}
      <section className="relative w-full z-0">
        
        {/* L'image est fixée en bas, derrière le bloc blanc */}
        <div className="fixed bottom-0 left-0 w-full h-[60vh] md:h-[80vh] flex items-center justify-center -z-10">
          <img src={imgParallax} className="absolute inset-0 w-full h-full object-cover" alt="Fond Rideau" />
          <div className="absolute inset-0 bg-black/40"></div>
          
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.3em] mb-4 block text-white/90">
              L'Excellence à Paris
            </span>
            <h2 className="text-4xl md:text-6xl mb-8 drop-shadow-2xl" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
              L'Art de Révéler <br />Votre Beauté Naturelle
            </h2>
            <div className="h-[1px] w-24 bg-white mx-auto mb-10 opacity-50"></div>
            <Link 
              to="/reservation" 
              className="inline-block bg-white text-[#57534e] px-12 py-4 uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#57534e] hover:text-white transition-colors shadow-2xl"
            >
              Découvrir l'Institut
            </Link>
          </div>
        </div>
        
        {/* Ce bloc transparent permet de "scroller" tout en bas pour dévoiler l'image */}
        <div className="h-[60vh] md:h-[80vh] w-full bg-transparent pointer-events-none"></div>
      </section>

    </div>
  );
}