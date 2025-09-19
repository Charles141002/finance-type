import Link from "next/link";

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      {/* Header */}
      <header style={{
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontWeight: 700, color: "#111827" }}>Finance CV AI</span>
          <nav style={{ display: "flex", gap: "12px" }}>
            <Link href="/cv" style={{ color: "#374151", textDecoration: "none" }}>Générer mon CV</Link>
            <Link href="/a-propos" style={{ color: "#374151", textDecoration: "none" }}>À propos</Link>
          </nav>
        </div>
        <Link href="/cv" style={{
          padding: "8px 12px",
          backgroundColor: "#111827",
          color: "#fff",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: 600
        }}>Commencer</Link>
      </header>

      {/* Hero */}
      <section style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "64px 20px 24px 20px",
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        gap: "32px"
      }}>
        <div>
          <h1 style={{ fontSize: "44px", lineHeight: 1.2, margin: 0, color: "#0f172a" }}>
            Générateur de CV IA pour étudiants en finance
          </h1>
          <p style={{ marginTop: "16px", color: "#334155", fontSize: "18px" }}>
            Crée un CV pro en quelques minutes, optimisé ATS pour banques, fonds et cabinets.
            Gratuit, téléchargeable en PDF et modifiable très facilement.
          </p>
          <ul style={{ marginTop: "16px", color: "#1f2937", fontSize: "16px", paddingLeft: "20px" }}>
            <li>Modèle académique, élégant et lisible par les ATS</li>
            <li>IA qui propose la structure, toi tu ajustes</li>
            <li>Export PDF en un clic</li>
          </ul>
          <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
            <Link href="/cv" style={{
              padding: "12px 16px",
              backgroundColor: "#0ea5e9",
              color: "#fff",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: 600
            }}>Générer mon CV maintenant</Link>
            <Link href="/a-propos" style={{
              padding: "12px 16px",
              backgroundColor: "#ffffff",
              color: "#111827",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: 600
            }}>Voir l’histoire</Link>
          </div>
          <p style={{ marginTop: "12px", color: "#64748b", fontSize: "14px" }}>
            Créé par deux étudiants: faire un CV finance, c’est pénible. On l’a rendu simple.
          </p>
        </div>
        <div>
          <div style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "16px",
            boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)"
          }}>
            <div style={{
              height: "420px",
              borderRadius: "8px",
              background: "linear-gradient(180deg,#f8fafc,#ffffff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#334155"
            }}>
              Aperçu du modèle académique (CV lisible ATS)
            </div>
          </div>
        </div>
      </section>

      {/* Section bénéfices */}
      <section style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "24px 20px 64px 20px",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px"
      }}>
        {[
          {
            title: "ATS friendly",
            desc: "Structure stricte, hiérarchie claire, mots-clés finance."
          },
          {
            title: "Rapide",
            desc: "De zéro à PDF en quelques minutes."
          },
          {
            title: "Gratuit",
            desc: "Sans inscription, export immédiat."
          }
        ].map((c) => (
          <div key={c.title} style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "16px",
            boxShadow: "0 4px 16px rgba(15, 23, 42, 0.06)"
          }}>
            <h3 style={{ margin: 0, color: "#0f172a" }}>{c.title}</h3>
            <p style={{ marginTop: "8px", color: "#475569" }}>{c.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid #e5e7eb",
        backgroundColor: "#ffffff",
        padding: "16px 20px",
        color: "#64748b"
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
          <span>© {new Date().getFullYear()} Finance CV AI</span>
          <div style={{ display: "flex", gap: "12px" }}>
            <Link href="/a-propos" style={{ color: "#64748b", textDecoration: "none" }}>À propos</Link>
            <Link href="/cv" style={{ color: "#64748b", textDecoration: "none" }}>Générateur</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
