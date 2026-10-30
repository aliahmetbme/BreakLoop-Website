# Netlify Free production hazırlığı

Başlangıç: GitHub `main` ve yerel HEAD aynı: `c43929c113e5bbb00efc9a21991c557853da5bcc`. Çalışma ağacı başlangıçta temizdi. Node 22.23.3, Next.js 16.4.3, React 19 ile yerelde doğrulandı.

## 1. Değişen dosyalar / GitHub’a daha sonra gönderilecek paket

| Dosya | Değişiklik |
| --- | --- |
| `lib/release.ts` | İç hukuki liste bağımlılığı kaldırıldı; Netlify context ve preview adresi desteği, production-only indexing ve teknik içerik kontrolleri. |
| `lib/legal-review.ts` | Silindi; altı madde `docs/LEGAL-FOLLOWUP.md` içine taşındı. Tamamlanmış sayılmadılar. |
| `lib/config.ts`, `lib/seo.ts` | Netlify Preview HTTPS görsel adresleri; saf metadata fonksiyonu gizli process.env fallback’ine dayanmaz. |
| `lib/site-details.ts`, `lib/legal-documents.ts` | Görünen hosting sağlayıcısı Netlify; geliştirici ve Apple iCloud Mail desteği korundu. |
| `netlify.toml` | `npm run build`, `.next`, Node 22; Deploy Preview ve Branch Deploy izinleri false. Ek adapter yok. |
| `.env.example` | Üç ortam değeri, güvenli varsayılanlar; eski Vercel domain’i kaldırıldı. |
| `scripts/check-release.mjs` | Gerçek mevcut metinlerle olumlu production testi; izin, context, URL/tarih/placeholder ve Preview negatif testleri. |
| `scripts/check-build-output.mjs` | Gerçek production/preview/local build çıktılarında 11 sayfa ve SEO doğrulaması. |
| `scripts/check-routes.mjs` | Netlify hosting açıklamasını doğrular; mevcut route/asset kontrolleri korunur. |
| `README.md`, `RELEASE-CHECKLIST.md`, `docs/LEGAL-REVIEW.md`, `docs/LEGAL-FOLLOWUP.md`, bu rapor | Güncel sade operasyon ve manuel hukuki takip. Eski raporlar tarihsel kayıttır. |

Commit/push, branch/PR, remote ortam değişikliği, deployment ve plan satın alma yapılmadı. Yerel `.env.local` değiştirilmedi. `next.config.ts`, paketler/lockfile, CSS, bileşenler, görseller ve tema kontrolü bu görevde değişmedi.

## 2. Kaldırılan build engelleri

`KVKK_APPLICATION_CHANNEL`, `KVKK_WEBSITE_BASIS`, `KVKK_SUPPORT_BASIS`, `KVKK_TRANSFER_BASIS`, `HOSTING_RETENTION_SCOPE`, `SUPPORT_RETENTION` artık `releaseIssues()` tarafından okunmaz. İzleme kaydı [LEGAL-FOLLOWUP.md](LEGAL-FOLLOWUP.md) içindedir. Bu değişiklik hukuki onay vermez. Altı aylık destek saklama hedefi uygulanmış veya doğrulanmış gibi sunulmadı.

## 3. Korunan teknik kontroller

- Production’da yalnızca `SITE_PUBLICATION_APPROVED=true` açık izin sayılır; eksik/false reddedilir.
- HTTPS ana origin, gerçek YYYY-MM-DD takvim tarihi, çözümlenmemiş teknik alanlar, taslak public copy ve yerel URL’ler kontrol edilir. URL sözdizimi kontrolü domain sahipliğini veya hukuki uygunluğu kanıtlamaz.
- Netlify Production: `CONTEXT=production`. Netlify Preview Server, deploy-preview, branch-deploy, dev, eksik/bilinmeyen context güvenli biçimde indeksleme dışıdır. Eski Vercel değişkenleri Netlify context’ini geçersiz kılamaz.
- Preview’da yanlışlıkla izin true olsa da noindex/nofollow, canonical yok, sitemap boş. Görsel origin’i kendi `DEPLOY_PRIME_URL`, yoksa güvenli `DEPLOY_URL`; Netlify ana `URL` veya eski Vercel adresine düşmez.
- Yerel ortam izin true olsa bile production context’i olmadan indekslenmez.

## 4. Netlify uyumluluğu ve GitHub bağlantısı

[Netlify’nin mevcut Next.js/OpenNext desteği](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/) kullanılır: App Router, route handlers ve next/image. Static export, özel sunucu veya adapter paketi eklenmedi. `/en/og`, `/tr/og`, `/opengraph-image` ve q=90 görseller korundu.

