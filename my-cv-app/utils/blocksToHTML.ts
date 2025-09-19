import { Block } from "./types";

export default function blocksToHTML(blocks: Block[], fontScale: number = 1): string {
    const render = (list: Block[], depth: number): string =>
      list.map(block => {
      switch (block.type) {
        case "header": {
          const text = block.content?.title || "";
          return `<div class="cv-header"><div class="cv-name">${text}</div></div>`;
        }
  
        case "contact": {
          const c = block.content || {};
          const parts = [c.email, c.phone, c.address, c.linkedin].filter(Boolean).join(" • ");
          return `<div class="cv-contact">${parts}</div>`;
        }
  
        case "text": {
          const raw = block.content || "";
          // enlever les balises pour les heuristiques simples
          const plain = typeof raw === "string" ? raw.replace(/<[^>]*>/g, "").replace(/\u00A0/g, " ") : "";
          const hasLetter = /[A-Za-zÀ-ÖØ-öø-ÿ]/.test(plain);
          const isIntro = /Étudiant\s+à\s+IMT\s+Atlantique/i.test(plain);
          const hasListTag = typeof raw === "string" && /<(ul|ol)\b/i.test(raw);
          const hasLineBreaks = typeof raw === "string" && /<br\s*\/?\s*>/i.test(raw);

          // Si bloc totalement vide (aucune lettre), ne rien rendre (pas d'espace)
          if (!hasLetter && !hasListTag) {
            return `${render(block.children || [], depth + 1)}`;
          }

          if (isIntro) {
            return `<div class="cv-intro">${raw}</div>${render(block.children || [], depth + 1)}`;
          }

          // Conserver les listes natives UL/OL si présentes
          if (hasListTag) {
            return `<div class="cv-text">${raw}</div>${render(block.children || [], depth + 1)}`;
          }

          // Support multi-lignes dans un seul bloc texte via <br>
          if (hasLineBreaks) {
            const parts = (raw as string).split(/<br\s*\/?\s*>/i);
            const htmlLines = parts
              .map((line) => {
                const plainLine = line.replace(/<[^>]*>/g, "").replace(/\u00A0/g, " ").trim();
                if (!/[A-Za-zÀ-ÖØ-öø-ÿ]/.test(plainLine)) return ""; // ignorer ligne vide
                const isBulletLine = /^\s*[•\-–]/.test(plainLine);
                const cleaned = isBulletLine ? line.replace(/^\s*[•\-–]\s*/, "") : line;
                const levelClass = depth >= 2 ? " cv-bullet--level2" : "";
                if (isBulletLine) {
                  return `<div class=\"cv-text cv-bullet${levelClass}\">${cleaned}</div>`;
                }
                return `<div class=\"cv-text\">${line}</div>`;
              })
              .filter(Boolean)
              .join("");
            return `${htmlLines}${render(block.children || [], depth + 1)}`;
          }

          // Ligne simple
          const isBullet = /^\s*[•\-–]/.test(plain);
          const cleaned = isBullet && typeof raw === "string" ? raw.replace(/^\s*[•\-–]\s*/, "") : raw;
          const levelClass = depth >= 2 ? " cv-bullet--level2" : "";
          if (isBullet) {
            return `<div class="cv-text cv-bullet${levelClass}">${cleaned}</div>${render(block.children || [], depth + 1)}`;
          }
          return `<div class="cv-text">${raw}</div>${render(block.children || [], depth + 1)}`;
        }
  
        case "divider":
          return `<hr class="cv-divider"/>`;
  
        case "section":
          return `<div class="cv-section">\n            <div class="cv-section-title">${block.content?.title || ""}</div>\n            ${render(block.children || [], depth + 1)}\n          </div>`;
  
        case "subsection": {
          const title = block.content?.title || "";
          const subtitle = block.content?.subtitle || "";
          const period = block.content?.period || "";
          const childrenHtml = render(block.children || [], depth + 1);
          const childPlain = childrenHtml.replace(/<[^>]*>/g, "").replace(/\u00A0/g, " ").trim();
          const childrenHasLetters = /[A-Za-zÀ-ÖØ-öø-ÿ]/.test(childPlain);

          // Si aucun contenu enfant avec lettres, masquer entièrement la sous-section
          if (!childrenHasLetters) {
            return "";
          }

          return `<div class=\"cv-subsection\">\n            <div class=\"cv-subsection-header\">\n              <div>\n                <div class=\"cv-subsection-title\">${title}</div>\n                ${subtitle ? `<div class=\\\"cv-subsection-subtitle\\\">${subtitle}</div>` : ""}\n              </div>\n              ${period ? `<div class=\\\"cv-subsection-period\\\">${period}</div>` : ""}\n            </div>\n            ${childrenHtml}\n          </div>`;
        }
  
        default:
          return "";
      }
      }).join("");

    // envelopper dans un conteneur .cv pour appliquer les styles globaux
    return `<div class="cv">${render(blocks, 0)}</div>`;
  }
  