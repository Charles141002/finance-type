(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/finance-type/my-cv-app/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
exports._ = _interop_require_default;
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
        default: obj
    };
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
            else newObj[key] = obj[key];
        }
    }
    newObj.default = obj;
    if (cache) cache.set(obj, newObj);
    return newObj;
}
exports._ = _interop_require_wildcard;
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/@swc/helpers/cjs/_define_property.cjs [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
exports._ = _define_property;
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/@swc/helpers/cjs/_class_private_field_loose_base.cjs [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _class_private_field_loose_base(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
        throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
}
exports._ = _class_private_field_loose_base;
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/@swc/helpers/cjs/_class_private_field_loose_key.cjs [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var id = 0;
function _class_private_field_loose_key(name) {
    return "__private_" + id++ + "_" + name;
}
exports._ = _class_private_field_loose_key;
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/react/cjs/react.development.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function defineDeprecationWarning(methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
            get: function() {
                console.warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
            }
        });
    }
    function getIteratorFn(maybeIterable) {
        if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
        maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
        return "function" === typeof maybeIterable ? maybeIterable : null;
    }
    function warnNoop(publicInstance, callerName) {
        publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
        var warningKey = publicInstance + "." + callerName;
        didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, publicInstance), didWarnStateUpdateForUnmountedComponent[warningKey] = !0);
    }
    function Component(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
    }
    function ComponentDummy() {}
    function PureComponent(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return (type.displayName || "Context") + ".Provider";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, self, source, owner, props, debugStack, debugTask) {
        self = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function cloneAndReplaceKey(oldElement, newKey) {
        newKey = ReactElement(oldElement.type, newKey, void 0, void 0, oldElement._owner, oldElement.props, oldElement._debugStack, oldElement._debugTask);
        oldElement._store && (newKey._store.validated = oldElement._store.validated);
        return newKey;
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function escape(key) {
        var escaperLookup = {
            "=": "=0",
            ":": "=2"
        };
        return "$" + key.replace(/[=:]/g, function(match) {
            return escaperLookup[match];
        });
    }
    function getElementKey(element, index) {
        return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
    }
    function noop$1() {}
    function resolveThenable(thenable) {
        switch(thenable.status){
            case "fulfilled":
                return thenable.value;
            case "rejected":
                throw thenable.reason;
            default:
                switch("string" === typeof thenable.status ? thenable.then(noop$1, noop$1) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
                    "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
                }, function(error) {
                    "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
                })), thenable.status){
                    case "fulfilled":
                        return thenable.value;
                    case "rejected":
                        throw thenable.reason;
                }
        }
        throw thenable;
    }
    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
        var type = typeof children;
        if ("undefined" === type || "boolean" === type) children = null;
        var invokeCallback = !1;
        if (null === children) invokeCallback = !0;
        else switch(type){
            case "bigint":
            case "string":
            case "number":
                invokeCallback = !0;
                break;
            case "object":
                switch(children.$$typeof){
                    case REACT_ELEMENT_TYPE:
                    case REACT_PORTAL_TYPE:
                        invokeCallback = !0;
                        break;
                    case REACT_LAZY_TYPE:
                        return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
                }
        }
        if (invokeCallback) {
            invokeCallback = children;
            callback = callback(invokeCallback);
            var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
            isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
                return c;
            })) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + childKey), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
            return 1;
        }
        invokeCallback = 0;
        childKey = "" === nameSoFar ? "." : nameSoFar + ":";
        if (isArrayImpl(children)) for(var i = 0; i < children.length; i++)nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
        else if (i = getIteratorFn(children), "function" === typeof i) for(i === children.entries && (didWarnAboutMaps || console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), didWarnAboutMaps = !0), children = i.call(children), i = 0; !(nameSoFar = children.next()).done;)nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
        else if ("object" === type) {
            if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
            array = String(children);
            throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
        }
        return invokeCallback;
    }
    function mapChildren(children, func, context) {
        if (null == children) return children;
        var result = [], count = 0;
        mapIntoArray(children, result, "", "", function(child) {
            return func.call(context, child, count++);
        });
        return result;
    }
    function lazyInitializer(payload) {
        if (-1 === payload._status) {
            var ctor = payload._result;
            ctor = ctor();
            ctor.then(function(moduleObject) {
                if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject;
            }, function(error) {
                if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error;
            });
            -1 === payload._status && (payload._status = 0, payload._result = ctor);
        }
        if (1 === payload._status) return ctor = payload._result, void 0 === ctor && console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", ctor), "default" in ctor || console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", ctor), ctor.default;
        throw payload._result;
    }
    function resolveDispatcher() {
        var dispatcher = ReactSharedInternals.H;
        null === dispatcher && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
        return dispatcher;
    }
    function noop() {}
    function enqueueTask(task) {
        if (null === enqueueTaskImpl) try {
            var requireString = ("require" + Math.random()).slice(0, 7);
            enqueueTaskImpl = (module && module[requireString]).call(module, "timers").setImmediate;
        } catch (_err) {
            enqueueTaskImpl = function(callback) {
                !1 === didWarnAboutMessageChannel && (didWarnAboutMessageChannel = !0, "undefined" === typeof MessageChannel && console.error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
                var channel = new MessageChannel();
                channel.port1.onmessage = callback;
                channel.port2.postMessage(void 0);
            };
        }
        return enqueueTaskImpl(task);
    }
    function aggregateErrors(errors) {
        return 1 < errors.length && "function" === typeof AggregateError ? new AggregateError(errors) : errors[0];
    }
    function popActScope(prevActQueue, prevActScopeDepth) {
        prevActScopeDepth !== actScopeDepth - 1 && console.error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
        actScopeDepth = prevActScopeDepth;
    }
    function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
        var queue = ReactSharedInternals.actQueue;
        if (null !== queue) if (0 !== queue.length) try {
            flushActQueue(queue);
            enqueueTask(function() {
                return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
            });
            return;
        } catch (error) {
            ReactSharedInternals.thrownErrors.push(error);
        }
        else ReactSharedInternals.actQueue = null;
        0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
    }
    function flushActQueue(queue) {
        if (!isFlushing) {
            isFlushing = !0;
            var i = 0;
            try {
                for(; i < queue.length; i++){
                    var callback = queue[i];
                    do {
                        ReactSharedInternals.didUsePromise = !1;
                        var continuation = callback(!1);
                        if (null !== continuation) {
                            if (ReactSharedInternals.didUsePromise) {
                                queue[i] = callback;
                                queue.splice(0, i);
                                return;
                            }
                            callback = continuation;
                        } else break;
                    }while (1)
                }
                queue.length = 0;
            } catch (error) {
                queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
            } finally{
                isFlushing = !1;
            }
        }
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    Symbol.for("react.provider");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue = {
        isMounted: function() {
            return !1;
        },
        enqueueForceUpdate: function(publicInstance) {
            warnNoop(publicInstance, "forceUpdate");
        },
        enqueueReplaceState: function(publicInstance) {
            warnNoop(publicInstance, "replaceState");
        },
        enqueueSetState: function(publicInstance) {
            warnNoop(publicInstance, "setState");
        }
    }, assign = Object.assign, emptyObject = {};
    Object.freeze(emptyObject);
    Component.prototype.isReactComponent = {};
    Component.prototype.setState = function(partialState, callback) {
        if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, partialState, callback, "setState");
    };
    Component.prototype.forceUpdate = function(callback) {
        this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
    };
    var deprecatedAPIs = {
        isMounted: [
            "isMounted",
            "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
        ],
        replaceState: [
            "replaceState",
            "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
        ]
    }, fnName;
    for(fnName in deprecatedAPIs)deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    ComponentDummy.prototype = Component.prototype;
    deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
    deprecatedAPIs.constructor = PureComponent;
    assign(deprecatedAPIs, Component.prototype);
    deprecatedAPIs.isPureReactComponent = !0;
    var isArrayImpl = Array.isArray, REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = {
        H: null,
        A: null,
        T: null,
        S: null,
        V: null,
        actQueue: null,
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1,
        didUsePromise: !1,
        thrownErrors: [],
        getCurrentStack: null,
        recentlyCreatedOwnerStacks: 0
    }, hasOwnProperty = Object.prototype.hasOwnProperty, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    deprecatedAPIs = {
        "react-stack-bottom-frame": function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = deprecatedAPIs["react-stack-bottom-frame"].bind(deprecatedAPIs, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutMaps = !1, userProvidedKeyEscapeRegex = /\/+/g, reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
        if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
            var event = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
                error: error
            });
            if (!window.dispatchEvent(event)) return;
        } else if ("object" === typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"] && "function" === typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].emit) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].emit("uncaughtException", error);
            return;
        }
        console.error(error);
    }, didWarnAboutMessageChannel = !1, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = !1, isFlushing = !1, queueSeveralMicrotasks = "function" === typeof queueMicrotask ? function(callback) {
        queueMicrotask(function() {
            return queueMicrotask(callback);
        });
    } : enqueueTask;
    deprecatedAPIs = Object.freeze({
        __proto__: null,
        c: function(size) {
            return resolveDispatcher().useMemoCache(size);
        }
    });
    exports.Children = {
        map: mapChildren,
        forEach: function(children, forEachFunc, forEachContext) {
            mapChildren(children, function() {
                forEachFunc.apply(this, arguments);
            }, forEachContext);
        },
        count: function(children) {
            var n = 0;
            mapChildren(children, function() {
                n++;
            });
            return n;
        },
        toArray: function(children) {
            return mapChildren(children, function(child) {
                return child;
            }) || [];
        },
        only: function(children) {
            if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
            return children;
        }
    };
    exports.Component = Component;
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.Profiler = REACT_PROFILER_TYPE;
    exports.PureComponent = PureComponent;
    exports.StrictMode = REACT_STRICT_MODE_TYPE;
    exports.Suspense = REACT_SUSPENSE_TYPE;
    exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
    exports.__COMPILER_RUNTIME = deprecatedAPIs;
    exports.act = function(callback) {
        var prevActQueue = ReactSharedInternals.actQueue, prevActScopeDepth = actScopeDepth;
        actScopeDepth++;
        var queue = ReactSharedInternals.actQueue = null !== prevActQueue ? prevActQueue : [], didAwaitActCall = !1;
        try {
            var result = callback();
        } catch (error) {
            ReactSharedInternals.thrownErrors.push(error);
        }
        if (0 < ReactSharedInternals.thrownErrors.length) throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
        if (null !== result && "object" === typeof result && "function" === typeof result.then) {
            var thenable = result;
            queueSeveralMicrotasks(function() {
                didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = !0, console.error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            });
            return {
                then: function(resolve, reject) {
                    didAwaitActCall = !0;
                    thenable.then(function(returnValue) {
                        popActScope(prevActQueue, prevActScopeDepth);
                        if (0 === prevActScopeDepth) {
                            try {
                                flushActQueue(queue), enqueueTask(function() {
                                    return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                                });
                            } catch (error$0) {
                                ReactSharedInternals.thrownErrors.push(error$0);
                            }
                            if (0 < ReactSharedInternals.thrownErrors.length) {
                                var _thrownError = aggregateErrors(ReactSharedInternals.thrownErrors);
                                ReactSharedInternals.thrownErrors.length = 0;
                                reject(_thrownError);
                            }
                        } else resolve(returnValue);
                    }, function(error) {
                        popActScope(prevActQueue, prevActScopeDepth);
                        0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
                    });
                }
            };
        }
        var returnValue$jscomp$0 = result;
        popActScope(prevActQueue, prevActScopeDepth);
        0 === prevActScopeDepth && (flushActQueue(queue), 0 !== queue.length && queueSeveralMicrotasks(function() {
            didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = !0, console.error("A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"));
        }), ReactSharedInternals.actQueue = null);
        if (0 < ReactSharedInternals.thrownErrors.length) throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
        return {
            then: function(resolve, reject) {
                didAwaitActCall = !0;
                0 === prevActScopeDepth ? (ReactSharedInternals.actQueue = queue, enqueueTask(function() {
                    return recursivelyFlushAsyncActWork(returnValue$jscomp$0, resolve, reject);
                })) : resolve(returnValue$jscomp$0);
            }
        };
    };
    exports.cache = function(fn) {
        return function() {
            return fn.apply(null, arguments);
        };
    };
    exports.captureOwnerStack = function() {
        var getCurrentStack = ReactSharedInternals.getCurrentStack;
        return null === getCurrentStack ? null : getCurrentStack();
    };
    exports.cloneElement = function(element, config, children) {
        if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
        var props = assign({}, element.props), key = element.key, owner = element._owner;
        if (null != config) {
            var JSCompiler_inline_result;
            a: {
                if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(config, "ref").get) && JSCompiler_inline_result.isReactWarning) {
                    JSCompiler_inline_result = !1;
                    break a;
                }
                JSCompiler_inline_result = void 0 !== config.ref;
            }
            JSCompiler_inline_result && (owner = getOwner());
            hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
            for(propName in config)!hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
        }
        var propName = arguments.length - 2;
        if (1 === propName) props.children = children;
        else if (1 < propName) {
            JSCompiler_inline_result = Array(propName);
            for(var i = 0; i < propName; i++)JSCompiler_inline_result[i] = arguments[i + 2];
            props.children = JSCompiler_inline_result;
        }
        props = ReactElement(element.type, key, void 0, void 0, owner, props, element._debugStack, element._debugTask);
        for(key = 2; key < arguments.length; key++)owner = arguments[key], isValidElement(owner) && owner._store && (owner._store.validated = 1);
        return props;
    };
    exports.createContext = function(defaultValue) {
        defaultValue = {
            $$typeof: REACT_CONTEXT_TYPE,
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            _threadCount: 0,
            Provider: null,
            Consumer: null
        };
        defaultValue.Provider = defaultValue;
        defaultValue.Consumer = {
            $$typeof: REACT_CONSUMER_TYPE,
            _context: defaultValue
        };
        defaultValue._currentRenderer = null;
        defaultValue._currentRenderer2 = null;
        return defaultValue;
    };
    exports.createElement = function(type, config, children) {
        for(var i = 2; i < arguments.length; i++){
            var node = arguments[i];
            isValidElement(node) && node._store && (node._store.validated = 1);
        }
        i = {};
        node = null;
        if (null != config) for(propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = !0, console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")), hasValidKey(config) && (checkKeyStringCoercion(config.key), node = "" + config.key), config)hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
        var childrenLength = arguments.length - 2;
        if (1 === childrenLength) i.children = children;
        else if (1 < childrenLength) {
            for(var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++)childArray[_i] = arguments[_i + 2];
            Object.freeze && Object.freeze(childArray);
            i.children = childArray;
        }
        if (type && type.defaultProps) for(propName in childrenLength = type.defaultProps, childrenLength)void 0 === i[propName] && (i[propName] = childrenLength[propName]);
        node && defineKeyPropWarningGetter(i, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return ReactElement(type, node, void 0, void 0, getOwner(), i, propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack, propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
    exports.createRef = function() {
        var refObject = {
            current: null
        };
        Object.seal(refObject);
        return refObject;
    };
    exports.forwardRef = function(render) {
        null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : "function" !== typeof render ? console.error("forwardRef requires a render function but was given %s.", null === render ? "null" : typeof render) : 0 !== render.length && 2 !== render.length && console.error("forwardRef render functions accept exactly two parameters: props and ref. %s", 1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
        null != render && null != render.defaultProps && console.error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");
        var elementType = {
            $$typeof: REACT_FORWARD_REF_TYPE,
            render: render
        }, ownName;
        Object.defineProperty(elementType, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
                return ownName;
            },
            set: function(name) {
                ownName = name;
                render.name || render.displayName || (Object.defineProperty(render, "name", {
                    value: name
                }), render.displayName = name);
            }
        });
        return elementType;
    };
    exports.isValidElement = isValidElement;
    exports.lazy = function(ctor) {
        return {
            $$typeof: REACT_LAZY_TYPE,
            _payload: {
                _status: -1,
                _result: ctor
            },
            _init: lazyInitializer
        };
    };
    exports.memo = function(type, compare) {
        null == type && console.error("memo: The first argument must be a component. Instead received: %s", null === type ? "null" : typeof type);
        compare = {
            $$typeof: REACT_MEMO_TYPE,
            type: type,
            compare: void 0 === compare ? null : compare
        };
        var ownName;
        Object.defineProperty(compare, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
                return ownName;
            },
            set: function(name) {
                ownName = name;
                type.name || type.displayName || (Object.defineProperty(type, "name", {
                    value: name
                }), type.displayName = name);
            }
        });
        return compare;
    };
    exports.startTransition = function(scope) {
        var prevTransition = ReactSharedInternals.T, currentTransition = {};
        ReactSharedInternals.T = currentTransition;
        currentTransition._updatedFibers = new Set();
        try {
            var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
            null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
            "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
        } catch (error) {
            reportGlobalError(error);
        } finally{
            null === prevTransition && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.")), ReactSharedInternals.T = prevTransition;
        }
    };
    exports.unstable_useCacheRefresh = function() {
        return resolveDispatcher().useCacheRefresh();
    };
    exports.use = function(usable) {
        return resolveDispatcher().use(usable);
    };
    exports.useActionState = function(action, initialState, permalink) {
        return resolveDispatcher().useActionState(action, initialState, permalink);
    };
    exports.useCallback = function(callback, deps) {
        return resolveDispatcher().useCallback(callback, deps);
    };
    exports.useContext = function(Context) {
        var dispatcher = resolveDispatcher();
        Context.$$typeof === REACT_CONSUMER_TYPE && console.error("Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?");
        return dispatcher.useContext(Context);
    };
    exports.useDebugValue = function(value, formatterFn) {
        return resolveDispatcher().useDebugValue(value, formatterFn);
    };
    exports.useDeferredValue = function(value, initialValue) {
        return resolveDispatcher().useDeferredValue(value, initialValue);
    };
    exports.useEffect = function(create, createDeps, update) {
        null == create && console.warn("React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?");
        var dispatcher = resolveDispatcher();
        if ("function" === typeof update) throw Error("useEffect CRUD overload is not enabled in this build of React.");
        return dispatcher.useEffect(create, createDeps);
    };
    exports.useId = function() {
        return resolveDispatcher().useId();
    };
    exports.useImperativeHandle = function(ref, create, deps) {
        return resolveDispatcher().useImperativeHandle(ref, create, deps);
    };
    exports.useInsertionEffect = function(create, deps) {
        null == create && console.warn("React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?");
        return resolveDispatcher().useInsertionEffect(create, deps);
    };
    exports.useLayoutEffect = function(create, deps) {
        null == create && console.warn("React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?");
        return resolveDispatcher().useLayoutEffect(create, deps);
    };
    exports.useMemo = function(create, deps) {
        return resolveDispatcher().useMemo(create, deps);
    };
    exports.useOptimistic = function(passthrough, reducer) {
        return resolveDispatcher().useOptimistic(passthrough, reducer);
    };
    exports.useReducer = function(reducer, initialArg, init) {
        return resolveDispatcher().useReducer(reducer, initialArg, init);
    };
    exports.useRef = function(initialValue) {
        return resolveDispatcher().useRef(initialValue);
    };
    exports.useState = function(initialState) {
        return resolveDispatcher().useState(initialState);
    };
    exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
        return resolveDispatcher().useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    };
    exports.useTransition = function() {
        return resolveDispatcher().useTransition();
    };
    exports.version = "19.1.0";
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
}();
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/react/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Desktop/finance-type/my-cv-app/node_modules/react/cjs/react.development.js [client] (ecmascript)");
}
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/react/cjs/react-jsx-runtime.development.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return (type.displayName || "Context") + ".Provider";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, self, source, owner, props, debugStack, debugTask) {
        self = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, self, source, getOwner(), maybeKey, debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/Desktop/finance-type/my-cv-app/node_modules/react/index.js [client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    Symbol.for("react.provider");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        "react-stack-bottom-frame": function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React["react-stack-bottom-frame"].bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsx = function(type, config, maybeKey, source, self) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, !1, source, self, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
    exports.jsxs = function(type, config, maybeKey, source, self) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, !0, source, self, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/react/jsx-runtime.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Desktop/finance-type/my-cv-app/node_modules/react/cjs/react-jsx-runtime.development.js [client] (ecmascript)");
}
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/react/cjs/react-jsx-dev-runtime.development.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return (type.displayName || "Context") + ".Provider";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, self, source, owner, props, debugStack, debugTask) {
        self = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, self, source, getOwner(), maybeKey, debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/Desktop/finance-type/my-cv-app/node_modules/react/index.js [client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    Symbol.for("react.provider");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        "react-stack-bottom-frame": function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React["react-stack-bottom-frame"].bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren, source, self) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Desktop/finance-type/my-cv-app/node_modules/react/cjs/react-jsx-dev-runtime.development.js [client] (ecmascript)");
}
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/scheduler/cjs/scheduler.development.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function performWorkUntilDeadline() {
        needsPaint = !1;
        if (isMessageLoopRunning) {
            var currentTime = exports.unstable_now();
            startTime = currentTime;
            var hasMoreWork = !0;
            try {
                a: {
                    isHostCallbackScheduled = !1;
                    isHostTimeoutScheduled && (isHostTimeoutScheduled = !1, localClearTimeout(taskTimeoutID), taskTimeoutID = -1);
                    isPerformingWork = !0;
                    var previousPriorityLevel = currentPriorityLevel;
                    try {
                        b: {
                            advanceTimers(currentTime);
                            for(currentTask = peek(taskQueue); null !== currentTask && !(currentTask.expirationTime > currentTime && shouldYieldToHost());){
                                var callback = currentTask.callback;
                                if ("function" === typeof callback) {
                                    currentTask.callback = null;
                                    currentPriorityLevel = currentTask.priorityLevel;
                                    var continuationCallback = callback(currentTask.expirationTime <= currentTime);
                                    currentTime = exports.unstable_now();
                                    if ("function" === typeof continuationCallback) {
                                        currentTask.callback = continuationCallback;
                                        advanceTimers(currentTime);
                                        hasMoreWork = !0;
                                        break b;
                                    }
                                    currentTask === peek(taskQueue) && pop(taskQueue);
                                    advanceTimers(currentTime);
                                } else pop(taskQueue);
                                currentTask = peek(taskQueue);
                            }
                            if (null !== currentTask) hasMoreWork = !0;
                            else {
                                var firstTimer = peek(timerQueue);
                                null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
                                hasMoreWork = !1;
                            }
                        }
                        break a;
                    } finally{
                        currentTask = null, currentPriorityLevel = previousPriorityLevel, isPerformingWork = !1;
                    }
                    hasMoreWork = void 0;
                }
            } finally{
                hasMoreWork ? schedulePerformWorkUntilDeadline() : isMessageLoopRunning = !1;
            }
        }
    }
    function push(heap, node) {
        var index = heap.length;
        heap.push(node);
        a: for(; 0 < index;){
            var parentIndex = index - 1 >>> 1, parent = heap[parentIndex];
            if (0 < compare(parent, node)) heap[parentIndex] = node, heap[index] = parent, index = parentIndex;
            else break a;
        }
    }
    function peek(heap) {
        return 0 === heap.length ? null : heap[0];
    }
    function pop(heap) {
        if (0 === heap.length) return null;
        var first = heap[0], last = heap.pop();
        if (last !== first) {
            heap[0] = last;
            a: for(var index = 0, length = heap.length, halfLength = length >>> 1; index < halfLength;){
                var leftIndex = 2 * (index + 1) - 1, left = heap[leftIndex], rightIndex = leftIndex + 1, right = heap[rightIndex];
                if (0 > compare(left, last)) rightIndex < length && 0 > compare(right, left) ? (heap[index] = right, heap[rightIndex] = last, index = rightIndex) : (heap[index] = left, heap[leftIndex] = last, index = leftIndex);
                else if (rightIndex < length && 0 > compare(right, last)) heap[index] = right, heap[rightIndex] = last, index = rightIndex;
                else break a;
            }
        }
        return first;
    }
    function compare(a, b) {
        var diff = a.sortIndex - b.sortIndex;
        return 0 !== diff ? diff : a.id - b.id;
    }
    function advanceTimers(currentTime) {
        for(var timer = peek(timerQueue); null !== timer;){
            if (null === timer.callback) pop(timerQueue);
            else if (timer.startTime <= currentTime) pop(timerQueue), timer.sortIndex = timer.expirationTime, push(taskQueue, timer);
            else break;
            timer = peek(timerQueue);
        }
    }
    function handleTimeout(currentTime) {
        isHostTimeoutScheduled = !1;
        advanceTimers(currentTime);
        if (!isHostCallbackScheduled) if (null !== peek(taskQueue)) isHostCallbackScheduled = !0, isMessageLoopRunning || (isMessageLoopRunning = !0, schedulePerformWorkUntilDeadline());
        else {
            var firstTimer = peek(timerQueue);
            null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
        }
    }
    function shouldYieldToHost() {
        return needsPaint ? !0 : exports.unstable_now() - startTime < frameInterval ? !1 : !0;
    }
    function requestHostTimeout(callback, ms) {
        taskTimeoutID = localSetTimeout(function() {
            callback(exports.unstable_now());
        }, ms);
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    exports.unstable_now = void 0;
    if ("object" === typeof performance && "function" === typeof performance.now) {
        var localPerformance = performance;
        exports.unstable_now = function() {
            return localPerformance.now();
        };
    } else {
        var localDate = Date, initialTime = localDate.now();
        exports.unstable_now = function() {
            return localDate.now() - initialTime;
        };
    }
    var taskQueue = [], timerQueue = [], taskIdCounter = 1, currentTask = null, currentPriorityLevel = 3, isPerformingWork = !1, isHostCallbackScheduled = !1, isHostTimeoutScheduled = !1, needsPaint = !1, localSetTimeout = "function" === typeof setTimeout ? setTimeout : null, localClearTimeout = "function" === typeof clearTimeout ? clearTimeout : null, localSetImmediate = "undefined" !== typeof setImmediate ? setImmediate : null, isMessageLoopRunning = !1, taskTimeoutID = -1, frameInterval = 5, startTime = -1;
    if ("function" === typeof localSetImmediate) var schedulePerformWorkUntilDeadline = function() {
        localSetImmediate(performWorkUntilDeadline);
    };
    else if ("undefined" !== typeof MessageChannel) {
        var channel = new MessageChannel(), port = channel.port2;
        channel.port1.onmessage = performWorkUntilDeadline;
        schedulePerformWorkUntilDeadline = function() {
            port.postMessage(null);
        };
    } else schedulePerformWorkUntilDeadline = function() {
        localSetTimeout(performWorkUntilDeadline, 0);
    };
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_cancelCallback = function(task) {
        task.callback = null;
    };
    exports.unstable_forceFrameRate = function(fps) {
        0 > fps || 125 < fps ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5;
    };
    exports.unstable_getCurrentPriorityLevel = function() {
        return currentPriorityLevel;
    };
    exports.unstable_next = function(eventHandler) {
        switch(currentPriorityLevel){
            case 1:
            case 2:
            case 3:
                var priorityLevel = 3;
                break;
            default:
                priorityLevel = currentPriorityLevel;
        }
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = priorityLevel;
        try {
            return eventHandler();
        } finally{
            currentPriorityLevel = previousPriorityLevel;
        }
    };
    exports.unstable_requestPaint = function() {
        needsPaint = !0;
    };
    exports.unstable_runWithPriority = function(priorityLevel, eventHandler) {
        switch(priorityLevel){
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            default:
                priorityLevel = 3;
        }
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = priorityLevel;
        try {
            return eventHandler();
        } finally{
            currentPriorityLevel = previousPriorityLevel;
        }
    };
    exports.unstable_scheduleCallback = function(priorityLevel, callback, options) {
        var currentTime = exports.unstable_now();
        "object" === typeof options && null !== options ? (options = options.delay, options = "number" === typeof options && 0 < options ? currentTime + options : currentTime) : options = currentTime;
        switch(priorityLevel){
            case 1:
                var timeout = -1;
                break;
            case 2:
                timeout = 250;
                break;
            case 5:
                timeout = 1073741823;
                break;
            case 4:
                timeout = 1e4;
                break;
            default:
                timeout = 5e3;
        }
        timeout = options + timeout;
        priorityLevel = {
            id: taskIdCounter++,
            callback: callback,
            priorityLevel: priorityLevel,
            startTime: options,
            expirationTime: timeout,
            sortIndex: -1
        };
        options > currentTime ? (priorityLevel.sortIndex = options, push(timerQueue, priorityLevel), null === peek(taskQueue) && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? (localClearTimeout(taskTimeoutID), taskTimeoutID = -1) : isHostTimeoutScheduled = !0, requestHostTimeout(handleTimeout, options - currentTime))) : (priorityLevel.sortIndex = timeout, push(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = !0, isMessageLoopRunning || (isMessageLoopRunning = !0, schedulePerformWorkUntilDeadline())));
        return priorityLevel;
    };
    exports.unstable_shouldYield = shouldYieldToHost;
    exports.unstable_wrapCallback = function(callback) {
        var parentPriorityLevel = currentPriorityLevel;
        return function() {
            var previousPriorityLevel = currentPriorityLevel;
            currentPriorityLevel = parentPriorityLevel;
            try {
                return callback.apply(this, arguments);
            } finally{
                currentPriorityLevel = previousPriorityLevel;
            }
        };
    };
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
}();
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/scheduler/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Desktop/finance-type/my-cv-app/node_modules/scheduler/cjs/scheduler.development.js [client] (ecmascript)");
}
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/@supabase/auth-helpers-react/dist/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var __async = (__this, __arguments, generator)=>{
    return new Promise((resolve, reject)=>{
        var fulfilled = (value)=>{
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        };
        var rejected = (value)=>{
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        };
        var step = (x)=>x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
        step((generator = generator.apply(__this, __arguments)).next());
    });
};
// src/index.tsx
var src_exports = {};
__export(src_exports, {
    SessionContextProvider: ()=>SessionContextProvider,
    useSession: ()=>useSession,
    useSessionContext: ()=>useSessionContext,
    useSupabaseClient: ()=>useSupabaseClient,
    useUser: ()=>useUser
});
module.exports = __toCommonJS(src_exports);
// src/components/SessionContext.tsx
var import_react = __turbopack_context__.r("[project]/Desktop/finance-type/my-cv-app/node_modules/react/index.js [client] (ecmascript)");
var import_jsx_runtime = __turbopack_context__.r("[project]/Desktop/finance-type/my-cv-app/node_modules/react/jsx-runtime.js [client] (ecmascript)");
var SessionContext = (0, import_react.createContext)({
    isLoading: true,
    session: null,
    error: null,
    supabaseClient: {}
});
var SessionContextProvider = (param)=>{
    let { supabaseClient, initialSession = null, children } = param;
    const [session, setSession] = (0, import_react.useState)(initialSession);
    const [isLoading, setIsLoading] = (0, import_react.useState)(!initialSession);
    const [error, setError] = (0, import_react.useState)();
    (0, import_react.useEffect)(()=>{
        if (!session && initialSession) {
            setSession(initialSession);
        }
    }, [
        session,
        initialSession
    ]);
    (0, import_react.useEffect)(()=>{
        let mounted = true;
        function getSession() {
            return __async(this, null, function*() {
                const { data: { session: session2 }, error: error2 } = yield supabaseClient.auth.getSession();
                if (mounted) {
                    if (error2) {
                        setError(error2);
                        setIsLoading(false);
                        return;
                    }
                    setSession(session2);
                    setIsLoading(false);
                }
            });
        }
        getSession();
        return ()=>{
            mounted = false;
        };
    }, []);
    (0, import_react.useEffect)(()=>{
        const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((event, session2)=>{
            if (session2 && (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "USER_UPDATED")) {
                setSession(session2);
            }
            if (event === "SIGNED_OUT") {
                setSession(null);
            }
        });
        return ()=>{
            subscription.unsubscribe();
        };
    }, []);
    const value = (0, import_react.useMemo)(()=>{
        if (isLoading) {
            return {
                isLoading: true,
                session: null,
                error: null,
                supabaseClient
            };
        }
        if (error) {
            return {
                isLoading: false,
                session: null,
                error,
                supabaseClient
            };
        }
        return {
            isLoading: false,
            session,
            error: null,
            supabaseClient
        };
    }, [
        isLoading,
        session,
        error
    ]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionContext.Provider, {
        value,
        children
    });
};
var useSessionContext = ()=>{
    const context = (0, import_react.useContext)(SessionContext);
    if (context === void 0) {
        throw new Error("useSessionContext must be used within a SessionContextProvider.");
    }
    return context;
};
function useSupabaseClient() {
    const context = (0, import_react.useContext)(SessionContext);
    if (context === void 0) {
        throw new Error("useSupabaseClient must be used within a SessionContextProvider.");
    }
    return context.supabaseClient;
}
var useSession = ()=>{
    const context = (0, import_react.useContext)(SessionContext);
    if (context === void 0) {
        throw new Error("useSession must be used within a SessionContextProvider.");
    }
    return context.session;
};
var useUser = ()=>{
    var _a, _b;
    const context = (0, import_react.useContext)(SessionContext);
    if (context === void 0) {
        throw new Error("useUser must be used within a SessionContextProvider.");
    }
    return (_b = (_a = context.session) == null ? void 0 : _a.user) != null ? _b : null;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    SessionContextProvider,
    useSession,
    useSessionContext,
    useSupabaseClient,
    useUser
}); //# sourceMappingURL=index.js.map
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/react-resizable-panels/dist/react-resizable-panels.browser.development.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DATA_ATTRIBUTES",
    ()=>DATA_ATTRIBUTES,
    "Panel",
    ()=>Panel,
    "PanelGroup",
    ()=>PanelGroup,
    "PanelResizeHandle",
    ()=>PanelResizeHandle,
    "assert",
    ()=>assert,
    "customizeGlobalCursorStyles",
    ()=>customizeGlobalCursorStyles,
    "disableGlobalCursorStyles",
    ()=>disableGlobalCursorStyles,
    "enableGlobalCursorStyles",
    ()=>enableGlobalCursorStyles,
    "getIntersectingRectangle",
    ()=>getIntersectingRectangle,
    "getPanelElement",
    ()=>getPanelElement,
    "getPanelElementsForGroup",
    ()=>getPanelElementsForGroup,
    "getPanelGroupElement",
    ()=>getPanelGroupElement,
    "getResizeHandleElement",
    ()=>getResizeHandleElement,
    "getResizeHandleElementIndex",
    ()=>getResizeHandleElementIndex,
    "getResizeHandleElementsForGroup",
    ()=>getResizeHandleElementsForGroup,
    "getResizeHandlePanelIds",
    ()=>getResizeHandlePanelIds,
    "intersects",
    ()=>intersects,
    "setNonce",
    ()=>setNonce,
    "usePanelGroupContext",
    ()=>usePanelGroupContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/react/index.js [client] (ecmascript)");
