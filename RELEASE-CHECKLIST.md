# Release & Publication Checklist

BreakLoop Website is an informational promotional website for an upcoming iOS application developed by **Ali Ahmet Erdoğdu** (official support contact: `breakloopSupport@icloud.com`, hosted on **Vercel**).

## 1. Website Publication Readiness (`websiteReleaseIssues`)

- [ ] Confirm public HTTPS domain (`NEXT_PUBLIC_SITE_URL`, `DOMAIN_OWNERSHIP_VERIFIED=true`).
- [ ] Confirm active support mailbox monitoring (`NEXT_PUBLIC_SUPPORT_EMAIL=breakloopSupport@icloud.com`, `SUPPORT_EMAIL_MONITORED=true`).
- [ ] Fill the remaining legal/KVKK fields (`LEGAL_PUBLICATION_DATE` in `YYYY-MM-DD` calendar format, `LEGAL_OPERATOR_ADDRESS`, `LEGAL_SUPPORT_RETENTION`, `LEGAL_KVKK_HOSTING_BASIS`, `LEGAL_KVKK_SUPPORT_BASIS`, `LEGAL_KVKK_TRANSFER_BASIS`) and remove draft/review wording in `lib/legal-documents.ts` (`LEGAL_COPY_APPROVED=true`, `KVKK_LEGAL_REVIEW_APPROVED=true`).
- [ ] Confirm EN/TR marketing copy (`MARKETING_COPY_APPROVED=true`), run `npm run check:release`, and set `SITE_RELEASE_APPROVED=true` only when ready to enable public indexing.

## 2. Separate iOS App Store Release Checks (`appStoreReleaseIssues`)

These checks apply when submitting the native iOS app to the App Store and do not block publishing the promotional website:

- [ ] Verify production Apple `FamilyControls` / Screen Time entitlement and final release archive (`FAMILY_CONTROLS_ENTITLEMENT_VERIFIED=true`, `IOS_RELEASE_AUDIT_APPROVED=true`, `FINAL_PRIVACY_INVENTORY_APPROVED=true`).
- [ ] Verify App Store Connect privacy nutrition labels, device QA, and native Settings links (`APP_STORE_PRIVACY_ANSWERS_VERIFIED=true`, `IOS_DEVICE_QA_APPROVED=true`, `NATIVE_LEGAL_LINKS_VERIFIED=true`).
