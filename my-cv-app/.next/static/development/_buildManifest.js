self.__BUILD_MANIFEST = {
  "/": [
    "./static/chunks/pages/index.js"
  ],
  "/cv": [
    "./static/chunks/pages/cv.js"
  ],
  "/gestion-cv": [
    "./static/chunks/pages/gestion-cv.js"
  ],
  "/login": [
    "./static/chunks/pages/login.js"
  ],
  "/mes-cv": [
    "./static/chunks/pages/mes-cv.js"
  ],
  "__rewrites": {
    "afterFiles": [],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/",
    "/_app",
    "/_error",
    "/a-propos",
    "/api/auth/callback",
    "/api/cv/delete",
    "/api/cv/detail",
    "/api/cv/list",
    "/api/cv/save",
    "/api/generate-pdf",
    "/cv",
    "/gestion-cv",
    "/login",
    "/reset-password"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()