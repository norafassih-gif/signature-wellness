import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { Helmet } from 'react-helmet-async';

// --- IMPORTATION DES IMAGES ---
import imgFemme1 from '../assets/femmescouleurs1.jpg';
import imgFemme2 from '../assets/femmescouleurs2.jpg';
import imgFemme3 from '../assets/femmescouleurs3.jpg';
import imgLaser from '../assets/laser.jpg';
import imgHydra from '../assets/hydrafacial.jpg';
import imgMassage from '../assets/formation-massage.png'; 
import imgNeedling from '../assets/microneedling.jpg';
import imgParallax from '../assets/Corp3.jpg'; 
import imgHifu from '../assets/Hifu.jpg';
import imgCorp1 from '../assets/Corp1.jpg'; 
import imgCorp2 from '../assets/Corp2.jpg'; 
import imgJambes from '../assets/soin-jambes.jpg'; 
import imgBlanchiment from '../assets/Blanchiement.jpg';
import imgDetatouage from '../assets/Detatouage.jpg';
import imgPeeling from '../assets/Peeling.jpg';
import imgPlasmaFroid from '../assets/soin-plasma.png'; 

export default function Home() {
  const { pathname } = useLocation(); 
  const slides = [imgFemme1, imgFemme2, imgFemme3];
  const [currentSlide, setCurrentSlide] = useState(0);

  const instagramPhotos = [
    imgNeedling, imgLaser, imgMassage, imgHydra, imgFemme1, imgHifu, 
    imgCorp1, imgCorp2, imgJambes, imgBlanchiment, imgDetatouage, imgPeeling, imgPlasmaFroid
  ];

  // --- FORCE LE RETOUR EN HAUT DE PAGE ---
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // --- SLIDER AUTOMATIQUE ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // --- ANIMATIONS REVEAL ---
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
        <title>Dermo-Esthétique & Bien-Être | Signature Wellness</title>
        <meta name="description" content="Découvrez nos soins esthétiques haute technologie : Épilation Laser, Hydraface, Body Contouring et massages post-opératoires." />
      </Helmet>
      
      <div className="relative z-10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        
        {/* --- HERO SLIDER (CORRIGÉ : PLUS DE FOND MARRON) --- */}
        <div className="relative h-[75vh] md:h-screen flex items-center justify-center overflow-hidden bg-white">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              <img 
                src={slide} 
                alt={`Signature Wellness Slide ${index + 1}`} 
                className="w-full h-full object-cover object-center opacity-85 scale-100 transition-transform duration-700"
              />
              {/* Overlay léger pour le luxe */}
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          ))}
          
          <div className="relative z-10 text-center text-white px-4 reveal active">
            <p className="text-[10px] md:text-base uppercase tracking-[0.4em] mb-6 font-light drop-shadow-md">
              Expertise Dermo-Esthétique
            </p>
            <h1 
              className="text-3xl md:text-7xl lg:text-8xl uppercase tracking-widest mb-10 text-white drop-shadow-lg" 
              style={{ fontFamily: "'Tenor Sans', sans-serif" }}
            >
              Signature<br/>Wellness
            </h1>
            <Link 
              to="/reservation" 
              className="inline-block border border-white text-white px-8 py-3 md:px-10 md:py-4 uppercase text-[10px] md:text-xs tracking-[0.2em] hover:bg-white hover:text-[#57534e] transition-all duration-500 shadow-xl"
            >
              Prendre Rendez-vous
            </Link>
          </div>
        </div>

        {/* --- BANDEAU DÉFILANT --- */}
        <div className="-mt-1 bg-[#78716c] text-white py-3 overflow-hidden relative z-20 shadow-lg border-y border-[#8c857f]">
          <div className="animate-marquee whitespace-nowrap flex gap-16 text-[10px] md:text-xs font-medium uppercase tracking-[0.4em]">
            <span>•</span><span>Dermo-Cosmétique</span>
            <span>•</span><span>Technologies de Pointe</span>
            <span>•</span><span>Résultats Visibles</span>
            <span>•</span><span>Bien-être Absolu</span>
            <span>•</span><span>Signature Wellness</span>
          </div>
        </div>

        {/* --- LE PROCESSUS --- */}
        <section className="py-24 bg-[#fafaf9] border-b border-[#e7e5e4] reveal">
          <div className="max-w-7xl mx-auto px-4 text-center">
             <div className="mb-16">
                <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.3em] mb-3 block">
                  Expérience Client
                </span>
                <h2 className="text-3xl md:text-5xl text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
                  Votre Parcours Beauté
                </h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                {["Le Rituel", "L'Agenda", "La Validation", "L'Instant"].map((stepTitle, i) => (
                  <div key={i} className="group">
                    <div className="text-7xl font-serif text-[#e7e5e4] mb-6 group-hover:text-[#BFA997] transition-colors duration-500">0{i+1}</div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#57534e] mb-3">{stepTitle}</h3>
                    <p className="text-xs text-[#78716c] font-medium leading-relaxed uppercase tracking-wide">Étape essentielle</p>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* --- SECTIONS SOINS --- */}
        <section className="py-24 px-4 md:px-0 max-w-7xl mx-auto border-b border-[#e7e5e4]">
          <div className="flex flex-col md:flex-row items-center reveal">
            <div className="md:w-1/2 md:pr-16 md:pl-8 mb-12 md:mb-0 text-left">
              <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">Détente Absolue</span>
              <h2 className="text-3xl md:text-5xl mb-6 text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>Massage Post-Opératoire</h2>
              <p className="text-[#57534e] leading-relaxed mb-6 font-light text-sm">L'expertise Signature Wellness : un accompagnement post-chirurgie optimal pour réduire l'oedème et favoriser la cicatrisation.</p>
               <Link to="/massages" className="group relative inline-block text-[#57534e] uppercase text-[10px] tracking-[0.2em] font-bold mt-4">
                <span className="relative z-10">Explorer la carte</span>
                <span className="absolute left-0 -bottom-2 h-[1px] w-0 bg-[#57534e] transition-all duration-700 group-hover:w-full"></span>
              </Link>
            </div>
            <div className="md:w-1/2 w-full h-[400px] md:h-[600px]">
              <img src={imgMassage} alt="Massage" className="w-full h-full object-cover shadow-2xl" />
            </div>
          </div>
        </section>

        <section className="py-24 px-4 md:px-0 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row-reverse items-center reveal">
            <div className="md:w-1/2 md:pl-16 md:pr-8 mb-12 md:mb-0 text-left">
              <span className="text-[#78716c] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">Technologie Définitive</span>
              <h2 className="text-3xl md:text-5xl mb-6 text-[#57534e]" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>Épilation Laser</h2>
              <p className="text-[#57534e] leading-relaxed mb-6 font-light text-sm">Dites adieu aux poils indésirables grâce à notre technologie laser de dernière génération.</p>
              <Link to="/epilation-laser" className="group relative inline-block text-[#57534e] uppercase text-[10px] tracking-[0.2em] font-bold mt-4">
                <span className="relative z-10">Découvrir le protocole</span>
                <span className="absolute left-0 -bottom-2 h-[1px] w-0 bg-[#57534e] transition-all duration-700 group-hover:w-full"></span>
              </Link>
            </div>
            <div className="md:w-1/2 w-full h-[400px] md:h-[600px]">
              <img src={imgLaser} alt="Laser" className="w-full h-full object-cover shadow-2xl" />
            </div>
          </div>
        </section>
      </div> 

      {/* --- L'EFFET RIDEAU (DÉZOOMÉ SANS FOND MARRON) --- */}
      <section className="relative w-full h-[65vh] md:h-[85vh] overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <img 
            src={imgParallax} 
            className="w-full h-full object-cover fixed top-0 left-0 -z-10 opacity-90" 
            alt="Signature Wellness Neuilly" 
          />
          <div className="absolute inset-0 bg-black/25"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block drop-shadow-md">Neuilly-sur-Seine</span>
            <h2 className="text-4xl md:text-6xl mb-8 drop-shadow-2xl" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
              L'Art de Révéler <br />Votre Beauté Naturelle
            </h2>
            <Link to="/reservation" className="inline-block bg-white text-[#57534e] px-12 py-4 uppercase text-[10px] font-bold tracking-[0.2em] hover:bg-[#57534e] hover:text-white transition-all duration-500 shadow-2xl">
              Découvrir l'Institut
            </Link>
          </div>
        </div>
      </section>

      {/* --- CARROUSEL INSTAGRAM (ÉPURÉ & CHIC) --- */}
      <div className="relative z-10 bg-white pt-24 pb-12 overflow-hidden reveal">
         <div className="text-center mb-12">
            <p className="text-[#78716c] text-[10px] uppercase tracking-[0.3em] mb-4">Rejoignez-nous sur Instagram</p>
            <a 
              href="https://instagram.com/Signature_Wellness" 
              target="_blank" 
              rel="noreferrer" 
              className="text-2xl md:text-3xl text-[#57534e] uppercase tracking-[0.2em] hover:opacity-60 transition-all duration-500" 
              style={{ fontFamily: "'Tenor Sans', sans-serif" }}
            >
              Signature Wellness
            </a>
         </div>
         <div className="relative flex overflow-x-hidden group border-t border-[#e7e5e4] pt-2">
           <div className="flex animate-carousel whitespace-nowrap group-hover:pause">
             {instagramPhotos.map((img, idx) => (
               <img key={`first-${idx}`} src={img} className="w-64 h-64 md:w-80 md:h-80 object-cover mx-1 shadow-sm hover:opacity-80 transition-opacity cursor-pointer grayscale hover:grayscale-0 duration-700" alt="Gallery" />
             ))}
             {instagramPhotos.map((img, idx) => (
               <img key={`second-${idx}`} src={img} className="w-64 h-64 md:w-80 md:h-80 object-cover mx-1 shadow-sm hover:opacity-80 transition-opacity cursor-pointer grayscale hover:grayscale-0 duration-700" alt="Gallery" />
             ))}
           </div>
         </div>
      </div>
    </div>
  );
}