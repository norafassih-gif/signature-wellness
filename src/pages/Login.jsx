import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false); // Par défaut on est sur "Connexion"
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isSignUp) {
        // C'est ici qu'on crée le compte
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // C'est ici qu'on se connecte
        await signInWithEmailAndPassword(auth, email, password);
      }
      // Une fois réussi, on va voir les prix !
      navigate('/soins-visage'); 
    } catch (err) {
      console.error(err);
      setError(isSignUp 
        ? "Erreur : Le mot de passe doit faire 6 caractères minimum." 
        : "Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-10 shadow-xl border-t-4 border-yellow-600">
        <div className="text-center">
          <h2 className="text-3xl font-light uppercase tracking-widest text-gray-900">
            {isSignUp ? "Créer un Compte" : "Espace Privé"}
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            {isSignUp ? "Rejoignez-nous pour accéder aux tarifs" : "Connectez-vous pour voir les tarifs"}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="email"
              required
              className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-600 focus:border-yellow-600 sm:text-sm"
              placeholder="Adresse Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-600 focus:border-yellow-600 sm:text-sm"
              placeholder="Mot de passe (6 car. min)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-xs italic text-center">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none uppercase tracking-widest transition-colors duration-300"
          >
            {isSignUp ? "S'inscrire" : "Voir les tarifs"}
          </button>
        </form>

        {/* C'est ce bouton qui manquait sur ta capture ! */}
        <div className="text-center mt-4">
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-gray-500 hover:text-yellow-600 underline cursor-pointer"
          >
            {isSignUp ? "J'ai déjà un compte" : "Pas de compte ? S'inscrire"}
          </button>
        </div>
      </div>
    </div>
  );
}