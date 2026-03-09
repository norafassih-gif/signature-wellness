/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'clinic-gold': '#C5A059',   // Un doré élégant pour les détails
        'clinic-black': '#1A1A1A',  // Un noir doux pour le texte
        'clinic-gray': '#F9F9F9',   // Un fond gris très pâle "propre"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Police moderne et lisible
      },
      // --- AJOUT DES ANIMATIONS ICI ---
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 3s infinite',
        'carousel': 'carousel 30s linear infinite',
      },
      // --- AJOUT DES ÉTAPES D'ANIMATION (KEYFRAMES) ICI ---
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        carousel: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}