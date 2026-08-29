# Signature Wellness — contexte du projet

> Ce fichier est lu automatiquement par Claude Code (VS Code, terminal) au démarrage,
> quel que soit le compte utilisé. Le tenir à jour = ne plus jamais réexpliquer le projet.

## Le projet

Site vitrine + applicatif de **Signature Wellness**, institut de dermo-esthétique à
Neuilly-sur-Seine (18 rue d'Armenonville, 92200).
SASU — RCS Nanterre 904 773 751 — présidente Mme Cehem Bouloudani.
Réalisé par **Little Créatrice** (Nora). Dépôt : `norafassih-gif/signature-wellness`. Déploiement Vercel.

## Stack

React 19 · Vite 7 · Tailwind 3 · React Router 7 · Firebase 12 (Auth + Firestore)
EmailJS · jsPDF + jspdf-autotable · react-helmet-async

```
npm run dev      # serveur local
npm run build    # build de production
npm run lint     # eslint
```

## Architecture

`src/App.jsx` déclare les 24 routes. Pas de dossier `api/`, pas de backend : tout passe
par Firestore depuis le navigateur.

| Module | Route(s) | Rôle |
|---|---|---|
| Vitrine | `/`, 7 prestations, 11 `/formation/*`, `/mentions-legales` | Pages publiques |
| Réservation | `/reservation` | Tunnel 3 étapes + acompte 50 € |
| Back-office | `/login`, `/admin` | Agenda, blocages, synchro Google Calendar |
| Caisse | `/comptabilite` | 63 prestations, panier, exports CSV/PDF |

`/login`, `/admin` et `/comptabilite` ne sont liés depuis aucun menu (routes « cachées »).

Collections Firestore : `appointments`, `schedule_exceptions`, `comptabilite`.

## Conventions

- Charte : taupe `#78716c`, texte `#57534e`, bordures `#e7e5e4`, fond `#fafaf9`.
- Titres en `Tenor Sans` via `style={{ fontFamily: "'Tenor Sans', sans-serif" }}`.
- Angles droits sur la vitrine, arrondis sur les modules applicatifs (réservation, admin).
- Tout est en français, y compris les noms de variables des modules récents.

## ⚠️ À traiter avant toute évolution

Audit complet du 27/08/2026 :
https://claude.ai/code/artifact/ffa51a42-09c0-4712-a2f4-c20da781451d

**Bloquants**

1. `/login` propose une inscription publique et `/admin` ne vérifie que « connecté ».
   → n'importe qui accède aux coordonnées de toutes les clientes.
2. `/comptabilite` n'a **aucune** garde d'authentification. `ADMIN_CODE = "SW2026&"`
   est en clair dans le bundle et ne protège que remises et suppressions.
3. Aucune règle Firestore versionnée — à vérifier en priorité dans la console Firebase.
4. L'acompte n'est pas vérifié : `PaymentButton` ouvre paypal.me puis un bouton
   « Confirmer » crée le RDV avec `paid: true`, payé ou non.
5. EmailJS est encore sur `YOUR_SERVICE_ID` → aucun mail de confirmation ne part,
   alors que l'écran de fin l'annonce à la cliente.
6. Réservation possible dans le passé ; pas de transaction anti-double-réservation.

**Incohérences**

- 7 écarts de tarifs entre les pages publiques et la grille de `Comptabilite.jsx`
  (ex. Soin Signature 200 €/60 min sur le site vs 149 €/30 min en caisse).
- `/co2-fractionne` ne propose pas de CO2 fractionné (carte = HIFU, Carboxy, Plasma).
- Le soin visage porte 3 noms : Hydraface / Soin Hydro-Expert / Soin Signature Hydraface.
- 3 adresses email différentes (academy / paris / agenda).
- Pas de `ScrollToTop` global : 5 pages s'ouvrent au milieu.
- 9,5 Mo d'images, dont 12 inutilisées ; classes `animate-fade-in(-up)` jamais définies ;
  police Inter déclarée dans Tailwind mais jamais chargée.

**État du dépôt au 27/08/2026** — dernier commit `febd29b` (19/04/2026), et 5 fichiers
modifiés non commités : `PaymentButton.jsx`, `BodyContouring.jsx`, `Co2Fractionne.jsx`,
`Microneedling.jsx`, `MiracleSculpt.jsx`. **Le site en ligne diffère du local.**
Trancher cette question avant toute autre modification.

## Qualiopi

Les 11 fiches formation ont la structure attendue (publics, prérequis, durée, modalités,
délai d'accès, tarifs, accessibilité, objectifs, programme, méthodes, évaluation).
Manquent : numéro de déclaration d'activité, mention + logo Qualiopi, indicateurs de
résultats (indicateur 2), référent handicap, CGV / règlement intérieur, procédure de
réclamation.
