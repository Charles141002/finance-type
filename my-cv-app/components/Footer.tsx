import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "rgba(2, 6, 23, 0.95)",
        padding: "64px 0 32px 0",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        {/* Contenu principal du footer */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "48px",
          marginBottom: "48px"
        }}>
          {/* Section principale */}
          <div>
            <h3 style={{
              color: "#ffffff",
              fontSize: "24px",
              fontWeight: 800,
              margin: "0 0 16px 0",
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
            }}>
              Finance CV
            </h3>
            <p style={{
              color: "#e2e8f0",
              fontSize: "16px",
              lineHeight: 1.6,
              margin: "0 0 24px 0",
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
            }}>
              Générateur automatique de CV type finance avec IA. Créez votre CV professionnel optimisé pour les ATS des plus grandes banques et fonds d'investissement.
            </p>
            <Link href="/cv" style={{
              padding: "12px 24px",
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              color: "#ffffff",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "16px",
              display: "inline-block",
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
            }}>
              Créer mon CV
            </Link>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 style={{
              color: "#ffffff",
              fontSize: "18px",
              fontWeight: 700,
              margin: "0 0 16px 0",
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
            }}>
              Liens rapides
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Link href="/cv" style={{ 
                color: "#e2e8f0", 
                textDecoration: "none",
                fontSize: "16px",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
              }}>
                Générateur CV
              </Link>
              <Link href="/a-propos" style={{ 
                color: "#e2e8f0", 
                textDecoration: "none",
                fontSize: "16px",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
              }}>
                À propos
              </Link>
            </div>
          </div>

          {/* Fonctionnalités */}
          <div>
            <h4 style={{
              color: "#ffffff",
              fontSize: "18px",
              fontWeight: 700,
              margin: "0 0 16px 0",
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
            }}>
              Fonctionnalités
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <span style={{ 
                color: "#e2e8f0", 
                fontSize: "16px",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
              }}>
                IA intégrée
              </span>
              <span style={{ 
                color: "#e2e8f0", 
                fontSize: "16px",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
              }}>
                Optimisé ATS
              </span>
              <span style={{ 
                color: "#e2e8f0", 
                fontSize: "16px",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
              }}>
                Export PDF
              </span>
            </div>
          </div>

          {/* Secteurs */}
          <div>
            <h4 style={{
              color: "#ffffff",
              fontSize: "18px",
              fontWeight: 700,
              margin: "0 0 16px 0",
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
            }}>
              Secteurs
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <span style={{ 
                color: "#e2e8f0", 
                fontSize: "16px",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
              }}>
                M&A
              </span>
              <span style={{ 
                color: "#e2e8f0", 
                fontSize: "16px",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
              }}>
                Marchés
              </span>
              <span style={{ 
                color: "#e2e8f0", 
                fontSize: "16px",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
              }}>
                Asset Management
              </span>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px"
        }}>
          <span style={{
            color: "#94a3b8",
            fontSize: "14px",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
          }}>
            © {new Date().getFullYear()} Finance CV. Tous droits réservés.
          </span>
          <div style={{ display: "flex", gap: "24px" }}>
            <span style={{
              color: "#94a3b8",
              fontSize: "14px",
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
            }}>
              Gratuit
            </span>
            <span style={{
              color: "#94a3b8",
              fontSize: "14px",
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
            }}>
              Sans inscription
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