;
;
// The "contextmenu" event is not supported as a PointerEvent in all browsers yet, so MouseEvent still need to be handled
const PanelGroupContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createContext"])(null);
PanelGroupContext.displayName = "PanelGroupContext";
const DATA_ATTRIBUTES = {
    group: "data-panel-group",
    groupDirection: "data-panel-group-direction",
    groupId: "data-panel-group-id",
    panel: "data-panel",
    panelCollapsible: "data-panel-collapsible",
    panelId: "data-panel-id",
    panelSize: "data-panel-size",
    resizeHandle: "data-resize-handle",
    resizeHandleActive: "data-resize-handle-active",
    resizeHandleEnabled: "data-panel-resize-handle-enabled",
    resizeHandleId: "data-panel-resize-handle-id",
    resizeHandleState: "data-resize-handle-state"
};
const PRECISION = 10;
const useIsomorphicLayoutEffect = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useLayoutEffect"];
const useId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useId".toString()];
const wrappedUseId = typeof useId === "function" ? useId : ()=>null;
let counter = 0;
function useUniqueId() {
    let idFromParams = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
    const idFromUseId = wrappedUseId();
    const idRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(idFromParams || idFromUseId || null);
    if (idRef.current === null) {
        idRef.current = "" + counter++;
    }
    return idFromParams !== null && idFromParams !== void 0 ? idFromParams : idRef.current;
}
function PanelWithForwardedRef(param) {
    let { children, className: classNameFromProps = "", collapsedSize, collapsible, defaultSize, forwardedRef, id: idFromProps, maxSize, minSize, onCollapse, onExpand, onResize, order, style: styleFromProps, tagName: Type = "div", ...rest } = param;
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useContext"])(PanelGroupContext);
    if (context === null) {
        throw Error("Panel components must be rendered within a PanelGroup container");
    }
    const { collapsePanel, expandPanel, getPanelSize, getPanelStyle, groupId, isPanelCollapsed, reevaluatePanelConstraints, registerPanel, resizePanel, unregisterPanel } = context;
    const panelId = useUniqueId(idFromProps);
    const panelDataRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])({
        callbacks: {
            onCollapse,
            onExpand,
            onResize
        },
        constraints: {
            collapsedSize,
            collapsible,
            defaultSize,
            maxSize,
            minSize
        },
        id: panelId,
        idIsFromProps: idFromProps !== undefined,
        order
    });
    const devWarningsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])({
        didLogMissingDefaultSizeWarning: false
    });
    // Normally we wouldn't log a warning during render,
    // but effects don't run on the server, so we can't do it there
    {
        if (!devWarningsRef.current.didLogMissingDefaultSizeWarning) ;
    }
    useIsomorphicLayoutEffect({
        "PanelWithForwardedRef.useIsomorphicLayoutEffect": ()=>{
            const { callbacks, constraints } = panelDataRef.current;
            const prevConstraints = {
                ...constraints
            };
            panelDataRef.current.id = panelId;
            panelDataRef.current.idIsFromProps = idFromProps !== undefined;
            panelDataRef.current.order = order;
            callbacks.onCollapse = onCollapse;
            callbacks.onExpand = onExpand;
            callbacks.onResize = onResize;
            constraints.collapsedSize = collapsedSize;
            constraints.collapsible = collapsible;
            constraints.defaultSize = defaultSize;
            constraints.maxSize = maxSize;
            constraints.minSize = minSize;
            // If constraints have changed, we should revisit panel sizes.
            // This is uncommon but may happen if people are trying to implement pixel based constraints.
            if (prevConstraints.collapsedSize !== constraints.collapsedSize || prevConstraints.collapsible !== constraints.collapsible || prevConstraints.maxSize !== constraints.maxSize || prevConstraints.minSize !== constraints.minSize) {
                reevaluatePanelConstraints(panelDataRef.current, prevConstraints);
            }
        }
    }["PanelWithForwardedRef.useIsomorphicLayoutEffect"]);
    useIsomorphicLayoutEffect({
        "PanelWithForwardedRef.useIsomorphicLayoutEffect": ()=>{
            const panelData = panelDataRef.current;
            registerPanel(panelData);
            return ({
                "PanelWithForwardedRef.useIsomorphicLayoutEffect": ()=>{
                    unregisterPanel(panelData);
                }
            })["PanelWithForwardedRef.useIsomorphicLayoutEffect"];
        }
    }["PanelWithForwardedRef.useIsomorphicLayoutEffect"], [
        order,
        panelId,
        registerPanel,
        unregisterPanel
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(forwardedRef, {
        "PanelWithForwardedRef.useImperativeHandle": ()=>({
                collapse: ({
                    "PanelWithForwardedRef.useImperativeHandle": ()=>{
                        collapsePanel(panelDataRef.current);
                    }
                })["PanelWithForwardedRef.useImperativeHandle"],
                expand: ({
                    "PanelWithForwardedRef.useImperativeHandle": (minSize)=>{
                        expandPanel(panelDataRef.current, minSize);
                    }
                })["PanelWithForwardedRef.useImperativeHandle"],
                getId () {
                    return panelId;
                },
                getSize () {
                    return getPanelSize(panelDataRef.current);
                },
                isCollapsed () {
                    return isPanelCollapsed(panelDataRef.current);
                },
                isExpanded () {
                    return !isPanelCollapsed(panelDataRef.current);
                },
                resize: ({
                    "PanelWithForwardedRef.useImperativeHandle": (size)=>{
                        resizePanel(panelDataRef.current, size);
                    }
                })["PanelWithForwardedRef.useImperativeHandle"]
            })
    }["PanelWithForwardedRef.useImperativeHandle"], [
        collapsePanel,
        expandPanel,
        getPanelSize,
        isPanelCollapsed,
        panelId,
        resizePanel
    ]);
    const style = getPanelStyle(panelDataRef.current, defaultSize);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createElement"])(Type, {
        ...rest,
        children,
        className: classNameFromProps,
        id: panelId,
        style: {
            ...style,
            ...styleFromProps
        },
        // CSS selectors
        [DATA_ATTRIBUTES.groupId]: groupId,
        [DATA_ATTRIBUTES.panel]: "",
        [DATA_ATTRIBUTES.panelCollapsible]: collapsible || undefined,
        [DATA_ATTRIBUTES.panelId]: panelId,
        [DATA_ATTRIBUTES.panelSize]: parseFloat("" + style.flexGrow).toFixed(1)
    });
}
const Panel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["forwardRef"])((props, ref)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createElement"])(PanelWithForwardedRef, {
        ...props,
        forwardedRef: ref
    }));
