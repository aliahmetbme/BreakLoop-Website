// Editorial baseline for BreakLoop's official promotional website; placeholders require verification before public release.
export const legalDocuments: Record<string, string> = {
  "tr/privacy": `# BreakLoop Gizlilik Politikası

**Son güncelleme:** [DOĞRULANMIŞ_YAYIN_TARİHİ]

**Geliştirici:** [DOĞRULANMIŞ_YASAL_AD_SOYAD] (bireysel geliştirici)

**İletişim:** [DOĞRULANMIŞ_DESTEK_EPOSTASI]

**Resmi web sitesi:** [DOĞRULANMIŞ_ALAN_ADI]

## 1. Hakkımızda ve kapsam

BreakLoop, dikkat dağıtıcı uygulamalarla geçirilen zamanı yönetmeye ve odaklanmayı desteklemeye yardımcı olmak amacıyla bireysel geliştirici tarafından bağımsız olarak geliştirilen bir iOS uygulamasıdır.

Bu gizlilik politikası, BreakLoop'un tanıtım web sitesini ve iOS uygulamasını kapsar. Bu kapsamda üç veri alanı birbirinden tamamen ayrıdır:

- **Cihaz üzerindeki iOS uygulama verileri:** Ekran Süresi seçimleri, kullanım döngüsü ayarları ve yerel tanılama geçmişi kullanıcının kendi iPhone'unda tutulur; uygulama geliştiriciye veya geliştiricinin bir sunucusuna otomatik olarak kullanıcı verisi göndermez.
- **Web sitesi teknik erişim kayıtları:** Yalnızca tanıtım amaçlı web sitesinin **Vercel** üzerinden sunulması sırasında oluşan standart teknik bağlantı ve yönlendirme kayıtlarıdır.
- **Gönüllü destek e-postaları:** Kullanıcının kendi tercihiyle **Apple iCloud Mail** üzerindeki destek adresine gönderdiği mesaj ve eklerdir.

Web sitesi, uygulama App Store'da yayımlanmadan önce kullanıma açılabilir. Bu durum, iOS uygulamasının yayımlandığı veya tüm özelliklerinin kullanıma hazır olduğu anlamına gelmez.

## 2. Web sitesinde işlenen bilgiler (Vercel barındırma)

BreakLoop web sitesi yalnızca tanıtım, destek ve hukuki bilgilendirme amacıyla hazırlanmıştır.

Web sitesinde kullanıcı hesabı açılması, üyelik oluşturulması, iletişim formu doldurulması, satın alma yapılması, ödeme alınması veya bekleme listesine kayıt olunması için bir sistem bulunmaz.

Web sitesinin kaynak kodunda reklam pikseli, üçüncü taraf davranışsal analitik aracı veya takip çerezi kullanılmamaktadır. Yalnızca seçtiğiniz görünüm tercihi (açık, koyu veya sistem teması), tarayıcınızın yerel depolama alanında (\`localStorage\` / \`breakloop-theme\`) hatırlanır.

BreakLoop web sitesini ziyaret etmek, iPhone'unuzdaki Ekran Süresi kayıtlarını web sitesine göndermez.

Web sitesi, GitHub deposuna bağlı olarak **Vercel** platformu üzerinde barındırılmaktadır. Vercel'in resmi dokümantasyonuna göre sitenin güvenli ve düzgün sunulması sırasında aşağıdaki teknik kayıt türleri oluşabilir:

- **İstek ve yönlendirme kayıtları (Request / Routing & Edge Logs) ile güvenlik duvarı (Vercel Firewall) kayıtları:** Ziyaretçinin IP adresi, erişim zamanı, HTTP yöntemi ve durum kodu, talep edilen alan adı ve sayfa yolu, tarayıcı/cihaz başlık bilgisi (user-agent), işlem süresi ve benzersiz istek kimliği (Request ID).
- **Çalışma zamanı kayıtları (Runtime Logs):** Sunucu tarafı yönlendirme veya fonksiyon çağrılarında oluşan teknik çalışma ve hata çıktıları.
- **Derleme kayıtları (Build Logs):** GitHub üzerinden yapılan dağıtımlarda derleme ve paketleme adımlarına ilişkin teknik kayıtlar (ziyaretçi trafiği içermez).

Vercel kontrol panelindeki standart çalışma zamanı ve istek kayıtlarının saklama süresi, aktif Vercel planına ve gözlemlenebilirlik (observability) yapılandırmasına göre değişir (Vercel dokümantasyonuna göre standart panel saklama süresi Hobby planında 1 saat, Pro planında 1 gün, Enterprise planında 3 gün; Observability Plus etkinse 30 güne kadar olup, harici bir Log Drain tanımlanmadıkça uzun süreli arşivlenmez). Bu web sitesi için geçerli doğrulanmış saklama bilgisi: [DOĞRULANMIŞ_HOSTING_LOG_SAKLAMA_KRİTERİ].

## 3. iOS uygulamasındaki veriler (cihaz içi işleme)

BreakLoop, seçtiğiniz uygulamalar ve uygulama kategorileri üzerinde odaklanma ve kullanım sınırı özelliklerini gerçekleştirmek için Apple'ın \`FamilyControls\`, \`DeviceActivity\`, \`ManagedSettings\` ve \`ManagedSettingsUI\` framework'lerinden yararlanır.

Gerekli izinleri vermeniz durumunda, Apple'ın gizliliği korumaya yönelik seçim sistemi (\`FamilyActivityPicker\`) üzerinden uygulama ve kategori seçimleri yapılabilir.

Mevcut uygulama mimarisinde bu seçimlerle ilişkili opak belirteçler, döngü ayarları, kullanım kontrol noktaları ve uygulamanın çalışması için gereken durum bilgileri yalnızca cihaz üzerinde ve ilgili \`App Group\` alanında tutulur.

Bu bilgiler; ortak kullanım bütçesini takip etmek (Life Mode), otomatik mola döngülerini ve tahmini doğal dinlenmeyi yönetmek ve Deep Focus oturumlarını (Focus Mode) gerçekleştirmek amacıyla kullanılır.

BreakLoop'ta kullanıcı hesabı veya geliştirici tarafından işletilen bulut tabanlı bir sunucu bulunmamaktadır; uygulama, geliştiriciye otomatik olarak kullanım veya Ekran Süresi verisi göndermez. Nihai App Store sürümündeki SDK'lar, ağ bağlantıları ve veri işleme davranışları uygulama yayınından önce ayrıca doğrulanacaktır.

## 4. Tanılama kayıtları

BreakLoop, uygulamanın çalışmasını incelemeye ve teknik sorunları anlamaya yardımcı olmak amacıyla cihaz üzerinde sınırlı tanılama kayıtları oluşturabilir.

Bu kayıtlar cihaz üzerinde tutulur ve kullanıcı tarafından uygulama içerisindeki tanılama araçları üzerinden incelenebilir, dışa aktarılabilir veya ilgili yerel geçmiş silme işleviyle kaldırılabilir.

Tanılama kayıtlarının dışa aktarılması, kayıtların otomatik olarak geliştiriciye gönderildiği anlamına gelmez.

Bir tanılama dosyasını kendi isteğinizle destek adresine e-posta eki olarak göndermeyi seçerseniz, dosyanın içeriği yalnızca destek talebinizin incelenmesi amacıyla işlenir.

Uygulama tarafından tutulan yerel tanılama geçmişinin silinmesi; daha önce dışa aktardığınız dosyaları, başka bir uygulamayla paylaştığınız kopyaları veya iOS tarafından yönetilen sistem kayıtlarını otomatik olarak silmez.

## 5. Destek iletişimi (Apple iCloud Mail)

Gönüllü olarak [DOĞRULANMIŞ_DESTEK_EPOSTASI] adresine e-posta gönderdiğinizde e-posta adresiniz, mesajınız ve paylaşmayı seçtiğiniz ekler **Apple iCloud Mail** altyapısı üzerinden alınır.

Bu bilgiler yalnızca talebinizi değerlendirmek, teknik sorununuzu çözmek ve gerekli durumlarda sizinle iletişime geçmek amacıyla kullanılır; reklam veya davranışsal profilleme amacıyla kullanılmaz.

Destek yazışmaları ve ekleri için uygulanacak saklama ve silme kriteri: [DOĞRULANMIŞ_DESTEK_KAYDI_SAKLAMA_KRİTERİ].

## 6. Hizmet sağlayıcılar ve veri aktarımı

BreakLoop'ta veri işleme süreçleri hizmetin niteliğine göre ayrılmıştır:

- **Cihaz içi uygulama verileri:** Kullanıcının kendi iPhone'unda kalır; geliştiricinin sunucusuna veya üçüncü taraf analitik servislerine aktarılmaz.
- **Web sitesi barındırma ve CDN:** Tanıtım web sitesi **Vercel Inc.** altyapısında (ve Vercel'in bulut/CDN alt işleyenleri üzerinde) barındırılır.
- **Destek e-postası hizmeti:** Kullanıcının gönderdiği destek e-postaları **Apple (iCloud Mail)** altyapısında işlenir.

Vercel ve Apple iCloud Mail altyapılarının küresel sunucu/CDN yapısı nedeniyle teknik erişim kayıtları ve destek e-postaları Türkiye dışındaki sunucular üzerinden işlenebilir. Uluslararası veri aktarımı ve alıcı gruplarına ilişkin yasal açıklamalar yayın öncesinde tamamlanacaktır.

## 7. Tercihleriniz ve haklarınız

Uygulamanın Ekran Süresi erişim izinlerini iOS ayarlarından yönetebilirsiniz.

Uygulama içindeki uygun kontrollerle yerel tanılama kayıtlarını silebilir veya uygulamayı kaldırarak uygulama verilerini cihazınızdan temizleyebilirsiniz.

Gönüllü destek yazışmalarıyla ilgili bilgi, düzeltme veya uygun koşullarda silme talebinde bulunabilirsiniz.

Türkiye'deki kişisel veri işleme faaliyetlerine ilişkin ayrıntılar ve başvuru hakları için [KVKK Aydınlatma Metni](/tr/kvkk)'ni inceleyebilirsiniz.

## 8. Politika güncellemeleri

BreakLoop'un özellikleri veya veri işleme uygulamaları değişirse bu gizlilik politikası güncellenebilir.

Güncel metin, resmi web sitesinde erişilebilir olacaktır.

**İlgili bağlantılar:** [Destek](/tr/support) | [KVKK Aydınlatma Metni](/tr/kvkk)
`,
  "en/privacy": `# BreakLoop Privacy Policy

**Last updated:** [VERIFIED_PUBLICATION_DATE]

**Developer:** [VERIFIED_LEGAL_NAME] (individual developer)

**Contact:** [VERIFIED_SUPPORT_EMAIL]

**Official website:** [VERIFIED_DOMAIN]

## 1. About BreakLoop

BreakLoop is an independently developed iOS application created by an individual developer to help users manage distracting apps, create intentional breaks, and focus on what matters.

This Privacy Policy covers both the promotional website and the BreakLoop iOS application, separating three distinct contexts:

- **On-device iOS app data:** Screen Time selections, usage cycle settings, and local diagnostic history remain on your iPhone. The native iOS app does not automatically send user data to the developer or any developer-operated server.
- **Website technical access logs:** Standard technical request and routing data processed by **Vercel** when delivering the promotional website.
- **Voluntary support emails:** Messages and attachments you voluntarily send to our support address hosted on **Apple iCloud Mail**.

The website may become publicly available before the iOS application is released on the App Store.

## 2. Website information (Vercel hosting)

The BreakLoop website is intended solely for promotional, support, and legal-disclosure purposes.

It does not provide user accounts, registration, contact forms, payments, checkout flows, newsletters, or waitlist sign-ups.

The website codebase does not load third-party advertising pixels, behavioral analytics SDKs, or tracking cookies. Your appearance preference (light, dark, or system theme) is stored locally in your browser's \`localStorage\` (\`breakloop-theme\`).

Visiting the website never reads or transmits Screen Time information from your iPhone to the website.

The website is deployed from GitHub and hosted on **Vercel**. According to Vercel's official documentation, delivering and protecting the website involves the following technical log categories:

- **Request / Routing Logs and Vercel Firewall logs:** Technical request metadata such as IP address, access timestamp, HTTP method and status code, requested domain and path, browser/user-agent headers, execution duration, and a unique Request ID.
- **Runtime Logs:** Technical execution output or errors if routing middleware or server functions are invoked.
- **Build Logs:** Deployment compilation logs generated during GitHub builds (which do not contain visitor traffic).

Under Vercel's documentation, standard dashboard retention for Runtime and Request Logs depends on the active Vercel plan and observability settings rather than a single fixed period (for example, up to 1 hour on the Hobby plan, 1 day on the Pro plan, or 3 days on Enterprise, extendable up to 30 days with Observability Plus, unless external Log Drains are configured). Verified website log retention for this deployment: [VERIFIED_HOSTING_LOG_RETENTION].

## 3. Information processed by the iOS app (on-device)

With your authorization, BreakLoop uses Apple's \`FamilyControls\`, \`DeviceActivity\`, \`ManagedSettings\`, and \`ManagedSettingsUI\` frameworks to provide app usage management and focus features.

You can select supported apps and app categories through Apple's privacy-preserving \`FamilyActivityPicker\` interface.

The current application architecture stores opaque selection tokens, cycle settings, usage checkpoint information, and operational state locally on your iPhone, including the shared \`App Group\` container used by the app and its extensions.

This information supports shared usage budgets, automatic cooldown cycles, estimated natural rest (Life Mode), and Deep Focus sessions (Focus Mode).

BreakLoop does not include a user account system or a developer-operated cloud backend, and does not automatically transmit your Screen Time selections or usage history off your device. The final distributed iOS build, included SDKs, and network behavior must be reviewed before App Store publication.

## 4. Diagnostics

BreakLoop maintains bounded local diagnostic records on your device to help investigate technical problems and understand application behavior.

You can inspect, export, or delete local diagnostic history using the controls available in the app's Settings.

Exporting diagnostics does not automatically send them to the developer.

If you voluntarily attach an exported diagnostic file to a support email, the information in that file is processed solely to investigate and reply to your support request.

Deleting local diagnostic history inside the app does not automatically remove files you previously exported, copies shared with other services, or iOS system-managed logs.

## 5. Email support (Apple iCloud Mail)

If you voluntarily contact support at [VERIFIED_SUPPORT_EMAIL], we receive your email address, message content, and any attachments you choose to include via **Apple iCloud Mail**.

This information is used solely to review and respond to your inquiry, and is never used for advertising or behavioral profiling.

Verified retention policy for support correspondence and attachments: [VERIFIED_SUPPORT_RETENTION].

## 6. Service providers and transfers

Data handling is strictly separated by service:

- **On-device iOS app data:** Stored locally on your iPhone; not uploaded to a developer server or third-party analytics provider.
- **Website hosting and CDN:** The promotional website is hosted by **Vercel Inc.** (and its underlying cloud/CDN sub-processors).
- **Support email:** Voluntary support emails are processed through **Apple (iCloud Mail)**.

Because Vercel's Edge Network and Apple's iCloud Mail infrastructure operate globally, website request metadata and voluntary support emails may be processed outside your country of residence. Any required international transfer disclosures will be finalized following legal verification.

## 7. Your choices and rights

You can manage or revoke Screen Time permissions at any time through your iPhone's Settings.

You can delete local diagnostic history using the controls in the app or uninstall the app to remove app-managed local data.

You may contact the developer regarding your voluntary support correspondence to request access, correction, or deletion where applicable.

For information about personal data rights under Turkish law, please see the [Turkish KVKK Notice](/tr/kvkk).

## 8. Changes to this policy

This Privacy Policy may be updated when the application's functionality or data practices change.

The latest version will remain accessible on the official website.

**Related links:** [Support](/en/support) | [KVKK Notice (Turkish)](/tr/kvkk)
`,
  "tr/kvkk": `# BreakLoop Kişisel Verilerin İşlenmesine İlişkin Aydınlatma Metni

**Son güncelleme:** [DOĞRULANMIŞ_YAYIN_TARİHİ]

## 1. Veri sorumlusu

6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, BreakLoop tanıtım web sitesi ([DOĞRULANMIŞ_ALAN_ADI]) ve gönüllü destek iletişimi süreçleri bakımından veri sorumlusu:

**Ad Soyad:** [DOĞRULANMIŞ_YASAL_AD_SOYAD] (bireysel geliştirici)

**İletişim:** [DOĞRULANMIŞ_DESTEK_VE_GİZLİLİK_EPOSTASI]

**Diğer gerekli başvuru bilgileri:** [DOĞRULANMIŞ_BAŞVURU_KANALI_VE_GEREKLİ_ADRES_BİLGİSİ]

BreakLoop, bireysel geliştirici tarafından bağımsız olarak geliştirilen bir iOS uygulamasıdır. Bu metinde gerçekte mevcut olmayan bir şirket veya tüzel kişilik tanımlanmamaktadır.

## 2. Hangi kişisel veriler işlenebilir ve kapsam ayrımı

BreakLoop'ta cihaz içi uygulama kullanımı, web sitesi ziyareti ve gönüllü destek iletişimi birbirinden ayrıdır:

**A. Web sitesi teknik erişim verileri (Vercel barındırma)**

Tanıtım web sitesi GitHub bağlantılı olarak **Vercel** üzerinde barındırılmaktadır. Web sitesinde üyelik, giriş, iletişim formu, ödeme veya üçüncü taraf reklam/analitik çerezi bulunmaz; yalnızca görünüm tercihi (\`breakloop-theme\`) tarayıcının yerel depolama alanında tutulur.

Web sitesini ziyaret ettiğinizde Vercel'in Edge/CDN ağı, güvenlik duvarı (Vercel Firewall) ve çalışma zamanı altyapısı tarafından IP adresi, erişim zamanı, HTTP yöntemi ve durum kodu, talep edilen sayfa yolu, tarayıcı/cihaz başlık bilgisi (user-agent) ve benzersiz istek kimliği (Request ID) gibi teknik bağlantı kayıtları otomatik yollarla işlenebilir.

Bu veriler; web sitesinin güvenli şekilde sunulması, trafik yönlendirmesi, hata ayıklama ve bilgi güvenliğinin sağlanması amaçlarıyla işlenir.

**İlgili KVKK m.5 işleme şartı:** [SOMUT_FAALİYETE_UYGUN_DOĞRULANMIŞ_HUKUKİ_SEBEP]

**B. Gönüllü destek ve iletişim verileri (Apple iCloud Mail)**

BreakLoop destek adresine ([DOĞRULANMIŞ_DESTEK_VE_GİZLİLİK_EPOSTASI]) kendi isteğinizle e-posta gönderdiğinizde; e-posta adresiniz, mesaj içeriğiniz, kendi paylaştığınız iletişim bilgileriniz ve eklemeyi seçtiğiniz dosyalar (isteğe bağlı dışa aktarılmış tanılama dosyası dâhil) **Apple iCloud Mail** altyapısı aracılığıyla elektronik ortamda elde edilir.

Bu veriler yalnızca destek talebinizi incelemek, yanıtlamak, teknik sorunları çözmek ve gerekli yazışmaları yürütmek amacıyla işlenir. Destek talebinize konu olmayan özel nitelikli kişisel verileri veya gereksiz kişisel bilgileri göndermemenizi öneririz.

**İlgili KVKK m.5 işleme şartı:** [SOMUT_DESTEK_FAALİYETİNE_UYGUN_DOĞRULANMIŞ_HUKUKİ_SEBEP]

**C. Cihaz üzerindeki iOS uygulama verileri (otomatik aktarım yoktur)**

BreakLoop iOS uygulamasındaki Ekran Süresi seçimleri (\`FamilyControls\`, \`DeviceActivity\`, \`ManagedSettings\`), ortak kullanım bütçesi ve mola döngüsü ayarları ile yerel tanılama geçmişi kullanıcının kendi iPhone'unda (ve uygulama içi \`App Group\` alanında) yerel olarak tutulur. Native uygulama, bu verileri geliştiriciye veya geliştiricinin bir sunucusuna otomatik olarak göndermez.

## 3. Kişisel verilerin aktarımı ve alıcı grupları

Kişisel veriler reklam ağlarına veya veri simsarlarına satılmaz ve profilleme amacıyla aktarılmaz. Süreç bazında alıcı grupları şunlardır:

- **Web sitesi altyapı ve CDN sağlayıcısı:** Teknik erişim, yönlendirme ve güvenlik kayıtları bakımından **Vercel Inc.** ve Vercel'in yetkilendirdiği bulut/CDN altyapı alt işleyenleri.
- **E-posta hizmet sağlayıcısı:** Gönüllü destek e-postaları bakımından **Apple (iCloud Mail)** e-posta altyapısı.
- **Yetkili kamu kurum ve kuruluşları:** Yalnızca kanuni yükümlülüklerin gerektirdiği hallerde hukuken yetkili merciler.

**Doğrulanmış alıcı grupları özeti:** [GERÇEK_ALICILAR]

Vercel ve Apple iCloud Mail sunucularının Türkiye dışında yer alması nedeniyle ilgili teknik erişim ve e-posta süreçleri yurt dışı veri aktarımı içerebilir. Yurt dışına aktarım şartları KVKK'nın 9. maddesi kapsamında değerlendirilerek yayın öncesinde tamamlanacaktır.

**Varsa yurt dışına aktarımın KVKK m.9 hukuki mekanizması:** [DOĞRULANMIŞ_AKTARIM_DAYANAĞI]

## 4. Saklama ve silme

Kişisel veriler, işlenme amaçlarının gerektirdiği süre ve uygulanabilir hukuki yükümlülükler kapsamında saklanır:

- **Vercel web sitesi teknik erişim kayıtları:** Vercel dokümantasyonuna göre standart çalışma zamanı ve istek kayıtları (Runtime / Request Logs) aktif Vercel planına ve yapılandırmaya bağlı olarak kısa süreli tutulur (ör. Hobby planında 1 saat, Pro planında 1 gün, Enterprise planında 3 gün; Observability Plus etkinse 30 güne kadar; harici Log Drain kullanılmadıkça uzun süreli arşivlenmez). Bu dağıtım için doğrulanmış saklama kriteri: [DOĞRULANMIŞ_HOSTING_LOG_SAKLAMA_KRİTERİ]
- **Apple iCloud Mail destek yazışmaları ve ekleri:** [DOĞRULANMIŞ_DESTEK_KAYDI_SAKLAMA_KRİTERİ]
- **Cihaz içi yerel uygulama verileri:** Kullanıcının kendi iPhone'unda tutulur; kullanıcı uygulama içinden yerel tanılama geçmişini silebilir veya uygulamayı cihazından kaldırabilir.

Verilerin işlenmesini gerektiren şartların ortadan kalkması durumunda, uygulanabilir mevzuat doğrultusunda silme, yok etme veya anonimleştirme işlemleri gerçekleştirilir.

## 5. İlgili kişinin hakları

KVKK'nın 11. maddesi kapsamında, koşulları çerçevesinde kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işleme amacını öğrenme, aktarım yapılan üçüncü kişileri bilme, yanlış veya eksik verilerin düzeltilmesini isteme, silme veya yok etme talebinde bulunma ve ilgili işlemlerin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme haklarına sahipsiniz.

Ayrıca yalnızca otomatik sistemlerle yapılan analizlerin aleyhinize sonuç doğurmasına itiraz edebilir ve hukuka aykırı işleme nedeniyle zarar doğmuşsa giderilmesini talep edebilirsiniz.

## 6. Başvuru

Kişisel verilerinize ilişkin taleplerinizi, kimliğinizin gerektiği ölçüde doğrulanmasına imkân sağlayan ve ilgili mevzuata uygun başvuru yöntemleriyle veri sorumlusuna iletebilirsiniz.

**Başvuru iletişimi:** [DOĞRULANMIŞ_KVKK_BAŞVURU_KANALI]

Başvurular ilgili mevzuatta öngörülen usul ve süreler kapsamında değerlendirilecektir.

**İlgili bağlantı:** [Gizlilik Politikası](/tr/privacy)
`,
  "tr/terms": `# BreakLoop Kullanım ve Lisans Bilgileri

BreakLoop, bireysel olarak geliştirilen ve Apple App Store üzerinden dağıtılması planlanan bir iOS uygulamasıdır.

Uygulama henüz App Store'da yayımlanmamış olabilir. Bu web sitesinde yer alan tanıtım içerikleri, uygulamanın mevcut geliştirme hedeflerini ve özelliklerini açıklamak amacıyla hazırlanmıştır.

## Uygulama lisansı

BreakLoop için ayrı bir özel son kullanıcı lisans sözleşmesi belirlenmediği sürece, uygulama App Store üzerinden kullanıma sunulduğunda Apple'ın Standart Son Kullanıcı Lisans Sözleşmesi (Standard EULA) geçerli olacaktır.

**Apple Standard EULA:**

https://www.apple.com/legal/internet-services/itunes/dev/stdeula/

## Özellikler ve kullanılabilirlik

BreakLoop'un Ekran Süresi ile ilgili özellikleri, Apple tarafından sunulan sistem izinlerine ve iOS'un çalışma koşullarına bağlıdır.

Bu nedenle uygulama engelleme ve zamanlama davranışları sistem izinleri ve iOS koşullarından etkilenebilir.

## Web sitesi

Bu web sitesi BreakLoop hakkında bilgi sunmak amacıyla hazırlanmıştır. Web sitesindeki açıklamalar, duyurulmamış özelliklerin, kesin bir çıkış tarihinin veya belirli bir fiyatlandırma modelinin taahhüdü değildir.

## İletişim

BreakLoop ile ilgili sorularınız için [Destek](/tr/support) sayfasını kullanabilirsiniz.
`,
  "en/terms": `# BreakLoop Terms & License Information

BreakLoop is an independently developed iOS application intended for distribution through Apple's App Store.

The application may not yet be available on the App Store. Information on this website describes the product and its intended functionality.

## Application license

Unless the developer provides a separate custom end-user license agreement, Apple's Standard End User License Agreement will apply when BreakLoop is distributed through the App Store.

**Apple Standard EULA:**

https://www.apple.com/legal/internet-services/itunes/dev/stdeula/

## Features and availability

BreakLoop uses Apple Screen Time-related frameworks.

Certain functionality depends on operating system permissions, scheduling behavior, and platform limitations.

Application restrictions and timing may therefore be affected by iOS behavior and available permissions.

## Website information

This website provides information about BreakLoop. Its content does not guarantee an unannounced feature, release date, or pricing model.

## Contact

For questions about BreakLoop, please visit the [Support](/en/support) page.
`
};
