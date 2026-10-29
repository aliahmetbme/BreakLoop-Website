# Privacy Policy — BreakLoop

**Last updated:** 29 October 2026 (draft; replace with publication date)  
**Operator/data controller:** [LEGAL_OPERATOR_NAME]  
**Privacy contact:** [VERIFIED_SUPPORT_EMAIL]  
**Scope:** BreakLoop native iOS app and, where specified, the official website at [VERIFIED_DOMAIN].

## 1. Our approach
BreakLoop helps people manage distraction by setting a shared usage allowance for selected applications, taking breaks, and starting Deep Focus sessions. Privacy is central to the way the current app is designed. It uses Apple's Screen Time frameworks and keeps its settings and runtime records locally on your device in the app's protected container and shared App Group container. The current release candidate does not use a BreakLoop account or a BreakLoop-operated cloud backend. This statement must be reconfirmed for the final distributed build.

## 2. Information processed on your device
With your authorization, BreakLoop processes the selection you make with Apple's FamilyActivityPicker. The picker gives BreakLoop privacy-preserving selection tokens for apps, app categories and/or web domains. BreakLoop uses these tokens to configure monitoring and temporary restrictions through Apple's FamilyControls, DeviceActivity and ManagedSettings frameworks. BreakLoop does not inspect messages, screenshots, keystrokes, or the contents of the applications you use.

To operate the features you choose, the app stores information on your device such as:
- your selected app/category/web-domain tokens and authorization state;
- allowance and rest-duration settings, appearance preference, cycle and session state;
- checkpoint timing, cooldown and focus deadlines and related operational status;
- local diagnostic events needed to understand failures and reliability, including timestamps, categories, event names, limited numerical metadata, error codes and random operation identifiers. The diagnostic serialization uses an explicit field allowlist rather than raw selected-app identifiers or free-form error messages.

BreakLoop's natural-rest detection uses an *estimate* based on usage checkpoints and elapsed time. It is not a continuous reading of every moment of your phone use.

## 3. What leaves your device
For the app version reviewed when this policy was drafted, no automatic transmission of your Screen Time selection, usage checkpoints or diagnostic archive to a BreakLoop server was identified. Apple processes Screen Time authorization and device activity under its own platform framework. App Store downloads, purchases (if introduced), system-level services and diagnostics supplied to Apple may be governed by Apple's policies.

**You control diagnostic sharing.** If you choose Export Logs and then use the iOS share sheet to save, email or otherwise send the exported JSONL file, that copy is handled by the destination service you choose. If you send it to our support address, we receive the file and any identifying information included with your message. Please check it before sharing and remove material you do not wish to disclose.

## 4. Contacting support
If you voluntarily email support, we may receive your email address, message, attachments, technical details and any diagnostic export you include. We use them only to answer, investigate and resolve your request, protect the service where necessary and comply with applicable law. These records may be handled by the selected email provider [EMAIL_SERVICE_PROVIDER] and will be retained for [SUPPORT_RETENTION_PERIOD / RULE], unless the law requires or permits another period. **Do not publish this paragraph without verifying these details.**

## 5. Official website
When you visit the official website, its hosting/CDN provider [HOSTING_PROVIDER] may process IP addresses, connection timestamps, browser/device information and technical request logs to serve and secure the site. The deployment must specify the provider, region(s), the actual access-log retention [HOSTING_LOG_RETENTION], and any active analytics, forms or cookies before this policy is published. Do not interpret the application's offline processing design as a promise that a website has no server logs. Any optional analytics or cookies will be disclosed and, where legally required, activated only with consent.

## 6. Storage and retention
App preferences and active runtime information remain on your device while needed to provide the chosen functionality, until reset or removed through app/device controls. The current local diagnostic archive is configured with a target of at least 14 days of history and a storage ceiling of approximately 50 MiB. Older events are pruned, and storage pressure can result in earlier removal. Older legacy diagnostic source files may persist after migration; system OSLog entries, copies exported to Files/iCloud or shared with others are outside the managed archive deletion operation. We do not promise that all diagnostic copies disappear automatically after exactly 14 days.

You can use **Settings → Diagnostics → Delete Diagnostic History** to delete the managed local diagnostic history. It does not remove your monitored-app selections or active settings. Removing the app ordinarily removes its app-managed local storage, subject to Apple's operating-system behavior, backups and any copies you saved or shared. If you have contacted support, request deletion of support records through [VERIFIED_SUPPORT_EMAIL], subject to applicable legal exceptions.

## 7. Permissions and your choices
Screen Time access is requested using Apple's system authorization flow. You can decline or revoke it through iOS system controls; core blocking and monitoring features cannot function without it. You can change the selected apps and cycle configuration in BreakLoop, remove the app, and delete locally managed diagnostic history. Revoking permissions does not itself delete a diagnostic export already shared outside the app.

## 8. Sharing, security and international transfers
The current app is not designed to sell personal information, run third-party advertising trackers or send Screen Time selections to advertising networks. If you contact support or visit the website, providers described above may process your information to provide those services. Their names, roles, processing locations and safeguards must be verified before publication. We use protections appropriate to the information and service, but no transmission or storage can be guaranteed perfectly secure.

## 9. Children and platform requirements
BreakLoop requests the appropriate iOS Screen Time authorization. Any use by minors is subject to Apple's applicable authorization and family controls. The app does not intentionally provide an independent user account or child-data collection service in the present scope. If the audience, age controls or product behavior changes, this section will be updated.

## 10. Your privacy rights
Depending on your location, you may have rights to access information, correct inaccurate data, request deletion, object to certain processing, or contact the relevant data protection authority. Because core settings are stored on-device, we usually cannot remotely retrieve or edit them. For website or support information we hold, contact [VERIFIED_SUPPORT_EMAIL]. In Türkiye, please also read the separate **KVKK Aydınlatma Metni** at [VERIFIED_DOMAIN]/tr/kvkk.

## 11. Changes and contact
We may revise this policy as the app, website, providers or law change. We will post the updated date and provide further notice where required. Contact [LEGAL_OPERATOR_NAME] at [VERIFIED_SUPPORT_EMAIL] for privacy requests.
