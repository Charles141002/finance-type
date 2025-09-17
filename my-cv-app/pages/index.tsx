import { useState, useEffect, useRef } from "react";
import BlockEditor from "../components/BlockEditor";
import Resizer from "../components/Resizer";
import blocksToHTML from "../utils/blocksToHTML";
import { initialBlocks } from "../data/initialCV";
import { Block } from "../utils/types";

// Styles CSS pour la responsivité
const styles = `
  .main-container {
    display: flex !important;
    gap: 0 !important;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
  
  .editor-section {
    flex-shrink: 0;
    overflow-y: auto;
    overflow-x: hidden;
  }
  
  .preview-section {
    flex-shrink: 0;
    overflow-y: auto;
    overflow-x: hidden;
  }
  
  .resizer {
    flex-shrink: 0;
    position: relative;
  }
  
  /* Améliorer l'apparence du resizer */
  .resizer:hover {
    background-color: #9ca3af !important;
  }
  
  @media (max-width: 1200px) {
    .main-container {
      flex-direction: column !important;
      gap: 2rem !important;
      height: auto !important;
      overflow: visible !important;
    }
    .editor-section {
      width: 100% !important;
      min-width: auto !important;
      overflow: visible !important;
    }
    .preview-section {
      position: relative !important;
      height: auto !important;
      width: 100% !important;
      min-width: auto !important;
      overflow: visible !important;
    }
    .preview-cv {
      transform: scale(0.6) !important;
    }
    .resizer {
      display: none !important;
    }
  }
  
  @media (max-width: 768px) {
    .preview-cv {
      transform: scale(0.5) !important;
    }
  }
`;

