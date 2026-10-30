# Release & Publication Checklist

Website publication readiness and iOS App Store release readiness are tracked separately so the promotional **Coming Soon** website can be published before the iOS app is released on the App Store.

## 1. Website Publication Readiness (`websiteReleaseIssues`)

- [ ] Confirm brand/domain ownership (`NEXT_PUBLIC_SITE_URL`, `DOMAIN_OWNERSHIP_VERIFIED=true`). Do not assume `breakloop.app` belongs to this product.
- [ ] Support email `breakloopSupport@icloud.com` (Apple iCloud Mail) is confirmed working by the developer (`NEXT_PUBLIC_SUPPORT_EMAIL=breakloopSupport@icloud.com`). Keep `SUPPORT_EMAIL_MONITORED=false` in preview and set `SUPPORT_EMAIL_MONITORED=true` only when ready to expose the live address in the web UI and legal documents. Never expose the developer's primary personal email (`aliahmet44@icloud.com`).
- [ ] Confirm the individual developer's legal identity (`Ali Ahmet Erdoğdu`) against the Apple Developer account (`NEXT_PUBLIC_OPERATOR`) and confirm the legally required application channel/notification address (`LEGAL_OPERATOR_ADDRESS`) for the KVKK notice. Do not invent a company name.
- [ ] Confirm active Vercel plan/observability log retention (`LEGAL_HOSTING_RETENTION`), Vercel processing region(s) (`LEGAL_HOSTING_PROCESSING`), and Apple iCloud Mail processing/support retention (`LEGAL_EMAIL_PROCESSING`, `LEGAL_SUPPORT_RETENTION`).
- [ ] Replace every legal placeholder and editorial draft/review note in `lib/legal-documents.ts` with reviewed publication copy (`WEBSITE_PRIVACY_APPROVED=true`, `LEGAL_COPY_APPROVED=true`). Website privacy approval (`WEBSITE_PRIVACY_APPROVED`) is independent from iOS App Store privacy approval (`FINAL_PRIVACY_INVENTORY_APPROVED`).
- [ ] Legally review the separate KVKK notice (`/tr/kvkk`), concrete KVKK m.5 legal bases (`LEGAL_KVKK_HOSTING_BASIS`, `LEGAL_KVKK_SUPPORT_BASIS`), verified recipient categories (`LEGAL_KVKK_RECIPIENTS`), data subject application channel (`LEGAL_RIGHTS_PROCESS`, `LEGAL_RIGHTS_CHANNEL`), and the KVKK m.9 cross-border transfer legal mechanism (`LEGAL_KVKK_TRANSFER_BASIS`, `KVKK_LEGAL_REVIEW_APPROVED=true`).
- [ ] Approve final EN/TR marketing positioning (`MARKETING_COPY_APPROVED=true`), keep preview-only labels separate from publication copy, and run `npm run check:release`.
- [ ] Obtain explicit deployment authorization; only then set `SITE_RELEASE_APPROVED=true` to enable release indexing, canonical/hreflang tags, and sitemap output.

## 2. iOS App Store Release Readiness (`appStoreReleaseIssues`)

These gates apply before submitting or releasing the native iOS app on the App Store (they do not block publishing the Coming Soon promotional website once Section 1 is complete):

- [ ] Verify production Apple `FamilyControls` / Screen Time distribution entitlement approval (`FAMILY_CONTROLS_ENTITLEMENT_VERIFIED=true`).
- [ ] Inspect the signed iOS Release archive, `PrivacyInfo.xcprivacy` / required-reason APIs, and physical-device network behavior (`IOS_RELEASE_AUDIT_APPROVED=true`, `FINAL_PRIVACY_INVENTORY_APPROVED=true`).
- [ ] Complete signed-device iOS QA for Focus Mode (Deep Focus), Life Mode (shared budget + cooldown), Natural Rest Detection, and Diagnostics export/delete (`IOS_DEVICE_QA_APPROVED=true`).
- [ ] Verify that App Store Connect privacy nutrition labels match the published Privacy Policy and actual release binary (`APP_STORE_PRIVACY_ANSWERS_VERIFIED=true`).
- [ ] Confirm final App Store license selection in App Store Connect (Apple Standard EULA by default, or custom EULA if later added) and only add StoreKit/subscription terms if a paid/subscription model is actually implemented.
- [ ] Wire and device-test native iOS Settings Privacy, Support, Terms, and KVKK links against the live HTTPS website (`NATIVE_LEGAL_LINKS_VERIFIED=true`).
