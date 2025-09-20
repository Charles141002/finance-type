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
"[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DynamicHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f40$supabase$2f$auth$2d$helpers$2d$react$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/@supabase/auth-helpers-react/dist/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function DynamicHeader(param) {
    let { rightActions, variant = "default", scrollContainerRef } = param;
    _s();
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true); // Visible par défaut au chargement
    const [lastScrollY, setLastScrollY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isInitialized, setIsInitialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const session = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f40$supabase$2f$auth$2d$helpers$2d$react$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSession"])();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f40$supabase$2f$auth$2d$helpers$2d$react$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSupabaseClient"])();
    // Délai d'initialisation pour laisser le header visible au chargement
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DynamicHeader.useEffect": ()=>{
            const timer = setTimeout({
                "DynamicHeader.useEffect.timer": ()=>{
                    setIsInitialized(true);
                }
            }["DynamicHeader.useEffect.timer"], 2000); // 2 secondes de délai
            return ({
                "DynamicHeader.useEffect": ()=>clearTimeout(timer)
            })["DynamicHeader.useEffect"];
        }
    }["DynamicHeader.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DynamicHeader.useEffect": ()=>{
            const handleScroll = {
                "DynamicHeader.useEffect.handleScroll": ()=>{
                    // Ne pas appliquer la logique de scroll tant que l'initialisation n'est pas terminée
                    if (!isInitialized) return;
                    // Utiliser le conteneur de scroll si fourni, sinon la fenêtre
                    const scrollElement = (scrollContainerRef === null || scrollContainerRef === void 0 ? void 0 : scrollContainerRef.current) || window;
                    var _scrollTop;
                    const currentScrollY = scrollElement === window ? window.scrollY : (_scrollTop = scrollElement.scrollTop) !== null && _scrollTop !== void 0 ? _scrollTop : 0;
                    // Afficher le header si on remonte (scroll vers le haut) ou si on est en haut
                    const newVisibility = currentScrollY < lastScrollY || currentScrollY <= 10;
                    if (newVisibility !== isVisible) {
                        setIsVisible(newVisibility);
                    }
                    setLastScrollY(currentScrollY);
                }
            }["DynamicHeader.useEffect.handleScroll"];
            const scrollElement = (scrollContainerRef === null || scrollContainerRef === void 0 ? void 0 : scrollContainerRef.current) || window;
            scrollElement.addEventListener('scroll', handleScroll, {
                passive: true
            });
            return ({
                "DynamicHeader.useEffect": ()=>{
                    scrollElement.removeEventListener('scroll', handleScroll);
                }
            })["DynamicHeader.useEffect"];
        }
    }["DynamicHeader.useEffect"], [
        lastScrollY,
        scrollContainerRef,
        isInitialized,
        isVisible
    ]);
    const handleLogout = async ()=>{
        await supabase.auth.signOut();
        router.push("/login").catch(()=>{});
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            height: isVisible ? "120px" : "0px",
            overflow: "hidden",
            transition: "height 0.3s ease-in-out",
            position: "relative",
            zIndex: 30
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
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
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            style: {
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "32px",
                            marginLeft: "auto"
                        },
                        children: rightActions !== null && rightActions !== void 0 ? rightActions : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
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
                                (session === null || session === void 0 ? void 0 : session.user) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/gestion-cv",
                                    style: {
                                        textDecoration: "none",
                                        color: "#e2e8f0",
                                        fontWeight: 600,
                                        fontSize: "15px",
                                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                                        transition: "all 0.2s ease"
                                    },
                                    children: "Gestion CV"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx",
                                    lineNumber: 136,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
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
                                    lineNumber: 150,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
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
                                    lineNumber: 163,
                                    columnNumber: 15
                                }, this),
                                (session === null || session === void 0 ? void 0 : session.user) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                    lineNumber: 182,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
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
                                    lineNumber: 202,
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
_s(DynamicHeader, "L21qC5dYPYEYVTiVIAHXW6hnMcw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f40$supabase$2f$auth$2d$helpers$2d$react$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f40$supabase$2f$auth$2d$helpers$2d$react$2f$dist$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSupabaseClient"]
    ];
});
_c = DynamicHeader;
var _c;
__turbopack_context__.k.register(_c, "DynamicHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/finance-type/my-cv-app/data/initialCV.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createInitialBlocks",
    ()=>createInitialBlocks,
    "initialBlocks",
    ()=>initialBlocks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/uuid/dist/v4.js [client] (ecmascript) <export default as v4>");
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
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
            type: template.type,
            content: template.content,
            style: template.style,
            children: template.children ? cloneBlocks(template.children) : undefined
        }));
