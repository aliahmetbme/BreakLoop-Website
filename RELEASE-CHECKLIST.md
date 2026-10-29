# Publication blockers

- [ ] Confirm brand/domain ownership and potential naming conflict. Do not assume breakloop.app belongs to this product.
- [ ] Confirm legal operator, verified support contact, and retention/deletion of diagnostics received by support.
- [ ] Approve final release data/SDK inventory and privacy text, including hosting request processing.
- [ ] Complete signed-device iOS release QA and verify promoted functionality.
- [ ] Replace illustrative screens with approved screenshots, or explicitly approve labeled illustrations for release.
- [ ] Configure verified HTTPS URL/contact/operator and verify canonical, hreflang, OG and sitemap in the release build.
- [ ] Verify native Settings Privacy/Support links in the iOS release (outside this read-only task).
- [ ] Approve EN/TR copy, browser/accessibility QA and final legal/support drafts.
- [ ] Obtain explicit deployment authorization; only then enable release indexing.

## Added legal pack gates

- [ ] Replace every legal placeholder and editorial draft/review note in `lib/legal-documents.ts` with reviewed publication copy.
- [ ] Legally review separate KVKK notice, actual m.5 bases, controller/address, request verification channels and any m.9 transfer mechanism.
- [ ] Verify email/hosting provider, countries/subprocessors and separate support/hosting retention decisions.
- [ ] Confirm final App Store license choice; only add purchase-specific terms if an actual purchase model is implemented.
- [ ] Inspect signed Release archive, privacy manifests/required-reason APIs and physical-device network behavior. Static audit is not release sign-off.
- [ ] Apply native legal-link proposal only in a separately authorized task; compile and device-test it.
- [ ] Set verification/review flags only after evidence exists; run `npm run check:release`. `SITE_RELEASE_APPROVED=true` must still fail while legal draft text remains.
