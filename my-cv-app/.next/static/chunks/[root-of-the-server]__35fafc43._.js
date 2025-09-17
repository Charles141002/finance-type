(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect(param) {
    let { addMessageListener, sendMessage, onUpdateError = console.error } = param;
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: (param)=>{
            let [chunkPath, callback] = param;
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        var _updateA_modules;
        const deletedModules = new Set((_updateA_modules = updateA.modules) !== null && _updateA_modules !== void 0 ? _updateA_modules : []);
        var _updateB_modules;
        const addedModules = new Set((_updateB_modules = updateB.modules) !== null && _updateB_modules !== void 0 ? _updateB_modules : []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        var _updateA_added, _updateB_added;
        const added = new Set([
            ...(_updateA_added = updateA.added) !== null && _updateA_added !== void 0 ? _updateA_added : [],
            ...(_updateB_added = updateB.added) !== null && _updateB_added !== void 0 ? _updateB_added : []
        ]);
        var _updateA_deleted, _updateB_deleted;
        const deleted = new Set([
            ...(_updateA_deleted = updateA.deleted) !== null && _updateA_deleted !== void 0 ? _updateA_deleted : [],
            ...(_updateB_deleted = updateB.deleted) !== null && _updateB_deleted !== void 0 ? _updateB_deleted : []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        var _updateA_modules1, _updateB_added1;
        const modules = new Set([
            ...(_updateA_modules1 = updateA.modules) !== null && _updateA_modules1 !== void 0 ? _updateA_modules1 : [],
            ...(_updateB_added1 = updateB.added) !== null && _updateB_added1 !== void 0 ? _updateB_added1 : []
        ]);
        var _updateB_deleted1;
        for (const moduleId of (_updateB_deleted1 = updateB.deleted) !== null && _updateB_deleted1 !== void 0 ? _updateB_deleted1 : []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        var _updateB_modules1;
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set((_updateB_modules1 = updateB.modules) !== null && _updateB_modules1 !== void 0 ? _updateB_modules1 : []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error("Invariant: ".concat(message));
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/utils/types.ts [client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/BlockEditor.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hello$2d$pangea$2f$dnd$2f$dist$2f$dnd$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@hello-pangea/dnd/dist/dnd.esm.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/v4.js [client] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$types$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/types.ts [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const BlockEditor = (param)=>{
    let { blocks, setBlocks } = param;
    _s();
    const [newBlockType, setNewBlockType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("text");
    const [subBlockTypes, setSubBlockTypes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({});
    // -------------------
    // Ajouter un bloc
    // -------------------
    const handleAddBlock = (parentId)=>{
        const typeToUse = parentId ? subBlockTypes[parentId] || "text" : newBlockType;
        const newBlock = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
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
            const parentBlock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$types$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["findBlockById"])(blocks, source.droppableId);
            if (parentBlock && parentBlock.children) {
                sourceBlock = parentBlock.children[source.index];
            }
        }
        if (!sourceBlock) return;
        // Trouver le parent de destination
        const destinationParent = destination.droppableId !== "root" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$types$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["findBlockById"])(blocks, destination.droppableId) : undefined;
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
            const sourceBlock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$types$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["findBlockById"])(blocks, source.droppableId);
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
        var _block_content, _block_content1, _block_content2, _block_content3, _block_content4, _block_content5, _block_content6, _block_content7;
        const canHaveChildren = block.type === "section" || block.type === "subsection";
        const parentBlock = parentId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$types$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["findBlockById"])(blocks, parentId) : undefined;
        const isChildOfSubsection = (parentBlock === null || parentBlock === void 0 ? void 0 : parentBlock.type) === "subsection";
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "card",
            style: {
                borderRadius: "12px",
                padding: "12px",
                marginBottom: "10px",
                transition: "box-shadow 0.15s ease, border-color 0.15s ease"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "8px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "8px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: "6px"
                            },
                            children: [
                                canHaveChildren && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "text",
                                                    children: "Texte"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/BlockEditor.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: 8
                    },
                    children: block.type === "divider" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                        style: {
                            border: "none",
                            borderTop: "2px solid #e5e7eb",
                            margin: "8px 0"
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/BlockEditor.tsx",
                        lineNumber: 333,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : block.type === "contact" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                placeholder: "Email",
                                value: ((_block_content = block.content) === null || _block_content === void 0 ? void 0 : _block_content.email) || "",
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                placeholder: "Téléphone",
                                value: ((_block_content1 = block.content) === null || _block_content1 === void 0 ? void 0 : _block_content1.phone) || "",
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                placeholder: "Adresse",
                                value: ((_block_content2 = block.content) === null || _block_content2 === void 0 ? void 0 : _block_content2.address) || "",
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                placeholder: "LinkedIn",
                                value: ((_block_content3 = block.content) === null || _block_content3 === void 0 ? void 0 : _block_content3.linkedin) || "",
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
                    }, ("TURBOPACK compile-time value", void 0)) : block.type === "subsection" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                placeholder: "Titre (ex: JCDecaux)",
                                value: ((_block_content4 = block.content) === null || _block_content4 === void 0 ? void 0 : _block_content4.title) || "",
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                placeholder: "Sous-titre (ex: Data Scientist)",
                                value: ((_block_content5 = block.content) === null || _block_content5 === void 0 ? void 0 : _block_content5.subtitle) || "",
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                placeholder: "Période (ex: 11/2024 -- 05/2025)",
                                value: ((_block_content6 = block.content) === null || _block_content6 === void 0 ? void 0 : _block_content6.period) || "",
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
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: typeof block.content === "string" ? block.content : ((_block_content7 = block.content) === null || _block_content7 === void 0 ? void 0 : _block_content7.title) || "",
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
                canHaveChildren && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hello$2d$pangea$2f$dnd$2f$dist$2f$dnd$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Droppable"], {
                    droppableId: block.id,
                    type: "CHILD",
                    renderClone: (provided, snapshot, rubric)=>{
                        var _parent_children;
                        const parent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$types$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["findBlockById"])(blocks, block.id);
                        const dragged = parent === null || parent === void 0 ? void 0 : (_parent_children = parent.children) === null || _parent_children === void 0 ? void 0 : _parent_children[rubric.source.index];
                        if (!dragged) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                            fileName: "[project]/components/BlockEditor.tsx",
                            lineNumber: 415,
                            columnNumber: 34
                        }, void 0);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    children: (provided, snapshot)=>{
                        var _block_children;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                (_block_children = block.children) === null || _block_children === void 0 ? void 0 : _block_children.map((child, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hello$2d$pangea$2f$dnd$2f$dist$2f$dnd$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Draggable"], {
                                        draggableId: child.id,
                                        index: index,
                                        children: (provided)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        }, ("TURBOPACK compile-time value", void 0));
                    }
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: "20px",
            backgroundColor: "#f8fafc"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: "24px",
                    padding: "16px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #e1e5e9"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: "12px",
                            alignItems: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "header",
                                        children: "En-tête"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BlockEditor.tsx",
                                        lineNumber: 501,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "contact",
                                        children: "Contact"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BlockEditor.tsx",
                                        lineNumber: 502,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "section",
                                        children: "Section"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BlockEditor.tsx",
                                        lineNumber: 503,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "subsection",
                                        children: "Sous-section"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BlockEditor.tsx",
                                        lineNumber: 504,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "text",
                                        children: "Texte"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BlockEditor.tsx",
                                        lineNumber: 505,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hello$2d$pangea$2f$dnd$2f$dist$2f$dnd$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DragDropContext"], {
                onDragEnd: handleDragEnd,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hello$2d$pangea$2f$dnd$2f$dist$2f$dnd$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Droppable"], {
                    droppableId: "root",
                    type: "ROOT",
                    renderClone: (provided, snapshot, rubric)=>{
                        const dragged = blocks[rubric.source.index];
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            children: dragged === null || dragged === void 0 ? void 0 : dragged.type.toUpperCase()
                        }, void 0, false, {
                            fileName: "[project]/components/BlockEditor.tsx",
                            lineNumber: 531,
                            columnNumber: 13
                        }, void 0);
                    },
                    children: (provided, snapshot)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                blocks.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                }, ("TURBOPACK compile-time value", void 0)) : blocks.map((block, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hello$2d$pangea$2f$dnd$2f$dist$2f$dnd$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Draggable"], {
                                        draggableId: block.id,
                                        index: index,
                                        children: (provided, snapshot)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                snapshot.isDraggingOver && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_s(BlockEditor, "0TIVEvsGG99rsnwVnwVgcIVIOL8=");
_c = BlockEditor;
const __TURBOPACK__default__export__ = BlockEditor;
var _c;
__turbopack_context__.k.register(_c, "BlockEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/utils/blocksToHTML.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>blocksToHTML
]);
function blocksToHTML(blocks) {
    let fontScale = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
    return blocks.map((block)=>{
        switch(block.type){
            case "header":
                {
                    var _block_content;
                    const text = ((_block_content = block.content) === null || _block_content === void 0 ? void 0 : _block_content.title) || "";
                    return '<div style="text-align:center; margin-bottom:'.concat(8 * fontScale, 'px;">\n            <h1 style="font-size:').concat(18 * fontScale, 'pt; font-weight:bold; margin:0; padding:0;">').concat(text, "</h1>\n          </div>");
                }
            case "contact":
                {
                    const c = block.content || {};
                    return '<div style="text-align:center; margin-bottom:'.concat(8 * fontScale, "px; font-size:").concat(10 * fontScale, 'pt;">\n            ').concat(c.email || "", " • ").concat(c.phone || "", " • ").concat(c.address || "", " • ").concat(c.linkedin || "", "\n          </div>");
                }
            case "text":
                {
                    const content = block.content || "";
                    const isItalic = content.includes("Étudiant à IMT Atlantique");
                    const isBullet = content.startsWith("•");
                    const hasChildren = block.children && block.children.length > 0;
                    if (isBullet) {
                        return '<div style="margin-left:'.concat(16 * fontScale, "px; margin-bottom:").concat(2 * fontScale, "px; font-size:").concat(10 * fontScale, 'pt;">\n              ').concat(content, "\n            </div>").concat(blocksToHTML(block.children || [], fontScale));
                    } else if (isItalic) {
                        return '<div style="text-align:center; margin-bottom:'.concat(8 * fontScale, "px; font-style:italic; font-size:").concat(10 * fontScale, 'pt;">\n              ').concat(content, "\n            </div>").concat(blocksToHTML(block.children || [], fontScale));
                    } else {
                        return '<div style="margin-left:'.concat(hasChildren ? 16 * fontScale : 0, "px; margin-bottom:").concat(2 * fontScale, "px; font-size:").concat(10 * fontScale, 'pt;">\n              ').concat(content, "\n            </div>").concat(blocksToHTML(block.children || [], fontScale));
                    }
                }
            case "divider":
                return '<hr style="border:0; border-top:1px solid #000; margin:'.concat(8 * fontScale, 'px 0;"/>');
            case "section":
                var _block_content1;
                return '<div style="margin-top:'.concat(8 * fontScale, 'px;">\n            <h2 style="font-size:').concat(12 * fontScale, "pt; font-weight:bold; text-transform:uppercase; margin:0 0 ").concat(4 * fontScale, 'px 0;">').concat(((_block_content1 = block.content) === null || _block_content1 === void 0 ? void 0 : _block_content1.title) || "", "</h2>\n            ").concat(blocksToHTML(block.children || [], fontScale), "\n          </div>");
            case "subsection":
                var _block_content2, _block_content3, _block_content4;
                return '<div style="margin-bottom:'.concat(4 * fontScale, 'px;">\n            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:').concat(2 * fontScale, 'px;">\n              <div>\n                <div style="font-weight:bold; font-size:').concat(10 * fontScale, 'pt;">').concat(((_block_content2 = block.content) === null || _block_content2 === void 0 ? void 0 : _block_content2.title) || "", "</div>\n                ").concat(((_block_content3 = block.content) === null || _block_content3 === void 0 ? void 0 : _block_content3.subtitle) ? '<div style="font-size:'.concat(10 * fontScale, "pt; margin-top:").concat(1 * fontScale, 'px;">').concat(block.content.subtitle, "</div>") : "", '\n              </div>\n              <div style="font-style:italic; font-size:').concat(10 * fontScale, 'pt;">').concat(((_block_content4 = block.content) === null || _block_content4 === void 0 ? void 0 : _block_content4.period) || "", "</div>\n            </div>\n            ").concat(blocksToHTML(block.children || [], fontScale), "\n          </div>");
            default:
                return "";
        }
    }).join("");
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/initialCV.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialBlocks",
    ()=>initialBlocks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/v4.js [client] (ecmascript) <export default as v4>");
;
const initialBlocks = [
    {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
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
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
        type: "contact",
        content: {
            email: "charlespelong@gmail.com",
            phone: "+33 7 83 28 54 92",
            address: "31 Avenue de Verdun, 78290 Croissy-sur-Seine",
            linkedin: "https://fr.linkedin.com/in/charles-pelong-a68212246"
        }
    },
    {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
        type: "text",
        content: "Étudiant à IMT Atlantique à la recherche d'un stage de fin d'études à partir du 04/2026 dans le domaine de la science des données et de l'apprentissage automatique."
    },
    {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
        type: "divider"
    },
    {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
        type: "section",
        content: {
            title: "FORMATIONS"
        },
        children: [
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                type: "subsection",
                content: {
                    title: "IMT Atlantique",
                    subtitle: "Master : Data Science et Recherche Opérationnelle",
                    period: "09/2022 -- 06/2025"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "#3 école d'ingénieurs française, d'après le Classement de l'Etudiant 2025"
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "Cours : Mathématiques appliquées, Statistiques, Probabilités, Machine Learning, Optimisation, Recherche opérationnelle, IA, Python, Java, Anglais"
                    }
                ]
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                type: "subsection",
                content: {
                    title: "Shanghai Jiao Tong University",
                    subtitle: "Master en Informatique et Recherche Opérationnelle",
                    period: "09/2022 -- 06/2025"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "#9 université mondiale en Computer Science, d'après le Classement de Shanghai 2025"
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "Cours : Deep Learning, Computer Vision, Machine Learning, Cloud Computing, Chinois"
                    }
                ]
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                type: "subsection",
                content: {
                    title: "Lycée Pasteur",
                    subtitle: "Classes préparatoires scientifiques PCSI/PC (CPGE)",
                    period: "09/2020 -- 07/2022"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "Formation intensive en Mathématiques, Physique, Chimie, Informatique, Français, Anglais"
                    }
                ]
            }
        ]
    },
    {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
        type: "divider"
    },
    {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
        type: "section",
        content: {
            title: "EXPERIENCES PROFESSIONNELLES"
        },
        children: [
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                type: "subsection",
                content: {
                    title: "JCDecaux",
                    subtitle: "Data Scientist",
                    period: "11/2024 -- 05/2025"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "Stage de 6 mois au sein de la DataCorp, entité de JCDecaux développant des produits data"
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "Développement de solutions RAG (Retrieval-Augmented Generation) as-a-service (Python, AWS, Langchain). Création de copilotes IA à destination :"
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "• des commerciaux pour un accès rapide à des données ciblées et fiables du groupe pour l'élaboration de devis."
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "• de la direction financière permettant la création de tableaux de bord à partir du langage naturel basés sur les données du groupe."
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "Ces produits permettent de réduire drastiquement le temps de recherche et les frottements entre différentes entités du groupe."
                    }
                ]
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                type: "subsection",
                content: {
                    title: "Sopra Steria Next",
                    subtitle: "Data Analyst / Data Engineer",
                    period: "04/2024 -- 10/2024"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "Stage de 6 mois, mission de conseil orientée data pour le compte du Ministère de l'Intérieur"
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "Collecte et traitement de données incluant du web scraping et extraction depuis diverses sources (Python, Selenium)."
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "Création de pipelines de données pour automatiser l'intégration et le nettoyage (Python, Pandas, M/Power BI)."
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "Production de tableaux de bord et rapports automatisés pour suivre les indicateurs de performance (Power BI, Python)."
                    }
                ]
            }
        ]
    },
    {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
        type: "divider"
    },
    {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
        type: "section",
        content: {
            title: "AUTRES EXPERIENCES"
        },
        children: [
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                type: "subsection",
                content: {
                    title: "Junior Atlantique – Timber Productions",
                    subtitle: "Développeur logiciel",
                    period: "05/2023 -- 10/2023"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "Développement complet d'une application de gestion et recherche de contacts clients (JavaScript)."
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "Vente de l'application pour 3 000€."
                    }
                ]
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                type: "subsection",
                content: {
                    title: "Reeverse Systems",
                    subtitle: "Chef de projet",
                    period: "09/2023 -- 01/2024"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "Projet académique de 4 mois avec Reeverse Systems, élaboration d'un simulateur pour démontrer l'efficacité de leur solution : réduction des déchets industriels et maximisation des rendements."
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "Conception d'un simulateur multi-objectifs pour la production industrielle (Python, Matplotlib) :"
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "• Génération de données aléatoires suivant différentes lois pour simuler plusieurs facteurs (nombre d'ouvriers, poids des déchets, etc.)."
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "• Création de fronts de Pareto et visualisation sous forme de graphes radar (Python, Matplotlib)."
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "• Clustering K-means sur le front de Pareto pour ne présenter que 5 solutions représentatives."
                    }
                ]
            }
        ]
    },
    {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
        type: "divider"
    },
    {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
        type: "section",
        content: {
            title: "COMPETENCES, LANGUES ET ACTIVITES"
        },
        children: [
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                type: "text",
                content: "Langues : Français (natif), Anglais (IELTS 7/9), Espagnol (A2), Allemand (A2)"
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                type: "text",
                content: "Programmation : Python (Pandas, Scikit-learn), SQL, GitHub, Java, JavaScript, M/Power BI"
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                type: "text",
                content: "Machine Learning : Kaggle competitions (stacking LGBM+CatBoost sur les prix de voitures d'occasion), étude de cas Roland Berger (cliniques dentaires)"
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                type: "text",
                content: "Sports : Judo, Rugby (capitaine et responsable de l'équipe de l'école)"
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                type: "text",
                content: "Bénévolat : Scouts (10 ans) + mission humanitaire (1 mois)"
            }
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/index.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-resizable-panels/dist/react-resizable-panels.browser.development.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BlockEditor$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/BlockEditor.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$blocksToHTML$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/blocksToHTML.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$initialCV$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/initialCV.tsx [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
// Styles CSS globaux + responsivité
const styles = '\n  :root {\n    --bg: #f7f8fb;\n    --card: #ffffff;\n    --border: #e7eaf0;\n    --muted: #6b7280;\n    --text: #111827;\n    --primary: #2563eb;\n    --primary-600: #2f6ded;\n    --ring: rgba(37, 99, 235, 0.25);\n  }\n\n  * { box-sizing: border-box; }\n  html, body, #__next { height: 100%; }\n  body {\n    margin: 0;\n    background: var(--bg);\n    color: var(--text);\n    font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    letter-spacing: 0.1px;\n  }\n\n  button {\n    transition: background-color .15s ease, box-shadow .15s ease, transform .06s ease;\n  }\n  button:active { transform: translateY(1px); }\n\n  .card {\n    background: var(--card);\n    border: 1px solid var(--border);\n    border-radius: 12px;\n    box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(17,24,39,0.04);\n  }\n\n  .muted { color: var(--muted); }\n\n  .preview-cv {\n    transform: scale(0.8);\n    transform-origin: top center;\n  }\n  \n  @media (max-width: 1200px) {\n    .preview-cv { transform: scale(0.6) !important; }\n  }\n  \n  @media (max-width: 768px) {\n    .preview-cv { transform: scale(0.5) !important; }\n  }\n';
function Home() {
    _s();
    // IDs stables: charger depuis localStorage si disponible
    const [blocks, setBlocks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [fontScale, setFontScale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [showWarning, setShowWarning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const previewRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Charger/Sauvegarder les blocs pour stabiliser les IDs (éviter HMR qui regénère)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            try {
                const stored = window.localStorage.getItem("cv_blocks");
                if (stored) {
                    const parsed = JSON.parse(stored);
                    setBlocks(parsed);
                } else {
                    setBlocks(__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$initialCV$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["initialBlocks"]);
                    window.localStorage.setItem("cv_blocks", JSON.stringify(__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$initialCV$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["initialBlocks"]));
                }
            } catch (e) {
                setBlocks(__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$initialCV$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["initialBlocks"]);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["Home.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            try {
                window.localStorage.setItem("cv_blocks", JSON.stringify(blocks));
            } catch (e) {}
        }
    }["Home.useEffect"], [
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
            tempDiv.style.fontSize = "".concat(currentScale, "em");
            tempDiv.style.lineHeight = "".concat(1.1 * currentScale);
            tempDiv.innerHTML = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$blocksToHTML$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["default"])(blocks, currentScale);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const timer = setTimeout({
                "Home.useEffect.timer": ()=>{
                    const scale = calculateOptimalFontScale();
                    setFontScale(scale);
                    setShowWarning(scale < 1);
                }
            }["Home.useEffect.timer"], 100); // Délai pour laisser le DOM se mettre à jour
            return ({
                "Home.useEffect": ()=>clearTimeout(timer)
            })["Home.useEffect"];
        }
    }["Home.useEffect"], [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: styles
            }, void 0, false, {
                fileName: "[project]/pages/index.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PanelGroup"], {
                direction: "horizontal",
                style: {
                    height: "100vh"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Panel"], {
                        defaultSize: 60,
                        minSize: 30,
                        maxSize: 80,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                height: "100%",
                                padding: "1rem",
                                overflow: "auto"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BlockEditor$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PanelResizeHandle"], {
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
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Panel"], {
                        defaultSize: 45,
                        minSize: 45,
                        maxSize: 45,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                height: "100vh",
                                overflow: "auto",
                                backgroundColor: "var(--bg)",
                                padding: "0.75rem",
                                borderLeft: "1px solid var(--border)"
                            },
                            children: [
                                showWarning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {},
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: previewRef,
                                        className: "preview-cv",
                                        style: {
                                            width: "210mm",
                                            minHeight: "297mm",
                                            padding: "15mm",
                                            border: "1px solid #d1d5db",
                                            boxSizing: "border-box",
                                            backgroundColor: "#fff",
                                            fontSize: "".concat(fontScale, "em"),
                                            lineHeight: "".concat(1.1 * fontScale),
                                            transform: "scale(0.8)",
                                            transformOrigin: "top left",
                                            marginBottom: "0.1rem",
                                            borderRadius: "8px",
                                            boxShadow: "0 12px 24px rgba(17,24,39,0.06)"
                                        },
                                        dangerouslySetInnerHTML: {
                                            __html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$blocksToHTML$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["default"])(blocks, fontScale)
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
_s(Home, "2rfPQSzJeuewWUGaeGSA2gOImW4=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/index.tsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/index\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__35fafc43._.js.map