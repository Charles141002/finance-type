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
"[project]/Desktop/finance-type/my-cv-app/pages/api/cv/save.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$supabase$2f$auth$2d$helpers$2d$nextjs__$5b$external$5d$__$2840$supabase$2f$auth$2d$helpers$2d$nextjs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@supabase/auth-helpers-nextjs [external] (@supabase/auth-helpers-nextjs, cjs)");
;
const handler = async (req, res)=>{
    if (req.method !== 'POST') {
        res.setHeader('Allow', [
            'POST'
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
            error: 'Vous devez être connecté pour sauvegarder le CV.'
        });
    }
    let payload;
    try {
        payload = req.body;
    } catch  {
        return res.status(400).json({
            error: 'Payload invalide.'
        });
    }
    if (!Array.isArray(payload.blocks)) {
        return res.status(400).json({
            error: 'La liste des blocs est manquante ou invalide.'
        });
    }
    const title = typeof payload.title === 'string' && payload.title.trim().length > 0 ? payload.title.trim() : 'Mon CV';
    const fontScale = typeof payload.fontScale === 'number' ? payload.fontScale : 1;
    const upsertValues = {
        user_id: session.user.id,
        title,
        blocks: payload.blocks,
        font_scale: fontScale
    };
    if (payload.id) {
        upsertValues.id = payload.id;
    }
    const { data, error } = await supabase.from('user_cvs').upsert(upsertValues, {
        onConflict: 'id',
        returning: 'representation'
    });
    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }
    return res.status(200).json({
        success: true,
        cv: data?.[0]
    });
};
const __TURBOPACK__default__export__ = handler;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7210b13f._.js.map