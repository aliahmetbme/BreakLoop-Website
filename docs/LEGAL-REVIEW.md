# Yayın öncesi hukuki işler — iç çalışma notu

Bu dosya ziyaretçilere gösterilmez. Sayfa dilinin sadeleşmesi hukuki eksiklerin tamamlandığı anlamına gelmez. Hukuki onay verilmemiştir; mevcut Preview taslak/noindex durumundadır.

`lib/legal-review.ts` bu açık işleri build sırasında denetler. `SITE_PUBLICATION_APPROVED` tek yayın izni olarak kalır. Metindeki teknik etiketleri kaldırmak, bu listeyi kendiliğinden temizlemez.

| Tamamlanacak iş | Gerekli sonuç |
| --- | --- |
| Başvuru yöntemi | Gerçek kişi geliştiriciye uygun resmî başvuru yöntemi ve gerekli iletişim bilgileri doğrulanmalı, nihai metne yazılmalı. Ayrı bir şirket/ofis adresi var sayılmaz; destek e-postasının her türlü başvuru için yeterli olduğu da varsayılmaz. |
| Web sitesi / destek hukuki sebepleri | Her gerçek işleme faaliyeti için uygulanabilir KVKK m.5 sebebi belirlenip nihai aydınlatmaya eklenmeli. |
| Yurt dışı işleme | Vercel ve Apple iCloud Mail’in somut rolleri ve uygulanabilir KVKK m.9 mekanizması doğrulanıp metne eklenmeli. |
| Teknik kayıtlar | Sağlayıcı/geliştirici kapsamı ve gerçek saklama koşulları belirlenmeli; dashboard gösterim süresi silme garantisi sayılmamalı. |
| Destek yazışmaları | Talep kapandıktan sonra altı ay saklama, henüz uygulanmamış ve hukuken doğrulanmamış taslak karardır. `docs/SUPPORT-RETENTION.md` prosedürü uygulanıp test edilmeli; ancak sonra gerçek süre nihai metinde belirtilmeli. |

Gerçek belge tarihi `LEGAL_PUBLICATION_DATE` üzerinden girilecek; build tarihi kullanılmayacak. Tarih yokken arayüz teknik etiket yerine anlaşılır bir açıklama gösterir.

Her iş tamamlandığında yalnızca listedeki satırı silmek yeterli değildir: doğrulanan sonuç, ilgili Privacy/KVKK metnine de işlenmelidir. Resmî aydınlatma unsurları: https://www.kvkk.gov.tr/Icerik/2033/Aydinlatma-Yukumlulugu-
