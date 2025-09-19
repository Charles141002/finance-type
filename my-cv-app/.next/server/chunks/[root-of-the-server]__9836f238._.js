module.exports=[406,(e,t,i)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},7145,e=>e.a(async(t,i)=>{try{let t=await e.y("puppeteer");e.n(t),i()}catch(e){i(e)}},!0),6785,e=>{"use strict";function t(e,i=1){let n=(e,t)=>e.map(e=>{switch(e.type){case"header":{let t=e.content?.title||"";return`<div class="cv-header"><div class="cv-name">${t}</div></div>`}case"contact":{let t=e.content||{},i=[t.email,t.phone,t.address,t.linkedin].filter(Boolean).join(" • ");return`<div class="cv-contact">${i}</div>`}case"text":{let i=e.content||"",a="string"==typeof i?i.replace(/<[^>]*>/g,"").replace(/\u00A0/g," "):"",r=/[A-Za-zÀ-ÖØ-öø-ÿ]/.test(a),s=/Étudiant\s+à\s+IMT\s+Atlantique/i.test(a),c="string"==typeof i&&/<(ul|ol)\b/i.test(i),l="string"==typeof i&&/<br\s*\/?\s*>/i.test(i);if(!r&&!c)return`${n(e.children||[],t+1)}`;if(s)return`<div class="cv-intro">${i}</div>${n(e.children||[],t+1)}`;if(c)return`<div class="cv-text">${i}</div>${n(e.children||[],t+1)}`;if(l){let a=i.split(/<br\s*\/?\s*>/i).map(e=>{let i=e.replace(/<[^>]*>/g,"").replace(/\u00A0/g," ").trim();if(!/[A-Za-zÀ-ÖØ-öø-ÿ]/.test(i))return"";let n=/^\s*[•\-–]/.test(i),a=n?e.replace(/^\s*[•\-–]\s*/,""):e;return n?`<div class="cv-text cv-bullet${t>=2?" cv-bullet--level2":""}">${a}</div>`:`<div class="cv-text">${e}</div>`}).filter(Boolean).join("");return`${a}${n(e.children||[],t+1)}`}let o=/^\s*[•\-–]/.test(a),d=o&&"string"==typeof i?i.replace(/^\s*[•\-–]\s*/,""):i;if(o)return`<div class="cv-text cv-bullet${t>=2?" cv-bullet--level2":""}">${d}</div>${n(e.children||[],t+1)}`;return`<div class="cv-text">${i}</div>${n(e.children||[],t+1)}`}case"divider":return'<hr class="cv-divider"/>';case"section":return`<div class="cv-section">
            <div class="cv-section-title">${e.content?.title||""}</div>
            ${n(e.children||[],t+1)}
          </div>`;case"subsection":{let i=e.content?.title||"",a=e.content?.subtitle||"",r=e.content?.period||"",s=n(e.children||[],t+1),c=s.replace(/<[^>]*>/g,"").replace(/\u00A0/g," ").trim();if(!/[A-Za-zÀ-ÖØ-öø-ÿ]/.test(c))return"";return`<div class="cv-subsection">
            <div class="cv-subsection-header">
              <div>
                <div class="cv-subsection-title">${i}</div>
                ${a?`<div class=\\"cv-subsection-subtitle\\">${a}</div>`:""}
              </div>
              ${r?`<div class=\\"cv-subsection-period\\">${r}</div>`:""}
            </div>
            ${s}
          </div>`}default:return""}}).join("");return`<div class="cv">${n(e,0)}</div>`}e.s(["default",()=>t])},3321,e=>{"use strict";e.s(["default",()=>t]);let t=function(e=1){let t=10*e,i=8*e,n=4*e,a=2*e;return`
  /* Page and typography */
  @page { size: A4; margin: 15mm; }
  .cv { font-family: 'Times New Roman', Times, serif; font-size: ${t}pt; line-height: 1.25; color: #000; }
  .cv h1, .cv h2, .cv h3, .cv h4, .cv p { margin: 0; padding: 0; }
  .cv a { color: inherit; text-decoration: underline; }

  /* Header */
  .cv .cv-header { text-align: center; margin-bottom: ${i}px; }
  .cv .cv-name { font-size: ${18*e}pt; font-weight: 700; }
  .cv .cv-contact { text-align: center; font-size: ${t}pt; margin-top: ${a}px; }
  .cv .cv-intro { text-align: center; font-style: italic; margin-bottom: ${i}px; }

  /* Sections */
  .cv .cv-section { margin-top: ${i}px; }
  .cv .cv-section-title { font-size: ${12*e}pt; text-transform: uppercase; margin: 0 0 ${n}px 0; padding-bottom: ${a}px; border-bottom: 0.5pt solid #000; }

  /* Subsections */
  .cv .cv-subsection { margin-bottom: ${n}px; }
  .cv .cv-subsection-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: ${a}px; column-gap: ${n}px; }
  .cv .cv-subsection-title { font-size: ${t}pt; font-weight: 600; }
  .cv .cv-subsection-subtitle { font-size: ${t}pt; margin-top: ${Math.max(+e,1)}px; }
  .cv .cv-subsection-period { font-size: ${t}pt; font-style: italic; white-space: nowrap; }

  /* Text and bullets */
  .cv .cv-text { font-size: ${t}pt; margin-bottom: ${a}px; }
  .cv .cv-bullet { position: relative; padding-left: ${16*e}px; }
  .cv .cv-bullet::before { content: "–"; position: absolute; left: 0; top: 0; }
  .cv .cv-bullet--level2 { padding-left: ${22*e}px; }
  .cv .cv-bullet--level2::before { content: "•"; }

  /* Divider */
  .cv hr.cv-divider { border: 0; border-top: 0.5pt solid #000; margin: ${i}px 0; }
  `}},598,e=>e.a(async(t,i)=>{try{e.s(["default",()=>c]);var n=e.i(7145),a=e.i(6785),r=e.i(3321),s=t([n]);async function c(e,t){let i=e.body.blocks,s=e.body.fontScale||1,c=`
  <html>
    <head>
      <style>${(0,r.default)(s)}</style>
    </head>
    <body>${(0,a.default)(i,s)}</body>
  </html>`,l=await n.default.launch({args:["--no-sandbox"]}),o=await l.newPage();await o.setContent(c);let d=await o.pdf({format:"A4",printBackground:!0});await l.close(),t.setHeader("Content-Type","application/pdf"),t.end(d)}[n]=s.then?(await s)():s,i()}catch(e){i(e)}},!1),2885,e=>e.a(async(t,i)=>{try{e.s(["config",()=>u,"default",()=>p,"handler",()=>v]);var n=e.i(5196),a=e.i(9313),r=e.i(3822),s=e.i(1161),c=e.i(598),l=e.i(9617),o=e.i(3732),d=t([c]);[c]=d.then?(await d)():d;let p=(0,s.hoist)(c,"default"),u=(0,s.hoist)(c,"config"),f=new r.PagesAPIRouteModule({definition:{kind:a.RouteKind.PAGES_API,page:"/api/generate-pdf",pathname:"/api/generate-pdf",bundlePath:"",filename:""},userland:c,distDir:".next",relativeProjectDir:""});async function v(e,t,i){let a="/api/generate-pdf";a=a.replace(/\/index$/,"")||"/";let r=await f.prepare(e,t,{srcPage:a});if(!r){t.statusCode=400,t.end("Bad Request"),null==i.waitUntil||i.waitUntil.call(i,Promise.resolve());return}let{query:s,params:c,prerenderManifest:d,routerServerContext:v}=r;try{let i=e.method||"GET",n=(0,l.getTracer)(),a=n.getActiveScopeSpan(),r=f.instrumentationOnRequestError.bind(f),p=async a=>f.render(e,t,{query:{...s,...c},params:c,allowedRevalidateHeaderKeys:[],multiZoneDraftMode:!1,trustHostHeader:!1,previewProps:d.preview,propagateError:!1,dev:f.isDev,page:"/api/generate-pdf",internalRevalidate:null==v?void 0:v.revalidate,onError:(...t)=>r(e,...t)}).finally(()=>{if(!a)return;a.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=n.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==o.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let s=r.get("next.route");if(s){let e=`${i} ${s}`;a.setAttributes({"next.route":s,"http.route":s,"next.span_name":e}),a.updateName(e)}else a.updateName(`${i} ${e.url}`)});a?await p(a):await n.withPropagatedContext(e.headers,()=>n.trace(o.BaseServerSpan.handleRequest,{spanName:`${i} ${e.url}`,kind:l.SpanKind.SERVER,attributes:{"http.method":i,"http.target":e.url}},p))}catch(e){if(f.isDev)throw e;(0,n.sendError)(t,500,"Internal Server Error")}finally{null==i.waitUntil||i.waitUntil.call(i,Promise.resolve())}}i()}catch(e){i(e)}},!1)];

//# sourceMappingURL=%5Broot-of-the-server%5D__9836f238._.js.map