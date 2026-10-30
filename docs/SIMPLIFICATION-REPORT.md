# BreakLoop legal and publication simplification

Local baseline: `8e0d097`. Work completed 30 October 2026. No commit, push, branch, PR, deployment, protection change, purchase, DNS change or remote environment edit. Existing Vercel Preview was not changed.

## Simplification Summary

Publication now has one explicit permission: `SITE_PUBLICATION_APPROVED=false` by default. Legal content is edited directly in five readable document strings, not supplied through a large environment-variable mapping. Only public origin, actual document date and publication permission require configuration. Confirmed developer/support facts are separate from permission decisions.

Privacy EN/TR explains app-local settings and diagnostics, website technical requests and localStorage, voluntary Apple iCloud email and rights. KVKK has five short sections, with actual missing facts visible. Terms has three sections and a conditional Apple Standard EULA reference. Existing short support FAQs already cover Screen Time permission, restriction issues, shared usage and optional diagnostics; Turkish shared-usage wording was made more natural.

## Removed Complexity

| Original control | Decision |
| --- | --- |
| Domain, legal-copy, KVKK-review and marketing approval flags | Removed as build prerequisites; actual review goes in the five-item checklist. |
| Monitored-mail flag and duplicate support/operator environment values | Removed; use supplied support address and identity. Delivery is a real manual test, not a boolean assertion. |
| iOS release audit, final inventory, entitlement, device QA, privacy-label and native-link approval flags | Removed from website publication. Native release remains separate. |
| Many legal placeholder aliases/environment substitutions | Removed. Verified legal facts must replace missing fields directly in the document source. |
| Separate website/App Store release-validator paths | Replaced with one website issue collector and one publication assertion. |
| Localhost fallback social image origin | Removed. Explicit image route replaces automatic file-convention inheritance; local builds omit public share-image URLs. |

Preview/public copy separation remains useful: a preview accurately warns about drafts without putting that warning into eventual reviewed public labels. Historical supplied packs/audits remain as evidence; their old flag instructions are superseded by README and RELEASE-CHECKLIST.

## Retained Safety Checks

- Production requires the new permission explicitly true. Old `SITE_RELEASE_APPROVED` cannot authorize publication.
- Approval cannot bypass unresolved document fields, actual draft retention decisions or draft marketing/public labels.
- Vercel Preview stays noindex/nofollow with no canonical and empty sitemap even if approval true is accidentally shared. Prospective Netlify preview detection also stays non-indexable; this is not a migration configuration.
- Strict actual calendar date and HTTPS origin validation remain. Domain ownership is a human checklist item; URL parsing cannot prove it.
- EN/TR metadata, hreflang and localized OG/Twitter images have isolated completed fixtures, plus an actual locally simulated Vercel Preview build. Fixtures never replace the actual documents.
- Existing head theme initialization and `images.qualities: [75, 90]` already existed in the baseline and were retained.

## Updated Files

- `.env.example`, `next.config.ts`, `lib/release.ts`, `lib/config.ts`, new `lib/site-details.ts`: single permission, small config and supplied contact facts.
- `lib/legal-documents.ts`, `components/legal-document.tsx`, `lib/content.ts`: short notices, localized date call, natural Turkish support wording. `lib/legal-copy.ts` was inspected; its existing labels/design were retained.
- `app/layout.tsx`, `lib/seo.ts`, `app/opengraph-image/route.tsx` (replaces `app/opengraph-image.tsx`): no local share URL inheritance; same image endpoint remains accessible.
- `scripts/check-release.mjs`, `scripts/check-routes.mjs`, `scripts/check-design-baseline.mjs`: current release API, negative production/preview cases, route/SEO assertions and exact CSS comparison.
- `README.md`, `RELEASE-CHECKLIST.md`, `docs/SUPPORT-RETENTION.md`, `docs/HOSTING-OPTIONS.md`, this report: current operation and decision record.
- `qa/legal-simplification/`: before/after screenshots from baseline/current local builds and measured viewport/overflow data.

No changes to CSS, existing images, mockups, header/footer, navigation, controls, animations or marketing layout.

## Privacy / KVKK Status

The notices reflect the supplied developer, email, Vercel and Apple iCloud Mail facts without claiming that all personal-data processing is absent. App-local storage is distinguished from voluntary exports and website requests. Diagnostic deletion is not presented as deletion of system logs or exported copies. No legal approval or full native release audit is claimed.

Six months after support closure is explicitly a **draft decision**, not current practice. The short manual procedure identifies implementation/testing and legal review still required. No database, backend or cron was added; no mailbox messages were sent or deleted.

