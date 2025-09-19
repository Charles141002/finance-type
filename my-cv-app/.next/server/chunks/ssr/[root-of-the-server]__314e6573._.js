module.exports = [
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/react-dom [external] (react-dom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}),
"[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DynamicHeader
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$auth$2d$helpers$2d$react__$5b$external$5d$__$2840$supabase$2f$auth$2d$helpers$2d$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@supabase/auth-helpers-react [external] (@supabase/auth-helpers-react, cjs)");
;
;
;
;
;
function DynamicHeader({ rightActions, variant = "default", scrollContainerRef }) {
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true); // Visible par défaut au chargement
    const [lastScrollY, setLastScrollY] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [isInitialized, setIsInitialized] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const session = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$auth$2d$helpers$2d$react__$5b$external$5d$__$2840$supabase$2f$auth$2d$helpers$2d$react$2c$__cjs$29$__["useSession"])();
    const supabase = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$auth$2d$helpers$2d$react__$5b$external$5d$__$2840$supabase$2f$auth$2d$helpers$2d$react$2c$__cjs$29$__["useSupabaseClient"])();
    // Délai d'initialisation pour laisser le header visible au chargement
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const timer = setTimeout(()=>{
            setIsInitialized(true);
        }, 2000); // 2 secondes de délai
        return ()=>clearTimeout(timer);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const handleScroll = ()=>{
            // Ne pas appliquer la logique de scroll tant que l'initialisation n'est pas terminée
            if (!isInitialized) return;
            // Utiliser le conteneur de scroll si fourni, sinon la fenêtre
            const scrollElement = scrollContainerRef?.current || window;
            const currentScrollY = scrollElement === window ? window.scrollY : scrollElement.scrollTop ?? 0;
            // Afficher le header si on remonte (scroll vers le haut) ou si on est en haut
            const newVisibility = currentScrollY < lastScrollY || currentScrollY <= 10;
            if (newVisibility !== isVisible) {
                setIsVisible(newVisibility);
            }
            setLastScrollY(currentScrollY);
        };
        const scrollElement = scrollContainerRef?.current || window;
        scrollElement.addEventListener('scroll', handleScroll, {
            passive: true
        });
        return ()=>{
            scrollElement.removeEventListener('scroll', handleScroll);
        };
    }, [
        lastScrollY,
        scrollContainerRef,
        isInitialized,
        isVisible
    ]);
    const handleLogout = async ()=>{
        await supabase.auth.signOut();
        router.push("/login").catch(()=>{});
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            height: isVisible ? "120px" : "0px",
            overflow: "hidden",
            transition: "height 0.3s ease-in-out",
            position: "relative",
            zIndex: 30
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
            style: {
                height: "120px",
                display: "flex",
                alignItems: "center",
                background: "linear-gradient(180deg, rgba(2, 6, 23, 0.95), rgba(2, 6, 23, 0.9))",
                backdropFilter: "saturate(140%) blur(8px)",
                WebkitBackdropFilter: "saturate(140%) blur(8px)",
                borderBottom: "2px solid rgba(255,255,255,0.15)",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                position: "relative",
                width: "100%"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    width: "100%",
                    maxWidth: "2000px",
                    margin: "0 auto",
                    padding: "0 24px 0 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "20px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            style: {
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                src: "/Logo.png",
                                alt: "FinanceCV Smart Resume Builder",
                                style: {
                                    height: "250px",
                                    width: "auto",
                                    objectFit: "contain"
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
                                lineNumber: 106,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
                            lineNumber: 98,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "32px",
                            marginLeft: "auto"
                        },
                        children: rightActions ?? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/cv",
                                    style: {
                                        textDecoration: "none",
                                        color: "#e2e8f0",
                                        fontWeight: 600,
                                        fontSize: "15px",
                                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                                        transition: "all 0.2s ease"
                                    },
                                    children: "Générateur CV"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
                                    lineNumber: 122,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/a-propos",
                                    style: {
                                        textDecoration: "none",
                                        color: "#e2e8f0",
                                        fontWeight: 600,
                                        fontSize: "15px",
                                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                                        transition: "all 0.2s ease"
                                    },
                                    children: "À propos"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
                                    lineNumber: 135,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/cv",
                                    style: {
                                        textDecoration: "none",
                                        background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                                        color: "#ffffff",
                                        padding: "14px 24px",
                                        borderRadius: "12px",
                                        fontWeight: 700,
                                        fontSize: "16px",
                                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                                        boxShadow: "0 8px 24px rgba(59, 130, 246, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)",
                                        border: "2px solid rgba(255, 255, 255, 0.1)",
                                        transition: "all 0.2s ease"
                                    },
                                    children: "Commencer"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
                                    lineNumber: 148,
                                    columnNumber: 15
                                }, this),
                                session?.user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: handleLogout,
                                    style: {
                                        color: "#e2e8f0",
                                        background: "rgba(255,255,255,0.08)",
                                        border: "1px solid rgba(255,255,255,0.15)",
                                        padding: "12px 20px",
                                        borderRadius: "12px",
                                        fontWeight: 600,
                                        fontSize: "15px",
                                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                                        transition: "all 0.2s ease",
                                        backdropFilter: "blur(10px)",
                                        cursor: "pointer"
                                    },
                                    children: "Se déconnecter"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
                                    lineNumber: 167,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/login",
                                    style: {
                                        textDecoration: "none",
                                        color: "#e2e8f0",
                                        background: "rgba(255,255,255,0.08)",
                                        border: "1px solid rgba(255,255,255,0.15)",
                                        padding: "12px 20px",
                                        borderRadius: "12px",
                                        fontWeight: 600,
                                        fontSize: "15px",
                                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                                        transition: "all 0.2s ease",
                                        backdropFilter: "blur(10px)"
                                    },
                                    children: "Se connecter"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
                                    lineNumber: 187,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
            lineNumber: 70,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
}),
"[externals]/react-resizable-panels [external] (react-resizable-panels, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("react-resizable-panels");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/@hello-pangea/dnd [external] (@hello-pangea/dnd, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@hello-pangea/dnd", () => require("@hello-pangea/dnd"));

