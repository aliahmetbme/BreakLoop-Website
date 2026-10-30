# Website publication checklist

Current state: local/Preview only. `SITE_PUBLICATION_APPROVED=false`. A push to main can trigger Vercel production: do not commit/push or change remote settings without explicit authorization.

1. **Privacy/KVKK:** verify the short notices; complete the lawful processing grounds, international-transfer mechanism, applicable request method and contact details and actual hosting retention scope. Track outstanding work in `lib/legal-review.ts` and `docs/LEGAL-REVIEW.md`; put verified results directly in `lib/legal-documents.ts` before removing completed tasks. Implement and review the proposed support-mail deletion process in `docs/SUPPORT-RETENTION.md`; do not remove its draft warning before it is real. Review commercial hosting eligibility.
2. **Support:** test send/receive and reply for `breakloopSupport@icloud.com`; check mailto links. Code tests do not prove mailbox delivery.
3. **Document date and domain:** confirm the real legal document date in `LEGAL_PUBLICATION_DATE=YYYY-MM-DD` and the owned HTTPS origin in `NEXT_PUBLIC_SITE_URL`. Do not use a build date or guess domain ownership.
4. **EN/TR QA:** check mobile/desktop, theme first paint, image quality, navigation, legal links, OG/Twitter, noindex Preview and absence of localhost metadata. Run typecheck, check:release, build and check:routes.
5. **Production and final check:** only after the above, obtain explicit deployment authorization and set the single permission `SITE_PUBLICATION_APPROVED=true` in Production only. Build must still reject unresolved fields/drafts. Check final HTTPS pages, canonicals, alternate languages, robots/sitemap and contact. Keep Preview approval false/noindex and retain deployment protection. No production action is authorized by this checklist itself.

Native TestFlight/App Store acceptance belongs to the iOS release process and is not a website build gate.
