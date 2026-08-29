import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Remet la page en haut à chaque changement d'URL.
 * Monté une seule fois dans App.jsx : évite d'arriver au milieu d'une page
 * quand on clique dans le menu depuis le bas de l'accueil.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
