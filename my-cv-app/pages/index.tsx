import { useState, useEffect, useRef } from "react";
import BlockEditor from "../components/BlockEditor";
import blocksToHTML from "../utils/blocksToHTML";
import { initialBlocks } from "../data/initialCV";
import { Block } from "../utils/types";

export default function Home() {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [fontScale, setFontScale] = useState<number>(1);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const previewRef = useRef<HTMLDivElement>(null);

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

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <div style={{ flex: 1 }}>
        <BlockEditor blocks={blocks} setBlocks={setBlocks} />
      </div>
      <div style={{ flex: 1, overflow: "auto", height: "95vh" }}>
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
        <div
          ref={previewRef}
          style={{
            width: "210mm",
            minHeight: "297mm",
            margin: "20px auto",
            padding: "15mm",
            border: "1px solid #000",
            boxSizing: "border-box",
            backgroundColor: "#fff",
            fontSize: `${fontScale}em`,
            lineHeight: `${1.1 * fontScale}`,
          }}
          dangerouslySetInnerHTML={{ __html: blocksToHTML(blocks, fontScale) }}
        />
        <div style={{ marginTop: "1rem", display: "flex", gap: "8px" }}>
          <button onClick={handleGeneratePDF}>Générer PDF</button>
          <button onClick={() => {
            const scale = calculateOptimalFontScale();
            setFontScale(scale);
            setShowWarning(scale < 1);
          }} style={{ fontSize: "12px" }}>
            Recalculer taille
          </button>
        </div>
        {pdfUrl && <iframe src={pdfUrl} width="100%" height="500px" style={{ marginTop: "1rem" }} />}
      </div>
    </div>
  );
}
