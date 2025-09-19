"use client";
import { useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult, DragStart } from "@hello-pangea/dnd";
import { v4 as uuid } from "uuid";
import { Block, BlockType, DragContext, canMoveBlock, findBlockById, getAllowedChildTypesForParent } from "../utils/types";

// Utilitaire simple pour assainir le HTML et ne garder que B/I/U/BR/UL/OL/LI
const sanitizeHtml = (html: string): string => {
  try {
    const container = document.createElement("div");
    container.innerHTML = html;
    // Convertir <b>/<i> -> <strong>/<em> et spans soulignés -> <u>
    const replaceTag = (el: HTMLElement, newTag: string) => {
      const newEl = document.createElement(newTag);
      while (el.firstChild) newEl.appendChild(el.firstChild);
      el.parentNode?.replaceChild(newEl, el);
      return newEl;
    };
    container.querySelectorAll("b").forEach((el) => replaceTag(el as HTMLElement, "strong"));
    container.querySelectorAll("i").forEach((el) => replaceTag(el as HTMLElement, "em"));
    container.querySelectorAll("span").forEach((el) => {
      const span = el as HTMLElement;
      const td = span.style.textDecoration || span.getAttribute("style") || "";
      if (td && td.toLowerCase().includes("underline")) {
        replaceTag(span, "u");
      }
    });
    const allowed = new Set(["STRONG", "EM", "U", "BR", "UL", "OL", "LI"]);
    const walk = (node: Node) => {
      // Supprimer les <script>, <style> et commentaires
      if (node.nodeType === Node.COMMENT_NODE) {
        node.parentNode?.removeChild(node);
        return;
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        if (!allowed.has(el.tagName)) {
          // Remplacer l'élément par son contenu (unwrap)
          const parent = el.parentNode;
          if (!parent) return;
          while (el.firstChild) parent.insertBefore(el.firstChild, el);
          parent.removeChild(el);
          return;
        } else {
          // Nettoyer les attributs
          [...el.attributes].forEach((attr) => el.removeAttribute(attr.name));
        }
      }
      // Parcourir enfants en copie car on peut modifier pendant l'itération
      const children = Array.from(node.childNodes);
      children.forEach(walk);
    };
    walk(container);
    return container.innerHTML;
  } catch {
    return html;
  }
};

interface RichTextProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  singleLine?: boolean;
  style?: React.CSSProperties;
}