PanelWithForwardedRef.displayName = "Panel";
Panel.displayName = "forwardRef(Panel)";
let nonce;
function getNonce() {
    return nonce;
}
function setNonce(value) {
    nonce = value;
}
let currentCursorStyle = null;
let enabled = true;
let getCustomCursorStyleFunction = null;
let prevRuleIndex = -1;
let styleElement = null;
function customizeGlobalCursorStyles(callback) {
    getCustomCursorStyleFunction = callback;
}
function disableGlobalCursorStyles() {
    enabled = false;
}
function enableGlobalCursorStyles() {
    enabled = true;
}
function getCursorStyle(state, constraintFlags, isPointerDown) {
    const horizontalMin = (constraintFlags & EXCEEDED_HORIZONTAL_MIN) !== 0;
    const horizontalMax = (constraintFlags & EXCEEDED_HORIZONTAL_MAX) !== 0;
    const verticalMin = (constraintFlags & EXCEEDED_VERTICAL_MIN) !== 0;
    const verticalMax = (constraintFlags & EXCEEDED_VERTICAL_MAX) !== 0;
    if (getCustomCursorStyleFunction) {
        return getCustomCursorStyleFunction({
            exceedsHorizontalMaximum: horizontalMax,
            exceedsHorizontalMinimum: horizontalMin,
            exceedsVerticalMaximum: verticalMax,
            exceedsVerticalMinimum: verticalMin,
            intersectsHorizontalDragHandle: state === "horizontal" || state === "intersection",
            intersectsVerticalDragHandle: state === "vertical" || state === "intersection",
            isPointerDown
        });
    }
    if (constraintFlags) {
        if (horizontalMin) {
            if (verticalMin) {
                return "se-resize";
            } else if (verticalMax) {
                return "ne-resize";
            } else {
                return "e-resize";
            }
        } else if (horizontalMax) {
            if (verticalMin) {
                return "sw-resize";
            } else if (verticalMax) {
                return "nw-resize";
            } else {
                return "w-resize";
            }
        } else if (verticalMin) {
            return "s-resize";
        } else if (verticalMax) {
            return "n-resize";
        }
    }
    switch(state){
        case "horizontal":
            return "ew-resize";
        case "intersection":
            return "move";
        case "vertical":
            return "ns-resize";
    }
}
function resetGlobalCursorStyle() {
    if (styleElement !== null) {
        document.head.removeChild(styleElement);
        currentCursorStyle = null;
        styleElement = null;
        prevRuleIndex = -1;
    }
}
function setGlobalCursorStyle(state, constraintFlags, isPointerDown) {
    var _styleElement$sheet$i, _styleElement$sheet2;
    if (!enabled) {
        return;
    }
    const style = getCursorStyle(state, constraintFlags, isPointerDown);
    if (currentCursorStyle === style) {
        return;
    }
    currentCursorStyle = style;
    if (styleElement === null) {
        styleElement = document.createElement("style");
        const nonce = getNonce();
        if (nonce) {
            styleElement.setAttribute("nonce", nonce);
        }
        document.head.appendChild(styleElement);
    }
    if (prevRuleIndex >= 0) {
        var _styleElement$sheet;
        (_styleElement$sheet = styleElement.sheet) === null || _styleElement$sheet === void 0 ? void 0 : _styleElement$sheet.removeRule(prevRuleIndex);
    }
    prevRuleIndex = (_styleElement$sheet$i = (_styleElement$sheet2 = styleElement.sheet) === null || _styleElement$sheet2 === void 0 ? void 0 : _styleElement$sheet2.insertRule("*{cursor: ".concat(style, " !important;}"))) !== null && _styleElement$sheet$i !== void 0 ? _styleElement$sheet$i : -1;
}
function isKeyDown(event) {
    return event.type === "keydown";
}
function isPointerEvent(event) {
    return event.type.startsWith("pointer");
}
function isMouseEvent(event) {
    return event.type.startsWith("mouse");
}
function getResizeEventCoordinates(event) {
    if (isPointerEvent(event)) {
        if (event.isPrimary) {
            return {
                x: event.clientX,
                y: event.clientY
            };
        }
    } else if (isMouseEvent(event)) {
        return {
            x: event.clientX,
            y: event.clientY
        };
    }
    return {
        x: Infinity,
        y: Infinity
    };
}
function getInputType() {
    if (typeof matchMedia === "function") {
        return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
    }
}
function intersects(rectOne, rectTwo, strict) {
    if (strict) {
        return rectOne.x < rectTwo.x + rectTwo.width && rectOne.x + rectOne.width > rectTwo.x && rectOne.y < rectTwo.y + rectTwo.height && rectOne.y + rectOne.height > rectTwo.y;
    } else {
        return rectOne.x <= rectTwo.x + rectTwo.width && rectOne.x + rectOne.width >= rectTwo.x && rectOne.y <= rectTwo.y + rectTwo.height && rectOne.y + rectOne.height >= rectTwo.y;
    }
}
// Forked from NPM stacking-order@2.0.0
/**
 * Determine which of two nodes appears in front of the other —
 * if `a` is in front, returns 1, otherwise returns -1
 * @param {HTMLElement | SVGElement} a
 * @param {HTMLElement | SVGElement} b
 */ function compare(a, b) {
    if (a === b) throw new Error("Cannot compare node with itself");
    const ancestors = {
        a: get_ancestors(a),
        b: get_ancestors(b)
    };
    let common_ancestor;
    // remove shared ancestors
    while(ancestors.a.at(-1) === ancestors.b.at(-1)){
        a = ancestors.a.pop();
        b = ancestors.b.pop();
        common_ancestor = a;
    }
    assert(common_ancestor, "Stacking order can only be calculated for elements with a common ancestor");
    const z_indexes = {
        a: get_z_index(find_stacking_context(ancestors.a)),
        b: get_z_index(find_stacking_context(ancestors.b))
    };
    if (z_indexes.a === z_indexes.b) {
        const children = common_ancestor.childNodes;
        const furthest_ancestors = {
            a: ancestors.a.at(-1),
            b: ancestors.b.at(-1)
        };
        let i = children.length;
        while(i--){
            const child = children[i];
            if (child === furthest_ancestors.a) return 1;
            if (child === furthest_ancestors.b) return -1;
        }
    }
    return Math.sign(z_indexes.a - z_indexes.b);
}
const props = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;
/** @param {HTMLElement | SVGElement} node */ function is_flex_item(node) {
    var _get_parent;
    // @ts-ignore
    const display = getComputedStyle((_get_parent = get_parent(node)) !== null && _get_parent !== void 0 ? _get_parent : node).display;
    return display === "flex" || display === "inline-flex";
}
/** @param {HTMLElement | SVGElement} node */ function creates_stacking_context(node) {
    const style = getComputedStyle(node);
    // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
    if (style.position === "fixed") return true;
    // Forked to fix upstream bug https://github.com/Rich-Harris/stacking-order/issues/3
    // if (
    //   (style.zIndex !== "auto" && style.position !== "static") ||
    //   is_flex_item(node)
    // )
    if (style.zIndex !== "auto" && (style.position !== "static" || is_flex_item(node))) return true;
    if (+style.opacity < 1) return true;
    if ("transform" in style && style.transform !== "none") return true;
    if ("webkitTransform" in style && style.webkitTransform !== "none") return true;
    if ("mixBlendMode" in style && style.mixBlendMode !== "normal") return true;
    if ("filter" in style && style.filter !== "none") return true;
    if ("webkitFilter" in style && style.webkitFilter !== "none") return true;
    if ("isolation" in style && style.isolation === "isolate") return true;
    if (props.test(style.willChange)) return true;
    // @ts-expect-error
    if (style.webkitOverflowScrolling === "touch") return true;
    return false;
}
/** @param {(HTMLElement| SVGElement)[]} nodes */ function find_stacking_context(nodes) {
    let i = nodes.length;
    while(i--){
        const node = nodes[i];
        assert(node, "Missing node");
        if (creates_stacking_context(node)) return node;
    }
    return null;
}
/** @param {HTMLElement | SVGElement} node */ function get_z_index(node) {
    return node && Number(getComputedStyle(node).zIndex) || 0;
}
/** @param {HTMLElement} node */ function get_ancestors(node) {
    const ancestors = [];
    while(node){
        ancestors.push(node);
        // @ts-ignore
        node = get_parent(node);
    }
    return ancestors; // [ node, ... <body>, <html>, document ]
}
/** @param {HTMLElement} node */ function get_parent(node) {
    const { parentNode } = node;
    if (parentNode && parentNode instanceof ShadowRoot) {
        return parentNode.host;
    }
    return parentNode;
}
const EXCEEDED_HORIZONTAL_MIN = 0b0001;
const EXCEEDED_HORIZONTAL_MAX = 0b0010;
const EXCEEDED_VERTICAL_MIN = 0b0100;
const EXCEEDED_VERTICAL_MAX = 0b1000;
const isCoarsePointer = getInputType() === "coarse";
let intersectingHandles = [];
let isPointerDown = false;
let ownerDocumentCounts = new Map();
let panelConstraintFlags = new Map();
const registeredResizeHandlers = new Set();
function registerResizeHandle(resizeHandleId, element, direction, hitAreaMargins, setResizeHandlerState) {
    var _ownerDocumentCounts$;
    const { ownerDocument } = element;
    const data = {
        direction,
        element,
        hitAreaMargins,
        setResizeHandlerState
    };
    const count = (_ownerDocumentCounts$ = ownerDocumentCounts.get(ownerDocument)) !== null && _ownerDocumentCounts$ !== void 0 ? _ownerDocumentCounts$ : 0;
    ownerDocumentCounts.set(ownerDocument, count + 1);
    registeredResizeHandlers.add(data);
    updateListeners();
    return function unregisterResizeHandle() {
        var _ownerDocumentCounts$2;
        panelConstraintFlags.delete(resizeHandleId);
        registeredResizeHandlers.delete(data);
        const count = (_ownerDocumentCounts$2 = ownerDocumentCounts.get(ownerDocument)) !== null && _ownerDocumentCounts$2 !== void 0 ? _ownerDocumentCounts$2 : 1;
        ownerDocumentCounts.set(ownerDocument, count - 1);
        updateListeners();
        if (count === 1) {
            ownerDocumentCounts.delete(ownerDocument);
        }
        // If the resize handle that is currently unmounting is intersecting with the pointer,
        // update the global pointer to account for the change
        if (intersectingHandles.includes(data)) {
            const index = intersectingHandles.indexOf(data);
            if (index >= 0) {
                intersectingHandles.splice(index, 1);
            }
            updateCursor();
            // Also instruct the handle to stop dragging; this prevents the parent group from being left in an inconsistent state
            // See github.com/bvaughn/react-resizable-panels/issues/402
            setResizeHandlerState("up", true, null);
        }
    };
}
function handlePointerDown(event) {
    const { target } = event;
    const { x, y } = getResizeEventCoordinates(event);
    isPointerDown = true;
    recalculateIntersectingHandles({
        target,
        x,
        y
    });
    updateListeners();
    if (intersectingHandles.length > 0) {
        updateResizeHandlerStates("down", event);
        // Update cursor based on return value(s) from active handles
        updateCursor();
        event.preventDefault();
        if (!isWithinResizeHandle(target)) {
            event.stopImmediatePropagation();
        }
    }
}
function handlePointerMove(event) {
    const { x, y } = getResizeEventCoordinates(event);
    // Edge case (see #340)
    // Detect when the pointer has been released outside an iframe on a different domain
    if (isPointerDown && // Skip this check for "pointerleave" events, else Firefox triggers a false positive (see #514)
    event.type !== "pointerleave" && event.buttons === 0) {
        isPointerDown = false;
        updateResizeHandlerStates("up", event);
    }
    if (!isPointerDown) {
        const { target } = event;
        // Recalculate intersecting handles whenever the pointer moves, except if it has already been pressed
        // at that point, the handles may not move with the pointer (depending on constraints)
        // but the same set of active handles should be locked until the pointer is released
        recalculateIntersectingHandles({
            target,
            x,
            y
        });
    }
    updateResizeHandlerStates("move", event);
    // Update cursor based on return value(s) from active handles
    updateCursor();
    if (intersectingHandles.length > 0) {
        event.preventDefault();
    }
}
function handlePointerUp(event) {
    const { target } = event;
    const { x, y } = getResizeEventCoordinates(event);
    panelConstraintFlags.clear();
    isPointerDown = false;
    if (intersectingHandles.length > 0) {
        event.preventDefault();
        if (!isWithinResizeHandle(target)) {
            event.stopImmediatePropagation();
        }
    }
    updateResizeHandlerStates("up", event);
    recalculateIntersectingHandles({
        target,
        x,
        y
    });
    updateCursor();
    updateListeners();
}
function isWithinResizeHandle(element) {
    let currentElement = element;
    while(currentElement){
        if (currentElement.hasAttribute(DATA_ATTRIBUTES.resizeHandle)) {
            return true;
        }
        currentElement = currentElement.parentElement;
    }
    return false;
}
function recalculateIntersectingHandles(param) {
    let { target, x, y } = param;
    intersectingHandles.splice(0);
    let targetElement = null;
    if (target instanceof HTMLElement || target instanceof SVGElement) {
        targetElement = target;
    }
    registeredResizeHandlers.forEach((data)=>{
        const { element: dragHandleElement, hitAreaMargins } = data;
        const dragHandleRect = dragHandleElement.getBoundingClientRect();
        const { bottom, left, right, top } = dragHandleRect;
        const margin = isCoarsePointer ? hitAreaMargins.coarse : hitAreaMargins.fine;
        const eventIntersects = x >= left - margin && x <= right + margin && y >= top - margin && y <= bottom + margin;
        if (eventIntersects) {
            // TRICKY
            // We listen for pointers events at the root in order to support hit area margins
            // (determining when the pointer is close enough to an element to be considered a "hit")
            // Clicking on an element "above" a handle (e.g. a modal) should prevent a hit though
            // so at this point we need to compare stacking order of a potentially intersecting drag handle,
            // and the element that was actually clicked/touched
            if (targetElement !== null && document.contains(targetElement) && dragHandleElement !== targetElement && !dragHandleElement.contains(targetElement) && !targetElement.contains(dragHandleElement) && // Calculating stacking order has a cost, so we should avoid it if possible
            // That is why we only check potentially intersecting handles,
            // and why we skip if the event target is within the handle's DOM
            compare(targetElement, dragHandleElement) > 0) {
                // If the target is above the drag handle, then we also need to confirm they overlap
                // If they are beside each other (e.g. a panel and its drag handle) then the handle is still interactive
                //
                // It's not enough to compare only the target
                // The target might be a small element inside of a larger container
                // (For example, a SPAN or a DIV inside of a larger modal dialog)
                let currentElement = targetElement;
                let didIntersect = false;
                while(currentElement){
                    if (currentElement.contains(dragHandleElement)) {
                        break;
                    } else if (intersects(currentElement.getBoundingClientRect(), dragHandleRect, true)) {
                        didIntersect = true;
                        break;
                    }
                    currentElement = currentElement.parentElement;
                }
                if (didIntersect) {
                    return;
                }
            }
            intersectingHandles.push(data);
        }
    });
}
function reportConstraintsViolation(resizeHandleId, flag) {
    panelConstraintFlags.set(resizeHandleId, flag);
}
function updateCursor() {
    let intersectsHorizontal = false;
    let intersectsVertical = false;
    intersectingHandles.forEach((data)=>{
        const { direction } = data;
        if (direction === "horizontal") {
            intersectsHorizontal = true;
        } else {
            intersectsVertical = true;
        }
    });
    let constraintFlags = 0;
    panelConstraintFlags.forEach((flag)=>{
        constraintFlags |= flag;
    });
    if (intersectsHorizontal && intersectsVertical) {
        setGlobalCursorStyle("intersection", constraintFlags, isPointerDown);
    } else if (intersectsHorizontal) {
        setGlobalCursorStyle("horizontal", constraintFlags, isPointerDown);
    } else if (intersectsVertical) {
        setGlobalCursorStyle("vertical", constraintFlags, isPointerDown);
    } else {
        resetGlobalCursorStyle();
    }
}
let listenersAbortController;
function updateListeners() {
    var _listenersAbortContro;
    (_listenersAbortContro = listenersAbortController) === null || _listenersAbortContro === void 0 ? void 0 : _listenersAbortContro.abort();
    listenersAbortController = new AbortController();
    const options = {
        capture: true,
        signal: listenersAbortController.signal
    };
    if (!registeredResizeHandlers.size) {
        return;
    }
    if (isPointerDown) {
        if (intersectingHandles.length > 0) {
            ownerDocumentCounts.forEach((count, ownerDocument)=>{
                const { body } = ownerDocument;
                if (count > 0) {
                    body.addEventListener("contextmenu", handlePointerUp, options);
                    body.addEventListener("pointerleave", handlePointerMove, options);
                    body.addEventListener("pointermove", handlePointerMove, options);
                }
            });
        }
        ownerDocumentCounts.forEach((_, ownerDocument)=>{
            const { body } = ownerDocument;
            body.addEventListener("pointerup", handlePointerUp, options);
            body.addEventListener("pointercancel", handlePointerUp, options);
        });
    } else {
        ownerDocumentCounts.forEach((count, ownerDocument)=>{
            const { body } = ownerDocument;
            if (count > 0) {
                body.addEventListener("pointerdown", handlePointerDown, options);
                body.addEventListener("pointermove", handlePointerMove, options);
            }
        });
    }
}
function updateResizeHandlerStates(action, event) {
    registeredResizeHandlers.forEach((data)=>{
        const { setResizeHandlerState } = data;
        const isActive = intersectingHandles.includes(data);
        setResizeHandlerState(action, isActive, event);
    });
}
function useForceUpdate() {
    const [_, setCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useForceUpdate.useCallback": ()=>setCount({
                "useForceUpdate.useCallback": (prevCount)=>prevCount + 1
            }["useForceUpdate.useCallback"])
    }["useForceUpdate.useCallback"], []);
}
function assert(expectedCondition, message) {
    if (!expectedCondition) {
        console.error(message);
        throw Error(message);
    }
}
function fuzzyCompareNumbers(actual, expected) {
    let fractionDigits = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : PRECISION;
    if (actual.toFixed(fractionDigits) === expected.toFixed(fractionDigits)) {
        return 0;
    } else {
        return actual > expected ? 1 : -1;
    }
}
function fuzzyNumbersEqual$1(actual, expected) {
    let fractionDigits = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : PRECISION;
    return fuzzyCompareNumbers(actual, expected, fractionDigits) === 0;
}
function fuzzyNumbersEqual(actual, expected, fractionDigits) {
    return fuzzyCompareNumbers(actual, expected, fractionDigits) === 0;
}
function fuzzyLayoutsEqual(actual, expected, fractionDigits) {
    if (actual.length !== expected.length) {
        return false;
    }
    for(let index = 0; index < actual.length; index++){
        const actualSize = actual[index];
        const expectedSize = expected[index];
        if (!fuzzyNumbersEqual(actualSize, expectedSize, fractionDigits)) {
            return false;
        }
    }
    return true;
}
// Panel size must be in percentages; pixel values should be pre-converted
function resizePanel(param) {
    let { panelConstraints: panelConstraintsArray, panelIndex, size } = param;
    const panelConstraints = panelConstraintsArray[panelIndex];
    assert(panelConstraints != null, "Panel constraints not found for index ".concat(panelIndex));
    let { collapsedSize = 0, collapsible, maxSize = 100, minSize = 0 } = panelConstraints;
    if (fuzzyCompareNumbers(size, minSize) < 0) {
        if (collapsible) {
            // Collapsible panels should snap closed or open only once they cross the halfway point between collapsed and min size.
            const halfwayPoint = (collapsedSize + minSize) / 2;
            if (fuzzyCompareNumbers(size, halfwayPoint) < 0) {
                size = collapsedSize;
            } else {
                size = minSize;
            }
        } else {
            size = minSize;
        }
    }
    size = Math.min(maxSize, size);
    size = parseFloat(size.toFixed(PRECISION));
    return size;
}
// All units must be in percentages; pixel values should be pre-converted
function adjustLayoutByDelta(param) {
    let { delta, initialLayout, panelConstraints: panelConstraintsArray, pivotIndices, prevLayout, trigger } = param;
    if (fuzzyNumbersEqual(delta, 0)) {
        return initialLayout;
    }
    const nextLayout = [
        ...initialLayout
    ];
    const [firstPivotIndex, secondPivotIndex] = pivotIndices;
    assert(firstPivotIndex != null, "Invalid first pivot index");
    assert(secondPivotIndex != null, "Invalid second pivot index");
    let deltaApplied = 0;
    // const DEBUG = [];
    // DEBUG.push(`adjustLayoutByDelta()`);
    // DEBUG.push(`  initialLayout: ${initialLayout.join(", ")}`);
    // DEBUG.push(`  prevLayout: ${prevLayout.join(", ")}`);
    // DEBUG.push(`  delta: ${delta}`);
    // DEBUG.push(`  pivotIndices: ${pivotIndices.join(", ")}`);
    // DEBUG.push(`  trigger: ${trigger}`);
    // DEBUG.push("");
    // A resizing panel affects the panels before or after it.
    //
    // A negative delta means the panel(s) immediately after the resize handle should grow/expand by decreasing its offset.
    // Other panels may also need to shrink/contract (and shift) to make room, depending on the min weights.
    //
    // A positive delta means the panel(s) immediately before the resize handle should "expand".
    // This is accomplished by shrinking/contracting (and shifting) one or more of the panels after the resize handle.
    {
        // If this is a resize triggered by a keyboard event, our logic for expanding/collapsing is different.
        // We no longer check the halfway threshold because this may prevent the panel from expanding at all.
        if (trigger === "keyboard") {
            {
                // Check if we should expand a collapsed panel
                const index = delta < 0 ? secondPivotIndex : firstPivotIndex;
                const panelConstraints = panelConstraintsArray[index];
                assert(panelConstraints, "Panel constraints not found for index ".concat(index));
                const { collapsedSize = 0, collapsible, minSize = 0 } = panelConstraints;
                // DEBUG.push(`edge case check 1: ${index}`);
                // DEBUG.push(`  -> collapsible? ${collapsible}`);
                if (collapsible) {
                    const prevSize = initialLayout[index];
                    assert(prevSize != null, "Previous layout not found for panel index ".concat(index));
                    if (fuzzyNumbersEqual(prevSize, collapsedSize)) {
                        const localDelta = minSize - prevSize;
                        // DEBUG.push(`  -> expand delta: ${localDelta}`);
                        if (fuzzyCompareNumbers(localDelta, Math.abs(delta)) > 0) {
                            delta = delta < 0 ? 0 - localDelta : localDelta;
                        // DEBUG.push(`  -> delta: ${delta}`);
                        }
                    }
                }
            }
            {
                // Check if we should collapse a panel at its minimum size
                const index = delta < 0 ? firstPivotIndex : secondPivotIndex;
                const panelConstraints = panelConstraintsArray[index];
                assert(panelConstraints, "No panel constraints found for index ".concat(index));
                const { collapsedSize = 0, collapsible, minSize = 0 } = panelConstraints;
                // DEBUG.push(`edge case check 2: ${index}`);
                // DEBUG.push(`  -> collapsible? ${collapsible}`);
                if (collapsible) {
                    const prevSize = initialLayout[index];
                    assert(prevSize != null, "Previous layout not found for panel index ".concat(index));
                    if (fuzzyNumbersEqual(prevSize, minSize)) {
                        const localDelta = prevSize - collapsedSize;
                        // DEBUG.push(`  -> expand delta: ${localDelta}`);
                        if (fuzzyCompareNumbers(localDelta, Math.abs(delta)) > 0) {
                            delta = delta < 0 ? 0 - localDelta : localDelta;
                        // DEBUG.push(`  -> delta: ${delta}`);
                        }
                    }
                }
            }
        }
    // DEBUG.push("");
    }
    {
        // Pre-calculate max available delta in the opposite direction of our pivot.
        // This will be the maximum amount we're allowed to expand/contract the panels in the primary direction.
        // If this amount is less than the requested delta, adjust the requested delta.
        // If this amount is greater than the requested delta, that's useful information too–
        // as an expanding panel might change from collapsed to min size.
        const increment = delta < 0 ? 1 : -1;
        let index = delta < 0 ? secondPivotIndex : firstPivotIndex;
        let maxAvailableDelta = 0;
        // DEBUG.push("pre calc...");
        while(true){
            const prevSize = initialLayout[index];
            assert(prevSize != null, "Previous layout not found for panel index ".concat(index));
            const maxSafeSize = resizePanel({
                panelConstraints: panelConstraintsArray,
                panelIndex: index,
                size: 100
            });
            const delta = maxSafeSize - prevSize;
            // DEBUG.push(`  ${index}: ${prevSize} -> ${maxSafeSize}`);
            maxAvailableDelta += delta;
            index += increment;
            if (index < 0 || index >= panelConstraintsArray.length) {
                break;
            }
        }
        // DEBUG.push(`  -> max available delta: ${maxAvailableDelta}`);
        const minAbsDelta = Math.min(Math.abs(delta), Math.abs(maxAvailableDelta));
        delta = delta < 0 ? 0 - minAbsDelta : minAbsDelta;
    // DEBUG.push(`  -> adjusted delta: ${delta}`);
    // DEBUG.push("");
    }
    {
        // Delta added to a panel needs to be subtracted from other panels (within the constraints that those panels allow).
        const pivotIndex = delta < 0 ? firstPivotIndex : secondPivotIndex;
        let index = pivotIndex;
        while(index >= 0 && index < panelConstraintsArray.length){
            const deltaRemaining = Math.abs(delta) - Math.abs(deltaApplied);
            const prevSize = initialLayout[index];
            assert(prevSize != null, "Previous layout not found for panel index ".concat(index));
            const unsafeSize = prevSize - deltaRemaining;
            const safeSize = resizePanel({
                panelConstraints: panelConstraintsArray,
                panelIndex: index,
                size: unsafeSize
            });
            if (!fuzzyNumbersEqual(prevSize, safeSize)) {
                deltaApplied += prevSize - safeSize;
                nextLayout[index] = safeSize;
                if (deltaApplied.toFixed(3).localeCompare(Math.abs(delta).toFixed(3), undefined, {
                    numeric: true
                }) >= 0) {
                    break;
                }
            }
            if (delta < 0) {
                index--;
            } else {
                index++;
            }
        }
    }
    // DEBUG.push(`after 1: ${nextLayout.join(", ")}`);
    // DEBUG.push(`  deltaApplied: ${deltaApplied}`);
    // DEBUG.push("");
    // If we were unable to resize any of the panels panels, return the previous state.
    // This will essentially bailout and ignore e.g. drags past a panel's boundaries
    if (fuzzyLayoutsEqual(prevLayout, nextLayout)) {
        // DEBUG.push(`bailout to previous layout: ${prevLayout.join(", ")}`);
        // console.log(DEBUG.join("\n"));
        return prevLayout;
    }
    {
        // Now distribute the applied delta to the panels in the other direction
        const pivotIndex = delta < 0 ? secondPivotIndex : firstPivotIndex;
        const prevSize = initialLayout[pivotIndex];
        assert(prevSize != null, "Previous layout not found for panel index ".concat(pivotIndex));
        const unsafeSize = prevSize + deltaApplied;
        const safeSize = resizePanel({
            panelConstraints: panelConstraintsArray,
            panelIndex: pivotIndex,
            size: unsafeSize
        });
        // Adjust the pivot panel before, but only by the amount that surrounding panels were able to shrink/contract.
        nextLayout[pivotIndex] = safeSize;
        // Edge case where expanding or contracting one panel caused another one to change collapsed state
        if (!fuzzyNumbersEqual(safeSize, unsafeSize)) {
            let deltaRemaining = unsafeSize - safeSize;
            const pivotIndex = delta < 0 ? secondPivotIndex : firstPivotIndex;
            let index = pivotIndex;
            while(index >= 0 && index < panelConstraintsArray.length){
                const prevSize = nextLayout[index];
                assert(prevSize != null, "Previous layout not found for panel index ".concat(index));
                const unsafeSize = prevSize + deltaRemaining;
                const safeSize = resizePanel({
                    panelConstraints: panelConstraintsArray,
                    panelIndex: index,
                    size: unsafeSize
                });
                if (!fuzzyNumbersEqual(prevSize, safeSize)) {
                    deltaRemaining -= safeSize - prevSize;
                    nextLayout[index] = safeSize;
                }
                if (fuzzyNumbersEqual(deltaRemaining, 0)) {
                    break;
                }
                if (delta > 0) {
                    index--;
                } else {
                    index++;
                }
            }
        }
    }
    // DEBUG.push(`after 2: ${nextLayout.join(", ")}`);
    // DEBUG.push(`  deltaApplied: ${deltaApplied}`);
    // DEBUG.push("");
    const totalSize = nextLayout.reduce((total, size)=>size + total, 0);
    // DEBUG.push(`total size: ${totalSize}`);
    // If our new layout doesn't add up to 100%, that means the requested delta can't be applied
    // In that case, fall back to our most recent valid layout
    if (!fuzzyNumbersEqual(totalSize, 100)) {
        // DEBUG.push(`bailout to previous layout: ${prevLayout.join(", ")}`);
        // console.log(DEBUG.join("\n"));
        return prevLayout;
    }
    // console.log(DEBUG.join("\n"));
    return nextLayout;
}
function calculateAriaValues(param) {
    let { layout, panelsArray, pivotIndices } = param;
    let currentMinSize = 0;
    let currentMaxSize = 100;
    let totalMinSize = 0;
    let totalMaxSize = 0;
    const firstIndex = pivotIndices[0];
    assert(firstIndex != null, "No pivot index found");
    // A panel's effective min/max sizes also need to account for other panel's sizes.
    panelsArray.forEach((panelData, index)=>{
        const { constraints } = panelData;
        const { maxSize = 100, minSize = 0 } = constraints;
        if (index === firstIndex) {
            currentMinSize = minSize;
            currentMaxSize = maxSize;
        } else {
            totalMinSize += minSize;
            totalMaxSize += maxSize;
        }
    });
    const valueMax = Math.min(currentMaxSize, 100 - totalMinSize);
    const valueMin = Math.max(currentMinSize, 100 - totalMaxSize);
    const valueNow = layout[firstIndex];
    return {
        valueMax,
        valueMin,
        valueNow
    };
}
function getResizeHandleElementsForGroup(groupId) {
    let scope = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : document;
    return Array.from(scope.querySelectorAll("[".concat(DATA_ATTRIBUTES.resizeHandleId, '][data-panel-group-id="').concat(groupId, '"]')));
}
function getResizeHandleElementIndex(groupId, id) {
    let scope = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : document;
    const handles = getResizeHandleElementsForGroup(groupId, scope);
    const index = handles.findIndex((handle)=>handle.getAttribute(DATA_ATTRIBUTES.resizeHandleId) === id);
    return index !== null && index !== void 0 ? index : null;
}
function determinePivotIndices(groupId, dragHandleId, panelGroupElement) {
    const index = getResizeHandleElementIndex(groupId, dragHandleId, panelGroupElement);
    return index != null ? [
        index,
        index + 1
    ] : [
        -1,
        -1
    ];
}
function isHTMLElement(target) {
    if (target instanceof HTMLElement) {
        return true;
    }
    // Fallback to duck typing to handle edge case of portals within a popup window
    return typeof target === "object" && target !== null && "tagName" in target && "getAttribute" in target;
}
function getPanelGroupElement(id) {
    let rootElement = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : document;
    // If the root element is the PanelGroup
    if (isHTMLElement(rootElement) && rootElement.dataset.panelGroupId == id) {
        return rootElement;
    }
    // Else query children
    const element = rootElement.querySelector('[data-panel-group][data-panel-group-id="'.concat(id, '"]'));
    if (element) {
        return element;
    }
    return null;
}
function getResizeHandleElement(id) {
    let scope = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : document;
    const element = scope.querySelector("[".concat(DATA_ATTRIBUTES.resizeHandleId, '="').concat(id, '"]'));
    if (element) {
        return element;
    }
    return null;
}
function getResizeHandlePanelIds(groupId, handleId, panelsArray) {
    let scope = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : document;
    var _panelsArray$index$id, _panelsArray$index, _panelsArray$id, _panelsArray;
    const handle = getResizeHandleElement(handleId, scope);
    const handles = getResizeHandleElementsForGroup(groupId, scope);
    const index = handle ? handles.indexOf(handle) : -1;
    const idBefore = (_panelsArray$index$id = (_panelsArray$index = panelsArray[index]) === null || _panelsArray$index === void 0 ? void 0 : _panelsArray$index.id) !== null && _panelsArray$index$id !== void 0 ? _panelsArray$index$id : null;
    const idAfter = (_panelsArray$id = (_panelsArray = panelsArray[index + 1]) === null || _panelsArray === void 0 ? void 0 : _panelsArray.id) !== null && _panelsArray$id !== void 0 ? _panelsArray$id : null;
    return [
        idBefore,
        idAfter
    ];
}
// https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/
function useWindowSplitterPanelGroupBehavior(param) {
    let { committedValuesRef, eagerValuesRef, groupId, layout, panelDataArray, panelGroupElement, setLayout } = param;
    const devWarningsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])({
        didWarnAboutMissingResizeHandle: false
    });
    useIsomorphicLayoutEffect({
        "useWindowSplitterPanelGroupBehavior.useIsomorphicLayoutEffect": ()=>{
            if (!panelGroupElement) {
                return;
            }
            const resizeHandleElements = getResizeHandleElementsForGroup(groupId, panelGroupElement);
            for(let index = 0; index < panelDataArray.length - 1; index++){
                const { valueMax, valueMin, valueNow } = calculateAriaValues({
                    layout,
                    panelsArray: panelDataArray,
                    pivotIndices: [
                        index,
                        index + 1
                    ]
                });
                const resizeHandleElement = resizeHandleElements[index];
                if (resizeHandleElement == null) {
                    {
                        const { didWarnAboutMissingResizeHandle } = devWarningsRef.current;
                        if (!didWarnAboutMissingResizeHandle) {
                            devWarningsRef.current.didWarnAboutMissingResizeHandle = true;
                            console.warn('WARNING: Missing resize handle for PanelGroup "'.concat(groupId, '"'));
                        }
                    }
                } else {
                    const panelData = panelDataArray[index];
                    assert(panelData, 'No panel data found for index "'.concat(index, '"'));
                    resizeHandleElement.setAttribute("aria-controls", panelData.id);
                    resizeHandleElement.setAttribute("aria-valuemax", "" + Math.round(valueMax));
                    resizeHandleElement.setAttribute("aria-valuemin", "" + Math.round(valueMin));
                    resizeHandleElement.setAttribute("aria-valuenow", valueNow != null ? "" + Math.round(valueNow) : "");
                }
            }
            return ({
                "useWindowSplitterPanelGroupBehavior.useIsomorphicLayoutEffect": ()=>{
                    resizeHandleElements.forEach({
                        "useWindowSplitterPanelGroupBehavior.useIsomorphicLayoutEffect": (resizeHandleElement, index)=>{
                            resizeHandleElement.removeAttribute("aria-controls");
                            resizeHandleElement.removeAttribute("aria-valuemax");
                            resizeHandleElement.removeAttribute("aria-valuemin");
                            resizeHandleElement.removeAttribute("aria-valuenow");
                        }
                    }["useWindowSplitterPanelGroupBehavior.useIsomorphicLayoutEffect"]);
                }
            })["useWindowSplitterPanelGroupBehavior.useIsomorphicLayoutEffect"];
        }
    }["useWindowSplitterPanelGroupBehavior.useIsomorphicLayoutEffect"], [
        groupId,
        layout,
        panelDataArray,
        panelGroupElement
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWindowSplitterPanelGroupBehavior.useEffect": ()=>{
            if (!panelGroupElement) {
                return;
            }
            const eagerValues = eagerValuesRef.current;
            assert(eagerValues, "Eager values not found");
            const { panelDataArray } = eagerValues;
            const groupElement = getPanelGroupElement(groupId, panelGroupElement);
            assert(groupElement != null, 'No group found for id "'.concat(groupId, '"'));
            const handles = getResizeHandleElementsForGroup(groupId, panelGroupElement);
            assert(handles, 'No resize handles found for group id "'.concat(groupId, '"'));
            const cleanupFunctions = handles.map({
                "useWindowSplitterPanelGroupBehavior.useEffect.cleanupFunctions": (handle)=>{
                    const handleId = handle.getAttribute(DATA_ATTRIBUTES.resizeHandleId);
                    assert(handleId, "Resize handle element has no handle id attribute");
                    const [idBefore, idAfter] = getResizeHandlePanelIds(groupId, handleId, panelDataArray, panelGroupElement);
                    if (idBefore == null || idAfter == null) {
                        return ({
                            "useWindowSplitterPanelGroupBehavior.useEffect.cleanupFunctions": ()=>{}
                        })["useWindowSplitterPanelGroupBehavior.useEffect.cleanupFunctions"];
                    }
                    const onKeyDown = {
                        "useWindowSplitterPanelGroupBehavior.useEffect.cleanupFunctions.onKeyDown": (event)=>{
                            if (event.defaultPrevented) {
                                return;
                            }
                            switch(event.key){
                                case "Enter":
                                    {
                                        event.preventDefault();
                                        const index = panelDataArray.findIndex({
                                            "useWindowSplitterPanelGroupBehavior.useEffect.cleanupFunctions.onKeyDown.index": (panelData)=>panelData.id === idBefore
                                        }["useWindowSplitterPanelGroupBehavior.useEffect.cleanupFunctions.onKeyDown.index"]);
                                        if (index >= 0) {
                                            const panelData = panelDataArray[index];
                                            assert(panelData, "No panel data found for index ".concat(index));
                                            const size = layout[index];
                                            const { collapsedSize = 0, collapsible, minSize = 0 } = panelData.constraints;
                                            if (size != null && collapsible) {
                                                const nextLayout = adjustLayoutByDelta({
                                                    delta: fuzzyNumbersEqual(size, collapsedSize) ? minSize - collapsedSize : collapsedSize - size,
                                                    initialLayout: layout,
                                                    panelConstraints: panelDataArray.map({
                                                        "useWindowSplitterPanelGroupBehavior.useEffect.cleanupFunctions.onKeyDown.nextLayout": (panelData)=>panelData.constraints
                                                    }["useWindowSplitterPanelGroupBehavior.useEffect.cleanupFunctions.onKeyDown.nextLayout"]),
                                                    pivotIndices: determinePivotIndices(groupId, handleId, panelGroupElement),
                                                    prevLayout: layout,
                                                    trigger: "keyboard"
                                                });
                                                if (layout !== nextLayout) {
                                                    setLayout(nextLayout);
                                                }
                                            }
                                        }
                                        break;
                                    }
                            }
                        }
                    }["useWindowSplitterPanelGroupBehavior.useEffect.cleanupFunctions.onKeyDown"];
                    handle.addEventListener("keydown", onKeyDown);
                    return ({
                        "useWindowSplitterPanelGroupBehavior.useEffect.cleanupFunctions": ()=>{
                            handle.removeEventListener("keydown", onKeyDown);
                        }
                    })["useWindowSplitterPanelGroupBehavior.useEffect.cleanupFunctions"];
                }
            }["useWindowSplitterPanelGroupBehavior.useEffect.cleanupFunctions"]);
            return ({
                "useWindowSplitterPanelGroupBehavior.useEffect": ()=>{
                    cleanupFunctions.forEach({
                        "useWindowSplitterPanelGroupBehavior.useEffect": (cleanupFunction)=>cleanupFunction()
                    }["useWindowSplitterPanelGroupBehavior.useEffect"]);
                }
            })["useWindowSplitterPanelGroupBehavior.useEffect"];
        }
    }["useWindowSplitterPanelGroupBehavior.useEffect"], [
        panelGroupElement,
        committedValuesRef,
        eagerValuesRef,
        groupId,
        layout,
        panelDataArray,
        setLayout
    ]);
}
function areEqual(arrayA, arrayB) {
    if (arrayA.length !== arrayB.length) {
        return false;
    }
    for(let index = 0; index < arrayA.length; index++){
        if (arrayA[index] !== arrayB[index]) {
            return false;
        }
    }
    return true;
}
function getResizeEventCursorPosition(direction, event) {
    const isHorizontal = direction === "horizontal";
    const { x, y } = getResizeEventCoordinates(event);
    return isHorizontal ? x : y;
}
function calculateDragOffsetPercentage(event, dragHandleId, direction, initialDragState, panelGroupElement) {
    const isHorizontal = direction === "horizontal";
    const handleElement = getResizeHandleElement(dragHandleId, panelGroupElement);
    assert(handleElement, 'No resize handle element found for id "'.concat(dragHandleId, '"'));
    const groupId = handleElement.getAttribute(DATA_ATTRIBUTES.groupId);
    assert(groupId, "Resize handle element has no group id attribute");
    let { initialCursorPosition } = initialDragState;
    const cursorPosition = getResizeEventCursorPosition(direction, event);
    const groupElement = getPanelGroupElement(groupId, panelGroupElement);
    assert(groupElement, 'No group element found for id "'.concat(groupId, '"'));
    const groupRect = groupElement.getBoundingClientRect();
    const groupSizeInPixels = isHorizontal ? groupRect.width : groupRect.height;
    const offsetPixels = cursorPosition - initialCursorPosition;
    const offsetPercentage = offsetPixels / groupSizeInPixels * 100;
    return offsetPercentage;
}
// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementX
function calculateDeltaPercentage(event, dragHandleId, direction, initialDragState, keyboardResizeBy, panelGroupElement) {
    if (isKeyDown(event)) {
        const isHorizontal = direction === "horizontal";
        let delta = 0;
        if (event.shiftKey) {
            delta = 100;
        } else if (keyboardResizeBy != null) {
            delta = keyboardResizeBy;
        } else {
            delta = 10;
        }
        let movement = 0;
        switch(event.key){
            case "ArrowDown":
                movement = isHorizontal ? 0 : delta;
                break;
            case "ArrowLeft":
                movement = isHorizontal ? -delta : 0;
                break;
            case "ArrowRight":
                movement = isHorizontal ? delta : 0;
                break;
            case "ArrowUp":
                movement = isHorizontal ? 0 : -delta;
                break;
            case "End":
                movement = 100;
                break;
            case "Home":
                movement = -100;
                break;
        }
        return movement;
    } else {
        if (initialDragState == null) {
            return 0;
        }
        return calculateDragOffsetPercentage(event, dragHandleId, direction, initialDragState, panelGroupElement);
    }
}
function calculateUnsafeDefaultLayout(param) {
    let { panelDataArray } = param;
    const layout = Array(panelDataArray.length);
    const panelConstraintsArray = panelDataArray.map((panelData)=>panelData.constraints);
    let numPanelsWithSizes = 0;
    let remainingSize = 100;
    // Distribute default sizes first
    for(let index = 0; index < panelDataArray.length; index++){
        const panelConstraints = panelConstraintsArray[index];
        assert(panelConstraints, "Panel constraints not found for index ".concat(index));
        const { defaultSize } = panelConstraints;
        if (defaultSize != null) {
            numPanelsWithSizes++;
            layout[index] = defaultSize;
            remainingSize -= defaultSize;
        }
    }
    // Remaining size should be distributed evenly between panels without default sizes
    for(let index = 0; index < panelDataArray.length; index++){
        const panelConstraints = panelConstraintsArray[index];
        assert(panelConstraints, "Panel constraints not found for index ".concat(index));
        const { defaultSize } = panelConstraints;
        if (defaultSize != null) {
            continue;
        }
        const numRemainingPanels = panelDataArray.length - numPanelsWithSizes;
        const size = remainingSize / numRemainingPanels;
        numPanelsWithSizes++;
        layout[index] = size;
        remainingSize -= size;
    }
    return layout;
}
// Layout should be pre-converted into percentages
function callPanelCallbacks(panelsArray, layout, panelIdToLastNotifiedSizeMap) {
    layout.forEach((size, index)=>{
        const panelData = panelsArray[index];
        assert(panelData, "Panel data not found for index ".concat(index));
        const { callbacks, constraints, id: panelId } = panelData;
        const { collapsedSize = 0, collapsible } = constraints;
        const lastNotifiedSize = panelIdToLastNotifiedSizeMap[panelId];
        if (lastNotifiedSize == null || size !== lastNotifiedSize) {
            panelIdToLastNotifiedSizeMap[panelId] = size;
            const { onCollapse, onExpand, onResize } = callbacks;
            if (onResize) {
                onResize(size, lastNotifiedSize);
            }
            if (collapsible && (onCollapse || onExpand)) {
                if (onExpand && (lastNotifiedSize == null || fuzzyNumbersEqual$1(lastNotifiedSize, collapsedSize)) && !fuzzyNumbersEqual$1(size, collapsedSize)) {
                    onExpand();
                }
                if (onCollapse && (lastNotifiedSize == null || !fuzzyNumbersEqual$1(lastNotifiedSize, collapsedSize)) && fuzzyNumbersEqual$1(size, collapsedSize)) {
                    onCollapse();
                }
            }
        }
    });
}
function compareLayouts(a, b) {
    if (a.length !== b.length) {
        return false;
    } else {
        for(let index = 0; index < a.length; index++){
            if (a[index] != b[index]) {
                return false;
            }
        }
    }
    return true;
}
// This method returns a number between 1 and 100 representing
// the % of the group's overall space this panel should occupy.
function computePanelFlexBoxStyle(param) {
    let { defaultSize, dragState, layout, panelData, panelIndex, precision = 3 } = param;
    const size = layout[panelIndex];
    let flexGrow;
    if (size == null) {
        // Initial render (before panels have registered themselves)
        // In order to support server rendering, fall back to default size if provided
        flexGrow = defaultSize != undefined ? defaultSize.toFixed(precision) : "1";
    } else if (panelData.length === 1) {
        // Special case: Single panel group should always fill full width/height
        flexGrow = "1";
    } else {
        flexGrow = size.toFixed(precision);
    }
    return {
        flexBasis: 0,
        flexGrow,
        flexShrink: 1,
        // Without this, Panel sizes may be unintentionally overridden by their content
        overflow: "hidden",
        // Disable pointer events inside of a panel during resize
        // This avoid edge cases like nested iframes
        pointerEvents: dragState !== null ? "none" : undefined
    };
}
function debounce(callback) {
    let durationMs = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 10;
    let timeoutId = null;
    let callable = function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(()=>{
            callback(...args);
        }, durationMs);
    };
    return callable;
}
// PanelGroup might be rendering in a server-side environment where localStorage is not available
// or on a browser with cookies/storage disabled.
// In either case, this function avoids accessing localStorage until needed,
// and avoids throwing user-visible errors.
function initializeDefaultStorage(storageObject) {
    try {
        if (typeof localStorage !== "undefined") {
            // Bypass this check for future calls
            storageObject.getItem = (name)=>{
                return localStorage.getItem(name);
            };
            storageObject.setItem = (name, value)=>{
                localStorage.setItem(name, value);
            };
        } else {
            throw new Error("localStorage not supported in this environment");
        }
    } catch (error) {
        console.error(error);
        storageObject.getItem = ()=>null;
        storageObject.setItem = ()=>{};
    }
}
function getPanelGroupKey(autoSaveId) {
    return "react-resizable-panels:".concat(autoSaveId);
}
// Note that Panel ids might be user-provided (stable) or useId generated (non-deterministic)
// so they should not be used as part of the serialization key.
// Using the min/max size attributes should work well enough as a backup.
// Pre-sorting by minSize allows remembering layouts even if panels are re-ordered/dragged.
function getPanelKey(panels) {
    return panels.map((panel)=>{
        const { constraints, id, idIsFromProps, order } = panel;
        if (idIsFromProps) {
            return id;
        } else {
            return order ? "".concat(order, ":").concat(JSON.stringify(constraints)) : JSON.stringify(constraints);
        }
    }).sort((a, b)=>a.localeCompare(b)).join(",");
}
function loadSerializedPanelGroupState(autoSaveId, storage) {
    try {
        const panelGroupKey = getPanelGroupKey(autoSaveId);
        const serialized = storage.getItem(panelGroupKey);
        if (serialized) {
            const parsed = JSON.parse(serialized);
            if (typeof parsed === "object" && parsed != null) {
                return parsed;
            }
        }
    } catch (error) {}
    return null;
}
function loadPanelGroupState(autoSaveId, panels, storage) {
    var _loadSerializedPanelG, _state$panelKey;
    const state = (_loadSerializedPanelG = loadSerializedPanelGroupState(autoSaveId, storage)) !== null && _loadSerializedPanelG !== void 0 ? _loadSerializedPanelG : {};
    const panelKey = getPanelKey(panels);
    return (_state$panelKey = state[panelKey]) !== null && _state$panelKey !== void 0 ? _state$panelKey : null;
}
function savePanelGroupState(autoSaveId, panels, panelSizesBeforeCollapse, sizes, storage) {
    var _loadSerializedPanelG2;
    const panelGroupKey = getPanelGroupKey(autoSaveId);
    const panelKey = getPanelKey(panels);
    const state = (_loadSerializedPanelG2 = loadSerializedPanelGroupState(autoSaveId, storage)) !== null && _loadSerializedPanelG2 !== void 0 ? _loadSerializedPanelG2 : {};
    state[panelKey] = {
        expandToSizes: Object.fromEntries(panelSizesBeforeCollapse.entries()),
        layout: sizes
    };
    try {
        storage.setItem(panelGroupKey, JSON.stringify(state));
    } catch (error) {
        console.error(error);
    }
}
function validatePanelConstraints(param) {
    let { panelConstraints: panelConstraintsArray, panelId, panelIndex } = param;
    {
        const warnings = [];
        const panelConstraints = panelConstraintsArray[panelIndex];
        assert(panelConstraints, "No panel constraints found for index ".concat(panelIndex));
        const { collapsedSize = 0, collapsible = false, defaultSize, maxSize = 100, minSize = 0 } = panelConstraints;
        if (minSize > maxSize) {
            warnings.push("min size (".concat(minSize, "%) should not be greater than max size (").concat(maxSize, "%)"));
        }
        if (defaultSize != null) {
            if (defaultSize < 0) {
                warnings.push("default size should not be less than 0");
            } else if (defaultSize < minSize && (!collapsible || defaultSize !== collapsedSize)) {
                warnings.push("default size should not be less than min size");
            }
            if (defaultSize > 100) {
                warnings.push("default size should not be greater than 100");
            } else if (defaultSize > maxSize) {
                warnings.push("default size should not be greater than max size");
            }
        }
        if (collapsedSize > minSize) {
            warnings.push("collapsed size should not be greater than min size");
        }
        if (warnings.length > 0) {
            const name = panelId != null ? 'Panel "'.concat(panelId, '"') : "Panel";
            console.warn("".concat(name, " has an invalid configuration:\n\n").concat(warnings.join("\n")));
            return false;
        }
    }
    return true;
}
// All units must be in percentages; pixel values should be pre-converted
function validatePanelGroupLayout(param) {
    let { layout: prevLayout, panelConstraints } = param;
    const nextLayout = [
        ...prevLayout
    ];
    const nextLayoutTotalSize = nextLayout.reduce((accumulated, current)=>accumulated + current, 0);
    // Validate layout expectations
    if (nextLayout.length !== panelConstraints.length) {
        throw Error("Invalid ".concat(panelConstraints.length, " panel layout: ").concat(nextLayout.map((size)=>"".concat(size, "%")).join(", ")));
    } else if (!fuzzyNumbersEqual(nextLayoutTotalSize, 100) && nextLayout.length > 0) {
        // This is not ideal so we should warn about it, but it may be recoverable in some cases
        // (especially if the amount is small)
        {
            console.warn("WARNING: Invalid layout total size: ".concat(nextLayout.map((size)=>"".concat(size, "%")).join(", "), ". Layout normalization will be applied."));
        }
        for(let index = 0; index < panelConstraints.length; index++){
            const unsafeSize = nextLayout[index];
            assert(unsafeSize != null, "No layout data found for index ".concat(index));
            const safeSize = 100 / nextLayoutTotalSize * unsafeSize;
            nextLayout[index] = safeSize;
        }
    }
    let remainingSize = 0;
    // First pass: Validate the proposed layout given each panel's constraints
    for(let index = 0; index < panelConstraints.length; index++){
        const unsafeSize = nextLayout[index];
        assert(unsafeSize != null, "No layout data found for index ".concat(index));
        const safeSize = resizePanel({
            panelConstraints,
            panelIndex: index,
            size: unsafeSize
        });
        if (unsafeSize != safeSize) {
            remainingSize += unsafeSize - safeSize;
            nextLayout[index] = safeSize;
        }
    }
    // If there is additional, left over space, assign it to any panel(s) that permits it
    // (It's not worth taking multiple additional passes to evenly distribute)
    if (!fuzzyNumbersEqual(remainingSize, 0)) {
        for(let index = 0; index < panelConstraints.length; index++){
            const prevSize = nextLayout[index];
            assert(prevSize != null, "No layout data found for index ".concat(index));
            const unsafeSize = prevSize + remainingSize;
            const safeSize = resizePanel({
                panelConstraints,
                panelIndex: index,
                size: unsafeSize
            });
            if (prevSize !== safeSize) {
                remainingSize -= safeSize - prevSize;
                nextLayout[index] = safeSize;
                // Once we've used up the remainder, bail
                if (fuzzyNumbersEqual(remainingSize, 0)) {
                    break;
                }
            }
        }
    }
    return nextLayout;
}
const LOCAL_STORAGE_DEBOUNCE_INTERVAL = 100;
const defaultStorage = {
    getItem: (name)=>{
        initializeDefaultStorage(defaultStorage);
        return defaultStorage.getItem(name);
    },
    setItem: (name, value)=>{
        initializeDefaultStorage(defaultStorage);
        defaultStorage.setItem(name, value);
    }
};
const debounceMap = {};
function PanelGroupWithForwardedRef(param) {
    let { autoSaveId = null, children, className: classNameFromProps = "", direction, forwardedRef, id: idFromProps = null, onLayout = null, keyboardResizeBy = null, storage = defaultStorage, style: styleFromProps, tagName: Type = "div", ...rest } = param;
    const groupId = useUniqueId(idFromProps);
    const panelGroupElementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [dragState, setDragState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [layout, setLayout] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const forceUpdate = useForceUpdate();
    const panelIdToLastNotifiedSizeMapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const panelSizeBeforeCollapseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const prevDeltaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const committedValuesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])({
        autoSaveId,
        direction,
        dragState,
        id: groupId,
        keyboardResizeBy,
        onLayout,
        storage
    });
    const eagerValuesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])({
        layout,
        panelDataArray: [],
        panelDataArrayChanged: false
    });
    const devWarningsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])({
        didLogIdAndOrderWarning: false,
        didLogPanelConstraintsWarning: false,
        prevPanelIds: []
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(forwardedRef, {
        "PanelGroupWithForwardedRef.useImperativeHandle": ()=>({
                getId: ({
                    "PanelGroupWithForwardedRef.useImperativeHandle": ()=>committedValuesRef.current.id
                })["PanelGroupWithForwardedRef.useImperativeHandle"],
                getLayout: ({
                    "PanelGroupWithForwardedRef.useImperativeHandle": ()=>{
                        const { layout } = eagerValuesRef.current;
                        return layout;
                    }
                })["PanelGroupWithForwardedRef.useImperativeHandle"],
                setLayout: ({
                    "PanelGroupWithForwardedRef.useImperativeHandle": (unsafeLayout)=>{
                        const { onLayout } = committedValuesRef.current;
                        const { layout: prevLayout, panelDataArray } = eagerValuesRef.current;
                        const safeLayout = validatePanelGroupLayout({
                            layout: unsafeLayout,
                            panelConstraints: panelDataArray.map({
                                "PanelGroupWithForwardedRef.useImperativeHandle.safeLayout": (panelData)=>panelData.constraints
                            }["PanelGroupWithForwardedRef.useImperativeHandle.safeLayout"])
                        });
                        if (!areEqual(prevLayout, safeLayout)) {
                            setLayout(safeLayout);
                            eagerValuesRef.current.layout = safeLayout;
                            if (onLayout) {
                                onLayout(safeLayout);
                            }
                            callPanelCallbacks(panelDataArray, safeLayout, panelIdToLastNotifiedSizeMapRef.current);
                        }
                    }
                })["PanelGroupWithForwardedRef.useImperativeHandle"]
            })
    }["PanelGroupWithForwardedRef.useImperativeHandle"], []);
    useIsomorphicLayoutEffect({
        "PanelGroupWithForwardedRef.useIsomorphicLayoutEffect": ()=>{
            committedValuesRef.current.autoSaveId = autoSaveId;
            committedValuesRef.current.direction = direction;
            committedValuesRef.current.dragState = dragState;
            committedValuesRef.current.id = groupId;
            committedValuesRef.current.onLayout = onLayout;
            committedValuesRef.current.storage = storage;
        }
    }["PanelGroupWithForwardedRef.useIsomorphicLayoutEffect"]);
    useWindowSplitterPanelGroupBehavior({
        committedValuesRef,
        eagerValuesRef,
        groupId,
        layout,
        panelDataArray: eagerValuesRef.current.panelDataArray,
        setLayout,
        panelGroupElement: panelGroupElementRef.current
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PanelGroupWithForwardedRef.useEffect": ()=>{
            const { panelDataArray } = eagerValuesRef.current;
            // If this panel has been configured to persist sizing information, save sizes to local storage.
            if (autoSaveId) {
                if (layout.length === 0 || layout.length !== panelDataArray.length) {
                    return;
                }
                let debouncedSave = debounceMap[autoSaveId];
                // Limit the frequency of localStorage updates.
                if (debouncedSave == null) {
                    debouncedSave = debounce(savePanelGroupState, LOCAL_STORAGE_DEBOUNCE_INTERVAL);
                    debounceMap[autoSaveId] = debouncedSave;
                }
                // Clone mutable data before passing to the debounced function,
                // else we run the risk of saving an incorrect combination of mutable and immutable values to state.
                const clonedPanelDataArray = [
                    ...panelDataArray
                ];
                const clonedPanelSizesBeforeCollapse = new Map(panelSizeBeforeCollapseRef.current);
                debouncedSave(autoSaveId, clonedPanelDataArray, clonedPanelSizesBeforeCollapse, layout, storage);
            }
        }
    }["PanelGroupWithForwardedRef.useEffect"], [
        autoSaveId,
        layout,
        storage
    ]);
    // DEV warnings
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PanelGroupWithForwardedRef.useEffect": ()=>{
            {
                const { panelDataArray } = eagerValuesRef.current;
                const { didLogIdAndOrderWarning, didLogPanelConstraintsWarning, prevPanelIds } = devWarningsRef.current;
                if (!didLogIdAndOrderWarning) {
                    const panelIds = panelDataArray.map({
                        "PanelGroupWithForwardedRef.useEffect.panelIds": (param)=>{
                            let { id } = param;
                            return id;
                        }
                    }["PanelGroupWithForwardedRef.useEffect.panelIds"]);
                    devWarningsRef.current.prevPanelIds = panelIds;
                    const panelsHaveChanged = prevPanelIds.length > 0 && !areEqual(prevPanelIds, panelIds);
                    if (panelsHaveChanged) {
                        if (panelDataArray.find({
                            "PanelGroupWithForwardedRef.useEffect": (param)=>{
                                let { idIsFromProps, order } = param;
                                return !idIsFromProps || order == null;
                            }
                        }["PanelGroupWithForwardedRef.useEffect"])) {
                            devWarningsRef.current.didLogIdAndOrderWarning = true;
                            console.warn("WARNING: Panel id and order props recommended when panels are dynamically rendered");
                        }
                    }
                }
                if (!didLogPanelConstraintsWarning) {
                    const panelConstraints = panelDataArray.map({
                        "PanelGroupWithForwardedRef.useEffect.panelConstraints": (panelData)=>panelData.constraints
                    }["PanelGroupWithForwardedRef.useEffect.panelConstraints"]);
                    for(let panelIndex = 0; panelIndex < panelConstraints.length; panelIndex++){
                        const panelData = panelDataArray[panelIndex];
                        assert(panelData, "Panel data not found for index ".concat(panelIndex));
                        const isValid = validatePanelConstraints({
                            panelConstraints,
                            panelId: panelData.id,
                            panelIndex
                        });
                        if (!isValid) {
                            devWarningsRef.current.didLogPanelConstraintsWarning = true;
                            break;
                        }
                    }
                }
            }
        }
    }["PanelGroupWithForwardedRef.useEffect"]);
    // External APIs are safe to memoize via committed values ref
    const collapsePanel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PanelGroupWithForwardedRef.useCallback[collapsePanel]": (panelData)=>{
            const { onLayout } = committedValuesRef.current;
            const { layout: prevLayout, panelDataArray } = eagerValuesRef.current;
            if (panelData.constraints.collapsible) {
                const panelConstraintsArray = panelDataArray.map({
                    "PanelGroupWithForwardedRef.useCallback[collapsePanel].panelConstraintsArray": (panelData)=>panelData.constraints
                }["PanelGroupWithForwardedRef.useCallback[collapsePanel].panelConstraintsArray"]);
                const { collapsedSize = 0, panelSize, pivotIndices } = panelDataHelper(panelDataArray, panelData, prevLayout);
                assert(panelSize != null, 'Panel size not found for panel "'.concat(panelData.id, '"'));
                if (!fuzzyNumbersEqual$1(panelSize, collapsedSize)) {
                    // Store size before collapse;
                    // This is the size that gets restored if the expand() API is used.
                    panelSizeBeforeCollapseRef.current.set(panelData.id, panelSize);
                    const isLastPanel = findPanelDataIndex(panelDataArray, panelData) === panelDataArray.length - 1;
                    const delta = isLastPanel ? panelSize - collapsedSize : collapsedSize - panelSize;
                    const nextLayout = adjustLayoutByDelta({
                        delta,
                        initialLayout: prevLayout,
                        panelConstraints: panelConstraintsArray,
                        pivotIndices,
                        prevLayout,
                        trigger: "imperative-api"
                    });
                    if (!compareLayouts(prevLayout, nextLayout)) {
                        setLayout(nextLayout);
                        eagerValuesRef.current.layout = nextLayout;
                        if (onLayout) {
                            onLayout(nextLayout);
                        }
                        callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.current);
                    }
                }
            }
        }
    }["PanelGroupWithForwardedRef.useCallback[collapsePanel]"], []);
    // External APIs are safe to memoize via committed values ref
    const expandPanel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PanelGroupWithForwardedRef.useCallback[expandPanel]": (panelData, minSizeOverride)=>{
            const { onLayout } = committedValuesRef.current;
            const { layout: prevLayout, panelDataArray } = eagerValuesRef.current;
            if (panelData.constraints.collapsible) {
                const panelConstraintsArray = panelDataArray.map({
                    "PanelGroupWithForwardedRef.useCallback[expandPanel].panelConstraintsArray": (panelData)=>panelData.constraints
                }["PanelGroupWithForwardedRef.useCallback[expandPanel].panelConstraintsArray"]);
                const { collapsedSize = 0, panelSize = 0, minSize: minSizeFromProps = 0, pivotIndices } = panelDataHelper(panelDataArray, panelData, prevLayout);
                const minSize = minSizeOverride !== null && minSizeOverride !== void 0 ? minSizeOverride : minSizeFromProps;
                if (fuzzyNumbersEqual$1(panelSize, collapsedSize)) {
                    // Restore this panel to the size it was before it was collapsed, if possible.
                    const prevPanelSize = panelSizeBeforeCollapseRef.current.get(panelData.id);
                    const baseSize = prevPanelSize != null && prevPanelSize >= minSize ? prevPanelSize : minSize;
                    const isLastPanel = findPanelDataIndex(panelDataArray, panelData) === panelDataArray.length - 1;
                    const delta = isLastPanel ? panelSize - baseSize : baseSize - panelSize;
                    const nextLayout = adjustLayoutByDelta({
                        delta,
                        initialLayout: prevLayout,
                        panelConstraints: panelConstraintsArray,
                        pivotIndices,
                        prevLayout,
                        trigger: "imperative-api"
                    });
                    if (!compareLayouts(prevLayout, nextLayout)) {
                        setLayout(nextLayout);
                        eagerValuesRef.current.layout = nextLayout;
                        if (onLayout) {
                            onLayout(nextLayout);
                        }
                        callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.current);
                    }
                }
            }
        }
    }["PanelGroupWithForwardedRef.useCallback[expandPanel]"], []);
    // External APIs are safe to memoize via committed values ref
    const getPanelSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PanelGroupWithForwardedRef.useCallback[getPanelSize]": (panelData)=>{
            const { layout, panelDataArray } = eagerValuesRef.current;
            const { panelSize } = panelDataHelper(panelDataArray, panelData, layout);
            assert(panelSize != null, 'Panel size not found for panel "'.concat(panelData.id, '"'));
            return panelSize;
        }
    }["PanelGroupWithForwardedRef.useCallback[getPanelSize]"], []);
    // This API should never read from committedValuesRef
    const getPanelStyle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PanelGroupWithForwardedRef.useCallback[getPanelStyle]": (panelData, defaultSize)=>{
            const { panelDataArray } = eagerValuesRef.current;
            const panelIndex = findPanelDataIndex(panelDataArray, panelData);
            return computePanelFlexBoxStyle({
                defaultSize,
                dragState,
                layout,
                panelData: panelDataArray,
                panelIndex
            });
        }
    }["PanelGroupWithForwardedRef.useCallback[getPanelStyle]"], [
        dragState,
        layout
    ]);
    // External APIs are safe to memoize via committed values ref
    const isPanelCollapsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PanelGroupWithForwardedRef.useCallback[isPanelCollapsed]": (panelData)=>{
            const { layout, panelDataArray } = eagerValuesRef.current;
            const { collapsedSize = 0, collapsible, panelSize } = panelDataHelper(panelDataArray, panelData, layout);
            assert(panelSize != null, 'Panel size not found for panel "'.concat(panelData.id, '"'));
            return collapsible === true && fuzzyNumbersEqual$1(panelSize, collapsedSize);
        }
    }["PanelGroupWithForwardedRef.useCallback[isPanelCollapsed]"], []);
    // External APIs are safe to memoize via committed values ref
    const isPanelExpanded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PanelGroupWithForwardedRef.useCallback[isPanelExpanded]": (panelData)=>{
            const { layout, panelDataArray } = eagerValuesRef.current;
            const { collapsedSize = 0, collapsible, panelSize } = panelDataHelper(panelDataArray, panelData, layout);
            assert(panelSize != null, 'Panel size not found for panel "'.concat(panelData.id, '"'));
            return !collapsible || fuzzyCompareNumbers(panelSize, collapsedSize) > 0;
        }
    }["PanelGroupWithForwardedRef.useCallback[isPanelExpanded]"], []);
    const registerPanel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PanelGroupWithForwardedRef.useCallback[registerPanel]": (panelData)=>{
            const { panelDataArray } = eagerValuesRef.current;
            panelDataArray.push(panelData);
            panelDataArray.sort({
                "PanelGroupWithForwardedRef.useCallback[registerPanel]": (panelA, panelB)=>{
                    const orderA = panelA.order;
                    const orderB = panelB.order;
                    if (orderA == null && orderB == null) {
                        return 0;
                    } else if (orderA == null) {
                        return -1;
                    } else if (orderB == null) {
                        return 1;
                    } else {
                        return orderA - orderB;
                    }
                }
            }["PanelGroupWithForwardedRef.useCallback[registerPanel]"]);
            eagerValuesRef.current.panelDataArrayChanged = true;
            forceUpdate();
        }
    }["PanelGroupWithForwardedRef.useCallback[registerPanel]"], [
        forceUpdate
    ]);
    // (Re)calculate group layout whenever panels are registered or unregistered.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useIsomorphicLayoutEffect({
        "PanelGroupWithForwardedRef.useIsomorphicLayoutEffect": ()=>{
            if (eagerValuesRef.current.panelDataArrayChanged) {
                eagerValuesRef.current.panelDataArrayChanged = false;
                const { autoSaveId, onLayout, storage } = committedValuesRef.current;
                const { layout: prevLayout, panelDataArray } = eagerValuesRef.current;
                // If this panel has been configured to persist sizing information,
                // default size should be restored from local storage if possible.
                let unsafeLayout = null;
                if (autoSaveId) {
                    const state = loadPanelGroupState(autoSaveId, panelDataArray, storage);
                    if (state) {
                        panelSizeBeforeCollapseRef.current = new Map(Object.entries(state.expandToSizes));
                        unsafeLayout = state.layout;
                    }
                }
                if (unsafeLayout == null) {
                    unsafeLayout = calculateUnsafeDefaultLayout({
                        panelDataArray
                    });
                }
                // Validate even saved layouts in case something has changed since last render
                // e.g. for pixel groups, this could be the size of the window
                const nextLayout = validatePanelGroupLayout({
                    layout: unsafeLayout,
                    panelConstraints: panelDataArray.map({
                        "PanelGroupWithForwardedRef.useIsomorphicLayoutEffect.nextLayout": (panelData)=>panelData.constraints
                    }["PanelGroupWithForwardedRef.useIsomorphicLayoutEffect.nextLayout"])
                });
                if (!areEqual(prevLayout, nextLayout)) {
                    setLayout(nextLayout);
                    eagerValuesRef.current.layout = nextLayout;
                    if (onLayout) {
                        onLayout(nextLayout);
                    }
                    callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.current);
                }
            }
        }
    }["PanelGroupWithForwardedRef.useIsomorphicLayoutEffect"]);
    // Reset the cached layout if hidden by the Activity/Offscreen API
    useIsomorphicLayoutEffect({
        "PanelGroupWithForwardedRef.useIsomorphicLayoutEffect": ()=>{
            const eagerValues = eagerValuesRef.current;
            return ({
                "PanelGroupWithForwardedRef.useIsomorphicLayoutEffect": ()=>{
                    eagerValues.layout = [];
                }
            })["PanelGroupWithForwardedRef.useIsomorphicLayoutEffect"];
        }
    }["PanelGroupWithForwardedRef.useIsomorphicLayoutEffect"], []);
    const registerResizeHandle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PanelGroupWithForwardedRef.useCallback[registerResizeHandle]": (dragHandleId)=>{
            let isRTL = false;
            const panelGroupElement = panelGroupElementRef.current;
            if (panelGroupElement) {
                const style = window.getComputedStyle(panelGroupElement, null);
                if (style.getPropertyValue("direction") === "rtl") {
                    isRTL = true;
                }
            }
            return function resizeHandler(event) {
                event.preventDefault();
                const panelGroupElement = panelGroupElementRef.current;
                if (!panelGroupElement) {
                    return ({
                        "PanelGroupWithForwardedRef.useCallback[registerResizeHandle].resizeHandler": ()=>null
                    })["PanelGroupWithForwardedRef.useCallback[registerResizeHandle].resizeHandler"];
                }
                const { direction, dragState, id: groupId, keyboardResizeBy, onLayout } = committedValuesRef.current;
                const { layout: prevLayout, panelDataArray } = eagerValuesRef.current;
                const { initialLayout } = dragState !== null && dragState !== void 0 ? dragState : {};
                const pivotIndices = determinePivotIndices(groupId, dragHandleId, panelGroupElement);
                let delta = calculateDeltaPercentage(event, dragHandleId, direction, dragState, keyboardResizeBy, panelGroupElement);
                const isHorizontal = direction === "horizontal";
                if (isHorizontal && isRTL) {
                    delta = -delta;
                }
                const panelConstraints = panelDataArray.map({
                    "PanelGroupWithForwardedRef.useCallback[registerResizeHandle].resizeHandler.panelConstraints": (panelData)=>panelData.constraints
                }["PanelGroupWithForwardedRef.useCallback[registerResizeHandle].resizeHandler.panelConstraints"]);
                const nextLayout = adjustLayoutByDelta({
                    delta,
                    initialLayout: initialLayout !== null && initialLayout !== void 0 ? initialLayout : prevLayout,
                    panelConstraints,
                    pivotIndices,
                    prevLayout,
                    trigger: isKeyDown(event) ? "keyboard" : "mouse-or-touch"
                });
                const layoutChanged = !compareLayouts(prevLayout, nextLayout);
                // Only update the cursor for layout changes triggered by touch/mouse events (not keyboard)
                // Update the cursor even if the layout hasn't changed (we may need to show an invalid cursor state)
                if (isPointerEvent(event) || isMouseEvent(event)) {
                    // Watch for multiple subsequent deltas; this might occur for tiny cursor movements.
                    // In this case, Panel sizes might not change–
                    // but updating cursor in this scenario would cause a flicker.
                    if (prevDeltaRef.current != delta) {
                        prevDeltaRef.current = delta;
                        if (!layoutChanged && delta !== 0) {
                            // If the pointer has moved too far to resize the panel any further, note this so we can update the cursor.
                            // This mimics VS Code behavior.
                            if (isHorizontal) {
                                reportConstraintsViolation(dragHandleId, delta < 0 ? EXCEEDED_HORIZONTAL_MIN : EXCEEDED_HORIZONTAL_MAX);
                            } else {
                                reportConstraintsViolation(dragHandleId, delta < 0 ? EXCEEDED_VERTICAL_MIN : EXCEEDED_VERTICAL_MAX);
                            }
                        } else {
                            reportConstraintsViolation(dragHandleId, 0);
                        }
                    }
                }
                if (layoutChanged) {
                    setLayout(nextLayout);
                    eagerValuesRef.current.layout = nextLayout;
                    if (onLayout) {
                        onLayout(nextLayout);
                    }
                    callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.current);
                }
            };
        }
    }["PanelGroupWithForwardedRef.useCallback[registerResizeHandle]"], []);
    // External APIs are safe to memoize via committed values ref
    const resizePanel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PanelGroupWithForwardedRef.useCallback[resizePanel]": (panelData, unsafePanelSize)=>{
            const { onLayout } = committedValuesRef.current;
            const { layout: prevLayout, panelDataArray } = eagerValuesRef.current;
            const panelConstraintsArray = panelDataArray.map({
                "PanelGroupWithForwardedRef.useCallback[resizePanel].panelConstraintsArray": (panelData)=>panelData.constraints
            }["PanelGroupWithForwardedRef.useCallback[resizePanel].panelConstraintsArray"]);
            const { panelSize, pivotIndices } = panelDataHelper(panelDataArray, panelData, prevLayout);
            assert(panelSize != null, 'Panel size not found for panel "'.concat(panelData.id, '"'));
            const isLastPanel = findPanelDataIndex(panelDataArray, panelData) === panelDataArray.length - 1;
            const delta = isLastPanel ? panelSize - unsafePanelSize : unsafePanelSize - panelSize;
            const nextLayout = adjustLayoutByDelta({
                delta,
                initialLayout: prevLayout,
                panelConstraints: panelConstraintsArray,
                pivotIndices,
                prevLayout,
                trigger: "imperative-api"
            });
            if (!compareLayouts(prevLayout, nextLayout)) {
                setLayout(nextLayout);
                eagerValuesRef.current.layout = nextLayout;
                if (onLayout) {
                    onLayout(nextLayout);
                }
                callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.current);
            }
        }
    }["PanelGroupWithForwardedRef.useCallback[resizePanel]"], []);
    const reevaluatePanelConstraints = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PanelGroupWithForwardedRef.useCallback[reevaluatePanelConstraints]": (panelData, prevConstraints)=>{
            const { layout, panelDataArray } = eagerValuesRef.current;
            const { collapsedSize: prevCollapsedSize = 0, collapsible: prevCollapsible } = prevConstraints;
            const { collapsedSize: nextCollapsedSize = 0, collapsible: nextCollapsible, maxSize: nextMaxSize = 100, minSize: nextMinSize = 0 } = panelData.constraints;
            const { panelSize: prevPanelSize } = panelDataHelper(panelDataArray, panelData, layout);
            if (prevPanelSize == null) {
                // It's possible that the panels in this group have changed since the last render
                return;
            }
            if (prevCollapsible && nextCollapsible && fuzzyNumbersEqual$1(prevPanelSize, prevCollapsedSize)) {
                if (!fuzzyNumbersEqual$1(prevCollapsedSize, nextCollapsedSize)) {
                    resizePanel(panelData, nextCollapsedSize);
                }
            } else if (prevPanelSize < nextMinSize) {
                resizePanel(panelData, nextMinSize);
            } else if (prevPanelSize > nextMaxSize) {
                resizePanel(panelData, nextMaxSize);
            }
        }
    }["PanelGroupWithForwardedRef.useCallback[reevaluatePanelConstraints]"], [
        resizePanel
    ]);
    // TODO Multiple drag handles can be active at the same time so this API is a bit awkward now
    const startDragging = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PanelGroupWithForwardedRef.useCallback[startDragging]": (dragHandleId, event)=>{
            const { direction } = committedValuesRef.current;
            const { layout } = eagerValuesRef.current;
            if (!panelGroupElementRef.current) {
                return;
            }
            const handleElement = getResizeHandleElement(dragHandleId, panelGroupElementRef.current);
            assert(handleElement, 'Drag handle element not found for id "'.concat(dragHandleId, '"'));
            const initialCursorPosition = getResizeEventCursorPosition(direction, event);
            setDragState({
                dragHandleId,
                dragHandleRect: handleElement.getBoundingClientRect(),
                initialCursorPosition,
                initialLayout: layout
            });
        }
    }["PanelGroupWithForwardedRef.useCallback[startDragging]"], []);
    const stopDragging = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PanelGroupWithForwardedRef.useCallback[stopDragging]": ()=>{
            setDragState(null);
        }
    }["PanelGroupWithForwardedRef.useCallback[stopDragging]"], []);
    const unregisterPanel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PanelGroupWithForwardedRef.useCallback[unregisterPanel]": (panelData)=>{
            const { panelDataArray } = eagerValuesRef.current;
            const index = findPanelDataIndex(panelDataArray, panelData);
            if (index >= 0) {
                panelDataArray.splice(index, 1);
                // TRICKY
                // When a panel is removed from the group, we should delete the most recent prev-size entry for it.
                // If we don't do this, then a conditionally rendered panel might not call onResize when it's re-mounted.
                // Strict effects mode makes this tricky though because all panels will be registered, unregistered, then re-registered on mount.
                delete panelIdToLastNotifiedSizeMapRef.current[panelData.id];
                eagerValuesRef.current.panelDataArrayChanged = true;
                forceUpdate();
            }
        }
    }["PanelGroupWithForwardedRef.useCallback[unregisterPanel]"], [
        forceUpdate
    ]);
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PanelGroupWithForwardedRef.useMemo[context]": ()=>({
                collapsePanel,
                direction,
                dragState,
                expandPanel,
                getPanelSize,
                getPanelStyle,
                groupId,
                isPanelCollapsed,
                isPanelExpanded,
                reevaluatePanelConstraints,
                registerPanel,
                registerResizeHandle,
                resizePanel,
                startDragging,
                stopDragging,
                unregisterPanel,
                panelGroupElement: panelGroupElementRef.current
            })
    }["PanelGroupWithForwardedRef.useMemo[context]"], [
        collapsePanel,
        dragState,
        direction,
        expandPanel,
        getPanelSize,
        getPanelStyle,
        groupId,
        isPanelCollapsed,
        isPanelExpanded,
        reevaluatePanelConstraints,
        registerPanel,
        registerResizeHandle,
        resizePanel,
        startDragging,
        stopDragging,
        unregisterPanel
    ]);
    const style = {
        display: "flex",
        flexDirection: direction === "horizontal" ? "row" : "column",
        height: "100%",
        overflow: "hidden",
        width: "100%"
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createElement"])(PanelGroupContext.Provider, {
        value: context
    }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createElement"])(Type, {
        ...rest,
        children,
        className: classNameFromProps,
        id: idFromProps,
        ref: panelGroupElementRef,
        style: {
            ...style,
            ...styleFromProps
        },
        // CSS selectors
        [DATA_ATTRIBUTES.group]: "",
        [DATA_ATTRIBUTES.groupDirection]: direction,
        [DATA_ATTRIBUTES.groupId]: groupId
    }));
}
const PanelGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["forwardRef"])((props, ref)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createElement"])(PanelGroupWithForwardedRef, {
        ...props,
        forwardedRef: ref
    }));
