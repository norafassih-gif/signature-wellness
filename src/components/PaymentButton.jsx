import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PaymentButton({ amount, onSuccess }) {
  return (
    <div className="w-full max-w-xs mx-auto z-0">
      <PayPalScriptProvider 
        options={{ 
          // REMPLACER "test" par l'ID Client récupéré sur developer.paypal.com
          // avec le compte signature.wellnessacademy@gmail.com
          "client-id": "test", 
          currency: "EUR",
          "disable-funding": "card" // Désactive le bouton Carte Bancaire gris
        }}
      >
        <PayPalButtons
          style={{ 
            layout: "vertical", 
            color: "blue", 
            shape: "rect", 
            label: "pay" 
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: { value: amount },
                  description: "Acompte Signature Wellness"
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              // Une fois payé, on valide la réservation
              if (onSuccess) onSuccess(); 
            });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}