const RichTextEditor = ({ value, onChange, placeholder, singleLine, style }: RichTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const lastSelectionRef = useRef<Range | null>(null);

  useEffect(() => {
    // Mettre à jour le contenu si la valeur externe change (éviter boucle infinie)
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      lastSelectionRef.current = sel.getRangeAt(0);
    }
  };

  const restoreSelection = () => {
    const sel = window.getSelection();
    if (sel && lastSelectionRef.current) {
      sel.removeAllRanges();
      sel.addRange(lastSelectionRef.current);
    }
  };

  const exec = (cmd: string) => {
    // Empêcher le bouton de perdre le focus
    restoreSelection();
    ref.current?.focus();
    document.execCommand(cmd);
    // Déclencher onChange
    const html = sanitizeHtml(ref.current?.innerHTML || "");
    if (html !== value) onChange(html);
  };

  const execArg = (cmd: string, arg?: string) => {
    restoreSelection();
    ref.current?.focus();
    // @ts-ignore execCommand third arg
    document.execCommand(cmd, false, arg);
    const html = sanitizeHtml(ref.current?.innerHTML || "");
    if (html !== value) onChange(html);
  };

  const insertHTML = (htmlSnippet: string) => {
    execArg("insertHTML", htmlSnippet);
  };

  const isInsideList = (): boolean => {
    const sel = window.getSelection();
    const node = sel?.anchorNode as Node | null;
    let current: Node | null = node;
    while (current) {
      if ((current as HTMLElement).tagName) {
        const tag = ((current as HTMLElement).tagName || "").toUpperCase();
        if (tag === "LI" || tag === "UL" || tag === "OL") return true;
      }
      current = current.parentNode;
    }
    return false;
  };

  const onInput = () => {
    const html = sanitizeHtml(ref.current?.innerHTML || "");
    if (html !== value) onChange(html);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    // Empêcher retour chariot en mode singleLine
    if (singleLine && e.key === "Enter") {
      e.preventDefault();
      return;
    }
    // Shift+Enter => saut de ligne doux (br)
    if (!singleLine && e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      insertHTML("<br>");
      return;
    }
    // Enter sans Shift: en dehors d'une liste, insérer un <br>
    if (!singleLine && e.key === "Enter" && !e.shiftKey) {
      if (!isInsideList()) {
        e.preventDefault();
        insertHTML("<br>");
        return;
      }
    }
  };

  const toolbarBtnStyle: React.CSSProperties = {
    padding: "2px 6px",
    border: "1px solid #d1d5db",
    borderRadius: 4,
    background: "#fff",
    fontSize: 12,
    cursor: "pointer",
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
        <button type="button" style={toolbarBtnStyle} onMouseDown={(e) => e.preventDefault()} onClick={() => exec("bold")}>
          B
        </button>
        <button type="button" style={toolbarBtnStyle} onMouseDown={(e) => e.preventDefault()} onClick={() => exec("italic")}>
          I
        </button>
        <button type="button" style={toolbarBtnStyle} onMouseDown={(e) => e.preventDefault()} onClick={() => exec("underline")}>
          U
        </button>
        <span style={{ width: 8 }} />
        <button type="button" title="Liste à puces" style={toolbarBtnStyle} onMouseDown={(e) => e.preventDefault()} onClick={() => exec("insertUnorderedList")}>
          •
        </button>
        <button type="button" title="Liste numérotée" style={toolbarBtnStyle} onMouseDown={(e) => e.preventDefault()} onClick={() => exec("insertOrderedList")}>
          1.
        </button>
        <button type="button" title="Augmenter le retrait" style={toolbarBtnStyle} onMouseDown={(e) => e.preventDefault()} onClick={() => exec("indent")}>
          →
        </button>
        <button type="button" title="Diminuer le retrait" style={toolbarBtnStyle} onMouseDown={(e) => e.preventDefault()} onClick={() => exec("outdent")}>
          ←
        </button>
        <span style={{ width: 8 }} />
        <button type="button" title="Insérer tiret demi-cadratin" style={toolbarBtnStyle} onMouseDown={(e) => e.preventDefault()} onClick={() => insertHTML("– ")}>–</button>
        <button type="button" title="Insérer tiret cadratin" style={toolbarBtnStyle} onMouseDown={(e) => e.preventDefault()} onClick={() => insertHTML("— ")}>—</button>
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={onInput}
        onKeyDown={onKeyDown}
        onKeyUp={saveSelection}
        onMouseUp={saveSelection}
        onBlur={saveSelection}
        style={{
          minHeight: singleLine ? 28 : 60,
          border: "1px solid #d1d5db",
          borderRadius: 4,
          padding: 8,
          background: "#fff",
          outline: "none",
          whiteSpace: singleLine ? "nowrap" : "pre-wrap",
          overflow: "auto",
          ...style,
        }}
        data-placeholder={placeholder}
      />
      <style>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
};

interface Props {
  blocks: Block[];
  setBlocks: (blocks: Block[]) => void;
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
}

const BlockEditor = ({ blocks, setBlocks, scrollContainerRef }: Props) => {
  const [newBlockType, setNewBlockType] = useState<BlockType>("text");
  const [subBlockTypes, setSubBlockTypes] = useState<Record<string, BlockType>>({});
  const [dragError, setDragError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const mouseYRef = useRef<number>(0);
  const autoScrollTimerRef = useRef<number | null>(null);
  const [draggingBlockId, setDraggingBlockId] = useState<string | null>(null);
  const [draggingBlockType, setDraggingBlockType] = useState<BlockType | null>(null);
  const [subtitleVisible, setSubtitleVisible] = useState<Record<string, boolean>>({});
  const [periodVisible, setPeriodVisible] = useState<Record<string, boolean>>({});

  const hasMeaningfulText = (html: string | undefined): boolean => {
    if (!html) return false;
    const plain = html.replace(/<[^>]*>/g, "").replace(/\u00A0/g, " ").trim();
    return /[A-Za-zÀ-ÖØ-öø-ÿ0-9]/.test(plain);
  };

  // Gestion auto-scroll pendant le drag dans le conteneur scrollable gauche
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseYRef.current = e.clientY;
    };
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      if (autoScrollTimerRef.current == null) {
        autoScrollTimerRef.current = window.setInterval(() => {
          const container = scrollContainerRef?.current;
          if (!container) return;
          const rect = container.getBoundingClientRect();
          const y = mouseYRef.current;
          const threshold = 80; // px
          const scrollStep = 16; // px per tick
          if (y > rect.bottom - threshold) {
            container.scrollTop += scrollStep;
          } else if (y < rect.top + threshold) {
            container.scrollTop -= scrollStep;
          }
        }, 16);
      }
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      if (autoScrollTimerRef.current != null) {
        window.clearInterval(autoScrollTimerRef.current);
        autoScrollTimerRef.current = null;
      }
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (autoScrollTimerRef.current != null) {
        window.clearInterval(autoScrollTimerRef.current);
        autoScrollTimerRef.current = null;
      }
    };
  }, [isDragging, scrollContainerRef]);

  // -------------------
  // Ajouter un bloc
  // -------------------
  const handleAddBlock = (parentId?: string) => {
    const typeToUse = parentId ? (subBlockTypes[parentId] || "text") : newBlockType;

    // Règles: vérifier que le type est autorisé pour ce parent
    const parentType = parentId ? findBlockById(blocks, parentId)?.type : undefined;
    const allowed = getAllowedChildTypesForParent(parentType);
    if (!allowed.includes(typeToUse)) {
      setDragError("Type de bloc non autorisé ici");
      setTimeout(() => setDragError(null), 1800);
      return;
    }
    const newBlock: Block = {
      id: uuid(),
      type: typeToUse,
      content:
        typeToUse === "contact"
          ? { email: "", phone: "", address: "", linkedin: "" }
          : "",
      children: [],
    };

    if (!parentId) {
      setBlocks([...blocks, newBlock]);
    } else {
      setBlocks(addChildRecursive(blocks, parentId, newBlock));
    }
  };

  const addChildRecursive = (blocks: Block[], parentId: string, child: Block): Block[] =>
    blocks.map((b) =>
      b.id === parentId
        ? { ...b, children: [...(b.children || []), child] }
        : { ...b, children: b.children ? addChildRecursive(b.children, parentId, child) : [] }
    );

  // -------------------
  // Supprimer un bloc
  // -------------------
  const deleteBlockRecursive = (blocks: Block[], id: string): Block[] =>
    blocks
      .filter((b) => b.id !== id)
      .map((b) => ({
        ...b,
        children: b.children ? deleteBlockRecursive(b.children, id) : [],
      }));

  const handleDeleteBlock = (id: string) => setBlocks(deleteBlockRecursive(blocks, id));

  // -------------------
  // Mise à jour du contenu
  // -------------------
  const updateBlockContentRecursive = (blocks: Block[], id: string, content: any): Block[] =>
    blocks.map((b) =>
      b.id === id
        ? { ...b, content }
        : { ...b, children: b.children ? updateBlockContentRecursive(b.children, id, content) : [] }
    );

  const updateBlockContent = (id: string, content: any) => {
    setBlocks(updateBlockContentRecursive(blocks, id, content));
  };

  // -------------------
  // Drag & Drop avec règles
  // -------------------
  const handleDragEnd = (result: DropResult) => {
    setIsDragging(false);
    setDraggingBlockId(null);
    setDraggingBlockType(null);
    if (!result.destination) return;

    const { source, destination } = result;
    
    // Trouver le bloc source
    let sourceBlock: Block | undefined;
    if (source.droppableId === "root") {
      sourceBlock = blocks[source.index];
    } else {
      const parentBlock = findBlockById(blocks, source.droppableId);
      if (parentBlock && parentBlock.children) {
        sourceBlock = parentBlock.children[source.index];
      }
    }
    
    if (!sourceBlock) return;
    
    // Trouver le parent de destination
    const destinationParent = destination.droppableId !== "root" ? findBlockById(blocks, destination.droppableId) : undefined;
    
    // Créer le contexte de déplacement
    const dragContext: DragContext = {
      source: {
        blockId: sourceBlock.id,
        parentId: source.droppableId !== "root" ? source.droppableId : undefined,
        blockType: sourceBlock.type,
        index: source.index
      },
      destination: {
        parentId: destination.droppableId !== "root" ? destination.droppableId : undefined,
        index: destination.index
      }
    };

    // Vérifier les règles de déplacement
    if (!canMoveBlock(dragContext, blocks)) {
      setDragError("Déplacement non autorisé à cet endroit");
      setTimeout(() => setDragError(null), 1800);
      setIsDragging(false);
      return;
    }

    // Effectuer le déplacement
    setBlocks(moveBlockWithRules(blocks, result));
    setIsDragging(false);
  };

  const handleDragStart = (start: DragStart) => {
    setIsDragging(true);
    setDraggingBlockId(start.draggableId);
    const b = findBlockById(blocks, start.draggableId);
    setDraggingBlockType(b?.type || null);
  };

  // Fonction pour déplacer un bloc en respectant les règles
  const moveBlockWithRules = (blocks: Block[], result: DropResult): Block[] => {
    const { source, destination } = result;
    
    if (!destination) return blocks;
    
    // Si c'est un déplacement au niveau racine
    if (source.droppableId === "root" && destination.droppableId === "root") {
      return moveBlockAtRoot(blocks, source.index, destination.index);
    }
    
    // Si c'est un déplacement dans le même conteneur
    if (source.droppableId === destination.droppableId) {
      return moveBlockInContainer(blocks, source.droppableId, source.index, destination.index);
    }
    
    // Si c'est un déplacement entre conteneurs
    return moveBlockBetweenContainers(blocks, source, destination);
  };

  // Déplacer un bloc au niveau racine
  const moveBlockAtRoot = (blocks: Block[], sourceIndex: number, destIndex: number): Block[] => {
    const newBlocks = [...blocks];
    const [movedBlock] = newBlocks.splice(sourceIndex, 1);
    newBlocks.splice(destIndex, 0, movedBlock);
    return newBlocks;
  };

  // Déplacer un bloc dans le même conteneur
  const moveBlockInContainer = (blocks: Block[], containerId: string, sourceIndex: number, destIndex: number): Block[] => {
    if (containerId === "root") {
      return moveBlockAtRoot(blocks, sourceIndex, destIndex);
    }
    
    return blocks.map(block => {
      if (block.id === containerId && block.children) {
        const newChildren = [...block.children];
        const [movedChild] = newChildren.splice(sourceIndex, 1);
        newChildren.splice(destIndex, 0, movedChild);
        return { ...block, children: newChildren };
      }
      if (block.children) {
        return { ...block, children: moveBlockInContainer(block.children, containerId, sourceIndex, destIndex) };
      }
      return block;
    });
  };

  // Déplacer un bloc entre conteneurs
  const moveBlockBetweenContainers = (blocks: Block[], source: any, destination: any): Block[] => {
    // Trouver le bloc à déplacer
    let blockToMove: Block | undefined;
    
    if (source.droppableId === "root") {
      blockToMove = blocks[source.index];
    } else {
      const sourceBlock = findBlockById(blocks, source.droppableId);
      if (sourceBlock && sourceBlock.children) {
        blockToMove = sourceBlock.children[source.index];
      }
    }
    
    if (!blockToMove) return blocks;
    
    // Supprimer le bloc de la source
    const blocksWithoutSource = removeBlockFromContainer(blocks, source.droppableId, source.index);
    
    // Ajouter le bloc à la destination
    return addBlockToContainer(blocksWithoutSource, destination.droppableId, destination.index, blockToMove);
  };

  // Supprimer un bloc d'un conteneur
  const removeBlockFromContainer = (blocks: Block[], containerId: string, index: number): Block[] => {
    if (containerId === "root") {
      return blocks.filter((_, i) => i !== index);
    }
    
    return blocks.map(block => {
      if (block.id === containerId && block.children) {
        const newChildren = block.children.filter((_, i) => i !== index);
        return { ...block, children: newChildren };
      }
      if (block.children) {
        return { ...block, children: removeBlockFromContainer(block.children, containerId, index) };
      }
      return block;
    });
  };

  // Ajouter un bloc à un conteneur
  const addBlockToContainer = (blocks: Block[], containerId: string, index: number, blockToAdd: Block): Block[] => {
    if (containerId === "root") {
      const newBlocks = [...blocks];
      newBlocks.splice(index, 0, blockToAdd);
      return newBlocks;
    }
    
    return blocks.map(block => {
      if (block.id === containerId) {
        const newChildren = [...(block.children || [])];
        newChildren.splice(index, 0, blockToAdd);
        return { ...block, children: newChildren };
      }
      if (block.children) {
        return { ...block, children: addBlockToContainer(block.children, containerId, index, blockToAdd) };
      }
      return block;
    });
  };

  // -------------------
  // Rendu d'un bloc (sans Draggable, géré par le parent)
  // -------------------
  const renderBlock = (block: Block, parentId?: string, handleProps?: any, isSelfDragging?: boolean) => {
    const allowedChildTypes = getAllowedChildTypesForParent(block.type);
    const canHaveChildren = allowedChildTypes.length > 0;
    const parentBlock = parentId ? findBlockById(blocks, parentId) : undefined;
    const isChildOfSubsection = parentBlock?.type === "subsection";

    return (
      <div
        style={{
          border: "1px solid #e1e5e9",
          borderRadius: "8px",
          padding: "12px",
          marginBottom: "8px",
          backgroundColor: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          transition: "all 0.2s ease",
        }}
      >
        {/* Header du bloc (le handle est fourni par le parent Draggable) */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              {...handleProps}
              style={{
                cursor: "grab",
                padding: "4px",
                borderRadius: "4px",
                backgroundColor: "#f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "20px",
                height: "20px",
              }}
            >
              ⋮⋮
            </div>
            <span style={{
              fontSize: "12px",
              color: "#6b7280",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
            }}>
              {block.type}
            </span>
          </div>
          
          <div style={{ display: "flex", gap: "4px" }}>
            {canHaveChildren && (
              <>
                <select
                  value={subBlockTypes[block.id] || allowedChildTypes[0] || "text"}
                  onChange={(e) =>
                    setSubBlockTypes({
                      ...subBlockTypes,
                      [block.id]: e.target.value as BlockType,
                    })
                  }
                  style={{ 
                    marginRight: 8, 
                    padding: "4px 8px",
                    borderRadius: "4px",
                    border: "1px solid #d1d5db",
                    fontSize: "12px",
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                  }}
                >
                  {allowedChildTypes.map((t) => (
                    <option key={t} value={t}>
                      {t === "text" ? "Texte" : t === "subsection" ? "Sous-section" : t === "section" ? "Section" : t === "header" ? "En-tête" : t === "contact" ? "Contact" : t === "divider" ? "Séparateur" : t}
                    </option>
                  ))}
                </select>
                <button 
                  onClick={() => handleAddBlock(block.id)} 
                  style={{ 
                    marginRight: 8,
                    padding: "4px 8px",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    fontSize: "12px",
                    cursor: "pointer"
                  }}
                >
                  + sous-bloc
                </button>
              </>
            )}
            <button 
              onClick={() => handleDeleteBlock(block.id)} 
              style={{ 
                color: "#ef4444",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "4px"
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Contenu du bloc */}
        <div style={{ marginTop: 8 }}>
          {block.type === "divider" ? (
            <hr style={{ border: "none", borderTop: "2px solid #e5e7eb", margin: "8px 0" }} />
          ) : block.type === "contact" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <input
                placeholder="Email"
                value={block.content?.email || ""}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, email: e.target.value })}
                style={{ padding: "8px", border: "1px solid #d1d5db", borderRadius: "4px", maxWidth: "640px" }}
              />
              <input
                placeholder="Téléphone"
                value={block.content?.phone || ""}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, phone: e.target.value })}
                style={{ padding: "8px", border: "1px solid #d1d5db", borderRadius: "4px", maxWidth: "640px" }}
              />
              <input
                placeholder="Adresse"
                value={block.content?.address || ""}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, address: e.target.value })}
                style={{ padding: "8px", border: "1px solid #d1d5db", borderRadius: "4px", maxWidth: "640px" }}
              />
              <input
                placeholder="LinkedIn"
                value={block.content?.linkedin || ""}
                onChange={(e) => updateBlockContent(block.id, { ...block.content, linkedin: e.target.value })}
                style={{ padding: "8px", border: "1px solid #d1d5db", borderRadius: "4px", maxWidth: "640px" }}
              />
            </div>
          ) : block.type === "subsection" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <RichTextEditor
                value={block.content?.title || ""}
                onChange={(html) => updateBlockContent(block.id, { ...block.content, title: html })}
                placeholder="Titre (ex: JCDecaux)"
                singleLine
                style={{ maxWidth: "600px" }}
              />

              {/* Contrôles d’option pour sous-titre et période */}
              <div style={{ display: "flex", gap: 8 }}>
                {hasMeaningfulText(block.content?.subtitle) || subtitleVisible[block.id] ? (
                  <button
                    type="button"
                    onClick={() => {
                      const map = { ...subtitleVisible };
                      delete map[block.id];
                      setSubtitleVisible(map);
                      updateBlockContent(block.id, { ...block.content, subtitle: "" });
                    }}
                    style={{ padding: "4px 8px", fontSize: 12, border: "1px solid #d1d5db", borderRadius: 4, background: "#fff", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    Supprimer sous-titre
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSubtitleVisible({ ...subtitleVisible, [block.id]: true })}
                    style={{ padding: "4px 8px", fontSize: 12, border: "1px solid #d1d5db", borderRadius: 4, background: "#fff", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    + Sous-titre
                  </button>
                )}

                {hasMeaningfulText(block.content?.period) || periodVisible[block.id] ? (
                  <button
                    type="button"
                    onClick={() => {
                      const map = { ...periodVisible };
                      delete map[block.id];
                      setPeriodVisible(map);
                      updateBlockContent(block.id, { ...block.content, period: "" });
                    }}
                    style={{ padding: "4px 8px", fontSize: 12, border: "1px solid #d1d5db", borderRadius: 4, background: "#fff", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    Supprimer date
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPeriodVisible({ ...periodVisible, [block.id]: true })}
                    style={{ padding: "4px 8px", fontSize: 12, border: "1px solid #d1d5db", borderRadius: 4, background: "#fff", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    + Date
                  </button>
                )}
              </div>

              {(hasMeaningfulText(block.content?.subtitle) || subtitleVisible[block.id]) && (
                <RichTextEditor
                  value={block.content?.subtitle || ""}
                  onChange={(html) => updateBlockContent(block.id, { ...block.content, subtitle: html })}
                  placeholder="Sous-titre (ex: Data Scientist)"
                  singleLine
                  style={{ maxWidth: "600px" }}
                />
              )}

              {(hasMeaningfulText(block.content?.period) || periodVisible[block.id]) && (
                <RichTextEditor
                  value={block.content?.period || ""}
                  onChange={(html) => updateBlockContent(block.id, { ...block.content, period: html })}
                  placeholder="Période (ex: 11/2024 -- 05/2025)"
                  singleLine
                  style={{ fontStyle: "italic", maxWidth: "600px" }}
                />
              )}
            </div>
          ) : (
            <RichTextEditor
              value={(block.type === "header" || block.type === "section")
                ? (block.content?.title || "")
                : (typeof block.content === "string" ? block.content : "")}
              onChange={(html) => {
                if (block.type === "header" || block.type === "section") {
                  updateBlockContent(block.id, { ...block.content, title: html });
                } else {
                  updateBlockContent(block.id, html);
                }
              }}
              singleLine={block.type === "header"}
              placeholder={block.type === "header" ? "Nom complet" : 
                           block.type === "section" ? "Titre de section" : 
                           "Contenu du texte..."}
              style={{
                fontSize: block.type === "header" ? 18 : 14,
                maxWidth: isChildOfSubsection ? "560px" : "640px"
              }}
            />
          )}
        </div>

        {/* Zone de drop pour les enfants (toujours visible pour permettre d'y entrer) */}
        {canHaveChildren && (
          <Droppable 
            droppableId={block.id} 
            type="CHILD" 
            isDropDisabled={
              !!isSelfDragging || (draggingBlockType === "subsection" && block.type === "subsection")
            }
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  marginLeft: 16,
                  marginTop: 12,
                  paddingLeft: 12,
                  borderLeft: "2px solid #e5e7eb",
                  backgroundColor: snapshot.isDraggingOver ? "#f0f9ff" : "transparent",
                  borderRadius: "4px",
                  minHeight: "28px",
                  transition: "background-color 0.2s ease"
                }}
              >
                {block.children?.map((child, index) => (
                  <Draggable key={child.id} draggableId={child.id} index={index}>
                    {(provided, snapshotChild) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        {renderBlock(child, block.id, provided.dragHandleProps, snapshotChild.isDragging)}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}
      </div>
    );
  };

  // -------------------
  // Rendu principal
  // -------------------
  return (
    <div style={{ padding: "20px", backgroundColor: "#f8fafc" }}>
      {dragError && (
        <div style={{
          marginBottom: "12px",
          padding: "8px 12px",
          backgroundColor: "#fef2f2",
          border: "1px solid #fecaca",
          color: "#b91c1c",
          borderRadius: 6,
          fontSize: "13px",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        }}>
          {dragError}
        </div>
      )}
      {/* Header avec instructions */}
      <div style={{ 
        marginBottom: "24px", 
        padding: "16px", 
        backgroundColor: "#fff", 
        borderRadius: "8px",
        border: "1px solid #e1e5e9"
      }}>
        <h2 style={{ margin: "0 0 8px 0", color: "#1f2937", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>Éditeur de CV</h2>
        <p style={{ margin: "0 0 16px 0", color: "#6b7280", fontSize: "14px", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
          Glissez-déposez les blocs pour réorganiser votre CV. Les règles empêchent les placements incohérents.
        </p>
        
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <select 
            value={newBlockType} 
            onChange={(e) => setNewBlockType(e.target.value as BlockType)}
            style={{
              padding: "8px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              backgroundColor: "#fff",
              fontSize: "14px",
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
            }}
          >
            {getAllowedChildTypesForParent(undefined).map((t) => (
              <option key={t} value={t}>
                {t === "header" ? "En-tête" : t === "contact" ? "Contact" : t === "section" ? "Section" : t === "subsection" ? "Sous-section" : t === "divider" ? "Séparateur" : t === "text" ? "Texte" : t}
              </option>
            ))}
          </select>
          <button 
            onClick={() => handleAddBlock()} 
            style={{ 
              padding: "8px 16px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
            }}
          >
            + Ajouter bloc
          </button>
        </div>
      </div>

      {/* Zone de drop principale */}
      <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <Droppable droppableId="root" type="ROOT" isDropDisabled={draggingBlockType === "subsection"}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                minHeight: "400px",
                backgroundColor: snapshot.isDraggingOver ? "#f0f9ff" : "transparent",
                borderRadius: "8px",
                padding: snapshot.isDraggingOver ? "16px" : "0",
                border: snapshot.isDraggingOver ? "2px dashed #3b82f6" : "none",
                transition: "all 0.2s ease"
              }}
            >
              {blocks.length === 0 ? (
                <div style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#9ca3af",
                  fontSize: "16px"
                }}>
                  Aucun bloc. Ajoutez votre premier bloc pour commencer.
                </div>
              ) : (
                blocks.map((block, index) => (
                  <Draggable key={block.id} draggableId={block.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? 0.8 : 1,
                        }}
                      >
                        {renderBlock(block, undefined, provided.dragHandleProps, snapshot.isDragging)}
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
              
              {snapshot.isDraggingOver && (
                <div style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#3b82f6",
                  fontSize: "14px",
                  fontWeight: "500"
                }}>
                  Déposez le bloc ici
                </div>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default BlockEditor;
