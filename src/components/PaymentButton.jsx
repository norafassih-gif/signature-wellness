import { useState } from "react";

export default function PaymentButton({ amount, onSuccess }) {
  const [clicked, setClicked] = useState(false);

  const handlePaypalClick = () => {
    window.open(`https://paypal.me/SignatureWellness/${amount}EUR`, '_blank');
    setClicked(true);
  };

  return (
    <div className="w-full max-w-xs mx-auto space-y-4">
      <button
        onClick={handlePaypalClick}
        className="w-full bg-[#0070ba] hover:bg-[#003087] text-white py-4 rounded-xl font-bold uppercase text-[10px] tracking-[0.2em] transition-colors flex items-center justify-center gap-3"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 4.643-5.813 4.643h-2.19c-.524 0-.968.382-1.05.9L10.6 19.337h2.168c.458 0 .847-.334.918-.787l.038-.197.728-4.617.047-.254a.932.932 0 0 1 .918-.787h.578c3.741 0 6.671-1.52 7.527-5.917.358-1.845.173-3.385-.9-4.062z"/>
        </svg>
        Payer l'acompte — {amount}€
      </button>

      {clicked && (
        <div className="animate-fade-in">
          <p className="text-[10px] text-stone-400 uppercase tracking-widest text-center mb-3">
            Une fois le paiement effectué sur PayPal
          </p>
          <button
            onClick={onSuccess}
            className="w-full bg-stone-800 hover:bg-stone-700 text-white py-4 rounded-xl font-bold uppercase text-[10px] tracking-[0.2em] transition-colors"
          >
            Confirmer ma réservation
          </button>
        </div>
      )}
    </div>
  );
}
