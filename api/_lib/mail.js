import nodemailer from 'nodemailer';
import { CATEGORIES, dateLisible } from './regles.js';

// Envoi via le Gmail de l'institut. GMAIL_APP_PASSWORD = "mot de passe d'application"
// (Compte Google > Securite > Validation en deux etapes > Mots de passe des applications).
const EXPEDITEUR = process.env.GMAIL_USER || 'signature.wellnessagenda@gmail.com';
const ADRESSE = "18 rue d'Armenonville, 92200 Neuilly-sur-Seine";

export const mailConfigure = () => Boolean(process.env.GMAIL_APP_PASSWORD);

function transport() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: EXPEDITEUR, pass: process.env.GMAIL_APP_PASSWORD.replace(/\s/g, '') },
  });
}

const echapper = (t = '') => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function gabarit(titre, lignes) {
  return `<!doctype html><html lang="fr"><body style="margin:0;background:#fafaf9;font-family:Helvetica,Arial,sans-serif;color:#57534e">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fafaf9;padding:32px 16px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border:1px solid #e7e5e4">
<tr><td style="padding:32px 32px 8px;text-align:center;letter-spacing:4px;font-size:13px;color:#78716c;text-transform:uppercase">Signature Wellness</td></tr>
<tr><td style="padding:8px 32px 24px;text-align:center;font-size:22px;color:#292524;letter-spacing:1px">${titre}</td></tr>
<tr><td style="padding:0 32px 32px;font-size:15px;line-height:1.6">${lignes}</td></tr>
</table></td></tr></table></body></html>`;
}

const ligne = (libelle, valeur) =>
  `<p style="margin:0 0 14px"><span style="display:block;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#a8a29e">${libelle}</span>${valeur}</p>`;

export async function envoyerMailsConfirmation(rdv) {
  if (!mailConfigure()) {
    console.warn('GMAIL_APP_PASSWORD absent : email de confirmation non envoye');
    return false;
  }
  const { client } = rdv;
  const quand = `${dateLisible(rdv.date)} à ${rdv.time}`;
  const soin = CATEGORIES[rdv.category] || rdv.category;
  const t = transport();

  await t.sendMail({
    from: `"Signature Wellness" <${EXPEDITEUR}>`,
    to: client.email,
    replyTo: EXPEDITEUR,
    subject: `Votre rendez-vous du ${quand} est confirmé`,
    text: [
      `Bonjour ${client.prenom},`,
      '',
      `Votre rendez-vous chez Signature Wellness est confirmé : ${quand} (${soin}).`,
      `Adresse : ${ADRESSE}`,
      "Acompte réglé : 50 €, non remboursable.",
      '',
      'Pour toute question, répondez simplement à cet email.',
      'À très bientôt,',
      'Signature Wellness',
    ].join('\n'),
    html: gabarit('Rendez-vous confirmé',
      `<p style="margin:0 0 20px">Bonjour ${echapper(client.prenom)},<br>merci pour votre réservation. Nous avons hâte de vous accueillir.</p>` +
      ligne('Date et heure', `<strong style="color:#292524">${echapper(quand)}</strong>`) +
      ligne('Soin', echapper(soin)) +
      ligne('Adresse', ADRESSE) +
      ligne('Acompte', '50 € réglés par carte, non remboursable') +
      `<p style="margin:24px 0 0;font-size:13px;color:#78716c">Pour toute question, répondez simplement à cet email.</p>`),
  });

  // Copie pour l'institut
  await t.sendMail({
    from: `"Site Signature Wellness" <${EXPEDITEUR}>`,
    to: EXPEDITEUR,
    replyTo: client.email,
    subject: `Nouvelle réservation : ${client.prenom} ${client.nom}, ${quand}`,
    text: [
      `Nouvelle réservation payée sur le site.`,
      '',
      `Quand : ${quand}`,
      `Soin : ${soin}`,
      `Cliente : ${client.prenom} ${client.nom}`,
      `Téléphone : ${client.tel}`,
      `Email : ${client.email}`,
      'Acompte : 50 € (Stripe)',
    ].join('\n'),
  });
  return true;
}
