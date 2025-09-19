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
function escapeHtml(input) {
    return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function renderSubsectionChildren(children) {
    if (!children || children.length === 0) return "";
    const htmlParts = [];
    let currentListItems = null;
    const flushList = ()=>{
        if (currentListItems && currentListItems.length > 0) {
            htmlParts.push(`<ul class="cv-list">${currentListItems.join("")}</ul>`);
        }
        currentListItems = null;
    };
    for (const child of children){
        if (child.type === "text") {
            const raw = typeof child.content === "string" ? child.content : "";
            const plain = raw.replace(/<[^>]*>/g, "");
            const trimmed = plain.trim();
            const isBullet = trimmed.startsWith("•");
            if (isBullet) {
                const content = escapeHtml(trimmed.replace(/^•\s*/, ""));
                if (!currentListItems) currentListItems = [];
                currentListItems.push(`<li>${content}</li>`);
                continue;
            }
            // aucun bullet => flush puis paragraphe
            flushList();
            htmlParts.push(`<p class="cv-text">${raw}</p>`);
        } else if (child.type === "divider") {
            flushList();
            htmlParts.push(`<hr class="cv-hr"/>`);
        } else if (child.type === "section" || child.type === "subsection") {
            // cas rare: sous-niveaux -> flush puis rendu normal récursif
            flushList();
            htmlParts.push(blockToHTML(child));
        } else {
            // défaut: flush et rendu enfants
            flushList();
            htmlParts.push(blockToHTML(child));
        }
    }
    flushList();
    return htmlParts.join("");
}
function blockToHTML(block, fontScale = 1) {
    switch(block.type){
        case "header":
            {
                const text = block.content?.title || "";
                return `<header class="cv-header"><h1 class="cv-name">${escapeHtml(text)}</h1></header>`;
            }
        case "contact":
            {
                const c = block.content || {};
                const linkedin = c.linkedin ? `<a href="${escapeHtml(c.linkedin)}" target="_blank" rel="noopener">linkedin</a>` : "";
                const parts = [
                    c.email || "",
                    c.phone || "",
                    c.address || "",
                    linkedin
                ].filter(Boolean).join(" <span class=\"sep\">•</span> ");
                return `<div class="cv-contact">${parts}</div>`;
            }
        case "text":
            {
                const raw = typeof block.content === "string" ? block.content : "";
                const plain = raw.replace(/<[^>]*>/g, "");
                const isSummary = plain.includes("Étudiant à IMT Atlantique");
                // si déjà préfixé par •, laisser la gestion au parent (subsection) sinon paragraphe simple
                const isBullet = plain.trim().startsWith("•");
                if (isBullet) {
                    return `<p class="cv-text">${raw}</p>`;
                }
                return `<p class="${isSummary ? "cv-summary" : "cv-text"}">${raw}</p>`;
            }
        case "divider":
            return `<hr class="cv-hr"/>`;
        case "section":
            {
                const title = block.content?.title || "";
                const children = (block.children || []).map((ch)=>blockToHTML(ch, fontScale)).join("");
                return `<section class="cv-section"><h2 class="cv-section-title">${escapeHtml(title)}</h2>${children}</section>`;
            }
        case "subsection":
            {
                const title = block.content?.title || "";
                const subtitle = block.content?.subtitle || "";
                const period = block.content?.period || "";
                const head = `<div class="cv-subsection-head"><div class="cv-subsection-left"><div class="cv-subsection-title">${escapeHtml(title)}${subtitle ? " — <span class=\"cv-role\">" + escapeHtml(subtitle) + "</span>" : ""}</div></div><div class="cv-period">${escapeHtml(period)}</div></div>`;
                const body = renderSubsectionChildren(block.children);
                return `<div class="cv-subsection">${head}${body}</div>`;
            }
        default:
            return "";
    }
}
function blocksToHTML(blocks, fontScale = 1) {
    return blocks.map((b)=>blockToHTML(b, fontScale)).join("");
}
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
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer__$5b$external$5d$__$28$puppeteer$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer__$5b$external$5d$__$28$puppeteer$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
async function handler(req, res) {
    const blocks = req.body.blocks;
    const fontScale = req.body.fontScale || 1;
    const html = `
  <html>
    <head>
      <style>
        @page { size: A4; margin: 15mm; }
        body { font-family: 'Times New Roman', serif; }
        .cv-page { width: 210mm; min-height: 297mm; box-sizing: border-box; font-size: ${10 * fontScale}pt; line-height: ${1.2 * fontScale}em; }
        .cv-name { font-size: ${18 * fontScale}pt; margin: 0; padding: 0; font-weight: 700; }
        .cv-header { text-align: center; margin-bottom: ${8 * fontScale}px; }
        .cv-contact { text-align: center; margin-bottom: ${8 * fontScale}px; font-size: ${10 * fontScale}pt; }
        .cv-contact .sep { margin: 0 4px; }
        .cv-summary { text-align: center; margin-bottom: ${8 * fontScale}px; font-style: italic; font-size: ${10 * fontScale}pt; }
        .cv-section { margin-top: ${8 * fontScale}px; }
        .cv-section-title { font-size: ${12 * fontScale}pt; text-transform: uppercase; margin: 0 0 ${4 * fontScale}px 0; }
        .cv-subsection { margin-bottom: ${6 * fontScale}px; }
        .cv-subsection-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: ${2 * fontScale}px; }
        .cv-subsection-title { font-size: ${10 * fontScale}pt; }
        .cv-role { font-size: ${10 * fontScale}pt; }
        .cv-period { font-style: italic; font-size: ${10 * fontScale}pt; }
        .cv-text { margin: 0 0 ${2 * fontScale}px 0; font-size: ${10 * fontScale}pt; }
        .cv-hr { border: 0; border-top: 0.2pt solid #000; margin: ${6 * fontScale}px 0; }
        .cv-list { margin: 0 0 ${2 * fontScale}px 1em; padding-left: 0.9em; }
        .cv-list li { margin: 0; padding: 0; list-style-type: disc; }
      </style>
    </head>
    <body><div class="cv-page" style="padding:15mm;">${(0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$blocksToHTML$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"])(blocks, fontScale)}</div></body>
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

//# sourceMappingURL=%5Broot-of-the-server%5D__9f1a666d._.js.map