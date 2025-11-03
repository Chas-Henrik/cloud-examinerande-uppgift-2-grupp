// .lighthouserc.js

module.exports = {
  ci: {
    collect: {
      url: ['https://cloud-examinerande-uppgift-2-grupp.vercel.app/login'],
      startServerCommand: "npm run build && npm run start", // optional, if you need a dev server
      numberOfRuns: 3,
      static: false, // crucial for live SSR apps
    },
    assert: {
      preset: "lighthouse:no-pwa",
      assertions: {
        "color-contrast": "off",
        "legacy-javascript": "warn",
        "document-latency-insight": "warn",
        "errors-in-console": "warn",
        "unused-javascript": "warn",
        "render-blocking-insight": "warn",
        "redirects": "warn",
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
