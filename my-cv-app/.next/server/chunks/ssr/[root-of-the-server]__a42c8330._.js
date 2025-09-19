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
            const currentScrollY = scrollElement === window ? window.scrollY : scrollElement.scrollTop;
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
"[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/link.js [ssr] (ecmascript)");
;
;
function Footer() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
        style: {
            backgroundColor: "rgba(2, 6, 23, 0.95)",
            padding: "64px 0 32px 0"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            style: {
                width: "100%",
                maxWidth: "1100px",
                margin: "0 auto",
                padding: "0 20px"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr 1fr 1fr",
                        gap: "48px",
                        marginBottom: "48px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                    style: {
                                        color: "#ffffff",
                                        fontSize: "24px",
                                        fontWeight: 800,
                                        margin: "0 0 16px 0",
                                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                    },
                                    children: "Finance CV"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                                    lineNumber: 28,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: "#e2e8f0",
                                        fontSize: "16px",
                                        lineHeight: 1.6,
                                        margin: "0 0 24px 0",
                                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                    },
                                    children: "Générateur automatique de CV type finance avec IA. Créez votre CV professionnel optimisé pour les ATS des plus grandes banques et fonds d'investissement."
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                                    lineNumber: 37,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/cv",
                                    style: {
                                        padding: "12px 24px",
                                        background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                                        color: "#ffffff",
                                        borderRadius: "12px",
                                        textDecoration: "none",
                                        fontWeight: 700,
                                        fontSize: "16px",
                                        display: "inline-block",
                                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                    },
                                    children: "Créer mon CV"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                                    lineNumber: 46,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                    style: {
                                        color: "#ffffff",
                                        fontSize: "18px",
                                        fontWeight: 700,
                                        margin: "0 0 16px 0",
                                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                    },
                                    children: "Liens rapides"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "12px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/cv",
                                            style: {
                                                color: "#e2e8f0",
                                                textDecoration: "none",
                                                fontSize: "16px",
                                                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                            },
                                            children: "Générateur CV"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                                            lineNumber: 73,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/a-propos",
                                            style: {
                                                color: "#e2e8f0",
                                                textDecoration: "none",
                                                fontSize: "16px",
                                                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                            },
                                            children: "À propos"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                                            lineNumber: 81,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                            lineNumber: 62,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                    style: {
                                        color: "#ffffff",
                                        fontSize: "18px",
                                        fontWeight: 700,
                                        margin: "0 0 16px 0",
                                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                    },
                                    children: "Fonctionnalités"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                                    lineNumber: 94,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "12px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "#e2e8f0",
                                                fontSize: "16px",
                                                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                            },
                                            children: "IA intégrée"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                                            lineNumber: 104,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "#e2e8f0",
                                                fontSize: "16px",
                                                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                            },
                                            children: "Optimisé ATS"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                                            lineNumber: 111,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "#e2e8f0",
                                                fontSize: "16px",
                                                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                            },
                                            children: "Export PDF"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                                            lineNumber: 118,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                    style: {
                                        color: "#ffffff",
                                        fontSize: "18px",
                                        fontWeight: 700,
                                        margin: "0 0 16px 0",
                                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                    },
                                    children: "Secteurs"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                                    lineNumber: 130,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "12px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "#e2e8f0",
                                                fontSize: "16px",
                                                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                            },
                                            children: "M&A"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                                            lineNumber: 140,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "#e2e8f0",
                                                fontSize: "16px",
                                                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                            },
                                            children: "Marchés"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                                            lineNumber: 147,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "#e2e8f0",
                                                fontSize: "16px",
                                                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                            },
                                            children: "Asset Management"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                                            lineNumber: 154,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                                    lineNumber: 139,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                            lineNumber: 129,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        borderTop: "1px solid rgba(255,255,255,0.1)",
                        paddingTop: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "16px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            style: {
                                color: "#94a3b8",
                                fontSize: "14px",
                                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                            },
                            children: [
                                "© ",
                                new Date().getFullYear(),
                                " Finance CV. Tous droits réservés."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                            lineNumber: 175,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: "24px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "#94a3b8",
                                        fontSize: "14px",
                                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                    },
                                    children: "Gratuit"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                                    lineNumber: 183,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "#94a3b8",
                                        fontSize: "14px",
                                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                    },
                                    children: "Sans inscription"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                                    lineNumber: 190,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                            lineNumber: 182,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
                    lineNumber: 166,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/finance-type/my-cv-app/pages/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LandingPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$components$2f$DynamicHeader$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$components$2f$Footer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/components/Footer.tsx [ssr] (ecmascript)");
