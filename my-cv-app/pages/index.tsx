import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Header variant="landing" />

      {/* Hero avec image de fond floutée + voile bleu foncé */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        {/* Calque image de fond */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/Singapore-financial-hub-1024x585.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(3px)",
          transform: "scale(1.02)",
          zIndex: 0
        }} />
        {/* Voile bleu foncé */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(2, 6, 23, 0.55), rgba(2, 6, 23, 0.48))",
          zIndex: 1
        }} />

          <div style={{ 
          position: "relative",
          zIndex: 2,
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "56px 20px 24px 20px",
          display: "grid",
          gridTemplateColumns: "1.3fr 0.7fr",
          gap: "32px"
        }}>
        <div>
          <h1 style={{ 
            fontSize: "56px", 
            lineHeight: 1.1, 
            margin: 0, 
            color: "#ffffff",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 800,
            letterSpacing: "-0.02em"
          }}>
            Générateur automatique de CV avec IA
          </h1>
          <ul style={{ 
            marginTop: "24px", 
            color: "#e2e8f0", 
            fontSize: "20px",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 500,
            lineHeight: 1.6,
            paddingLeft: "24px"
          }}>
            <li>CV finance professionnel généré automatiquement</li>
            <li>Format 1 page, optimisé ATS pour banques et fonds</li>
            <li>Gratuit et téléchargeable en PDF instantanément</li>
          </ul>
          <div style={{ display: "flex", gap: "16px", marginTop: "28px", flexWrap: "wrap" }}>
            <Link href="/cv" style={{
              padding: "18px 32px",
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              color: "#ffffff",
              borderRadius: "16px",
              textDecoration: "none",
              fontWeight: 800,
              fontSize: "18px",
              boxShadow: "0 12px 32px rgba(59, 130, 246, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)",
              border: "2px solid rgba(255, 255, 255, 0.1)",
              transition: "all 0.2s ease",
              display: "inline-block",
              textAlign: "center",
              minWidth: "200px"
            }}>Créer mon CV</Link>
            <Link href="/a-propos" style={{
              padding: "18px 32px",
              backgroundColor: "rgba(255,255,255,0.15)",
              color: "#ffffff",
              border: "2px solid rgba(255,255,255,0.3)",
              borderRadius: "16px",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "18px",
              backdropFilter: "blur(10px)",
              transition: "all 0.2s ease",
              display: "inline-block",
              textAlign: "center",
              minWidth: "200px"
            }}>À propos</Link>
          </div>
        </div>
        <div>
            <img
              src="/CV_John_Doe.png"
              alt="Exemple de CV finance lisible ATS"
              style={{
                maxWidth: "100%",
                maxHeight: "500px",
                width: "auto",
                height: "auto",
                display: "block",
                borderRadius: "8px",
                objectFit: "contain"
              }}
            onError={(e:any)=>{ e.currentTarget.style.display='none'; const parent=e.currentTarget.parentElement; if(parent){ parent.style.display='flex'; parent.style.alignItems='center'; parent.style.justifyContent='center'; parent.style.color='#334155'; parent.style.height='420px'; parent.textContent='Dépose l\'image cv-example.png dans /public pour afficher un aperçu.'; } }}
          />
        </div>
        </div>
      </section>

      {/* Bandeau logos banques - carousel */}
      <section style={{
        backgroundColor: "rgba(2, 6, 23, 0.95)",
        padding: "48px 0",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        overflow: "hidden"
      }}>
        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 20px",
          textAlign: "center"
        }}>
          <p style={{
            color: "#e2e8f0",
            fontSize: "18px",
            fontWeight: 600,
            margin: "0 0 32px 0",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
          }}>
            Nos étudiants ont été recrutés par :
          </p>
          
          {/* Carousel container */}
          <div style={{
            position: "relative",
            width: "100%",
            overflow: "hidden"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "80px",
              animation: "scroll 25s linear infinite",
              width: "max-content"
            }}>
              {/* Première série de logos */}
              <img 
                src="/BNP-Paribas-Emblem.png" 
                alt="BNP Paribas" 
                style={{ 
                  height: "60px", 
                  width: "auto",
                  objectFit: "contain",
                  flexShrink: 0
                }} 
              />
              <img 
                src="/JP-Morgan-Chase-Emblem.png" 
                alt="JP Morgan Chase" 
                style={{ 
                  height: "60px", 
                  width: "auto",
                  objectFit: "contain",
                  flexShrink: 0
                }} 
              />
              <img 
                src="/HSBC-Logo.png" 
                alt="HSBC" 
                style={{ 
                  height: "60px", 
                  width: "auto",
                  objectFit: "contain",
                  flexShrink: 0
                }} 
              />
              <img 
                src="/Citi-Logo.jpg" 
                alt="Citi" 
                style={{ 
                  height: "60px", 
                  width: "auto",
                  objectFit: "contain",
                  flexShrink: 0
                }} 
              />
              <img 
                src="/Symbole-Goldman-Sachs.jpg" 
                alt="Goldman Sachs" 
                style={{ 
                  height: "60px", 
                  width: "auto",
                  objectFit: "contain",
                  flexShrink: 0
                }} 
              />
              
              {/* Duplication complète pour l'effet de boucle sans trou */}
              <img 
                src="/BNP-Paribas-Emblem.png" 
                alt="BNP Paribas" 
                style={{ 
                  height: "60px", 
                  width: "auto",
                  objectFit: "contain",
                  flexShrink: 0
                }} 
              />
              <img 
                src="/JP-Morgan-Chase-Emblem.png" 
                alt="JP Morgan Chase" 
                style={{ 
                  height: "60px", 
                  width: "auto",
                  objectFit: "contain",
                  flexShrink: 0
                }} 
              />
              <img 
                src="/HSBC-Logo.png" 
                alt="HSBC" 
                style={{ 
                  height: "60px", 
                  width: "auto",
                  objectFit: "contain",
                  flexShrink: 0
                }} 
              />
              <img 
                src="/Citi-Logo.jpg" 
                alt="Citi" 
                style={{ 
                  height: "60px", 
                  width: "auto",
                  objectFit: "contain",
                  flexShrink: 0
                }} 
              />
              <img 
                src="/Symbole-Goldman-Sachs.jpg" 
                alt="Goldman Sachs" 
                style={{ 
                  height: "60px", 
                  width: "auto",
                  objectFit: "contain",
                  flexShrink: 0
                }} 
              />
            </div>
          </div>
        </div>
        
        {/* CSS pour l'animation infinie */}
        <style jsx>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* Avantages clés */}
      <section style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "24px 20px 12px 20px",
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

      

      {/* Section IA / Conseils */}
      <section style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "0 20px 48px 20px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px"
      }}>
        <div style={{ 
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          padding: "16px"
        }}>
          <h3 style={{ margin: 0, color: "#0f172a" }}>Génération IA intégrée</h3>
          <p style={{ marginTop: "8px", color: "#475569" }}>
            Décris ton profil, notre IA propose des contenus adaptés aux attentes des recruteurs.
          </p>
          <Link href="/cv" style={{
            marginTop: "8px",
            display: "inline-block",
            padding: "10px 14px",
            background: "linear-gradient(90deg,#0ea5e9,#2563eb)",
            color: "#fff",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: 600
          }}>Créer avec l’IA</Link>
        </div>
        <div style={{ 
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          padding: "16px"
        }}>
          <h3 style={{ margin: 0, color: "#0f172a" }}>Optimisé pour la finance</h3>
          <p style={{ marginTop: "8px", color: "#475569" }}>
            Sections et format pensés pour M&A, marchés, asset management, audit/TS, etc.
          </p>
          <ul style={{ marginTop: "8px", color: "#1f2937", paddingLeft: "20px" }}>
            <li>Rubriques standards (Éducation, Expériences, Compétences)</li>
            <li>Puces orientées réalisations et métriques</li>
            <li>Mots-clés ATS essentiels</li>
          </ul>
        </div>
      </section>
        
      <Footer />
          </div>
  );
}
