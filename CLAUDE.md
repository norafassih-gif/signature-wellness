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

## État au 29/08/2026

Site en ligne sur **https://www.signaturewellness.fr** — toute modification part en production via Vercel.

Audit complet du 27/08/2026 :
https://claude.ai/code/artifact/ffa51a42-09c0-4712-a2f4-c20da781451d

### Déjà corrigé (ne pas refaire)

- **Règles Firestore** : étaient `allow read, write: if true`. Remplacées le 29/08 par des règles
  par collection. `comptabilite` est réservé à l'UID `EQIW1yJpSvS7VSoRl8XxMqxGCs42`.
  `appointments` et `schedule_exceptions` restent en lecture publique (le tunnel de réservation
  en a besoin) mais update/delete sont réservés à l'admin.
- **Login.jsx** : création de compte publique supprimée, redirection vers `/admin`.
- **Comptabilite.jsx** : garde `onAuthStateChanged` + contrôle de l'UID, comme Admin.jsx.
- **Booking.jsx** : les dates passées ne sont plus réservables.
- **ScrollToTop** global monté dans App.jsx ; page 404 sur `path="*"`.
- **index.html** : titre, `lang="fr"`, favicon, description, Open Graph + og-image, canonical.
  `public/robots.txt` et `public/sitemap.xml` ajoutés.
- **Animations** : `animate-fade-in` / `animate-fade-in-up` définies dans index.css, pause du
  carrousel via `.carousel-track`, doublon `marquee` retiré de tailwind.config.js,
  `prefers-reduced-motion` respecté.

### Reste à traiter, par ordre de gravité

1. **Acompte non vérifié** — `PaymentButton` ouvre paypal.me puis un bouton « Confirmer » crée
   le RDV avec `paid: true`, payé ou non. Décision à prendre : supprimer l'acompte, ou Stripe Checkout.
2. **Email de confirmation** — EmailJS encore sur `YOUR_SERVICE_ID` : aucun mail ne part, alors que
   l'écran de fin l'annonce à la cliente.
3. **Fuite de données via les disponibilités** — `Booking.jsx` lit les documents complets de
   `appointments` pour calculer les créneaux libres, donc nom, téléphone et email des clientes sont
   lisibles publiquement. Correctif : une collection de créneaux sans données personnelles.
   Tant que ce n'est pas fait, la règle Firestore ne peut pas être resserrée.
4. **Pas de transaction anti-double-réservation** — deux clientes peuvent prendre la dernière place.
5. **Admin.jsx** ne vérifie que « connecté », pas l'UID. Risque faible depuis la suppression de
   l'inscription publique, mais à aligner sur Comptabilite.jsx.
6. **Tarifs incohérents** — 7 écarts entre les pages publiques et la grille de `Comptabilite.jsx`
   (ex. Soin Signature 200 €/60 min sur le site vs 149 €/30 min en caisse). Une seule source de vérité à créer.
7. **Page `/co2-fractionne`** ne propose pas de CO2 fractionné (carte = HIFU, Carboxy, Plasma).
8. **Soin visage nommé de 3 façons** : Hydraface / Soin Hydro-Expert / Soin Signature Hydraface.
9. **3 adresses email** différentes (academy / paris / agenda).
10. **9,5 Mo d'images** non optimisées, dont 12 inutilisées ; aucun `loading="lazy"`.

### Fichiers modifiés jamais envoyés

`PaymentButton.jsx`, `BodyContouring.jsx`, `Co2Fractionne.jsx`, `Microneedling.jsx`,
`MiracleSculpt.jsx` — modifications d'avril 2026 (tarifs corps + remplacement du module PayPal
par un lien paypal.me). Volontairement laissés de côté : à valider avec Nora avant mise en ligne.

## Qualiopi

Les 11 fiches formation ont la structure attendue (publics, prérequis, durée, modalités,
délai d'accès, tarifs, accessibilité, objectifs, programme, méthodes, évaluation).
Manquent : numéro de déclaration d'activité, mention + logo Qualiopi, indicateurs de
résultats (indicateur 2), référent handicap, CGV / règlement intérieur, procédure de
réclamation.
