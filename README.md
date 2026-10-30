# BreakLoop website

Next.js 16 App Router, TypeScript, EN/TR. Product introduction, email support and short legal notices. No accounts, database, form backend or analytics. Existing Quiet Horizon design, images and theme controls are preserved.

## Local work

Node.js 20.9+; tested with Node 22. Run `npm ci`, then `npm run dev`. Open `/tr` or `/en` on http://127.0.0.1:3000. Eleven localized pages include privacy, terms, support and Turkish-only KVKK.

```sh
npm run typecheck
npm run check:release
npm run build
npm start -- --port 3107
CHECK_ORIGIN=http://127.0.0.1:3107 npm run check:routes
node scripts/check-design-baseline.mjs
```

## Three configuration values

See `.env.example`. Actual local/remote env files are not overwritten.

- `SITE_PUBLICATION_APPROVED=false`: the only publication permission, false by default. Missing or false blocks a Vercel production build. Setting true still rejects unresolved fields and draft decisions. Preview remains noindex even if approval is accidentally shared.
- `NEXT_PUBLIC_SITE_URL`: owned and verified public HTTPS origin. No guessed domain; local/Preview has no production canonical or populated sitemap.
- `LEGAL_PUBLICATION_DATE`: actual document date in YYYY-MM-DD; strict calendar validation and EN/TR formatting. Never automatically use build/deployment time.

Vercel supplies `VERCEL_ENV`/`VERCEL_URL`; no extra approval flags. Legacy flags are ignored. Developer/contact facts live in `lib/site-details.ts`; notices in `lib/legal-documents.ts`; marketing/support copy in `lib/content.ts`; legal labels in `lib/legal-copy.ts`. Local sharing image tags are omitted until a public origin exists; Vercel Preview uses its own HTTPS image URLs without indexing. Image endpoints remain `/en/og`, `/tr/og`, `/opengraph-image`.

## Publication remains blocked

Complete the five items in [RELEASE-CHECKLIST.md](RELEASE-CHECKLIST.md). Actual missing KVKK grounds, transfer mechanism, verified request channel, hosting retention and support deletion practice are tracked internally in `lib/legal-review.ts` and `docs/LEGAL-REVIEW.md`. Verified results must be included in the notices before closing tasks; clean visitor copy does not clear these blockers. Six months after support closure is a draft decision, not an implemented guarantee; see [manual procedure](docs/SUPPORT-RETENTION.md). A passing fixture test does not approve actual legal text or prove mail delivery.

**Main is connected to Vercel production. Do not push to main, deploy, change remote settings or migrate hosting without explicit authorization.** This task makes local changes only. Website publication does not depend on iOS TestFlight/App Store QA approval flags.

See [simplification report](docs/SIMPLIFICATION-REPORT.md) and [hosting assessment](docs/HOSTING-OPTIONS.md). Older reports, `docs/legal-source/` and iOS audits are historical evidence; their old multi-flag instructions are superseded by this README and the current checklist. No native iOS changes are applied.
