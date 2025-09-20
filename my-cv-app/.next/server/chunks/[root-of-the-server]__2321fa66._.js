module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/@supabase/auth-helpers-nextjs [external] (@supabase/auth-helpers-nextjs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@supabase/auth-helpers-nextjs", () => require("@supabase/auth-helpers-nextjs"));

module.exports = mod;
}),
"[project]/Desktop/finance-type/my-cv-app/pages/api/cv/list.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$auth$2d$helpers$2d$nextjs__$5b$external$5d$__$2840$supabase$2f$auth$2d$helpers$2d$nextjs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@supabase/auth-helpers-nextjs [external] (@supabase/auth-helpers-nextjs, cjs)");
;
const DEFAULT_LIMIT = 30;
const MAX_LIMIT = 100;
const handler = async (req, res)=>{
    if (req.method !== 'GET') {
        res.setHeader('Allow', [
            'GET'
        ]);
        return res.status(405).json({
            error: 'Méthode non autorisée'
        });
    }
    const supabase = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$auth$2d$helpers$2d$nextjs__$5b$external$5d$__$2840$supabase$2f$auth$2d$helpers$2d$nextjs$2c$__cjs$29$__["createPagesServerClient"])({
        req,
        res
    });
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
        return res.status(401).json({
            error: 'Authentification requise.'
        });
    }
    const { limit: limitParam, offset: offsetParam, search: searchParam, sort: sortParam } = req.query;
    const parseNumberParam = (value, fallback)=>{
        if (typeof value === 'undefined') return fallback;
        const firstValue = Array.isArray(value) ? value[0] : value;
        const parsed = Number.parseInt(firstValue, 10);
        return Number.isFinite(parsed) ? parsed : fallback;
    };
    const limitFromQuery = parseNumberParam(limitParam, DEFAULT_LIMIT);
    const limit = limitFromQuery === 0 ? 0 : Math.min(Math.max(limitFromQuery, 1), MAX_LIMIT);
    const offset = Math.max(parseNumberParam(offsetParam, 0), 0);
    const search = typeof searchParam === 'string' ? searchParam.trim() : Array.isArray(searchParam) ? searchParam[0]?.trim() ?? '' : '';
    const sortMapping = {
        updated_desc: {
            column: 'updated_at',
            ascending: false
        },
        updated_asc: {
            column: 'updated_at',
            ascending: true
        },
        created_desc: {
            column: 'created_at',
            ascending: false
        },
        created_asc: {
            column: 'created_at',
            ascending: true
        },
        title_asc: {
            column: 'title',
            ascending: true
        },
        title_desc: {
            column: 'title',
            ascending: false
        }
    };
    const sortKey = typeof sortParam === 'string' ? sortParam : Array.isArray(sortParam) ? sortParam[0] : undefined;
    const { column: sortColumn, ascending } = sortMapping[sortKey ?? ''] ?? sortMapping.updated_desc;
    let query = supabase.from('user_cvs').select('id, title, updated_at, created_at', {
        count: 'exact'
    }).eq('user_id', session.user.id);
    if (search) {
        query = query.ilike('title', `%${search}%`);
    }
    query = query.order(sortColumn, {
        ascending
    });
    const rangeLimit = limit === 0 ? null : limit;
    if (rangeLimit) {
        query = query.range(offset, offset + rangeLimit - 1);
    }
    const { data, error, count } = await query;
    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }
    const total = typeof count === 'number' ? count : data?.length ?? 0;
    return res.status(200).json({
        cvs: data ?? [],
        total
    });
};
const __TURBOPACK__default__export__ = handler;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2321fa66._.js.map