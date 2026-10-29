# iOS source privacy audit — NOT a final Release build audit

Date: 29 October 2026. Read-only source baseline: `fb176cc5ba92dbeb2efdf49fd743f4c46b6b8662` at `/Users/aliahmeterdogdu/Projects/BreakLoop`. No signed archive, physical-device network capture or App Store Connect session was inspected. **No “Data Not Collected” declaration is authorized by this report.**

| Area | Static evidence | Remaining release evidence |
| --- | --- | --- |
| Third-party packages/SDKs | Reviewed Xcode target packageProductDependencies lists are empty; no Package.swift, Package.resolved, Podfile or third-party analytics/crash imports found in source inventory | Inspect final archive, embedded frameworks, linked binaries and Xcode privacy report |
| Local persistence | AppGroupStorage uses shared UserDefaults and runtime files for configuration, selection/checkpoints and session state | Confirm actual distributed entitlements, sandbox behavior and backups |
| Required-reason APIs | UserDefaults is used in persistence and diagnostics; native code also performs file operations | Map actual APIs in archive to current Apple required-reason categories; validate permitted reason codes, never guess them |
| Privacy manifest | No PrivacyInfo.xcprivacy found in reviewed source file inventory | Assess requirement, supply truthful manifest where required, inspect Xcode privacy report and distribution validation |
| Network/IP | No URLSession, URLRequest, NWConnection, WKWebView or hardcoded http(s) endpoint found in reviewed Swift sources; Settings opens iOS settings | Physical Release-build network capture across cold launch, authorization, monitoring, cooldown, Deep Focus and export; operating-system traffic is separate |
| Accounts | No independent user-account implementation identified in reviewed source | Confirm final linked code and distributed build |
| Purchases | No StoreKit imports/products/transaction implementation or .storekit configuration found in reviewed source | Confirm final archive and actual product plan; do not announce subscriptions or a free tier |
| Diagnostics | PersistentLogStore, AppLogger, allowlist and DiagnosticsView reviewed: local archive, at-least-14-day target, 50 MiB cap, user export/share and confirmed deletion | Exercise full Release flow, export contents and destinations on physical device; evaluate overflow/legacy/OSLog behavior |
| Third-party processors | No support-email or hosted web processor can be established from native source | Name email/CDN/hosting providers, countries, subprocessors, retention and transfer safeguards |
| Selection scope | Support predicate explicitly rejects webDomainTokens; current monitoring uses empty webDomains | Confirm signed device behavior matches apps/categories-only policy |
| Native legal links | Existing Settings About lacks final website links; separate proposal prepared | Configure verified domain, authorize native change, apply, compile, test VoiceOver and browser failure handling |

Searches included all Swift/plist/project files in the local checkout for networking, purchasing, tracking identifiers, imports, manifest/package files and relevant persistence/diagnostic APIs. Absence in source search is not evidence about all behaviors of a future signed build or platform services.

## Release audit still required

1. Inventory actual archive frameworks, packages, privacy manifests and required-reason APIs.
2. Capture physical-iPhone Release-build network activity for every core flow and any future purchase flow.
3. Review actual exported JSONL, user sharing controls, permissions, OSLog and legacy exceptions.
4. Confirm Family Controls distribution approval/provisioning for app plus three extensions.
5. Validate Apple App Privacy answers, operator/provider details and legal text against that exact build.
6. Verify publicly reachable final Privacy/Support/Terms URLs and native links only after publication is separately authorized.

The supplied App Store matrix and review-note template are archived at `docs/legal-source/08_app_store_connect_and_review.md`. Its web-domain test wording must be changed to apps/categories to match v1.0 before submission; unverified entitlement and public-URL fields must stay unresolved until evidenced.
