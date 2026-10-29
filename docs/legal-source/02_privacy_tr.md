# Gizlilik Politikası — BreakLoop

**Son güncelleme:** 29 Ekim 2026 (taslak; yayın tarihiyle değiştirilecek)  
**İşleten/veri sorumlusu:** [HUKUKİ_YAYINCI_UNVANI]  
**Gizlilik iletişimi:** [DOĞRULANMIŞ_DESTEK_EPOSTASI]  
**Kapsam:** BreakLoop iOS uygulaması ve belirtilen bölümlerde [DOĞRULANMIŞ_ALAN_ADI] üzerindeki resmi web sitesi.

## 1. Gizliliğe yaklaşımımız
BreakLoop, kullanıcının seçtiği uygulamalar için ortak kullanım bütçesi belirlemesine, molalar vermesine ve Deep Focus oturumları başlatmasına yardımcı olur. İncelenen güncel iOS sürümü Apple'ın Screen Time altyapısını kullanır; uygulama ayarları ve çalışma verileri cihazın korumalı uygulama alanında ve App Group alanında yerel olarak saklanır. İncelenen kodda kullanıcı hesabı, bağımsız BreakLoop sunucusu veya üçüncü taraf analitik SDK'sı bulunmamaktadır. Bu durum App Store'a gönderilecek kesin build için yeniden doğrulanmalıdır.

## 2. Cihazda işlenen bilgiler
İzninizle Apple FamilyActivityPicker üzerinden uygulama, kategori ve/veya web alanı seçersiniz. BreakLoop'a içerik yerine gizliliği koruyan seçim belirteçleri (token) sağlanır. Bu belirteçler Apple'ın FamilyControls, DeviceActivity ve ManagedSettings servisleriyle kullanım izleme ve geçici engelleme için kullanılır. BreakLoop mesajlarınızı, ekran görüntülerini, tuş vuruşlarını veya kullandığınız uygulamaların içeriklerini incelemez.

Uygulama, seçtiğiniz özellikleri sağlamak için cihazda şu bilgileri işleyebilir: seçili uygulama/kategori/web alanı belirteçleri, izin durumu, kullanım ve dinlenme süresi ayarları, görünüm tercihi, döngü ve oturum durumları, zaman kontrol noktaları, mola ve Deep Focus bitiş zamanları. Ayrıca hata ayıklama amacıyla zaman damgası, sınırlı sayısal alan, olay türü, hata kodu ve rastgele işlem kimlikleri içeren yerel tanılama geçmişi tutulur. Tanılama alanları izinli alan listesiyle sınırlandırılmıştır; ham uygulama seçimi veya serbest biçimli hata mesajları arşivlenmek üzere tasarlanmamıştır.

Natural Rest Detection, zaman ve kullanım kontrol noktalarından **tahmini** mola hesaplaması yapar; tüm telefon faaliyetlerini kesintisiz izlediği anlamına gelmez.

## 3. Cihaz dışına aktarım
İncelenen mevcut uygulama kodunda Screen Time seçimlerinin, kullanım kontrol noktalarının veya yerel tanılama arşivinin BreakLoop sunucularına otomatik gönderimi tespit edilmedi. Apple'ın işletim sistemi, App Store ve (ileride sunulursa) satın alma işlemleri kendi şartlarına tabidir.

**Tanılama paylaşımı sizin tercihinizdir.** Ayarlar → Diagnostics → Export Logs ile dosya oluşturup iOS paylaşım menüsünden e-posta, Dosyalar veya başka bir hizmete gönderebilirsiniz. Dışa aktarılan JSONL kopyasının saklanması seçtiğiniz hedefin koşullarına bağlıdır. Bu dosyayı destek ekibine gönderirseniz dosyayı ve mesajınızda belirttiğiniz iletişim bilgilerini alırız. Paylaşmadan önce içeriği gözden geçirmenizi öneririz.

## 4. Destek talepleri
Bize e-posta gönderirseniz e-posta adresiniz, mesajınız, ekleriniz ve sizin seçerek gönderdiğiniz tanılama dosyaları tarafımıza ulaşabilir. Bu veriler sorununuzu yanıtlamak, araştırmak ve gerektiğinde hukuki yükümlülükleri karşılamak için işlenir. Kullanılacak e-posta hizmeti [EPOSTA_HİZMET_SAĞLAYICISI], kayıtların saklama süresi [DESTEK_KAYDI_SAKLAMA_SÜRESİ] ve silme yöntemi doğrulanmadan bu metin yayınlanmamalıdır.

