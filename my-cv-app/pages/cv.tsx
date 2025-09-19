import { useState, useEffect, useRef, useCallback } from "react";
import type { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import DynamicHeader from "../components/DynamicHeader";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import BlockEditor from "../components/BlockEditor";
import blocksToHTML from "../utils/blocksToHTML";
import getCvCss from "../utils/cvStyles";
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

export default function CvGeneratorPage() {
  console.log("CvGeneratorPage component rendered");
  
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
    } catch {
      setBlocks(initialBlocks);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem("cv_blocks", JSON.stringify(blocks));
    } catch {}
  }, [blocks]);

  // Calcul de la taille optimale
  const calculateOptimalFontScale = useCallback(() => {
    if (!previewRef.current) return 1;
  
    const maxHeight = 1050;
    let scale = 1;
  
    const tempDiv = document.createElement("div");
    tempDiv.style.width = "210mm";
    tempDiv.style.padding = "15mm";
    tempDiv.style.boxSizing = "border-box";
    tempDiv.style.position = "absolute";
    tempDiv.style.visibility = "hidden";
    document.body.appendChild(tempDiv);
  
    let currentScale = 1;
    const step = 0.02;
    while (currentScale > 0.5) {
      tempDiv.innerHTML = `<style>${getCvCss(currentScale)}</style>` + blocksToHTML(blocks, currentScale);
      const contentHeight = tempDiv.scrollHeight;
  
      if (contentHeight <= maxHeight) {
        scale = currentScale;
        break;
      }
      currentScale -= step;
    }
  
    document.body.removeChild(tempDiv);
    return scale;
  }, [blocks]);

  // Vérifier le dépassement à chaque changement de blocks avec délai
  useEffect(() => {
    const timer = setTimeout(() => {
      const scale = calculateOptimalFontScale();
      setFontScale(scale);
      setShowWarning(scale < 1);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [calculateOptimalFontScale]);

  const handleGeneratePDF = async () => {
    console.log("Generating PDF...", { blocks, fontScale });
    try {
      console.log("Making fetch request to /api/generate-pdf");
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocks, fontScale }),
      });

      console.log("Response received:", res.status, res.statusText);

      if (!res.ok) {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      console.log("Converting response to blob");
      const blob = await res.blob();
      console.log("Blob created:", blob.size, "bytes");
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'mon-cv.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      console.log("PDF download initiated");
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      alert(`Erreur lors de la génération du PDF: ${error instanceof Error ? error.message : "Erreur inconnue"}`);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <style>{getCvCss(fontScale)}</style>

      <DynamicHeader 
        variant="landing" 
        scrollContainerRef={editorScrollRef as React.RefObject<HTMLDivElement>}
      />

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
        <Panel defaultSize={50} minSize={45} maxSize={60}>
          <div style={{ 
            height: "100vh",
            overflow: "hidden",
            backgroundColor: "#f8fafc",
            padding: "0.5rem",
            borderLeft: "1px solid #e1e5e9",
            display: "flex",
            flexDirection: "column"
          }}>
            {/* Zone de scroll pour l'aperçu CV */}
            <div style={{ 
              flex: 1,
              overflow: "auto",
              marginBottom: "0.5rem"
            }}>
              {/* Bouton fixe en bas - toujours visible */}
              <div style={{ 
                display: "flex", 
                flexDirection: "column",
                gap: "8px",
                backgroundColor: "#fff",
                padding: "1rem",
                borderRadius: "8px",
                border: "1px solid #e1e5e9",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                flexShrink: 0,
                marginBottom: "10px",
                position: "relative",
                zIndex: 20
              }}>
                <button 
                  onClick={() => {
                    console.log("PDF Button clicked!");
                    handleGeneratePDF();
                  }}
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600",
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                    position: "relative",
                    zIndex: 21,
                    pointerEvents: "auto"
                  }}
                >
                  Générer PDF
                </button>
              </div>

              {showWarning && (
                <div style={{
                  backgroundColor: "#fff3cd",
                  border: "1px solid #ffeaa7",
                  borderRadius: "4px",
                  padding: "8px 12px",
                  margin: "10px 0",
                  color: "#856404",
                  fontSize: "14px",
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontWeight: "500"
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
                    transform: "scale(0.8)",
                    transformOrigin: "top left",
                    marginBottom: "0.1rem"
                  }}
                  dangerouslySetInnerHTML={{ __html: blocksToHTML(blocks, fontScale) }}
                />
              </div>
            </div>
        
          </div>
        </Panel>
       </PanelGroup>
     </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createPagesServerClient(context)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    const redirectDestination = `/login?redirect=${encodeURIComponent(context.resolvedUrl ?? '/cv')}`

    return {
      redirect: {
        destination: redirectDestination,
        permanent: false,
      },
    }
  }

  return {
    props: {
      initialSession: session,
    },
  }
}