;
;
;
;
;
function LandingPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            backgroundColor: "rgba(2, 6, 23, 0.95)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$components$2f$DynamicHeader$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                variant: "landing"
            }, void 0, false, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                style: {
                    position: "relative",
                    overflow: "hidden"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            inset: 0,
                            backgroundImage: "url(/Singapore-financial-hub-1024x585.jpg)",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            filter: "blur(3px)",
                            transform: "scale(1.02)",
                            zIndex: 0
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(180deg, rgba(2, 6, 23, 0.55), rgba(2, 6, 23, 0.48))",
                            zIndex: 1
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            position: "relative",
                            zIndex: 2,
                            maxWidth: "1100px",
                            margin: "0 auto",
                            padding: "56px 20px 24px 20px",
                            display: "grid",
                            gridTemplateColumns: "1.3fr 0.7fr",
                            gap: "32px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontSize: "56px",
                                            lineHeight: 1.1,
                                            margin: 0,
                                            color: "#ffffff",
                                            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                                            fontWeight: 800,
                                            letterSpacing: "-0.02em"
                                        },
                                        children: "Générateur automatique de CV type finance avec IA"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                        lineNumber: 43,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                        style: {
                                            marginTop: "24px",
                                            color: "#e2e8f0",
                                            fontSize: "20px",
                                            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                                            fontWeight: 500,
                                            lineHeight: 1.6,
                                            paddingLeft: "24px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                children: "CV finance professionnel généré automatiquement"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                                lineNumber: 63,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                children: "Format 1 page, optimisé ATS pour banques et fonds"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                                lineNumber: 64,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                children: "Gratuit et téléchargeable en PDF instantanément"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                                lineNumber: 65,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                        lineNumber: 54,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            gap: "16px",
                                            marginTop: "28px",
                                            flexWrap: "wrap"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/cv",
                                            style: {
                                                padding: "20px 36px",
                                                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                                                color: "#ffffff",
                                                borderRadius: "18px",
                                                textDecoration: "none",
                                                fontWeight: 900,
                                                fontSize: "20px",
                                                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                                                letterSpacing: "-0.01em",
                                                boxShadow: "0 14px 36px rgba(59, 130, 246, 0.45), 0 5px 14px rgba(0, 0, 0, 0.18)",
                                                border: "2px solid rgba(255, 255, 255, 0.12)",
                                                transition: "all 0.3s ease",
                                                display: "inline-block",
                                                textAlign: "center",
                                                minWidth: "220px"
                                            },
                                            children: "Créer mon CV"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 68,
                                            columnNumber: 13
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                        lineNumber: 67,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                lineNumber: 42,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    src: "/CV_John_Doe.png",
                                    alt: "Exemple de CV finance lisible ATS",
                                    style: {
                                        maxWidth: "100%",
                                        maxHeight: "500px",
                                        width: "auto",
                                        height: "auto",
                                        display: "block",
                                        borderRadius: "8px",
                                        objectFit: "contain"
                                    },
                                    onError: (event)=>{
                                        const image = event.currentTarget;
                                        image.style.display = "none";
                                        const parent = image.parentElement;
                                        if (parent) {
                                            parent.style.display = "flex";
                                            parent.style.alignItems = "center";
                                            parent.style.justifyContent = "center";
                                            parent.style.color = "#334155";
                                            parent.style.height = "420px";
                                            parent.textContent = "Dépose l'image cv-example.png dans /public pour afficher un aperçu.";
                                        }
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                    lineNumber: 88,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                lineNumber: 87,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                        lineNumber: 32,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                style: {
                    padding: "48px 0",
                    overflow: "hidden"
                },
                className: "jsx-e8c388d9017a286c",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            maxWidth: "1400px",
                            margin: "0 auto",
                            padding: "0 20px",
                            textAlign: "center"
                        },
                        className: "jsx-e8c388d9017a286c",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    color: "#e2e8f0",
                                    fontSize: "18px",
                                    fontWeight: 600,
                                    margin: "0 0 32px 0",
                                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                },
                                className: "jsx-e8c388d9017a286c",
                                children: "Nos étudiants ont été recrutés par :"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    position: "relative",
                                    width: "100%",
                                    overflow: "hidden",
                                    backgroundColor: "#ffffff",
                                    borderRadius: "12px",
                                    padding: "20px 0"
                                },
                                className: "jsx-e8c388d9017a286c",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "80px",
                                        width: "max-content"
                                    },
                                    className: "jsx-e8c388d9017a286c" + " " + "scroll-container",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/BNP-Paribas-Emblem.png",
                                            alt: "BNP Paribas",
                                            style: {
                                                height: "60px",
                                                width: "auto",
                                                objectFit: "contain",
                                                flexShrink: 0
                                            },
                                            className: "jsx-e8c388d9017a286c"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 155,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/JP-Morgan-Chase-Emblem.png",
                                            alt: "JP Morgan Chase",
                                            style: {
                                                height: "60px",
                                                width: "auto",
                                                objectFit: "contain",
                                                flexShrink: 0
                                            },
                                            className: "jsx-e8c388d9017a286c"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 165,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/HSBC-Logo.png",
                                            alt: "HSBC",
                                            style: {
                                                height: "60px",
                                                width: "auto",
                                                objectFit: "contain",
                                                flexShrink: 0
                                            },
                                            className: "jsx-e8c388d9017a286c"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 175,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/Citi-Logo.jpg",
                                            alt: "Citi",
                                            style: {
                                                height: "60px",
                                                width: "auto",
                                                objectFit: "contain",
                                                flexShrink: 0
                                            },
                                            className: "jsx-e8c388d9017a286c"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 185,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/Symbole-Goldman-Sachs.jpg",
                                            alt: "Goldman Sachs",
                                            style: {
                                                height: "60px",
                                                width: "auto",
                                                objectFit: "contain",
                                                flexShrink: 0
                                            },
                                            className: "jsx-e8c388d9017a286c"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 195,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/OIP.webp",
                                            alt: "Rothschild",
                                            style: {
                                                height: "60px",
                                                width: "auto",
                                                objectFit: "contain",
                                                flexShrink: 0
                                            },
                                            className: "jsx-e8c388d9017a286c"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 205,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/Rothschild-Co-ART-logo-2018.jpg",
                                            alt: "Rothschild",
                                            style: {
                                                height: "60px",
                                                width: "auto",
                                                objectFit: "contain",
                                                flexShrink: 0
                                            },
                                            className: "jsx-e8c388d9017a286c"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 215,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/lazard-logo-freelogovectors.net_.png",
                                            alt: "Lazard",
                                            style: {
                                                height: "60px",
                                                width: "auto",
                                                objectFit: "contain",
                                                flexShrink: 0
                                            },
                                            className: "jsx-e8c388d9017a286c"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 225,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/l_eurazeo-logo-lyo-2021.png",
                                            alt: "Eurazeo",
                                            style: {
                                                height: "60px",
                                                width: "auto",
                                                objectFit: "contain",
                                                flexShrink: 0
                                            },
                                            className: "jsx-e8c388d9017a286c"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 235,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/Ardian-ART-logo-2018.jpg",
                                            alt: "Ardian",
                                            style: {
                                                height: "60px",
                                                width: "auto",
                                                objectFit: "contain",
                                                flexShrink: 0
                                            },
                                            className: "jsx-e8c388d9017a286c"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 245,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/Barclays-Symbole.jpg",
                                            alt: "Barclays",
                                            style: {
                                                height: "60px",
                                                width: "auto",
                                                objectFit: "contain",
                                                flexShrink: 0
                                            },
                                            className: "jsx-e8c388d9017a286c"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 255,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/UBS_BIG-ca7b9524.png",
                                            alt: "UBS",
                                            style: {
                                                height: "60px",
                                                width: "auto",
                                                objectFit: "contain",
                                                flexShrink: 0
                                            },
                                            className: "jsx-e8c388d9017a286c"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 265,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/Morgan-Stanley-Logo.png",
                                            alt: "Morgan Stanley",
                                            style: {
                                                height: "60px",
                                                width: "auto",
                                                objectFit: "contain",
                                                flexShrink: 0
                                            },
                                            className: "jsx-e8c388d9017a286c"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 275,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/BNP-Paribas-Emblem.png",
                                            alt: "BNP Paribas",
                                            style: {
                                                height: "60px",
                                                width: "auto",
                                                objectFit: "contain",
                                                flexShrink: 0
                                            },
                                            className: "jsx-e8c388d9017a286c"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 287,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/JP-Morgan-Chase-Emblem.png",
                                            alt: "JP Morgan Chase",
                                            style: {
                                                height: "60px",
                                                width: "auto",
                                                objectFit: "contain",
                                                flexShrink: 0
                                            },
                                            className: "jsx-e8c388d9017a286c"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 297,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/HSBC-Logo.png",
                                            alt: "HSBC",
                                            style: {
                                                height: "60px",
                                                width: "auto",
                                                objectFit: "contain",
                                                flexShrink: 0
                                            },
                                            className: "jsx-e8c388d9017a286c"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 307,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/Citi-Logo.jpg",
                                            alt: "Citi",
                                            style: {
                                                height: "60px",
                                                width: "auto",
                                                objectFit: "contain",
                                                flexShrink: 0
                                            },
                                            className: "jsx-e8c388d9017a286c"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 317,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/Symbole-Goldman-Sachs.jpg",
                                            alt: "Goldman Sachs",
                                            style: {
                                                height: "60px",
                                                width: "auto",
                                                objectFit: "contain",
                                                flexShrink: 0
                                            },
                                            className: "jsx-e8c388d9017a286c"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 327,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/OIP.webp",
                                            alt: "Rothschild",
                                            style: {
                                                height: "60px",
                                                width: "auto",
                                                objectFit: "contain",
                                                flexShrink: 0
                                            },
                                            className: "jsx-e8c388d9017a286c"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 337,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/Rothschild-Co-ART-logo-2018.jpg",
                                            alt: "Rothschild",
                                            style: {
                                                height: "60px",
                                                width: "auto",
                                                objectFit: "contain",
                                                flexShrink: 0
                                            },
                                            className: "jsx-e8c388d9017a286c"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 347,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/lazard-logo-freelogovectors.net_.png",
                                            alt: "Lazard",
                                            style: {
                                                height: "60px",
                                                width: "auto",
                                                objectFit: "contain",
                                                flexShrink: 0
                                            },
                                            className: "jsx-e8c388d9017a286c"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 357,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/l_eurazeo-logo-lyo-2021.png",
                                            alt: "Eurazeo",
                                            style: {
                                                height: "60px",
                                                width: "auto",
                                                objectFit: "contain",
                                                flexShrink: 0
                                            },
                                            className: "jsx-e8c388d9017a286c"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 367,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/Ardian-ART-logo-2018.jpg",
                                            alt: "Ardian",
                                            style: {
                                                height: "60px",
                                                width: "auto",
                                                objectFit: "contain",
                                                flexShrink: 0
                                            },
                                            className: "jsx-e8c388d9017a286c"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 377,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/Barclays-Symbole.jpg",
                                            alt: "Barclays",
                                            style: {
                                                height: "60px",
                                                width: "auto",
                                                objectFit: "contain",
                                                flexShrink: 0
                                            },
                                            className: "jsx-e8c388d9017a286c"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 387,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/UBS_BIG-ca7b9524.png",
                                            alt: "UBS",
                                            style: {
                                                height: "60px",
                                                width: "auto",
                                                objectFit: "contain",
                                                flexShrink: 0
                                            },
                                            className: "jsx-e8c388d9017a286c"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 397,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: "/Morgan-Stanley-Logo.png",
                                            alt: "Morgan Stanley",
                                            style: {
                                                height: "60px",
                                                width: "auto",
                                                objectFit: "contain",
                                                flexShrink: 0
                                            },
                                            className: "jsx-e8c388d9017a286c"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                            lineNumber: 407,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                    lineNumber: 148,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                        id: "e8c388d9017a286c",
                        children: "@keyframes scroll{0%{transform:translate(0)}to{transform:translate(-50%)}}.scroll-container.jsx-e8c388d9017a286c{animation:30s linear infinite scroll}"
                    }, void 0, false, void 0, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                style: {
                    padding: "80px 20px",
                    position: "relative"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            inset: "20px",
                            backgroundColor: "rgba(255, 255, 255, 0.12)",
                            borderRadius: "24px",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            zIndex: 1
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                        lineNumber: 440,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            maxWidth: "1100px",
                            margin: "0 auto",
                            position: "relative",
                            zIndex: 2
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: "center",
                                    marginBottom: "64px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                        style: {
                                            fontSize: "42px",
                                            fontWeight: 800,
                                            color: "#ffffff",
                                            margin: "0 0 16px 0",
                                            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                                            letterSpacing: "-0.02em"
                                        },
                                        children: "Comment ça marche"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                        lineNumber: 459,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: "20px",
                                            color: "#e2e8f0",
                                            margin: 0,
                                            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                                            fontWeight: 500
                                        },
                                        children: "Créez votre CV professionnel en 3 étapes simples"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                        lineNumber: 469,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                lineNumber: 455,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                    gap: "40px",
                                    alignItems: "start"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            textAlign: "center",
                                            position: "relative"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    height: "380px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                    src: "/Gemini_Generated_Image_ms49kzms49kzms49 (1).png",
                                                    alt: "Génération de CV automatique",
                                                    style: {
                                                        width: "100%",
                                                        height: "280px",
                                                        objectFit: "contain",
                                                        borderRadius: "12px"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                                    lineNumber: 494,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                                lineNumber: 493,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontSize: "24px",
                                                    fontWeight: 700,
                                                    color: "#ffffff",
                                                    margin: "0 0 12px 0",
                                                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                                },
                                                children: "Générer votre CV"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                                lineNumber: 506,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: "16px",
                                                    color: "#e2e8f0",
                                                    lineHeight: 1.6,
                                                    margin: 0,
                                                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                                },
                                                children: "Générez votre CV type finance sur une page lisible par les ATS des plus grandes banques et fonds d'investissements"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                                lineNumber: 515,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                        lineNumber: 487,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            textAlign: "center",
                                            position: "relative"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    height: "380px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                    src: "/Gemini_Generated_Image_n0iwmtn0iwmtn0iw (1).png",
                                                    alt: "Remplissage des sections CV",
                                                    style: {
                                                        width: "100%",
                                                        height: "380px",
                                                        objectFit: "contain",
                                                        borderRadius: "12px"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                                    lineNumber: 534,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                                lineNumber: 533,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontSize: "24px",
                                                    fontWeight: 700,
                                                    color: "#ffffff",
                                                    margin: "0 0 12px 0",
                                                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                                },
                                                children: "Remplir les sections"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                                lineNumber: 546,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: "16px",
                                                    color: "#e2e8f0",
                                                    lineHeight: 1.6,
                                                    margin: 0,
                                                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                                },
                                                children: "Remplissez chaque section de votre CV en vous appuyant sur notre contenu pré-rédigé, si vous le souhaitez. Pas besoin de vous occuper de la mise en forme, l'IA le fait pour vous"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                                lineNumber: 555,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                        lineNumber: 527,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            textAlign: "center",
                                            position: "relative"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                style: {
                                                    height: "380px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                    src: "/Gemini_Generated_Image_ms49kzms49kzms49.png",
                                                    alt: "Téléchargement du CV PDF",
                                                    style: {
                                                        width: "100%",
                                                        height: "320px",
                                                        objectFit: "contain",
                                                        borderRadius: "12px"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                                    lineNumber: 574,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                                lineNumber: 573,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontSize: "24px",
                                                    fontWeight: 700,
                                                    color: "#ffffff",
                                                    margin: "0 0 12px 0",
                                                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                                },
                                                children: "Télécharger votre CV"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                                lineNumber: 586,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: "16px",
                                                    color: "#e2e8f0",
                                                    lineHeight: 1.6,
                                                    margin: 0,
                                                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                                },
                                                children: "Téléchargez votre CV au format PDF gratuitement en 1 clic. Inscrivez-vous si vous souhaitez sauvegarder votre travail"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                                lineNumber: 595,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                        lineNumber: 567,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                lineNumber: 480,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: "center",
                                    marginTop: "64px"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/cv",
                                    style: {
                                        padding: "20px 40px",
                                        background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                                        color: "#ffffff",
                                        borderRadius: "16px",
                                        textDecoration: "none",
                                        fontWeight: 800,
                                        fontSize: "20px",
                                        boxShadow: "0 12px 32px rgba(59, 130, 246, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)",
                                        border: "2px solid rgba(255, 255, 255, 0.1)",
                                        transition: "all 0.2s ease",
                                        display: "inline-block",
                                        textAlign: "center",
                                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                    },
                                    children: "Commencer maintenant"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                    lineNumber: 612,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                                lineNumber: 608,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                        lineNumber: 449,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                lineNumber: 435,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$components$2f$Footer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
                lineNumber: 634,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/index.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a42c8330._.js.map