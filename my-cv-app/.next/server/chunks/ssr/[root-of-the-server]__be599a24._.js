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
"[externals]/uuid [external] (uuid, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("uuid");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/Desktop/finance-type/my-cv-app/data/initialCV.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "createInitialBlocks",
    ()=>createInitialBlocks,
    "initialBlocks",
    ()=>initialBlocks
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/uuid [external] (uuid, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const TEMPLATE = [
    {
        type: 'header',
        content: {
            title: 'Charles Pelong'
        },
        style: {
            size: 'large',
            align: 'center'
        }
    },
    {
        type: 'contact',
        content: {
            email: 'charlespelong@gmail.com',
            phone: '+33 7 83 28 54 92',
            address: '31 Avenue de Verdun, 78290 Croissy-sur-Seine',
            linkedin: '<a href="https://fr.linkedin.com/in/charles-pelong-a68212246">linkedin</a>'
        }
    },
    {
        type: 'text',
        content: "<em>Étudiant à IMT Atlantique à la recherche d’un <strong>stage de fin d’études</strong> à partir du <strong>04/2026</strong> dans le domaine de la <strong>science des données</strong> et de l'<strong>apprentissage automatique</strong>.</em>"
    },
    {
        type: 'divider'
    },
    {
        type: 'section',
        content: {
            title: 'FORMATIONS'
        },
        children: [
            {
                type: 'subsection',
                content: {
                    title: 'IMT Atlantique — Master : Data Science et Recherche Opérationnelle',
                    subtitle: '',
                    period: '09/2022 -- 06/2025'
                },
                children: [
                    {
                        type: 'text',
                        content: "• <strong>#3 école d’ingénieurs française</strong>, d'après le <a href=\"https://www.letudiant.fr/classements/classement-des-ecoles-d-ingenieurs.html\">\"Classement de l’Etudiant 2025\"</a><br/>• Cours : Mathématiques appliquées, Statistiques, Probabilités, Machine Learning, Optimisation, Recherche opérationnelle, IA, Python, Java, Anglais"
                    }
                ]
            },
            {
                type: 'subsection',
                content: {
                    title: 'Shanghai Jiao Tong University — Master en Informatique et Recherche Opérationnelle',
                    subtitle: '',
                    period: '09/2022 -- 06/2025'
                },
                children: [
                    {
                        type: 'text',
                        content: "• <strong>#9 université mondiale</strong> en <strong>Computer Science</strong>, d'après le <a href=\"https://www.shanghairanking.com/rankings/gras/2024/RS0210\">\"Classement de Shanghai 2025\"</a><br/>• Cours : Deep Learning, Computer Vision, Machine Learning, Cloud Computing, Chinois"
                    }
                ]
            },
            {
                type: 'subsection',
                content: {
                    title: 'Lycée Pasteur — Classes préparatoires scientifiques PCSI/PC (CPGE)',
                    subtitle: '',
                    period: '09/2020 -- 07/2022'
                },
                children: [
                    {
                        type: 'text',
                        content: '• Formation intensive en Mathématiques, Physique, Chimie, Informatique, Français, Anglais'
                    }
                ]
            }
        ]
    },
    {
        type: 'divider'
    },
    {
        type: 'section',
        content: {
            title: 'EXPERIENCES PROFESSIONNELLES'
        },
        children: [
            {
                type: 'subsection',
                content: {
                    title: 'JCDecaux — Data Scientist',
                    subtitle: '',
                    period: '11/2024 -- 05/2025'
                },
                children: [
                    {
                        type: 'text',
                        content: "<em>Stage de 6 mois au sein de la DataCorp, entité de JCDecaux développant des produits data</em>"
                    },
                    {
                        type: 'text',
                        content: "• Développement de solutions RAG (Retrieval-Augmented Generation) as-a-service (Python, AWS, Langchain). Création de <strong>copilotes IA</strong> à destination :<br/>• des commerciaux pour un accès rapide à des données ciblées et fiables du groupe pour l'<strong>élaboration de devis</strong>.<br/>• de la direction financière permettant la <strong>création de tableaux de bord à partir du langage naturel</strong> basés sur les données du groupe."
                    },
                    {
                        type: 'text',
                        content: 'Ces produits permettent de <strong>réduire drastiquement le temps</strong> de recherche et les frottements entre différentes entités du groupe.'
                    }
                ]
            },
            {
                type: 'subsection',
                content: {
                    title: 'Sopra Steria Next — Data Analyst / Data Engineer',
                    subtitle: '',
                    period: '04/2024 -- 10/2024'
                },
                children: [
                    {
                        type: 'text',
                        content: "<em>Stage de 6 mois, mission de conseil orientée data pour le compte du Ministère de l’Intérieur</em>"
                    },
                    {
                        type: 'text',
                        content: "• Collecte et traitement de données incluant du <strong>web scraping</strong> et <strong>extraction</strong> depuis diverses sources (Python, Selenium).<br/>• Création de pipelines de données pour automatiser l’<strong>intégration</strong> et le <strong>nettoyage</strong> (Python, Pandas, M/Power BI).<br/>• Production de <strong>tableaux de bord</strong> et <strong>rapports automatisés</strong> pour suivre les indicateurs de performance (Power BI, Python)."
                    }
                ]
            }
        ]
    },
    {
        type: 'divider'
    },
    {
        type: 'section',
        content: {
            title: 'AUTRES EXPERIENCES'
        },
        children: [
            {
                type: 'subsection',
                content: {
                    title: 'Junior Atlantique – Timber Productions — Développeur logiciel',
                    subtitle: '',
                    period: '05/2023 -- 10/2023'
                },
                children: [
                    {
                        type: 'text',
                        content: "• Développement complet d’une application de gestion et recherche de contacts clients (JavaScript).<br/>• Vente de l’application pour <strong>3 000€</strong>."
                    }
                ]
            },
            {
                type: 'subsection',
                content: {
                    title: 'Reeverse Systems — Chef de projet',
                    subtitle: '',
                    period: '09/2023 -- 01/2024'
                },
                children: [
                    {
                        type: 'text',
                        content: "<em>Projet académique de 4 mois avec Reeverse Systems, élaboration d'un simulateur pour démontrer <br/> l’efficacité de leur solution : réduction des déchets industriels et maximisation des rendements.</em>"
                    },
                    {
                        type: 'text',
                        content: "• Conception d’un simulateur multi-objectifs pour la production industrielle (Python, Matplotlib) :<br/>• Génération de données aléatoires suivant différentes lois pour simuler plusieurs facteurs (nombre d’ouvriers, poids des déchets, etc.).<br/>• Création de <strong>fronts de Pareto</strong> et visualisation sous forme de <strong>graphes radar</strong> (Python, Matplotlib).<br/>• Clustering <strong>K-means</strong> sur le front de Pareto pour ne présenter que 5 solutions représentatives."
                    }
                ]
            }
        ]
    },
    {
        type: 'divider'
    },
    {
        type: 'section',
        content: {
            title: 'COMPETENCES, LANGUES ET ACTIVITES'
        },
        children: [
            {
                type: 'text',
                content: '• Compétences : Python, TypeScript, SQL, Power BI, Machine Learning, Deep Learning, Optimisation, RAG, LangChain, AWS, Git<br/>• Langues : Français (natif), Anglais (C1), Chinois (B1)<br/>• Activités : Rugby (FFR), Piano, Mentorat étudiants'
            }
        ]
    }
];
const cloneBlocks = (templates)=>templates.map((template)=>({
            id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
            type: template.type,
            content: template.content,
            style: template.style,
            children: template.children ? cloneBlocks(template.children) : undefined
        }));
const createInitialBlocks = ()=>cloneBlocks(TEMPLATE);
const initialBlocks = createInitialBlocks();
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>MesCvPage,
    "getServerSideProps",
    ()=>getServerSideProps
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$auth$2d$helpers$2d$nextjs__$5b$external$5d$__$2840$supabase$2f$auth$2d$helpers$2d$nextjs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@supabase/auth-helpers-nextjs [external] (@supabase/auth-helpers-nextjs, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$components$2f$DynamicHeader$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$data$2f$initialCV$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/data/initialCV.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$data$2f$initialCV$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$data$2f$initialCV$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
function MesCvPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [cvs, setCvs] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [isCreating, setIsCreating] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [deletingId, setDeletingId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const fetchCvs = async ()=>{
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/cv/list');
            if (!res.ok) {
                const data = await res.json().catch(()=>({}));
                throw new Error(typeof data.error === 'string' ? data.error : 'Impossible de charger les CV.');
            }
            const { cvs: list } = await res.json();
            setCvs(list);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Impossible de charger les CV.');
        } finally{
            setIsLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        fetchCvs().catch(()=>{});
    }, []);
    const handleCreateCv = async ()=>{
        if (isCreating) return;
        setIsCreating(true);
        setError(null);
        try {
            const blocks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$data$2f$initialCV$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["createInitialBlocks"])();
            const res = await fetch('/api/cv/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: 'Nouveau CV',
                    blocks,
                    fontScale: 1
                })
            });
            if (!res.ok) {
                const data = await res.json().catch(()=>({}));
                throw new Error(typeof data.error === 'string' ? data.error : 'Impossible de créer le CV.');
            }
            const { cv } = await res.json();
            if (cv?.id) {
                router.push({
                    pathname: '/cv',
                    query: {
                        id: cv.id
                    }
                }).catch(()=>{});
                return;
            }
            await fetchCvs();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Impossible de créer le CV.');
        } finally{
            setIsCreating(false);
        }
    };
    const handleDeleteCv = async (id)=>{
        if (deletingId) return;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        setDeletingId(id);
        setError(null);
        try {
            const res = await fetch(`/api/cv/delete?id=${encodeURIComponent(id)}`, {
                method: 'DELETE'
            });
            if (!res.ok) {
                const data = await res.json().catch(()=>({}));
                throw new Error(typeof data.error === 'string' ? data.error : 'Impossible de supprimer le CV.');
            }
            setCvs((previous)=>previous.filter((cv)=>cv.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Impossible de supprimer le CV.');
        } finally{
            setDeletingId(null);
        }
    };
    const formatDate = (value)=>new Date(value).toLocaleString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            minHeight: '100vh',
            backgroundColor: 'rgba(2, 6, 23, 0.95)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$components$2f$DynamicHeader$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                variant: "landing"
            }, void 0, false, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                style: {
                    maxWidth: '960px',
                    margin: '0 auto',
                    padding: '32px 16px',
                    color: '#e2e8f0',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            marginBottom: '24px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontSize: '32px',
                                    fontWeight: 800
                                },
                                children: "Mes CV sauvegardés"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: '15px',
                                    color: '#cbd5f5'
                                },
                                children: "Retrouvez tous vos CV générés. Cliquez sur l'un d'eux pour continuer la modification."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                lineNumber: 115,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: '12px',
                                    flexWrap: 'wrap'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleCreateCv,
                                        disabled: isCreating,
                                        style: {
                                            padding: '12px 20px',
                                            borderRadius: '10px',
                                            border: 'none',
                                            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                                            color: '#fff',
                                            fontWeight: 700,
                                            cursor: isCreating ? 'not-allowed' : 'pointer',
                                            opacity: isCreating ? 0.7 : 1
                                        },
                                        children: isCreating ? 'Création…' : 'Créer un nouveau CV'
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                        lineNumber: 119,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/cv",
                                        style: {
                                            padding: '12px 20px',
                                            borderRadius: '10px',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            color: '#e2e8f0',
                                            textDecoration: 'none',
                                            fontWeight: 600
                                        },
                                        children: "Revenir à l'éditeur"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                        lineNumber: 136,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    backgroundColor: '#fee2e2',
                                    border: '1px solid #fecaca',
                                    color: '#b91c1c',
                                    padding: '10px 12px',
                                    borderRadius: '6px',
                                    fontSize: '14px'
                                },
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                lineNumber: 151,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        style: {
                            color: '#cbd5f5'
                        },
                        children: "Chargement..."
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                        lineNumber: 158,
                        columnNumber: 11
                    }, this) : cvs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            backgroundColor: 'rgba(15, 23, 42, 0.4)',
                            border: '1px solid rgba(148, 163, 184, 0.3)',
                            borderRadius: '12px',
                            padding: '32px',
                            textAlign: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: '16px',
                                    color: '#cbd5f5'
                                },
                                children: "Vous n'avez pas encore de CV sauvegardé."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                lineNumber: 161,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleCreateCv,
                                disabled: isCreating,
                                style: {
                                    marginTop: '16px',
                                    padding: '12px 20px',
                                    borderRadius: '10px',
                                    border: 'none',
                                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                                    color: '#fff',
                                    fontWeight: 700,
                                    cursor: isCreating ? 'not-allowed' : 'pointer',
                                    opacity: isCreating ? 0.7 : 1
                                },
                                children: isCreating ? 'Création…' : 'Créer mon premier CV'
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                        lineNumber: 160,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gap: '16px',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleCreateCv,
                                disabled: isCreating,
                                style: {
                                    background: 'rgba(59, 130, 246, 0.12)',
                                    border: '1px dashed rgba(59, 130, 246, 0.45)',
                                    borderRadius: '12px',
                                    padding: '18px',
                                    textAlign: 'left',
                                    color: '#93c5fd',
                                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                                    cursor: isCreating ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '6px',
                                    opacity: isCreating ? 0.6 : 1,
                                    transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                                },
                                onMouseEnter: (event)=>{
                                    const target = event.currentTarget;
                                    if (!isCreating) {
                                        target.style.transform = 'translateY(-2px)';
                                        target.style.boxShadow = '0 10px 24px rgba(59, 130, 246, 0.25)';
                                    }
                                },
                                onMouseLeave: (event)=>{
                                    const target = event.currentTarget;
                                    target.style.transform = 'translateY(0)';
                                    target.style.boxShadow = 'none';
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '18px',
                                            fontWeight: 700,
                                            color: '#bfdbfe'
                                        },
                                        children: "+ Créer un autre CV"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                        lineNumber: 215,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '13px',
                                            color: '#cbd5f5'
                                        },
                                        children: "Lance un nouveau CV vierge tout en conservant les précédents."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                        lineNumber: 216,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                lineNumber: 183,
                                columnNumber: 13
                            }, this),
                            cvs.map((cv)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>router.push({
                                            pathname: '/cv',
                                            query: {
                                                id: cv.id
                                            }
                                        }).catch(()=>{}),
                                    style: {
                                        background: 'rgba(15, 23, 42, 0.5)',
                                        border: '1px solid rgba(148, 163, 184, 0.25)',
                                        borderRadius: '12px',
                                        padding: '18px',
                                        textAlign: 'left',
                                        color: '#e2e8f0',
                                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px',
                                        transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                                    },
                                    onMouseEnter: (event)=>{
                                        const target = event.currentTarget;
                                        target.style.transform = 'translateY(-2px)';
                                        target.style.boxShadow = '0 10px 24px rgba(15, 23, 42, 0.35)';
                                    },
                                    onMouseLeave: (event)=>{
                                        const target = event.currentTarget;
                                        target.style.transform = 'translateY(0)';
                                        target.style.boxShadow = 'none';
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start',
                                                gap: '8px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: '16px',
                                                        fontWeight: 700
                                                    },
                                                    children: cv.title || 'CV sans titre'
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                                    lineNumber: 251,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: (event)=>{
                                                        event.stopPropagation();
                                                        handleDeleteCv(cv.id);
                                                    },
                                                    disabled: deletingId === cv.id,
                                                    style: {
                                                        background: 'rgba(239, 68, 68, 0.15)',
                                                        border: '1px solid rgba(239, 68, 68, 0.35)',
                                                        color: '#fca5a5',
                                                        borderRadius: '8px',
                                                        padding: '6px 10px',
                                                        fontSize: '12px',
                                                        fontWeight: 600,
                                                        cursor: deletingId === cv.id ? 'not-allowed' : 'pointer',
                                                        transition: 'background-color 0.15s ease'
                                                    },
                                                    onMouseEnter: (event)=>{
                                                        const target = event.currentTarget;
                                                        if (deletingId !== cv.id) {
                                                            target.style.backgroundColor = 'rgba(239, 68, 68, 0.25)';
                                                        }
                                                    },
                                                    onMouseLeave: (event)=>{
                                                        const target = event.currentTarget;
                                                        target.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
                                                    },
                                                    children: deletingId === cv.id ? 'Suppression…' : 'Supprimer'
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                                    lineNumber: 252,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                            lineNumber: 250,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: '13px',
                                                color: '#cbd5f5'
                                            },
                                            children: [
                                                "Modifié le ",
                                                formatDate(cv.updated_at)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                            lineNumber: 284,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: '12px',
                                                color: '#94a3b8'
                                            },
                                            children: [
                                                "Créé le ",
                                                formatDate(cv.created_at)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                            lineNumber: 285,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, cv.id, true, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                    lineNumber: 222,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                        lineNumber: 182,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
async function getServerSideProps(context) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$auth$2d$helpers$2d$nextjs__$5b$external$5d$__$2840$supabase$2f$auth$2d$helpers$2d$nextjs$2c$__cjs$29$__["createPagesServerClient"])(context);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        return {
            redirect: {
                destination: '/login?redirect=/mes-cv',
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

//# sourceMappingURL=%5Broot-of-the-server%5D__be599a24._.js.map