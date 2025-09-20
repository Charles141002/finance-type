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
const baseNavLink = {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: "0.02em",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 16px",
    borderRadius: 999,
    transition: "background-color 0.2s ease, color 0.2s ease",
    textDecoration: "none"
};
function DynamicHeader({ rightActions, variant = "default", scrollContainerRef }) {
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [lastScrollY, setLastScrollY] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [isInitialized, setIsInitialized] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const session = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$auth$2d$helpers$2d$react__$5b$external$5d$__$2840$supabase$2f$auth$2d$helpers$2d$react$2c$__cjs$29$__["useSession"])();
    const supabase = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$auth$2d$helpers$2d$react__$5b$external$5d$__$2840$supabase$2f$auth$2d$helpers$2d$react$2c$__cjs$29$__["useSupabaseClient"])();
    const theme = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        if (variant === "landing") {
            return {
                height: 120,
                wrapper: {
                    transition: "height 0.35s ease, opacity 0.35s ease"
                },
                container: {
                    height: 120,
                    display: "flex",
                    alignItems: "center",
                    background: "linear-gradient(180deg, rgba(2, 6, 23, 0.95), rgba(2, 6, 23, 0.9))",
                    backdropFilter: "saturate(140%) blur(8px)",
                    WebkitBackdropFilter: "saturate(140%) blur(8px)",
                    borderBottom: "2px solid rgba(255,255,255,0.15)",
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    width: "100%"
                },
                inner: {
                    width: "100%",
                    maxWidth: 2000,
                    margin: "0 auto",
                    padding: "0 24px 0 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 20
                },
                nav: {
                    display: "flex",
                    alignItems: "center",
                    gap: 28,
                    marginLeft: "auto"
                },
                navLink: {
                    ...baseNavLink,
                    padding: "0",
                    color: "#e2e8f0"
                },
                primary: {
                    ...baseNavLink,
                    padding: "12px 22px",
                    background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.18)"
                },
                subtle: {
                    ...baseNavLink,
                    padding: "12px 22px",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "#e2e8f0"
                },
                logo: {
                    height: 120
                },
                tagline: null
            };
        }
        return {
            height: 72,
            wrapper: {
                transition: "height 0.28s ease, opacity 0.28s ease"
            },
            container: {
                height: 72,
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(252, 253, 255, 0.9)",
                borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                boxShadow: "0 12px 28px rgba(15, 23, 42, 0.06)",
                width: "100%"
            },
            inner: {
                width: "100%",
                maxWidth: 1200,
                margin: "0 auto",
                padding: "0 24px",
                display: "flex",
                alignItems: "center",
                gap: 20
            },
            nav: {
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
                gap: 12
            },
            navLink: {
                ...baseNavLink,
                color: "#1f2937"
            },
            primary: {
                ...baseNavLink,
                color: "#fff",
                background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
                border: "1px solid rgba(37, 99, 235, 0.4)",
                boxShadow: "0 10px 26px rgba(37, 99, 235, 0.22)"
            },
            subtle: {
                ...baseNavLink,
                color: "#1d4ed8",
                backgroundColor: "rgba(37, 99, 235, 0.12)",
                border: "1px solid rgba(37, 99, 235, 0.2)"
            },
            logo: {
                height: 40
            },
            tagline: {
                fontSize: 12,
                color: "#475569",
                letterSpacing: "0.08em",
                textTransform: "uppercase"
            }
        };
    }, [
        variant
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const timer = window.setTimeout(()=>setIsInitialized(true), 600);
        return ()=>window.clearTimeout(timer);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const scrollElement = scrollContainerRef?.current || window;
        const handleScroll = ()=>{
            if (!isInitialized) return;
            const currentScrollY = scrollElement === window ? window.scrollY : scrollElement.scrollTop ?? 0;
            const newVisibility = currentScrollY < lastScrollY || currentScrollY <= 12;
            if (newVisibility !== isVisible) {
                setIsVisible(newVisibility);
            }
            setLastScrollY(currentScrollY);
        };
        scrollElement.addEventListener("scroll", handleScroll, {
            passive: true
        });
        return ()=>{
            scrollElement.removeEventListener("scroll", handleScroll);
        };
    }, [
        isInitialized,
        scrollContainerRef,
        isVisible,
        lastScrollY
    ]);
    const handleLogout = async ()=>{
        await supabase.auth.signOut();
        router.push("/login").catch(()=>{});
    };
    const wrapperStyle = {
        height: isVisible ? theme.height : 0,
        overflow: "hidden",
        opacity: isVisible ? 1 : 0,
        position: "relative",
        zIndex: 30,
        ...theme.wrapper
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: wrapperStyle,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
            style: theme.container,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: theme.inner,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            textDecoration: "none"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                src: "/Logo.png",
                                alt: "Finance CV",
                                style: {
                                    height: theme.logo.height,
                                    width: "auto",
                                    objectFit: "contain",
                                    filter: variant === "landing" ? "drop-shadow(0 10px 30px rgba(0,0,0,0.45))" : "none"
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
                                lineNumber: 212,
                                columnNumber: 13
                            }, this),
                            theme.tagline && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 16,
                                            fontWeight: 700,
                                            color: "#0f172a",
                                            letterSpacing: "-0.01em",
                                            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                                        },
                                        children: "Finance CV"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
                                        lineNumber: 224,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                                            ...theme.tagline
                                        },
                                        children: "Atelier de CV premium"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
                                        lineNumber: 235,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
                                lineNumber: 223,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
                        lineNumber: 203,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: theme.nav,
                        children: rightActions ?? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/cv",
                                    style: theme.navLink,
                                    children: "Générateur"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
                                    lineNumber: 250,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/mes-cv",
                                    style: theme.navLink,
                                    children: "Mes CV"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
                                    lineNumber: 253,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/a-propos",
                                    style: theme.navLink,
                                    children: "À propos"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
                                    lineNumber: 256,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/cv",
                                    style: theme.primary,
                                    children: "Créer un CV"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
                                    lineNumber: 259,
                                    columnNumber: 17
                                }, this),
                                session?.user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: handleLogout,
                                    style: {
                                        ...theme.subtle,
                                        cursor: "pointer",
                                        border: "none",
                                        background: variant === "landing" ? "rgba(15,15,40,0.35)" : theme.subtle.backgroundColor,
                                        color: variant === "landing" ? "#e2e8f0" : theme.subtle.color
                                    },
                                    children: "Se déconnecter"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
                                    lineNumber: 263,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/login",
                                    style: theme.subtle,
                                    children: "Se connecter"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
                                    lineNumber: 277,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
                        lineNumber: 247,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
                lineNumber: 202,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
            lineNumber: 201,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
        lineNumber: 200,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

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
(()=>{
    const e = new Error("Cannot find module '../data/initialCV'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
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
            const blocks = createInitialBlocks();
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
            backgroundColor: '#f8fafc'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$components$2f$DynamicHeader$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                style: {
                    maxWidth: '960px',
                    margin: '0 auto',
                    padding: '40px 20px',
                    color: '#0f172a',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            marginBottom: '28px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '13px',
                                            letterSpacing: '0.08em',
                                            color: '#2563eb',
                                            textTransform: 'uppercase',
                                            fontWeight: 700
                                        },
                                        children: "Bibliothèque"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                        lineNumber: 122,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontSize: '32px',
                                            fontWeight: 800,
                                            marginTop: '4px'
                                        },
                                        children: "Mes CV sauvegardés"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                        lineNumber: 133,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: '15px',
                                    color: '#475569',
                                    maxWidth: '540px'
                                },
                                children: "Organisez vos différentes versions et reprenez la rédaction exactement là où vous vous êtes arrêté."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                lineNumber: 135,
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
                                            padding: '12px 22px',
                                            borderRadius: '12px',
                                            border: 'none',
                                            background: 'linear-gradient(135deg, #1d4ed8, #2563eb)',
                                            color: '#fff',
                                            fontWeight: 700,
                                            cursor: isCreating ? 'not-allowed' : 'pointer',
                                            opacity: isCreating ? 0.7 : 1,
                                            boxShadow: '0 10px 24px rgba(37, 99, 235, 0.25)'
                                        },
                                        children: isCreating ? 'Création…' : 'Créer un nouveau CV'
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                        lineNumber: 139,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/cv",
                                        style: {
                                            padding: '12px 22px',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(37, 99, 235, 0.25)',
                                            color: '#1d4ed8',
                                            textDecoration: 'none',
                                            fontWeight: 600,
                                            backgroundColor: 'rgba(37, 99, 235, 0.08)'
                                        },
                                        children: "Revenir à l'éditeur"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                        lineNumber: 157,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                lineNumber: 138,
                                columnNumber: 11
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    backgroundColor: '#fee2e2',
                                    border: '1px solid #fecaca',
                                    color: '#b91c1c',
                                    padding: '10px 12px',
                                    borderRadius: '8px',
                                    fontSize: '14px'
                                },
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                lineNumber: 173,
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
                            color: '#64748b'
                        },
                        children: "Chargement..."
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                        lineNumber: 189,
                        columnNumber: 11
                    }, this) : cvs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            backgroundColor: '#ffffff',
                            border: '1px solid rgba(148, 163, 184, 0.2)',
                            borderRadius: '16px',
                            padding: '36px',
                            textAlign: 'center',
                            boxShadow: '0 16px 36px rgba(15, 23, 42, 0.08)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: '16px',
                                    color: '#475569'
                                },
                                children: "Vous n'avez pas encore de CV sauvegardé."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                lineNumber: 201,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleCreateCv,
                                disabled: isCreating,
                                style: {
                                    marginTop: '20px',
                                    padding: '12px 22px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: 'linear-gradient(135deg, #1d4ed8, #2563eb)',
                                    color: '#fff',
                                    fontWeight: 700,
                                    cursor: isCreating ? 'not-allowed' : 'pointer',
                                    opacity: isCreating ? 0.7 : 1,
                                    boxShadow: '0 10px 24px rgba(37, 99, 235, 0.25)'
                                },
                                children: isCreating ? 'Création…' : 'Créer mon premier CV'
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                lineNumber: 202,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                        lineNumber: 191,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gap: '20px',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleCreateCv,
                                disabled: isCreating,
                                style: {
                                    background: 'rgba(37, 99, 235, 0.06)',
                                    border: '1px dashed rgba(37, 99, 235, 0.45)',
                                    borderRadius: '14px',
                                    padding: '20px',
                                    textAlign: 'left',
                                    color: '#1d4ed8',
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
                                            color: '#1d4ed8'
                                        },
                                        children: "+ Créer un autre CV"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                        lineNumber: 256,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '13px',
                                            color: '#475569'
                                        },
                                        children: "Lance un nouveau CV vierge tout en conservant les précédents."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                        lineNumber: 257,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                lineNumber: 224,
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
                                        background: '#ffffff',
                                        border: '1px solid rgba(148, 163, 184, 0.22)',
                                        borderRadius: '14px',
                                        padding: '20px',
                                        textAlign: 'left',
                                        color: '#0f172a',
                                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px',
                                        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                                        boxShadow: '0 10px 24px rgba(15, 23, 42, 0.05)'
                                    },
                                    onMouseEnter: (event)=>{
                                        const target = event.currentTarget;
                                        target.style.transform = 'translateY(-2px)';
                                        target.style.boxShadow = '0 14px 28px rgba(15, 23, 42, 0.12)';
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
                                                    lineNumber: 293,
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
                                                        background: 'rgba(239, 68, 68, 0.08)',
                                                        border: '1px solid rgba(239, 68, 68, 0.25)',
                                                        color: '#dc2626',
                                                        borderRadius: '999px',
                                                        padding: '6px 14px',
                                                        fontSize: '12px',
                                                        fontWeight: 600,
                                                        cursor: deletingId === cv.id ? 'not-allowed' : 'pointer',
                                                        transition: 'background-color 0.15s ease'
                                                    },
                                                    onMouseEnter: (event)=>{
                                                        const target = event.currentTarget;
                                                        if (deletingId !== cv.id) {
                                                            target.style.backgroundColor = 'rgba(239, 68, 68, 0.14)';
                                                        }
                                                    },
                                                    onMouseLeave: (event)=>{
                                                        const target = event.currentTarget;
                                                        target.style.backgroundColor = 'rgba(239, 68, 68, 0.08)';
                                                    },
                                                    children: deletingId === cv.id ? 'Suppression…' : 'Supprimer'
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                            lineNumber: 292,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: '13px',
                                                color: '#475569'
                                            },
                                            children: [
                                                "Modifié le ",
                                                formatDate(cv.updated_at)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                            lineNumber: 326,
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
                                            lineNumber: 327,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, cv.id, true, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                                    lineNumber: 263,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/mes-cv.tsx",
                        lineNumber: 223,
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
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__82357121._.js.map