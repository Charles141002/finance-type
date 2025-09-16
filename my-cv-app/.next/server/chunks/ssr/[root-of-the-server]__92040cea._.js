module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
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
"[project]/Desktop/my-cv-app/components/BlockEditor.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
"use client";
;
;
;
;
const BlockEditor = ({ blocks, setBlocks })=>{
    const [newBlockType, setNewBlockType] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("text");
    const [subBlockTypes, setSubBlockTypes] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    // -------------------
    // Ajouter un bloc
    // -------------------
    const handleAddBlock = (parentId)=>{
        const typeToUse = parentId ? subBlockTypes[parentId] || "text" : newBlockType;
        const newBlock = {
            id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
            type: typeToUse,
            content: typeToUse === "contact" ? {
                email: "",
                phone: "",
                address: "",
                linkedin: ""
            } : "",
            children: []
        };
        if (!parentId) {
            setBlocks([
                ...blocks,
                newBlock
            ]);
        } else {
            setBlocks(addChildRecursive(blocks, parentId, newBlock));
        }
    };
    const addChildRecursive = (blocks, parentId, child)=>blocks.map((b)=>b.id === parentId ? {
                ...b,
                children: [
                    ...b.children || [],
                    child
                ]
            } : {
                ...b,
                children: b.children ? addChildRecursive(b.children, parentId, child) : []
            });
    // -------------------
    // Supprimer un bloc
    // -------------------
    const deleteBlockRecursive = (blocks, id)=>blocks.filter((b)=>b.id !== id).map((b)=>({
                ...b,
                children: b.children ? deleteBlockRecursive(b.children, id) : []
            }));
    const handleDeleteBlock = (id)=>setBlocks(deleteBlockRecursive(blocks, id));
    // -------------------
    // Mise à jour du contenu
    // -------------------
    const updateBlockContentRecursive = (blocks, id, content)=>blocks.map((b)=>b.id === id ? {
                ...b,
                content
            } : {
                ...b,
                children: b.children ? updateBlockContentRecursive(b.children, id, content) : []
            });
    const updateBlockContent = (id, content)=>{
        setBlocks(updateBlockContentRecursive(blocks, id, content));
    };
    // -------------------
    // Drag & Drop racine
    // -------------------
    const handleDragEnd = (result)=>{
        if (!result.destination) return;
        const reordered = Array.from(blocks);
        const [moved] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, moved);
        setBlocks(reordered);
    };
    // -------------------
    // Rendu récursif d'un bloc
    // -------------------
    const renderBlock = (block)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                            children: block.type.toUpperCase()
                        }, void 0, false, {
                            fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                            lineNumber: 89,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                block.type !== "divider" && block.type !== "header" && block.type !== "contact" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                            value: subBlockTypes[block.id] || "text",
                                            onChange: (e)=>setSubBlockTypes({
                                                    ...subBlockTypes,
                                                    [block.id]: e.target.value
                                                }),
                                            style: {
                                                marginRight: 8
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "header",
                                                    children: "Header"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "subsection",
                                                    children: "Sous-section"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "section",
                                                    children: "Section"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "text",
                                                    children: "Texte"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "contact",
                                                    children: "Contact"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                                                    lineNumber: 107,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "divider",
                                                    children: "Séparateur"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                                            lineNumber: 93,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleAddBlock(block.id),
                                            style: {
                                                marginRight: 8
                                            },
                                            children: "+ sous-bloc"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                                            lineNumber: 110,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleDeleteBlock(block.id),
                                    style: {
                                        color: "red"
                                    },
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                                    lineNumber: 115,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                            lineNumber: 90,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                    lineNumber: 88,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: 8
                    },
                    children: block.type === "divider" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("hr", {}, void 0, false, {
                        fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 123,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)) : block.type === "contact" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 4
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                placeholder: "Email",
                                value: block.content.email,
                                onChange: (e)=>updateBlockContent(block.id, {
                                        ...block.content,
                                        email: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 126,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                placeholder: "Téléphone",
                                value: block.content.phone,
                                onChange: (e)=>updateBlockContent(block.id, {
                                        ...block.content,
                                        phone: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                placeholder: "Adresse",
                                value: block.content.address,
                                onChange: (e)=>updateBlockContent(block.id, {
                                        ...block.content,
                                        address: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 136,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                placeholder: "LinkedIn",
                                value: block.content.linkedin,
                                onChange: (e)=>updateBlockContent(block.id, {
                                        ...block.content,
                                        linkedin: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 141,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 125,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)) : block.type === "subsection" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 4
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                placeholder: "Titre (ex: JCDecaux)",
                                value: block.content?.title || "",
                                onChange: (e)=>updateBlockContent(block.id, {
                                        ...block.content,
                                        title: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 149,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                placeholder: "Sous-titre (ex: Data Scientist)",
                                value: block.content?.subtitle || "",
                                onChange: (e)=>updateBlockContent(block.id, {
                                        ...block.content,
                                        subtitle: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 154,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                placeholder: "Période (ex: 11/2024 -- 05/2025)",
                                value: block.content?.period || "",
                                onChange: (e)=>updateBlockContent(block.id, {
                                        ...block.content,
                                        period: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 159,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 148,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                        value: typeof block.content === "string" ? block.content : block.content?.title || "",
                        onChange: (e)=>{
                            let newContent = e.target.value;
                            if (block.type === "header" || block.type === "section") {
                                newContent = {
                                    ...block.content,
                                    title: e.target.value
                                };
                            }
                            updateBlockContent(block.id, newContent);
                        },
                        rows: 3,
                        style: {
                            width: "100%"
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 166,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                    lineNumber: 121,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                block.children && block.children.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginLeft: 12,
                        marginTop: 8,
                        borderLeft: "2px solid #eee",
                        paddingLeft: 8
                    },
                    children: block.children.map((child)=>renderBlock(child))
                }, void 0, false, {
                    fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                    lineNumber: 182,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true);
    // -------------------
    // Rendu principal
    // -------------------
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 16
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                        value: newBlockType,
                        onChange: (e)=>setNewBlockType(e.target.value),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "header",
                                children: "Header"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 196,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "subsection",
                                children: "Sous-section"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 197,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "section",
                                children: "Section"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "text",
                                children: "Texte"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 199,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "contact",
                                children: "Contact"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 200,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "divider",
                                children: "Séparateur"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 201,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 195,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>handleAddBlock(),
                        style: {
                            marginLeft: 8
                        },
                        children: "Ajouter bloc"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                lineNumber: 194,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$hello$2d$pangea$2f$dnd__$5b$external$5d$__$2840$hello$2d$pangea$2f$dnd$2c$__cjs$29$__["DragDropContext"], {
                onDragEnd: handleDragEnd,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$hello$2d$pangea$2f$dnd__$5b$external$5d$__$2840$hello$2d$pangea$2f$dnd$2c$__cjs$29$__["Droppable"], {
                    droppableId: "blocks",
                    children: (provided)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            ref: provided.innerRef,
                            ...provided.droppableProps,
                            children: [
                                blocks.map((block, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$hello$2d$pangea$2f$dnd__$5b$external$5d$__$2840$hello$2d$pangea$2f$dnd$2c$__cjs$29$__["Draggable"], {
                                        draggableId: block.id,
                                        index: index,
                                        children: (provided)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                ref: provided.innerRef,
                                                ...provided.draggableProps,
                                                ...provided.dragHandleProps,
                                                style: {
                                                    padding: 8,
                                                    border: "1px solid #ddd",
                                                    marginBottom: 8,
                                                    borderRadius: 8,
                                                    background: "#fff",
                                                    ...provided.draggableProps.style
                                                },
                                                children: renderBlock(block)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                                                lineNumber: 215,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                    }, block.id, false, {
                                        fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                                        lineNumber: 213,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))),
                                provided.placeholder
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                            lineNumber: 211,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                    lineNumber: 209,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
                lineNumber: 208,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/my-cv-app/components/BlockEditor.tsx",
        lineNumber: 193,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = BlockEditor;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Desktop/my-cv-app/utils/blocksToHTML.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>blocksToHTML
]);
function blocksToHTML(blocks, fontScale = 1) {
    return blocks.map((block)=>{
        switch(block.type){
            case "header":
                {
                    const text = block.content?.title || "";
                    return `<div style="text-align:center; margin-bottom:${8 * fontScale}px;">
            <h1 style="font-size:${18 * fontScale}pt; font-weight:bold; margin:0; padding:0;">${text}</h1>
          </div>`;
                }
            case "contact":
                {
                    const c = block.content || {};
                    return `<div style="text-align:center; margin-bottom:${8 * fontScale}px; font-size:${10 * fontScale}pt;">
            ${c.email || ""} • ${c.phone || ""} • ${c.address || ""} • ${c.linkedin || ""}
          </div>`;
                }
            case "text":
                {
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
}),
"[project]/Desktop/my-cv-app/data/initialCV.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
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
            linkedin: "https://fr.linkedin.com/in/charles-pelong-a68212246"
        }
    },
    {
        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
        type: "text",
        content: "Étudiant à IMT Atlantique à la recherche d'un stage de fin d'études à partir du 04/2026 dans le domaine de la science des données et de l'apprentissage automatique."
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
                    title: "IMT Atlantique",
                    subtitle: "Master : Data Science et Recherche Opérationnelle",
                    period: "09/2022 -- 06/2025"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "#3 école d'ingénieurs française, d'après le Classement de l'Etudiant 2025"
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "Cours : Mathématiques appliquées, Statistiques, Probabilités, Machine Learning, Optimisation, Recherche opérationnelle, IA, Python, Java, Anglais"
                    }
                ]
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                type: "subsection",
                content: {
                    title: "Shanghai Jiao Tong University",
                    subtitle: "Master en Informatique et Recherche Opérationnelle",
                    period: "09/2022 -- 06/2025"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "#9 université mondiale en Computer Science, d'après le Classement de Shanghai 2025"
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "Cours : Deep Learning, Computer Vision, Machine Learning, Cloud Computing, Chinois"
                    }
                ]
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                type: "subsection",
                content: {
                    title: "Lycée Pasteur",
                    subtitle: "Classes préparatoires scientifiques PCSI/PC (CPGE)",
                    period: "09/2020 -- 07/2022"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "Formation intensive en Mathématiques, Physique, Chimie, Informatique, Français, Anglais"
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
                    title: "JCDecaux",
                    subtitle: "Data Scientist",
                    period: "11/2024 -- 05/2025"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "Stage de 6 mois au sein de la DataCorp, entité de JCDecaux développant des produits data"
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "Développement de solutions RAG (Retrieval-Augmented Generation) as-a-service (Python, AWS, Langchain). Création de copilotes IA à destination :"
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "• des commerciaux pour un accès rapide à des données ciblées et fiables du groupe pour l'élaboration de devis."
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "• de la direction financière permettant la création de tableaux de bord à partir du langage naturel basés sur les données du groupe."
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "Ces produits permettent de réduire drastiquement le temps de recherche et les frottements entre différentes entités du groupe."
                    }
                ]
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                type: "subsection",
                content: {
                    title: "Sopra Steria Next",
                    subtitle: "Data Analyst / Data Engineer",
                    period: "04/2024 -- 10/2024"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "Stage de 6 mois, mission de conseil orientée data pour le compte du Ministère de l'Intérieur"
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "Collecte et traitement de données incluant du web scraping et extraction depuis diverses sources (Python, Selenium)."
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "Création de pipelines de données pour automatiser l'intégration et le nettoyage (Python, Pandas, M/Power BI)."
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "Production de tableaux de bord et rapports automatisés pour suivre les indicateurs de performance (Power BI, Python)."
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
                    title: "Junior Atlantique – Timber Productions",
                    subtitle: "Développeur logiciel",
                    period: "05/2023 -- 10/2023"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "Développement complet d'une application de gestion et recherche de contacts clients (JavaScript)."
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "Vente de l'application pour 3 000€."
                    }
                ]
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                type: "subsection",
                content: {
                    title: "Reeverse Systems",
                    subtitle: "Chef de projet",
                    period: "09/2023 -- 01/2024"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "Projet académique de 4 mois avec Reeverse Systems, élaboration d'un simulateur pour démontrer l'efficacité de leur solution : réduction des déchets industriels et maximisation des rendements."
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "Conception d'un simulateur multi-objectifs pour la production industrielle (Python, Matplotlib) :"
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "• Génération de données aléatoires suivant différentes lois pour simuler plusieurs facteurs (nombre d'ouvriers, poids des déchets, etc.)."
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "• Création de fronts de Pareto et visualisation sous forme de graphes radar (Python, Matplotlib)."
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                        type: "text",
                        content: "• Clustering K-means sur le front de Pareto pour ne présenter que 5 solutions représentatives."
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
                content: "Langues : Français (natif), Anglais (IELTS 7/9), Espagnol (A2), Allemand (A2)"
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                type: "text",
                content: "Programmation : Python (Pandas, Scikit-learn), SQL, GitHub, Java, JavaScript, M/Power BI"
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                type: "text",
                content: "Machine Learning : Kaggle competitions (stacking LGBM+CatBoost sur les prix de voitures d'occasion), étude de cas Roland Berger (cliniques dentaires)"
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                type: "text",
                content: "Sports : Judo, Rugby (capitaine et responsable de l'équipe de l'école)"
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])(),
                type: "text",
                content: "Bénévolat : Scouts (10 ans) + mission humanitaire (1 mois)"
            }
        ]
    }
];
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Desktop/my-cv-app/pages/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my$2d$cv$2d$app$2f$components$2f$BlockEditor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/my-cv-app/components/BlockEditor.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my$2d$cv$2d$app$2f$utils$2f$blocksToHTML$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/my-cv-app/utils/blocksToHTML.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my$2d$cv$2d$app$2f$data$2f$initialCV$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/my-cv-app/data/initialCV.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my$2d$cv$2d$app$2f$components$2f$BlockEditor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my$2d$cv$2d$app$2f$data$2f$initialCV$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my$2d$cv$2d$app$2f$components$2f$BlockEditor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my$2d$cv$2d$app$2f$data$2f$initialCV$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
function Home() {
    const [blocks, setBlocks] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my$2d$cv$2d$app$2f$data$2f$initialCV$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["initialBlocks"]);
    const [pdfUrl, setPdfUrl] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [fontScale, setFontScale] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(1);
    const [showWarning, setShowWarning] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const previewRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    // Fonction pour calculer la taille de police optimale
    const calculateOptimalFontScale = ()=>{
        if (!previewRef.current) return 1;
        // Hauteur maximale A4 approximative en pixels
        const maxHeight = 1050;
        let scale = 1;
        // Créer un div temporaire pour mesurer
        const tempDiv = document.createElement("div");
        tempDiv.style.width = "210mm";
        tempDiv.style.padding = "15mm";
        tempDiv.style.boxSizing = "border-box";
        tempDiv.style.position = "absolute";
        tempDiv.style.visibility = "hidden";
        document.body.appendChild(tempDiv);
        // Itérer pour trouver la plus grande taille qui tient
        let currentScale = 1;
        let step = 0.02; // petit pas pour précision
        while(currentScale > 0.5){
            tempDiv.style.fontSize = `${currentScale}em`;
            tempDiv.style.lineHeight = `${1.1 * currentScale}`;
            tempDiv.innerHTML = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my$2d$cv$2d$app$2f$utils$2f$blocksToHTML$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["default"])(blocks, currentScale);
            const contentHeight = tempDiv.scrollHeight;
            if (contentHeight <= maxHeight) {
                scale = currentScale;
                break;
            }
            currentScale -= step;
        }
        document.body.removeChild(tempDiv);
        return scale;
    };
    // Vérifier le dépassement à chaque changement de blocks avec délai
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const timer = setTimeout(()=>{
            const scale = calculateOptimalFontScale();
            setFontScale(scale);
            setShowWarning(scale < 1);
        }, 100); // Délai pour laisser le DOM se mettre à jour
        return ()=>clearTimeout(timer);
    }, [
        blocks
    ]);
    const handleGeneratePDF = async ()=>{
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
        const blob = await res.blob();
        setPdfUrl(URL.createObjectURL(blob));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            gap: "2rem"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my$2d$cv$2d$app$2f$components$2f$BlockEditor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                    blocks: blocks,
                    setBlocks: setBlocks
                }, void 0, false, {
                    fileName: "[project]/Desktop/my-cv-app/pages/index.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/my-cv-app/pages/index.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    overflow: "auto",
                    height: "95vh"
                },
                children: [
                    showWarning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            backgroundColor: "#fff3cd",
                            border: "1px solid #ffeaa7",
                            borderRadius: "4px",
                            padding: "8px 12px",
                            margin: "10px 0",
                            color: "#856404",
                            fontSize: "14px"
                        },
                        children: [
                            "⚠️ Attention : Tu dépasses la première page ! La taille de police a été réduite à ",
                            Math.round(fontScale * 100),
                            "% pour tenir sur une page."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/my-cv-app/pages/index.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        ref: previewRef,
                        style: {
                            width: "210mm",
                            minHeight: "297mm",
                            margin: "20px auto",
                            padding: "15mm",
                            border: "1px solid #000",
                            boxSizing: "border-box",
                            backgroundColor: "#fff",
                            fontSize: `${fontScale}em`,
                            lineHeight: `${1.1 * fontScale}`
                        },
                        dangerouslySetInnerHTML: {
                            __html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$my$2d$cv$2d$app$2f$utils$2f$blocksToHTML$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["default"])(blocks, fontScale)
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/my-cv-app/pages/index.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: "1rem",
                            display: "flex",
                            gap: "8px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: handleGeneratePDF,
                                children: "Générer PDF"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/my-cv-app/pages/index.tsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    const scale = calculateOptimalFontScale();
                                    setFontScale(scale);
                                    setShowWarning(scale < 1);
                                },
                                style: {
                                    fontSize: "12px"
                                },
                                children: "Recalculer taille"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/my-cv-app/pages/index.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/my-cv-app/pages/index.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    pdfUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("iframe", {
                        src: pdfUrl,
                        width: "100%",
                        height: "500px",
                        style: {
                            marginTop: "1rem"
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/my-cv-app/pages/index.tsx",
                        lineNumber: 117,
                        columnNumber: 20
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/my-cv-app/pages/index.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/my-cv-app/pages/index.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__92040cea._.js.map