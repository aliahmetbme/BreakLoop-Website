# BreakLoop website

Next.js 16.4.3, React 19, TypeScript; EN/TR Coming Soon / tanıtım sitesi. Quiet Horizon tasarımı, tema seçimi, logo/görseller, Odak/Yaşam Modu ve Privacy/KVKK/Terms/Support sayfaları korunur. Hesap, veritabanı, form backend’i veya analitik eklenmez.

## Yerel çalışma

Node 22 ve npm. `npm ci`, `npm run dev`; `/tr` veya `/en`.

```sh
npm run typecheck
npm run check:release
npm run build
npm start -- --port 3107
CHECK_ORIGIN=http://127.0.0.1:3107 npm run check:routes
node scripts/check-design-baseline.mjs
```

## Netlify Free / GitHub

Netlify’de mevcut repoyu bağla; ana branch’i ve gerçek site adresini doğrula. `netlify.toml` build komutunu `npm run build`, publish dizinini `.next`, Node sürümünü 22 olarak belirler. Netlify’nin mevcut Next.js/OpenNext desteği kullanılır; adapter bağımlılığı, özel sunucu veya static export eklenmez. Image optimization ve `/en/og`, `/tr/og`, `/opengraph-image` korunur. Bu yerel hazırlık GitHub/Netlify bağlantısını uzaktan kurmaz veya doğrulamaz.

## Üç ortam değeri

`.env.example` güvenli yerel/Preview örneğidir. Yerel `.env.local` ve Netlify ortamları bu görevde değiştirilmez.

| Anahtar | Production context | Deploy Preview / Branch Deploy |
| --- | --- | --- |
| `SITE_PUBLICATION_APPROVED` | `true` | `false` |
| `NEXT_PUBLIC_SITE_URL` | Gerçek HTTPS Netlify ana adresi veya doğrulanmış custom domain | Aynı ana adres olabilir; canonical üretmez |
| `LEGAL_PUBLICATION_DATE` | `2026-10-30` | `2026-10-30` |

Ortam değerleri build sırasında bulunmalı; değişiklikten sonra rebuild gerekir. Yayın izni eksik/false ise Production build durur. Geçersiz HTTPS adresi, gerçek olmayan takvim tarihi, eksik teknik alanlar, taslak metin ve localhost linkleri kontrol edilir. Yerel build, izin yanlışlıkla true olsa bile indekslenebilir production sayılmaz.

Netlify `NETLIFY`, `CONTEXT`, `DEPLOY_PRIME_URL`, `DEPLOY_URL` değerlerini sağlar. Production yalnızca `CONTEXT=production` ile belirlenir. Deploy Preview, Branch Deploy, dev veya tanınmayan context güvenli biçimde noindex/nofollow kalır; canonical yoktur, sitemap boştur. Paylaşım görselleri Preview’nun kendi HTTPS adresini kullanır. Eski Vercel context desteği geriye dönük korunur; Netlify’de Netlify context’i önceliklidir.

## Hukuki takip ve kapsam

Altı maddelik iç liste artık production build şartı değildir. [LEGAL-FOLLOWUP](docs/LEGAL-FOLLOWUP.md) ve [destek saklama taslağı](docs/SUPPORT-RETENTION.md) manuel takip içindir; hukuki onay verilmiş sayılmaz. Altı aylık destek saklama hedefi uygulanmış bir garanti değildir. [Kısa yayın kontrolü](RELEASE-CHECKLIST.md) ve [Netlify hazırlık raporu](docs/NETLIFY-PRODUCTION.md) güncel talimatlardır. Eski raporların Vercel veya otomatik hukuki engel talimatları tarihsel kayıttır.

Commit, push, branch/PR, remote env değişikliği, ücretli plan ve deployment bu görev kapsamında yapılmaz. iOS reposu değiştirilmez.
