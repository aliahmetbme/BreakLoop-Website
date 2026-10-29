# BreakLoop marketing integration — 29 October 2026

Baseline: website `main` at `b144c2eceb760dbfd76fd411cf98c876aa5ce495`. Working tree was clean before implementation. No branch, commit, push, PR or deployment was created. Native repository was read only.

## Scope and visual baseline

This is a content integration with small additions using existing components, not a visual redesign. Eight before screenshots were captured before edits: EN/TR, light/dark, 1440 and 390 px. Matching after screenshots and geometry records are included in `before/` and `after/`.

Every pre-existing CSS rule remains byte-for-byte unchanged; only three scoped rules were appended (mode-link margin and the two-column/stacked scenario list). Original colors, typography, gradients, artwork, iPhone composition, header, navigation, footer and animation behavior remain. No image/logo was replaced. `check-design-baseline.mjs` asserts these source invariants, including unchanged legal drafts, theme controls and preview legal/support labels.

Before/after geometry: header stays 104 px desktop / 84 px mobile; iPhone width stays 280 px desktop / 250 px mobile; canvas colors match in all eight samples. Longer copy naturally reflows: EN desktop hero height 740 → 744.47 px, TR desktop remains 740 px; EN mobile hero height 1110.16 → 1226.19 px, TR mobile 1137.16 → 1129.67 px. Font sizes and layout rules were not changed to force the new wording into the previous line count.

## Story and components

- Hero copy: “Focus when you choose. Pause when you need.” / “İstediğinde odaklan. Gerektiğinde mola ver.” Existing mockup/rings remain. Primary CTA explicitly says Coming soon / Yakında and scrolls to the existing closing section.
- `ModeOverview`: equal feature cards using the existing feature-grid, feature-card, cooldown styling and original Deep Focus/Cooldown Quiet Horizon artwork. Focus protects intentional work; Life adds a pause after the shared allowance is reached.
- `RealLifeScenarios`: two short hypothetical study/scroll narratives using the existing step-list presentation. They are not testimonials or measured statistics.
- Existing `Budget` retains its illustration; `Steps` now accepts a Life/Focus variant. The four-step Life presentation combines selecting and setting in its first step, retaining the approved four-column pattern while explaining every requested phase. Focus gets a separate fixed-duration explanation.
- `Philosophy`: existing note-section styling, “Less autopilot. More intention.” No judgmental, clinical, guaranteed-outcome or addiction claims.
- Existing features, privacy facts, FAQ and closing remain. Nine FAQs now explain both experiences, differences, shared usage, selection scope, estimated rest, iOS timing, availability and unconfirmed pricing.
- How It Works reuses the two-mode cards and separate Focus/Life explanations; existing Screen Time caveats remain. No new navigable marketing page was added.
- All additions are Server Components. No dependencies or new Client Components were added.

Native evidence: `DashboardView.swift` DeepFocusSheet offers 30m/1h/2h/3h/4h/5h. `DashboardViewModel.startDeepFocus` loads the supported existing selection. `MonitoringLifecycle.startDeepFocus` stores a fixed-duration session; active cooldown can continue to apply. Focus/Life are descriptive marketing names, not literal app tabs or independently configured selection systems. Natural Rest is an estimate; v1.0 accepts apps/categories, not web-domain selections.

## Publication copy and SEO

- `lib/content.ts` exports publication-safe common content; `lib/preview-copy.ts` holds existing preview labels. `getContent` selects by actual publication state.
- `lib/legal-copy.ts` keeps original preview legal labels separately from publication labels. Draft warnings remain visible in the current preview; real legal documents were not edited or approved.
- Release validation now scans public marketing and legal labels, not only policy documents. `MARKETING_COPY_APPROVED` is an additional prerequisite, not a substitute for legal, domain, contact or native release approval.
- Isolated completed fixtures test the positive release/SEO path. Production callers still use the real unresolved legal documents. Tests explicitly assert that the real site cannot publish even when fixture tests pass.
- `lib/seo.ts` centralizes localized homepage/How It Works metadata and retains canonical/hreflang behavior. KVKK remains TR only. Default noindex/nofollow, robots disallow and empty preview sitemap are unchanged.
- Root OG wording follows the new positioning. `/en/og` and `/tr/og` are static 1200×630 sharing-image endpoints using the original palette/composition and localized wording; they are not extra content pages. Metadata uses the correct locale image.

## Tests actually run

| Check | Result |
| --- | --- |
| `npm ci --cache /private/tmp/breakloop-npm-cache` | PASS; lockfile unchanged |
| `npm run typecheck` | PASS |
| `npm run build` | PASS; 11 content routes and two localized OG endpoints prerendered |
| `npm run check:release` | PASS; existing blockers, public-copy contamination negatives, fixture positives and preview-indexing negatives |
| `npm run check:routes` | PASS; all legal/content routes, messages, two experiences, anchors, Coming Soon CTA, locale SEO tags, OG PNG dimensions, no fake store destination, noindex and 404 checks |
| `node scripts/check-design-baseline.mjs` | PASS; existing CSS/assets/controls/legal content and preview legal labels preserved |
| `SITE_RELEASE_APPROVED=true npm run build` | Expected BLOCK; real missing facts/approvals/drafts remain, including marketing approval |
| `VERCEL_ENV=production npm run build` | Expected BLOCK; explicit release approval absent |
| Browser width checks | PASS; 56 combinations: EN/TR × home/How It Works × light/dark × 320/375/390/768/1024/1440/1920; no document horizontal overflow |
| Browser interactions | PASS; Focus/Life anchor navigation, FAQ Enter toggle, mobile menu navigation/close, themes |
| Browser console | No warning/error entries during inspected interactions |
| Visual comparison | Eight before/after screenshots inspected; approved design tokens/composition preserved with natural copy reflow |

Not performed: Lighthouse/axe, formal Core Web Vitals/CLS measurement, real-device Safari, VoiceOver user testing, five-second comprehension study, final signed-native audit or publication.

## Open issues and publication blockers

- The baseline narrow mobile header has a logo/theme-control overlap visible at 390 px. It exists in the before screenshot and remains unchanged because the user explicitly required preserving the header. Document width checks do not constitute an overlap audit.
- Longer headlines wrap differently, especially English; typography and hero composition are deliberately preserved. Content/design sign-off remains a user review step, not a claimed usability study.
- Verified domain/brand, legal operator, monitored contact, provider/country/retention decisions, final privacy inventory, KVKK/legal review and iOS release acceptance remain required. Existing legal draft content still blocks publication.
- No approved App Store/TestFlight destination or pricing model exists; Coming Soon remains. No regional free-access offer is published.

## Exact source files changed

Modified:
- `.env.example`
- `README.md`
- `RELEASE-CHECKLIST.md`
- `app/[locale]/[[...slug]]/page.tsx`
- `app/globals.css`
- `app/opengraph-image.tsx`
- `components/legal-document.tsx`
- `components/site.tsx`
- `lib/config.ts`
- `lib/content.ts`
- `lib/legal-copy.ts`
- `lib/release.ts`
- `scripts/check-release.mjs`
- `scripts/check-routes.mjs`

Added:
- `app/[locale]/og/route.tsx`
- `components/marketing.tsx`
- `lib/og-image.tsx`
- `lib/preview-copy.ts`
- `lib/seo.ts`
- `scripts/check-design-baseline.mjs`
- This report, `responsive.json`, and screenshots/metrics under `qa/marketing/before/` and `qa/marketing/after/`.

Local preview: http://127.0.0.1:3000/tr and http://127.0.0.1:3000/en.
