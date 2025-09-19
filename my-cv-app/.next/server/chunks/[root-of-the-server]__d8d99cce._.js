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
"[project]/Desktop/finance-type/my-cv-app/pages/api/cv/delete.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$auth$2d$helpers$2d$nextjs__$5b$external$5d$__$2840$supabase$2f$auth$2d$helpers$2d$nextjs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@supabase/auth-helpers-nextjs [external] (@supabase/auth-helpers-nextjs, cjs)");
;
const handler = async (req, res)=>{
    if (req.method !== 'DELETE') {
        res.setHeader('Allow', [
            'DELETE'
        ]);
        return res.status(405).json({
            error: 'Méthode non autorisée'
        });
    }
    const { id } = req.query;
    if (typeof id !== 'string') {
        return res.status(400).json({
            error: 'Identifiant manquant.'
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
    const { error } = await supabase.from('user_cvs').delete({
        returning: 'minimal'
    }).eq('id', id).eq('user_id', session.user.id);
    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }
    return res.status(200).json({
        success: true
    });
};
const __TURBOPACK__default__export__ = handler;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d8d99cce._.js.map