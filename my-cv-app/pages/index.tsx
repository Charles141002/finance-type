import Link from "next/link";
import DynamicHeader from "../components/DynamicHeader";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "rgba(2, 6, 23, 0.95)" }}>
      <DynamicHeader variant="landing" />

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
            Générateur automatique de CV type finance avec IA
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
              padding: "20px 36px",
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              color: "#ffffff",
              borderRadius: "18px",
              textDecoration: "none",
              fontWeight: 900,
              fontSize: "20px",
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "-0.01em",
              boxShadow: "0 14px 36px rgba(59, 130, 246, 0.45), 0 5px 14px rgba(0, 0, 0, 0.18)",
              border: "2px solid rgba(255, 255, 255, 0.12)",
              transition: "all 0.3s ease",
              display: "inline-block",
              textAlign: "center",
              minWidth: "220px"
            }}>Créer mon CV</Link>
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
        padding: "48px 0",
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
            overflow: "hidden",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "20px 0"
          }}>
            <div className="scroll-container" style={{
              display: "flex",
              alignItems: "center",
              gap: "80px",
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
              <img 
                src="/OIP.webp" 
                alt="Rothschild" 
                style={{ 
                  height: "60px", 
                  width: "auto",
                  objectFit: "contain",
                  flexShrink: 0
                }} 
              />
              <img 
                src="/Rothschild-Co-ART-logo-2018.jpg" 
                alt="Rothschild" 
                style={{ 
                  height: "60px", 
                  width: "auto",
                  objectFit: "contain",
                  flexShrink: 0
                }} 
              />
              <img 
                src="/lazard-logo-freelogovectors.net_.png" 
                alt="Lazard" 
                style={{ 
                  height: "60px", 
                  width: "auto",
                  objectFit: "contain",
                  flexShrink: 0
                }} 
              />
              <img 
                src="/l_eurazeo-logo-lyo-2021.png" 
                alt="Eurazeo" 
                style={{ 
                  height: "60px", 
                  width: "auto",
                  objectFit: "contain",
                  flexShrink: 0
                }} 
              />
              <img 
                src="/Ardian-ART-logo-2018.jpg" 
                alt="Ardian" 
                style={{ 
                  height: "60px", 
                  width: "auto",
                  objectFit: "contain",
                  flexShrink: 0
                }} 
              />
              <img 
                src="/Barclays-Symbole.jpg" 
                alt="Barclays" 
                style={{ 
                  height: "60px", 
                  width: "auto",
                  objectFit: "contain",
                  flexShrink: 0
                }} 
              />
              <img 
                src="/UBS_BIG-ca7b9524.png" 
                alt="UBS" 
                style={{ 
                  height: "60px", 
                  width: "auto",
                  objectFit: "contain",
                  flexShrink: 0
                }} 
              />
              <img 
                src="/Morgan-Stanley-Logo.png" 
                alt="Morgan Stanley" 
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
              <img 
                src="/OIP.webp" 
                alt="Rothschild" 
                style={{ 
                  height: "60px", 
                  width: "auto",
                  objectFit: "contain",
                  flexShrink: 0
                }} 
              />
              <img 
                src="/Rothschild-Co-ART-logo-2018.jpg" 
                alt="Rothschild" 
                style={{ 
                  height: "60px", 
                  width: "auto",
                  objectFit: "contain",
                  flexShrink: 0
                }} 
              />
              <img 
                src="/lazard-logo-freelogovectors.net_.png" 
                alt="Lazard" 
                style={{ 
                  height: "60px", 
                  width: "auto",
                  objectFit: "contain",
                  flexShrink: 0
                }} 
              />
              <img 
                src="/l_eurazeo-logo-lyo-2021.png" 
                alt="Eurazeo" 
                style={{ 
                  height: "60px", 
                  width: "auto",
                  objectFit: "contain",
                  flexShrink: 0
                }} 
              />
              <img 
                src="/Ardian-ART-logo-2018.jpg" 
                alt="Ardian" 
                style={{ 
                  height: "60px", 
                  width: "auto",
                  objectFit: "contain",
                  flexShrink: 0
                }} 
              />
              <img 
                src="/Barclays-Symbole.jpg" 
                alt="Barclays" 
                style={{ 
                  height: "60px", 
                  width: "auto",
                  objectFit: "contain",
                  flexShrink: 0
                }} 
              />
              <img 
                src="/UBS_BIG-ca7b9524.png" 
                alt="UBS" 
                style={{ 
                  height: "60px", 
                  width: "auto",
                  objectFit: "contain",
                  flexShrink: 0
                }} 
              />
              <img 
                src="/Morgan-Stanley-Logo.png" 
                alt="Morgan Stanley" 
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
          .scroll-container {
            animation: scroll 30s linear infinite;
          }
        `}</style>
      </section>


      {/* Section Comment ça marche */}
      <section style={{
        padding: "80px 20px",
        position: "relative"
      }}>
        {/* Bulle pour la section Comment ça marche */}
        <div style={{
          position: "absolute",
          inset: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.12)",
          borderRadius: "24px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          zIndex: 1
        }} />
        <div style={{
          maxWidth: "1100px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2
        }}>
          <div style={{
            textAlign: "center",
            marginBottom: "64px"
          }}>
            <h2 style={{
              fontSize: "42px",
              fontWeight: 800,
              color: "#ffffff",
              margin: "0 0 16px 0",
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "-0.02em"
            }}>
              Comment ça marche
            </h2>
            <p style={{
              fontSize: "20px",
              color: "#e2e8f0",
              margin: 0,
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 500
            }}>
              Créez votre CV professionnel en 3 étapes simples
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "40px",
            alignItems: "start"
          }}>
            {/* Étape 1 */}
            <div style={{
              textAlign: "center",
              position: "relative"
            }}>
              
              {/* Image étape 1 */}
              <div style={{ height: "380px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                  src="/Gemini_Generated_Image_ms49kzms49kzms49 (1).png"
                  alt="Génération de CV automatique"
                  style={{
                    width: "100%",
                    height: "280px",
                    objectFit: "contain",
                    borderRadius: "12px"
                  }}
                />
              </div>

              <h3 style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#ffffff",
                margin: "0 0 12px 0",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
              }}>
                Générer votre CV
              </h3>
              <p style={{
                fontSize: "16px",
                color: "#e2e8f0",
                lineHeight: 1.6,
                margin: 0,
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
              }}>
                Générez votre CV type finance sur une page lisible par les ATS des plus grandes banques et fonds d'investissements
              </p>
            </div>

            {/* Étape 2 */}
            <div style={{
              textAlign: "center",
              position: "relative"
            }}>
              
              {/* Image étape 2 */}
              <div style={{ height: "380px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                  src="/Gemini_Generated_Image_n0iwmtn0iwmtn0iw (1).png"
                  alt="Remplissage des sections CV"
                  style={{
                    width: "100%",
                    height: "380px",
                    objectFit: "contain",
                    borderRadius: "12px"
                  }}
                />
              </div>

              <h3 style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#ffffff",
                margin: "0 0 12px 0",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
              }}>
                Remplir les sections
              </h3>
              <p style={{
                fontSize: "16px",
                color: "#e2e8f0",
                lineHeight: 1.6,
                margin: 0,
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
              }}>
                Remplissez chaque section de votre CV en vous appuyant sur notre contenu pré-rédigé, si vous le souhaitez. Pas besoin de vous occuper de la mise en forme, l'IA le fait pour vous
              </p>
            </div>

            {/* Étape 3 */}
            <div style={{
              textAlign: "center",
              position: "relative"
            }}>
              
              {/* Image étape 3 */}
              <div style={{ height: "380px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                  src="/Gemini_Generated_Image_ms49kzms49kzms49.png"
                  alt="Téléchargement du CV PDF"
                  style={{
                    width: "100%",
                    height: "320px",
                    objectFit: "contain",
                    borderRadius: "12px"
                  }}
                />
              </div>

              <h3 style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#ffffff",
                margin: "0 0 12px 0",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
              }}>
                Télécharger votre CV
              </h3>
              <p style={{
                fontSize: "16px",
                color: "#e2e8f0",
                lineHeight: 1.6,
                margin: 0,
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
              }}>
                Téléchargez votre CV au format PDF gratuitement en 1 clic. Inscrivez-vous si vous souhaitez sauvegarder votre travail
              </p>
            </div>
          </div>

          {/* CTA central */}
          <div style={{
            textAlign: "center",
            marginTop: "64px"
          }}>
            <Link href="/cv" style={{
              padding: "20px 40px",
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              color: "#ffffff",
              borderRadius: "16px",
              textDecoration: "none",
              fontWeight: 800,
              fontSize: "20px",
              boxShadow: "0 12px 32px rgba(59, 130, 246, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)",
              border: "2px solid rgba(255, 255, 255, 0.1)",
              transition: "all 0.2s ease",
              display: "inline-block",
              textAlign: "center",
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
            }}>
              Commencer maintenant
            </Link>
          </div>
        </div>
      </section>

        
      <Footer />
          </div>
  );
}
