import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(226,232,240,0.8)",
        background: "linear-gradient(180deg, rgba(248,250,252,0.9), rgba(255,255,255,0.95))",
        backdropFilter: "saturate(140%) blur(6px)",
        WebkitBackdropFilter: "saturate(140%) blur(6px)",
        padding: "16px 0",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#64748b",
        }}
      >
        <span>© {new Date().getFullYear()} Finance CV AI</span>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link href="/a-propos" style={{ color: "#64748b", textDecoration: "none" }}>À propos</Link>
          <Link href="/cv" style={{ color: "#64748b", textDecoration: "none" }}>Générateur</Link>
        </div>
      </div>
    </footer>
  );
}

