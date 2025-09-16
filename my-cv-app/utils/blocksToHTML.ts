import { Block } from "./types";

export default function blocksToHTML(blocks: Block[], fontScale: number = 1): string {
    return blocks.map(block => {
      switch (block.type) {
        case "header": {
          const text = block.content?.title || "";
          return `<div style="text-align:center; margin-bottom:${8 * fontScale}px;">
            <h1 style="font-size:${18 * fontScale}pt; font-weight:bold; margin:0; padding:0;">${text}</h1>
          </div>`;
        }
  
        case "contact": {
          const c = block.content || {};
          return `<div style="text-align:center; margin-bottom:${8 * fontScale}px; font-size:${10 * fontScale}pt;">
            ${c.email || ""} • ${c.phone || ""} • ${c.address || ""} • ${c.linkedin || ""}
          </div>`;
        }
  
        case "text": {
          const content = block.content || "";
          const isItalic = content.includes("Étudiant à IMT Atlantique");
          const isBullet = content.startsWith("•");
          const hasChildren = block.children && block.children.length > 0;
          
          if (isBullet) {
            return `<div style="margin-left:${16 * fontScale}px; margin-bottom:${2 * fontScale}px; font-size:${10 * fontScale}pt;">
              ${content}
            </div>${blocksToHTML(block.children || [], fontScale)}`;
          } else if (isItalic) {
            return `<div style="text-align:center; margin-bottom:${8 * fontScale}px; font-style:italic; font-size:${10 * fontScale}pt;">
              ${content}
            </div>${blocksToHTML(block.children || [], fontScale)}`;
          } else {
            return `<div style="margin-left:${hasChildren ? 16 * fontScale : 0}px; margin-bottom:${2 * fontScale}px; font-size:${10 * fontScale}pt;">
              ${content}
            </div>${blocksToHTML(block.children || [], fontScale)}`;
          }
        }
  
        case "divider":
          return `<hr style="border:0; border-top:1px solid #000; margin:${8 * fontScale}px 0;"/>`;
  
        case "section":
          return `<div style="margin-top:${8 * fontScale}px;">
            <h2 style="font-size:${12 * fontScale}pt; font-weight:bold; text-transform:uppercase; margin:0 0 ${4 * fontScale}px 0;">${block.content?.title || ""}</h2>
            ${blocksToHTML(block.children || [], fontScale)}
          </div>`;
  
        case "subsection":
          return `<div style="margin-bottom:${4 * fontScale}px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:${2 * fontScale}px;">
              <div>
                <div style="font-weight:bold; font-size:${10 * fontScale}pt;">${block.content?.title || ""}</div>
                ${block.content?.subtitle ? `<div style="font-size:${10 * fontScale}pt; margin-top:${1 * fontScale}px;">${block.content.subtitle}</div>` : ""}
              </div>
              <div style="font-style:italic; font-size:${10 * fontScale}pt;">${block.content?.period || ""}</div>
            </div>
            ${blocksToHTML(block.children || [], fontScale)}
          </div>`;
  
        default:
          return "";
      }
    }).join("");
  }
  