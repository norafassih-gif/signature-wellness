/**
 * Comptabilite.jsx — Module Caisse & Comptabilité
 * ─────────────────────────────────────────────────────────────────────────────
 * FONCTIONNALITÉS :
 *   ✅ Sélection prestation par catégorie → prix automatique
 *   ✅ Remise (10/20/30/40/50%) protégée par code admin
 *   ✅ Suppression de ligne protégée par code admin
 *   ✅ Import RDV depuis Google Calendar via Zapier → Firestore
 *   ✅ Totaux : jour / semaine / mois + ventilation par mode de paiement
 *   ✅ Export CSV pour comptable
 *   ✅ Export PDF récapitulatif signé
 *
 * INSTALLATION :
 *   npm install jspdf jspdf-autotable
 *
 * INTÉGRATION GOOGLE CALENDAR (via Zapier) :
 *   Dans Zapier, créer un Zap :
 *     Trigger  → Google Calendar / Event Start
 *     Action   → Firebase / Create Document dans la collection "rdv_calendar"
 *     Champs à mapper :
 *       titre       ← Summary (titre du RDV)
 *       heure       ← Start Time (formaté HH:MM)
 *       description ← Description (mettre le nom de la prestation ici dans l'agenda)
 *       date        ← Start Time (ISO string)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useMemo } from 'react';
import { db } from '../firebase';
import {
  collection, addDoc, getDocs, deleteDoc,
  doc, query, orderBy, where,
} from 'firebase/firestore';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// ═══════════════════════════════════════════════════════════════════════════════
//  CONFIGURATION — À MODIFIER
// ═══════════════════════════════════════════════════════════════════════════════
const ADMIN_CODE        = "SW2026&";
const NOM_ETABLISSEMENT = "Signature Wellness"; // ← Affiché sur les exports PDF

// ═══════════════════════════════════════════════════════════════════════════════
//  LISTE COMPLÈTE DES PRESTATIONS
// ═══════════════════════════════════════════════════════════════════════════════
const PRESTATIONS = [
  // ── Soins Visage & Peelings ───────────────────────────────────────────────
  { cat: "SOINS VISAGE & PEELINGS",              nom: "SOIN SIGNATURE (30 MIN)",              prix: 149 },
  { cat: "SOINS VISAGE & PEELINGS",              nom: "SOIN DELUXE (45 MIN)",                 prix: 180 },
  { cat: "SOINS VISAGE & PEELINGS",              nom: "SOIN PLATINUM (60 MIN)",               prix: 220 },
  { cat: "SOINS VISAGE & PEELINGS",              nom: "BOOSTER LÈVRES OU YEUX (OPTION)",      prix: 50  },
  { cat: "SOINS VISAGE & PEELINGS",              nom: "NEEDLING CLASSIQUE",                   prix: 150 },
  { cat: "SOINS VISAGE & PEELINGS",              nom: "HYDRANEEDLING",                        prix: 250 },
  { cat: "SOINS VISAGE & PEELINGS",              nom: "NATURAL PEEL",                         prix: 250 },
  { cat: "SOINS VISAGE & PEELINGS",              nom: "REGENERATION PEEL",                    prix: 350 },
  { cat: "SOINS VISAGE & PEELINGS",              nom: "CLEAR PEEL / CLARITY PEEL",            prix: 330 },

  // ── Injections & Mésothérapie Visage ─────────────────────────────────────
  { cat: "INJECTIONS & MÉSOTHÉRAPIE VISAGE",     nom: "EXOSOMES FULL FACE",                   prix: 350 },
  { cat: "INJECTIONS & MÉSOTHÉRAPIE VISAGE",     nom: "EXOSOMES FULL FACE + DÉCOLLETÉ",       prix: 450 },
  { cat: "INJECTIONS & MÉSOTHÉRAPIE VISAGE",     nom: "PRP FULL FACE",                        prix: 250 },
  { cat: "INJECTIONS & MÉSOTHÉRAPIE VISAGE",     nom: "PRP + EXOSOMES FULL FACE",             prix: 450 },
  { cat: "INJECTIONS & MÉSOTHÉRAPIE VISAGE",     nom: "PDRN (ADN SAUMON)",                    prix: 350 },
  { cat: "INJECTIONS & MÉSOTHÉRAPIE VISAGE",     nom: "EYES REPAIR (CERNES)",                 prix: 200 },
  { cat: "INJECTIONS & MÉSOTHÉRAPIE VISAGE",     nom: "COLLAGEN BOOSTER",                     prix: 350 },
  { cat: "INJECTIONS & MÉSOTHÉRAPIE VISAGE",     nom: "PRF (FIBRINE)",                        prix: 350 },

  // ── Perfusions & Vitamines ────────────────────────────────────────────────
  { cat: "PERFUSIONS & VITAMINES",               nom: "PERFUSION DE VITAMINES",               prix: 300 },
  { cat: "PERFUSIONS & VITAMINES",               nom: "GLUTATHION PERF",                      prix: 300 },
  { cat: "PERFUSIONS & VITAMINES",               nom: "CURE GLUTATHION (8 SÉANCES)",          prix: 1800 },

  // ── Traitements Capillaires ───────────────────────────────────────────────
  { cat: "TRAITEMENTS CAPILLAIRES",              nom: "COCKTAIL ACTIVATEUR DE POUSSE",        prix: 120 },
  { cat: "TRAITEMENTS CAPILLAIRES",              nom: "TRAITEMENT DE PELADE",                 prix: 200 },
  { cat: "TRAITEMENTS CAPILLAIRES",              nom: "PRP CHEVEUX",                          prix: 250 },
  { cat: "TRAITEMENTS CAPILLAIRES",              nom: "EXOSOMES CHEVEUX",                     prix: 350 },
  { cat: "TRAITEMENTS CAPILLAIRES",              nom: "PRP + EXOSOMES CHEVEUX",               prix: 450 },
  { cat: "TRAITEMENTS CAPILLAIRES",              nom: "CURE PRP (5 SÉANCES)",                 prix: 1000 },
  { cat: "TRAITEMENTS CAPILLAIRES",              nom: "CURE EXOSOMES (5 SÉANCES)",            prix: 1400 },

  // ── Cicatrices, Vergetures & Imperfections ────────────────────────────────
  { cat: "CICATRICES, VERGETURES & IMPERFECTIONS", nom: "TRAITEMENT DE CHÉLOÏDES",            prix: 150 },
  { cat: "CICATRICES, VERGETURES & IMPERFECTIONS", nom: "TRAITEMENT CICATRICE (NEEDLING)",    prix: 150 },
  { cat: "CICATRICES, VERGETURES & IMPERFECTIONS", nom: "TRAITEMENT CICATRICE (LASER CO2)",   prix: 250 },
  { cat: "CICATRICES, VERGETURES & IMPERFECTIONS", nom: "CARBOXYTHÉRAPIE CICATRICE",          prix: 200 },
  { cat: "CICATRICES, VERGETURES & IMPERFECTIONS", nom: "TRAITEMENT ACCROCHORDONS",           prix: 150 },
  { cat: "CICATRICES, VERGETURES & IMPERFECTIONS", nom: "TRAITEMENT VERGETURES (NEEDLING)",   prix: 200 },
  { cat: "CICATRICES, VERGETURES & IMPERFECTIONS", nom: "TRAITEMENT VERGETURES (LASER CO2)",  prix: 250 },

  // ── Haute Technologie & Lasers ────────────────────────────────────────────
  { cat: "HAUTE TECHNOLOGIE & LASERS",           nom: "LASER CO2 FRACTIONNÉ",                 prix: 450 },
  { cat: "HAUTE TECHNOLOGIE & LASERS",           nom: "CARBOXYTHÉRAPIE",                      prix: 300 },
  { cat: "HAUTE TECHNOLOGIE & LASERS",           nom: "HIFU VISAGE",                          prix: 250 },
  { cat: "HAUTE TECHNOLOGIE & LASERS",           nom: "HIFU CORPS",                           prix: 350 },
  { cat: "HAUTE TECHNOLOGIE & LASERS",           nom: "PLASMA FROID",                         prix: 300 },
  { cat: "HAUTE TECHNOLOGIE & LASERS",           nom: "RADIOFRÉQUENCE & CAVITATION",          prix: 150 },
  { cat: "HAUTE TECHNOLOGIE & LASERS",           nom: "ONDES DE CHOC",                        prix: 150 },
  { cat: "HAUTE TECHNOLOGIE & LASERS",           nom: "ULTRASONS",                            prix: 150 },

  // ── Remodelage, Massages & Post-Opératoire ────────────────────────────────
  { cat: "REMODELAGE, MASSAGES & POST-OPÉRATOIRE", nom: "MIRACLE SCULPT",                     prix: 200 },
  { cat: "REMODELAGE, MASSAGES & POST-OPÉRATOIRE", nom: "MIRACLE FACE (DRAINAGE VISAGE)",     prix: 120 },
  { cat: "REMODELAGE, MASSAGES & POST-OPÉRATOIRE", nom: "MADÉROTHÉRAPIE (REMODELAGE)",        prix: 150 },
  { cat: "REMODELAGE, MASSAGES & POST-OPÉRATOIRE", nom: "DRAINAGE LYMPHATIQUE CORPS",         prix: 150 },
  { cat: "REMODELAGE, MASSAGES & POST-OPÉRATOIRE", nom: "MASSAGE RELAXANT (1H)",              prix: 150 },
  { cat: "REMODELAGE, MASSAGES & POST-OPÉRATOIRE", nom: "MASSAGE ANTICELLULITE",              prix: 150 },
  { cat: "REMODELAGE, MASSAGES & POST-OPÉRATOIRE", nom: "MASSAGE JAMBES LOURDES",             prix: 150 },
  { cat: "REMODELAGE, MASSAGES & POST-OPÉRATOIRE", nom: "PEELING CORPS",                      prix: 250 },
  { cat: "REMODELAGE, MASSAGES & POST-OPÉRATOIRE", nom: "PEELING PARTIES INTIMES",            prix: 300 },
  { cat: "REMODELAGE, MASSAGES & POST-OPÉRATOIRE", nom: "SÉANCE POST OP VISAGE",              prix: 120 },

  // ── Les Cures ─────────────────────────────────────────────────────────────
  { cat: "LES CURES",                            nom: "CURE 5 SÉANCES (DRAINAGE)",            prix: 650  },
  { cat: "LES CURES",                            nom: "CURE 6 SÉANCES (DRAINAGE)",            prix: 750  },
  { cat: "LES CURES",                            nom: "CURE 10 SÉANCES (MADÉROTHÉRAPIE)",     prix: 1200 },
  { cat: "LES CURES",                            nom: "CURE POST OP VISAGE (6 SÉANCES)",      prix: 600  },
  { cat: "LES CURES",                            nom: "CURE POST OP VISAGE (10 SÉANCES)",     prix: 1000 },
  { cat: "LES CURES",                            nom: "CURE POST OP CORPS (6 SÉANCES)",       prix: 750  },
  { cat: "LES CURES",                            nom: "CURE POST OP CORPS (10 SÉANCES)",      prix: 1200 },
  { cat: "LES CURES",                            nom: "CURE POST OP CORPS (20 SÉANCES)",      prix: 2400 },
];

const MODES_PAIEMENT = ["CB", "Espèces", "Chèque", "PayPal", "Virement"];
const REMISES_OPTIONS = [0, 10, 20, 30, 40, 50];
const CATEGORIES = [...new Set(PRESTATIONS.map(p => p.cat))];

// ═══════════════════════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════════════════════
const demanderCode = (action) => {
  const saisi = window.prompt(`🔐 Code administrateur requis pour ${action} :`);
  if (saisi === ADMIN_CODE) return true;
  if (saisi !== null) alert("Code incorrect. Action annulée.");
  return false;
};

const fmt = (n) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n ?? 0);

// Version PDF : évite l'espace insécable (\u202f) que jsPDF affiche comme "/"
const fmtPDF = (n) => {
  const val = (n ?? 0).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${val} \u20AC`;
};

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });

const fmtHeure = (iso) =>
  new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

const debutJour = () => {
  const d = new Date(); d.setHours(0, 0, 0, 0); return d;
};
const debutSemaine = () => {
  const d = new Date();
  const j = d.getDay() || 7;
  d.setDate(d.getDate() - j + 1);
  d.setHours(0, 0, 0, 0);
  return d;
};
const debutMois = () => {
  const d = new Date(); d.setDate(1); d.setHours(0, 0, 0, 0); return d;
};

const filtrerParPeriode = (lignes, periode) => {
  const bornes = { jour: debutJour(), semaine: debutSemaine(), mois: debutMois(), tout: null };
  const borne = bornes[periode];
  if (!borne) return lignes;
  return lignes.filter(l => new Date(l.date) >= borne);
};

// ═══════════════════════════════════════════════════════════════════════════════
//  EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════
const exporterCSV = (lignes, periode, dateDebut, dateFin) => {
  let data;
  if (periode === 'custom' && dateDebut && dateFin) {
    const debut = new Date(dateDebut); debut.setHours(0,0,0,0);
    const fin   = new Date(dateFin);   fin.setHours(23,59,59,999);
    data = lignes.filter(l => { const d = new Date(l.date); return d >= debut && d <= fin; });
  } else {
    data = filtrerParPeriode(lignes, periode);
  }
  let csv = "\uFEFF";
  csv += "Date,Heure,Cliente,Prestation,Prix de base,Remise %,Montant final,Paiement\n";
  data.forEach(l => {
    csv += [fmtDate(l.date), fmtHeure(l.date), l.client, `"${l.prestation}"`,
      `${l.prixBase ?? l.montant}`, `${l.remise ?? 0}%`, `${l.montant}`, l.paiement].join(',') + '\n';
  });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `comptabilite_${periode}_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
};

const exporterPDF = (lignes, periode, dateDebut, dateFin) => {
  let data;
  if (periode === 'custom' && dateDebut && dateFin) {
    const debut = new Date(dateDebut); debut.setHours(0,0,0,0);
    const fin   = new Date(dateFin);   fin.setHours(23,59,59,999);
    data = lignes.filter(l => { const d = new Date(l.date); return d >= debut && d <= fin; });
  } else {
    data = filtrerParPeriode(lignes, periode);
  }
  const total = data.reduce((s, l) => s + (l.montant ?? 0), 0);
  const labels = { jour: 'du jour', semaine: 'de la semaine', mois: 'du mois', tout: 'complet', custom: 'sur période' };

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  // En-tête
  doc.setFillColor(120, 113, 108); // #78716c taupe
  doc.rect(0, 0, 297, 22, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text(NOM_ETABLISSEMENT, 14, 10);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Récapitulatif comptable ${labels[periode]} — généré le ${new Date().toLocaleDateString('fr-FR')}`, 14, 17);

  // Tableau
  autoTable(doc, {
    startY: 28,
    head: [['Date', 'Heure', 'Cliente', 'Prestation', 'Prix base', 'Remise', 'Montant TTC', 'Paiement']],
    body: data.map(l => [
      fmtDate(l.date),
      fmtHeure(l.date),
      l.client,
      l.prestation,
      fmtPDF(l.prixBase ?? l.montant),
      l.remise ? `${l.remise}%` : '—',
      fmtPDF(l.montant),
      l.paiement,
    ]),
    foot: [['', '', '', '', '', 'TOTAL', fmtPDF(total), '']],
    headStyles : { fillColor: [120, 113, 108], textColor: 255, fontSize: 9, fontStyle: 'bold' },
    footStyles : { fillColor: [240, 240, 240], textColor: [10, 10, 10], fontStyle: 'bold' },
    bodyStyles : { fontSize: 8, textColor: [30, 30, 30] },
    alternateRowStyles: { fillColor: [250, 250, 250] },
    columnStyles: {
      6: { halign: 'right', fontStyle: 'bold' },
      7: { halign: 'center' },
    },
    margin: { left: 14, right: 14 },
  });

  // Ventilation par mode de paiement
  const modes = {};
  MODES_PAIEMENT.forEach(m => { modes[m] = 0; });
  data.forEach(l => { if (modes[l.paiement] !== undefined) modes[l.paiement] += l.montant ?? 0; });

  const finalY = doc.lastAutoTable.finalY + 8;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(10, 10, 10);
  doc.text('Ventilation par mode de paiement :', 14, finalY);
  let x = 14;
  MODES_PAIEMENT.forEach(m => {
    doc.setFont('helvetica', 'normal');
    doc.text(`${m} : ${fmtPDF(modes[m])}`, x, finalY + 6);
    x += 55;
  });

  // Signature
  const pageH = doc.internal.pageSize.getHeight();
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text(`Document généré automatiquement — ${NOM_ETABLISSEMENT}`, 14, pageH - 6);

  doc.save(`comptabilite_${periode}_${new Date().toISOString().slice(0,10)}.pdf`);
};

// ═══════════════════════════════════════════════════════════════════════════════
//  ICÔNES SVG
// ═══════════════════════════════════════════════════════════════════════════════
const Icon = {
  lock: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  trash: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
    </svg>
  ),
  download: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  refresh: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
  ),
  calendar: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  arrow: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  info: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  plus: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
//  COMPOSANT PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════════
export default function Comptabilite() {

  // ── Formulaire — ligne en cours de saisie ───────────────────────────────
  const [client,     setClient]     = useState('');
  const [categorie,  setCategorie]  = useState('');
  const [prestation, setPrestation] = useState('');
  const [prixBase,   setPrixBase]   = useState(null);
  const [remise,     setRemise]     = useState(0);
  const [paiement,   setPaiement]   = useState('CB');
  const [submitting, setSubmitting] = useState(false);

  // ── Panier (multi-prestations avant encaissement) ────────────────────────
  const [panier, setPanier] = useState([]); // [{ categorie, prestation, prixBase, remise, montant, paiement }]

  // ── Données & UI ────────────────────────────────────────────────────────
  const [lignes,          setLignes]          = useState([]);
  const [onglet,          setOnglet]          = useState('caisse');
  const [filtreP,         setFiltreP]         = useState('mois');
  const [dateDebut,       setDateDebut]       = useState('');
  const [dateFin,         setDateFin]         = useState('');
  const [rdvCalendar,     setRdvCalendar]     = useState([]);
  const [calLoading,      setCalLoading]      = useState(false);
  const [calErreur,       setCalErreur]       = useState('');

  useEffect(() => { chargerLignes(); }, []);

  // ── Firebase ─────────────────────────────────────────────────────────────
  const chargerLignes = async () => {
    const q = query(collection(db, "comptabilite"), orderBy("date", "desc"));
    const snap = await getDocs(q);
    setLignes(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  // ── Sélection catégorie ───────────────────────────────────────────────────
  const handleCategorieChange = (e) => {
    setCategorie(e.target.value);
    setPrestation('');
    setPrixBase(null);
    setRemise(0);
  };

  // ── Sélection prestation ──────────────────────────────────────────────────
  const prestationsDeCat = PRESTATIONS.filter(p => p.cat === categorie);

  const handlePrestationChange = (e) => {
    const nom = e.target.value;
    setPrestation(nom);
    const trouvee = PRESTATIONS.find(p => p.nom === nom);
    setPrixBase(trouvee ? trouvee.prix : null);
    setRemise(0);
  };

  // ── Remise (code admin requis) ─────────────────────────────────────────────
  const handleRemiseChange = (e) => {
    const val = Number(e.target.value);
    if (val === 0) { setRemise(0); return; }
    if (!demanderCode("appliquer une remise")) return;
    setRemise(val);
  };

  const montantFinal = prixBase !== null
    ? Math.round(prixBase * (1 - remise / 100) * 100) / 100
    : null;

  // ── Ajouter une prestation au panier ─────────────────────────────────────
  const ajouterAuPanier = () => {
    if (!prestation || montantFinal === null) return alert("Choisissez une prestation.");
    setPanier(p => [...p, { categorie, prestation, prixBase, remise, montant: montantFinal, paiement }]);
    setCategorie(''); setPrestation(''); setPrixBase(null); setRemise(0);
  };

  // ── Supprimer une ligne du panier ─────────────────────────────────────────
  const retirerDuPanier = (idx) => {
    setPanier(p => p.filter((_, i) => i !== idx));
  };

  const totalPanier = panier.reduce((s, l) => s + l.montant, 0);

  // ── Encaisser tout le panier ──────────────────────────────────────────────
  const encaisserPanier = async (e) => {
    e.preventDefault();
    if (!client.trim()) return alert("Entrez le nom de la cliente.");
    if (panier.length === 0) return alert("Ajoutez au moins une prestation.");
    setSubmitting(true);
    const now = new Date().toISOString();
    for (const ligne of panier) {
      await addDoc(collection(db, "comptabilite"), {
        client:     client.trim(),
        prestation: ligne.prestation,
        prixBase:   ligne.prixBase,
        remise:     ligne.remise,
        montant:    ligne.montant,
        paiement:   ligne.paiement,
        date:       now,
      });
    }
    setClient(''); setPanier([]); setCategorie(''); setPrestation('');
    setPrixBase(null); setRemise(0); setPaiement('CB');
    await chargerLignes();
    setSubmitting(false);
  };

  // ── Suppression (code admin requis) ───────────────────────────────────────
  const supprimerLigne = async (id) => {
    if (!demanderCode("supprimer cette ligne")) return;
    await deleteDoc(doc(db, "comptabilite", id));
    chargerLignes();
  };

  // ── Import Google Calendar via Zapier → Firestore ─────────────────────────
  const importerCalendar = async () => {
    setCalLoading(true);
    setCalErreur('');
    try {
      // Zapier écrit les RDV dans la collection "rdv_calendar" de Firestore.
      // On filtre ceux du jour en cours.
      const debut = new Date(); debut.setHours(0, 0, 0, 0);
      const fin   = new Date(); fin.setHours(23, 59, 59, 999);

      const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
      const q = query(collection(db, "appointments"), where("date", "==", today), orderBy("time", "asc"));
      const snap = await getDocs(q);
      const duJour = snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(a => a.status !== "BLOQUÉ_ADMIN");

      if (duJour.length === 0) {
        setCalErreur("Aucun rendez-vous confirmé pour aujourd'hui.");
      }

      setRdvCalendar(duJour.map(rdv => ({
        id:          rdv.id,
        titre:       `${rdv.client?.prenom || ''} ${rdv.client?.nom || ''}`.trim() || "(Client)",
        heure:       rdv.time || "—",
        description: rdv.client?.tel ? `Tél : ${rdv.client.tel}` : "",
      })));
    } catch (err) {
      setCalErreur("Erreur lecture Firestore : " + err.message);
    }
    setCalLoading(false);
  };

  const utiliserRdv = (rdv) => {
    setClient(rdv.titre);
    const trouvee = PRESTATIONS.find(p =>
      rdv.description.toLowerCase().includes(p.nom.toLowerCase())
    );
    if (trouvee) {
      setCategorie(trouvee.cat);
      setPrestation(trouvee.nom);
      setPrixBase(trouvee.prix);
    }
  };

  // ── Statistiques ────────────────────────────────────────────────────────────
  const lignesFiltrees = useMemo(() => {
    if (filtreP === 'custom' && dateDebut && dateFin) {
      const debut = new Date(dateDebut); debut.setHours(0,0,0,0);
      const fin   = new Date(dateFin);   fin.setHours(23,59,59,999);
      return lignes.filter(l => {
        const d = new Date(l.date);
        return d >= debut && d <= fin;
      });
    }
    return filtrerParPeriode(lignes, filtreP);
  }, [lignes, filtreP, dateDebut, dateFin]);

  const stats = useMemo(() => {
    const total = lignesFiltrees.reduce((s, l) => s + (l.montant ?? 0), 0);
    const parMode = {};
    MODES_PAIEMENT.forEach(m => { parMode[m] = 0; });
    lignesFiltrees.forEach(l => {
      if (parMode[l.paiement] !== undefined) parMode[l.paiement] += l.montant ?? 0;
    });
    return { total, parMode };
  }, [lignesFiltrees]);

  // ── Charte graphique Signature Wellness ──────────────────────────────────
  const C = {
    taupeBtn:    '#78716c',  // boutons principaux
    taupeTxt:    '#57534e',  // textes foncés
    pierreLight: '#e7e5e4',  // bordures / séparateurs
    bg:          '#faf9f8',  // fond de page
    white:       '#ffffff',
    muted:       '#a8a29e',  // textes secondaires
    hover:       '#6b6460',  // hover boutons
  };

  const s = {
    page:      { fontFamily: "'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Helvetica Neue', sans-serif", color: C.taupeTxt, background: C.bg, minHeight: '100vh', paddingTop: '80px' },
    card:      { background: C.white, borderRadius: 12, border: `1px solid ${C.pierreLight}`, padding: '24px', marginBottom: 16 },
    cardTitle: { fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, marginBottom: 20 },
    label:     { fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.03em', color: C.muted, display: 'block', marginBottom: 6 },
    field:     { width: '100%', height: 40, border: `1px solid ${C.pierreLight}`, borderRadius: 8, padding: '0 12px', fontSize: '0.84rem', boxSizing: 'border-box', outline: 'none', background: C.white, color: C.taupeTxt, appearance: 'auto', fontFamily: 'inherit' },
    fieldRO:   { width: '100%', height: 40, border: `1px solid ${C.pierreLight}`, borderRadius: 8, padding: '0 12px', fontSize: '0.84rem', boxSizing: 'border-box', background: C.bg, color: C.taupeTxt, fontWeight: 600, fontFamily: 'inherit' },
    input:     { width: '100%', border: `1px solid ${C.pierreLight}`, borderRadius: 8, padding: '9px 12px', fontSize: '0.875rem', boxSizing: 'border-box', outline: 'none', background: C.white, color: C.taupeTxt },
    btnPrim:   { background: C.taupeBtn, color: '#fff', border: 'none', borderRadius: 8, padding: '0 18px', height: 40, fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap', fontFamily: 'inherit' },
    btnSec:    { background: C.white, color: C.taupeTxt, border: `1px solid ${C.pierreLight}`, borderRadius: 8, padding: '0 14px', height: 36, fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', fontFamily: 'inherit' },
    btnGhost:  { background: 'none', color: C.muted, border: `1px solid ${C.pierreLight}`, borderRadius: 7, padding: '6px 12px', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'inherit' },
    btnDanger: { background: 'none', color: C.pierreLight, border: 'none', cursor: 'pointer', padding: '4px 6px', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', transition: 'color 0.15s', fontFamily: 'inherit' },
    table:     { width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' },
    th:        { padding: '10px 14px', textAlign: 'left', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.muted, borderBottom: `1px solid ${C.pierreLight}` },
    td:        { padding: '12px 14px', borderBottom: `1px solid ${C.bg}`, verticalAlign: 'middle', color: C.taupeTxt },
    badge:     (color) => ({ display: 'inline-flex', alignItems: 'center', background: color + '15', color, borderRadius: 5, padding: '2px 9px', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.03em' }),
    statCard:  { background: C.taupeBtn, color: '#fff', borderRadius: 12, padding: '20px 22px', flex: 1, minWidth: 130 },
    statVal:   { fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 },
    statLab:   { fontSize: '0.68rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 6 },
    modeCard:  { background: C.bg, border: `1px solid ${C.pierreLight}`, borderRadius: 10, padding: '16px 18px', flex: 1, minWidth: 110 },
    remiseBadge: { background: '#fef3c7', color: '#92400e', borderRadius: 5, padding: '2px 7px', fontSize: '0.72rem', fontWeight: 600, display: 'inline-block' },
    flex:      { display: 'flex', gap: 12, flexWrap: 'wrap' },
    divider:   { height: 1, background: C.pierreLight, margin: '20px 0' },
    tabActive: { padding: '14px 0', marginRight: 32, fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', background: 'none', border: 'none', outline: 'none', borderBottom: `2px solid ${C.taupeBtn}`, color: C.taupeTxt, whiteSpace: 'nowrap' },
    tabInact:  { padding: '14px 0', marginRight: 32, fontSize: '0.85rem', fontWeight: 400, cursor: 'pointer', background: 'none', border: 'none', outline: 'none', borderBottom: '2px solid transparent', color: C.muted, whiteSpace: 'nowrap' },
  };

  const labelPeriode = { jour: "Aujourd'hui", semaine: "Cette semaine", mois: "Ce mois", tout: "Tout", custom: "Période personnalisée" };

  const labelFiltre = filtreP === 'custom' && dateDebut && dateFin
    ? `${new Date(dateDebut).toLocaleDateString('fr-FR')} → ${new Date(dateFin).toLocaleDateString('fr-FR')}`
    : labelPeriode[filtreP];

  // ═════════════════════════════════════════════════════════════════════════════
  return (
    <div style={s.page}>

      {/* ── ONGLETS ─────────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${C.pierreLight}`, background: '#fff', padding: '0 32px' }}>
        {[['caisse','Encaissement'],['recap','Récapitulatif'],['calendar','Agenda']].map(([k,v]) => (
          <button key={k} onClick={() => setOnglet(k)} style={onglet === k ? s.tabActive : s.tabInact}>{v}</button>
        ))}
      </div>

      {/* ── BARRE DE FILTRE ────────────────────────────────────────────────── */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${C.pierreLight}`, padding: '10px 32px', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>

        <span style={{ fontSize: '0.68rem', color: C.muted, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginRight: 4, whiteSpace: 'nowrap' }}>Période</span>
        {Object.entries(labelPeriode).map(([k, v]) => (
          <button
            key={k}
            onClick={() => setFiltreP(k)}
            style={{
              background: filtreP === k ? C.taupeBtn : 'transparent',
              color: filtreP === k ? '#fff' : C.muted,
              border: `1px solid ${filtreP === k ? C.taupeBtn : C.pierreLight}`,
              borderRadius: 20, padding: '5px 13px', fontSize: '0.76rem', fontWeight: 500,
              cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
            }}
          >{v}</button>
        ))}

        {filtreP === 'custom' && (
          <>
            <input type="date" value={dateDebut} onChange={e => setDateDebut(e.target.value)}
              style={{ ...s.field, width: 145, fontSize: '0.8rem' }} />
            <span style={{ color: C.muted, fontSize: '0.8rem' }}>→</span>
            <input type="date" value={dateFin} onChange={e => setDateFin(e.target.value)}
              style={{ ...s.field, width: 145, fontSize: '0.8rem' }} />
          </>
        )}

        <div style={{ flex: 1 }} />

        <span style={{ fontSize: '0.78rem', color: C.muted, whiteSpace: 'nowrap' }}>
          {lignesFiltrees.length} transaction{lignesFiltrees.length > 1 ? 's' : ''} —&nbsp;
          <strong style={{ color: C.taupeTxt }}>{fmt(lignesFiltrees.reduce((s,l) => s + (l.montant ?? 0), 0))}</strong>
        </span>
      </div>

      <div style={{ padding: '24px 32px' }}>

        {onglet === 'caisse' && (
          <>
            {/* ── Formulaire panier multi-prestations ────────────────────── */}
            <div style={s.card}>
              <div style={s.cardTitle}>Nouvel encaissement</div>
              <form onSubmit={encaisserPanier}>

                {/* Nom cliente */}
                <div style={{ marginBottom: 16 }}>
                  <label style={s.label}>Nom cliente *</label>
                  <input
                    style={{ ...s.field, maxWidth: 320 }}
                    type="text" placeholder="Nom de la cliente..."
                    value={client} onChange={e => setClient(e.target.value)} required
                  />
                </div>

                {/* Ligne d'ajout de prestation */}
                <div style={{ background: C.bg, border: `1px solid ${C.pierreLight}`, borderRadius: 10, padding: '14px 16px', marginBottom: 14 }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.muted, marginBottom: 12 }}>
                    Ajouter une prestation
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10, alignItems: 'end' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label style={s.label}>Catégorie</label>
                      <select style={s.field} value={categorie} onChange={handleCategorieChange}>
                        <option value="">— Catégorie —</option>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label style={s.label}>Prestation</label>
                      <select style={s.field} value={prestation} onChange={handlePrestationChange} disabled={!categorie}>
                        <option value="">— Prestation —</option>
                        {prestationsDeCat.map(p => <option key={p.nom} value={p.nom}>{p.nom}</option>)}
                      </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label style={s.label}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>{Icon.lock} Remise</span></label>
                      <select
                        style={{ ...s.field, background: remise > 0 ? '#fffbf0' : C.white }}
                        value={remise} onChange={handleRemiseChange} disabled={prixBase === null}
                      >
                        {REMISES_OPTIONS.map(r => <option key={r} value={r}>{r === 0 ? 'Aucune' : `−${r}%`}</option>)}
                      </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label style={s.label}>Montant TTC{remise > 0 && prixBase !== null && <span style={{ ...s.remiseBadge, marginLeft: 6 }}>−{remise}%</span>}</label>
                      <input readOnly style={{ ...s.field, background: '#fafafa', fontWeight: 600 }}
                        value={montantFinal !== null ? `${montantFinal} €` : '—'} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label style={s.label}>Paiement</label>
                      <select style={s.field} value={paiement} onChange={e => setPaiement(e.target.value)}>
                        {MODES_PAIEMENT.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={ajouterAuPanier}
                        disabled={!prestation || montantFinal === null}
                        style={{ ...s.btnSec, height: 40, width: '100%', justifyContent: 'center', borderStyle: 'dashed', color: C.taupeBtn, borderColor: C.taupeBtn }}
                      >
                        {Icon.plus} Ajouter
                      </button>
                    </div>

                  </div>
                </div>

                {/* Panier — lignes ajoutées */}
                {panier.length > 0 && (
                  <div style={{ border: `1px solid ${C.pierreLight}`, borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}>
                    <table style={{ ...s.table, margin: 0 }}>
                      <thead>
                        <tr style={{ background: C.bg }}>
                          {['Prestation', 'Remise', 'Montant', 'Paiement', ''].map(h => (
                            <th key={h} style={h === 'Montant' ? { ...s.th, textAlign: 'right' } : s.th}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {panier.map((ligne, idx) => (
                          <tr key={idx}
                            style={{ background: idx % 2 === 0 ? C.white : C.bg }}
                          >
                            <td style={s.td}>
                              <div style={{ fontWeight: 500 }}>{ligne.prestation}</div>
                              <div style={{ fontSize: '0.72rem', color: C.muted }}>{ligne.categorie}</div>
                            </td>
                            <td style={s.td}>
                              {ligne.remise > 0
                                ? <span style={s.remiseBadge}>−{ligne.remise}%</span>
                                : <span style={{ color: C.pierreLight }}>—</span>}
                            </td>
                            <td style={{ ...s.td, textAlign: 'right', fontWeight: 700 }}>{fmt(ligne.montant)}</td>
                            <td style={s.td}><span style={s.badge(C.taupeBtn)}>{ligne.paiement}</span></td>
                            <td style={{ ...s.td, textAlign: 'center' }}>
                              <button type="button" onClick={() => retirerDuPanier(idx)}
                                style={s.btnDanger}
                                onMouseEnter={e => e.currentTarget.style.color = '#cc0000'}
                                onMouseLeave={e => e.currentTarget.style.color = C.pierreLight}
                              >{Icon.trash}</button>
                            </td>
                          </tr>
                        ))}
                        {/* Ligne total panier */}
                        <tr style={{ background: C.bg, borderTop: `1px solid ${C.pierreLight}` }}>
                          <td colSpan={2} style={{ ...s.td, fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.muted }}>
                            {panier.length} prestation{panier.length > 1 ? 's' : ''}
                          </td>
                          <td style={{ ...s.td, textAlign: 'right', fontWeight: 800, fontSize: '1rem', color: C.taupeTxt }}>
                            {fmt(totalPanier)}
                          </td>
                          <td colSpan={2} />
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Bouton encaisser */}
                {panier.length > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" style={{ ...s.btnPrim, padding: '0 28px', height: 42, fontSize: '0.88rem' }} disabled={submitting}>
                      {submitting ? 'Enregistrement…' : <>{Icon.plus}&nbsp;Encaisser {fmt(totalPanier)}</>}
                    </button>
                  </div>
                )}

              </form>
            </div>

            {/* ── Tableau des transactions ─────────────────────────────────── */}
            <div style={s.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div style={s.cardTitle} >Transactions — {labelFiltre}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => exporterCSV(lignes, filtreP, dateDebut, dateFin)}
                    style={{ ...s.btnSec, background: C.taupeBtn, color: '#fff', borderColor: C.taupeBtn }}
                  >
                    {Icon.download}<span>Exporter CSV</span>
                  </button>
                  <button
                    onClick={() => exporterPDF(lignes, filtreP, dateDebut, dateFin)}
                    style={{ ...s.btnSec, background: C.taupeTxt, color: '#fff', borderColor: C.taupeTxt }}
                  >
                    {Icon.download}<span>Exporter PDF</span>
                  </button>
                </div>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={s.table}>
                  <thead>
                    <tr>
                      {['Date', 'Heure', 'Cliente', 'Prestation', 'Paiement', 'Remise', 'Montant TTC', 'Action'].map(h => (
                        <th key={h} style={h === 'Montant TTC' ? { ...s.th, textAlign: 'right' } : s.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {lignesFiltrees.length === 0 && (
                      <tr><td colSpan={8} style={{ ...s.td, textAlign: 'center', color: '#aaa', fontStyle: 'italic', padding: '32px 0' }}>
                        Aucune ligne pour cette période
                      </td></tr>
                    )}
                    {lignesFiltrees.map(l => (
                      <tr key={l.id} style={{ transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <td style={s.td}>{fmtDate(l.date)}</td>
                        <td style={s.td}>{fmtHeure(l.date)}</td>
                        <td style={{ ...s.td, fontWeight: 600 }}>{l.client}</td>
                        <td style={s.td}>{l.prestation}</td>
                        <td style={s.td}>
                          <span style={s.badge(
                            l.paiement === 'CB' ? '#1a6b3a' :
                            l.paiement === 'Espèces' ? '#6b4a1a' :
                            l.paiement === 'Chèque' ? '#1a3a6b' : '#555'
                          )}>{l.paiement}</span>
                        </td>
                        <td style={s.td}>
                          {l.remise > 0
                            ? <span style={s.remiseBadge}>−{l.remise}%</span>
                            : <span style={{ color: '#ccc' }}>—</span>}
                        </td>
                        <td style={{ ...s.td, textAlign: 'right', fontWeight: 700 }}>{fmt(l.montant)}</td>
                        <td style={{ ...s.td, textAlign: 'center' }}>
                          <button
                            onClick={() => supprimerLigne(l.id)}
                            style={s.btnDanger}
                            onMouseEnter={e => e.currentTarget.style.color = '#cc0000'}
                            onMouseLeave={e => e.currentTarget.style.color = '#bbb'}
                          >
                            {Icon.lock}{Icon.trash}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            ONGLET RÉCAPITULATIF
        ════════════════════════════════════════════════════════════════════ */}
        {onglet === 'recap' && (
          <>
            {/* ── Cartes totaux ────────────────────────────────────────────── */}
            <div style={{ ...s.flex, marginBottom: 16 }}>
              <div style={s.statCard}>
                <div style={s.statVal}>{fmt(stats.total)}</div>
                <div style={s.statLab}>Total — {labelFiltre}</div>
              </div>
              <div style={{ ...s.statCard, background: '#6b6460' }}>
                <div style={s.statVal}>{lignesFiltrees.length}</div>
                <div style={s.statLab}>Encaissements</div>
              </div>
              <div style={{ ...s.statCard, background: '#57534e' }}>
                <div style={s.statVal}>
                  {lignesFiltrees.length > 0 ? fmt(stats.total / lignesFiltrees.length) : '—'}
                </div>
                <div style={s.statLab}>Panier moyen</div>
              </div>
            </div>

            {/* ── Ventilation par mode de paiement ────────────────────────── */}
            <div style={{ ...s.card, marginBottom: 16 }}>
              <div style={s.cardTitle}>Ventilation par mode de paiement</div>
              <div style={s.flex}>
                {MODES_PAIEMENT.map(m => (
                  <div key={m} style={s.modeCard}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{fmt(stats.parMode[m])}</div>
                    <div style={{ fontSize: '0.75rem', color: '#666', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{m}</div>
                    <div style={{ fontSize: '0.72rem', color: '#aaa', marginTop: 2 }}>
                      {stats.total > 0 ? Math.round(stats.parMode[m] / stats.total * 100) : 0}% du total
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Tableau récap ────────────────────────────────────────────── */}
            <div style={s.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div style={s.cardTitle}>Détail — {labelFiltre}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => exporterCSV(lignes, filtreP, dateDebut, dateFin)}
                    style={{ ...s.btnSec, background: C.taupeBtn, color: '#fff', borderColor: C.taupeBtn }}>
                    {Icon.download}<span>CSV</span>
                  </button>
                  <button onClick={() => exporterPDF(lignes, filtreP, dateDebut, dateFin)}
                    style={{ ...s.btnSec, background: C.taupeTxt, color: '#fff', borderColor: C.taupeTxt }}>
                    {Icon.download}<span>PDF</span>
                  </button>
                </div>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={s.table}>
                  <thead>
                    <tr>
                      {['Date', 'Heure', 'Cliente', 'Prestation', 'Paiement', 'Remise', 'Base', 'Montant TTC'].map(h => (
                        <th key={h} style={['Base', 'Montant TTC'].includes(h) ? { ...s.th, textAlign: 'right' } : s.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {lignesFiltrees.map(l => (
                      <tr key={l.id}>
                        <td style={s.td}>{fmtDate(l.date)}</td>
                        <td style={s.td}>{fmtHeure(l.date)}</td>
                        <td style={{ ...s.td, fontWeight: 600 }}>{l.client}</td>
                        <td style={s.td}>{l.prestation}</td>
                        <td style={s.td}><span style={s.badge('#555')}>{l.paiement}</span></td>
                        <td style={s.td}>{l.remise > 0 ? <span style={s.remiseBadge}>−{l.remise}%</span> : '—'}</td>
                        <td style={{ ...s.td, textAlign: 'right', color: '#999' }}>{fmt(l.prixBase ?? l.montant)}</td>
                        <td style={{ ...s.td, textAlign: 'right', fontWeight: 700 }}>{fmt(l.montant)}</td>
                      </tr>
                    ))}
                    {/* Ligne TOTAL */}
                    <tr style={{ background: '#f0f0f0' }}>
                      <td colSpan={7} style={{ ...s.td, textAlign: 'right', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        TOTAL
                      </td>
                      <td style={{ ...s.td, textAlign: 'right', fontWeight: 800, fontSize: '1rem' }}>
                        {fmt(stats.total)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            ONGLET GOOGLE CALENDAR
        ════════════════════════════════════════════════════════════════════ */}
        {onglet === 'calendar' && (
          <div style={s.card}>
            {/* En-tête */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#111', marginBottom: 4 }}>
                  {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#999' }}>
                  Rendez-vous synchronisés depuis Google Calendar via Zapier
                </div>
              </div>
              <button onClick={importerCalendar} style={s.btnPrim} disabled={calLoading}>
                {calLoading
                  ? <><span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>○</span> Chargement</>
                  : <>{Icon.refresh} Actualiser</>
                }
              </button>
            </div>

            <div style={s.divider} />

            {/* Message d'info */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: '#f9f9f9', border: '1px solid #ebebeb', borderRadius: 10, padding: '14px 16px', marginBottom: 16 }}>
              <span style={{ color: '#aaa', flexShrink: 0, marginTop: 1 }}>{Icon.info}</span>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#666', lineHeight: 1.5 }}>
                Zapier envoie automatiquement chaque RDV Google Calendar dans Firestore. Cliquez sur "Actualiser" pour charger les rendez-vous du jour. Pour que la prestation et le tarif se remplissent automatiquement, inscrivez le nom exact de la prestation dans la <strong>description</strong> du RDV sur Google Calendar.
              </p>
            </div>

            {/* Erreur */}
            {calErreur && (
              <div style={{ background: '#fff5f5', border: '1px solid #ffd7d7', borderRadius: 10, padding: '12px 16px', color: '#c00', marginBottom: 16, fontSize: '0.82rem' }}>
                {calErreur}
              </div>
            )}

            {/* État vide */}
            {rdvCalendar.length === 0 && !calLoading && !calErreur && (
              <div style={{ textAlign: 'center', padding: '48px 0', color: '#ccc' }}>
                <div style={{ marginBottom: 10, opacity: 0.4 }}>{Icon.calendar}</div>
                <div style={{ fontSize: '0.85rem' }}>Aucun rendez-vous chargé</div>
                <div style={{ fontSize: '0.78rem', color: '#ddd', marginTop: 4 }}>Cliquez sur "Actualiser" pour synchroniser</div>
              </div>
            )}

            {/* Liste des RDV */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {rdvCalendar.map(rdv => (
                <div key={rdv.id} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  border: '1px solid #ebebeb', borderRadius: 10, padding: '14px 18px',
                  background: '#fff', transition: 'border-color 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#ccc'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#ebebeb'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 36, height: 36, background: '#f5f5f7', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', flexShrink: 0 }}>
                      {Icon.calendar}
                    </div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: '0.9rem', color: '#111' }}>{rdv.titre}</div>
                      <div style={{ fontSize: '0.78rem', color: '#aaa', marginTop: 2 }}>
                        {rdv.heure}{rdv.description ? ` · ${rdv.description}` : ''}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => { utiliserRdv(rdv); setOnglet('caisse'); }}
                    style={s.btnGhost}
                  >
                    Encaisser {Icon.arrow}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
