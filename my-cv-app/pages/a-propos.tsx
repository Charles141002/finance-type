import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function APropos() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      <Header />

      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>
        <h1 style={{ fontSize: "36px", lineHeight: 1.2, margin: 0, color: "#0f172a" }}>À propos</h1>
        <p style={{ marginTop: "12px", color: "#334155", fontSize: "18px" }}>
          Nous sommes deux étudiants passionnés de finance et de tech. On s’est rendu compte que
          créer un CV type finance est souvent long, pénible et formaté. Alors on a construit
          un générateur de CV IA qui respecte les standards des grandes institutions,
          lisible par les ATS, et modifiable en quelques minutes.
        </p>

        <section style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {[
            {
              title: "Pourquoi ?",
              desc: "Parce qu’on a tous perdu des heures sur Word à re-aligner des puces et des marges."
            },
            {
              title: "Pour qui ?",
              desc: "Étudiants, jeunes diplômés et juniors visant banques, fonds et cabinets."
            },
            {
              title: "Comment ?",
              desc: "Une structure académique stricte, des sections claires, export PDF ATS-friendly."
            },
            {
              title: "Et l’IA ?",
              desc: "Elle te propose une base propre. Tu personnalises en 2 minutes."
            }
          ].map((item) => (
            <div key={item.title} style={{
              backgroundColor: "#f8fafc",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "16px"
            }}>
              <h3 style={{ margin: 0, color: "#0f172a" }}>{item.title}</h3>
              <p style={{ marginTop: "8px", color: "#475569" }}>{item.desc}</p>
            </div>
          ))}
        </section>

        <div style={{
          marginTop: "32px",
          padding: "16px",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "12px"
        }}>
          <h2 style={{ marginTop: 0, color: "#0f172a" }}>Notre promesse</h2>
          <ul style={{ color: "#1f2937", paddingLeft: "20px" }}>
            <li>Gratuit et sans friction</li>
            <li>Lisible par les ATS</li>
            <li>Export PDF en un clic</li>
            <li>Édition rapide et simple</li>
          </ul>
          <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
            <Link href="/cv" style={{
              padding: "12px 16px",
              backgroundColor: "#111827",
              color: "#fff",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: 600
            }}>Créer mon CV</Link>
            <Link href="/" style={{
              padding: "12px 16px",
              backgroundColor: "#ffffff",
              color: "#111827",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: 600
            }}>Voir la landing</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

