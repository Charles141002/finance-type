import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function APropos() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "rgba(2, 6, 23, 0.95)" }}>
      <Header />

      {/* Hero Section */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        {/* Calque image de fond */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/photo_a_propos.jpg)",
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
          padding: "120px 20px 100px 20px",
          textAlign: "center",
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <h1 style={{ 
            fontSize: "56px", 
            lineHeight: 1.1, 
            margin: 0, 
            color: "#ffffff",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 800,
            letterSpacing: "-0.02em"
          }}>
            À propos de FinanceCV
          </h1>
          <p style={{
            fontSize: "24px",
            color: "#e2e8f0",
            margin: "24px 0 0 0",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 500,
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto"
          }}>
            Nous sommes deux étudiants passionnés de finance et de tech. On s'est rendu compte que créer un CV type finance est souvent long, pénible et mal formaté.
          </p>
        </div>
      </section>

      {/* Section Notre Mission */}
      <section style={{
        padding: "80px 20px",
        position: "relative"
      }}>
        {/* Bulle pour la section */}
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
              Notre Mission
            </h2>
            <p style={{
              fontSize: "20px",
              color: "#e2e8f0",
              margin: 0,
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 500
            }}>
              Révolutionner la création de CV pour le secteur financier
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "40px",
            alignItems: "start"
          }}>
            {/* Pourquoi */}
            <div style={{
              textAlign: "center",
              position: "relative"
            }}>
              <div style={{
                width: "80px",
                height: "80px",
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px auto",
                boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)"
              }}>
                <span style={{
                  color: "#ffffff",
                  fontSize: "32px",
                  fontWeight: 800,
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                }}>
                  ?
                </span>
              </div>
              
              <h3 style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#ffffff",
                margin: "0 0 12px 0",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
              }}>
                Pourquoi ?
              </h3>
              <p style={{
                fontSize: "16px",
                color: "#e2e8f0",
                lineHeight: 1.6,
                margin: 0,
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
              }}>
                Parce qu'on a tous perdu des heures sur Word à re-aligner des puces et des marges. Créer un CV professionnel ne devrait pas être un calvaire.
              </p>
            </div>

            {/* Pour qui */}
            <div style={{
              textAlign: "center",
              position: "relative"
            }}>
              <div style={{
                width: "80px",
                height: "80px",
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px auto",
                boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)"
              }}>
                <span style={{
                  color: "#ffffff",
                  fontSize: "32px",
                  fontWeight: 800,
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                }}>
                  👥
                </span>
              </div>
              
              <h3 style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#ffffff",
                margin: "0 0 12px 0",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
              }}>
                Pour qui ?
              </h3>
              <p style={{
                fontSize: "16px",
                color: "#e2e8f0",
                lineHeight: 1.6,
                margin: 0,
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
              }}>
                Étudiants, jeunes diplômés et juniors visant banques, fonds d'investissement et cabinets de conseil.
              </p>
            </div>

            {/* Comment */}
            <div style={{
              textAlign: "center",
              position: "relative"
            }}>
              <div style={{
                width: "80px",
                height: "80px",
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px auto",
                boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)"
              }}>
                <span style={{
                  color: "#ffffff",
                  fontSize: "32px",
                  fontWeight: 800,
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                }}>
                  ⚡
                </span>
              </div>
              
              <h3 style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#ffffff",
                margin: "0 0 12px 0",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
              }}>
                Comment ?
              </h3>
              <p style={{
                fontSize: "16px",
                color: "#e2e8f0",
                lineHeight: 1.6,
                margin: 0,
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
              }}>
                Une structure académique stricte, des sections claires, export PDF ATS-friendly. L'IA propose, vous personnalisez.
              </p>
            </div>

            {/* L'IA */}
            <div style={{
              textAlign: "center",
              position: "relative"
            }}>
              <div style={{
                width: "80px",
                height: "80px",
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px auto",
                boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)"
              }}>
                <span style={{
                  color: "#ffffff",
                  fontSize: "32px",
                  fontWeight: 800,
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                }}>
                  🤖
                </span>
              </div>
              
              <h3 style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#ffffff",
                margin: "0 0 12px 0",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
              }}>
                Et l'IA ?
              </h3>
              <p style={{
                fontSize: "16px",
                color: "#e2e8f0",
                lineHeight: 1.6,
                margin: 0,
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
              }}>
                Elle te propose une base propre et professionnelle. Tu personnalises en 2 minutes selon ton profil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Notre Promesse */}
      <section style={{
        padding: "80px 20px",
        position: "relative"
      }}>
        {/* Bulle pour la section */}
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
            marginBottom: "48px"
          }}>
            <h2 style={{
              fontSize: "42px",
              fontWeight: 800,
              color: "#ffffff",
              margin: "0 0 16px 0",
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "-0.02em"
            }}>
              Notre Promesse
            </h2>
            <p style={{
              fontSize: "20px",
              color: "#e2e8f0",
              margin: 0,
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 500
            }}>
              Des standards professionnels, sans la complexité
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "32px",
            marginBottom: "48px"
          }}>
            {[
              { icon: "🆓", title: "Gratuit et sans friction", desc: "Aucun coût caché, aucune inscription obligatoire" },
              { icon: "📄", title: "Lisible par les ATS", desc: "Format optimisé pour passer les filtres automatiques" },
              { icon: "⚡", title: "Export PDF en un clic", desc: "Téléchargement instantané, prêt à envoyer" },
              { icon: "✏️", title: "Édition rapide et simple", desc: "Interface intuitive, modifications en temps réel" }
            ].map((item, index) => (
              <div key={index} style={{
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "16px",
                padding: "24px",
                backdropFilter: "blur(10px)"
              }}>
                <div style={{
                  fontSize: "32px",
                  marginBottom: "12px"
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#ffffff",
                  margin: "0 0 8px 0",
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: "16px",
                  color: "#e2e8f0",
                  lineHeight: 1.5,
                  margin: 0,
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA central */}
          <div style={{
            textAlign: "center"
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
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              marginRight: "16px"
            }}>
              Créer mon CV
            </Link>
            <Link href="/" style={{
              padding: "20px 40px",
              backgroundColor: "rgba(255,255,255,0.15)",
              color: "#ffffff",
              border: "2px solid rgba(255,255,255,0.3)",
              borderRadius: "16px",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "20px",
              backdropFilter: "blur(10px)",
              transition: "all 0.2s ease",
              display: "inline-block",
              textAlign: "center",
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
            }}>
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}