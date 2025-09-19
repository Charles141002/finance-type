module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/puppeteer [external] (puppeteer, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("puppeteer");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/utils/blocksToHTML.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>blocksToHTML
]);
function blocksToHTML(blocks, fontScale = 1) {
    const render = (list, depth)=>list.map((block)=>{
            switch(block.type){
                case "header":
                    {
                        const text = block.content?.title || "";
                        return `<div class="cv-header"><div class="cv-name">${text}</div></div>`;
                    }
                case "contact":
                    {
                        const c = block.content || {};
                        const parts = [
                            c.email,
                            c.phone,
                            c.address,
                            c.linkedin
                        ].filter(Boolean).join(" • ");
                        return `<div class="cv-contact">${parts}</div>`;
                    }
                case "text":
                    {
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
                            const parts = raw.split(/<br\s*\/?\s*>/i);
                            const htmlLines = parts.map((line)=>{
                                const plainLine = line.replace(/<[^>]*>/g, "").replace(/\u00A0/g, " ").trim();
                                if (!/[A-Za-zÀ-ÖØ-öø-ÿ]/.test(plainLine)) return ""; // ignorer ligne vide
                                const isBulletLine = /^\s*[•\-–]/.test(plainLine);
                                const cleaned = isBulletLine ? line.replace(/^\s*[•\-–]\s*/, "") : line;
                                const levelClass = depth >= 2 ? " cv-bullet--level2" : "";
                                if (isBulletLine) {
                                    return `<div class=\"cv-text cv-bullet${levelClass}\">${cleaned}</div>`;
                                }
                                return `<div class=\"cv-text\">${line}</div>`;
                            }).filter(Boolean).join("");
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
                case "subsection":
                    {
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
}),
"[project]/utils/cvStyles.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getCvCss",
    ()=>getCvCss
]);
function getCvCss(fontScale = 1) {
    const fs10 = 10 * fontScale; // base body font size in pt
    const fs12 = 12 * fontScale;
    const fs18 = 18 * fontScale;
    const gap8 = 8 * fontScale;
    const gap4 = 4 * fontScale;
    const gap2 = 2 * fontScale;
    const indent1 = 16 * fontScale;
    const indent2 = 22 * fontScale;
    return `
  /* Page and typography */
  @page { size: A4; margin: 15mm; }
  .cv { font-family: 'Times New Roman', Times, serif; font-size: ${fs10}pt; line-height: 1.25; color: #000; }
  .cv h1, .cv h2, .cv h3, .cv h4, .cv p { margin: 0; padding: 0; }
  .cv a { color: inherit; text-decoration: underline; }

  /* Header */
  .cv .cv-header { text-align: center; margin-bottom: ${gap8}px; }
  .cv .cv-name { font-size: ${fs18}pt; font-weight: 700; }
  .cv .cv-contact { text-align: center; font-size: ${fs10}pt; margin-top: ${gap2}px; }
  .cv .cv-intro { text-align: center; font-style: italic; margin-bottom: ${gap8}px; }

  /* Sections */
  .cv .cv-section { margin-top: ${gap8}px; }
  .cv .cv-section-title { font-size: ${fs12}pt; text-transform: uppercase; margin: 0 0 ${gap4}px 0; padding-bottom: ${gap2}px; border-bottom: 0.5pt solid #000; }

  /* Subsections */
  .cv .cv-subsection { margin-bottom: ${gap4}px; }
  .cv .cv-subsection-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: ${gap2}px; column-gap: ${gap4}px; }
  .cv .cv-subsection-title { font-size: ${fs10}pt; font-weight: 600; }
  .cv .cv-subsection-subtitle { font-size: ${fs10}pt; margin-top: ${Math.max(1 * fontScale, 1)}px; }
  .cv .cv-subsection-period { font-size: ${fs10}pt; font-style: italic; white-space: nowrap; }

  /* Text and bullets */
  .cv .cv-text { font-size: ${fs10}pt; margin-bottom: ${gap2}px; }
  .cv .cv-bullet { position: relative; padding-left: ${indent1}px; }
  .cv .cv-bullet::before { content: "–"; position: absolute; left: 0; top: 0; }
  .cv .cv-bullet--level2 { padding-left: ${indent2}px; }
  .cv .cv-bullet--level2::before { content: "•"; }

  /* Divider */
  .cv hr.cv-divider { border: 0; border-top: 0.5pt solid #000; margin: ${gap8}px 0; }
  `;
}
const __TURBOPACK__default__export__ = getCvCss;
}),
"[project]/pages/api/generate-pdf.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer__$5b$external$5d$__$28$puppeteer$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/puppeteer [external] (puppeteer, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$blocksToHTML$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/blocksToHTML.ts [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cvStyles$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/cvStyles.ts [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer__$5b$external$5d$__$28$puppeteer$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer__$5b$external$5d$__$28$puppeteer$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
async function handler(req, res) {
    const blocks = req.body.blocks;
    const fontScale = req.body.fontScale || 1;
    const html = `
  <html>
    <head>
      <style>${(0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cvStyles$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"])(fontScale)}</style>
    </head>
    <body>${(0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$blocksToHTML$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"])(blocks, fontScale)}</body>
  </html>`;
    const browser = await __TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer__$5b$external$5d$__$28$puppeteer$2c$__esm_import$29$__["default"].launch({
        args: [
            "--no-sandbox"
        ]
    });
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf({
        format: "A4",
        printBackground: true
    });
    await browser.close();
    res.setHeader("Content-Type", "application/pdf");
    res.end(pdf);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6263623e._.js.map