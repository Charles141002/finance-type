import Link from "next/link";
import { ReactNode } from "react";

type HeaderProps = {
  rightActions?: ReactNode;
  variant?: "default" | "landing";
};

export default function Header({ rightActions, variant = "default" }: HeaderProps) {
  return (
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
        position: "sticky",
        top: 0,
        zIndex: 30,
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
  );
}

