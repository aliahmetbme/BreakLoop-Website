import Link from 'next/link';
import { getContent } from '@/lib/content';
import { site, type Locale } from '@/lib/config';
import { Budget, Steps } from './site';

export function FocusModeView({ locale }: { locale: Locale }) {
  const c = getContent(locale, site.indexable);
  const isEn = locale === 'en';

  return (
    <main id="main">
      <nav aria-label={isEn ? 'Breadcrumb' : 'İçerik yolu'} className="wrap breadcrumb">
        <ol>
          <li>
            <Link href={`/${locale}`}>{c.breadcrumbHome}</Link>
          </li>
          <li aria-hidden="true" className="breadcrumb-separator">/</li>
          <li aria-current="page">{isEn ? 'Focus Mode' : 'Odak Modu'}</li>
        </ol>
      </nav>

      <section className="wrap how-hero">
        <p className="eyebrow">{c.modes[0][0]}</p>
        <h1>{isEn ? 'Focus Mode' : 'Odak Modu'}</h1>
        <p className="mode-badge-tag">{isEn ? 'iOS feature: Deep Focus' : 'iOS özelliği: Derin Odak'}</p>
        <p className="lead">{c.modes[0][2]}</p>
      </section>

      <Steps locale={locale} kind="focus" />

      <section className="wrap note-section">
        <h2>{isEn ? 'How Deep Focus works with your selections' : 'Derin Odak seçimlerinle nasıl çalışır?'}</h2>
        <p>
          {isEn
            ? 'Deep Focus applies to the apps and categories you have already selected in BreakLoop. It does not require maintaining separate lists. If an automatic cooldown is active when your focus session ends, that cooldown remains in effect until its rest period concludes.'
            : 'Derin Odak, BreakLoop içinde önceden seçtiğin uygulama ve kategorilerle çalışır; ayrı bir seçim listesi oluşturmanı gerektirmez. Odak oturumu tamamlandığında aktif bir mola (cooldown) varsa, o molanın süresi bitene kadar kısıtlamalar devam eder.'}
        </p>
      </section>

      <section className="wrap" style={{ textAlign: 'center', margin: '2rem auto 3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <p className="eyebrow">{isEn ? 'EXPLORE OTHER MODE' : 'DİĞER MODU KEŞFET'}</p>
        <Link className="button" href={`/${locale}/life-mode`}>
          {c.modes[1][3]} <span aria-hidden="true">→</span>
        </Link>
        <Link className="text-link" href={`/${locale}`}>
          ← {isEn ? 'Back to Home' : 'Ana Sayfaya Dön'}
        </Link>
      </section>

      <ClosingSection locale={locale} />
    </main>
  );
}

export function LifeModeView({ locale }: { locale: Locale }) {
  const c = getContent(locale, site.indexable);
  const isEn = locale === 'en';

  return (
    <main id="main">
      <nav aria-label={isEn ? 'Breadcrumb' : 'İçerik yolu'} className="wrap breadcrumb">
        <ol>
          <li>
            <Link href={`/${locale}`}>{c.breadcrumbHome}</Link>
          </li>
          <li aria-hidden="true" className="breadcrumb-separator">/</li>
          <li aria-current="page">{isEn ? 'Life Mode' : 'Yaşam Modu'}</li>
        </ol>
      </nav>

      <section className="wrap how-hero">
        <p className="eyebrow">{c.modes[1][0]}</p>
        <h1>{isEn ? 'Life Mode' : 'Yaşam Modu'}</h1>
        <p className="mode-badge-tag">{isEn ? 'iOS feature: Usage Cycle' : 'iOS özelliği: Kullanım Döngüsü'}</p>
        <p className="lead">{c.modes[1][2]}</p>
      </section>

      <Budget locale={locale} />

      <Steps locale={locale} kind="life" />

      <section className="wrap features" aria-labelledby="life-features-heading">
        <p className="eyebrow">{c.featureKicker}</p>
        <h2 id="life-features-heading">{c.featureTitle}</h2>
        <div className="feature-grid">
          <article className="feature-card cooldown">
            <div>
              <p className="eyebrow">{c.features[0][0]}</p>
              <h3>{c.features[0][1]}</h3>
              <p>{c.features[0][2]}</p>
            </div>
            <img src="/images/horizon-cooldown.png" width={220} height={220} alt="" />
            <small>{c.quiet} · {c.preview}</small>
          </article>
          <article className="feature-card rest">
            <p className="eyebrow">{c.features[1][0]}</p>
            <div className="rest-art" aria-hidden="true">
              <span/><span/><span/><i>↻</i>
            </div>
            <h3>{c.features[1][1]}</h3>
            <p>{c.features[1][2]}</p>
          </article>
        </div>
        <p className="feature-caption">{c.naturalRestNote}</p>
      </section>

      <section className="wrap" style={{ textAlign: 'center', margin: '2rem auto 3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <p className="eyebrow">{isEn ? 'EXPLORE OTHER MODE' : 'DİĞER MODU KEŞFET'}</p>
        <Link className="button" href={`/${locale}/focus-mode`}>
          {c.modes[0][3]} <span aria-hidden="true">→</span>
        </Link>
        <Link className="text-link" href={`/${locale}`}>
          ← {isEn ? 'Back to Home' : 'Ana Sayfaya Dön'}
        </Link>
      </section>

      <ClosingSection locale={locale} />
    </main>
  );
}

function ClosingSection({ locale }: { locale: Locale }) {
  const c = getContent(locale, site.indexable);
  return (
    <section className="wrap closing" id="coming-soon">
      <span className="closing-loop" aria-hidden="true">∞</span>
      <p className="eyebrow">BREAKLOOP</p>
      <h2>{c.closing}</h2>
      <p>{c.closingBody}</p>
      <span className="coming-pill">
        <svg width="18" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M16 2c.1 2-1.5 4-3.5 4 .1-1.9 1.5-3.8 3.5-4ZM18 12c0-2 1.5-3.1 2-3.5C19 7 17.7 6.5 16.5 6.5c-1.5 0-2.5.8-3.5.8s-2-.8-3.4-.8C6.3 6.5 4 9.2 4 12.6 4 17 7 22 9.5 22c1.2 0 2-.7 3.5-.7s2.1.7 3.4.7c2 0 4.2-3.4 4.9-5.4-1.9-.8-3.3-2.4-3.3-4.6Z"/>
        </svg>
        {c.soon}
      </span>
    </section>
  );
}
