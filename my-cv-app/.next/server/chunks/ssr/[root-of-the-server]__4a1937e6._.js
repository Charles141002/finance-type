module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
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
"[project]/utils/types.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "canMoveBlock",
    ()=>canMoveBlock,
    "dropConstraints",
    ()=>dropConstraints,
    "findBlockById",
    ()=>findBlockById,
    "getAllChildBlocks",
    ()=>getAllChildBlocks
]);
const dropConstraints = {
    // En-tête : peut être déplacé n'importe où au niveau racine ou entre autres blocs racine
    header: {
        canMoveTo: (context)=>!context.destination.parentId
    },
    // Contacts : peut être déplacé n'importe où au niveau racine ou entre autres blocs racine
    contact: {
        canMoveTo: (context)=>!context.destination.parentId
    },
    // Séparateur : peut être déplacé n'importe où au niveau racine ou entre autres blocs racine
    divider: {
        canMoveTo: (context)=>!context.destination.parentId
    },
    // Section : peut être déplacé n'importe où au niveau racine
    section: {
        canMoveTo: (context)=>!context.destination.parentId
    },
    // Sous-section : doit toujours être dans une section
    subsection: {
        canMoveTo: (context)=>{
            // Vérifier si la destination est dans une section
            if (!context.destination.parentId) return false;
            // Trouver le bloc parent de destination
            const isInSection = (blocks, parentId)=>{
                const parentBlock = blocks.find((b)=>b.id === parentId);
                if (!parentBlock) return false;
                if (parentBlock.type === "section") return true;
                if (parentBlock.children) {
                    return parentBlock.children.some((child)=>isInSection([
                            child
                        ], parentId));
                }
                return false;
            };
            return true; // TODO: Implémenter la vérification réelle
        }
    },
    // Texte : peut être déplacé n'importe où
    text: {
        canMoveTo: ()=>true
    }
};
const canMoveBlock = (context, allBlocks)=>{
    // Tous les blocs peuvent être déplacés n'importe où - aucune restriction
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
"[project]/components/BlockEditor.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$types$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/types.ts [ssr] (ecmascript)");
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
    // Drag & Drop avec règles
    // -------------------
    const handleDragEnd = (result)=>{
        if (!result.destination) return;
        const { source, destination } = result;
        // Trouver le bloc source
        let sourceBlock;
        if (source.droppableId === "root") {
            sourceBlock = blocks[source.index];
        } else {
            const parentBlock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$types$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["findBlockById"])(blocks, source.droppableId);
            if (parentBlock && parentBlock.children) {
                sourceBlock = parentBlock.children[source.index];
            }
        }
        if (!sourceBlock) return;
        // Trouver le parent de destination
        const destinationParent = destination.droppableId !== "root" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$types$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["findBlockById"])(blocks, destination.droppableId) : undefined;
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
        // Tous les déplacements sont autorisés - aucune restriction
        // Effectuer le déplacement selon les règles
        setBlocks(moveBlockWithRules(blocks, result));
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
    const moveBlockBetweenContainers = (blocks, source, destination)=>{
        // Trouver le bloc à déplacer
        let blockToMove;
        if (source.droppableId === "root") {
            blockToMove = blocks[source.index];
        } else {
            const sourceBlock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$types$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["findBlockById"])(blocks, source.droppableId);
            if (sourceBlock && sourceBlock.children) {
                blockToMove = sourceBlock.children[source.index];
            }
        }
        if (!blockToMove) return blocks;
        // Supprimer le bloc de la source
        const blocksWithoutSource = removeBlockFromContainer(blocks, source.droppableId, source.index);
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
    const renderBlock = (block, parentId, handleProps)=>{
        const canHaveChildren = block.type === "section" || block.type === "subsection";
        const parentBlock = parentId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$types$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["findBlockById"])(blocks, parentId) : undefined;
        const isChildOfSubsection = parentBlock?.type === "subsection";
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "card",
            style: {
                borderRadius: "12px",
                padding: "12px",
                marginBottom: "10px",
                transition: "box-shadow 0.15s ease, border-color 0.15s ease"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "8px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "8px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    ...handleProps,
                                    style: {
                                        cursor: "grab",
                                        padding: "4px",
                                        borderRadius: "8px",
                                        backgroundColor: "#f3f4f6",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        minWidth: "20px",
                                        height: "20px"
                                    },
                                    children: "⋮⋮"
                                }, void 0, false, {
                                    fileName: "[project]/components/BlockEditor.tsx",
                                    lineNumber: 247,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                    style: {
                                        color: block.type === "header" ? "#2563eb" : block.type === "section" ? "#059669" : block.type === "subsection" ? "#7c3aed" : "#4b5563"
                                    },
                                    children: block.type.toUpperCase()
                                }, void 0, false, {
                                    fileName: "[project]/components/BlockEditor.tsx",
                                    lineNumber: 263,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/BlockEditor.tsx",
                            lineNumber: 246,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: "6px"
                            },
                            children: [
                                canHaveChildren && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                            value: subBlockTypes[block.id] || "text",
                                            onChange: (e)=>setSubBlockTypes({
                                                    ...subBlockTypes,
                                                    [block.id]: e.target.value
                                                }),
                                            style: {
                                                marginRight: 8,
                                                padding: "6px 10px",
                                                borderRadius: "8px",
                                                border: "1px solid #e5e7eb",
                                                background: "#fff",
                                                fontSize: "12px",
                                                outline: "none"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "text",
                                                    children: "Texte"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/BlockEditor.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "subsection",
                                                    children: "Sous-section"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/BlockEditor.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/BlockEditor.tsx",
                                            lineNumber: 275,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleAddBlock(block.id),
                                            style: {
                                                marginRight: 8,
                                                padding: "6px 10px",
                                                backgroundColor: "#2563eb",
                                                color: "white",
                                                border: "1px solid transparent",
                                                borderRadius: "8px",
                                                fontSize: "12px",
                                                cursor: "pointer",
                                                boxShadow: "0 1px 2px rgba(0,0,0,0.06)"
                                            },
                                            children: "+ sous-bloc"
                                        }, void 0, false, {
                                            fileName: "[project]/components/BlockEditor.tsx",
                                            lineNumber: 296,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleDeleteBlock(block.id),
                                    style: {
                                        color: "#ef4444",
                                        backgroundColor: "transparent",
                                        border: "1px solid #f3f4f6",
                                        cursor: "pointer",
                                        padding: "6px 8px",
                                        borderRadius: "8px"
                                    },
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/components/BlockEditor.tsx",
                                    lineNumber: 314,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/BlockEditor.tsx",
                            lineNumber: 272,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/BlockEditor.tsx",
                    lineNumber: 245,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: 8
                    },
                    children: block.type === "divider" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("hr", {
                        style: {
                            border: "none",
                            borderTop: "2px solid #e5e7eb",
                            margin: "8px 0"
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/BlockEditor.tsx",
                        lineNumber: 333,
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
                                    padding: "10px",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "10px",
                                    maxWidth: "640px",
                                    outline: "none",
                                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/BlockEditor.tsx",
                                lineNumber: 336,
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
                                    padding: "10px",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "10px",
                                    maxWidth: "640px",
                                    outline: "none",
                                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/BlockEditor.tsx",
                                lineNumber: 342,
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
                                    padding: "10px",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "10px",
                                    maxWidth: "640px",
                                    outline: "none",
                                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/BlockEditor.tsx",
                                lineNumber: 348,
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
                                    padding: "10px",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "10px",
                                    maxWidth: "640px",
                                    outline: "none",
                                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/BlockEditor.tsx",
                                lineNumber: 354,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BlockEditor.tsx",
                        lineNumber: 335,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : block.type === "subsection" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                placeholder: "Titre (ex: JCDecaux)",
                                value: block.content?.title || "",
                                onChange: (e)=>updateBlockContent(block.id, {
                                        ...block.content,
                                        title: e.target.value
                                    }),
                                style: {
                                    padding: "10px",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "10px",
                                    fontWeight: "600",
                                    maxWidth: "600px",
                                    outline: "none"
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/BlockEditor.tsx",
                                lineNumber: 363,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                placeholder: "Sous-titre (ex: Data Scientist)",
                                value: block.content?.subtitle || "",
                                onChange: (e)=>updateBlockContent(block.id, {
                                        ...block.content,
                                        subtitle: e.target.value
                                    }),
                                style: {
                                    padding: "10px",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "10px",
                                    maxWidth: "600px",
                                    outline: "none"
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/BlockEditor.tsx",
                                lineNumber: 369,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                placeholder: "Période (ex: 11/2024 -- 05/2025)",
                                value: block.content?.period || "",
                                onChange: (e)=>updateBlockContent(block.id, {
                                        ...block.content,
                                        period: e.target.value
                                    }),
                                style: {
                                    padding: "10px",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "10px",
                                    fontStyle: "italic",
                                    maxWidth: "600px",
                                    outline: "none"
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/BlockEditor.tsx",
                                lineNumber: 375,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BlockEditor.tsx",
                        lineNumber: 362,
                        columnNumber: 13
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
                        rows: block.type === "header" ? 1 : 3,
                        style: {
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #e5e7eb",
                            borderRadius: "10px",
                            fontSize: block.type === "header" ? "18px" : "14px",
                            fontWeight: block.type === "header" ? "bold" : "normal",
                            resize: "vertical",
                            maxWidth: isChildOfSubsection ? "560px" : "640px"
                        },
                        placeholder: block.type === "header" ? "Nom complet" : block.type === "section" ? "Titre de section" : "Contenu du texte..."
                    }, void 0, false, {
                        fileName: "[project]/components/BlockEditor.tsx",
                        lineNumber: 383,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/BlockEditor.tsx",
                    lineNumber: 331,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                canHaveChildren && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$hello$2d$pangea$2f$dnd__$5b$external$5d$__$2840$hello$2d$pangea$2f$dnd$2c$__cjs$29$__["Droppable"], {
                    droppableId: block.id,
                    type: "CHILD",
                    renderClone: (provided, snapshot, rubric)=>{
                        const parent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$types$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["findBlockById"])(blocks, block.id);
                        const dragged = parent?.children?.[rubric.source.index];
                        if (!dragged) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {}, void 0, false, {
                            fileName: "[project]/components/BlockEditor.tsx",
                            lineNumber: 415,
                            columnNumber: 34
                        }, void 0);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            ref: provided.innerRef,
                            ...provided.draggableProps,
                            ...provided.dragHandleProps,
                            style: {
                                ...provided.draggableProps.style,
                                pointerEvents: "none",
                                userSelect: "none",
                                border: "1px solid #93c5fd",
                                background: "#dbeafe",
                                borderRadius: 8,
                                padding: 8
                            },
                            children: dragged.type.toUpperCase()
                        }, void 0, false, {
                            fileName: "[project]/components/BlockEditor.tsx",
                            lineNumber: 417,
                            columnNumber: 15
                        }, void 0);
                    },
                    children: (provided, snapshot)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            ref: provided.innerRef,
                            ...provided.droppableProps,
                            style: {
                                marginLeft: 16,
                                marginTop: 12,
                                paddingLeft: 12,
                                borderLeft: "2px solid #e5e7eb",
                                backgroundColor: snapshot.isDraggingOver ? "#f0f9ff" : "transparent",
                                borderRadius: "4px",
                                minHeight: "28px",
                                transition: "background-color 0.2s ease"
                            },
                            children: [
                                block.children?.map((child, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$hello$2d$pangea$2f$dnd__$5b$external$5d$__$2840$hello$2d$pangea$2f$dnd$2c$__cjs$29$__["Draggable"], {
                                        draggableId: child.id,
                                        index: index,
                                        children: (provided)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                ref: provided.innerRef,
                                                ...provided.draggableProps,
                                                children: renderBlock(child, block.id, provided.dragHandleProps)
                                            }, void 0, false, {
                                                fileName: "[project]/components/BlockEditor.tsx",
                                                lineNumber: 453,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                    }, child.id, false, {
                                        fileName: "[project]/components/BlockEditor.tsx",
                                        lineNumber: 451,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))),
                                provided.placeholder
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/BlockEditor.tsx",
                            lineNumber: 436,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/BlockEditor.tsx",
                    lineNumber: 412,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/BlockEditor.tsx",
            lineNumber: 235,
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: "24px",
                    padding: "16px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #e1e5e9"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        style: {
                            margin: "0 0 8px 0",
                            color: "#1f2937"
                        },
                        children: "Éditeur de CV"
                    }, void 0, false, {
                        fileName: "[project]/components/BlockEditor.tsx",
                        lineNumber: 484,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        style: {
                            margin: "0 0 16px 0",
                            color: "#6b7280",
                            fontSize: "14px"
                        },
                        children: "Glissez-déposez les blocs pour réorganiser votre CV. Les règles de déplacement sont appliquées automatiquement."
                    }, void 0, false, {
                        fileName: "[project]/components/BlockEditor.tsx",
                        lineNumber: 485,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: "12px",
                            alignItems: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                value: newBlockType,
                                onChange: (e)=>setNewBlockType(e.target.value),
                                style: {
                                    padding: "8px 12px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "6px",
                                    backgroundColor: "#fff",
                                    fontSize: "14px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                        value: "header",
                                        children: "En-tête"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BlockEditor.tsx",
                                        lineNumber: 501,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                        value: "contact",
                                        children: "Contact"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BlockEditor.tsx",
                                        lineNumber: 502,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                        value: "section",
                                        children: "Section"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BlockEditor.tsx",
                                        lineNumber: 503,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                        value: "subsection",
                                        children: "Sous-section"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BlockEditor.tsx",
                                        lineNumber: 504,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                        value: "text",
                                        children: "Texte"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BlockEditor.tsx",
                                        lineNumber: 505,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                        value: "divider",
                                        children: "Séparateur"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BlockEditor.tsx",
                                        lineNumber: 506,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BlockEditor.tsx",
                                lineNumber: 490,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleAddBlock(),
                                style: {
                                    padding: "8px 16px",
                                    backgroundColor: "#3b82f6",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    fontWeight: "500"
                                },
                                children: "+ Ajouter bloc"
                            }, void 0, false, {
                                fileName: "[project]/components/BlockEditor.tsx",
                                lineNumber: 508,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BlockEditor.tsx",
                        lineNumber: 489,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/BlockEditor.tsx",
                lineNumber: 477,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$hello$2d$pangea$2f$dnd__$5b$external$5d$__$2840$hello$2d$pangea$2f$dnd$2c$__cjs$29$__["DragDropContext"], {
                onDragEnd: handleDragEnd,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$hello$2d$pangea$2f$dnd__$5b$external$5d$__$2840$hello$2d$pangea$2f$dnd$2c$__cjs$29$__["Droppable"], {
                    droppableId: "root",
                    type: "ROOT",
                    renderClone: (provided, snapshot, rubric)=>{
                        const dragged = blocks[rubric.source.index];
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            ref: provided.innerRef,
                            ...provided.draggableProps,
                            ...provided.dragHandleProps,
                            style: {
                                ...provided.draggableProps.style,
                                pointerEvents: "none",
                                userSelect: "none",
                                border: "1px solid #93c5fd",
                                background: "#dbeafe",
                                borderRadius: 8,
                                padding: 8
                            },
                            children: dragged?.type.toUpperCase()
                        }, void 0, false, {
                            fileName: "[project]/components/BlockEditor.tsx",
                            lineNumber: 531,
                            columnNumber: 13
                        }, void 0);
                    },
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
                                    fileName: "[project]/components/BlockEditor.tsx",
                                    lineNumber: 563,
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
                                                children: renderBlock(block, undefined, provided.dragHandleProps)
                                            }, void 0, false, {
                                                fileName: "[project]/components/BlockEditor.tsx",
                                                lineNumber: 575,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                    }, block.id, false, {
                                        fileName: "[project]/components/BlockEditor.tsx",
                                        lineNumber: 573,
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
                                    fileName: "[project]/components/BlockEditor.tsx",
                                    lineNumber: 592,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/BlockEditor.tsx",
                            lineNumber: 550,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/BlockEditor.tsx",
                    lineNumber: 528,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/BlockEditor.tsx",
                lineNumber: 527,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/BlockEditor.tsx",
        lineNumber: 475,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = BlockEditor;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/utils/blocksToHTML.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/data/initialCV.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/pages/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$resizable$2d$panels__$5b$external$5d$__$28$react$2d$resizable$2d$panels$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/react-resizable-panels [external] (react-resizable-panels, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BlockEditor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/BlockEditor.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$blocksToHTML$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/blocksToHTML.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$initialCV$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/initialCV.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$resizable$2d$panels__$5b$external$5d$__$28$react$2d$resizable$2d$panels$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BlockEditor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$initialCV$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$resizable$2d$panels__$5b$external$5d$__$28$react$2d$resizable$2d$panels$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BlockEditor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$initialCV$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
// Styles CSS globaux + responsivité
const styles = `
  :root {
    --bg: #f7f8fb;
    --card: #ffffff;
    --border: #e7eaf0;
    --muted: #6b7280;
    --text: #111827;
    --primary: #2563eb;
    --primary-600: #2f6ded;
    --ring: rgba(37, 99, 235, 0.25);
  }

  * { box-sizing: border-box; }
  html, body, #__next { height: 100%; }
  body {
    margin: 0;
    background: var(--bg);
    color: var(--text);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: 0.1px;
  }

  button {
    transition: background-color .15s ease, box-shadow .15s ease, transform .06s ease;
  }
  button:active { transform: translateY(1px); }

  .card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(17,24,39,0.04);
  }

  .muted { color: var(--muted); }

  .preview-cv {
    transform: scale(0.8);
    transform-origin: top center;
  }
  
  @media (max-width: 1200px) {
    .preview-cv { transform: scale(0.6) !important; }
  }
  
  @media (max-width: 768px) {
    .preview-cv { transform: scale(0.5) !important; }
  }
`;
function Home() {
    // IDs stables: charger depuis localStorage si disponible
    const [blocks, setBlocks] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [fontScale, setFontScale] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(1);
    const [showWarning, setShowWarning] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const previewRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    // Charger/Sauvegarder les blocs pour stabiliser les IDs (éviter HMR qui regénère)
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }, [
        blocks
    ]);
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
            tempDiv.innerHTML = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$blocksToHTML$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["default"])(blocks, currentScale);
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
        // Créer un lien de téléchargement
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'mon-cv.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("style", {
                children: styles
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 163,
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
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BlockEditor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                blocks: blocks,
                                setBlocks: setBlocks
                            }, void 0, false, {
                                fileName: "[project]/pages/index.tsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/pages/index.tsx",
                            lineNumber: 167,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 166,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$resizable$2d$panels__$5b$external$5d$__$28$react$2d$resizable$2d$panels$2c$__esm_import$29$__["PanelResizeHandle"], {
                        style: {
                            width: "10px",
                            background: "linear-gradient(180deg, #eef1f6 0%, #e7eaf0 100%)",
                            cursor: "col-resize",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderLeft: "1px solid #e6e9ef",
                            borderRight: "1px solid #e6e9ef"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                width: "4px",
                                height: "36px",
                                background: "#c9d1e1",
                                borderRadius: "2px"
                            }
                        }, void 0, false, {
                            fileName: "[project]/pages/index.tsx",
                            lineNumber: 189,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$resizable$2d$panels__$5b$external$5d$__$28$react$2d$resizable$2d$panels$2c$__esm_import$29$__["Panel"], {
                        defaultSize: 45,
                        minSize: 45,
                        maxSize: 45,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                height: "100vh",
                                overflow: "auto",
                                backgroundColor: "var(--bg)",
                                padding: "0.75rem",
                                borderLeft: "1px solid var(--border)"
                            },
                            children: [
                                showWarning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        backgroundColor: "#fff7e6",
                                        border: "1px solid #ffe2a8",
                                        borderRadius: "8px",
                                        padding: "10px 12px",
                                        margin: "10px 0",
                                        color: "#8a6d3b",
                                        fontSize: "14px"
                                    },
                                    children: [
                                        "⚠️ Attention : Tu dépasses la première page ! La taille de police a été réduite à ",
                                        Math.round(fontScale * 100),
                                        "% pour tenir sur une page."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 207,
                                    columnNumber: 11
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
                                            border: "1px solid #d1d5db",
                                            boxSizing: "border-box",
                                            backgroundColor: "#fff",
                                            fontSize: `${fontScale}em`,
                                            lineHeight: `${1.1 * fontScale}`,
                                            transform: "scale(0.8)",
                                            transformOrigin: "top left",
                                            marginBottom: "0.1rem",
                                            borderRadius: "8px",
                                            boxShadow: "0 12px 24px rgba(17,24,39,0.06)"
                                        },
                                        dangerouslySetInnerHTML: {
                                            __html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$blocksToHTML$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["default"])(blocks, fontScale)
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.tsx",
                                        lineNumber: 222,
                                        columnNumber: 11
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 220,
                                    columnNumber: 9
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "8px",
                                        position: "sticky",
                                        bottom: "0.5rem",
                                        backgroundColor: "#fff",
                                        padding: "1rem",
                                        borderRadius: "12px",
                                        border: "1px solid var(--border)",
                                        boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(17,24,39,0.06)"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: handleGeneratePDF,
                                            style: {
                                                padding: "12px 16px",
                                                backgroundColor: "var(--primary)",
                                                color: "white",
                                                border: "1px solid transparent",
                                                borderRadius: "10px",
                                                cursor: "pointer",
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                                                outline: "none"
                                            },
                                            children: "Générer PDF"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 256,
                                            columnNumber: 11
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                            href: "/landing",
                                            style: {
                                                textAlign: "center",
                                                padding: "10px 12px",
                                                backgroundColor: "#fff",
                                                color: "#111827",
                                                border: "1px solid var(--border)",
                                                borderRadius: "10px",
                                                textDecoration: "none",
                                                fontSize: "14px",
                                                fontWeight: 600
                                            },
                                            children: "Voir la landing"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.tsx",
                                            lineNumber: 273,
                                            columnNumber: 11
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/index.tsx",
                                    lineNumber: 244,
                                    columnNumber: 9
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/index.tsx",
                            lineNumber: 199,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/index.tsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4a1937e6._.js.map