export default function Home() {
  // IDs stables: charger depuis localStorage si disponible
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [fontScale, setFontScale] = useState<number>(1);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [leftWidth, setLeftWidth] = useState<number>(60);
  const [rightWidth, setRightWidth] = useState<number>(40);
  const previewRef = useRef<HTMLDivElement>(null);

  // Charger/Sauvegarder les blocs pour stabiliser les IDs (éviter HMR qui regénère)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem("cv_blocks");
      if (stored) {
        const parsed = JSON.parse(stored) as Block[];
        setBlocks(parsed);
      } else {
        setBlocks(initialBlocks);
        window.localStorage.setItem("cv_blocks", JSON.stringify(initialBlocks));
      }
    } catch (e) {
      setBlocks(initialBlocks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem("cv_blocks", JSON.stringify(blocks));
    } catch {}
  }, [blocks]);

  // Fonction pour calculer la taille de police optimale
  const calculateOptimalFontScale = () => {
    if (!previewRef.current) return 1;
  
    // Hauteur maximale A4 approximative en pixels
    const maxHeight = 1050;
    let scale = 1;
  
    // Créer un div temporaire pour mesurer
    const tempDiv = document.createElement("div");
    tempDiv.style.width = "210mm";
    tempDiv.style.padding = "15mm";
    tempDiv.style.boxSizing = "border-box";
    tempDiv.style.position = "absolute";
    tempDiv.style.visibility = "hidden";
    document.body.appendChild(tempDiv);
  
    // Itérer pour trouver la plus grande taille qui tient
    let currentScale = 1;
    let step = 0.02; // petit pas pour précision
    while (currentScale > 0.5) {
      tempDiv.style.fontSize = `${currentScale}em`;
      tempDiv.style.lineHeight = `${1.1 * currentScale}`;
      tempDiv.innerHTML = blocksToHTML(blocks, currentScale);
      const contentHeight = tempDiv.scrollHeight;
  
      if (contentHeight <= maxHeight) {
        scale = currentScale;
        break;
      }
      currentScale -= step;
    }
  
    document.body.removeChild(tempDiv);
    return scale;
  };
  

  // Vérifier le dépassement à chaque changement de blocks avec délai
  useEffect(() => {
    const timer = setTimeout(() => {
      const scale = calculateOptimalFontScale();
      setFontScale(scale);
      setShowWarning(scale < 1);
    }, 100); // Délai pour laisser le DOM se mettre à jour
    
    return () => clearTimeout(timer);
  }, [blocks]);

  const handleGeneratePDF = async () => {
    const res = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blocks, fontScale }),
    });
    const blob = await res.blob();
    setPdfUrl(URL.createObjectURL(blob));
  };

  const handleResize = (newLeftWidth: number, newRightWidth: number) => {
    setLeftWidth(newLeftWidth);
    setRightWidth(newRightWidth);
  };

  return (
    <>
      <style>{styles}</style>
      <div 
        className="main-container"
        style={{ 
          display: "flex", 
          gap: "0", 
          minHeight: "100vh",
          position: "relative"
        }}
      >
        {/* Partie gauche - Éditeur (scrollable) */}
        <div 
          className="editor-section"
          style={{ 
            width: `${leftWidth}%`,
            minWidth: "300px",
            paddingRight: "1rem"
          }}
        >
          <BlockEditor blocks={blocks} setBlocks={setBlocks} />
        </div>
        
        {/* Séparateur redimensionnable */}
        <div className="resizer">
          <Resizer 
            onResize={handleResize}
            initialLeftWidth={leftWidth}
            initialRightWidth={rightWidth}
          />
        </div>
        
        {/* Partie droite - Aperçu (fixe) */}
        <div 
          className="preview-section"
          style={{ 
            width: `${rightWidth}%`,
            minWidth: "300px",
            position: "sticky",
            top: "0",
            height: "100vh",
            overflow: "auto",
            backgroundColor: "#f8fafc",
            padding: "1rem",
            borderLeft: "1px solid #e1e5e9"
          }}
        >
        {showWarning && (
          <div style={{
            backgroundColor: "#fff3cd",
            border: "1px solid #ffeaa7",
            borderRadius: "4px",
            padding: "8px 12px",
            margin: "10px 0",
            color: "#856404",
            fontSize: "14px"
          }}>
            ⚠️ Attention : Tu dépasses la première page ! La taille de police a été réduite à {Math.round(fontScale * 100)}% pour tenir sur une page.
          </div>
        )}
        
        <div style={{ 
          display: "flex", 
          justifyContent: "center",
          marginBottom: "1rem"
        }}>
          <div
            ref={previewRef}
            className="preview-cv"
            style={{
              width: "210mm",
              minHeight: "297mm",
              padding: "15mm",
              border: "1px solid #000",
              boxSizing: "border-box",
              backgroundColor: "#fff",
              fontSize: `${fontScale}em`,
              lineHeight: `${1.1 * fontScale}`,
              transform: "scale(0.8)",
              transformOrigin: "top center",
              marginBottom: "2rem"
            }}
            dangerouslySetInnerHTML={{ __html: blocksToHTML(blocks, fontScale) }}
          />
        </div>
        
        <div style={{ 
          display: "flex", 
          flexDirection: "column",
          gap: "8px",
          position: "sticky",
          bottom: "1rem",
          backgroundColor: "#fff",
          padding: "1rem",
          borderRadius: "8px",
          border: "1px solid #e1e5e9",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <button 
            onClick={handleGeneratePDF}
            style={{
              padding: "12px 16px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500"
            }}
          >
            Générer PDF
          </button>
          <button 
            onClick={() => {
              const scale = calculateOptimalFontScale();
              setFontScale(scale);
              setShowWarning(scale < 1);
            }} 
            style={{ 
              fontSize: "12px",
              padding: "8px 12px",
              backgroundColor: "#f3f4f6",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Recalculer taille
          </button>
        </div>
        
        {pdfUrl && (
          <div style={{ 
            marginTop: "1rem",
            border: "1px solid #e1e5e9",
            borderRadius: "8px",
            overflow: "hidden"
          }}>
            <iframe 
              src={pdfUrl} 
              width="100%" 
              height="400px" 
              style={{ border: "none" }}
            />
          </div>
        )}
        </div>
      </div>
    </>
  );
}
