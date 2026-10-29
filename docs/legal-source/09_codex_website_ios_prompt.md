# Codex task — BreakLoop legal / support web implementation and native link integration

## Boundaries
- Website: use the existing independent Next.js App Router / TypeScript / Tailwind codebase. **Do not create a new project or rewrite the design**. Keep the Quiet Horizon theme and bilingual EN/TR routes.
- iOS repository `aliahmetbme/BreakLoop`: **READ ONLY in this ChatGPT workflow**. Codex may prepare patch proposals, but do not commit/push/PR or modify GitHub until the user explicitly authorizes a separate development task.
- Do not invent an operator, domain, support email, privacy/data terms, entitlements, pricing, subscriptions, analytics or user accounts.

## Deliverables
1. Reconcile the existing `/en/privacy`, `/tr/privacy`, `/en/support`, `/tr/support` draft pages with this pack and add `/en/terms`, `/tr/terms`, and `/tr/kvkk` (or local equivalent using the established route conventions). Prefer content-driven components and accessible headings.
2. Add footer/legal links, correct localized route switches, localized metadata, semantic accessibility, mobile layout and dark/light contrast. No cookie banner unless real non-essential cookies or analytics require it.
3. Configure **fail-closed publication checks**: require verified HTTPS site URL, legal operator and monitored support email, support-ticket and hosting-log retention decisions, final privacy inventory, explicit `SITE_RELEASE_APPROVED` before enabling `index,follow`/sitemap/robots. Do not accidentally expose placeholders or publish unreviewed legal drafts. A preview may render with a prominent draft marker and `noindex`.
4. Avoid traffic analytics, embedded contact forms or third-party tracking until their data practices and notices are approved. If adding infrastructure changes, report how they affect web data flows.
5. Provide a proposed (not committed) SwiftUI Settings patch to add Privacy Policy, Support and Terms links with safe verified HTTPS URLs, localized labels, external browser fallback and accessible interaction. Do not assume Screen Time permissions grant web tracking consent.
6. For iOS final Release build, produce an audit report for any third-party SDKs, required-reason APIs, `PrivacyInfo.xcprivacy`, user account features, purchases, IP/network calls, diagnostic exports and third-party processors. Do not declare `Data Not Collected` before results.
7. Run lint/typecheck/build, exercise all legal routes in both languages, verify 200/404 statuses, navigation, mobile widths, keyboard/VoiceOver affordances, no placeholders in publication build, noindex preview, accessible support contact, and real device Safari if available. Provide evidence and list anything not tested.
8. Do NOT publish, assign a domain, create a GitHub branch, change a GitHub repository or submit ASC until explicit authorization and prerequisites are met.

## Acceptance criteria
- Final public policy explains opaque Screen Time tokens, device-local state, sanitized local diagnostics with 14-day target/50 MiB cap and early eviction/legacy exceptions, voluntary log exports, support processing, hosting logs, permission revocation and user deletion choices.
- Turkish KVKK notice is a separate, completed and legally reviewed disclosure, not a blind translation.
- EULA refers to Apple's standard terms by default; any IAP terms reflect the actual StoreKit model.
- Privacy policy is accessible from App Store Connect and within native Settings; Support URL contains actually reachable contact information.
- A detailed change list, tests and open blockers are returned; nothing is falsely marked production-ready.
