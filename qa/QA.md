# Verification — 2026-10-29

Passed on Node 22.23.3 / Next.js 16.4.3:

- `npm run typecheck`: strict TypeScript, no errors.
- `npm run build`: production Webpack build, eight localized prerendered pages. Turbopack's PostCSS subprocess hit an environment port restriction; Webpack is the configured supported build/dev path.
- `node scripts/check-routes.mjs`: all eight page routes HTTP 200, correct language, noindex/nofollow, main anchor, no unverified canonical. Invalid locale/page HTTP 404. Robots disallow and preview sitemap empty.
- In-app browser: EN/TR home and equivalent privacy-page language navigation; support navigation; mobile menu open, navigation and close; theme Light/Dark; theme persists through page reload. Native FAQ opens and closes with Enter.
- TR home document width equals scroll width at viewport widths 320, 390, 768, 1024, 1280, 1440 and 1920. EN home and privacy also checked at 320. Observed desktop orbital overflow fixed and rechecked.
- Console warning/error list was empty during interaction check.
- Images have alt attributes; decorative artwork uses empty alt.
- Representative color contrast calculations: secondary text/light background 5.28:1; action/white 6.01:1; secondary text/dark background 7.65:1; primary accent/dark background 11.35:1. This is a token-level check, not an exhaustive automated audit.
- Reduced-motion style disables smooth scrolling and any CSS animation/transition. No continuous decorative motion was introduced.

Saved browser screenshots: mobile-tr.jpg (390×844), desktop-tr.jpg and desktop-dark-tr.jpg (1440×1000).

Not performed: axe/Lighthouse audit, screen-reader user test, real iPhone/Safari test, automated visual flash/CLS measurement, live production domain metadata checks, or deployment. iOS functionality and release acceptance are outside this read-only website implementation.

To rerun route checks, start `npm start` after `npm run build`; then run `node scripts/check-routes.mjs`.

## Legal integration verification — 29 October 2026

- Strict typecheck and production Webpack build passed after the legal renderer/routes update.
- `npm run check:release` passed: missing fields, unsafe/non-public origins and unrevised legal drafts block release; known configured fields resolve consistently.
- Negative integration checks: `SITE_RELEASE_APPROVED=true npm run build` failed with expected missing-field/draft blockers; `VERCEL_ENV=production npm run build` failed without release approval. These are expected protection results, not unresolved implementation failures.
- `npm run check:routes` passed all 11 localized routes including EN/TR Terms and TR KVKK; EN KVKK returned 404. Noindex, empty preview sitemap, robots disallow, favicon and brand-first titles checked. Legal heading/body separation verified in served HTML.
- Browser: KVKK → English Privacy fallback, Privacy EN/TR equivalent switch, Terms EN/TR equivalent switch, Apple EULA link and footer/related links verified. KVKK table is focusable by keyboard; table horizontal overflow is contained in its region.
- TR Privacy and KVKK document width equaled scroll width at 320 px (305 px client area). Desktop KVKK checked at 1440 px. Light and dark legal views inspected. Browser warning/error log empty.
- Screenshots: `kvkk-desktop.jpg`, `kvkk-mobile.jpg`.
- Not run: lint (no lint configuration in this project), automated axe/Lighthouse, VoiceOver session, real-device Safari, native Swift build/patch application, signed Release archive/network capture, final legal review or deployment. No new dependencies were added.
