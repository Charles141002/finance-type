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
                                    lineNumber: 135,
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
                                    lineNumber: 148,
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
                                    lineNumber: 167,
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
"[project]/Desktop/finance-type/my-cv-app/utils/types.ts [client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f40$hello$2d$pangea$2f$dnd$2f$dist$2f$dnd$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/@hello-pangea/dnd/dist/dnd.esm.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/uuid/dist/v4.js [client] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$types$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/utils/types.ts [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
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
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastSelectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RichTextEditor.useEffect": ()=>{
            // Mettre à jour le contenu si la valeur externe change (éviter boucle infinie)
            if (ref.current && ref.current.innerHTML !== value) {
                ref.current.innerHTML = value || "";
            }
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: 6,
                    marginBottom: 6,
                    flexWrap: "wrap"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            width: 8
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            width: 8
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 242,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: '\n        [contenteditable][data-placeholder]:empty:before {\n          content: attr(data-placeholder);\n          color: #9ca3af;\n        }\n        [data-editor="true"]:focus {\n          border-color: #3b82f6 !important;\n          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.14);\n        }\n      '
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
_s(RichTextEditor, "MoArn9F69xUcdzkz57buv35rQ5Q=");
_c = RichTextEditor;
const BlockEditor = (param)=>{
    let { blocks, setBlocks, scrollContainerRef } = param;
    _s1();
    const [subBlockTypes, setSubBlockTypes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [dragError, setDragError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const mouseYRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const autoScrollTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [draggingBlockType, setDraggingBlockType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [subtitleVisible, setSubtitleVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [periodVisible, setPeriodVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [collapsedBlocks, setCollapsedBlocks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({});
    const hasInitializedCollapse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BlockEditor.useEffect": ()=>{
            if (hasInitializedCollapse.current || blocks.length === 0) return;
            const initial = {};
            const visit = {
                "BlockEditor.useEffect.visit": (list)=>{
                    list.forEach({
                        "BlockEditor.useEffect.visit": (block)=>{
                            initial[block.id] = true;
                            if (block.children && block.children.length > 0) visit(block.children);
                        }
                    }["BlockEditor.useEffect.visit"]);
                }
            }["BlockEditor.useEffect.visit"];
            visit(blocks);
            setCollapsedBlocks(initial);
            hasInitializedCollapse.current = true;
        }
    }["BlockEditor.useEffect"], [
        blocks
    ]);
    const [highlightedBlockId, setHighlightedBlockId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BlockEditor.useEffect": ()=>{
            if (!highlightedBlockId) return;
            const el = document.querySelector('[data-block-id="'.concat(highlightedBlockId, '"]'));
            if (!el) return;
            el.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
            el.classList.add("block-editor__pulse");
            const timer = window.setTimeout({
                "BlockEditor.useEffect.timer": ()=>{
                    el.classList.remove("block-editor__pulse");
                    setHighlightedBlockId(null);
                }
            }["BlockEditor.useEffect.timer"], 1400);
            return ({
                "BlockEditor.useEffect": ()=>{
                    el.classList.remove("block-editor__pulse");
                    window.clearTimeout(timer);
                }
            })["BlockEditor.useEffect"];
        }
    }["BlockEditor.useEffect"], [
        highlightedBlockId
    ]);
    const hasMeaningfulText = (html)=>{
        if (!html) return false;
        const plain = html.replace(/<[^>]*>/g, "").replace(/\u00A0/g, " ").trim();
        return /[A-Za-zÀ-ÖØ-öø-ÿ0-9]/.test(plain);
    };
    // Gestion auto-scroll pendant le drag dans le conteneur scrollable gauche
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
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
    const handleAddBlock = (parentId, explicitType)=>{
        var _findBlockById;
        const typeToUse = explicitType || (parentId ? subBlockTypes[parentId] || "text" : "text");
        // Règles: vérifier que le type est autorisé pour ce parent
        const parentType = parentId ? (_findBlockById = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$types$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["findBlockById"])(blocks, parentId)) === null || _findBlockById === void 0 ? void 0 : _findBlockById.type : undefined;
        const allowed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$types$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getAllowedChildTypesForParent"])(parentType);
        if (!allowed.includes(typeToUse)) {
            setDragError("Type de bloc non autorisé ici");
            setTimeout(()=>setDragError(null), 1800);
            return;
        }
        const newBlock = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
            type: typeToUse,
            content: typeToUse === "contact" ? {
                email: "",
                phone: "",
                address: "",
                linkedin: ""
            } : typeToUse === "divider" ? undefined : "",
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$types$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getAllowedChildTypesForParent"])(typeToUse).length > 0 ? [] : undefined
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
    const cloneBlockWithNewIds = (block)=>{
        var _block_children;
        var _block_children_map;
        return {
            ...block,
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
            children: (_block_children_map = (_block_children = block.children) === null || _block_children === void 0 ? void 0 : _block_children.map(cloneBlockWithNewIds)) !== null && _block_children_map !== void 0 ? _block_children_map : []
        };
    };
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
            const parentBlock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$types$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["findBlockById"])(blocks, source.droppableId);
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
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$types$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["canMoveBlock"])(dragContext, blocks)) {
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
        const b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$types$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["findBlockById"])(blocks, start.draggableId);
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
    const moveBlockBetweenContainers = (blocksList, source, destination)=>{
        // Trouver le bloc à déplacer
        let blockToMove;
        if (source.droppableId === "root") {
            blockToMove = blocksList[source.index];
        } else {
            const sourceBlock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$types$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["findBlockById"])(blocksList, source.droppableId);
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
        var _block_content, _block_content1, _block_content2, _block_content3, _block_content4, _block_content5, _block_content6, _block_content7, _block_content8, _block_content9, _block_content10, _block_content11;
        const allowedChildTypes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$types$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getAllowedChildTypesForParent"])(block.type);
        const canHaveChildren = allowedChildTypes.length > 0;
        const parentBlock = parentId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$types$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["findBlockById"])(blocks, parentId) : undefined;
        const isChildOfSubsection = (parentBlock === null || parentBlock === void 0 ? void 0 : parentBlock.type) === "subsection";
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "data-block-id": block.id,
            style: {
                border: "1px solid ".concat(isSelfDragging ? "#60a5fa" : "#e2e8f0"),
                borderRadius: 12,
                padding: "14px 16px",
                marginBottom: 10,
                backgroundColor: "#ffffff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                transition: "all 0.2s ease",
                position: "relative",
                borderLeft: "4px solid ".concat(meta.color)
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 12,
                        marginBottom: isCollapsed ? 0 : 10
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                flex: 1
                            },
                            children: [
                                supportsCollapse ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 28,
                                        height: 28
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                    lineNumber: 770,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    ...handleProps !== null && handleProps !== void 0 ? handleProps : {},
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 4
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 8
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: 6,
                                alignItems: "center"
                            },
                            children: [
                                canHaveChildren && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 6
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
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
                                            children: allowedChildTypes.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>handleDuplicateBlock(block.id),
                                    style: actionButtonStyle,
                                    title: "Dupliquer le bloc",
                                    children: [
                                        "⧉",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: 4
                    },
                    children: block.type === "divider" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                        style: {
                            border: "none",
                            borderTop: "2px solid #e5e7eb",
                            margin: "8px 0"
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 890,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : block.type === "contact" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                placeholder: "Email",
                                value: ((_block_content = block.content) === null || _block_content === void 0 ? void 0 : _block_content.email) || "",
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                placeholder: "Téléphone",
                                value: ((_block_content1 = block.content) === null || _block_content1 === void 0 ? void 0 : _block_content1.phone) || "",
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                placeholder: "Adresse",
                                value: ((_block_content2 = block.content) === null || _block_content2 === void 0 ? void 0 : _block_content2.address) || "",
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                placeholder: "LinkedIn",
                                value: ((_block_content3 = block.content) === null || _block_content3 === void 0 ? void 0 : _block_content3.linkedin) || "",
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
                    }, ("TURBOPACK compile-time value", void 0)) : block.type === "subsection" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RichTextEditor, {
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
                                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 952,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: 8
                                },
                                children: [
                                    hasMeaningfulText((_block_content5 = block.content) === null || _block_content5 === void 0 ? void 0 : _block_content5.subtitle) || subtitleVisible[block.id] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                    hasMeaningfulText((_block_content6 = block.content) === null || _block_content6 === void 0 ? void 0 : _block_content6.period) || periodVisible[block.id] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                            (hasMeaningfulText((_block_content7 = block.content) === null || _block_content7 === void 0 ? void 0 : _block_content7.subtitle) || subtitleVisible[block.id]) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RichTextEditor, {
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
                                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 1010,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            (hasMeaningfulText((_block_content9 = block.content) === null || _block_content9 === void 0 ? void 0 : _block_content9.period) || periodVisible[block.id]) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RichTextEditor, {
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
                                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                                lineNumber: 1020,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 951,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RichTextEditor, {
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
                        fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                        lineNumber: 1030,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                    lineNumber: 888,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                canHaveChildren && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f40$hello$2d$pangea$2f$dnd$2f$dist$2f$dnd$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Droppable"], {
                    droppableId: block.id,
                    type: "CHILD",
                    isDropDisabled: !!isSelfDragging || draggingBlockType === "subsection" && block.type === "subsection",
                    children: (provided, snapshot)=>{
                        var _block_children;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                !isCollapsed && ((_block_children = block.children) === null || _block_children === void 0 ? void 0 : _block_children.map((child, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f40$hello$2d$pangea$2f$dnd$2f$dist$2f$dnd$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Draggable"], {
                                        draggableId: child.id,
                                        index: index,
                                        children: (provided, snapshotChild)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                    }, ("TURBOPACK compile-time value", void 0)))),
                                provided.placeholder,
                                isCollapsed && block.children && block.children.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        }, ("TURBOPACK compile-time value", void 0));
                    }
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: "20px",
            backgroundColor: "#f8fafc"
        },
        children: [
            dragError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: "\n        .block-editor__pulse {\n          animation: blockEditorPulse 0.4s ease-in-out 0s 2 alternate;\n        }\n        @keyframes blockEditorPulse {\n          from { box-shadow: 0 0 0 rgba(59, 130, 246, 0.4); }\n          to { box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.1); }\n        }\n        input[data-contact-input]:focus {\n          border-color: #3b82f6 !important;\n          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.14);\n          outline: none;\n        }\n      "
            }, void 0, false, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx",
                lineNumber: 1132,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                                    gap: 12
                                },
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$types$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getAllowedChildTypesForParent"])(undefined).map((type)=>{
                                    const meta = getBlockMeta(type);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f40$hello$2d$pangea$2f$dnd$2f$dist$2f$dnd$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["DragDropContext"], {
                onDragEnd: handleDragEnd,
                onDragStart: handleDragStart,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f40$hello$2d$pangea$2f$dnd$2f$dist$2f$dnd$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Droppable"], {
                    droppableId: "root",
                    type: "ROOT",
                    isDropDisabled: draggingBlockType === "subsection",
                    children: (provided, snapshot)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                blocks.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                }, ("TURBOPACK compile-time value", void 0)) : blocks.map((block, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f40$hello$2d$pangea$2f$dnd$2f$dist$2f$dnd$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Draggable"], {
                                        draggableId: block.id,
                                        index: index,
                                        children: (provided, snapshot)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                snapshot.isDraggingOver && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_s1(BlockEditor, "8YBJJJQN2njLTIw3iNRr2VL7NXg=");
_c1 = BlockEditor;
const __TURBOPACK__default__export__ = BlockEditor;
var _c, _c1;
__turbopack_context__.k.register(_c, "RichTextEditor");
__turbopack_context__.k.register(_c1, "BlockEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/finance-type/my-cv-app/utils/blocksToHTML.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>blocksToHTML
]);
function blocksToHTML(blocks) {
    let _fontScale = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
    void _fontScale;
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
"[project]/Desktop/finance-type/my-cv-app/utils/cvStyles.ts [client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__N_SSP",
    ()=>__N_SSP,
    "default",
    ()=>CvGeneratorPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$components$2f$DynamicHeader$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/components/DynamicHeader.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/react-resizable-panels/dist/react-resizable-panels.browser.development.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$components$2f$BlockEditor$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/components/BlockEditor.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$blocksToHTML$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/utils/blocksToHTML.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$cvStyles$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/utils/cvStyles.ts [client] (ecmascript)");
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
var __N_SSP = true;
function CvGeneratorPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [blocks, setBlocks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [fontScale, setFontScale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("Mon CV");
    const [cvId, setCvId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoadingCv, setIsLoadingCv] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [loadError, setLoadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showWarning, setShowWarning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saveState, setSaveState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [saveMessage, setSaveMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const previewRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const editorScrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CvGeneratorPage.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            if (cvId) return;
            const draft = {
                blocks,
                fontScale,
                title
            };
            try {
                window.localStorage.setItem("cv_draft", JSON.stringify(draft));
            } catch (e) {}
        }
    }["CvGeneratorPage.useEffect"], [
        blocks,
        fontScale,
        title,
        cvId
    ]);
    // Calcul de la taille optimale
    const calculateOptimalFontScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CvGeneratorPage.useCallback[calculateOptimalFontScale]": ()=>{
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
                tempDiv.innerHTML = "<style>".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$cvStyles$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["default"])(currentScale), "</style>") + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$blocksToHTML$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["default"])(blocks, currentScale);
                const contentHeight = tempDiv.scrollHeight;
                if (contentHeight <= maxHeight) {
                    scale = currentScale;
                    break;
                }
                currentScale -= step;
            }
            document.body.removeChild(tempDiv);
            return scale;
        }
    }["CvGeneratorPage.useCallback[calculateOptimalFontScale]"], [
        blocks
    ]);
    // Vérifier le dépassement à chaque changement de blocks avec délai
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
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
                throw new Error(errorData.error || "HTTP error! status: ".concat(res.status));
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
            alert("Erreur lors de la génération du PDF: ".concat(error instanceof Error ? error.message : "Erreur inconnue"));
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CvGeneratorPage.useEffect": ()=>{
            if (saveState === 'idle') return;
            const timer = setTimeout({
                "CvGeneratorPage.useEffect.timer": ()=>{
                    setSaveState('idle');
                    setSaveMessage(null);
                }
            }["CvGeneratorPage.useEffect.timer"], 3000);
            return ({
                "CvGeneratorPage.useEffect": ()=>clearTimeout(timer)
            })["CvGeneratorPage.useEffect"];
        }
    }["CvGeneratorPage.useEffect"], [
        saveState
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: styles
            }, void 0, false, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$cvStyles$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["default"])(fontScale)
            }, void 0, false, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                lineNumber: 183,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$components$2f$DynamicHeader$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                variant: "landing",
                scrollContainerRef: editorScrollRef
            }, void 0, false, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PanelGroup"], {
                direction: "horizontal",
                style: {
                    height: "100vh"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Panel"], {
                        defaultSize: 60,
                        minSize: 30,
                        maxSize: 80,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                height: "100%",
                                padding: "1rem",
                                overflow: "auto"
                            },
                            ref: editorScrollRef,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$components$2f$BlockEditor$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                blocks: blocks,
                                setBlocks: setBlocks,
                                scrollContainerRef: editorScrollRef
                            }, void 0, false, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                                lineNumber: 198,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                            lineNumber: 193,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                        lineNumber: 192,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PanelResizeHandle"], {
                        style: {
                            width: "8px",
                            backgroundColor: "#e1e5e9",
                            cursor: "col-resize",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: "2px",
                                height: "40px",
                                backgroundColor: "#9ca3af",
                                borderRadius: "1px"
                            }
                        }, void 0, false, {
                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                            lineNumber: 213,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Panel"], {
                        defaultSize: 50,
                        minSize: 45,
                        maxSize: 60,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                height: "100vh",
                                overflow: "hidden",
                                backgroundColor: "#f8fafc",
                                padding: "0.5rem",
                                borderLeft: "1px solid #e1e5e9",
                                display: "flex",
                                flexDirection: "column"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    overflow: "auto",
                                    marginBottom: "0.5rem"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    gap: "8px",
                                                    flexWrap: "wrap"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                                        lineNumber: 262,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                                        lineNumber: 280,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                                                lineNumber: 255,
                                                columnNumber: 17
                                            }, this),
                                            saveMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "13px",
                                                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                                                    color: saveState === 'success' ? "#047857" : "#dc2626"
                                                },
                                                children: saveMessage
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                                                lineNumber: 298,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                                        lineNumber: 239,
                                        columnNumber: 15
                                    }, this),
                                    showWarning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                        lineNumber: 311,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {},
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                __html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$utils$2f$blocksToHTML$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["default"])(blocks, fontScale)
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                                            lineNumber: 328,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                                        lineNumber: 326,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                                lineNumber: 233,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                            lineNumber: 223,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx",
                lineNumber: 190,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(CvGeneratorPage, "VzfIJp4J6oH1kiKfedvXaD9VdWE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = CvGeneratorPage;
var _c;
__turbopack_context__.k.register(_c, "CvGeneratorPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/cv";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx [client] (ecmascript)");
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
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/Desktop/finance-type/my-cv-app/pages/cv\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/Desktop/finance-type/my-cv-app/pages/cv.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__c3435967._.js.map