PanelGroupWithForwardedRef.displayName = "PanelGroup";
PanelGroup.displayName = "forwardRef(PanelGroup)";
function findPanelDataIndex(panelDataArray, panelData) {
    return panelDataArray.findIndex((prevPanelData)=>prevPanelData === panelData || prevPanelData.id === panelData.id);
}
function panelDataHelper(panelDataArray, panelData, layout) {
    const panelIndex = findPanelDataIndex(panelDataArray, panelData);
    const isLastPanel = panelIndex === panelDataArray.length - 1;
    const pivotIndices = isLastPanel ? [
        panelIndex - 1,
        panelIndex
    ] : [
        panelIndex,
        panelIndex + 1
    ];
    const panelSize = layout[panelIndex];
    return {
        ...panelData.constraints,
        panelSize,
        pivotIndices
    };
}
// https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/
function useWindowSplitterResizeHandlerBehavior(param) {
    let { disabled, handleId, resizeHandler, panelGroupElement } = param;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWindowSplitterResizeHandlerBehavior.useEffect": ()=>{
            if (disabled || resizeHandler == null || panelGroupElement == null) {
                return;
            }
            const handleElement = getResizeHandleElement(handleId, panelGroupElement);
            if (handleElement == null) {
                return;
            }
            const onKeyDown = {
                "useWindowSplitterResizeHandlerBehavior.useEffect.onKeyDown": (event)=>{
                    if (event.defaultPrevented) {
                        return;
                    }
                    switch(event.key){
                        case "ArrowDown":
                        case "ArrowLeft":
                        case "ArrowRight":
                        case "ArrowUp":
                        case "End":
                        case "Home":
                            {
                                event.preventDefault();
                                resizeHandler(event);
                                break;
                            }
                        case "F6":
                            {
                                event.preventDefault();
                                const groupId = handleElement.getAttribute(DATA_ATTRIBUTES.groupId);
                                assert(groupId, 'No group element found for id "'.concat(groupId, '"'));
                                const handles = getResizeHandleElementsForGroup(groupId, panelGroupElement);
                                const index = getResizeHandleElementIndex(groupId, handleId, panelGroupElement);
                                assert(index !== null, 'No resize element found for id "'.concat(handleId, '"'));
                                const nextIndex = event.shiftKey ? index > 0 ? index - 1 : handles.length - 1 : index + 1 < handles.length ? index + 1 : 0;
                                const nextHandle = handles[nextIndex];
                                nextHandle.focus();
                                break;
                            }
                    }
                }
            }["useWindowSplitterResizeHandlerBehavior.useEffect.onKeyDown"];
            handleElement.addEventListener("keydown", onKeyDown);
            return ({
                "useWindowSplitterResizeHandlerBehavior.useEffect": ()=>{
                    handleElement.removeEventListener("keydown", onKeyDown);
                }
            })["useWindowSplitterResizeHandlerBehavior.useEffect"];
        }
    }["useWindowSplitterResizeHandlerBehavior.useEffect"], [
        panelGroupElement,
        disabled,
        handleId,
        resizeHandler
    ]);
}
function PanelResizeHandle(param) {
    let { children = null, className: classNameFromProps = "", disabled = false, hitAreaMargins, id: idFromProps, onBlur, onClick, onDragging, onFocus, onPointerDown, onPointerUp, style: styleFromProps = {}, tabIndex = 0, tagName: Type = "div", ...rest } = param;
    var _hitAreaMargins$coars, _hitAreaMargins$fine;
    const elementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Use a ref to guard against users passing inline props
    const callbacksRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])({
        onClick,
        onDragging,
        onPointerDown,
        onPointerUp
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PanelResizeHandle.useEffect": ()=>{
            callbacksRef.current.onClick = onClick;
            callbacksRef.current.onDragging = onDragging;
            callbacksRef.current.onPointerDown = onPointerDown;
            callbacksRef.current.onPointerUp = onPointerUp;
        }
    }["PanelResizeHandle.useEffect"]);
    const panelGroupContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useContext"])(PanelGroupContext);
    if (panelGroupContext === null) {
        throw Error("PanelResizeHandle components must be rendered within a PanelGroup container");
    }
    const { direction, groupId, registerResizeHandle: registerResizeHandleWithParentGroup, startDragging, stopDragging, panelGroupElement } = panelGroupContext;
    const resizeHandleId = useUniqueId(idFromProps);
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("inactive");
    const [isFocused, setIsFocused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [resizeHandler, setResizeHandler] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const committedValuesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])({
        state
    });
    useIsomorphicLayoutEffect({
        "PanelResizeHandle.useIsomorphicLayoutEffect": ()=>{
            committedValuesRef.current.state = state;
        }
    }["PanelResizeHandle.useIsomorphicLayoutEffect"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PanelResizeHandle.useEffect": ()=>{
            if (disabled) {
                setResizeHandler(null);
            } else {
                const resizeHandler = registerResizeHandleWithParentGroup(resizeHandleId);
                setResizeHandler({
                    "PanelResizeHandle.useEffect": ()=>resizeHandler
                }["PanelResizeHandle.useEffect"]);
            }
        }
    }["PanelResizeHandle.useEffect"], [
        disabled,
        resizeHandleId,
        registerResizeHandleWithParentGroup
    ]);
    // Extract hit area margins before passing them to the effect's dependency array
    // so that inline object values won't trigger re-renders
    const coarseHitAreaMargins = (_hitAreaMargins$coars = hitAreaMargins === null || hitAreaMargins === void 0 ? void 0 : hitAreaMargins.coarse) !== null && _hitAreaMargins$coars !== void 0 ? _hitAreaMargins$coars : 15;
    const fineHitAreaMargins = (_hitAreaMargins$fine = hitAreaMargins === null || hitAreaMargins === void 0 ? void 0 : hitAreaMargins.fine) !== null && _hitAreaMargins$fine !== void 0 ? _hitAreaMargins$fine : 5;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PanelResizeHandle.useEffect": ()=>{
            if (disabled || resizeHandler == null) {
                return;
            }
            const element = elementRef.current;
            assert(element, "Element ref not attached");
            let didMove = false;
            const setResizeHandlerState = {
                "PanelResizeHandle.useEffect.setResizeHandlerState": (action, isActive, event)=>{
                    if (!isActive) {
                        setState("inactive");
                        return;
                    }
                    switch(action){
                        case "down":
                            {
                                setState("drag");
                                didMove = false;
                                assert(event, 'Expected event to be defined for "down" action');
                                startDragging(resizeHandleId, event);
                                const { onDragging, onPointerDown } = callbacksRef.current;
                                onDragging === null || onDragging === void 0 ? void 0 : onDragging(true);
                                onPointerDown === null || onPointerDown === void 0 ? void 0 : onPointerDown();
                                break;
                            }
                        case "move":
                            {
                                const { state } = committedValuesRef.current;
                                didMove = true;
                                if (state !== "drag") {
                                    setState("hover");
                                }
                                assert(event, 'Expected event to be defined for "move" action');
                                resizeHandler(event);
                                break;
                            }
                        case "up":
                            {
                                setState("hover");
                                stopDragging();
                                const { onClick, onDragging, onPointerUp } = callbacksRef.current;
                                onDragging === null || onDragging === void 0 ? void 0 : onDragging(false);
                                onPointerUp === null || onPointerUp === void 0 ? void 0 : onPointerUp();
                                if (!didMove) {
                                    onClick === null || onClick === void 0 ? void 0 : onClick();
                                }
                                break;
                            }
                    }
                }
            }["PanelResizeHandle.useEffect.setResizeHandlerState"];
            return registerResizeHandle(resizeHandleId, element, direction, {
                coarse: coarseHitAreaMargins,
                fine: fineHitAreaMargins
            }, setResizeHandlerState);
        }
    }["PanelResizeHandle.useEffect"], [
        coarseHitAreaMargins,
        direction,
        disabled,
        fineHitAreaMargins,
        registerResizeHandleWithParentGroup,
        resizeHandleId,
        resizeHandler,
        startDragging,
        stopDragging
    ]);
    useWindowSplitterResizeHandlerBehavior({
        disabled,
        handleId: resizeHandleId,
        resizeHandler,
        panelGroupElement
    });
    const style = {
        touchAction: "none",
        userSelect: "none"
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createElement"])(Type, {
        ...rest,
        children,
        className: classNameFromProps,
        id: idFromProps,
        onBlur: ()=>{
            setIsFocused(false);
            onBlur === null || onBlur === void 0 ? void 0 : onBlur();
        },
        onFocus: ()=>{
            setIsFocused(true);
            onFocus === null || onFocus === void 0 ? void 0 : onFocus();
        },
        ref: elementRef,
        role: "separator",
        style: {
            ...style,
            ...styleFromProps
        },
        tabIndex,
        // CSS selectors
        [DATA_ATTRIBUTES.groupDirection]: direction,
        [DATA_ATTRIBUTES.groupId]: groupId,
        [DATA_ATTRIBUTES.resizeHandle]: "",
        [DATA_ATTRIBUTES.resizeHandleActive]: state === "drag" ? "pointer" : isFocused ? "keyboard" : undefined,
        [DATA_ATTRIBUTES.resizeHandleEnabled]: !disabled,
        [DATA_ATTRIBUTES.resizeHandleId]: resizeHandleId,
        [DATA_ATTRIBUTES.resizeHandleState]: state
    });
}
PanelResizeHandle.displayName = "PanelResizeHandle";
function usePanelGroupContext() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useContext"])(PanelGroupContext);
    return {
        direction: context === null || context === void 0 ? void 0 : context.direction,
        groupId: context === null || context === void 0 ? void 0 : context.groupId
    };
}
function getPanelElement(id) {
    let scope = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : document;
    const element = scope.querySelector('[data-panel-id="'.concat(id, '"]'));
    if (element) {
        return element;
    }
    return null;
}
function getPanelElementsForGroup(groupId) {
    let scope = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : document;
    return Array.from(scope.querySelectorAll('[data-panel][data-panel-group-id="'.concat(groupId, '"]')));
}
function getIntersectingRectangle(rectOne, rectTwo, strict) {
    if (!intersects(rectOne, rectTwo, strict)) {
        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
    }
    return {
        x: Math.max(rectOne.x, rectTwo.x),
        y: Math.max(rectOne.y, rectTwo.y),
        width: Math.min(rectOne.x + rectOne.width, rectTwo.x + rectTwo.width) - Math.max(rectOne.x, rectTwo.x),
        height: Math.min(rectOne.y + rectOne.height, rectTwo.y + rectTwo.height) - Math.max(rectOne.y, rectTwo.y)
    };
}
;
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/redux/dist/redux.mjs [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/utils/formatProdErrorMessage.ts
__turbopack_context__.s([
    "__DO_NOT_USE__ActionTypes",
    ()=>actionTypes_default,
    "applyMiddleware",
    ()=>applyMiddleware,
    "bindActionCreators",
    ()=>bindActionCreators,
    "combineReducers",
    ()=>combineReducers,
    "compose",
    ()=>compose,
    "createStore",
    ()=>createStore,
    "isAction",
    ()=>isAction,
    "isPlainObject",
    ()=>isPlainObject,
    "legacy_createStore",
    ()=>legacy_createStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
function formatProdErrorMessage(code) {
    return "Minified Redux error #".concat(code, "; visit https://redux.js.org/Errors?code=").concat(code, " for the full message or use the non-minified dev environment for full errors. ");
}
// src/utils/symbol-observable.ts
var $$observable = /* @__PURE__ */ (()=>typeof Symbol === "function" && Symbol.observable || "@@observable")();
var symbol_observable_default = $$observable;
// src/utils/actionTypes.ts
var randomString = ()=>Math.random().toString(36).substring(7).split("").join(".");
var ActionTypes = {
    INIT: "@@redux/INIT".concat(/* @__PURE__ */ randomString()),
    REPLACE: "@@redux/REPLACE".concat(/* @__PURE__ */ randomString()),
    PROBE_UNKNOWN_ACTION: ()=>"@@redux/PROBE_UNKNOWN_ACTION".concat(randomString())
};
var actionTypes_default = ActionTypes;
// src/utils/isPlainObject.ts
function isPlainObject(obj) {
    if (typeof obj !== "object" || obj === null) return false;
    let proto = obj;
    while(Object.getPrototypeOf(proto) !== null){
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(obj) === proto || Object.getPrototypeOf(obj) === null;
}
// src/utils/kindOf.ts
function miniKindOf(val) {
    if (val === void 0) return "undefined";
    if (val === null) return "null";
    const type = typeof val;
    switch(type){
        case "boolean":
        case "string":
        case "number":
        case "symbol":
        case "function":
            {
                return type;
            }
    }
    if (Array.isArray(val)) return "array";
    if (isDate(val)) return "date";
    if (isError(val)) return "error";
    const constructorName = ctorName(val);
    switch(constructorName){
        case "Symbol":
        case "Promise":
        case "WeakMap":
        case "WeakSet":
        case "Map":
        case "Set":
            return constructorName;
    }
    return Object.prototype.toString.call(val).slice(8, -1).toLowerCase().replace(/\s/g, "");
}
function ctorName(val) {
    return typeof val.constructor === "function" ? val.constructor.name : null;
}
function isError(val) {
    return val instanceof Error || typeof val.message === "string" && val.constructor && typeof val.constructor.stackTraceLimit === "number";
}
function isDate(val) {
    if (val instanceof Date) return true;
    return typeof val.toDateString === "function" && typeof val.getDate === "function" && typeof val.setDate === "function";
}
function kindOf(val) {
    let typeOfVal = typeof val;
    if ("TURBOPACK compile-time truthy", 1) {
        typeOfVal = miniKindOf(val);
    }
    return typeOfVal;
}
// src/createStore.ts
function createStore(reducer, preloadedState, enhancer) {
    if (typeof reducer !== "function") {
        throw new Error(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "Expected the root reducer to be a function. Instead, received: '".concat(kindOf(reducer), "'"));
    }
    if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") {
        throw new Error(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
    }
    if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
        enhancer = preloadedState;
        preloadedState = void 0;
    }
    if (typeof enhancer !== "undefined") {
        if (typeof enhancer !== "function") {
            throw new Error(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "Expected the enhancer to be a function. Instead, received: '".concat(kindOf(enhancer), "'"));
        }
        return enhancer(createStore)(reducer, preloadedState);
    }
    let currentReducer = reducer;
    let currentState = preloadedState;
    let currentListeners = /* @__PURE__ */ new Map();
    let nextListeners = currentListeners;
    let listenerIdCounter = 0;
    let isDispatching = false;
    function ensureCanMutateNextListeners() {
        if (nextListeners === currentListeners) {
            nextListeners = /* @__PURE__ */ new Map();
            currentListeners.forEach((listener, key)=>{
                nextListeners.set(key, listener);
            });
        }
    }
    function getState() {
        if (isDispatching) {
            throw new Error(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
        }
        return currentState;
    }
    function subscribe(listener) {
        if (typeof listener !== "function") {
            throw new Error(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "Expected the listener to be a function. Instead, received: '".concat(kindOf(listener), "'"));
        }
        if (isDispatching) {
            throw new Error(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
        }
        let isSubscribed = true;
        ensureCanMutateNextListeners();
        const listenerId = listenerIdCounter++;
        nextListeners.set(listenerId, listener);
        return function unsubscribe() {
            if (!isSubscribed) {
                return;
            }
            if (isDispatching) {
                throw new Error(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
            }
            isSubscribed = false;
            ensureCanMutateNextListeners();
            nextListeners.delete(listenerId);
            currentListeners = null;
        };
    }
    function dispatch(action) {
        if (!isPlainObject(action)) {
            throw new Error(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "Actions must be plain objects. Instead, the actual type was: '".concat(kindOf(action), "'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples."));
        }
        if (typeof action.type === "undefined") {
            throw new Error(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
        }
        if (typeof action.type !== "string") {
            throw new Error(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'Action "type" property must be a string. Instead, the actual type was: \''.concat(kindOf(action.type), "'. Value was: '").concat(action.type, "' (stringified)"));
        }
        if (isDispatching) {
            throw new Error(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "Reducers may not dispatch actions.");
        }
        try {
            isDispatching = true;
            currentState = currentReducer(currentState, action);
        } finally{
            isDispatching = false;
        }
        const listeners = currentListeners = nextListeners;
        listeners.forEach((listener)=>{
            listener();
        });
        return action;
    }
    function replaceReducer(nextReducer) {
        if (typeof nextReducer !== "function") {
            throw new Error(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "Expected the nextReducer to be a function. Instead, received: '".concat(kindOf(nextReducer)));
        }
        currentReducer = nextReducer;
        dispatch({
            type: actionTypes_default.REPLACE
        });
    }
    function observable() {
        const outerSubscribe = subscribe;
        return {
            /**
       * The minimal observable subscription method.
       * @param observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */ subscribe (observer) {
                if (typeof observer !== "object" || observer === null) {
                    throw new Error(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "Expected the observer to be an object. Instead, received: '".concat(kindOf(observer), "'"));
                }
                function observeState() {
                    const observerAsObserver = observer;
                    if (observerAsObserver.next) {
                        observerAsObserver.next(getState());
                    }
                }
                observeState();
                const unsubscribe = outerSubscribe(observeState);
                return {
                    unsubscribe
                };
            },
            [symbol_observable_default] () {
                return this;
            }
        };
    }
    dispatch({
        type: actionTypes_default.INIT
    });
    const store = {
        dispatch,
        subscribe,
        getState,
        replaceReducer,
        [symbol_observable_default]: observable
    };
    return store;
}
function legacy_createStore(reducer, preloadedState, enhancer) {
    return createStore(reducer, preloadedState, enhancer);
}
// src/utils/warning.ts
function warning(message) {
    if (typeof console !== "undefined" && typeof console.error === "function") {
        console.error(message);
    }
    try {
        throw new Error(message);
    } catch (e) {}
}
// src/combineReducers.ts
function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
    const reducerKeys = Object.keys(reducers);
    const argumentName = action && action.type === actionTypes_default.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
    if (reducerKeys.length === 0) {
        return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
    }
    if (!isPlainObject(inputState)) {
        return "The ".concat(argumentName, ' has unexpected type of "').concat(kindOf(inputState), '". Expected argument to be an object with the following keys: "').concat(reducerKeys.join('", "'), '"');
    }
    const unexpectedKeys = Object.keys(inputState).filter((key)=>!reducers.hasOwnProperty(key) && !unexpectedKeyCache[key]);
    unexpectedKeys.forEach((key)=>{
        unexpectedKeyCache[key] = true;
    });
    if (action && action.type === actionTypes_default.REPLACE) return;
    if (unexpectedKeys.length > 0) {
        return "Unexpected ".concat(unexpectedKeys.length > 1 ? "keys" : "key", ' "').concat(unexpectedKeys.join('", "'), '" found in ').concat(argumentName, '. Expected to find one of the known reducer keys instead: "').concat(reducerKeys.join('", "'), '". Unexpected keys will be ignored.');
    }
}
function assertReducerShape(reducers) {
    Object.keys(reducers).forEach((key)=>{
        const reducer = reducers[key];
        const initialState = reducer(void 0, {
            type: actionTypes_default.INIT
        });
        if (typeof initialState === "undefined") {
            throw new Error(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'The slice reducer for key "'.concat(key, "\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined."));
        }
        if (typeof reducer(void 0, {
            type: actionTypes_default.PROBE_UNKNOWN_ACTION()
        }) === "undefined") {
            throw new Error(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'The slice reducer for key "'.concat(key, "\" returned undefined when probed with a random type. Don't try to handle '").concat(actionTypes_default.INIT, '\' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.'));
        }
    });
}
function combineReducers(reducers) {
    const reducerKeys = Object.keys(reducers);
    const finalReducers = {};
    for(let i = 0; i < reducerKeys.length; i++){
        const key = reducerKeys[i];
        if ("TURBOPACK compile-time truthy", 1) {
            if (typeof reducers[key] === "undefined") {
                warning('No reducer provided for key "'.concat(key, '"'));
            }
        }
        if (typeof reducers[key] === "function") {
            finalReducers[key] = reducers[key];
        }
    }
    const finalReducerKeys = Object.keys(finalReducers);
    let unexpectedKeyCache;
    if (("TURBOPACK compile-time value", "development") !== "production") {
        unexpectedKeyCache = {};
    }
    let shapeAssertionError;
    try {
        assertReducerShape(finalReducers);
    } catch (e) {
        shapeAssertionError = e;
    }
    return function combination() {
        let state = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, action = arguments.length > 1 ? arguments[1] : void 0;
        if (shapeAssertionError) {
            throw shapeAssertionError;
        }
        if ("TURBOPACK compile-time truthy", 1) {
            const warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
            if (warningMessage) {
                warning(warningMessage);
            }
        }
        let hasChanged = false;
        const nextState = {};
        for(let i = 0; i < finalReducerKeys.length; i++){
            const key = finalReducerKeys[i];
            const reducer = finalReducers[key];
            const previousStateForKey = state[key];
            const nextStateForKey = reducer(previousStateForKey, action);
            if (typeof nextStateForKey === "undefined") {
                const actionType = action && action.type;
                throw new Error(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "When called with an action of type ".concat(actionType ? '"'.concat(String(actionType), '"') : "(unknown type)", ', the slice reducer for key "').concat(key, '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'));
            }
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
        return hasChanged ? nextState : state;
    };
}
// src/bindActionCreators.ts
function bindActionCreator(actionCreator, dispatch) {
    return function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return dispatch(actionCreator.apply(this, args));
    };
}
function bindActionCreators(actionCreators, dispatch) {
    if (typeof actionCreators === "function") {
        return bindActionCreator(actionCreators, dispatch);
    }
    if (typeof actionCreators !== "object" || actionCreators === null) {
        throw new Error(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "bindActionCreators expected an object or a function, but instead received: '".concat(kindOf(actionCreators), '\'. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'));
    }
    const boundActionCreators = {};
    for(const key in actionCreators){
        const actionCreator = actionCreators[key];
        if (typeof actionCreator === "function") {
            boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
        }
    }
    return boundActionCreators;
}
// src/compose.ts
function compose() {
    for(var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++){
        funcs[_key] = arguments[_key];
    }
    if (funcs.length === 0) {
        return (arg)=>arg;
    }
    if (funcs.length === 1) {
        return funcs[0];
    }
    return funcs.reduce((a, b)=>function() {
            for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                args[_key] = arguments[_key];
            }
            return a(b(...args));
        });
}
// src/applyMiddleware.ts
function applyMiddleware() {
    for(var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++){
        middlewares[_key] = arguments[_key];
    }
    return (createStore2)=>(reducer, preloadedState)=>{
            const store = createStore2(reducer, preloadedState);
            let dispatch = ()=>{
                throw new Error(("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
            };
            const middlewareAPI = {
                getState: store.getState,
                dispatch: function(action) {
                    for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                        args[_key - 1] = arguments[_key];
                    }
                    return dispatch(action, ...args);
                }
            };
            const chain = middlewares.map((middleware)=>middleware(middlewareAPI));
            dispatch = compose(...chain)(store.dispatch);
            return {
                ...store,
                dispatch
            };
        };
}
// src/utils/isAction.ts
function isAction(action) {
    return isPlainObject(action) && "type" in action && typeof action.type === "string";
}
;
 //# sourceMappingURL=redux.mjs.map
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/use-sync-external-store/cjs/use-sync-external-store-with-selector.development.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * use-sync-external-store-with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function is(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var React = __turbopack_context__.r("[project]/Desktop/finance-type/my-cv-app/node_modules/react/index.js [client] (ecmascript)"), objectIs = "function" === typeof Object.is ? Object.is : is, useSyncExternalStore = React.useSyncExternalStore, useRef = React.useRef, useEffect = React.useEffect, useMemo = React.useMemo, useDebugValue = React.useDebugValue;
    exports.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
        var instRef = useRef(null);
        if (null === instRef.current) {
            var inst = {
                hasValue: !1,
                value: null
            };
            instRef.current = inst;
        } else inst = instRef.current;
        instRef = useMemo(function() {
            function memoizedSelector(nextSnapshot) {
                if (!hasMemo) {
                    hasMemo = !0;
                    memoizedSnapshot = nextSnapshot;
                    nextSnapshot = selector(nextSnapshot);
                    if (void 0 !== isEqual && inst.hasValue) {
                        var currentSelection = inst.value;
                        if (isEqual(currentSelection, nextSnapshot)) return memoizedSelection = currentSelection;
                    }
                    return memoizedSelection = nextSnapshot;
                }
                currentSelection = memoizedSelection;
                if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
                var nextSelection = selector(nextSnapshot);
                if (void 0 !== isEqual && isEqual(currentSelection, nextSelection)) return memoizedSnapshot = nextSnapshot, currentSelection;
                memoizedSnapshot = nextSnapshot;
                return memoizedSelection = nextSelection;
            }
            var hasMemo = !1, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
            return [
                function() {
                    return memoizedSelector(getSnapshot());
                },
                null === maybeGetServerSnapshot ? void 0 : function() {
                    return memoizedSelector(maybeGetServerSnapshot());
                }
            ];
        }, [
            getSnapshot,
            getServerSnapshot,
            selector,
            isEqual
        ]);
        var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
        useEffect(function() {
            inst.hasValue = !0;
            inst.value = value;
        }, [
            value
        ]);
        useDebugValue(value);
        return value;
    };
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
}();
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/use-sync-external-store/with-selector.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Desktop/finance-type/my-cv-app/node_modules/use-sync-external-store/cjs/use-sync-external-store-with-selector.development.js [client] (ecmascript)");
}
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/react-redux/dist/react-redux.mjs [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/utils/react.ts
__turbopack_context__.s([
    "Provider",
    ()=>Provider_default,
    "ReactReduxContext",
    ()=>ReactReduxContext,
    "batch",
    ()=>batch,
    "connect",
    ()=>connect_default,
    "createDispatchHook",
    ()=>createDispatchHook,
    "createSelectorHook",
    ()=>createSelectorHook,
    "createStoreHook",
    ()=>createStoreHook,
    "shallowEqual",
    ()=>shallowEqual,
    "useDispatch",
    ()=>useDispatch,
    "useSelector",
    ()=>useSelector,
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/react/index.js [client] (ecmascript)");
// src/hooks/useSelector.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$use$2d$sync$2d$external$2d$store$2f$with$2d$selector$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/use-sync-external-store/with-selector.js [client] (ecmascript)");
;
// src/utils/react-is.ts
var IS_REACT_19 = /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["version"].startsWith("19");
var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for(IS_REACT_19 ? "react.transitional.element" : "react.element");
var REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal");
var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
var REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode");
var REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler");
var REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer");
var REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context");
var REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref");
var REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense");
var REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list");
var REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo");
var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
var REACT_OFFSCREEN_TYPE = /* @__PURE__ */ Symbol.for("react.offscreen");
var REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference");
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Memo = REACT_MEMO_TYPE;
function isValidElementType(type) {
    return typeof type === "string" || typeof type === "function" || type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_OFFSCREEN_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_CONSUMER_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_CLIENT_REFERENCE || type.getModuleId !== void 0) ? true : false;
}
function typeOf(object) {
    if (typeof object === "object" && object !== null) {
        const { $$typeof } = object;
        switch($$typeof){
            case REACT_ELEMENT_TYPE:
                switch(object = object.type, object){
                    case REACT_FRAGMENT_TYPE:
                    case REACT_PROFILER_TYPE:
                    case REACT_STRICT_MODE_TYPE:
                    case REACT_SUSPENSE_TYPE:
                    case REACT_SUSPENSE_LIST_TYPE:
                        return object;
                    default:
                        switch(object = object && object.$$typeof, object){
                            case REACT_CONTEXT_TYPE:
                            case REACT_FORWARD_REF_TYPE:
                            case REACT_LAZY_TYPE:
                            case REACT_MEMO_TYPE:
                                return object;
                            case REACT_CONSUMER_TYPE:
                                return object;
                            default:
                                return $$typeof;
                        }
                }
            case REACT_PORTAL_TYPE:
                return $$typeof;
        }
    }
}
function isContextConsumer(object) {
    return IS_REACT_19 ? typeOf(object) === REACT_CONSUMER_TYPE : typeOf(object) === REACT_CONTEXT_TYPE;
}
function isMemo(object) {
    return typeOf(object) === REACT_MEMO_TYPE;
}
// src/utils/warning.ts
function warning(message) {
    if (typeof console !== "undefined" && typeof console.error === "function") {
        console.error(message);
    }
    try {
        throw new Error(message);
    } catch (e) {}
}
// src/connect/verifySubselectors.ts
function verify(selector, methodName) {
    if (!selector) {
        throw new Error("Unexpected value for ".concat(methodName, " in connect."));
    } else if (methodName === "mapStateToProps" || methodName === "mapDispatchToProps") {
        if (!Object.prototype.hasOwnProperty.call(selector, "dependsOnOwnProps")) {
            warning("The selector for ".concat(methodName, " of connect did not specify a value for dependsOnOwnProps."));
        }
    }
}
function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps) {
    verify(mapStateToProps, "mapStateToProps");
    verify(mapDispatchToProps, "mapDispatchToProps");
    verify(mergeProps, "mergeProps");
}
// src/connect/selectorFactory.ts
function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, param) {
    let { areStatesEqual, areOwnPropsEqual, areStatePropsEqual } = param;
    let hasRunAtLeastOnce = false;
    let state;
    let ownProps;
    let stateProps;
    let dispatchProps;
    let mergedProps;
    function handleFirstCall(firstState, firstOwnProps) {
        state = firstState;
        ownProps = firstOwnProps;
        stateProps = mapStateToProps(state, ownProps);
        dispatchProps = mapDispatchToProps(dispatch, ownProps);
        mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
        hasRunAtLeastOnce = true;
        return mergedProps;
    }
    function handleNewPropsAndNewState() {
        stateProps = mapStateToProps(state, ownProps);
        if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
        mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
        return mergedProps;
    }
    function handleNewProps() {
        if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);
        if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
        mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
        return mergedProps;
    }
    function handleNewState() {
        const nextStateProps = mapStateToProps(state, ownProps);
        const statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
        stateProps = nextStateProps;
        if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
        return mergedProps;
    }
    function handleSubsequentCalls(nextState, nextOwnProps) {
        const propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
        const stateChanged = !areStatesEqual(nextState, state, nextOwnProps, ownProps);
        state = nextState;
        ownProps = nextOwnProps;
        if (propsChanged && stateChanged) return handleNewPropsAndNewState();
        if (propsChanged) return handleNewProps();
        if (stateChanged) return handleNewState();
        return mergedProps;
    }
    return function pureFinalPropsSelector(nextState, nextOwnProps) {
        return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
    };
}
function finalPropsSelectorFactory(dispatch, param) {
    let { initMapStateToProps, initMapDispatchToProps, initMergeProps, ...options } = param;
    const mapStateToProps = initMapStateToProps(dispatch, options);
    const mapDispatchToProps = initMapDispatchToProps(dispatch, options);
    const mergeProps = initMergeProps(dispatch, options);
    if ("TURBOPACK compile-time truthy", 1) {
        verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps);
    }
    return pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
}
// src/utils/bindActionCreators.ts
function bindActionCreators(actionCreators, dispatch) {
    const boundActionCreators = {};
    for(const key in actionCreators){
        const actionCreator = actionCreators[key];
        if (typeof actionCreator === "function") {
            boundActionCreators[key] = function() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                return dispatch(actionCreator(...args));
            };
        }
    }
    return boundActionCreators;
}
// src/utils/isPlainObject.ts
function isPlainObject(obj) {
    if (typeof obj !== "object" || obj === null) return false;
    const proto = Object.getPrototypeOf(obj);
    if (proto === null) return true;
    let baseProto = proto;
    while(Object.getPrototypeOf(baseProto) !== null){
        baseProto = Object.getPrototypeOf(baseProto);
    }
    return proto === baseProto;
}
// src/utils/verifyPlainObject.ts
function verifyPlainObject(value, displayName, methodName) {
    if (!isPlainObject(value)) {
        warning("".concat(methodName, "() in ").concat(displayName, " must return a plain object. Instead received ").concat(value, "."));
    }
}
// src/connect/wrapMapToProps.ts
function wrapMapToPropsConstant(getConstant) {
    return function initConstantSelector(dispatch) {
        const constant = getConstant(dispatch);
        function constantSelector() {
            return constant;
        }
        constantSelector.dependsOnOwnProps = false;
        return constantSelector;
    };
}
function getDependsOnOwnProps(mapToProps) {
    return mapToProps.dependsOnOwnProps ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
}
function wrapMapToPropsFunc(mapToProps, methodName) {
    return function initProxySelector(dispatch, param) {
        let { displayName } = param;
        const proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
            return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch, void 0);
        };
        proxy.dependsOnOwnProps = true;
        proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
            proxy.mapToProps = mapToProps;
            proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
            let props = proxy(stateOrDispatch, ownProps);
            if (typeof props === "function") {
                proxy.mapToProps = props;
                proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
                props = proxy(stateOrDispatch, ownProps);
            }
            if ("TURBOPACK compile-time truthy", 1) verifyPlainObject(props, displayName, methodName);
            return props;
        };
        return proxy;
    };
}
// src/connect/invalidArgFactory.ts
function createInvalidArgFactory(arg, name) {
    return (dispatch, options)=>{
        throw new Error("Invalid value of type ".concat(typeof arg, " for ").concat(name, " argument when connecting component ").concat(options.wrappedComponentName, "."));
    };
}
// src/connect/mapDispatchToProps.ts
function mapDispatchToPropsFactory(mapDispatchToProps) {
    return mapDispatchToProps && typeof mapDispatchToProps === "object" ? wrapMapToPropsConstant((dispatch)=>// @ts-ignore
        bindActionCreators(mapDispatchToProps, dispatch)) : !mapDispatchToProps ? wrapMapToPropsConstant((dispatch)=>({
            dispatch
        })) : typeof mapDispatchToProps === "function" ? // @ts-ignore
    wrapMapToPropsFunc(mapDispatchToProps, "mapDispatchToProps") : createInvalidArgFactory(mapDispatchToProps, "mapDispatchToProps");
}
// src/connect/mapStateToProps.ts
function mapStateToPropsFactory(mapStateToProps) {
    return !mapStateToProps ? wrapMapToPropsConstant(()=>({})) : typeof mapStateToProps === "function" ? // @ts-ignore
    wrapMapToPropsFunc(mapStateToProps, "mapStateToProps") : createInvalidArgFactory(mapStateToProps, "mapStateToProps");
}
// src/connect/mergeProps.ts
function defaultMergeProps(stateProps, dispatchProps, ownProps) {
    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps
    };
}
function wrapMergePropsFunc(mergeProps) {
    return function initMergePropsProxy(dispatch, param) {
        let { displayName, areMergedPropsEqual } = param;
        let hasRunOnce = false;
        let mergedProps;
        return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
            const nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);
            if (hasRunOnce) {
                if (!areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
            } else {
                hasRunOnce = true;
                mergedProps = nextMergedProps;
                if ("TURBOPACK compile-time truthy", 1) verifyPlainObject(mergedProps, displayName, "mergeProps");
            }
            return mergedProps;
        };
    };
}
function mergePropsFactory(mergeProps) {
    return !mergeProps ? ()=>defaultMergeProps : typeof mergeProps === "function" ? wrapMergePropsFunc(mergeProps) : createInvalidArgFactory(mergeProps, "mergeProps");
}
// src/utils/batch.ts
function defaultNoopBatch(callback) {
    callback();
}
// src/utils/Subscription.ts
function createListenerCollection() {
    let first = null;
    let last = null;
    return {
        clear () {
            first = null;
            last = null;
        },
        notify () {
            defaultNoopBatch(()=>{
                let listener = first;
                while(listener){
                    listener.callback();
                    listener = listener.next;
                }
            });
        },
        get () {
            const listeners = [];
            let listener = first;
            while(listener){
                listeners.push(listener);
                listener = listener.next;
            }
            return listeners;
        },
        subscribe (callback) {
            let isSubscribed = true;
            const listener = last = {
                callback,
                next: null,
                prev: last
            };
            if (listener.prev) {
                listener.prev.next = listener;
            } else {
                first = listener;
            }
            return function unsubscribe() {
                if (!isSubscribed || first === null) return;
                isSubscribed = false;
                if (listener.next) {
                    listener.next.prev = listener.prev;
                } else {
                    last = listener.prev;
                }
                if (listener.prev) {
                    listener.prev.next = listener.next;
                } else {
                    first = listener.next;
                }
            };
        }
    };
}
var nullListeners = {
    notify () {},
    get: ()=>[]
};
function createSubscription(store, parentSub) {
    let unsubscribe;
    let listeners = nullListeners;
    let subscriptionsAmount = 0;
    let selfSubscribed = false;
    function addNestedSub(listener) {
        trySubscribe();
        const cleanupListener = listeners.subscribe(listener);
        let removed = false;
        return ()=>{
            if (!removed) {
                removed = true;
                cleanupListener();
                tryUnsubscribe();
            }
        };
    }
    function notifyNestedSubs() {
        listeners.notify();
    }
    function handleChangeWrapper() {
        if (subscription.onStateChange) {
            subscription.onStateChange();
        }
    }
    function isSubscribed() {
        return selfSubscribed;
    }
    function trySubscribe() {
        subscriptionsAmount++;
        if (!unsubscribe) {
            unsubscribe = parentSub ? parentSub.addNestedSub(handleChangeWrapper) : store.subscribe(handleChangeWrapper);
            listeners = createListenerCollection();
        }
    }
    function tryUnsubscribe() {
        subscriptionsAmount--;
        if (unsubscribe && subscriptionsAmount === 0) {
            unsubscribe();
            unsubscribe = void 0;
            listeners.clear();
            listeners = nullListeners;
        }
    }
    function trySubscribeSelf() {
        if (!selfSubscribed) {
            selfSubscribed = true;
            trySubscribe();
        }
    }
    function tryUnsubscribeSelf() {
        if (selfSubscribed) {
            selfSubscribed = false;
            tryUnsubscribe();
        }
    }
    const subscription = {
        addNestedSub,
        notifyNestedSubs,
        handleChangeWrapper,
        isSubscribed,
        trySubscribe: trySubscribeSelf,
        tryUnsubscribe: tryUnsubscribeSelf,
        getListeners: ()=>listeners
    };
    return subscription;
}
// src/utils/useIsomorphicLayoutEffect.ts
var canUseDOM = ()=>!!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
var isDOM = /* @__PURE__ */ canUseDOM();
var isRunningInReactNative = ()=>typeof navigator !== "undefined" && navigator.product === "ReactNative";
var isReactNative = /* @__PURE__ */ isRunningInReactNative();
var getUseIsomorphicLayoutEffect = ()=>isDOM || isReactNative ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useLayoutEffect"] : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"];
var useIsomorphicLayoutEffect = /* @__PURE__ */ getUseIsomorphicLayoutEffect();
// src/utils/shallowEqual.ts
function is(x, y) {
    if (x === y) {
        return x !== 0 || y !== 0 || 1 / x === 1 / y;
    } else {
        return x !== x && y !== y;
    }
}
function shallowEqual(objA, objB) {
    if (is(objA, objB)) return true;
    if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
        return false;
    }
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;
    for(let i = 0; i < keysA.length; i++){
        if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
            return false;
        }
    }
    return true;
}
// src/utils/hoistStatics.ts
var REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
};
var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};
var FORWARD_REF_STATICS = {
    $$typeof: true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
};
var MEMO_STATICS = {
    $$typeof: true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true
};
var TYPE_STATICS = {
    [ForwardRef]: FORWARD_REF_STATICS,
    [Memo]: MEMO_STATICS
};
function getStatics(component) {
    if (isMemo(component)) {
        return MEMO_STATICS;
    }
    return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
}
var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent) {
    if (typeof sourceComponent !== "string") {
        if (objectPrototype) {
            const inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent);
            }
        }
        let keys = getOwnPropertyNames(sourceComponent);
        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }
        const targetStatics = getStatics(targetComponent);
        const sourceStatics = getStatics(sourceComponent);
        for(let i = 0; i < keys.length; ++i){
            const key = keys[i];
            if (!KNOWN_STATICS[key] && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
                const descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try {
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }
    }
    return targetComponent;
}
// src/components/Context.ts
var ContextKey = /* @__PURE__ */ Symbol.for("react-redux-context");
var gT = typeof globalThis !== "undefined" ? globalThis : /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */ {};
function getContext() {
    var _gT, _ContextKey;
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createContext"]) return {};
    var _;
    const contextMap = (_ = (_gT = gT)[_ContextKey = ContextKey]) !== null && _ !== void 0 ? _ : _gT[_ContextKey] = /* @__PURE__ */ new Map();
    let realContext = contextMap.get(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createContext"]);
    if (!realContext) {
        realContext = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createContext"](null);
        if ("TURBOPACK compile-time truthy", 1) {
            realContext.displayName = "ReactRedux";
        }
        contextMap.set(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createContext"], realContext);
    }
    return realContext;
}
var ReactReduxContext = /* @__PURE__ */ getContext();
// src/components/connect.tsx
var NO_SUBSCRIPTION_ARRAY = [
    null,
    null
];
var stringifyComponent = (Comp)=>{
    try {
        return JSON.stringify(Comp);
    } catch (err) {
        return String(Comp);
    }
};
function useIsomorphicLayoutEffectWithArgs(effectFunc, effectArgs, dependencies) {
    useIsomorphicLayoutEffect({
        "useIsomorphicLayoutEffectWithArgs.useIsomorphicLayoutEffect": ()=>effectFunc(...effectArgs)
    }["useIsomorphicLayoutEffectWithArgs.useIsomorphicLayoutEffect"], dependencies);
}
function captureWrapperProps(lastWrapperProps, lastChildProps, renderIsScheduled, wrapperProps, childPropsFromStoreUpdate, notifyNestedSubs) {
    lastWrapperProps.current = wrapperProps;
    renderIsScheduled.current = false;
    if (childPropsFromStoreUpdate.current) {
        childPropsFromStoreUpdate.current = null;
        notifyNestedSubs();
    }
}
function subscribeUpdates(shouldHandleStateChanges, store, subscription, childPropsSelector, lastWrapperProps, lastChildProps, renderIsScheduled, isMounted, childPropsFromStoreUpdate, notifyNestedSubs, additionalSubscribeListener) {
    if (!shouldHandleStateChanges) return ()=>{};
    let didUnsubscribe = false;
    let lastThrownError = null;
    const checkForUpdates = ()=>{
        if (didUnsubscribe || !isMounted.current) {
            return;
        }
        const latestStoreState = store.getState();
        let newChildProps, error;
        try {
            newChildProps = childPropsSelector(latestStoreState, lastWrapperProps.current);
        } catch (e) {
            error = e;
            lastThrownError = e;
        }
        if (!error) {
            lastThrownError = null;
        }
        if (newChildProps === lastChildProps.current) {
            if (!renderIsScheduled.current) {
                notifyNestedSubs();
            }
        } else {
            lastChildProps.current = newChildProps;
            childPropsFromStoreUpdate.current = newChildProps;
            renderIsScheduled.current = true;
            additionalSubscribeListener();
        }
    };
    subscription.onStateChange = checkForUpdates;
    subscription.trySubscribe();
    checkForUpdates();
    const unsubscribeWrapper = ()=>{
        didUnsubscribe = true;
        subscription.tryUnsubscribe();
        subscription.onStateChange = null;
        if (lastThrownError) {
            throw lastThrownError;
        }
    };
    return unsubscribeWrapper;
}
function strictEqual(a, b) {
    return a === b;
}
var hasWarnedAboutDeprecatedPureOption = false;
function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
    let { // The `pure` option has been removed, so TS doesn't like us destructuring this to check its existence.
    // @ts-ignore
    pure, areStatesEqual = strictEqual, areOwnPropsEqual = shallowEqual, areStatePropsEqual = shallowEqual, areMergedPropsEqual = shallowEqual, // use React's forwardRef to expose a ref of the wrapped component
    forwardRef = false, // the context consumer to use
    context = ReactReduxContext } = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    if ("TURBOPACK compile-time truthy", 1) {
        if (pure !== void 0 && !hasWarnedAboutDeprecatedPureOption) {
            hasWarnedAboutDeprecatedPureOption = true;
            warning('The `pure` option has been removed. `connect` is now always a "pure/memoized" component');
        }
    }
    const Context = context;
    const initMapStateToProps = mapStateToPropsFactory(mapStateToProps);
    const initMapDispatchToProps = mapDispatchToPropsFactory(mapDispatchToProps);
    const initMergeProps = mergePropsFactory(mergeProps);
    const shouldHandleStateChanges = Boolean(mapStateToProps);
    const wrapWithConnect = (WrappedComponent)=>{
        if ("TURBOPACK compile-time truthy", 1) {
            const isValid = /* @__PURE__ */ isValidElementType(WrappedComponent);
            if (!isValid) throw new Error("You must pass a component to the function returned by connect. Instead received ".concat(stringifyComponent(WrappedComponent)));
        }
        const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || "Component";
        const displayName = "Connect(".concat(wrappedComponentName, ")");
        const selectorFactoryOptions = {
            shouldHandleStateChanges,
            displayName,
            wrappedComponentName,
            WrappedComponent,
            // @ts-ignore
            initMapStateToProps,
            initMapDispatchToProps,
            initMergeProps,
            areStatesEqual,
            areStatePropsEqual,
            areOwnPropsEqual,
            areMergedPropsEqual
        };
        function ConnectFunction(props) {
            const [propsContext, reactReduxForwardedRef, wrapperProps] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"]({
                "connect.wrapWithConnect.ConnectFunction.useMemo": ()=>{
                    const { reactReduxForwardedRef: reactReduxForwardedRef2, ...wrapperProps2 } = props;
                    return [
                        props.context,
                        reactReduxForwardedRef2,
                        wrapperProps2
                    ];
                }
            }["connect.wrapWithConnect.ConnectFunction.useMemo"], [
                props
            ]);
            const ContextToUse = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"]({
                "connect.wrapWithConnect.ConnectFunction.useMemo[ContextToUse]": ()=>{
                    let ResultContext = Context;
                    if (propsContext === null || propsContext === void 0 ? void 0 : propsContext.Consumer) {
                        if ("TURBOPACK compile-time truthy", 1) {
                            const isValid = /* @__PURE__ */ isContextConsumer(// @ts-ignore
                            /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createElement"](propsContext.Consumer, null));
                            if (!isValid) {
                                throw new Error("You must pass a valid React context consumer as `props.context`");
                            }
                            ResultContext = propsContext;
                        }
                    }
                    return ResultContext;
                }
            }["connect.wrapWithConnect.ConnectFunction.useMemo[ContextToUse]"], [
                propsContext,
                Context
            ]);
            const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useContext"](ContextToUse);
            const didStoreComeFromProps = Boolean(props.store) && Boolean(props.store.getState) && Boolean(props.store.dispatch);
            const didStoreComeFromContext = Boolean(contextValue) && Boolean(contextValue.store);
            if (("TURBOPACK compile-time value", "development") !== "production" && !didStoreComeFromProps && !didStoreComeFromContext) {
                throw new Error('Could not find "store" in the context of "'.concat(displayName, '". Either wrap the root component in a <Provider>, or pass a custom React context provider to <Provider> and the corresponding React context consumer to ').concat(displayName, " in connect options."));
            }
            const store = didStoreComeFromProps ? props.store : contextValue.store;
            const getServerState = didStoreComeFromContext ? contextValue.getServerState : store.getState;
            const childPropsSelector = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"]({
                "connect.wrapWithConnect.ConnectFunction.useMemo[childPropsSelector]": ()=>{
                    return finalPropsSelectorFactory(store.dispatch, selectorFactoryOptions);
                }
            }["connect.wrapWithConnect.ConnectFunction.useMemo[childPropsSelector]"], [
                store
            ]);
            const [subscription, notifyNestedSubs] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"]({
                "connect.wrapWithConnect.ConnectFunction.useMemo": ()=>{
                    if (!shouldHandleStateChanges) return NO_SUBSCRIPTION_ARRAY;
                    const subscription2 = createSubscription(store, didStoreComeFromProps ? void 0 : contextValue.subscription);
                    const notifyNestedSubs2 = subscription2.notifyNestedSubs.bind(subscription2);
                    return [
                        subscription2,
                        notifyNestedSubs2
                    ];
                }
            }["connect.wrapWithConnect.ConnectFunction.useMemo"], [
                store,
                didStoreComeFromProps,
                contextValue
            ]);
            const overriddenContextValue = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"]({
                "connect.wrapWithConnect.ConnectFunction.useMemo[overriddenContextValue]": ()=>{
                    if (didStoreComeFromProps) {
                        return contextValue;
                    }
                    return {
                        ...contextValue,
                        subscription
                    };
                }
            }["connect.wrapWithConnect.ConnectFunction.useMemo[overriddenContextValue]"], [
                didStoreComeFromProps,
                contextValue,
                subscription
            ]);
            const lastChildProps = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"](void 0);
            const lastWrapperProps = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"](wrapperProps);
            const childPropsFromStoreUpdate = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"](void 0);
            const renderIsScheduled = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"](false);
            const isMounted = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"](false);
            const latestSubscriptionCallbackError = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"](void 0);
            useIsomorphicLayoutEffect({
                "connect.wrapWithConnect.ConnectFunction.useIsomorphicLayoutEffect": ()=>{
                    isMounted.current = true;
                    return ({
                        "connect.wrapWithConnect.ConnectFunction.useIsomorphicLayoutEffect": ()=>{
                            isMounted.current = false;
                        }
                    })["connect.wrapWithConnect.ConnectFunction.useIsomorphicLayoutEffect"];
                }
            }["connect.wrapWithConnect.ConnectFunction.useIsomorphicLayoutEffect"], []);
            const actualChildPropsSelector = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"]({
                "connect.wrapWithConnect.ConnectFunction.useMemo[actualChildPropsSelector]": ()=>{
                    const selector = {
                        "connect.wrapWithConnect.ConnectFunction.useMemo[actualChildPropsSelector].selector": ()=>{
                            if (childPropsFromStoreUpdate.current && wrapperProps === lastWrapperProps.current) {
                                return childPropsFromStoreUpdate.current;
                            }
                            return childPropsSelector(store.getState(), wrapperProps);
                        }
                    }["connect.wrapWithConnect.ConnectFunction.useMemo[actualChildPropsSelector].selector"];
                    return selector;
                }
            }["connect.wrapWithConnect.ConnectFunction.useMemo[actualChildPropsSelector]"], [
                store,
                wrapperProps
            ]);
            const subscribeForReact = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"]({
                "connect.wrapWithConnect.ConnectFunction.useMemo[subscribeForReact]": ()=>{
                    const subscribe = {
                        "connect.wrapWithConnect.ConnectFunction.useMemo[subscribeForReact].subscribe": (reactListener)=>{
                            if (!subscription) {
                                return ({
                                    "connect.wrapWithConnect.ConnectFunction.useMemo[subscribeForReact].subscribe": ()=>{}
                                })["connect.wrapWithConnect.ConnectFunction.useMemo[subscribeForReact].subscribe"];
                            }
                            return subscribeUpdates(shouldHandleStateChanges, store, subscription, // @ts-ignore
                            childPropsSelector, lastWrapperProps, lastChildProps, renderIsScheduled, isMounted, childPropsFromStoreUpdate, notifyNestedSubs, reactListener);
                        }
                    }["connect.wrapWithConnect.ConnectFunction.useMemo[subscribeForReact].subscribe"];
                    return subscribe;
                }
            }["connect.wrapWithConnect.ConnectFunction.useMemo[subscribeForReact]"], [
                subscription
            ]);
            useIsomorphicLayoutEffectWithArgs(captureWrapperProps, [
                lastWrapperProps,
                lastChildProps,
                renderIsScheduled,
                wrapperProps,
                childPropsFromStoreUpdate,
                notifyNestedSubs
            ]);
            let actualChildProps;
            try {
                actualChildProps = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"](// TODO We're passing through a big wrapper that does a bunch of extra side effects besides subscribing
                subscribeForReact, // TODO This is incredibly hacky. We've already processed the store update and calculated new child props,
                // TODO and we're just passing that through so it triggers a re-render for us rather than relying on `uSES`.
                actualChildPropsSelector, getServerState ? ({
                    "connect.wrapWithConnect.ConnectFunction.useSyncExternalStore": ()=>childPropsSelector(getServerState(), wrapperProps)
                })["connect.wrapWithConnect.ConnectFunction.useSyncExternalStore"] : actualChildPropsSelector);
            } catch (err) {
                if (latestSubscriptionCallbackError.current) {
                    ;
                    err.message += "\nThe error may be correlated with this previous error:\n".concat(latestSubscriptionCallbackError.current.stack, "\n\n");
                }
                throw err;
            }
            useIsomorphicLayoutEffect({
                "connect.wrapWithConnect.ConnectFunction.useIsomorphicLayoutEffect": ()=>{
                    latestSubscriptionCallbackError.current = void 0;
                    childPropsFromStoreUpdate.current = void 0;
                    lastChildProps.current = actualChildProps;
                }
            }["connect.wrapWithConnect.ConnectFunction.useIsomorphicLayoutEffect"]);
            const renderedWrappedComponent = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"]({
                "connect.wrapWithConnect.ConnectFunction.useMemo[renderedWrappedComponent]": ()=>{
                    return(// @ts-ignore
                    /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createElement"](WrappedComponent, {
                        ...actualChildProps,
                        ref: reactReduxForwardedRef
                    }));
                }
            }["connect.wrapWithConnect.ConnectFunction.useMemo[renderedWrappedComponent]"], [
                reactReduxForwardedRef,
                WrappedComponent,
                actualChildProps
            ]);
            const renderedChild = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"]({
                "connect.wrapWithConnect.ConnectFunction.useMemo[renderedChild]": ()=>{
                    if (shouldHandleStateChanges) {
                        return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createElement"](ContextToUse.Provider, {
                            value: overriddenContextValue
                        }, renderedWrappedComponent);
                    }
                    return renderedWrappedComponent;
                }
            }["connect.wrapWithConnect.ConnectFunction.useMemo[renderedChild]"], [
                ContextToUse,
                renderedWrappedComponent,
                overriddenContextValue
            ]);
            return renderedChild;
        }
        const _Connect = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["memo"](ConnectFunction);
        const Connect = _Connect;
        Connect.WrappedComponent = WrappedComponent;
        Connect.displayName = ConnectFunction.displayName = displayName;
        if (forwardRef) {
            const _forwarded = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["forwardRef"](function forwardConnectRef(props, ref) {
                return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createElement"](Connect, {
                    ...props,
                    reactReduxForwardedRef: ref
                });
            });
            const forwarded = _forwarded;
            forwarded.displayName = displayName;
            forwarded.WrappedComponent = WrappedComponent;
            return /* @__PURE__ */ hoistNonReactStatics(forwarded, WrappedComponent);
        }
        return /* @__PURE__ */ hoistNonReactStatics(Connect, WrappedComponent);
    };
    return wrapWithConnect;
}
var connect_default = connect;
// src/components/Provider.tsx
function Provider(providerProps) {
    const { children, context, serverState, store } = providerProps;
    const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "Provider.useMemo[contextValue]": ()=>{
            const subscription = createSubscription(store);
            const baseContextValue = {
                store,
                subscription,
                getServerState: serverState ? ({
                    "Provider.useMemo[contextValue]": ()=>serverState
                })["Provider.useMemo[contextValue]"] : void 0
            };
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            else {
                const { identityFunctionCheck = "once", stabilityCheck = "once" } = providerProps;
                return /* @__PURE__ */ Object.assign(baseContextValue, {
                    stabilityCheck,
                    identityFunctionCheck
                });
            }
        }
    }["Provider.useMemo[contextValue]"], [
        store,
        serverState
    ]);
    const previousState = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "Provider.useMemo[previousState]": ()=>store.getState()
    }["Provider.useMemo[previousState]"], [
        store
    ]);
    useIsomorphicLayoutEffect({
        "Provider.useIsomorphicLayoutEffect": ()=>{
            const { subscription } = contextValue;
            subscription.onStateChange = subscription.notifyNestedSubs;
            subscription.trySubscribe();
            if (previousState !== store.getState()) {
                subscription.notifyNestedSubs();
            }
            return ({
                "Provider.useIsomorphicLayoutEffect": ()=>{
                    subscription.tryUnsubscribe();
                    subscription.onStateChange = void 0;
                }
            })["Provider.useIsomorphicLayoutEffect"];
        }
    }["Provider.useIsomorphicLayoutEffect"], [
        contextValue,
        previousState
    ]);
    const Context = context || ReactReduxContext;
    return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createElement"](Context.Provider, {
        value: contextValue
    }, children);
}
var Provider_default = Provider;
// src/hooks/useReduxContext.ts
function createReduxContextHook() {
    let context = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ReactReduxContext;
    return function useReduxContext2() {
        const contextValue = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useContext"](context);
        if (("TURBOPACK compile-time value", "development") !== "production" && !contextValue) {
            throw new Error("could not find react-redux context value; please ensure the component is wrapped in a <Provider>");
        }
        return contextValue;
    };
}
var useReduxContext = /* @__PURE__ */ createReduxContextHook();
// src/hooks/useStore.ts
function createStoreHook() {
    let context = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ReactReduxContext;
    const useReduxContext2 = context === ReactReduxContext ? useReduxContext : // @ts-ignore
    createReduxContextHook(context);
    const useStore2 = ()=>{
        const { store } = useReduxContext2();
        return store;
    };
    Object.assign(useStore2, {
        withTypes: ()=>useStore2
    });
    return useStore2;
}
var useStore = /* @__PURE__ */ createStoreHook();
// src/hooks/useDispatch.ts
function createDispatchHook() {
    let context = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ReactReduxContext;
    const useStore2 = context === ReactReduxContext ? useStore : createStoreHook(context);
    const useDispatch2 = ()=>{
        const store = useStore2();
        return store.dispatch;
    };
    Object.assign(useDispatch2, {
        withTypes: ()=>useDispatch2
    });
    return useDispatch2;
}
var useDispatch = /* @__PURE__ */ createDispatchHook();
;
var refEquality = (a, b)=>a === b;
function createSelectorHook() {
    let context = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ReactReduxContext;
    const useReduxContext2 = context === ReactReduxContext ? useReduxContext : createReduxContextHook(context);
    const useSelector2 = function(selector) {
        let equalityFnOrOptions = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const { equalityFn = refEquality } = typeof equalityFnOrOptions === "function" ? {
            equalityFn: equalityFnOrOptions
        } : equalityFnOrOptions;
        if ("TURBOPACK compile-time truthy", 1) {
            if (!selector) {
                throw new Error("You must pass a selector to useSelector");
            }
            if (typeof selector !== "function") {
                throw new Error("You must pass a function as a selector to useSelector");
            }
            if (typeof equalityFn !== "function") {
                throw new Error("You must pass a function as an equality function to useSelector");
            }
        }
        const reduxContext = useReduxContext2();
        const { store, subscription, getServerState } = reduxContext;
        const firstRun = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"](true);
        const wrappedSelector = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"]({
            [selector.name] (state) {
                const selected = selector(state);
                if ("TURBOPACK compile-time truthy", 1) {
                    const { devModeChecks = {} } = typeof equalityFnOrOptions === "function" ? {} : equalityFnOrOptions;
                    const { identityFunctionCheck, stabilityCheck } = reduxContext;
                    const { identityFunctionCheck: finalIdentityFunctionCheck, stabilityCheck: finalStabilityCheck } = {
                        stabilityCheck,
                        identityFunctionCheck,
                        ...devModeChecks
                    };
                    if (finalStabilityCheck === "always" || finalStabilityCheck === "once" && firstRun.current) {
                        const toCompare = selector(state);
                        if (!equalityFn(selected, toCompare)) {
                            let stack = void 0;
                            try {
                                throw new Error();
                            } catch (e) {
                                ;
                                ({ stack } = e);
                            }
                            console.warn("Selector " + (selector.name || "unknown") + " returned a different result when called with the same parameters. This can lead to unnecessary rerenders.\nSelectors that return a new reference (such as an object or an array) should be memoized: https://redux.js.org/usage/deriving-data-selectors#optimizing-selectors-with-memoization", {
                                state,
                                selected,
                                selected2: toCompare,
                                stack
                            });
                        }
                    }
                    if (finalIdentityFunctionCheck === "always" || finalIdentityFunctionCheck === "once" && firstRun.current) {
                        if (selected === state) {
                            let stack = void 0;
                            try {
                                throw new Error();
                            } catch (e) {
                                ;
                                ({ stack } = e);
                            }
                            console.warn("Selector " + (selector.name || "unknown") + " returned the root state when called. This can lead to unnecessary rerenders.\nSelectors that return the entire state are almost certainly a mistake, as they will cause a rerender whenever *anything* in state changes.", {
                                stack
                            });
                        }
                    }
                    if (firstRun.current) firstRun.current = false;
                }
                return selected;
            }
        }[selector.name], [
            selector
        ]);
        const selectedState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$use$2d$sync$2d$external$2d$store$2f$with$2d$selector$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSyncExternalStoreWithSelector"])(subscription.addNestedSub, store.getState, getServerState || store.getState, wrappedSelector, equalityFn);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useDebugValue"](selectedState);
        return selectedState;
    };
    Object.assign(useSelector2, {
        withTypes: ()=>useSelector2
    });
    return useSelector2;
}
var useSelector = /* @__PURE__ */ createSelectorHook();
// src/exports.ts
var batch = defaultNoopBatch;
;
 //# sourceMappingURL=react-redux.mjs.map
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/tiny-invariant/dist/esm/tiny-invariant.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>invariant
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var isProduction = ("TURBOPACK compile-time value", "development") === 'production';
var prefix = 'Invariant failed';
function invariant(condition, message) {
    if (condition) {
        return;
    }
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    var provided = typeof message === 'function' ? message() : message;
    var value = provided ? "".concat(prefix, ": ").concat(provided) : prefix;
    throw new Error(value);
}
;
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/css-box-model/dist/css-box-model.esm.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateBox",
    ()=>calculateBox,
    "createBox",
    ()=>createBox,
    "expand",
    ()=>expand,
    "getBox",
    ()=>getBox,
    "getRect",
    ()=>getRect,
    "offset",
    ()=>offset,
    "shrink",
    ()=>shrink,
    "withScroll",
    ()=>withScroll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$tiny$2d$invariant$2f$dist$2f$esm$2f$tiny$2d$invariant$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/tiny-invariant/dist/esm/tiny-invariant.js [client] (ecmascript)");
