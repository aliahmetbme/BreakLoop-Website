# BreakLoop website

Independent Next.js App Router + strict TypeScript + Tailwind CSS project. iOS repository is read only and has not been modified. No branch, commit, push, PR or deployment was made.

## Run

Node.js 20.9+ (tested with 22.23.3).

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000/en or /tr. Root redirects to /en.

```sh
npm run typecheck
npm run build
npm start
```

Eight prerendered localized pages: home, how-it-works, privacy, support. React client code is limited to navigation, mobile menu and theme controls. FAQ uses native accessible details/summary. Theme is applied by a head script before paint and supports Light/Dark/System, including OS preference changes. No external fonts or scripts.

## Editing

- `lib/content.ts`: all EN/TR page copy, including FAQs and draft policies.
- `lib/config.ts`: validated site URL, contact, operator and indexing policy.
- `app/globals.css`: semantic design tokens and responsive styling.
- `components/site.tsx`: reusable presentation blocks.
- `public/images/preview-*.png`: illustrative screens extracted from supplied INDEX HTML; replace with approved device screenshots and update captions in `lib/content.ts` when available.
- `public/images/horizon-*.png` and `logo.png`: current native assets.

Public policy/support copy is deliberately marked draft. Source evidence and token mapping are in `SOURCE-REVIEW.md`. Do not remove the draft notice until release requirements are resolved.

## Deployment preparation (not deployed)

Import this folder as a Next.js project in Vercel; standard `npm run build`, no special output directory. Configure verified values from `.env.example`. `NEXT_PUBLIC_*` values are baked into the build, so rebuild after edits. Never use a guessed domain or support address.

Default builds emit noindex/nofollow, robots disallow and an empty sitemap. Canonical/hreflang URLs are generated only with a valid HTTPS site URL. Set `SITE_RELEASE_APPROVED=true` only after completing `RELEASE-CHECKLIST.md`. `VERCEL_ENV=preview` always disables indexing. Domain configuration and publishing require separate explicit authorization.

No database, account system, analytics, forms backend, prices or fabricated store links. Coming Soon is an informational status; the hero action scrolls to that section.

## Legal pack and release gate

Privacy copy now comes from `lib/legal-documents.ts`; original supplied files are in `docs/legal-source/`. Legal UI labels/metadata are in `lib/legal-copy.ts`. Added EN/TR `/terms` and Turkish-only `/tr/kvkk`; there is no fabricated English KVKK translation. Footer/legal navigation links to all appropriate documents.

`lib/release.ts` resolves verified configuration fields and reports publication blockers. Vercel production builds fail without explicit release approval, and requested release builds fail with incomplete fields or unrevised drafts. Fill `.env.example` only with verified decisions, revise the actual legal draft text after review, then rerun checks. Flags do not turn draft copy into approved copy.

```sh
npm run check:release
npm run check:routes  # requires the local preview server
```

See `docs/LEGAL-INTEGRATION.md` for reconciliation and publication rules, `docs/IOS-PRIVACY-AUDIT.md` for the limited static audit, and `docs/ios-proposal/` for un-applied native link proposals. No final signed-build audit, legal approval, App Store submission or native modification has occurred.