## 5. Resmi web sitesi
Web sitesini ziyaret ettiğinizde barındırma veya CDN hizmeti [BARINDIRMA_SAĞLAYICISI], siteyi sunmak ve güvenliğini sağlamak için IP adresi, erişim zamanı, tarayıcı/cihaz türü ve teknik istek kayıtlarını işleyebilir. Kullanılan sağlayıcı, ülkeler, erişim kayıtlarının saklama süresi [WEB_LOG_SAKLAMA_SÜRESİ], analiz araçları, form ve çerezlerin gerçek kullanım durumu yayın öncesinde netleştirilmelidir. Uygulamanın yerel çalışması, web sitesinin sunucu erişim kaydı bulunmadığı anlamına gelmez. Gerekli durumlarda isteğe bağlı çerezler/analiz için hukuken uygun izin mekanizması sağlanır.

## 6. Saklama ve silme
Uygulamanın yerel ayarları, işlevlerini yerine getirmek için gerektiği sürece cihazda tutulur. Tanılama arşivinin hedefi en az 14 günlük geçmişi tutmaktır; kapasite sınırı yaklaşık 50 MiB'dir. Eski kayıtlar temizlenebilir ve yer baskısı daha erken silinmeye yol açabilir. Önceki sürümlere ait eski kayıt dosyaları geçişten sonra kalabilir; işletim sisteminin OSLog kayıtları, kullanıcı tarafından dışa aktarılmış/iCloud'a kaydedilmiş veya üçüncü kişilere gönderilmiş kopyalar ayrı kapsamdır. **Tüm tanılama verilerinin tam 14 gün sonunda silindiğini vaat etmiyoruz.**

**Ayarlar → Diagnostics → Delete Diagnostic History** işlemi, uygulamanın yönettiği yerel tanılama geçmişini siler; seçimleri ve döngü ayarlarını korur. Uygulamanın kaldırılması normalde uygulamanın yönettiği yerel verileri kaldırır; işletim sistemi, yedekleme ve dışa aktarılmış kopyalar farklı davranabilir. Destek ekibine ulaştırılmış kayıtların silinmesini, yasal istisnalar saklı kalmak üzere, [DOĞRULANMIŞ_DESTEK_EPOSTASI] üzerinden isteyebilirsiniz.

## 7. İzinler ve tercihleriniz
Screen Time izni Apple'ın sistem penceresi üzerinden alınır. İzin vermeyebilir veya iOS ayarlarından daha sonra kaldırabilirsiniz; temel kullanım izleme ve engelleme bu izin olmadan çalışmaz. İzlenecek uygulamaları ve ayarları değiştirebilir, tanılama geçmişini silebilir ve uygulamayı kaldırabilirsiniz. İzni kaldırmak daha önce bir başkasıyla paylaştığınız dosyaları silmez.

## 8. Aktarımlar ve güvenlik
İncelenen sürüm, Screen Time seçimini reklam ağına iletmek, kullanıcı verilerini satmak veya çapraz uygulama izleme yapmak için tasarlanmamıştır. Destek e-postası ve web sitesi hizmet sağlayıcıları, belirtilen hizmetleri sunmak için verileri işleyebilir. Sağlayıcıların kimliği, veri işleme ülkeleri ve koruma tedbirleri yayın öncesinde doğrulanacaktır. Hiçbir dijital sistem için mutlak güvenlik garanti edilemez.

## 9. Çocukların gizliliği
İlgili Screen Time yetkilendirmesi iOS üzerinden alınır. Reşit olmayan kişilerin kullanımı, Apple'ın yaşa ve aile denetimlerine ilişkin sistem kurallarına tabidir. Ürün kapsamı veya çocuklarla ilgili veri işleme değişirse metin güncellenir.

## 10. Haklarınız
Uygulanabilir mevzuata göre verileriniz hakkında bilgi edinme, düzeltme, silme ve diğer yasal haklarınız olabilir. Yerel ayarlarınızı uzaktan göremediğimiz veya yönetemediğimiz için bu işlemler çoğunlukla cihazınızdan yapılır. Destek ve web sitesiyle ilgili tarafımızda bulunan veriler bakımından [DOĞRULANMIŞ_DESTEK_EPOSTASI] üzerinden iletişime geçebilirsiniz. Türkiye'deki işleme faaliyetleri hakkında ayrı **KVKK Aydınlatma Metni**: [DOĞRULANMIŞ_ALAN_ADI]/tr/kvkk.

## 11. Değişiklikler ve iletişim
Uygulama, web sitesi veya veri işleme uygulamalarımız değişirse politikayı günceller ve gerektiğinde ayrıca bilgilendiririz. İletişim: [HUKUKİ_YAYINCI_UNVANI], [DOĞRULANMIŞ_DESTEK_EPOSTASI].
