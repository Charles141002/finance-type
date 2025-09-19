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
    return entries.filter((param)=>{
        let [, allowedParents] = param;
        return allowedParents.includes(parentType);
    }).map((param)=>{
        let [type] = param;
        return type;
    });
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
    const currentDepth = getDepthOfBlock(allBlocks, source.blockId);
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
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// Utilitaire simple pour assainir le HTML et ne garder que B/I/U/BR/UL/OL/LI
const sanitizeHtml = (html)=>{
    try {
        const container = document.createElement("div");
        container.innerHTML = html;
        // Convertir <b>/<i> -> <strong>/<em> et spans soulignés -> <u>
        const replaceTag = (el, newTag)=>{
            var _el_parentNode;
            const newEl = document.createElement(newTag);
            while(el.firstChild)newEl.appendChild(el.firstChild);
            (_el_parentNode = el.parentNode) === null || _el_parentNode === void 0 ? void 0 : _el_parentNode.replaceChild(newEl, el);
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
                var _node_parentNode;
                (_node_parentNode = node.parentNode) === null || _node_parentNode === void 0 ? void 0 : _node_parentNode.removeChild(node);
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
    } catch (e) {
        return html;
    }
};
const RichTextEditor = (param)=>{
    let { value, onChange, placeholder, singleLine, style } = param;
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastSelectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RichTextEditor.useEffect": ()=>{
            // Mettre à jour le contenu si la valeur externe change (éviter boucle infinie)
            if (ref.current && ref.current.innerHTML !== value) {
                ref.current.innerHTML = value || "";
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["RichTextEditor.useEffect"], [
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
        var _ref_current, _ref_current1;
        // Empêcher le bouton de perdre le focus
        restoreSelection();
        (_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.focus();
        document.execCommand(cmd);
        // Déclencher onChange
        const html = sanitizeHtml(((_ref_current1 = ref.current) === null || _ref_current1 === void 0 ? void 0 : _ref_current1.innerHTML) || "");
        if (html !== value) onChange(html);
    };
    const execArg = (cmd, arg)=>{
        var _ref_current, _ref_current1;
        restoreSelection();
        (_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.focus();
        // @ts-ignore execCommand third arg
        document.execCommand(cmd, false, arg);
        const html = sanitizeHtml(((_ref_current1 = ref.current) === null || _ref_current1 === void 0 ? void 0 : _ref_current1.innerHTML) || "");
        if (html !== value) onChange(html);
    };
    const insertHTML = (htmlSnippet)=>{
        execArg("insertHTML", htmlSnippet);
    };
    const isInsideList = ()=>{
        const sel = window.getSelection();
        const node = sel === null || sel === void 0 ? void 0 : sel.anchorNode;
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
        var _ref_current;
        const html = sanitizeHtml(((_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.innerHTML) || "");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: 6,
                    marginBottom: 6,
                    flexWrap: "wrap"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        style: toolbarBtnStyle,
                        onMouseDown: (e)=>e.preventDefault(),
                        onClick: ()=>exec("bold"),
                        children: "B"
                    }, void 0, false, {
                        fileName: "[project]/components/BlockEditor.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        style: toolbarBtnStyle,
                        onMouseDown: (e)=>e.preventDefault(),
                        onClick: ()=>exec("italic"),
                        children: "I"
                    }, void 0, false, {
                        fileName: "[project]/components/BlockEditor.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        style: toolbarBtnStyle,
                        onMouseDown: (e)=>e.preventDefault(),
                        onClick: ()=>exec("underline"),
                        children: "U"
                    }, void 0, false, {
                        fileName: "[project]/components/BlockEditor.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            width: 8
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/BlockEditor.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        title: "Liste à puces",
                        style: toolbarBtnStyle,
                        onMouseDown: (e)=>e.preventDefault(),
                        onClick: ()=>exec("insertUnorderedList"),
                        children: "•"
                    }, void 0, false, {
                        fileName: "[project]/components/BlockEditor.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        title: "Liste numérotée",
                        style: toolbarBtnStyle,
                        onMouseDown: (e)=>e.preventDefault(),
                        onClick: ()=>exec("insertOrderedList"),
                        children: "1."
                    }, void 0, false, {
                        fileName: "[project]/components/BlockEditor.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        title: "Augmenter le retrait",
                        style: toolbarBtnStyle,
                        onMouseDown: (e)=>e.preventDefault(),
                        onClick: ()=>exec("indent"),
                        children: "→"
                    }, void 0, false, {
                        fileName: "[project]/components/BlockEditor.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        title: "Diminuer le retrait",
                        style: toolbarBtnStyle,
                        onMouseDown: (e)=>e.preventDefault(),
                        onClick: ()=>exec("outdent"),
                        children: "←"
                    }, void 0, false, {
                        fileName: "[project]/components/BlockEditor.tsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            width: 8
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/BlockEditor.tsx",
                        lineNumber: 193,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        title: "Insérer tiret demi-cadratin",
                        style: toolbarBtnStyle,
                        onMouseDown: (e)=>e.preventDefault(),
                        onClick: ()=>insertHTML("– "),
                        children: "–"
                    }, void 0, false, {
                        fileName: "[project]/components/BlockEditor.tsx",
                        lineNumber: 194,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        title: "Insérer tiret cadratin",
                        style: toolbarBtnStyle,
                        onMouseDown: (e)=>e.preventDefault(),
                        onClick: ()=>insertHTML("— "),
                        children: "—"
                    }, void 0, false, {
                        fileName: "[project]/components/BlockEditor.tsx",
                        lineNumber: 195,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/BlockEditor.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    ...style
                },
                "data-placeholder": placeholder
            }, void 0, false, {
                fileName: "[project]/components/BlockEditor.tsx",
                lineNumber: 197,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: "\n        [contenteditable][data-placeholder]:empty:before {\n          content: attr(data-placeholder);\n          color: #9ca3af;\n        }\n      "
            }, void 0, false, {
                fileName: "[project]/components/BlockEditor.tsx",
                lineNumber: 219,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/BlockEditor.tsx",
        lineNumber: 169,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(RichTextEditor, "MoArn9F69xUcdzkz57buv35rQ5Q=");
_c = RichTextEditor;
const BlockEditor = (param)=>{
    let { blocks, setBlocks, scrollContainerRef } = param;
    _s1();
    const [newBlockType, setNewBlockType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("text");
    const [subBlockTypes, setSubBlockTypes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [dragError, setDragError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const mouseYRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const autoScrollTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [draggingBlockId, setDraggingBlockId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [draggingBlockType, setDraggingBlockType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [subtitleVisible, setSubtitleVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [periodVisible, setPeriodVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({});
    const hasMeaningfulText = (html)=>{
        if (!html) return false;
        const plain = html.replace(/<[^>]*>/g, "").replace(/\u00A0/g, " ").trim();
        return /[A-Za-zÀ-ÖØ-öø-ÿ0-9]/.test(plain);
    };
    // Gestion auto-scroll pendant le drag dans le conteneur scrollable gauche
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BlockEditor.useEffect": ()=>{
            const handleMouseMove = {
                "BlockEditor.useEffect.handleMouseMove": (e)=>{
                    mouseYRef.current = e.clientY;
                }
            }["BlockEditor.useEffect.handleMouseMove"];
            if (isDragging) {
                window.addEventListener("mousemove", handleMouseMove);
                if (autoScrollTimerRef.current == null) {
                    autoScrollTimerRef.current = window.setInterval({
                        "BlockEditor.useEffect": ()=>{
                            const container = scrollContainerRef === null || scrollContainerRef === void 0 ? void 0 : scrollContainerRef.current;
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
                        }
                    }["BlockEditor.useEffect"], 16);
                }
            } else {
                window.removeEventListener("mousemove", handleMouseMove);
                if (autoScrollTimerRef.current != null) {
                    window.clearInterval(autoScrollTimerRef.current);
                    autoScrollTimerRef.current = null;
                }
            }
            return ({
                "BlockEditor.useEffect": ()=>{
                    window.removeEventListener("mousemove", handleMouseMove);
                    if (autoScrollTimerRef.current != null) {
                        window.clearInterval(autoScrollTimerRef.current);
                        autoScrollTimerRef.current = null;
                    }
                }
            })["BlockEditor.useEffect"];
        }
    }["BlockEditor.useEffect"], [
        isDragging,
        scrollContainerRef
    ]);
    // -------------------
    // Ajouter un bloc
    // -------------------
    const handleAddBlock = (parentId)=>{
        var _findBlockById;
        const typeToUse = parentId ? subBlockTypes[parentId] || "text" : newBlockType;
        // Règles: vérifier que le type est autorisé pour ce parent
        const parentType = parentId ? (_findBlockById = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$types$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["findBlockById"])(blocks, parentId)) === null || _findBlockById === void 0 ? void 0 : _findBlockById.type : undefined;
        const allowed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$types$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getAllowedChildTypesForParent"])(parentType);
        if (!allowed.includes(typeToUse)) {
            setDragError("Type de bloc non autorisé ici");
            setTimeout(()=>setDragError(null), 1800);
            return;
        }
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
        setIsDragging(false);
        setDraggingBlockId(null);
        setDraggingBlockType(null);
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
        // Vérifier les règles de déplacement
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$types$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["canMoveBlock"])(dragContext, blocks)) {
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
        setDraggingBlockId(start.draggableId);
        const b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$types$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["findBlockById"])(blocks, start.draggableId);
        setDraggingBlockType((b === null || b === void 0 ? void 0 : b.type) || null);
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
    const renderBlock = (block, parentId, handleProps, isSelfDragging)=>{
        var _block_content, _block_content1, _block_content2, _block_content3, _block_content4, _block_content5, _block_content6, _block_content7, _block_content8, _block_content9, _block_content10, _block_content11;
        const allowedChildTypes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$types$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getAllowedChildTypesForParent"])(block.type);
        const canHaveChildren = allowedChildTypes.length > 0;
        const parentBlock = parentId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$types$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["findBlockById"])(blocks, parentId) : undefined;
        const isChildOfSubsection = (parentBlock === null || parentBlock === void 0 ? void 0 : parentBlock.type) === "subsection";
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                border: "1px solid #e1e5e9",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "8px",
                backgroundColor: "#fff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                transition: "all 0.2s ease"
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
                                        borderRadius: "4px",
                                        backgroundColor: "#f5f5f5",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        minWidth: "20px",
                                        height: "20px"
                                    },
                                    children: "⋮⋮"
                                }, void 0, false, {
                                    fileName: "[project]/components/BlockEditor.tsx",
                                    lineNumber: 551,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: "12px",
                                        color: "#6b7280",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.04em"
                                    },
                                    children: block.type
                                }, void 0, false, {
                                    fileName: "[project]/components/BlockEditor.tsx",
                                    lineNumber: 567,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/BlockEditor.tsx",
                            lineNumber: 550,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: "4px"
                            },
                            children: [
                                canHaveChildren && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: subBlockTypes[block.id] || allowedChildTypes[0] || "text",
                                            onChange: (e)=>setSubBlockTypes({
                                                    ...subBlockTypes,
                                                    [block.id]: e.target.value
                                                }),
                                            style: {
                                                marginRight: 8,
                                                padding: "4px 8px",
                                                borderRadius: "4px",
                                                border: "1px solid #d1d5db",
                                                fontSize: "12px"
                                            },
                                            children: allowedChildTypes.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: t,
                                                    children: t === "text" ? "Texte" : t === "subsection" ? "Sous-section" : t === "section" ? "Section" : t === "header" ? "En-tête" : t === "contact" ? "Contact" : t === "divider" ? "Séparateur" : t
                                                }, t, false, {
                                                    fileName: "[project]/components/BlockEditor.tsx",
                                                    lineNumber: 597,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/components/BlockEditor.tsx",
                                            lineNumber: 580,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleAddBlock(block.id),
                                            style: {
                                                marginRight: 8,
                                                padding: "4px 8px",
                                                backgroundColor: "#3b82f6",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "4px",
                                                fontSize: "12px",
                                                cursor: "pointer"
                                            },
                                            children: "+ sous-bloc"
                                        }, void 0, false, {
                                            fileName: "[project]/components/BlockEditor.tsx",
                                            lineNumber: 602,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleDeleteBlock(block.id),
                                    style: {
                                        color: "#ef4444",
                                        backgroundColor: "transparent",
                                        border: "none",
                                        cursor: "pointer",
                                        padding: "4px",
                                        borderRadius: "4px"
                                    },
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/components/BlockEditor.tsx",
                                    lineNumber: 619,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/BlockEditor.tsx",
                            lineNumber: 577,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/BlockEditor.tsx",
                    lineNumber: 549,
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
                        lineNumber: 638,
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
                                    padding: "8px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "4px",
                                    maxWidth: "640px"
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/BlockEditor.tsx",
                                lineNumber: 641,
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
                                    padding: "8px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "4px",
                                    maxWidth: "640px"
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/BlockEditor.tsx",
                                lineNumber: 647,
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
                                    padding: "8px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "4px",
                                    maxWidth: "640px"
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/BlockEditor.tsx",
                                lineNumber: 653,
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
                                    padding: "8px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "4px",
                                    maxWidth: "640px"
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/BlockEditor.tsx",
                                lineNumber: 659,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BlockEditor.tsx",
                        lineNumber: 640,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : block.type === "subsection" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RichTextEditor, {
                                value: ((_block_content4 = block.content) === null || _block_content4 === void 0 ? void 0 : _block_content4.title) || "",
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
                                fileName: "[project]/components/BlockEditor.tsx",
                                lineNumber: 668,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: 8
                                },
                                children: [
                                    hasMeaningfulText((_block_content5 = block.content) === null || _block_content5 === void 0 ? void 0 : _block_content5.subtitle) || subtitleVisible[block.id] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                            background: "#fff"
                                        },
                                        children: "Supprimer sous-titre"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BlockEditor.tsx",
                                        lineNumber: 679,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                            background: "#fff"
                                        },
                                        children: "+ Sous-titre"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BlockEditor.tsx",
                                        lineNumber: 692,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    hasMeaningfulText((_block_content6 = block.content) === null || _block_content6 === void 0 ? void 0 : _block_content6.period) || periodVisible[block.id] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                            background: "#fff"
                                        },
                                        children: "Supprimer date"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BlockEditor.tsx",
                                        lineNumber: 702,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                            background: "#fff"
                                        },
                                        children: "+ Date"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BlockEditor.tsx",
                                        lineNumber: 715,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BlockEditor.tsx",
                                lineNumber: 677,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            (hasMeaningfulText((_block_content7 = block.content) === null || _block_content7 === void 0 ? void 0 : _block_content7.subtitle) || subtitleVisible[block.id]) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RichTextEditor, {
                                value: ((_block_content8 = block.content) === null || _block_content8 === void 0 ? void 0 : _block_content8.subtitle) || "",
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
                                fileName: "[project]/components/BlockEditor.tsx",
                                lineNumber: 726,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            (hasMeaningfulText((_block_content9 = block.content) === null || _block_content9 === void 0 ? void 0 : _block_content9.period) || periodVisible[block.id]) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RichTextEditor, {
                                value: ((_block_content10 = block.content) === null || _block_content10 === void 0 ? void 0 : _block_content10.period) || "",
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
                                fileName: "[project]/components/BlockEditor.tsx",
                                lineNumber: 736,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BlockEditor.tsx",
                        lineNumber: 667,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RichTextEditor, {
                        value: block.type === "header" || block.type === "section" ? ((_block_content11 = block.content) === null || _block_content11 === void 0 ? void 0 : _block_content11.title) || "" : typeof block.content === "string" ? block.content : "",
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
                        fileName: "[project]/components/BlockEditor.tsx",
                        lineNumber: 746,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/BlockEditor.tsx",
                    lineNumber: 636,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                canHaveChildren && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hello$2d$pangea$2f$dnd$2f$dist$2f$dnd$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Droppable"], {
                    droppableId: block.id,
                    type: "CHILD",
                    isDropDisabled: !!isSelfDragging || draggingBlockType === "subsection" && block.type === "subsection",
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
                                        children: (provided, snapshotChild)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                ref: provided.innerRef,
                                                ...provided.draggableProps,
                                                children: renderBlock(child, block.id, provided.dragHandleProps, snapshotChild.isDragging)
                                            }, void 0, false, {
                                                fileName: "[project]/components/BlockEditor.tsx",
                                                lineNumber: 796,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                    }, child.id, false, {
                                        fileName: "[project]/components/BlockEditor.tsx",
                                        lineNumber: 794,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))),
                                provided.placeholder
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/BlockEditor.tsx",
                            lineNumber: 779,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0));
                    }
                }, void 0, false, {
                    fileName: "[project]/components/BlockEditor.tsx",
                    lineNumber: 771,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/BlockEditor.tsx",
            lineNumber: 537,
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
            dragError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: "12px",
                    padding: "8px 12px",
                    backgroundColor: "#fef2f2",
                    border: "1px solid #fecaca",
                    color: "#b91c1c",
                    borderRadius: 6,
                    fontSize: "13px"
                },
                children: dragError
            }, void 0, false, {
                fileName: "[project]/components/BlockEditor.tsx",
                lineNumber: 820,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
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
                        lineNumber: 840,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: "0 0 16px 0",
                            color: "#6b7280",
                            fontSize: "14px"
                        },
                        children: "Glissez-déposez les blocs pour réorganiser votre CV. Les règles empêchent les placements incohérents."
                    }, void 0, false, {
                        fileName: "[project]/components/BlockEditor.tsx",
                        lineNumber: 841,
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
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$types$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getAllowedChildTypesForParent"])(undefined).map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: t,
                                        children: t === "header" ? "En-tête" : t === "contact" ? "Contact" : t === "section" ? "Section" : t === "subsection" ? "Sous-section" : t === "divider" ? "Séparateur" : t === "text" ? "Texte" : t
                                    }, t, false, {
                                        fileName: "[project]/components/BlockEditor.tsx",
                                        lineNumber: 858,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/components/BlockEditor.tsx",
                                lineNumber: 846,
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
                                lineNumber: 863,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BlockEditor.tsx",
                        lineNumber: 845,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/BlockEditor.tsx",
                lineNumber: 833,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hello$2d$pangea$2f$dnd$2f$dist$2f$dnd$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DragDropContext"], {
                onDragEnd: handleDragEnd,
                onDragStart: handleDragStart,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hello$2d$pangea$2f$dnd$2f$dist$2f$dnd$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Droppable"], {
                    droppableId: "root",
                    type: "ROOT",
                    isDropDisabled: draggingBlockType === "subsection",
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
                                    lineNumber: 898,
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
                                                children: renderBlock(block, undefined, provided.dragHandleProps, snapshot.isDragging)
                                            }, void 0, false, {
                                                fileName: "[project]/components/BlockEditor.tsx",
                                                lineNumber: 910,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                    }, block.id, false, {
                                        fileName: "[project]/components/BlockEditor.tsx",
                                        lineNumber: 908,
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
                                    lineNumber: 927,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/BlockEditor.tsx",
                            lineNumber: 885,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/BlockEditor.tsx",
                    lineNumber: 883,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/BlockEditor.tsx",
                lineNumber: 882,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/BlockEditor.tsx",
        lineNumber: 818,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(BlockEditor, "hhsLn67SnSdqcj9I6CUtYBhf+X4=");
_c1 = BlockEditor;
const __TURBOPACK__default__export__ = BlockEditor;
var _c, _c1;
__turbopack_context__.k.register(_c, "RichTextEditor");
__turbopack_context__.k.register(_c1, "BlockEditor");
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
    const render = (list, depth)=>list.map((block)=>{
            switch(block.type){
                case "header":
                    {
                        var _block_content;
                        const text = ((_block_content = block.content) === null || _block_content === void 0 ? void 0 : _block_content.title) || "";
                        return '<div class="cv-header"><div class="cv-name">'.concat(text, "</div></div>");
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
                        return '<div class="cv-contact">'.concat(parts, "</div>");
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
                            return "".concat(render(block.children || [], depth + 1));
                        }
                        if (isIntro) {
                            return '<div class="cv-intro">'.concat(raw, "</div>").concat(render(block.children || [], depth + 1));
                        }
                        // Conserver les listes natives UL/OL si présentes
                        if (hasListTag) {
                            return '<div class="cv-text">'.concat(raw, "</div>").concat(render(block.children || [], depth + 1));
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
                                    return '<div class="cv-text cv-bullet'.concat(levelClass, '">').concat(cleaned, "</div>");
                                }
                                return '<div class="cv-text">'.concat(line, "</div>");
                            }).filter(Boolean).join("");
                            return "".concat(htmlLines).concat(render(block.children || [], depth + 1));
                        }
                        // Ligne simple
                        const isBullet = /^\s*[•\-–]/.test(plain);
                        const cleaned = isBullet && typeof raw === "string" ? raw.replace(/^\s*[•\-–]\s*/, "") : raw;
                        const levelClass = depth >= 2 ? " cv-bullet--level2" : "";
                        if (isBullet) {
                            return '<div class="cv-text cv-bullet'.concat(levelClass, '">').concat(cleaned, "</div>").concat(render(block.children || [], depth + 1));
                        }
                        return '<div class="cv-text">'.concat(raw, "</div>").concat(render(block.children || [], depth + 1));
                    }
                case "divider":
                    return '<hr class="cv-divider"/>';
                case "section":
                    var _block_content1;
                    return '<div class="cv-section">\n            <div class="cv-section-title">'.concat(((_block_content1 = block.content) === null || _block_content1 === void 0 ? void 0 : _block_content1.title) || "", "</div>\n            ").concat(render(block.children || [], depth + 1), "\n          </div>");
                case "subsection":
                    {
                        var _block_content2, _block_content3, _block_content4;
                        const title = ((_block_content2 = block.content) === null || _block_content2 === void 0 ? void 0 : _block_content2.title) || "";
                        const subtitle = ((_block_content3 = block.content) === null || _block_content3 === void 0 ? void 0 : _block_content3.subtitle) || "";
                        const period = ((_block_content4 = block.content) === null || _block_content4 === void 0 ? void 0 : _block_content4.period) || "";
                        const childrenHtml = render(block.children || [], depth + 1);
                        const childPlain = childrenHtml.replace(/<[^>]*>/g, "").replace(/\u00A0/g, " ").trim();
                        const childrenHasLetters = /[A-Za-zÀ-ÖØ-öø-ÿ]/.test(childPlain);
                        // Si aucun contenu enfant avec lettres, masquer entièrement la sous-section
                        if (!childrenHasLetters) {
                            return "";
                        }
                        return '<div class="cv-subsection">\n            <div class="cv-subsection-header">\n              <div>\n                <div class="cv-subsection-title">'.concat(title, "</div>\n                ").concat(subtitle ? '<div class=\\"cv-subsection-subtitle\\">'.concat(subtitle, "</div>") : "", "\n              </div>\n              ").concat(period ? '<div class=\\"cv-subsection-period\\">'.concat(period, "</div>") : "", "\n            </div>\n            ").concat(childrenHtml, "\n          </div>");
                    }
                default:
                    return "";
            }
        }).join("");
    // envelopper dans un conteneur .cv pour appliquer les styles globaux
    return '<div class="cv">'.concat(render(blocks, 0), "</div>");
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/utils/cvStyles.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getCvCss",
    ()=>getCvCss
]);
function getCvCss() {
    let fontScale = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
    const fs10 = 10 * fontScale; // base body font size in pt
    const fs12 = 12 * fontScale;
    const fs18 = 18 * fontScale;
    const gap8 = 8 * fontScale;
    const gap4 = 4 * fontScale;
    const gap2 = 2 * fontScale;
    const indent1 = 16 * fontScale;
    const indent2 = 22 * fontScale;
    return "\n  /* Page and typography */\n  @page { size: A4; margin: 15mm; }\n  .cv { font-family: 'Times New Roman', Times, serif; font-size: ".concat(fs10, "pt; line-height: 1.25; color: #000; }\n  .cv h1, .cv h2, .cv h3, .cv h4, .cv p { margin: 0; padding: 0; }\n  .cv a { color: inherit; text-decoration: underline; }\n\n  /* Header */\n  .cv .cv-header { text-align: center; margin-bottom: ").concat(gap8, "px; }\n  .cv .cv-name { font-size: ").concat(fs18, "pt; font-weight: 700; }\n  .cv .cv-contact { text-align: center; font-size: ").concat(fs10, "pt; margin-top: ").concat(gap2, "px; }\n  .cv .cv-intro { text-align: center; font-style: italic; margin-bottom: ").concat(gap8, "px; }\n\n  /* Sections */\n  .cv .cv-section { margin-top: ").concat(gap8, "px; }\n  .cv .cv-section-title { font-size: ").concat(fs12, "pt; text-transform: uppercase; margin: 0 0 ").concat(gap4, "px 0; padding-bottom: ").concat(gap2, "px; border-bottom: 0.5pt solid #000; }\n\n  /* Subsections */\n  .cv .cv-subsection { margin-bottom: ").concat(gap4, "px; }\n  .cv .cv-subsection-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: ").concat(gap2, "px; column-gap: ").concat(gap4, "px; }\n  .cv .cv-subsection-title { font-size: ").concat(fs10, "pt; font-weight: 600; }\n  .cv .cv-subsection-subtitle { font-size: ").concat(fs10, "pt; margin-top: ").concat(Math.max(1 * fontScale, 1), "px; }\n  .cv .cv-subsection-period { font-size: ").concat(fs10, "pt; font-style: italic; white-space: nowrap; }\n\n  /* Text and bullets */\n  .cv .cv-text { font-size: ").concat(fs10, "pt; margin-bottom: ").concat(gap2, "px; }\n  .cv .cv-bullet { position: relative; padding-left: ").concat(indent1, 'px; }\n  .cv .cv-bullet::before { content: "–"; position: absolute; left: 0; top: 0; }\n  .cv .cv-bullet--level2 { padding-left: ').concat(indent2, 'px; }\n  .cv .cv-bullet--level2::before { content: "•"; }\n\n  /* Divider */\n  .cv hr.cv-divider { border: 0; border-top: 0.5pt solid #000; margin: ').concat(gap8, "px 0; }\n  ");
}
const __TURBOPACK__default__export__ = getCvCss;
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
            linkedin: "<a href=\"https://fr.linkedin.com/in/charles-pelong-a68212246\">linkedin</a>"
        }
    },
    {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
        type: "text",
        content: "<em>Étudiant à IMT Atlantique à la recherche d’un <strong>stage de fin d’études</strong> à partir du <strong>04/2026</strong> dans le domaine de la <strong>science des données</strong> et de l'<strong>apprentissage automatique</strong>.</em>"
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
                    title: "IMT Atlantique — Master : Data Science et Recherche Opérationnelle",
                    subtitle: "",
                    period: "09/2022 -- 06/2025"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "• <strong>#3 école d’ingénieurs française</strong>, d'après le <a href=\"https://www.letudiant.fr/classements/classement-des-ecoles-d-ingenieurs.html\">\"Classement de l’Etudiant 2025\"</a><br/>• Cours : Mathématiques appliquées, Statistiques, Probabilités, Machine Learning, Optimisation, Recherche opérationnelle, IA, Python, Java, Anglais"
                    }
                ]
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                type: "subsection",
                content: {
                    title: "Shanghai Jiao Tong University — Master en Informatique et Recherche Opérationnelle",
                    subtitle: "",
                    period: "09/2022 -- 06/2025"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "• <strong>#9 université mondiale</strong> en <strong>Computer Science</strong>, d'après le <a href=\"https://www.shanghairanking.com/rankings/gras/2024/RS0210\">\"Classement de Shanghai 2025\"</a><br/>• Cours : Deep Learning, Computer Vision, Machine Learning, Cloud Computing, Chinois"
                    }
                ]
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                type: "subsection",
                content: {
                    title: "Lycée Pasteur — Classes préparatoires scientifiques PCSI/PC (CPGE)",
                    subtitle: "",
                    period: "09/2020 -- 07/2022"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "• Formation intensive en Mathématiques, Physique, Chimie, Informatique, Français, Anglais"
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
                    title: "JCDecaux — Data Scientist",
                    subtitle: "",
                    period: "11/2024 -- 05/2025"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "<em>Stage de 6 mois au sein de la DataCorp, entité de JCDecaux développant des produits data</em>"
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "• Développement de solutions RAG (Retrieval-Augmented Generation) as-a-service (Python, AWS, Langchain). Création de <strong>copilotes IA</strong> à destination :<br/>• des commerciaux pour un accès rapide à des données ciblées et fiables du groupe pour l'<strong>élaboration de devis</strong>.<br/>• de la direction financière permettant la <strong>création de tableaux de bord à partir du langage naturel</strong> basés sur les données du groupe."
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "Ces produits permettent de <strong>réduire drastiquement le temps</strong> de recherche et les frottements entre différentes entités du groupe."
                    }
                ]
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                type: "subsection",
                content: {
                    title: "Sopra Steria Next — Data Analyst / Data Engineer",
                    subtitle: "",
                    period: "04/2024 -- 10/2024"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "<em>Stage de 6 mois, mission de conseil orientée data pour le compte du Ministère de l’Intérieur</em>"
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "• Collecte et traitement de données incluant du <strong>web scraping</strong> et <strong>extraction</strong> depuis diverses sources (Python, Selenium).<br/>• Création de pipelines de données pour automatiser l’<strong>intégration</strong> et le <strong>nettoyage</strong> (Python, Pandas, M/Power BI).<br/>• Production de <strong>tableaux de bord</strong> et <strong>rapports automatisés</strong> pour suivre les indicateurs de performance (Power BI, Python)."
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
                    title: "Junior Atlantique – Timber Productions — Développeur logiciel",
                    subtitle: "",
                    period: "05/2023 -- 10/2023"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "• Développement complet d’une application de gestion et recherche de contacts clients (JavaScript).<br/>• Vente de l’application pour <strong>3 000€</strong>."
                    }
                ]
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                type: "subsection",
                content: {
                    title: "Reeverse Systems — Chef de projet",
                    subtitle: "",
                    period: "09/2023 -- 01/2024"
                },
                children: [
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "<em>Projet académique de 4 mois avec Reeverse Systems, élaboration d'un simulateur pour démontrer <br/> l’efficacité de leur solution : réduction des déchets industriels et maximisation des rendements.</em>"
                    },
                    {
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        type: "text",
                        content: "• Conception d’un simulateur multi-objectifs pour la production industrielle (Python, Matplotlib) :<br/>• Génération de données aléatoires suivant différentes lois pour simuler plusieurs facteurs (nombre d’ouvriers, poids des déchets, etc.).<br/>• Création de <strong>fronts de Pareto</strong> et visualisation sous forme de <strong>graphes radar</strong> (Python, Matplotlib).<br/>• Clustering <strong>K-means</strong> sur le front de Pareto pour ne présenter que 5 solutions représentatives."
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
                content: "<strong>Langues :</strong> Français (natif), Anglais (IELTS 7/9), Espagnol (A2), Allemand (A2)<br/><strong>Programmation :</strong> Python (Pandas, Scikit-learn), SQL, GitHub, Java, JavaScript, M/Power BI<br/><strong>Machine Learning :</strong> Kaggle competitions (stacking LGBM+CatBoost sur les prix de voitures d’occasion), étude de cas <a href=\"https://colab.research.google.com/drive/1onv9AMOuMZQ_lIy7tBFuBrV1Pg3gU0fa#scrollTo=166cd074-f8c4-4f9d-9787-275a2a4e08af\">Roland Berger</a> (cliniques dentaires)<br/><strong>Sports :</strong> Judo, Rugby (capitaine et responsable de l’équipe de l’école)<br/><strong>Bénévolat :</strong> Scouts (10 ans) + mission humanitaire (1 mois)"
            }
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/SiteHeader.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SiteHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
;
;
function SiteHeader() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "glass border-b border-white/20 sticky top-0 z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-6 py-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "flex items-center space-x-3 group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-10 h-10 gradient-primary rounded-xl shadow-glow group-hover:shadow-floating transition-all duration-300"
                            }, void 0, false, {
                                fileName: "[project]/components/SiteHeader.tsx",
                                lineNumber: 9,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent",
                                children: "Finance CV AI"
                            }, void 0, false, {
                                fileName: "[project]/components/SiteHeader.tsx",
                                lineNumber: 10,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/SiteHeader.tsx",
                        lineNumber: 8,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "hidden md:flex items-center space-x-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "text-muted-foreground hover:text-primary font-medium transition-all duration-300 relative group",
                                children: [
                                    "Accueil",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"
                                    }, void 0, false, {
                                        fileName: "[project]/components/SiteHeader.tsx",
                                        lineNumber: 18,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/SiteHeader.tsx",
                                lineNumber: 16,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/a-propos",
                                className: "text-muted-foreground hover:text-primary font-medium transition-all duration-300 relative group",
                                children: [
                                    "À propos",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"
                                    }, void 0, false, {
                                        fileName: "[project]/components/SiteHeader.tsx",
                                        lineNumber: 22,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/SiteHeader.tsx",
                                lineNumber: 20,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/cv",
                                className: "text-muted-foreground hover:text-primary font-medium transition-all duration-300 relative group",
                                children: [
                                    "Générateur",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"
                                    }, void 0, false, {
                                        fileName: "[project]/components/SiteHeader.tsx",
                                        lineNumber: 26,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/SiteHeader.tsx",
                                lineNumber: 24,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/SiteHeader.tsx",
                        lineNumber: 15,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/cv",
                        className: "inline-flex items-center px-4 py-2 rounded-xl bg-slate-900 text-white shadow-elegant hover:shadow-floating transition-all",
                        children: "Créer mon CV"
                    }, void 0, false, {
                        fileName: "[project]/components/SiteHeader.tsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/SiteHeader.tsx",
                lineNumber: 7,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/SiteHeader.tsx",
            lineNumber: 6,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/SiteHeader.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = SiteHeader;
var _c;
__turbopack_context__.k.register(_c, "SiteHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/cv.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CvGeneratorPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-resizable-panels/dist/react-resizable-panels.browser.development.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BlockEditor$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/BlockEditor.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$blocksToHTML$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/blocksToHTML.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cvStyles$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/cvStyles.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$initialCV$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/initialCV.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SiteHeader$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SiteHeader.tsx [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
// Styles CSS pour la responsivité
const styles = "\n  .preview-cv {\n    transform: scale(0.8);\n    transform-origin: top center;\n  }\n  \n  @media (max-width: 1200px) {\n    .preview-cv {\n      transform: scale(0.6) !important;\n    }\n  }\n  \n  @media (max-width: 768px) {\n    .preview-cv {\n      transform: scale(0.5) !important;\n    }\n  }\n";
function CvGeneratorPage() {
    _s();
    // IDs stables: charger depuis localStorage si disponible
    const [blocks, setBlocks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [fontScale, setFontScale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [showWarning, setShowWarning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const previewRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const editorScrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Charger/Sauvegarder les blocs pour stabiliser les IDs (éviter HMR qui regénère)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CvGeneratorPage.useEffect": ()=>{
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
    }["CvGeneratorPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CvGeneratorPage.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            try {
                window.localStorage.setItem("cv_blocks", JSON.stringify(blocks));
            } catch (e) {}
        }
    }["CvGeneratorPage.useEffect"], [
        blocks
    ]);
    // Calcul de la taille optimale
    const calculateOptimalFontScale = ()=>{
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
        let step = 0.02;
        while(currentScale > 0.5){
            tempDiv.innerHTML = "<style>".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cvStyles$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["default"])(currentScale), "</style>") + (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$blocksToHTML$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["default"])(blocks, currentScale);
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
        "CvGeneratorPage.useEffect": ()=>{
            const timer = setTimeout({
                "CvGeneratorPage.useEffect.timer": ()=>{
                    const scale = calculateOptimalFontScale();
                    setFontScale(scale);
                    setShowWarning(scale < 1);
                }
            }["CvGeneratorPage.useEffect.timer"], 100);
            return ({
                "CvGeneratorPage.useEffect": ()=>clearTimeout(timer)
            })["CvGeneratorPage.useEffect"];
        }
    }["CvGeneratorPage.useEffect"], [
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
                fileName: "[project]/pages/cv.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cvStyles$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["default"])(fontScale)
            }, void 0, false, {
                fileName: "[project]/pages/cv.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen bg-gradient-to-br from-background via-muted to-accent/30",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SiteHeader$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/cv.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PanelGroup"], {
                        direction: "horizontal",
                        style: {
                            height: "calc(100vh - 64px)"
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
                                    ref: editorScrollRef,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BlockEditor$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        blocks: blocks,
                                        setBlocks: setBlocks,
                                        scrollContainerRef: editorScrollRef
                                    }, void 0, false, {
                                        fileName: "[project]/pages/cv.tsx",
                                        lineNumber: 140,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/cv.tsx",
                                    lineNumber: 135,
                                    columnNumber: 11
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/cv.tsx",
                                lineNumber: 134,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PanelResizeHandle"], {
                                style: {
                                    width: "8px",
                                    backgroundColor: "#e1e5e9",
                                    cursor: "col-resize",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: "2px",
                                        height: "40px",
                                        backgroundColor: "#9ca3af",
                                        borderRadius: "1px"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/pages/cv.tsx",
                                    lineNumber: 155,
                                    columnNumber: 11
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/cv.tsx",
                                lineNumber: 145,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Panel"], {
                                defaultSize: 45,
                                minSize: 45,
                                maxSize: 45,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        height: "calc(100vh - 56px)",
                                        overflow: "auto",
                                        backgroundColor: "#f8fafc",
                                        padding: "0.5rem",
                                        borderLeft: "1px solid #e1e5e9"
                                    },
                                    children: [
                                        showWarning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                            fileName: "[project]/pages/cv.tsx",
                                            lineNumber: 173,
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
                                                    border: "1px solid #000",
                                                    boxSizing: "border-box",
                                                    backgroundColor: "#fff",
                                                    transform: "scale(0.8)",
                                                    transformOrigin: "top left",
                                                    marginBottom: "0.1rem"
                                                },
                                                dangerouslySetInnerHTML: {
                                                    __html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$blocksToHTML$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["default"])(blocks, fontScale)
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/pages/cv.tsx",
                                                lineNumber: 188,
                                                columnNumber: 11
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/cv.tsx",
                                            lineNumber: 186,
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
                                                borderRadius: "8px",
                                                border: "1px solid #e1e5e9",
                                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleGeneratePDF,
                                                style: {
                                                    padding: "12px 16px",
                                                    backgroundColor: "#3b82f6",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "6px",
                                                    cursor: "pointer",
                                                    fontSize: "14px",
                                                    fontWeight: "500"
                                                },
                                                children: "Générer PDF"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/cv.tsx",
                                                lineNumber: 218,
                                                columnNumber: 11
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/cv.tsx",
                                            lineNumber: 206,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/cv.tsx",
                                    lineNumber: 165,
                                    columnNumber: 11
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/cv.tsx",
                                lineNumber: 164,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/cv.tsx",
                        lineNumber: 132,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/cv.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(CvGeneratorPage, "HGTfcYigYdfk01u+ADe6yQUsRI8=");
_c = CvGeneratorPage;
var _c;
__turbopack_context__.k.register(_c, "CvGeneratorPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/cv.tsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/cv";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/cv.tsx [client] (ecmascript)");
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
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/cv\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/cv.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__51c760b2._.js.map