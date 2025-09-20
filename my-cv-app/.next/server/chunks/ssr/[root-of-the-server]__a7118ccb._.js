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
"[project]/Desktop/finance-type/my-cv-app/pages/login.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoginPage,
    "getServerSideProps",
    ()=>getServerSideProps
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$auth$2d$helpers$2d$react__$5b$external$5d$__$2840$supabase$2f$auth$2d$helpers$2d$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@supabase/auth-helpers-react [external] (@supabase/auth-helpers-react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$auth$2d$helpers$2d$nextjs__$5b$external$5d$__$2840$supabase$2f$auth$2d$helpers$2d$nextjs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@supabase/auth-helpers-nextjs [external] (@supabase/auth-helpers-nextjs, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$components$2f$DynamicHeader$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx [ssr] (ecmascript)");
;
;
;
;
;
;
;
;
const pageWrapperStyle = {
    minHeight: '100vh',
    background: 'radial-gradient(circle at top, rgba(59,130,246,0.12), transparent 55%), rgba(2, 6, 23, 0.96)',
    display: 'flex',
    flexDirection: 'column'
};
const formContainerStyle = {
    flex: '1 1 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 16px'
};
const cardStyle = {
    width: '100%',
    maxWidth: '420px',
    background: 'rgba(15, 23, 42, 0.96)',
    border: '1px solid rgba(148, 163, 184, 0.25)',
    borderRadius: '18px',
    padding: '32px',
    boxShadow: '0 30px 60px rgba(15, 23, 42, 0.35)',
    color: '#e2e8f0',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
};
const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '12px',
    border: '1px solid rgba(148, 163, 184, 0.35)',
    marginBottom: '18px',
    fontSize: '15px',
    background: 'rgba(15, 23, 42, 0.65)',
    color: '#f8fafc'
};
const buttonStyle = {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    color: '#fff',
    fontWeight: 700,
    fontSize: '15px',
    cursor: 'pointer',
    marginTop: '8px',
    transition: 'all 0.2s ease'
};
const secondaryButtonStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid rgba(148, 163, 184, 0.45)',
    background: 'transparent',
    color: '#cbd5f5',
    fontWeight: 600,
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '12px'
};
const validateEmail = (value)=>/\S+@\S+\.\S+/.test(value);
function LoginPage({ initialSession }) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$auth$2d$helpers$2d$react__$5b$external$5d$__$2840$supabase$2f$auth$2d$helpers$2d$react$2c$__cjs$29$__["useSupabaseClient"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const session = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$auth$2d$helpers$2d$react__$5b$external$5d$__$2840$supabase$2f$auth$2d$helpers$2d$react$2c$__cjs$29$__["useSession"])() ?? initialSession ?? null;
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('signin');
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [confirmPassword, setConfirmPassword] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [formErrors, setFormErrors] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [flashMessage, setFlashMessage] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const redirectPath = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        const redirectParam = router.query.redirect;
        if (Array.isArray(redirectParam)) {
            return redirectParam[0] ?? '/cv';
        }
        return redirectParam ?? '/cv';
    }, [
        router.query.redirect
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (session?.user) {
            router.replace(typeof redirectPath === 'string' ? redirectPath : '/cv').catch(()=>{});
        }
    }, [
        redirectPath,
        router,
        session
    ]);
    const handleSubmit = async (event)=>{
        event.preventDefault();
        const nextErrors = {};
        if (!validateEmail(email)) {
            nextErrors.email = 'Merci de saisir une adresse e-mail valide.';
        }
        if (password.length < 8) {
            nextErrors.password = 'Le mot de passe doit contenir au moins 8 caractères.';
        }
        if (mode === 'signup' && password !== confirmPassword) {
            nextErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';
        }
        if (Object.keys(nextErrors).length > 0) {
            setFormErrors(nextErrors);
            return;
        }
        setFormErrors({});
        setIsSubmitting(true);
        setFlashMessage(null);
        try {
            if (mode === 'signin') {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });
                if (error) {
                    throw error;
                }
                await router.replace(typeof redirectPath === 'string' ? redirectPath : '/cv');
            } else {
                const origin = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : ("TURBOPACK compile-time value", "http://localhost:3000");
                const emailRedirectTo = ("TURBOPACK compile-time truthy", 1) ? `${origin}/api/auth/callback` : "TURBOPACK unreachable";
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo
                    }
                });
                if (error) {
                    throw error;
                }
                setFlashMessage("Compte créé ! Vérifiez votre boîte mail pour confirmer votre adresse.");
                setMode('signin');
            }
        } catch (error) {
            if (error instanceof Error) {
                setFormErrors({
                    general: error.message
                });
            } else {
                setFormErrors({
                    general: 'Une erreur inattendue est survenue. Réessayez plus tard.'
                });
            }
        } finally{
            setIsSubmitting(false);
        }
    };
    const handleResetPassword = async ()=>{
        if (!validateEmail(email)) {
            setFormErrors({
                email: 'Saisissez une adresse e-mail valide pour réinitialiser le mot de passe.'
            });
            return;
        }
        try {
            const origin = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : ("TURBOPACK compile-time value", "http://localhost:3000");
            const redirectTo = ("TURBOPACK compile-time truthy", 1) ? `${origin}/reset-password` : "TURBOPACK unreachable";
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo
            });
            if (error) {
                throw error;
            }
            setFlashMessage('Email de réinitialisation envoyé ! Consultez votre boîte de réception.');
        } catch (error) {
            if (error instanceof Error) {
                setFormErrors({
                    general: error.message
                });
            }
        }
    };
    const toggleMode = ()=>{
        setMode((prev)=>prev === 'signin' ? 'signup' : 'signin');
        setFormErrors({});
        setFlashMessage(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: pageWrapperStyle,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                    children: [
                        mode === 'signin' ? 'Connexion' : 'Inscription',
                        " | Finance CV"
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                    lineNumber: 208,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$components$2f$DynamicHeader$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                style: formContainerStyle,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: cardStyle,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: '24px',
                                textAlign: 'center'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                        src: "/Logo.png",
                                        alt: "Finance CV",
                                        style: {
                                            height: '120px',
                                            objectFit: 'contain'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                                        lineNumber: 215,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                                    lineNumber: 214,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                    style: {
                                        fontSize: '24px',
                                        marginTop: '8px',
                                        marginBottom: '8px',
                                        fontWeight: 700
                                    },
                                    children: mode === 'signin' ? 'Connexion' : 'Créer un compte'
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                                    lineNumber: 221,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: '#94a3b8',
                                        fontSize: '14px'
                                    },
                                    children: "Accédez à votre générateur de CV personnalisé."
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                                    lineNumber: 224,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                            lineNumber: 213,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            noValidate: true,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                    style: {
                                        fontSize: '13px',
                                        fontWeight: 600,
                                        marginBottom: '6px',
                                        display: 'block'
                                    },
                                    children: "Adresse e-mail"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                                    lineNumber: 230,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    style: inputStyle,
                                    value: email,
                                    onChange: (event)=>setEmail(event.target.value),
                                    type: "email",
                                    placeholder: "prenom.nom@entreprise.com",
                                    autoComplete: "email"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                                    lineNumber: 233,
                                    columnNumber: 11
                                }, this),
                                formErrors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: '#f87171',
                                        fontSize: '13px',
                                        marginTop: '-12px',
                                        marginBottom: '12px'
                                    },
                                    children: formErrors.email
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                                    lineNumber: 242,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                    style: {
                                        fontSize: '13px',
                                        fontWeight: 600,
                                        marginBottom: '6px',
                                        display: 'block'
                                    },
                                    children: "Mot de passe"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                                    lineNumber: 247,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    style: inputStyle,
                                    value: password,
                                    onChange: (event)=>setPassword(event.target.value),
                                    type: "password",
                                    placeholder: "Au moins 8 caractères",
                                    autoComplete: mode === 'signin' ? 'current-password' : 'new-password',
                                    minLength: 8
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                                    lineNumber: 250,
                                    columnNumber: 11
                                }, this),
                                formErrors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: '#f87171',
                                        fontSize: '13px',
                                        marginTop: '-12px',
                                        marginBottom: '12px'
                                    },
                                    children: formErrors.password
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                                    lineNumber: 260,
                                    columnNumber: 13
                                }, this),
                                mode === 'signup' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            style: {
                                                fontSize: '13px',
                                                fontWeight: 600,
                                                marginBottom: '6px',
                                                display: 'block'
                                            },
                                            children: "Confirmer le mot de passe"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                                            lineNumber: 267,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            style: inputStyle,
                                            value: confirmPassword,
                                            onChange: (event)=>setConfirmPassword(event.target.value),
                                            type: "password",
                                            placeholder: "Retapez votre mot de passe",
                                            autoComplete: "new-password",
                                            minLength: 8
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                                            lineNumber: 270,
                                            columnNumber: 15
                                        }, this),
                                        formErrors.confirmPassword && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            style: {
                                                color: '#f87171',
                                                fontSize: '13px',
                                                marginTop: '-12px',
                                                marginBottom: '12px'
                                            },
                                            children: formErrors.confirmPassword
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                                            lineNumber: 280,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true),
                                formErrors.general && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: '#f87171',
                                        fontSize: '13px',
                                        marginBottom: '12px'
                                    },
                                    children: formErrors.general
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                                    lineNumber: 288,
                                    columnNumber: 13
                                }, this),
                                flashMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: '#34d399',
                                        fontSize: '13px',
                                        marginBottom: '12px'
                                    },
                                    children: flashMessage
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                                    lineNumber: 294,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    style: buttonStyle,
                                    disabled: isSubmitting,
                                    children: isSubmitting ? 'Patientez…' : mode === 'signin' ? 'Se connecter' : 'Créer mon compte'
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                                    lineNumber: 299,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                            lineNumber: 229,
                            columnNumber: 9
                        }, this),
                        mode === 'signin' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            type: "button",
                            style: secondaryButtonStyle,
                            onClick: handleResetPassword,
                            children: "Mot de passe oublié ?"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                            lineNumber: 305,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'center',
                                marginTop: '18px',
                                fontSize: '14px',
                                color: '#cbd5f5'
                            },
                            children: mode === 'signin' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                children: [
                                    "Pas encore de compte ?",
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: toggleMode,
                                        style: {
                                            ...secondaryButtonStyle,
                                            width: 'auto',
                                            display: 'inline-block',
                                            marginTop: 0
                                        },
                                        children: "S'inscrire gratuitement"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                                        lineNumber: 314,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                children: [
                                    "Déjà membre ?",
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: toggleMode,
                                        style: {
                                            ...secondaryButtonStyle,
                                            width: 'auto',
                                            display: 'inline-block',
                                            marginTop: 0
                                        },
                                        children: "Se connecter"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                                        lineNumber: 321,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                            lineNumber: 310,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                    lineNumber: 212,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/login.tsx",
        lineNumber: 206,
        columnNumber: 5
    }, this);
}
async function getServerSideProps(context) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$auth$2d$helpers$2d$nextjs__$5b$external$5d$__$2840$supabase$2f$auth$2d$helpers$2d$nextjs$2c$__cjs$29$__["createPagesServerClient"])(context);
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
        const redirectParam = context.query.redirect;
        const destination = Array.isArray(redirectParam) ? redirectParam[0] ?? '/cv' : redirectParam ?? '/cv';
        return {
            redirect: {
                destination,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__a7118ccb._.js.map