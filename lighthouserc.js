// .lighthouserc.js
const isCI = process.env.CI === 'true'; // typical CI env variable

module.exports = {
  ci: {
    collect: {
      url: ['https://cloud-examinerande-uppgift-2-grupp.vercel.app'],
      startServerCommand: "npm start", // optional, if you need a dev server
      numberOfRuns: 3,
      static: false, // crucial for live SSR apps
    },
    assert: {
      preset: "lighthouse:no-pwa",
      assertions: {
        "color-contrast": "off",
        "document-latency-insight": "warn",
        "errors-in-console": "warn",
        "unused-javascript": "warn",
        "legacy-javascript": "warn",
        "render-blocking-insight": "warn",
        "redirects": "warn",
      },
    },
    upload: {
      target: isCI ? 'lhci' : 'temporary-public-storage', // switch automatically
      githubAppToken: isCI ? process.env.LHCI_GITHUB_APP_TOKEN : undefined,  // server token only in CI
    },
  },
};