Netlify hesabındaki repo bağlantısı, production branch’i ve gerçek ana site adresi bu görevde uzaktan değiştirilmedi veya doğrulanmadı. Ayrı izin sonrası GitHub’a bu paketin gönderilmesi ve Netlify’de `aliahmetbme/BreakLoop-Website` / `main` bağlantısının kontrol edilmesi gerekir. Git bağlantısı hazır olduğunda Netlify push’larla otomatik build/deploy yapabilir. Yereldeki başarılı Next build, Netlify’nin gerçek adaptör/CDN aşamasının çalıştırıldığı anlamına gelmez; ilk izinli Netlify deploy sonrası image/OG ve SEO tekrar kontrol edilmelidir.

[Netlify ortam belgeleri](https://docs.netlify.com/build/configure-builds/environment-variables/) `NETLIFY`, `CONTEXT`, `DEPLOY_PRIME_URL`, `DEPLOY_URL` değerlerini açıklar; bunlar platform tarafından sağlanır, elle uydurulmaz.

## 5. Test sonuçları

| Test | Sonuç |
| --- | --- |
| `npm run typecheck` | PASS |
| `npm run check:release` | PASS; gerçek Coming Soon metinleriyle olumlu test, teknik negatif testler |
| `npm run build` | PASS, normal yerel/noindex çıktı |
| Netlify Production + izin false, geçerli URL/tarih | Beklenen ret; build yayın izni olmadan durdu |
| Netlify Production + izin true, geçerli URL/tarih | PASS, gerçek production build |
| Gerçek production HTML/robots/sitemap denetimi | PASS, 11 EN/TR sayfa, canonical/hreflang, 11 sitemap kaydı, HTTPS OG/Twitter |
| Netlify deploy-preview + yanlışlıkla izin true | PASS build; gerçek çıktı noindex/nofollow, canonical yok, sitemap boş, kendi HTTPS görsel origin’i |
| Branch Deploy/dev/bilinmeyen context ve Preview Server | PASS saf fonksiyon/metadata testleri; ayrı platform deployment yapılmadı |
| `npm run check:routes` / localhost:3107 | PASS 11 sayfa, yasal/mailto bağlantıları, 404’ler, faviconlar, EN/TR 1200×630 PNG ve senaryo görselleri |
| `node scripts/check-design-baseline.mjs` | PASS |
| c43929c’ye karşı CSS/components/public/lockfile/next.config diff | Değişiklik yok |
| `git diff --check` | PASS |

Simülasyonlarda kullanılan `breakloop-build-check.netlify.app` ve `deploy-preview-42--breakloop-build-check.netlify.app` yalnızca test origin’leridir; gerçek site adresi değildir ve internete deploy edilmemiştir. Son `.next` çıktısı normal yerel/noindex build olarak bırakıldı.

Tekrarlanabilir build denetimi:

```sh
# İlgili production/preview/local build tamamlandıktan sonra:
node scripts/check-build-output.mjs production https://breakloop-build-check.netlify.app
node scripts/check-build-output.mjs preview https://breakloop-build-check.netlify.app https://deploy-preview-42--breakloop-build-check.netlify.app
node scripts/check-build-output.mjs local
```

## 6. Netlify ortam değerleri — ayrıca kullanıcı tarafından ayarlanacak

| Değişken | Production | Deploy Preview / Branch Deploy |
| --- | --- | --- |
| `SITE_PUBLICATION_APPROVED` | `true` | `false` |
| `NEXT_PUBLIC_SITE_URL` | **Netlify’deki gerçek ana HTTPS adresi veya doğrulanmış custom domain** | Aynı production ana adresi kullanılabilir; canonical üretmez |
| `LEGAL_PUBLICATION_DATE` | `2026-10-30` | `2026-10-30` |

`NEXT_PUBLIC_SITE_URL` için gerçek Netlify site adı verilmediğinden bir adres uydurulmadı. Ortam değerleri Builds sırasında erişilebilir olmalıdır. Örnekteki test origin’ini veya eski Vercel domain’ini production değeri olarak kopyalamayın. `netlify.toml` Production iznini true olarak kaydetmez; yalnızca Preview/Branch Deploy false değerlerini içerir.

## 7. Sonuç

Coming Soon production build’i artık altı maddelik iç liste tarafından engellenmez; geçerli teknik yapılandırma ve açık production izniyle yerelde başarıyla üretilir. Tasarım ve sayfalar korunmuştur. GitHub’a gönderme, Netlify ortamlarını ayarlama ve gerçek deployment için ayrıca onay beklenir.
