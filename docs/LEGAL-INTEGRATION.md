# Legal pack integration — 29 October 2026

## Implemented

- Supplied EN/TR privacy drafts adapted into `/en/privacy` and `/tr/privacy`.
- Separate `/tr/kvkk`, including a keyboard-scrollable data-processing table. `/en/kvkk` deliberately returns 404; the language control offers the English privacy policy and says this in its title. Both languages link to the Turkish notice with `lang="tr"`.
- `/en/terms` and `/tr/terms` added as minimal, clearly marked drafts. No standalone terms file was supplied, so these are a proposed structure, not approved legal terms. Apple Standard EULA is linked as the proposed App Store default; no purchase model is promised.
- Support retains troubleshooting and adds voluntary diagnostic sharing, pending contact and retention disclosures. No form/backend or tracking added.
- Related links, footer navigation, document contents anchors, localized legal metadata, semantic lists/headings and responsive tables.
- Unfilled source fields are visible as highlighted “to be verified” fields in preview, never invented.

## Reconciliation decisions

1. Supplied privacy drafts describe app/category/web-domain tokens. Native `ShieldSelectionSupport` in `MonitoringLifecycle.swift` requires webDomains == 0; `DeviceActivityService` passes empty webDomains. Published feature wording therefore covers apps/categories only and distinguishes what Apple's picker framework supports from v1.0's accepted selection.
2. Current Diagnostics UI uses `Delete History`; the provided `Delete Diagnostic History` label was corrected. Some UI headings remain English in native code; no Turkish native-screen labels were invented.
3. Turkish marketing uses “ortak kullanım süresi,” carrying forward the user's terminology choice.
4. Hypothetical analytics activity removed from KVKK table because this website has none. Actual future analytics would require a new data-flow and legal review.
5. Legal operator, support mailbox, providers, processing countries, retention, legal bases and publication date remain unknown. KVKK is not represented as legally completed.
6. Original files are retained unchanged in `docs/legal-source`. Rendered/adapted content lives in `lib/legal-documents.ts`. The source prompt is a reference document, not automatic authorization to change the native repository, publish, create accounts, or submit App Store metadata.

## Publication protection

- Local/preview builds remain noindex/nofollow with robots disallow and empty sitemap.
- Vercel production builds require `SITE_RELEASE_APPROVED=true`.
- A requested release build also requires a public HTTPS origin, legal operator, valid monitored email, provider/retention/processing decisions, legal bases, rights channels, date, domain verification, final privacy inventory and review/audit approvals.
- Filling environment fields or setting approval flags alone is insufficient: unresolved fields and unrevised draft/review wording in legal documents block the build. Replace the actual drafts with reviewed publication copy first.
- Unknown domain: no canonical/hreflang URLs. Known domain: correct actual route alternates; KVKK has TR only. Canonical metadata does not enable indexing.
- `.env.example` lists all prerequisites. Nothing has been deployed or submitted.

## Native handoff (proposal only)

`docs/ios-proposal/BreakLoopLegalLinks.swift` and `SettingsView.patch` propose accessible localized native Settings links. They read only a separately verified HTTPS origin from the app's Info.plist and disable links when it is missing. SwiftUI openURL falls back to UIApplication.open. Add the proposal file and apply the Settings insertion only in a separately authorized native task; configure the verified URL then build/test on device. Neither patch nor Swift proposal has been compiled or applied.

## Official references checked

- Apple App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Apple Standard EULA: https://www.apple.com/legal/internet-services/itunes/dev/stdeula/
- KVKK Aydınlatma Yükümlülüğü: https://www.kvkk.gov.tr/Icerik/2033/Aydinlatma-Yukumlulugu-

The source submission matrix remains a draft. No entitlement approval, purchase model, privacy label or legal basis was assumed from it.
