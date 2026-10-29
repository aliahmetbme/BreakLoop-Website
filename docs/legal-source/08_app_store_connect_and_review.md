# BreakLoop v1.0 — App Store Connect & App Review submission matrix

## Required/conditional inputs
| Field | Proposed decision | Gate |
|---|---|---|
| iOS Privacy Policy URL | `https://[VERIFIED_DOMAIN]/en/privacy` or localized TR route | Public HTTPS, no login, no placeholder text, matches release |
| In-app Privacy Policy | Settings → About/Legal | Must be easy to find and open |
| App Privacy Details | **Candidate**: Data Not Collected for app, **only if validated** | Submit exact build with zero developer/SDK off-device collection; app support form/SDKs may change answer |
| Support URL | `https://[VERIFIED_DOMAIN]/en/support` / `/tr/support` | Must show real contact information |
| Marketing URL | Home page (optional) | Real published domain |
| Privacy Choices URL | Support/privacy choices page (optional) | Describe local deletion, permission revocation and support record requests |
| EULA | Apple's Standard EULA | No need to upload custom EULA unless legal team chooses one |
| Terms link | `/en/terms` and `/tr/terms` | Important for paid subscription flows; ensure correct EULA path |
| Age rating | Complete App Store Connect questionnaire truthfully | No assumed rating |
| Review Notes | Use text below, adapt to final build | Explain individual Screen Time, physical-device steps, permission behavior |
| Family Controls distribution | Main target + DeviceActivityMonitor, ShieldConfiguration, ShieldAction extensions | Verify Apple approval and distribution provisioning |
| Website operations | Legal operator, host/CDN logs, contact email, privacy notice | Must be verified, distinct from app's on-device data |

## Why "Data Not Collected" needs testing
Apple defines collection as transmission off-device to developer/third party with access beyond processing the real-time request. On-device App Group storage and a manually exported file do not automatically imply developer collection. However, adding crash reporting, analytics, networked purchasing backend, API telemetry, in-app support form or third-party SDKs can change the declaration. Also consider any built-in third-party code, IP logs and website separately. Re-audit the final submitted archive and App Privacy details before selection.

**Practical verification:**
1. Inspect Xcode project, linked packages, embedded SDKs, URLs, network/session APIs, crash/analytics instrumentation and extensions.
2. Capture the final Release build's network behavior on a physical iPhone (cold start, permission, monitoring, cooldown, Deep Focus, diagnostics export, purchasing if any).
3. Verify diagnostics export is user-initiated, the app does not upload it, and support links do not embed unexplained tracking.
4. Document findings; only then choose data-type answers in App Store Connect and update privacy policy.

## Required-reason APIs and privacy manifest
- Inspect the release build for Apple's required-reason API categories, including accesses to UserDefaults/file timestamps if applicable.
- Decide whether an app `PrivacyInfo.xcprivacy` and/or third-party SDK manifests are required; supply only valid keys and allowed reason codes based on actual usage, not a fabricated boilerplate manifest.
- Rebuild and inspect Xcode's privacy report; resolve any validation warnings.

## App Review Notes — DRAFT (do not claim approved entitlement yet)
> BreakLoop is a native iOS digital well-being app that uses Apple's FamilyControls, DeviceActivity and ManagedSettings frameworks. It requests `.individual` Screen Time authorization on first run, then uses Apple's FamilyActivityPicker to select apps/categories/web domains. The user can configure one shared usage allowance and a rest period; the app schedules monitoring and applies a system shield after reaching the selected allowance. Deep Focus enables a separate user-configured fixed shielding session. The natural-rest calculation is based on system usage checkpoints, not inspection of app content. The app does not require an account in the reviewed build. To test on a physical device: (1) launch and allow Screen Time authorization, (2) choose one or more apps with FamilyActivityPicker, (3) set a short available usage allowance and start BreakLoop, (4) use the selected app to approach threshold and observe cooldown and eventual unlock, (5) review Deep Focus and Settings → Diagnostics. Screen Time callback timing is managed by iOS; please allow system scheduling time. Family Controls distribution entitlement for the app and extensions: [VERIFY APPROVED STATE]. App Privacy Policy: [PUBLIC_URL]. Support: [PUBLIC_URL]. Purchase / paywall test steps: [NOT APPLICABLE UNTIL IMPLEMENTED / VERIFIED].

**Never insert unverified demo credentials, test results, entitlements, exact timer promises or in-app purchase product IDs.**

## StoreKit decision tree
- **No paid feature released**: do not mention subscription, lifetime access or restore in a product offer.
- **Non-consumable lifetime IAP**: show exact name, price, what features are included, verified transaction handling, restoring purchases, Apple billing/refund references. Do **not** use auto-renewal/cancellation copy.
- **Auto-renewable IAP**: must show localized full billing amount, duration, what is included, auto-renewal, any trial length and subsequent full price, restore, management/cancellation path, accessible Terms and Privacy links. Test sandbox renewal/cancel/restore behavior and ensure ongoing subscriber value.

## Blocking conditions for submitting v1.0
- Unconfirmed legal operator/contact or unsuitable domain/brand (same/similar BreakLoop names exist in Apple and Google stores).
- Privacy/support pages not reachable publicly, wrong language, placeholders visible or missing in-app links.
- Privacy declaration contradicts real SDK/network behavior.
- Family Controls distribution entitlement/signing not verified for four targets.
- Screen Time core behavior and release build on device not accepted.
- StoreKit SKU/entitlement/paywall (if present) not implemented/tested and metadata mismatches.
- Missing or incorrect App Review contact or test notes.

## Sources
- https://developer.apple.com/app-store/review/guidelines/
- https://developer.apple.com/app-store/app-privacy-details/
- https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information
- https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy
- https://developer.apple.com/documentation/familycontrols/requesting-the-family-controls-entitlement
- https://developer.apple.com/support/third-party-SDK-requirements/
- https://developer.apple.com/app-store/subscriptions/
- https://developer.apple.com/help/app-store-connect/manage-app-information/provide-a-custom-license-agreement