module.exports = mod;
}),
"[externals]/uuid [external] (uuid, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("uuid");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/Desktop/finance-type/my-cv-app/utils/types.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "canMoveBlock",
    ()=>canMoveBlock,
    "findBlockById",
    ()=>findBlockById,
    "findParentOfBlock",
    ()=>findParentOfBlock,
    "getAllChildBlocks",
    ()=>getAllChildBlocks,
    "getAllowedChildTypesForParent",
    ()=>getAllowedChildTypesForParent,
    "getDepthOfBlock",
    ()=>getDepthOfBlock,
    "isDescendant",
    ()=>isDescendant
]);
// Définition des parents autorisés pour chaque type de bloc
// undefined = niveau racine
const ALLOWED_PARENTS = {
    header: [
        undefined
    ],
    contact: [
        undefined
    ],
    divider: [
        undefined
    ],
    section: [
        undefined
    ],
    subsection: [
        "section"
    ],
    text: [
        undefined,
        "section",
        "subsection"
    ]
};
const getAllowedChildTypesForParent = (parentType)=>{
    const entries = Object.entries(ALLOWED_PARENTS);
    return entries.filter(([, allowedParents])=>allowedParents.includes(parentType)).map(([type])=>type);
};
const findParentOfBlock = (blocks, targetId, parent)=>{
    for (const block of blocks){
        if (block.id === targetId) return parent;
        if (block.children && block.children.length > 0) {
            const found = findParentOfBlock(block.children, targetId, block);
            if (found) return found;
        }
    }
    return undefined;
};
const isDescendant = (blocks, ancestorId, potentialDescendantId)=>{
    const ancestor = findBlockById(blocks, ancestorId);
    if (!ancestor) return false;
    const queue = [
        ...ancestor.children || []
    ];
    while(queue.length){
        const current = queue.shift();
        if (current.id === potentialDescendantId) return true;
        if (current.children && current.children.length > 0) {
            queue.push(...current.children);
        }
    }
    return false;
};
const getDepthOfBlock = (blocks, blockId)=>{
    const helper = (list, id, depth)=>{
        for (const b of list){
            if (b.id === id) return depth;
            if (b.children && b.children.length > 0) {
                const d = helper(b.children, id, depth + 1);
                if (d !== -1) return d;
            }
        }
        return -1;
    };
    return helper(blocks, blockId, 0);
};
const canMoveBlock = (context, allBlocks)=>{
    const { source, destination } = context;
    // 1) Empêcher de déplacer un bloc dans son propre sous-arbre
    if (destination.parentId && isDescendant(allBlocks, source.blockId, destination.parentId)) {
        return false;
    }
    // 2) Déterminer le type du parent destination
    let destinationParentType = undefined;
    if (destination.parentId) {
        const parent = findBlockById(allBlocks, destination.parentId);
        if (!parent) return false;
        destinationParentType = parent.type;
    }
    // 3) Vérifier la compatibilité parent/enfant
    const allowedParents = ALLOWED_PARENTS[source.blockType];
    if (!allowedParents.includes(destinationParentType)) {
        return false;
    }
    // 4) Optionnel: limiter la profondeur totale à 3 (root=0)
    const destinationDepth = destinationParentType ? getDepthOfBlock(allBlocks, destination.parentId) + 1 : 0;
    const resultingDepth = destinationDepth; // profondeur du parent après move; l'enfant sera à destinationDepth + 1
    if (resultingDepth + 1 > 3) {
        return false;
    }
    return true;
};
const findBlockById = (blocks, id)=>{
    for (const block of blocks){
        if (block.id === id) return block;
        if (block.children) {
            const found = findBlockById(block.children, id);
            if (found) return found;
        }
    }
    return undefined;
};
const getAllChildBlocks = (block)=>{
    const children = [];
    if (block.children) {
        for (const child of block.children){
            children.push(child, ...getAllChildBlocks(child));
        }
    }
    return children;
};
}),
"[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$hello$2d$pangea$2f$dnd__$5b$external$5d$__$2840$hello$2d$pangea$2f$dnd$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@hello-pangea/dnd [external] (@hello-pangea/dnd, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/uuid [external] (uuid, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$types$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/utils/types.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
"use client";
;
;
;
;
;
const BLOCK_META = {
    header: {
        label: "En-tête",
        description: "Nom principal affiché tout en haut du CV",
        color: "#2563eb",
        icon: "👤"
    },
    contact: {
        label: "Contact",
        description: "Email, téléphone, adresse et lien LinkedIn",
        color: "#0f766e",
        icon: "✉️"
    },
    divider: {
        label: "Séparateur",
        description: "Fine ligne horizontale pour aérer le CV",
        color: "#6b7280",
        icon: "─"
    },
    section: {
        label: "Section",
        description: "Bloc titre pour expériences, formations, etc.",
        color: "#9333ea",
        icon: "📂"
    },
    subsection: {
        label: "Sous-section",
        description: "Entrée détaillée à l'intérieur d'une section",
        color: "#f97316",
        icon: "📄"
    },
    text: {
        label: "Texte",
        description: "Paragraphe libre ou bullet point",
        color: "#1f2937",
        icon: "✏️"
    }
};
const getBlockMeta = (type)=>BLOCK_META[type];
// Utilitaire simple pour assainir le HTML et ne garder que B/I/U/BR/UL/OL/LI
const sanitizeHtml = (html)=>{
    try {
        const container = document.createElement("div");
        container.innerHTML = html;
        // Convertir <b>/<i> -> <strong>/<em> et spans soulignés -> <u>
        const replaceTag = (el, newTag)=>{
            const newEl = document.createElement(newTag);
            while(el.firstChild)newEl.appendChild(el.firstChild);
            el.parentNode?.replaceChild(newEl, el);
            return newEl;
        };
        container.querySelectorAll("b").forEach((el)=>replaceTag(el, "strong"));
        container.querySelectorAll("i").forEach((el)=>replaceTag(el, "em"));
        container.querySelectorAll("span").forEach((el)=>{
            const span = el;
            const td = span.style.textDecoration || span.getAttribute("style") || "";
            if (td && td.toLowerCase().includes("underline")) {
                replaceTag(span, "u");
            }
        });
        const allowed = new Set([
            "STRONG",
            "EM",
            "U",
            "BR",
            "UL",
            "OL",
            "LI"
        ]);
        const walk = (node)=>{
            // Supprimer les <script>, <style> et commentaires
            if (node.nodeType === Node.COMMENT_NODE) {
                node.parentNode?.removeChild(node);
                return;
            }
            if (node.nodeType === Node.ELEMENT_NODE) {
                const el = node;
                if (!allowed.has(el.tagName)) {
                    // Remplacer l'élément par son contenu (unwrap)
                    const parent = el.parentNode;
                    if (!parent) return;
                    while(el.firstChild)parent.insertBefore(el.firstChild, el);
                    parent.removeChild(el);
                    return;
                } else {
                    // Nettoyer les attributs
                    [
                        ...el.attributes
                    ].forEach((attr)=>el.removeAttribute(attr.name));
                }
            }
            // Parcourir enfants en copie car on peut modifier pendant l'itération
            const children = Array.from(node.childNodes);
            children.forEach(walk);
        };
        walk(container);
        return container.innerHTML;
    } catch  {
        return html;
    }
};
const RichTextEditor = ({ value, onChange, placeholder, singleLine, style })=>{
    const ref = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const lastSelectionRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        // Mettre à jour le contenu si la valeur externe change (éviter boucle infinie)
        if (ref.current && ref.current.innerHTML !== value) {
            ref.current.innerHTML = value || "";
        }
    }, [
        value
    ]);
    const saveSelection = ()=>{
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            lastSelectionRef.current = sel.getRangeAt(0);
        }
    };
    const restoreSelection = ()=>{
        const sel = window.getSelection();
        if (sel && lastSelectionRef.current) {
            sel.removeAllRanges();
            sel.addRange(lastSelectionRef.current);
        }
    };
    const exec = (cmd)=>{
        // Empêcher le bouton de perdre le focus
        restoreSelection();
        ref.current?.focus();
        document.execCommand(cmd);
        // Déclencher onChange
        const html = sanitizeHtml(ref.current?.innerHTML || "");
        if (html !== value) onChange(html);
    };
    const execArg = (cmd, arg)=>{
        restoreSelection();
        ref.current?.focus();
        document.execCommand(cmd, false, arg);
        const html = sanitizeHtml(ref.current?.innerHTML || "");
        if (html !== value) onChange(html);
    };
    const insertHTML = (htmlSnippet)=>{
        execArg("insertHTML", htmlSnippet);
    };
    const isInsideList = ()=>{
        const sel = window.getSelection();
        const node = sel?.anchorNode;
        let current = node;
        while(current){
            if (current.tagName) {
                const tag = (current.tagName || "").toUpperCase();
                if (tag === "LI" || tag === "UL" || tag === "OL") return true;
            }
            current = current.parentNode;
        }
        return false;
    };
    const onInput = ()=>{
        const html = sanitizeHtml(ref.current?.innerHTML || "");
        if (html !== value) onChange(html);
    };
    const onKeyDown = (e)=>{
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
    const toolbarBtnStyle = {
        padding: "2px 6px",
        border: "1px solid #d1d5db",
        borderRadius: 4,
        background: "#fff",
        fontSize: 12,
        cursor: "pointer"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: 6,
                    marginBottom: 6,
                    flexWrap: "wrap"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "button",
                        style: toolbarBtnStyle,
                        onMouseDown: (e)=>e.preventDefault(),
                        onClick: ()=>exec("bold"),
                        children: "B"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 220,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "button",
                        style: toolbarBtnStyle,
                        onMouseDown: (e)=>e.preventDefault(),
                        onClick: ()=>exec("italic"),
                        children: "I"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 223,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "button",
                        style: toolbarBtnStyle,
                        onMouseDown: (e)=>e.preventDefault(),
                        onClick: ()=>exec("underline"),
                        children: "U"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 226,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        style: {
                            width: 8
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "button",
                        title: "Liste à puces",
                        style: toolbarBtnStyle,
                        onMouseDown: (e)=>e.preventDefault(),
                        onClick: ()=>exec("insertUnorderedList"),
                        children: "•"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 230,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "button",
                        title: "Liste numérotée",
                        style: toolbarBtnStyle,
                        onMouseDown: (e)=>e.preventDefault(),
                        onClick: ()=>exec("insertOrderedList"),
                        children: "1."
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "button",
                        title: "Augmenter le retrait",
                        style: toolbarBtnStyle,
                        onMouseDown: (e)=>e.preventDefault(),
                        onClick: ()=>exec("indent"),
                        children: "→"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 236,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "button",
                        title: "Diminuer le retrait",
                        style: toolbarBtnStyle,
                        onMouseDown: (e)=>e.preventDefault(),
                        onClick: ()=>exec("outdent"),
                        children: "←"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 239,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        style: {
                            width: 8
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 242,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "button",
                        title: "Insérer tiret demi-cadratin",
                        style: toolbarBtnStyle,
                        onMouseDown: (e)=>e.preventDefault(),
                        onClick: ()=>insertHTML("– "),
                        children: "–"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 243,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "button",
                        title: "Insérer tiret cadratin",
                        style: toolbarBtnStyle,
                        onMouseDown: (e)=>e.preventDefault(),
                        onClick: ()=>insertHTML("— "),
                        children: "—"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 244,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                lineNumber: 219,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                ref: ref,
                contentEditable: true,
                suppressContentEditableWarning: true,
                onInput: onInput,
                onKeyDown: onKeyDown,
                onKeyUp: saveSelection,
                onMouseUp: saveSelection,
                onBlur: saveSelection,
                style: {
                    minHeight: singleLine ? 28 : 60,
                    border: "1px solid #d1d5db",
                    borderRadius: 4,
                    padding: 8,
                    background: "#fff",
                    outline: "none",
                    whiteSpace: singleLine ? "nowrap" : "pre-wrap",
                    overflow: "auto",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    ...style
                },
                "data-editor": "true",
                "data-placeholder": placeholder
            }, void 0, false, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("style", {
                children: `
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
        }
        [data-editor="true"]:focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.14);
        }
      `
            }, void 0, false, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                lineNumber: 270,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
        lineNumber: 218,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const BlockEditor = ({ blocks, setBlocks, scrollContainerRef })=>{
    const [subBlockTypes, setSubBlockTypes] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    const [dragError, setDragError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const mouseYRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(0);
    const autoScrollTimerRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const [draggingBlockType, setDraggingBlockType] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [subtitleVisible, setSubtitleVisible] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    const [periodVisible, setPeriodVisible] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    const [collapsedBlocks, setCollapsedBlocks] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    const hasInitializedCollapse = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (hasInitializedCollapse.current || blocks.length === 0) return;
        const initial = {};
        const visit = (list)=>{
            list.forEach((block)=>{
                initial[block.id] = true;
                if (block.children && block.children.length > 0) visit(block.children);
            });
        };
        visit(blocks);
        setCollapsedBlocks(initial);
        hasInitializedCollapse.current = true;
    }, [
        blocks
    ]);
    const [highlightedBlockId, setHighlightedBlockId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!highlightedBlockId) return;
        const el = document.querySelector(`[data-block-id="${highlightedBlockId}"]`);
        if (!el) return;
        el.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
        el.classList.add("block-editor__pulse");
        const timer = window.setTimeout(()=>{
            el.classList.remove("block-editor__pulse");
            setHighlightedBlockId(null);
        }, 1400);
        return ()=>{
            el.classList.remove("block-editor__pulse");
            window.clearTimeout(timer);
        };
    }, [
        highlightedBlockId
    ]);
    const hasMeaningfulText = (html)=>{
        if (!html) return false;
        const plain = html.replace(/<[^>]*>/g, "").replace(/\u00A0/g, " ").trim();
        return /[A-Za-zÀ-ÖØ-öø-ÿ0-9]/.test(plain);
    };
    // Gestion auto-scroll pendant le drag dans le conteneur scrollable gauche
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const handleMouseMove = (e)=>{
            mouseYRef.current = e.clientY;
        };
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            if (autoScrollTimerRef.current == null) {
                autoScrollTimerRef.current = window.setInterval(()=>{
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
        return ()=>{
            window.removeEventListener("mousemove", handleMouseMove);
            if (autoScrollTimerRef.current != null) {
                window.clearInterval(autoScrollTimerRef.current);
                autoScrollTimerRef.current = null;
            }
        };
    }, [
        isDragging,
        scrollContainerRef
    ]);
    // -------------------
    // Ajouter un bloc
    // -------------------
    const handleAddBlock = (parentId, explicitType)=>{
        const typeToUse = explicitType || (parentId ? subBlockTypes[parentId] || "text" : "text");
        // Règles: vérifier que le type est autorisé pour ce parent
        const parentType = parentId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$types$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["findBlockById"])(blocks, parentId)?.type : undefined;
        const allowed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$types$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getAllowedChildTypesForParent"])(parentType);
        if (!allowed.includes(typeToUse)) {
            setDragError("Type de bloc non autorisé ici");
            setTimeout(()=>setDragError(null), 1800);
            return;
        }
        const newBlock = {
            id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
            type: typeToUse,
            content: typeToUse === "contact" ? {
                email: "",
                phone: "",
                address: "",
                linkedin: ""
            } : typeToUse === "divider" ? undefined : "",
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$types$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getAllowedChildTypesForParent"])(typeToUse).length > 0 ? [] : undefined
        };
        const updatedBlocks = !parentId ? [
            ...blocks,
            newBlock
        ] : addChildRecursive(blocks, parentId, newBlock);
        setBlocks(updatedBlocks);
        setCollapsedBlocks((prev)=>({
                ...prev,
                [newBlock.id]: false,
                ...parentId ? {
                    [parentId]: false
                } : {}
            }));
        setHighlightedBlockId(newBlock.id);
    };
    const addChildRecursive = (blocks, parentId, child)=>blocks.map((b)=>{
            if (b.id === parentId) {
                return {
                    ...b,
                    children: [
                        ...b.children || [],
                        child
                    ]
                };
            }
            if (b.children) {
                return {
                    ...b,
                    children: addChildRecursive(b.children, parentId, child)
                };
            }
            return b;
        });
    const cloneBlockWithNewIds = (block)=>({
            ...block,
            id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
            children: block.children?.map(cloneBlockWithNewIds) ?? []
        });
    const duplicateBlockRecursive = (blocksList, targetId)=>{
        let cloneId = null;
        const nextBlocks = [];
        for (const block of blocksList){
            if (block.id === targetId) {
                const cloned = cloneBlockWithNewIds(block);
                cloneId = cloned.id;
                nextBlocks.push(block, cloned);
                continue;
            }
            if (block.children && block.children.length > 0) {
                const { blocks: updatedChildren, cloneId: childCloneId } = duplicateBlockRecursive(block.children, targetId);
                if (childCloneId) {
                    cloneId = childCloneId;
                    nextBlocks.push({
                        ...block,
                        children: updatedChildren
                    });
                    continue;
                }
                nextBlocks.push(block);
                continue;
            }
            nextBlocks.push(block);
        }
        return {
            blocks: nextBlocks,
            cloneId
        };
    };
    const handleDuplicateBlock = (id)=>{
        const { blocks: updatedBlocks, cloneId } = duplicateBlockRecursive(blocks, id);
        setBlocks(updatedBlocks);
        if (cloneId) {
            setCollapsedBlocks((prev)=>({
                    ...prev,
                    [cloneId]: false
                }));
            setHighlightedBlockId(cloneId);
        }
    };
    // -------------------
    // Supprimer un bloc
    // -------------------
    const deleteBlockRecursive = (blocks, id)=>blocks.filter((b)=>b.id !== id).map((b)=>b.children ? {
                ...b,
                children: deleteBlockRecursive(b.children, id)
            } : b);
    const handleDeleteBlock = (id)=>setBlocks(deleteBlockRecursive(blocks, id));
    // -------------------
    // Mise à jour du contenu
    // -------------------
    const updateBlockContentRecursive = (blocksList, id, content)=>blocksList.map((block)=>{
            if (block.id === id) {
                return {
                    ...block,
                    content
                };
            }
            if (block.children) {
                return {
                    ...block,
                    children: updateBlockContentRecursive(block.children, id, content)
                };
            }
            return block;
        });
    const updateBlockContent = (id, content)=>{
        setBlocks(updateBlockContentRecursive(blocks, id, content));
    };
    // -------------------
    // Drag & Drop avec règles
    // -------------------
    const handleDragEnd = (result)=>{
        setIsDragging(false);
        setDraggingBlockType(null);
        if (!result.destination) return;
        const { source, destination } = result;
        // Trouver le bloc source
        let sourceBlock;
        if (source.droppableId === "root") {
            sourceBlock = blocks[source.index];
        } else {
            const parentBlock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$types$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["findBlockById"])(blocks, source.droppableId);
            if (parentBlock && parentBlock.children) {
                sourceBlock = parentBlock.children[source.index];
            }
        }
        if (!sourceBlock) return;
        // Créer le contexte de déplacement
        const dragContext = {
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
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$types$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["canMoveBlock"])(dragContext, blocks)) {
            setDragError("Déplacement non autorisé à cet endroit");
            setTimeout(()=>setDragError(null), 1800);
            setIsDragging(false);
            return;
        }
        // Effectuer le déplacement
        setBlocks(moveBlockWithRules(blocks, result));
        setIsDragging(false);
    };
    const handleDragStart = (start)=>{
        setIsDragging(true);
        const b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$types$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["findBlockById"])(blocks, start.draggableId);
        setDraggingBlockType(b?.type || null);
    };
    // Fonction pour déplacer un bloc en respectant les règles
    const moveBlockWithRules = (blocks, result)=>{
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
    const moveBlockAtRoot = (blocks, sourceIndex, destIndex)=>{
        const newBlocks = [
            ...blocks
        ];
        const [movedBlock] = newBlocks.splice(sourceIndex, 1);
        newBlocks.splice(destIndex, 0, movedBlock);
        return newBlocks;
    };
    // Déplacer un bloc dans le même conteneur
    const moveBlockInContainer = (blocks, containerId, sourceIndex, destIndex)=>{
        if (containerId === "root") {
            return moveBlockAtRoot(blocks, sourceIndex, destIndex);
        }
        return blocks.map((block)=>{
            if (block.id === containerId && block.children) {
                const newChildren = [
                    ...block.children
                ];
                const [movedChild] = newChildren.splice(sourceIndex, 1);
                newChildren.splice(destIndex, 0, movedChild);
                return {
                    ...block,
                    children: newChildren
                };
            }
            if (block.children) {
                return {
                    ...block,
                    children: moveBlockInContainer(block.children, containerId, sourceIndex, destIndex)
                };
            }
            return block;
        });
    };
    // Déplacer un bloc entre conteneurs
    const moveBlockBetweenContainers = (blocksList, source, destination)=>{
        // Trouver le bloc à déplacer
        let blockToMove;
        if (source.droppableId === "root") {
            blockToMove = blocksList[source.index];
        } else {
            const sourceBlock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$types$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["findBlockById"])(blocksList, source.droppableId);
            if (sourceBlock && sourceBlock.children) {
                blockToMove = sourceBlock.children[source.index];
            }
        }
        if (!blockToMove) return blocksList;
        // Supprimer le bloc de la source
        const blocksWithoutSource = removeBlockFromContainer(blocksList, source.droppableId, source.index);
        // Ajouter le bloc à la destination
        return addBlockToContainer(blocksWithoutSource, destination.droppableId, destination.index, blockToMove);
    };
    // Supprimer un bloc d'un conteneur
    const removeBlockFromContainer = (blocks, containerId, index)=>{
        if (containerId === "root") {
            return blocks.filter((_, i)=>i !== index);
        }
        return blocks.map((block)=>{
            if (block.id === containerId && block.children) {
                const newChildren = block.children.filter((_, i)=>i !== index);
                return {
                    ...block,
                    children: newChildren
                };
            }
            if (block.children) {
                return {
                    ...block,
                    children: removeBlockFromContainer(block.children, containerId, index)
                };
            }
            return block;
        });
    };
    // Ajouter un bloc à un conteneur
    const addBlockToContainer = (blocks, containerId, index, blockToAdd)=>{
        if (containerId === "root") {
            const newBlocks = [
                ...blocks
            ];
            newBlocks.splice(index, 0, blockToAdd);
            return newBlocks;
        }
        return blocks.map((block)=>{
            if (block.id === containerId) {
                const newChildren = [
                    ...block.children || []
                ];
                newChildren.splice(index, 0, blockToAdd);
                return {
                    ...block,
                    children: newChildren
                };
            }
            if (block.children) {
                return {
                    ...block,
                    children: addBlockToContainer(block.children, containerId, index, blockToAdd)
                };
            }
            return block;
        });
    };
    // -------------------
    // Rendu d'un bloc (sans Draggable, géré par le parent)
    // -------------------
    const renderBlock = (block, parentId, handleProps, isSelfDragging)=>{
        const allowedChildTypes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$types$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getAllowedChildTypesForParent"])(block.type);
        const canHaveChildren = allowedChildTypes.length > 0;
        const parentBlock = parentId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$types$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["findBlockById"])(blocks, parentId) : undefined;
        const isChildOfSubsection = parentBlock?.type === "subsection";
        const meta = getBlockMeta(block.type);
        const isCollapsed = collapsedBlocks[block.id];
        const supportsCollapse = block.type !== "divider";
        const actionButtonStyle = {
            border: "1px solid #d4d8dd",
            backgroundColor: "#fff",
            borderRadius: 6,
            padding: "6px 10px",
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            gap: 4,
            cursor: "pointer",
            color: "#0f172a",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            transition: "background-color 0.15s ease, color 0.15s ease"
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            "data-block-id": block.id,
            style: {
                border: `1px solid ${isSelfDragging ? "#60a5fa" : "#e2e8f0"}`,
                borderRadius: 12,
                padding: "14px 16px",
                marginBottom: 10,
                backgroundColor: "#ffffff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                transition: "all 0.2s ease",
                position: "relative",
                borderLeft: `4px solid ${meta.color}`
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 12,
                        marginBottom: isCollapsed ? 0 : 10
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                flex: 1
                            },
                            children: [
                                supportsCollapse ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setCollapsedBlocks((prev)=>({
                                                ...prev,
                                                [block.id]: !prev[block.id]
                                            })),
                                    style: {
                                        border: "1px solid #cbd5f5",
                                        backgroundColor: isCollapsed ? "#e0e7ff" : "#fff",
                                        color: "#3b82f6",
                                        width: 28,
                                        height: 28,
                                        borderRadius: 6,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        fontSize: 14
                                    },
                                    children: isCollapsed ? "▸" : "▾"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                    lineNumber: 745,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 28,
                                        height: 28
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                    lineNumber: 770,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    ...handleProps ?? {},
                                    style: {
                                        cursor: "grab",
                                        padding: "6px 8px",
                                        borderRadius: 6,
                                        backgroundColor: "#f1f5f9",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#1e293b",
                                        fontSize: 12,
                                        minWidth: 28
                                    },
                                    title: "Glisser pour déplacer",
                                    children: "⋮⋮"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                    lineNumber: 772,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 4
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 8
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 20
                                                    },
                                                    "aria-hidden": true,
                                                    children: meta.icon
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                                    lineNumber: 792,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 13,
                                                        fontWeight: 700,
                                                        textTransform: "uppercase",
                                                        letterSpacing: "0.04em",
                                                        color: meta.color,
                                                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                                    },
                                                    children: meta.label
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                                    lineNumber: 795,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                            lineNumber: 791,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 12,
                                                color: "#64748b",
                                                maxWidth: 420
                                            },
                                            children: meta.description
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                            lineNumber: 808,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                    lineNumber: 790,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                            lineNumber: 743,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 6,
                                alignItems: "center"
                            },
                            children: [
                                canHaveChildren && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 6
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                            value: subBlockTypes[block.id] || allowedChildTypes[0] || "text",
                                            onChange: (e)=>setSubBlockTypes({
                                                    ...subBlockTypes,
                                                    [block.id]: e.target.value
                                                }),
                                            style: {
                                                padding: "6px 8px",
                                                borderRadius: 6,
                                                border: "1px solid #d1d5db",
                                                fontSize: 12,
                                                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                            },
                                            title: "Choisir un type de sous-bloc",
                                            children: allowedChildTypes.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: t,
                                                    children: getBlockMeta(t).label
                                                }, t, false, {
                                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                                    lineNumber: 841,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                            lineNumber: 823,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>handleAddBlock(block.id),
                                            style: {
                                                ...actionButtonStyle,
                                                borderColor: "#bfdbfe",
                                                color: "#1d4ed8",
                                                backgroundColor: "#eff6ff"
                                            },
                                            children: "+ Ajouter"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                            lineNumber: 846,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                    lineNumber: 822,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>handleDuplicateBlock(block.id),
                                    style: actionButtonStyle,
                                    title: "Dupliquer le bloc",
                                    children: [
                                        "⧉",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            children: "Copier"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                            lineNumber: 868,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                    lineNumber: 861,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>handleDeleteBlock(block.id),
                                    style: {
                                        ...actionButtonStyle,
                                        borderColor: "#fecaca",
                                        color: "#b91c1c",
                                        backgroundColor: "#fff1f2"
                                    },
                                    title: "Supprimer le bloc",
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                    lineNumber: 870,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                            lineNumber: 820,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                    lineNumber: 734,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: 4
                    },
                    children: block.type === "divider" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("hr", {
                        style: {
                            border: "none",
                            borderTop: "2px solid #e5e7eb",
                            margin: "8px 0"
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 890,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : block.type === "contact" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                placeholder: "Email",
                                value: block.content?.email || "",
                                onChange: (e)=>updateBlockContent(block.id, {
                                        ...block.content,
                                        email: e.target.value
                                    }),
                                style: {
                                    padding: "10px 12px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: 6,
                                    maxWidth: "640px",
                                    backgroundColor: "#f8fafc",
                                    transition: "border-color 0.2s ease, box-shadow 0.2s ease"
                                },
                                "data-contact-input": true
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 893,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                placeholder: "Téléphone",
                                value: block.content?.phone || "",
                                onChange: (e)=>updateBlockContent(block.id, {
                                        ...block.content,
                                        phone: e.target.value
                                    }),
                                style: {
                                    padding: "10px 12px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: 6,
                                    maxWidth: "640px",
                                    backgroundColor: "#f8fafc",
                                    transition: "border-color 0.2s ease, box-shadow 0.2s ease"
                                },
                                "data-contact-input": true
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 907,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                placeholder: "Adresse",
                                value: block.content?.address || "",
                                onChange: (e)=>updateBlockContent(block.id, {
                                        ...block.content,
                                        address: e.target.value
                                    }),
                                style: {
                                    padding: "10px 12px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: 6,
                                    maxWidth: "640px",
                                    backgroundColor: "#f8fafc",
                                    transition: "border-color 0.2s ease, box-shadow 0.2s ease"
                                },
                                "data-contact-input": true
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 921,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                placeholder: "LinkedIn",
                                value: block.content?.linkedin || "",
                                onChange: (e)=>updateBlockContent(block.id, {
                                        ...block.content,
                                        linkedin: e.target.value
                                    }),
                                style: {
                                    padding: "10px 12px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: 6,
                                    maxWidth: "640px",
                                    backgroundColor: "#f8fafc",
                                    transition: "border-color 0.2s ease, box-shadow 0.2s ease"
                                },
                                "data-contact-input": true
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 935,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 892,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : block.type === "subsection" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(RichTextEditor, {
                                value: block.content?.title || "",
                                onChange: (html)=>updateBlockContent(block.id, {
                                        ...block.content,
                                        title: html
                                    }),
                                placeholder: "Titre (ex: JCDecaux)",
                                singleLine: true,
                                style: {
                                    maxWidth: "600px"
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 952,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: 8
                                },
                                children: [
                                    hasMeaningfulText(block.content?.subtitle) || subtitleVisible[block.id] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>{
                                            const map = {
                                                ...subtitleVisible
                                            };
                                            delete map[block.id];
                                            setSubtitleVisible(map);
                                            updateBlockContent(block.id, {
                                                ...block.content,
                                                subtitle: ""
                                            });
                                        },
                                        style: {
                                            padding: "4px 8px",
                                            fontSize: 12,
                                            border: "1px solid #d1d5db",
                                            borderRadius: 4,
                                            background: "#fff",
                                            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                        },
                                        children: "Supprimer sous-titre"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                        lineNumber: 963,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setSubtitleVisible({
                                                ...subtitleVisible,
                                                [block.id]: true
                                            }),
                                        style: {
                                            padding: "4px 8px",
                                            fontSize: 12,
                                            border: "1px solid #d1d5db",
                                            borderRadius: 4,
                                            background: "#fff",
                                            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                        },
                                        children: "+ Sous-titre"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                        lineNumber: 976,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    hasMeaningfulText(block.content?.period) || periodVisible[block.id] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>{
                                            const map = {
                                                ...periodVisible
                                            };
                                            delete map[block.id];
                                            setPeriodVisible(map);
                                            updateBlockContent(block.id, {
                                                ...block.content,
                                                period: ""
                                            });
                                        },
                                        style: {
                                            padding: "4px 8px",
                                            fontSize: 12,
                                            border: "1px solid #d1d5db",
                                            borderRadius: 4,
                                            background: "#fff",
                                            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                        },
                                        children: "Supprimer date"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                        lineNumber: 986,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setPeriodVisible({
                                                ...periodVisible,
                                                [block.id]: true
                                            }),
                                        style: {
                                            padding: "4px 8px",
                                            fontSize: 12,
                                            border: "1px solid #d1d5db",
                                            borderRadius: 4,
                                            background: "#fff",
                                            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                        },
                                        children: "+ Date"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                        lineNumber: 999,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 961,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            (hasMeaningfulText(block.content?.subtitle) || subtitleVisible[block.id]) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(RichTextEditor, {
                                value: block.content?.subtitle || "",
                                onChange: (html)=>updateBlockContent(block.id, {
                                        ...block.content,
                                        subtitle: html
                                    }),
                                placeholder: "Sous-titre (ex: Data Scientist)",
                                singleLine: true,
                                style: {
                                    maxWidth: "600px"
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 1010,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            (hasMeaningfulText(block.content?.period) || periodVisible[block.id]) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(RichTextEditor, {
                                value: block.content?.period || "",
                                onChange: (html)=>updateBlockContent(block.id, {
                                        ...block.content,
                                        period: html
                                    }),
                                placeholder: "Période (ex: 11/2024 -- 05/2025)",
                                singleLine: true,
                                style: {
                                    fontStyle: "italic",
                                    maxWidth: "600px"
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 1020,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 951,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(RichTextEditor, {
                        value: block.type === "header" || block.type === "section" ? block.content?.title || "" : typeof block.content === "string" ? block.content : "",
                        onChange: (html)=>{
                            if (block.type === "header" || block.type === "section") {
                                updateBlockContent(block.id, {
                                    ...block.content,
                                    title: html
                                });
                            } else {
                                updateBlockContent(block.id, html);
                            }
                        },
                        singleLine: block.type === "header",
                        placeholder: block.type === "header" ? "Nom complet" : block.type === "section" ? "Titre de section" : "Contenu du texte...",
                        style: {
                            fontSize: block.type === "header" ? 18 : 14,
                            maxWidth: isChildOfSubsection ? "560px" : "640px"
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 1030,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                    lineNumber: 888,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                canHaveChildren && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$hello$2d$pangea$2f$dnd__$5b$external$5d$__$2840$hello$2d$pangea$2f$dnd$2c$__cjs$29$__["Droppable"], {
                    droppableId: block.id,
                    type: "CHILD",
                    isDropDisabled: !!isSelfDragging || draggingBlockType === "subsection" && block.type === "subsection",
                    children: (provided, snapshot)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            ref: provided.innerRef,
                            ...provided.droppableProps,
                            style: {
                                marginLeft: 16,
                                marginTop: isCollapsed ? 0 : 12,
                                paddingLeft: 12,
                                borderLeft: "2px solid #e5e7eb",
                                backgroundColor: snapshot.isDraggingOver ? "#e0f2fe" : "transparent",
                                borderRadius: 6,
                                minHeight: snapshot.isDraggingOver ? 32 : isCollapsed ? 12 : 28,
                                transition: "background-color 0.2s ease"
                            },
                            children: [
                                !isCollapsed && block.children?.map((child, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$hello$2d$pangea$2f$dnd__$5b$external$5d$__$2840$hello$2d$pangea$2f$dnd$2c$__cjs$29$__["Draggable"], {
                                        draggableId: child.id,
                                        index: index,
                                        children: (provided, snapshotChild)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                ref: provided.innerRef,
                                                ...provided.draggableProps,
                                                children: renderBlock(child, block.id, provided.dragHandleProps, snapshotChild.isDragging)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                                lineNumber: 1082,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0))
                                    }, child.id, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                        lineNumber: 1080,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))),
                                provided.placeholder,
                                isCollapsed && block.children && block.children.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 12,
                                        color: "#94a3b8",
                                        fontStyle: "italic",
                                        padding: "4px 0 6px",
                                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                    },
                                    children: "Contenu replié"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                    lineNumber: 1093,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                            lineNumber: 1064,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                    lineNumber: 1056,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
            lineNumber: 719,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    };
    // -------------------
    // Rendu principal
    // -------------------
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            padding: "20px",
            backgroundColor: "#f8fafc"
        },
        children: [
            dragError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: "12px",
                    padding: "8px 12px",
                    backgroundColor: "#fef2f2",
                    border: "1px solid #fecaca",
                    color: "#b91c1c",
                    borderRadius: 6,
                    fontSize: "13px",
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                },
                children: dragError
            }, void 0, false, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                lineNumber: 1119,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("style", {
                children: `
        .block-editor__pulse {
          animation: blockEditorPulse 0.4s ease-in-out 0s 2 alternate;
        }
        @keyframes blockEditorPulse {
          from { box-shadow: 0 0 0 rgba(59, 130, 246, 0.4); }
          to { box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.1); }
        }
        input[data-contact-input]:focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.14);
          outline: none;
        }
      `
            }, void 0, false, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                lineNumber: 1132,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 24,
                    padding: "18px 20px",
                    backgroundColor: "#fff",
                    borderRadius: 12,
                    border: "1px solid #e1e5e9",
                    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 16
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                style: {
                                    margin: 0,
                                    color: "#0f172a",
                                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                                    fontSize: 20,
                                    fontWeight: 700
                                },
                                children: "Compose ton CV bloc par bloc"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 1162,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: "6px 0 0 0",
                                    color: "#475569",
                                    fontSize: 14,
                                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                                    lineHeight: 1.5
                                },
                                children: "Ajoute les sections dont tu as besoin puis glisse‑dépose pour tout réorganiser. Les placements impossibles sont automatiquement bloqués."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 1173,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 1161,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 13,
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    color: "#3b82f6",
                                    letterSpacing: "0.06em",
                                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                },
                                children: "Ajouter un bloc rapidement"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 1193,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                                    gap: 12
                                },
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$types$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getAllowedChildTypesForParent"])(undefined).map((type)=>{
                                    const meta = getBlockMeta(type);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>handleAddBlock(undefined, type),
                                        style: {
                                            textAlign: "left",
                                            padding: "14px 16px",
                                            borderRadius: 10,
                                            border: "1px solid #e2e8f0",
                                            background: "linear-gradient(135deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.95))",
                                            cursor: "pointer",
                                            transition: "transform 0.18s ease, box-shadow 0.18s ease",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 8,
                                            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                        },
                                        onMouseEnter: (e)=>{
                                            e.currentTarget.style.transform = "translateY(-2px)";
                                            e.currentTarget.style.boxShadow = "0 12px 24px rgba(15, 23, 42, 0.08)";
                                        },
                                        onMouseLeave: (e)=>{
                                            e.currentTarget.style.transform = "translateY(0)";
                                            e.currentTarget.style.boxShadow = "none";
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 22
                                                },
                                                "aria-hidden": true,
                                                children: meta.icon
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                                lineNumber: 1241,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontWeight: 700,
                                                            color: meta.color,
                                                            fontSize: 14
                                                        },
                                                        children: meta.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                                        lineNumber: 1245,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            margin: "4px 0 0 0",
                                                            fontSize: 12,
                                                            color: "#64748b",
                                                            lineHeight: 1.4
                                                        },
                                                        children: meta.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                                        lineNumber: 1254,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                                lineNumber: 1244,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, type, true, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                        lineNumber: 1215,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0));
                                })
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 1205,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 1186,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                lineNumber: 1148,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$hello$2d$pangea$2f$dnd__$5b$external$5d$__$2840$hello$2d$pangea$2f$dnd$2c$__cjs$29$__["DragDropContext"], {
                onDragEnd: handleDragEnd,
                onDragStart: handleDragStart,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$hello$2d$pangea$2f$dnd__$5b$external$5d$__$2840$hello$2d$pangea$2f$dnd$2c$__cjs$29$__["Droppable"], {
                    droppableId: "root",
                    type: "ROOT",
                    isDropDisabled: draggingBlockType === "subsection",
                    children: (provided, snapshot)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            ref: provided.innerRef,
                            ...provided.droppableProps,
                            style: {
                                minHeight: "400px",
                                backgroundColor: snapshot.isDraggingOver ? "#f0f9ff" : "transparent",
                                borderRadius: "8px",
                                padding: snapshot.isDraggingOver ? "16px" : "0",
                                border: snapshot.isDraggingOver ? "2px dashed #3b82f6" : "none",
                                transition: "all 0.2s ease"
                            },
                            children: [
                                blocks.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        textAlign: "center",
                                        padding: "40px",
                                        color: "#9ca3af",
                                        fontSize: "16px"
                                    },
                                    children: "Aucun bloc. Ajoutez votre premier bloc pour commencer."
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                    lineNumber: 1289,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)) : blocks.map((block, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$hello$2d$pangea$2f$dnd__$5b$external$5d$__$2840$hello$2d$pangea$2f$dnd$2c$__cjs$29$__["Draggable"], {
                                        draggableId: block.id,
                                        index: index,
                                        children: (provided, snapshot)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                ref: provided.innerRef,
                                                ...provided.draggableProps,
                                                style: {
                                                    ...provided.draggableProps.style,
                                                    opacity: snapshot.isDragging ? 0.8 : 1
                                                },
                                                children: renderBlock(block, undefined, provided.dragHandleProps, snapshot.isDragging)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                                lineNumber: 1301,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                    }, block.id, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                        lineNumber: 1299,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))),
                                provided.placeholder,
                                snapshot.isDraggingOver && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        textAlign: "center",
                                        padding: "20px",
                                        color: "#3b82f6",
                                        fontSize: "14px",
                                        fontWeight: "500"
                                    },
                                    children: "Déposez le bloc ici"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                    lineNumber: 1318,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                            lineNumber: 1276,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                    lineNumber: 1274,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                lineNumber: 1273,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
        lineNumber: 1117,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = BlockEditor;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Desktop/finance-type/my-cv-app/utils/blocksToHTML.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>blocksToHTML
]);
function blocksToHTML(blocks, _fontScale = 1) {
    void _fontScale;
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
"[project]/Desktop/finance-type/my-cv-app/utils/cvStyles.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Desktop/finance-type/my-cv-app/data/initialCV.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "initialBlocks",
    ()=>initialBlocks
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/uuid [external] (uuid, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const initialBlocks = [
    {
        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
        type: "header",
        content: {
            title: "Charles Pelong"
        },
        style: {
            size: "large",
            align: "center"
        }
    },
    {
        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
        type: "contact",
        content: {
            email: "charlespelong@gmail.com",
            phone: "+33 7 83 28 54 92",
            address: "31 Avenue de Verdun, 78290 Croissy-sur-Seine",
            linkedin: "<a href=\"https://fr.linkedin.com/in/charles-pelong-a68212246\">linkedin</a>"
        }
    },
    {
        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
        type: "text",
        content: "<em>Étudiant à IMT Atlantique à la recherche d’un <strong>stage de fin d’études</strong> à partir du <strong>04/2026</strong> dans le domaine de la <strong>science des données</strong> et de l'<strong>apprentissage automatique</strong>.</em>"
    },
    {
        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
        type: "divider"
    },
    {
        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
        type: "section",
        content: {
            title: "FORMATIONS"
        },
        children: [
            {
                id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                type: "subsection",
                content: {
                    title: "IMT Atlantique — Master : Data Science et Recherche Opérationnelle",
                    subtitle: "",
                    period: "09/2022 -- 06/2025"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "• <strong>#3 école d’ingénieurs française</strong>, d'après le <a href=\"https://www.letudiant.fr/classements/classement-des-ecoles-d-ingenieurs.html\">\"Classement de l’Etudiant 2025\"</a><br/>• Cours : Mathématiques appliquées, Statistiques, Probabilités, Machine Learning, Optimisation, Recherche opérationnelle, IA, Python, Java, Anglais"
                    }
                ]
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                type: "subsection",
                content: {
                    title: "Shanghai Jiao Tong University — Master en Informatique et Recherche Opérationnelle",
                    subtitle: "",
                    period: "09/2022 -- 06/2025"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "• <strong>#9 université mondiale</strong> en <strong>Computer Science</strong>, d'après le <a href=\"https://www.shanghairanking.com/rankings/gras/2024/RS0210\">\"Classement de Shanghai 2025\"</a><br/>• Cours : Deep Learning, Computer Vision, Machine Learning, Cloud Computing, Chinois"
                    }
                ]
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                type: "subsection",
                content: {
                    title: "Lycée Pasteur — Classes préparatoires scientifiques PCSI/PC (CPGE)",
                    subtitle: "",
                    period: "09/2020 -- 07/2022"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "• Formation intensive en Mathématiques, Physique, Chimie, Informatique, Français, Anglais"
                    }
                ]
            }
        ]
    },
    {
        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
        type: "divider"
    },
    {
        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
        type: "section",
        content: {
            title: "EXPERIENCES PROFESSIONNELLES"
        },
        children: [
            {
                id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                type: "subsection",
                content: {
                    title: "JCDecaux — Data Scientist",
                    subtitle: "",
                    period: "11/2024 -- 05/2025"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "<em>Stage de 6 mois au sein de la DataCorp, entité de JCDecaux développant des produits data</em>"
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "• Développement de solutions RAG (Retrieval-Augmented Generation) as-a-service (Python, AWS, Langchain). Création de <strong>copilotes IA</strong> à destination :<br/>• des commerciaux pour un accès rapide à des données ciblées et fiables du groupe pour l'<strong>élaboration de devis</strong>.<br/>• de la direction financière permettant la <strong>création de tableaux de bord à partir du langage naturel</strong> basés sur les données du groupe."
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "Ces produits permettent de <strong>réduire drastiquement le temps</strong> de recherche et les frottements entre différentes entités du groupe."
                    }
                ]
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                type: "subsection",
                content: {
                    title: "Sopra Steria Next — Data Analyst / Data Engineer",
                    subtitle: "",
                    period: "04/2024 -- 10/2024"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "<em>Stage de 6 mois, mission de conseil orientée data pour le compte du Ministère de l’Intérieur</em>"
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "• Collecte et traitement de données incluant du <strong>web scraping</strong> et <strong>extraction</strong> depuis diverses sources (Python, Selenium).<br/>• Création de pipelines de données pour automatiser l’<strong>intégration</strong> et le <strong>nettoyage</strong> (Python, Pandas, M/Power BI).<br/>• Production de <strong>tableaux de bord</strong> et <strong>rapports automatisés</strong> pour suivre les indicateurs de performance (Power BI, Python)."
                    }
                ]
            }
        ]
    },
    {
        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
        type: "divider"
    },
    {
        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
        type: "section",
        content: {
            title: "AUTRES EXPERIENCES"
        },
        children: [
            {
                id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                type: "subsection",
                content: {
                    title: "Junior Atlantique – Timber Productions — Développeur logiciel",
                    subtitle: "",
                    period: "05/2023 -- 10/2023"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "• Développement complet d’une application de gestion et recherche de contacts clients (JavaScript).<br/>• Vente de l’application pour <strong>3 000€</strong>."
                    }
                ]
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                type: "subsection",
                content: {
                    title: "Reeverse Systems — Chef de projet",
                    subtitle: "",
                    period: "09/2023 -- 01/2024"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "<em>Projet académique de 4 mois avec Reeverse Systems, élaboration d'un simulateur pour démontrer <br/> l’efficacité de leur solution : réduction des déchets industriels et maximisation des rendements.</em>"
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "• Conception d’un simulateur multi-objectifs pour la production industrielle (Python, Matplotlib) :<br/>• Génération de données aléatoires suivant différentes lois pour simuler plusieurs facteurs (nombre d’ouvriers, poids des déchets, etc.).<br/>• Création de <strong>fronts de Pareto</strong> et visualisation sous forme de <strong>graphes radar</strong> (Python, Matplotlib).<br/>• Clustering <strong>K-means</strong> sur le front de Pareto pour ne présenter que 5 solutions représentatives."
                    }
                ]
            }
        ]
    },
    {
        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
        type: "divider"
    },
    {
        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
        type: "section",
        content: {
            title: "COMPETENCES, LANGUES ET ACTIVITES"
        },
        children: [
            {
                id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                type: "text",
                content: "<strong>Langues :</strong> Français (natif), Anglais (IELTS 7/9), Espagnol (A2), Allemand (A2)<br/><strong>Programmation :</strong> Python (Pandas, Scikit-learn), SQL, GitHub, Java, JavaScript, M/Power BI<br/><strong>Machine Learning :</strong> Kaggle competitions (stacking LGBM+CatBoost sur les prix de voitures d’occasion), étude de cas <a href=\"https://colab.research.google.com/drive/1onv9AMOuMZQ_lIy7tBFuBrV1Pg3gU0fa#scrollTo=166cd074-f8c4-4f9d-9787-275a2a4e08af\">Roland Berger</a> (cliniques dentaires)<br/><strong>Sports :</strong> Judo, Rugby (capitaine et responsable de l’équipe de l’école)<br/><strong>Bénévolat :</strong> Scouts (10 ans) + mission humanitaire (1 mois)"
            }
        ]
    }
];
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>CvGeneratorPage,
    "getServerSideProps",
    ()=>getServerSideProps
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$auth$2d$helpers$2d$nextjs__$5b$external$5d$__$2840$supabase$2f$auth$2d$helpers$2d$nextjs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@supabase/auth-helpers-nextjs [external] (@supabase/auth-helpers-nextjs, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$components$2f$DynamicHeader$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$resizable$2d$panels__$5b$external$5d$__$28$react$2d$resizable$2d$panels$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/react-resizable-panels [external] (react-resizable-panels, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$components$2f$BlockEditor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$blocksToHTML$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/utils/blocksToHTML.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$cvStyles$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/utils/cvStyles.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$data$2f$initialCV$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/data/initialCV.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$resizable$2d$panels__$5b$external$5d$__$28$react$2d$resizable$2d$panels$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$components$2f$BlockEditor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$data$2f$initialCV$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$resizable$2d$panels__$5b$external$5d$__$28$react$2d$resizable$2d$panels$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$components$2f$BlockEditor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$data$2f$initialCV$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
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
function CvGeneratorPage() {
    console.log("CvGeneratorPage component rendered");
    // IDs stables: charger depuis localStorage si disponible
    const [blocks, setBlocks] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [fontScale, setFontScale] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(1);
    const [showWarning, setShowWarning] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [saveState, setSaveState] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('idle');
    const [saveMessage, setSaveMessage] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const previewRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const editorScrollRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    // Charger/Sauvegarder les blocs pour stabiliser les IDs (éviter HMR qui regénère)
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }, [
        blocks
    ]);
    // Calcul de la taille optimale
    const calculateOptimalFontScale = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(()=>{
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
        while(currentScale > 0.5){
            tempDiv.innerHTML = `<style>${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$cvStyles$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["default"])(currentScale)}</style>` + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$blocksToHTML$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["default"])(blocks, currentScale);
            const contentHeight = tempDiv.scrollHeight;
            if (contentHeight <= maxHeight) {
                scale = currentScale;
                break;
            }
            currentScale -= step;
        }
        document.body.removeChild(tempDiv);
        return scale;
    }, [
        blocks
    ]);
    // Vérifier le dépassement à chaque changement de blocks avec délai
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const timer = setTimeout(()=>{
            const scale = calculateOptimalFontScale();
            setFontScale(scale);
            setShowWarning(scale < 1);
        }, 100);
        return ()=>clearTimeout(timer);
    }, [
        calculateOptimalFontScale
    ]);
    const handleGeneratePDF = async ()=>{
        console.log("Generating PDF...", {
            blocks,
            fontScale
        });
        try {
            console.log("Making fetch request to /api/generate-pdf");
            const res = await fetch("/api/generate-pdf", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    blocks,
                    fontScale
                })
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
    const handleSaveCv = async ()=>{
        if (isSaving) return;
        setIsSaving(true);
        setSaveState('idle');
        setSaveMessage(null);
        try {
            const res = await fetch('/api/cv/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    blocks,
                    fontScale
                })
            });
            if (!res.ok) {
                const data = await res.json().catch(()=>({}));
                throw new Error(typeof data.error === 'string' ? data.error : 'Impossible de sauvegarder le CV.');
            }
            setSaveState('success');
            setSaveMessage('CV sauvegardé avec succès.');
        } catch (error) {
            setSaveState('error');
            setSaveMessage(error instanceof Error ? error.message : 'Impossible de sauvegarder le CV.');
        } finally{
            setIsSaving(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (saveState === 'idle') return;
        const timer = setTimeout(()=>{
            setSaveState('idle');
            setSaveMessage(null);
        }, 3000);
        return ()=>clearTimeout(timer);
    }, [
        saveState
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("style", {
                children: styles
            }, void 0, false, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                lineNumber: 188,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("style", {
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$cvStyles$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["default"])(fontScale)
            }, void 0, false, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                lineNumber: 189,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$components$2f$DynamicHeader$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                variant: "landing",
                scrollContainerRef: editorScrollRef
            }, void 0, false, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$resizable$2d$panels__$5b$external$5d$__$28$react$2d$resizable$2d$panels$2c$__esm_import$29$__["PanelGroup"], {
                direction: "horizontal",
                style: {
                    height: "100vh"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$resizable$2d$panels__$5b$external$5d$__$28$react$2d$resizable$2d$panels$2c$__esm_import$29$__["Panel"], {
                        defaultSize: 60,
                        minSize: 30,
                        maxSize: 80,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                height: "100%",
                                padding: "1rem",
                                overflow: "auto"
                            },
                            ref: editorScrollRef,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$components$2f$BlockEditor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                blocks: blocks,
                                setBlocks: setBlocks,
                                scrollContainerRef: editorScrollRef
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                                lineNumber: 204,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                            lineNumber: 199,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$resizable$2d$panels__$5b$external$5d$__$28$react$2d$resizable$2d$panels$2c$__esm_import$29$__["PanelResizeHandle"], {
                        style: {
                            width: "8px",
                            backgroundColor: "#e1e5e9",
                            cursor: "col-resize",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                width: "2px",
                                height: "40px",
                                backgroundColor: "#9ca3af",
                                borderRadius: "1px"
                            }
                        }, void 0, false, {
                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                            lineNumber: 219,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                        lineNumber: 209,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$resizable$2d$panels__$5b$external$5d$__$28$react$2d$resizable$2d$panels$2c$__esm_import$29$__["Panel"], {
                        defaultSize: 50,
                        minSize: 45,
                        maxSize: 60,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                height: "100vh",
                                overflow: "hidden",
                                backgroundColor: "#f8fafc",
                                padding: "0.5rem",
                                borderLeft: "1px solid #e1e5e9",
                                display: "flex",
                                flexDirection: "column"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    overflow: "auto",
                                    marginBottom: "0.5rem"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
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
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    gap: "8px",
                                                    flexWrap: "wrap"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        onClick: handleSaveCv,
                                                        style: {
                                                            padding: "12px 16px",
                                                            backgroundColor: "#0f172a",
                                                            color: "white",
                                                            border: "none",
                                                            borderRadius: "6px",
                                                            cursor: isSaving ? "not-allowed" : "pointer",
                                                            opacity: isSaving ? 0.7 : 1,
                                                            fontSize: "14px",
                                                            fontWeight: 600,
                                                            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                                        },
                                                        disabled: isSaving,
                                                        children: isSaving ? "Sauvegarde..." : "Sauvegarder"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                                                        lineNumber: 268,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        onClick: handleGeneratePDF,
                                                        style: {
                                                            padding: "12px 16px",
                                                            backgroundColor: "#3b82f6",
                                                            color: "white",
                                                            border: "none",
                                                            borderRadius: "6px",
                                                            cursor: "pointer",
                                                            fontSize: "14px",
                                                            fontWeight: 600,
                                                            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                                        },
                                                        children: "Générer PDF"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                                                        lineNumber: 286,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                                                lineNumber: 261,
                                                columnNumber: 17
                                            }, this),
                                            saveMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "13px",
                                                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                                                    color: saveState === 'success' ? "#047857" : "#dc2626"
                                                },
                                                children: saveMessage
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                                                lineNumber: 304,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                                        lineNumber: 245,
                                        columnNumber: 15
                                    }, this),
                                    showWarning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            backgroundColor: "#fff3cd",
                                            border: "1px solid #ffeaa7",
                                            borderRadius: "4px",
                                            padding: "8px 12px",
                                            margin: "10px 0",
                                            color: "#856404",
                                            fontSize: "14px",
                                            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                                            fontWeight: "500"
                                        },
                                        children: [
                                            "⚠️ Attention : Tu dépasses la première page ! La taille de police a été réduite à ",
                                            Math.round(fontScale * 100),
                                            "% pour tenir sur une page."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                                        lineNumber: 317,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {},
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            ref: previewRef,
                                            className: "preview-cv",
                                            style: {
                                                width: "210mm",
                                                minHeight: "297mm",
                                                padding: "15mm",
                                                border: "1px solid #000",
                                                boxSizing: "border-box",
                                                backgroundColor: "#fff",
                                                transform: "scale(0.8)",
                                                transformOrigin: "top left",
                                                marginBottom: "0.1rem"
                                            },
                                            dangerouslySetInnerHTML: {
                                                __html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$blocksToHTML$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["default"])(blocks, fontScale)
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                                            lineNumber: 334,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                                        lineNumber: 332,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                                lineNumber: 239,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                            lineNumber: 229,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                        lineNumber: 228,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
async function getServerSideProps(context) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$auth$2d$helpers$2d$nextjs__$5b$external$5d$__$2840$supabase$2f$auth$2d$helpers$2d$nextjs$2c$__cjs$29$__["createPagesServerClient"])(context);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        const redirectDestination = `/login?redirect=${encodeURIComponent(context.resolvedUrl ?? '/cv')}`;
        return {
            redirect: {
                destination: redirectDestination,
                permanent: false
            }
        };
    }
    return {
        props: {
            initialSession: session
        }
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__314e6573._.js.map