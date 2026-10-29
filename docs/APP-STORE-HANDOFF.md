# App Store handoff — draft only

No App Store Connect fields were edited or submitted. No domain was assigned. The original submission matrix is retained at `legal-source/08_app_store_connect_and_review.md`.

| Field | Implemented website destination | Still required |
| --- | --- | --- |
| Privacy Policy URL | `/en/privacy`, `/tr/privacy` | Verified public HTTPS domain, final approved copy, no placeholders |
| Support URL | `/en/support`, `/tr/support` | Real monitored contact, provider/retention decisions, public reachability |
| Marketing URL | `/en`, `/tr` | Verified domain and explicit publication authorization |
| Terms | `/en/terms`, `/tr/terms` | Final terms review, confirm Apple Standard EULA selection; no IAP terms unless actually needed |
| Türkiye disclosure | `/tr/kvkk` | Separate legal review, completed controller, purposes, legal grounds, recipients and request channels |
| Native legal access | Proposal in `ios-proposal/` | Separate native authorization, verified URL configuration, compile and device test |
| App Privacy details | No answer selected | Audit exact release archive and actual off-device collection; do not infer Data Not Collected from this website |
| Review notes | Supplied template archived | Correct apps/categories-only selection scope, real public URLs, verified entitlement/signing, actual device test steps |
| Required-reason APIs | Source audit flags UserDefaults/file operations | Inspect release API use, choose truthful permitted reasons where needed and review Xcode privacy report |
| Purchases | No product offer or StoreKit model added | Define and implement actual model before price, renewal, restore or subscription terms |

Entitlement approval for all four targets, truthful age-rating answers, review contact, core device acceptance and any purchase QA remain external release tasks. No guessed credentials, product IDs or test results were added.
