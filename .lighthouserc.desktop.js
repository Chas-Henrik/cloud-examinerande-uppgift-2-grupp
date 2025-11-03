// .lighthouserc.desktop.js

module.exports = {
  ci: {
    collect: {
      url: process.env.NODE_ENV === 'production' ? [process.env.LHCI_URL] : ['http://localhost:3000/login'],
      startServerCommand: "npm run build && npm run start", // optional, if you need a dev server
      numberOfRuns: 3,
      settings: {
        preset: "desktop"
      },
      static: false, // crucial for live SSR apps
    },
    assert: {
      preset: "lighthouse:no-pwa",
      assertions: {
        // Critical issues that will fail CI
        "errors-in-console": "fail",
        "accessibility": "fail", // optional if you want to enforce accessibility

        // Warnings for non-critical issues
        "legacy-javascript": "warn",
        "legacy-javascript-insight": "warn",
        "network-dependency-tree-insight": "warn",
        "render-blocking-resources": "warn",
        "unused-javascript": "warn",
        "redirects": "warn",
        "document-latency-insight": "warn",
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