Official context: [KVKK notice duties](https://www.kvkk.gov.tr/Icerik/2033/Aydinlatma-Yukumlulugu-) and [international transfers](https://www.kvkk.gov.tr/Icerik/2053/Yurtdisina-Aktarim). These explain why actual legal facts must be completed; they do not establish a specific lawful basis for this developer. [Apple review privacy requirements](https://developer.apple.com/app-store/review/guidelines/#privacy) inform clear/accurate disclosure, not a claim of App Store acceptance.

## Remaining Real Legal Blockers

1. Verified applicable request method and contact details: `KVKK_APPLICATION_CHANNEL`.
2. Actual KVKK article 5 grounds for Vercel website access and voluntary support: `KVKK_WEBSITE_BASIS`, `KVKK_SUPPORT_BASIS`.
3. Applicable article 9 transfer mechanism and provider contractual roles: `KVKK_TRANSFER_BASIS`.
4. Actual hosting retention/processing scope: `HOSTING_RETENTION_SCOPE`. Dashboard log visibility is not a provider-wide deletion guarantee.
5. Implement, test and review the proposed support deletion procedure; revise draft wording only after it is real.

Actual legal document date and owned production origin are also unset. Mail delivery/reply has not been tested. Hosting must be suitable for the final commercial use. These are real decisions/tests, not additional approval environment flags.

## Build & Test Results

| Check | Result |
| --- | --- |
| `npm run typecheck` | PASS |
| `npm run check:release` | PASS; actual legal blockers are detected, completed fixtures only are allowed |
| `npm run build` | PASS with publication disabled |
| `VERCEL_ENV=production npm run build` without permission | Expected rejection: explicit publication permission missing |
| `SITE_PUBLICATION_APPROVED=true npm run build` against actual content | Expected rejection: missing origin/date, KVKK fields and draft decisions |
| Local simulated Vercel Preview with permission true | PASS build; actual generated EN/TR HTML noindex, public preview OG URLs, no canonical or localhost metadata |
| `CHECK_ORIGIN=http://127.0.0.1:3107 npm run check:routes` | PASS all 11 pages, invalid-route 404s, mailto/legal links, robots, empty sitemap, favicons, 1200×630 EN/TR PNGs and scenario assets |
| `node scripts/check-design-baseline.mjs` | PASS exact CSS against 8e0d097; prior assets/controls/labels preserved |
| `git diff --check` | PASS |

Route tests also verify theme script occurs in head before body and home image URLs retain q=90. Code/metadata checks cannot prove actual email receipt/reply or legal adequacy.

## Visual QA

Reconstructed `8e0d097` in a temporary directory without branches, then compared local baseline/current screenshots: TR light desktop 1440×1000 and EN dark mobile 390×844, home and privacy. Actual viewport measurements are in `qa/legal-simplification/metrics.json`; no horizontal document overflow in either case. Header, hero, palette, typography and legal page shell remain consistent. Notice text/contents naturally reflow. Existing compact mobile header logo space is unchanged, not a new regression. Animations were retained, so captures are not represented as pixel-identical snapshots. This is targeted visual QA, not an exhaustive device matrix.

## Hosting Recommendation

Keep working Vercel Preview intact. For future commercial launch, Netlify Free is a reasonable candidate: official permission for commercial projects and maintained Next.js 13.5+ adapter support cover this Next.js 16 line. Current Free has a 300-credit monthly hard limit. Exact-project deployment compatibility is still to be tested if migration is separately authorized. Vercel Hobby is restricted to non-commercial use; paid-product promotion should not rely on Hobby eligibility. Details and official sources: `docs/HOSTING-OPTIONS.md`. No host was changed.

## Production Readiness

**Not ready for publication.** Local implementation and tests are ready for review; legal/operational unknowns remain intentionally blocking. No remote site was published or reconfigured. Current build is the normal local non-indexable build, not the simulated Preview build.

## Next 3 Actions

1. Obtain verified KVKK grounds/transfer/request-channel/retention facts and complete the manual support procedure; update the actual short notices.
2. Test support mail receipt/reply, confirm the owned domain and real document date, and decide commercial hosting with separate authorization for any migration or paid change.
3. Repeat the five-item checklist, then request explicit production authorization; only then enable the single permission in Production and run the final URL/SEO checks.

## Follow-up: visitor copy and internal review work

Visitor-facing Privacy/KVKK no longer contains technical review tokens or an unimplemented six-month decision. The actual target policy remains explicitly a draft in `docs/SUPPORT-RETENTION.md` and `docs/LEGAL-REVIEW.md`. New `lib/legal-review.ts` tracks outstanding work, including processing grounds, transfer mechanism, request channel and retention. `releaseIssues` enforces this list independently of visitor copy. A negative test proves that clean document fixtures alone cannot clear actual pending work. Completed isolated fixtures explicitly supply an empty work list; production does not.

The publication date still has one strict source. An unset date displays a plain localized explanation, without inventing a date. The Preview draft banner and noindex remain. This supersedes earlier references in this report to document placeholders as the only way of tracking legal unknowns. No legal approval or publication occurred.
