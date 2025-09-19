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
        height: "72px",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(180deg, rgba(2, 6, 23, 0.95), rgba(2, 6, 23, 0.9))",
        backdropFilter: "saturate(140%) blur(8px)",
        WebkitBackdropFilter: "saturate(140%) blur(8px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 30,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link
            href="/"
            style={{
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              fontSize: "20px",
            }}
          >
            Finance CV AI
          </Link>
          <nav style={{ display: "flex", gap: "8px" }}>
            <Link
              href="/cv"
              style={{
                textDecoration: "none",
                color: "#e2e8f0",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "10px 14px",
                borderRadius: "999px",
                fontWeight: 600,
              }}
            >
              Générateur
            </Link>
            <Link
              href="/a-propos"
              style={{
                textDecoration: "none",
                color: "#e2e8f0",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "10px 14px",
                borderRadius: "999px",
                fontWeight: 600,
              }}
            >
              À propos
            </Link>
          </nav>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {rightActions ?? (
            <Link
              href="/cv"
              style={{
                textDecoration: "none",
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                color: "#ffffff",
                padding: "14px 20px",
                borderRadius: "12px",
                fontWeight: 700,
                boxShadow: "0 8px 24px rgba(59, 130, 246, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)",
                border: "2px solid rgba(255, 255, 255, 0.1)",
                fontSize: "16px",
              }}
            >
              Commencer
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

