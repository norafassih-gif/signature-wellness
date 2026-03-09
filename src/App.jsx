import React from 'react';
import { Routes, Route } from 'react-router-dom';

// IMPORTS DES COMPOSANTS
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// IMPORTS DES PAGES
import Home from './pages/Home';
import EpilationLaser from './pages/EpilationLaser';
import BodyContouring from './pages/BodyContouring';
import SoinsVisage from './pages/SoinsVisage';
import Microneedling from './pages/Microneedling';
import Massages from './pages/Massages';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Booking from './pages/Booking';
import MentionsLegales from './pages/MentionsLegales'; 

// LES PRESTATIONS AJOUTEES
import Co2Fractionne from './pages/Co2Fractionne'; 
import MiracleSculpt from './pages/MiracleSculpt'; // <--- NOUVELLE PAGE PRESTATION

// LES FORMATIONS
import FormationDrainage from './pages/FormationDrainage';
import FormationMadero from './pages/FormationMadero';
import FormationRadiofrequence from './pages/FormationRadiofrequence';
import FormationOndesChoc from './pages/FormationOndesChoc';
import FormationHydraface from './pages/FormationHydraface';
import FormationMicroneedling from './pages/FormationMicroneedling';
import FormationPeeling from './pages/FormationPeeling';
import FormationPlasmaFroid from './pages/FormationPlasmaFroid';
import FormationDetatouage from './pages/FormationDetatouage';
import FormationBlanchiment from './pages/FormationBlanchiment';
import FormationHifu from './pages/FormationHifu';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/epilation-laser" element={<EpilationLaser />} />
          <Route path="/body-contouring" element={<BodyContouring />} />
          <Route path="/soins-visage" element={<SoinsVisage />} />
          <Route path="/microneedling" element={<Microneedling />} />
          <Route path="/massages" element={<Massages />} />
          
          {/* NOUVELLES PAGES PRESTATIONS */}
          <Route path="/co2-fractionne" element={<Co2Fractionne />} />
          <Route path="/miracle-sculpt" element={<MiracleSculpt />} /> {/* <--- AJOUT ICI */}

          {/* ROUTES DES FORMATIONS */}
          <Route path="/formation/drainage-post-op" element={<FormationDrainage />} />
          <Route path="/formation/maderotherapie" element={<FormationMadero />} />
          <Route path="/formation/radiofrequence-cavitation" element={<FormationRadiofrequence />} />
          <Route path="/formation/ondes-de-choc" element={<FormationOndesChoc />} />
          <Route path="/formation/hydraface" element={<FormationHydraface />} />
          <Route path="/formation/microneedling" element={<FormationMicroneedling />} />
          <Route path="/formation/peeling" element={<FormationPeeling />} />
          <Route path="/formation/plasma-froid" element={<FormationPlasmaFroid />} />
          <Route path="/formation/detatouage" element={<FormationDetatouage />} />
          <Route path="/formation/blanchiment-dentaire" element={<FormationBlanchiment />} />
          <Route path="/formation/hifu" element={<FormationHifu />} />

          {/* Autres pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/reservation" element={<Booking />} />
          
          {/* Page Légale */}
          <Route path="/mentions-legales" element={<MentionsLegales />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;