;
var getRect = function getRect(_ref) {
    var top = _ref.top, right = _ref.right, bottom = _ref.bottom, left = _ref.left;
    var width = right - left;
    var height = bottom - top;
    var rect = {
        top: top,
        right: right,
        bottom: bottom,
        left: left,
        width: width,
        height: height,
        x: left,
        y: top,
        center: {
            x: (right + left) / 2,
            y: (bottom + top) / 2
        }
    };
    return rect;
};
var expand = function expand(target, expandBy) {
    return {
        top: target.top - expandBy.top,
        left: target.left - expandBy.left,
        bottom: target.bottom + expandBy.bottom,
        right: target.right + expandBy.right
    };
};
var shrink = function shrink(target, shrinkBy) {
    return {
        top: target.top + shrinkBy.top,
        left: target.left + shrinkBy.left,
        bottom: target.bottom - shrinkBy.bottom,
        right: target.right - shrinkBy.right
    };
};
var shift = function shift(target, shiftBy) {
    return {
        top: target.top + shiftBy.y,
        left: target.left + shiftBy.x,
        bottom: target.bottom + shiftBy.y,
        right: target.right + shiftBy.x
    };
};
var noSpacing = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
};
var createBox = function createBox(_ref2) {
    var borderBox = _ref2.borderBox, _ref2$margin = _ref2.margin, margin = _ref2$margin === void 0 ? noSpacing : _ref2$margin, _ref2$border = _ref2.border, border = _ref2$border === void 0 ? noSpacing : _ref2$border, _ref2$padding = _ref2.padding, padding = _ref2$padding === void 0 ? noSpacing : _ref2$padding;
    var marginBox = getRect(expand(borderBox, margin));
    var paddingBox = getRect(shrink(borderBox, border));
    var contentBox = getRect(shrink(paddingBox, padding));
    return {
        marginBox: marginBox,
        borderBox: getRect(borderBox),
        paddingBox: paddingBox,
        contentBox: contentBox,
        margin: margin,
        border: border,
        padding: padding
    };
};
var parse = function parse(raw) {
    var value = raw.slice(0, -2);
    var suffix = raw.slice(-2);
    if (suffix !== 'px') {
        return 0;
    }
    var result = Number(value);
    !!isNaN(result) ? ("TURBOPACK compile-time truthy", 1) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$tiny$2d$invariant$2f$dist$2f$esm$2f$tiny$2d$invariant$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(false, "Could not parse value [raw: " + raw + ", without suffix: " + value + "]") : "TURBOPACK unreachable" : void 0;
    return result;
};
var getWindowScroll = function getWindowScroll() {
    return {
        x: window.pageXOffset,
        y: window.pageYOffset
    };
};
var offset = function offset(original, change) {
    var borderBox = original.borderBox, border = original.border, margin = original.margin, padding = original.padding;
    var shifted = shift(borderBox, change);
    return createBox({
        borderBox: shifted,
        border: border,
        margin: margin,
        padding: padding
    });
};
var withScroll = function withScroll(original, scroll) {
    if (scroll === void 0) {
        scroll = getWindowScroll();
    }
    return offset(original, scroll);
};
var calculateBox = function calculateBox(borderBox, styles) {
    var margin = {
        top: parse(styles.marginTop),
        right: parse(styles.marginRight),
        bottom: parse(styles.marginBottom),
        left: parse(styles.marginLeft)
    };
    var padding = {
        top: parse(styles.paddingTop),
        right: parse(styles.paddingRight),
        bottom: parse(styles.paddingBottom),
        left: parse(styles.paddingLeft)
    };
    var border = {
        top: parse(styles.borderTopWidth),
        right: parse(styles.borderRightWidth),
        bottom: parse(styles.borderBottomWidth),
        left: parse(styles.borderLeftWidth)
    };
    return createBox({
        borderBox: borderBox,
        margin: margin,
        padding: padding,
        border: border
    });
};
var getBox = function getBox(el) {
    var borderBox = el.getBoundingClientRect();
    var styles = window.getComputedStyle(el);
    return calculateBox(borderBox, styles);
};
;
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/raf-schd/dist/raf-schd.esm.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var rafSchd = function rafSchd(fn) {
    var lastArgs = [];
    var frameId = null;
    var wrapperFn = function wrapperFn() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        lastArgs = args;
        if (frameId) {
            return;
        }
        frameId = requestAnimationFrame(function() {
            frameId = null;
            fn.apply(void 0, lastArgs);
        });
    };
    wrapperFn.cancel = function() {
        if (!frameId) {
            return;
        }
        cancelAnimationFrame(frameId);
        frameId = null;
    };
    return wrapperFn;
};
const __TURBOPACK__default__export__ = rafSchd;
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/@babel/runtime/helpers/esm/extends.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>_extends
]);
function _extends() {
    return _extends = ("TURBOPACK compile-time truthy", 1) ? Object.assign.bind() : "TURBOPACK unreachable", _extends.apply(null, arguments);
}
;
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/uuid/dist/native.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const __TURBOPACK__default__export__ = {
    randomUUID
};
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/uuid/dist/rng.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>rng
]);
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
    if (!getRandomValues) {
        if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
            throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
        getRandomValues = crypto.getRandomValues.bind(crypto);
    }
    return getRandomValues(rnds8);
}
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/uuid/dist/regex.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/uuid/dist/validate.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$regex$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/uuid/dist/regex.js [client] (ecmascript)");
;
function validate(uuid) {
    return typeof uuid === 'string' && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$regex$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].test(uuid);
}
const __TURBOPACK__default__export__ = validate;
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/uuid/dist/stringify.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "unsafeStringify",
    ()=>unsafeStringify
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$validate$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/uuid/dist/validate.js [client] (ecmascript)");
;
const byteToHex = [];
for(let i = 0; i < 256; ++i){
    byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr) {
    let offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
function stringify(arr) {
    let offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    const uuid = unsafeStringify(arr, offset);
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$validate$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(uuid)) {
        throw TypeError('Stringified UUID is invalid');
    }
    return uuid;
}
const __TURBOPACK__default__export__ = stringify;
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/uuid/dist/v4.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$native$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/uuid/dist/native.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$rng$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/uuid/dist/rng.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$stringify$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/uuid/dist/stringify.js [client] (ecmascript)");
;
;
;
function _v4(options, buf, offset) {
    var _options_rng;
    options = options || {};
    var _options_random, _ref;
    const rnds = (_ref = (_options_random = options.random) !== null && _options_random !== void 0 ? _options_random : (_options_rng = options.rng) === null || _options_rng === void 0 ? void 0 : _options_rng.call(options)) !== null && _ref !== void 0 ? _ref : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$rng$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])();
    if (rnds.length < 16) {
        throw new Error('Random bytes length must be >= 16');
    }
    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80;
    if (buf) {
        offset = offset || 0;
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError("UUID byte range ".concat(offset, ":").concat(offset + 15, " is out of buffer bounds"));
        }
        for(let i = 0; i < 16; ++i){
            buf[offset + i] = rnds[i];
        }
        return buf;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$stringify$2e$js__$5b$client$5d$__$28$ecmascript$29$__["unsafeStringify"])(rnds);
}
function v4(options, buf, offset) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$native$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].randomUUID && !buf && !options) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$native$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].randomUUID();
    }
    return _v4(options, buf, offset);
}
const __TURBOPACK__default__export__ = v4;
}),
"[project]/Desktop/finance-type/my-cv-app/node_modules/uuid/dist/v4.js [client] (ecmascript) <export default as v4>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "v4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$finance$2d$type$2f$my$2d$cv$2d$app$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/finance-type/my-cv-app/node_modules/uuid/dist/v4.js [client] (ecmascript)");
}),
]);

//# sourceMappingURL=ebde9_8b37377f._.js.map