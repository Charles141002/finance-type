import Link from "next/link";
import { ReactNode, useState, useEffect, useRef } from "react";

type DynamicHeaderProps = {
  rightActions?: ReactNode;
  variant?: "default" | "landing";
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
};

export default function DynamicHeader({ rightActions, variant = "default", scrollContainerRef }: DynamicHeaderProps) {
  const [isVisible, setIsVisible] = useState(true); // Visible par défaut au chargement
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Délai d'initialisation pour laisser le header visible au chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 2000); // 2 secondes de délai

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Ne pas appliquer la logique de scroll tant que l'initialisation n'est pas terminée
      if (!isInitialized) return;

      // Utiliser le conteneur de scroll si fourni, sinon la fenêtre
      const scrollElement = scrollContainerRef?.current || window;
      const currentScrollY = scrollElement === window ? window.scrollY : scrollElement.scrollTop;
      
      // Afficher le header si on remonte (scroll vers le haut) ou si on est en haut
      const newVisibility = currentScrollY < lastScrollY || currentScrollY <= 10;
      if (newVisibility !== isVisible) {
        setIsVisible(newVisibility);
      }
      
      setLastScrollY(currentScrollY);
    };

    const scrollElement = scrollContainerRef?.current || window;
    scrollElement.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, scrollContainerRef, isInitialized, isVisible]);

  return (
    <div
      style={{
        height: isVisible ? "120px" : "0px",
        overflow: "hidden",
        transition: "height 0.3s ease-in-out",
        position: "relative",
        zIndex: 30,
      }}
    >
      <header
        style={{
          height: "120px",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(180deg, rgba(2, 6, 23, 0.95), rgba(2, 6, 23, 0.9))",
          backdropFilter: "saturate(140%) blur(8px)",
          WebkitBackdropFilter: "saturate(140%) blur(8px)",
          borderBottom: "2px solid rgba(255,255,255,0.15)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          position: "relative",
          width: "100%",
        }}
      >
      <div
        style={{
          width: "100%",
          maxWidth: "2000px",
          margin: "0 auto",
          padding: "0 24px 0 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "20px",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center"
            }}
          >
            <img
              src="/Logo.png"
              alt="FinanceCV Smart Resume Builder"
              style={{
                height: "250px",
                width: "auto",
                objectFit: "contain"
              }}
            />
          </Link>
        </div>

        {/* Actions droite */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px", marginLeft: "auto" }}>
          {rightActions ?? (
            <>
              <Link
                href="/cv"
                style={{
                  textDecoration: "none",
                  color: "#e2e8f0",
                  fontWeight: 600,
                  fontSize: "15px",
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  transition: "all 0.2s ease"
                }}
              >
                Générateur CV
              </Link>
              <Link
                href="/a-propos"
                style={{
                  textDecoration: "none",
                  color: "#e2e8f0",
                  fontWeight: 600,
                  fontSize: "15px",
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  transition: "all 0.2s ease"
                }}
              >
                À propos
              </Link>
              <Link
                href="/cv"
                style={{
                  textDecoration: "none",
                  background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                  color: "#ffffff",
                  padding: "14px 24px",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "16px",
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  boxShadow: "0 8px 24px rgba(59, 130, 246, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)",
                  border: "2px solid rgba(255, 255, 255, 0.1)",
                  transition: "all 0.2s ease"
                }}
              >
                Commencer
              </Link>
              <Link
                href="/login"
                style={{
                  textDecoration: "none",
                  color: "#e2e8f0",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  padding: "12px 20px",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "15px",
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  transition: "all 0.2s ease",
                  backdropFilter: "blur(10px)"
                }}
              >
                Se connecter
              </Link>
            </>
          )}
        </div>
      </div>
      </header>
    </div>
  );
}