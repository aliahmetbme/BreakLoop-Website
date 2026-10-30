# Coming Soon sitesi yayın kontrolü — Netlify Free

Bu görev yalnızca yerel hazırlıktır. Commit/push, Netlify ortam değişikliği veya deployment için ayrıca izin gerekir.

1. **İçerik:** Netlify ve Apple iCloud Mail açıklamaları doğru; Privacy/KVKK/Terms/Support mevcut. Hukuki açıklar `docs/LEGAL-FOLLOWUP.md` içinde takip edilir; otomatik build engeli veya verilmiş hukuki onay değildir.
2. **Destek:** `breakloopSupport@icloud.com` bağlantısını ve gerçek posta alım/yanıtını dene. Kod testi teslimatı kanıtlamaz.
3. **Tarih ve adres:** Production için gerçek HTTPS ana adresini `NEXT_PUBLIC_SITE_URL`, belge tarihini `LEGAL_PUBLICATION_DATE=2026-10-30` olarak ayarla. Netlify site adı veya domain uydurma.
4. **Teknik QA:** Typecheck, check:release, build; EN/TR, mobil/masaüstü, tema, görseller ve bağlantılar. Production canonical/hreflang/sitemap/OG doğru; Preview noindex/nofollow, canonical yok ve sitemap boş.
5. **Yayın:** Ayrı izin sonrası GitHub bağlantısını ve ana branch’i Netlify’de doğrula. Yalnızca Production context’inde `SITE_PUBLICATION_APPROVED=true`; Deploy Preview/Branch Deploy false. Yayın sonrası gerçek URL’de son kontrol yap. iOS App Store QA bu tanıtım sitesinin build şartı değildir.
