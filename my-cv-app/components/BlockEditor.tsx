"use client";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { v4 as uuid } from "uuid";
import { Block, BlockType } from "../utils/types";

interface Props {
  blocks: Block[];
  setBlocks: (blocks: Block[]) => void;
}

const BlockEditor = ({ blocks, setBlocks }: Props) => {
  const [newBlockType, setNewBlockType] = useState<BlockType>("text");
  const [subBlockTypes, setSubBlockTypes] = useState<Record<string, BlockType>>({});

  // -------------------
  // Ajouter un bloc
  // -------------------
  const handleAddBlock = (parentId?: string) => {
    const typeToUse = parentId ? (subBlockTypes[parentId] || "text") : newBlockType;
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
  // Drag & Drop racine
  // -------------------
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const reordered = Array.from(blocks);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setBlocks(reordered);
  };

  // -------------------
  // Rendu récursif d'un bloc
  // -------------------
  const renderBlock = (block: Block) => (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>{block.type.toUpperCase()}</strong>
        <div>
          {block.type !== "divider" && block.type !== "header" && block.type !== "contact" && (
            <>
              <select
                value={subBlockTypes[block.id] || "text"}
                onChange={(e) =>
                  setSubBlockTypes({
                    ...subBlockTypes,
                    [block.id]: e.target.value as BlockType,
                  })
                }
                style={{ marginRight: 8 }}
              >
                <option value="header">Header</option>
                <option value="subsection">Sous-section</option>
                <option value="section">Section</option>
                <option value="text">Texte</option>
                <option value="contact">Contact</option>
                <option value="divider">Séparateur</option>
              </select>
              <button onClick={() => handleAddBlock(block.id)} style={{ marginRight: 8 }}>
                + sous-bloc
              </button>
            </>
          )}
          <button onClick={() => handleDeleteBlock(block.id)} style={{ color: "red" }}>
            ✕
          </button>
        </div>
      </div>

      <div style={{ marginTop: 8 }}>
        {block.type === "divider" ? (
          <hr />
        ) : block.type === "contact" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <input
              placeholder="Email"
              value={block.content.email}
              onChange={(e) => updateBlockContent(block.id, { ...block.content, email: e.target.value })}
            />
            <input
              placeholder="Téléphone"
              value={block.content.phone}
              onChange={(e) => updateBlockContent(block.id, { ...block.content, phone: e.target.value })}
            />
            <input
              placeholder="Adresse"
              value={block.content.address}
              onChange={(e) => updateBlockContent(block.id, { ...block.content, address: e.target.value })}
            />
            <input
              placeholder="LinkedIn"
              value={block.content.linkedin}
              onChange={(e) => updateBlockContent(block.id, { ...block.content, linkedin: e.target.value })}
            />
          </div>
        ) : block.type === "subsection" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <input
              placeholder="Titre (ex: JCDecaux)"
              value={block.content?.title || ""}
              onChange={(e) => updateBlockContent(block.id, { ...block.content, title: e.target.value })}
            />
            <input
              placeholder="Sous-titre (ex: Data Scientist)"
              value={block.content?.subtitle || ""}
              onChange={(e) => updateBlockContent(block.id, { ...block.content, subtitle: e.target.value })}
            />
            <input
              placeholder="Période (ex: 11/2024 -- 05/2025)"
              value={block.content?.period || ""}
              onChange={(e) => updateBlockContent(block.id, { ...block.content, period: e.target.value })}
            />
          </div>
        ) : (
          <textarea
            value={typeof block.content === "string" ? block.content : block.content?.title || ""}
            onChange={(e) => {
              let newContent = e.target.value;
              if (block.type === "header" || block.type === "section") {
                newContent = { ...block.content, title: e.target.value };
              }
              updateBlockContent(block.id, newContent);
            }}
            rows={3}
            style={{ width: "100%" }}
          />
        )}
      </div>

      {block.children && block.children.length > 0 && (
        <div style={{ marginLeft: 12, marginTop: 8, borderLeft: "2px solid #eee", paddingLeft: 8 }}>
          {block.children.map((child) => renderBlock(child))}
        </div>
      )}
    </>
  );

  // -------------------
  // Rendu principal
  // -------------------
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <select value={newBlockType} onChange={(e) => setNewBlockType(e.target.value as BlockType)}>
          <option value="header">Header</option>
          <option value="subsection">Sous-section</option>
          <option value="section">Section</option>
          <option value="text">Texte</option>
          <option value="contact">Contact</option>
          <option value="divider">Séparateur</option>
        </select>
        <button onClick={() => handleAddBlock()} style={{ marginLeft: 8 }}>
          Ajouter bloc
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="blocks">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {blocks.map((block, index) => (
                <Draggable key={block.id} draggableId={block.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        padding: 8,
                        border: "1px solid #ddd",
                        marginBottom: 8,
                        borderRadius: 8,
                        background: "#fff",
                        ...provided.draggableProps.style,
                      }}
                    >
                      {renderBlock(block)}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default BlockEditor;
