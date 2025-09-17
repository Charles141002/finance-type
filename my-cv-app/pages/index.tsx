import { useState, useEffect, useRef } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import BlockEditor from "../components/BlockEditor";
import blocksToHTML from "../utils/blocksToHTML";
import { initialBlocks } from "../data/initialCV";
import { Block } from "../utils/types";

// Styles CSS pour la responsivité
const styles = `
  .preview-cv {
    transform: scale(0.8);
    transform-origin: top center;
  }
  
  @media (max-width: 1200px) {
    .preview-cv {
      transform: scale(0.6) !important;
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
  const [fontScale, setFontScale] = useState<number>(1);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const editorScrollRef = useRef<HTMLDivElement>(null);

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
    
    // Créer un lien de téléchargement
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mon-cv.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <style>{styles}</style>
      <PanelGroup direction="horizontal" style={{ height: "100vh" }}>
        {/* Partie gauche - Éditeur (scrollable) */}
        <Panel defaultSize={60} minSize={30} maxSize={80}>
          <div style={{ 
            height: "100%", 
            padding: "1rem",
            overflow: "auto"
          }} ref={editorScrollRef}>
            <BlockEditor blocks={blocks} setBlocks={setBlocks} scrollContainerRef={editorScrollRef} />
          </div>
        </Panel>
        
        {/* Séparateur redimensionnable */}
        <PanelResizeHandle 
          style={{
            width: "8px",
            backgroundColor: "#e1e5e9",
            cursor: "col-resize",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div style={{
            width: "2px",
            height: "40px",
            backgroundColor: "#9ca3af",
            borderRadius: "1px"
          }} />
        </PanelResizeHandle>
        
        {/* Partie droite - Aperçu (fixe) */}
        <Panel defaultSize={45} minSize={45} maxSize={45}>
          <div style={{ 
            height: "100vh",
            overflow: "auto",
            backgroundColor: "#f8fafc",
            padding: "0.5rem",
            borderLeft: "1px solid #e1e5e9"
          }}>
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
              transformOrigin: "top left",
              marginBottom: "0.1rem"
            }}
            dangerouslySetInnerHTML={{ __html: blocksToHTML(blocks, fontScale) }}
          />
        </div>
        
        <div style={{ 
          display: "flex", 
          flexDirection: "column",
          gap: "8px",
          position: "sticky",
          bottom: "0.5rem",
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
        </div>
        
          </div>
        </Panel>
      </PanelGroup>
    </>
  );
}
