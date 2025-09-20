import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useSession } from "@supabase/auth-helpers-react";
import DynamicHeader from "../components/DynamicHeader";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import BlockEditor from "../components/BlockEditor";
import blocksToHTML from "../utils/blocksToHTML";
import getCvCss from "../utils/cvStyles";
import { createInitialBlocks } from "../data/initialCV";
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
  const router = useRouter();
  const session = useSession();
  const isAuthenticated = Boolean(session?.user);

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [fontScale, setFontScale] = useState<number>(1);
  const [title, setTitle] = useState<string>("Mon CV");
  const [cvId, setCvId] = useState<string | null>(null);
  const [isLoadingCv, setIsLoadingCv] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveState, setSaveState] = useState<'idle' | 'success' | 'error'>('idle');
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const editorScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!router.isReady) return;

    const queryId = typeof router.query.id === "string" ? router.query.id : null;

    const loadDraft = () => {
      if (typeof window === "undefined") {
        setBlocks(createInitialBlocks());
        setFontScale(1);
        setTitle("Mon CV");
        setCvId(null);
        setIsLoadingCv(false);
        return;
      }
      try {
        const stored = window.localStorage.getItem("cv_draft");
        if (stored) {
          const parsed = JSON.parse(stored) as { blocks: Block[]; fontScale: number; title: string };
          setBlocks(parsed.blocks);
          setFontScale(parsed.fontScale ?? 1);
          setTitle(parsed.title ?? "Mon CV");
        } else {
          setBlocks(createInitialBlocks());
          setFontScale(1);
          setTitle("Mon CV");
        }
      } catch {
        setBlocks(createInitialBlocks());
        setFontScale(1);
        setTitle("Mon CV");
      }
      setCvId(null);
      setIsLoadingCv(false);
    };

    if (!queryId) {
      setLoadError(null);
      loadDraft();
      return;
    }

    const fetchCv = async () => {
      setIsLoadingCv(true);
      setLoadError(null);
      try {
        const res = await fetch(`/api/cv/detail?id=${encodeURIComponent(queryId)}`);
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          if (res.status === 401) {
            throw new Error("Connectez-vous pour charger ce CV sauvegardé.");
          }
          throw new Error(typeof data.error === "string" ? data.error : "Impossible de charger le CV.");
        }
        const { cv } = (await res.json()) as { cv: { id: string; title: string; blocks: Block[]; font_scale: number } };
        setBlocks(cv.blocks);
        setFontScale(cv.font_scale ?? 1);
        setTitle(cv.title ?? "Mon CV");
        setCvId(cv.id);
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : "Impossible de charger le CV.");
        setBlocks(createInitialBlocks());
        setFontScale(1);
        setTitle("Mon CV");
        setCvId(null);
      } finally {
        setIsLoadingCv(false);
      }
    };

    fetchCv().catch(() => {});
  }, [router.isReady, router.query.id]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (cvId) return;
    if (!blocks.length) return;
    const draft = {
      blocks,
      fontScale,
      title,
    };
    try {
      window.localStorage.setItem("cv_draft", JSON.stringify(draft));
    } catch {}
  }, [blocks, fontScale, title, cvId]);

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
    if (isLoadingCv) return;
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

  const handleSaveCv = async () => {
    if (!isAuthenticated) {
      setSaveState('error');
      setSaveMessage('Connectez-vous ou créez un compte pour sauvegarder votre CV.');
      router.push(`/login?redirect=${encodeURIComponent(router.asPath)}`).catch(() => {});
      return;
    }

    if (isSaving) return;
    setIsSaving(true);
    setSaveState('idle');
    setSaveMessage(null);

    try {
      const res = await fetch('/api/cv/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: cvId ?? undefined, title, blocks, fontScale }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (res.status === 401) {
          throw new Error('Connectez-vous pour sauvegarder votre CV.');
        }
        throw new Error(typeof data.error === 'string' ? data.error : 'Impossible de sauvegarder le CV.');
      }

      const { cv } = (await res.json()) as { cv?: { id: string; title?: string; font_scale?: number } };
      if (cv?.id) {
        setCvId(cv.id);
        if (router.query.id !== cv.id) {
          router.replace({ pathname: '/cv', query: { id: cv.id } }, undefined, { shallow: true }).catch(() => {});
        }
      }
      setSaveState('success');
      setSaveMessage('CV sauvegardé avec succès.');
    } catch (error) {
      setSaveState('error');
      setSaveMessage(error instanceof Error ? error.message : 'Impossible de sauvegarder le CV.');
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (saveState === 'idle') return;
    const timer = setTimeout(() => {
      setSaveState('idle');
      setSaveMessage(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [saveState]);

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
              <div
                style={{
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
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      alignItems: "center"
                    }}
                  >
                    <input
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      placeholder="Titre du CV"
                      style={{
                        flex: "1 1 220px",
                        minWidth: "180px",
                        padding: "10px 12px",
                        borderRadius: "6px",
                        border: "1px solid #cbd5f5",
                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "14px"
                      }}
                    />
                    {isAuthenticated && (
                      <Link
                        href="/gestion-cv"
                        style={{
                          padding: "10px 14px",
                          borderRadius: "6px",
                          border: "1px solid #cbd5f5",
                          color: "#0f172a",
                          fontSize: "14px",
                          fontWeight: 600,
                          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                          textDecoration: "none",
                          background: "white"
                        }}
                      >
                        Gestion CV
                      </Link>
                    )}
                  </div>
                  {loadError && (
                    <div
                      style={{
                        backgroundColor: "#fee2e2",
                        border: "1px solid #fecaca",
                        color: "#b91c1c",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        fontSize: "13px",
                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                      }}
                    >
                      {loadError}
                    </div>
                  )}
                  {!isAuthenticated && (
                    <div
                      style={{
                        backgroundColor: "#eff6ff",
                        border: "1px solid #bfdbfe",
                        color: "#1d4ed8",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        fontSize: "13px",
                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                      }}
                    >
                      Connectez-vous pour sauvegarder vos modifications et retrouver vos CV sur d&apos;autres appareils.
                    </div>
                  )}
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap"
                    }}
                  >
                    <button
                    onClick={handleSaveCv}
                    style={{
                      padding: "12px 16px",
                      backgroundColor: "#0f172a",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: isSaving || isLoadingCv ? "not-allowed" : "pointer",
                      opacity: isSaving || isLoadingCv ? 0.7 : 1,
                      fontSize: "14px",
                      fontWeight: 600,
                      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                    }}
                    disabled={isSaving || isLoadingCv}
                  >
                    {isSaving ? "Sauvegarde..." : "Sauvegarder"}
                  </button>
                  <button
                    onClick={handleGeneratePDF}
                    style={{
                      padding: "12px 16px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: isLoadingCv ? "not-allowed" : "pointer",
                      opacity: isLoadingCv ? 0.7 : 1,
                      fontSize: "14px",
                      fontWeight: 600,
                      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                    }}
                    disabled={isLoadingCv}
                  >
                    Générer PDF
                  </button>
                  </div>
                </div>
                {saveMessage && (
                  <div
                    style={{
                      fontSize: "13px",
                      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                      color: saveState === 'success' ? "#047857" : "#dc2626"
                    }}
                  >
                    {saveMessage}
                  </div>
                )}
              </div>

              {isLoadingCv && (
                <div
                  style={{
                    backgroundColor: "#e0f2fe",
                    border: "1px solid #bae6fd",
                    color: "#1d4ed8",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                    marginBottom: "10px"
                  }}
                >
                  Chargement du CV...
                </div>
              )}

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

  return {
    props: {
      initialSession: session ?? null,
    },
  }
}