const createInitialBlocks = ()=>cloneBlocks(TEMPLATE);
const initialBlocks = createInitialBlocks();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__N_SSP",
    ()=>__N_SSP,
    "default",
    ()=>GestionCvPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$components$2f$DynamicHeader$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$data$2f$initialCV$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/data/initialCV.ts [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const PAGE_SIZE = 12;
var __N_SSP = true;
function GestionCvPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [cvs, setCvs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [total, setTotal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isInitialLoad, setIsInitialLoad] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [debouncedSearch, setDebouncedSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [hasMore, setHasMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deletingId, setDeletingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isCreating, setIsCreating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GestionCvPage.useEffect": ()=>{
            const handler = window.setTimeout({
                "GestionCvPage.useEffect.handler": ()=>{
                    setDebouncedSearch(searchTerm.trim());
                }
            }["GestionCvPage.useEffect.handler"], 350);
            return ({
                "GestionCvPage.useEffect": ()=>{
                    window.clearTimeout(handler);
                }
            })["GestionCvPage.useEffect"];
        }
    }["GestionCvPage.useEffect"], [
        searchTerm
    ]);
    const fetchPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GestionCvPage.useCallback[fetchPage]": async function(targetPage) {
            let replace = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
            setIsLoading(true);
            setError(null);
            const offsetValue = targetPage * PAGE_SIZE;
            try {
                const params = new URLSearchParams({
                    limit: PAGE_SIZE.toString(),
                    offset: offsetValue.toString()
                });
                if (debouncedSearch) {
                    params.set('search', debouncedSearch);
                }
                const res = await fetch("/api/cv/list?".concat(params.toString()));
                if (!res.ok) {
                    const data = await res.json().catch({
                        "GestionCvPage.useCallback[fetchPage]": ()=>({})
                    }["GestionCvPage.useCallback[fetchPage]"]);
                    throw new Error(typeof data.error === 'string' ? data.error : 'Impossible de charger les CV.');
                }
                const { cvs: fetched, total: totalCount } = await res.json();
                const safeFetched = fetched !== null && fetched !== void 0 ? fetched : [];
                setTotal(typeof totalCount === 'number' ? totalCount : null);
                setCvs({
                    "GestionCvPage.useCallback[fetchPage]": (previous)=>replace ? safeFetched : [
                            ...previous,
                            ...safeFetched
                        ]
                }["GestionCvPage.useCallback[fetchPage]"]);
                const hasCount = typeof totalCount === 'number';
                setHasMore(hasCount ? offsetValue + safeFetched.length < totalCount : safeFetched.length === PAGE_SIZE);
                setPage(targetPage);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Impossible de charger les CV.');
                if (replace) {
                    setCvs([]);
                    setHasMore(false);
                    setTotal(null);
                }
            } finally{
                setIsLoading(false);
                setIsInitialLoad(false);
            }
        }
    }["GestionCvPage.useCallback[fetchPage]"], [
        debouncedSearch
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GestionCvPage.useEffect": ()=>{
            fetchPage(0, true).catch({
                "GestionCvPage.useEffect": ()=>{}
            }["GestionCvPage.useEffect"]);
        }
    }["GestionCvPage.useEffect"], [
        debouncedSearch,
        fetchPage
    ]);
    const handleLoadMore = ()=>{
        if (isLoading || !hasMore) return;
        fetchPage(page + 1).catch(()=>{});
    };
    const handleDeleteCv = async (id)=>{
        if (deletingId) return;
        if ("TURBOPACK compile-time truthy", 1) {
            const confirmed = window.confirm('Supprimer ce CV ? Cette action est définitive.');
            if (!confirmed) {
                return;
            }
        }
        setDeletingId(id);
        setError(null);
        try {
            const res = await fetch("/api/cv/delete?id=".concat(encodeURIComponent(id)), {
                method: 'DELETE'
            });
            if (!res.ok) {
                const data = await res.json().catch(()=>({}));
                throw new Error(typeof data.error === 'string' ? data.error : 'Impossible de supprimer le CV.');
            }
            setCvs((previous)=>previous.filter((cv)=>cv.id !== id));
            setTotal((previous)=>typeof previous === 'number' ? Math.max(previous - 1, 0) : null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Impossible de supprimer le CV.');
        } finally{
            setDeletingId(null);
        }
    };
    const handleCreateCv = async ()=>{
        if (isCreating) return;
        setIsCreating(true);
        setError(null);
        try {
            const blocks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$data$2f$initialCV$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["createInitialBlocks"])();
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
            if (cv === null || cv === void 0 ? void 0 : cv.id) {
                router.push({
                    pathname: '/cv',
                    query: {
                        id: cv.id
                    }
                }).catch(()=>{});
                return;
            }
            fetchPage(0, true).catch(()=>{});
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Impossible de créer le CV.');
        } finally{
            setIsCreating(false);
        }
    };
    const formatDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GestionCvPage.useCallback[formatDate]": (value)=>new Date(value).toLocaleString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
    }["GestionCvPage.useCallback[formatDate]"], []);
    const resultsLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GestionCvPage.useMemo[resultsLabel]": ()=>{
            if (typeof total === 'number') {
                return "".concat(cvs.length, " CV").concat(cvs.length > 1 ? 's' : '', " affiché").concat(cvs.length > 1 ? 's' : '', " sur ").concat(total);
            }
            return "".concat(cvs.length, " CV").concat(cvs.length > 1 ? 's' : '', " chargé").concat(cvs.length > 1 ? 's' : '');
        }
    }["GestionCvPage.useMemo[resultsLabel]"], [
        cvs.length,
        total
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: '100vh',
            backgroundColor: 'rgba(2, 6, 23, 0.95)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$components$2f$DynamicHeader$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                variant: "landing"
            }, void 0, false, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                style: {
                    maxWidth: '1100px',
                    margin: '0 auto',
                    padding: '32px 16px',
                    color: '#e2e8f0',
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            marginBottom: '24px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontSize: '34px',
                                            fontWeight: 800,
                                            margin: 0
                                        },
                                        children: "Gestion des CV"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                        lineNumber: 190,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: '15px',
                                            color: '#cbd5f5',
                                            marginTop: '6px'
                                        },
                                        children: "Recherchez, ouvrez ou supprimez vos CV sauvegardés. Chargez davantage d'éléments pour explorer votre historique complet."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                        lineNumber: 191,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                lineNumber: 189,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '12px',
                                    alignItems: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            flex: '1 1 220px',
                                            minWidth: '220px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: searchTerm,
                                                onChange: (event)=>setSearchTerm(event.target.value),
                                                placeholder: "Rechercher un CV par titre",
                                                style: {
                                                    flex: 1,
                                                    padding: '12px 14px',
                                                    borderRadius: '10px',
                                                    border: '1px solid rgba(148, 163, 184, 0.4)',
                                                    backgroundColor: 'rgba(15, 23, 42, 0.55)',
                                                    color: '#e2e8f0',
                                                    fontSize: '14px'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                                lineNumber: 197,
                                                columnNumber: 15
                                            }, this),
                                            searchTerm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setSearchTerm(''),
                                                style: {
                                                    padding: '10px 12px',
                                                    borderRadius: '10px',
                                                    border: '1px solid rgba(148, 163, 184, 0.4)',
                                                    background: 'rgba(30, 41, 59, 0.8)',
                                                    color: '#cbd5f5',
                                                    cursor: 'pointer',
                                                    fontSize: '13px',
                                                    fontWeight: 600
                                                },
                                                children: "Effacer"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                                lineNumber: 212,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                        lineNumber: 196,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                        lineNumber: 230,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/cv",
                                        style: {
                                            padding: '12px 20px',
                                            borderRadius: '10px',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            color: '#e2e8f0',
                                            textDecoration: 'none',
                                            fontWeight: 600
                                        },
                                        children: "Retour à l'éditeur"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                        lineNumber: 247,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                lineNumber: 195,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: '13px',
                                    color: '#94a3b8'
                                },
                                children: resultsLabel
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                lineNumber: 261,
                                columnNumber: 11
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                lineNumber: 263,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        style: {
                            backgroundColor: 'rgba(15, 23, 42, 0.45)',
                            border: '1px solid rgba(148, 163, 184, 0.3)',
                            borderRadius: '14px',
                            overflow: 'hidden'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    overflowX: 'auto'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    style: {
                                        width: '100%',
                                        borderCollapse: 'collapse',
                                        minWidth: '720px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                style: {
                                                    backgroundColor: 'rgba(30, 41, 59, 0.7)'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        style: {
                                                            textAlign: 'left',
                                                            padding: '14px 18px',
                                                            fontSize: '13px',
                                                            color: '#cbd5f5',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em'
                                                        },
                                                        children: "Titre du CV"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                                        lineNumber: 290,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        style: {
                                                            textAlign: 'left',
                                                            padding: '14px 18px',
                                                            fontSize: '13px',
                                                            color: '#cbd5f5',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em'
                                                        },
                                                        children: "Dernière modification"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                                        lineNumber: 293,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        style: {
                                                            textAlign: 'left',
                                                            padding: '14px 18px',
                                                            fontSize: '13px',
                                                            color: '#cbd5f5',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em'
                                                        },
                                                        children: "Créé le"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                                        lineNumber: 296,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        style: {
                                                            textAlign: 'right',
                                                            padding: '14px 18px',
                                                            fontSize: '13px',
                                                            color: '#cbd5f5',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em'
                                                        },
                                                        children: "Actions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                                        lineNumber: 299,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                                lineNumber: 289,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                            lineNumber: 288,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: cvs.map((cv, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    style: {
                                                        backgroundColor: index % 2 === 0 ? 'rgba(15, 23, 42, 0.6)' : 'rgba(15, 23, 42, 0.75)',
                                                        borderBottom: '1px solid rgba(148, 163, 184, 0.15)'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                padding: '16px 18px',
                                                                fontSize: '15px',
                                                                fontWeight: 600
                                                            },
                                                            children: cv.title || 'CV sans titre'
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                                            lineNumber: 313,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                padding: '16px 18px',
                                                                fontSize: '14px',
                                                                color: '#cbd5f5'
                                                            },
                                                            children: formatDate(cv.updated_at)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                                            lineNumber: 316,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                padding: '16px 18px',
                                                                fontSize: '14px',
                                                                color: '#94a3b8'
                                                            },
                                                            children: formatDate(cv.created_at)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                                            lineNumber: 317,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                padding: '16px 18px'
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    justifyContent: 'flex-end',
                                                                    gap: '10px',
                                                                    flexWrap: 'wrap'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: ()=>router.push({
                                                                                pathname: '/cv',
                                                                                query: {
                                                                                    id: cv.id
                                                                                }
                                                                            }).catch(()=>{}),
                                                                        style: {
                                                                            padding: '10px 16px',
                                                                            borderRadius: '8px',
                                                                            border: '1px solid rgba(59, 130, 246, 0.45)',
                                                                            background: 'rgba(59, 130, 246, 0.15)',
                                                                            color: '#bfdbfe',
                                                                            fontSize: '13px',
                                                                            fontWeight: 600,
                                                                            cursor: 'pointer',
                                                                            transition: 'transform 0.15s ease'
                                                                        },
                                                                        onMouseEnter: (event)=>{
                                                                            event.currentTarget.style.transform = 'translateY(-1px)';
                                                                        },
                                                                        onMouseLeave: (event)=>{
                                                                            event.currentTarget.style.transform = 'translateY(0)';
                                                                        },
                                                                        children: "Ouvrir"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                                                        lineNumber: 320,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: ()=>handleDeleteCv(cv.id),
                                                                        disabled: deletingId === cv.id,
                                                                        style: {
                                                                            padding: '10px 16px',
                                                                            borderRadius: '8px',
                                                                            border: '1px solid rgba(239, 68, 68, 0.35)',
                                                                            background: 'rgba(239, 68, 68, 0.15)',
                                                                            color: '#fca5a5',
                                                                            fontSize: '13px',
                                                                            fontWeight: 600,
                                                                            cursor: deletingId === cv.id ? 'not-allowed' : 'pointer'
                                                                        },
                                                                        children: deletingId === cv.id ? 'Suppression…' : 'Supprimer'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                                                        lineNumber: 343,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                                                lineNumber: 319,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                                            lineNumber: 318,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, cv.id, true, {
                                                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                                    lineNumber: 306,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                            lineNumber: 304,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                    lineNumber: 287,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                lineNumber: 286,
                                columnNumber: 11
                            }, this),
                            cvs.length === 0 && !isInitialLoad && !isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: '32px',
                                    textAlign: 'center',
                                    color: '#cbd5f5',
                                    fontSize: '15px'
                                },
                                children: "Aucun CV ne correspond à votre recherche."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                lineNumber: 368,
                                columnNumber: 13
                            }, this),
                            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: '24px',
                                    textAlign: 'center',
                                    color: '#cbd5f5',
                                    fontSize: '14px'
                                },
                                children: "Chargement..."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                                lineNumber: 373,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                        lineNumber: 278,
                        columnNumber: 9
                    }, this),
                    hasMore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: '24px',
                            textAlign: 'center'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleLoadMore,
                            disabled: isLoading,
                            style: {
                                padding: '12px 22px',
                                borderRadius: '10px',
                                border: '1px solid rgba(59, 130, 246, 0.45)',
                                background: 'rgba(59, 130, 246, 0.15)',
                                color: '#bfdbfe',
                                fontWeight: 700,
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                opacity: isLoading ? 0.7 : 1
                            },
                            children: isLoading ? 'Chargement…' : 'Charger plus de CV'
                        }, void 0, false, {
                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                            lineNumber: 381,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                        lineNumber: 380,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx",
        lineNumber: 177,
        columnNumber: 5
    }, this);
}
_s(GestionCvPage, "3JvEHYLQ+lOocTHAigmcJ5HkZQ4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = GestionCvPage;
var _c;
__turbopack_context__.k.register(_c, "GestionCvPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/gestion-cv";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx [client] (ecmascript)");
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
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/Desktop/finance-type/my-cv-app/pages/gestion-cv.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__281ab8e9._.js.map