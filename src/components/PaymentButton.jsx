import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PaymentButton({ amount, onSuccess }) {
  return (
    <div className="w-full max-w-xs mx-auto z-0">
      <PayPalScriptProvider options={{ "client-id": "test", currency: "EUR" }}>
        <PayPalButtons
          style={{ layout: "vertical", color: "blue", shape: "rect", label: "pay" }}
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
              // C'est ici qu'on dit à la page Booking : "C'est bon !"
              if (onSuccess) onSuccess(); 
            });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}