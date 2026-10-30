import Link from 'next/link';
import Image from 'next/image';
import { getContent } from '@/lib/content';
import { site, type Locale } from '@/lib/config';
import { Preview } from './site';

/** Uses the approved feature-card grid and existing Quiet Horizon assets. */
export function ModeOverview({ locale }: { locale: Locale }) {
  const c = getContent(locale, site.indexable);
  return (
    <section className="wrap features mode-overview" aria-labelledby="modes-heading">
      <p className="eyebrow">{c.modesKicker}</p>
      <h2 id="modes-heading">{c.modesTitle}</h2>
      <div className="feature-grid">
        {c.modes.map(([eyebrow, title, description, link], i) => (
          <article className="feature-card cooldown" key={eyebrow}>
            <p className="eyebrow">{eyebrow}</p>
            <span className="mode-badge-tag">
              {i === 0
                ? (locale === 'en' ? 'iOS: Deep Focus' : 'iOS: Derin Odak')
                : (locale === 'en' ? 'iOS: Usage Cycle' : 'iOS: Kullanım Döngüsü')}
            </span>
            <h3>{title}</h3>
            <p>{description}</p>
            <Link className="text-link mode-link" href={`/${locale}/${i === 0 ? 'focus-mode' : 'life-mode'}`}>
              {link} <span aria-hidden="true">→</span>
            </Link>
            <Image src={`/images/horizon-${i === 0 ? 'deepfocus' : 'cooldown'}.png`} width={250} height={250} alt="" />
            <small>{c.quiet} · {c.preview}</small>
          </article>
        ))}
      </div>
      <p className="feature-caption">{c.modeNaming}</p>
    </section>
  );
}

const scenarioImages = [
  ['scenario-study-after-v2', 'scenario-study-before-v2'],
  ['scenario-life-day-v2', 'scenario-life-evening-v2'],
] as const;

export function RealLifeScenarios({ locale }: { locale: Locale }) {
  const c = getContent(locale, site.indexable);
  return (
    <section className="wrap scenario-section" aria-labelledby="scenarios-heading">
      <p className="eyebrow">{c.scenarioKicker}</p>
      <h2 id="scenarios-heading">{c.scenarioTitle}</h2>
      <ol className="scenario-list">
        {c.scenarioRows.map((row, i) => (
          <li className="scenario-row" key={row.title}>
            <div className="scenario-visual-pair" role="group" aria-label={row.title}>
              {row.images.map((image, index) => (
                <figure key={image.label}>
                  <Image src={`/images/${scenarioImages[i][index]}.webp`} width={896} height={1200} quality={90} sizes="(max-width: 760px) 45vw, (max-width: 999px) 340px, 360px" alt={image.alt} />
                  <figcaption>{image.label}</figcaption>
                </figure>
              ))}
            </div>
            <div className="scenario-copy">
              <span className="step-number">0{i + 1}</span>
              <h3>{row.title}</h3>
              <p>{row.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="feature-caption">{c.scenarioVisualNote}</p>
    </section>
  );
}

export function Philosophy({ locale }: { locale: Locale }) {
  const c = getContent(locale, site.indexable);
  return <section className="wrap note-section"><h2>{c.philosophyTitle}</h2><p>{c.philosophyBody}</p></section>;
}

export function ProductWalkthrough({ locale }: { locale: Locale }) {
  const c = getContent(locale, site.indexable);
  return <section className="wrap features" aria-labelledby="product-heading">
    <p className="eyebrow">{c.productKicker}</p>
    <h2 id="product-heading">{c.productTitle}</h2>
    <div className="feature-grid">
      {c.productScreens.map(([title, description], i) => <article className="feature-card product-walkthrough-card" key={title}>
        <h3>{title}</h3>
        <p>{description}</p>
        <Preview locale={locale} variant={i === 0 ? 3 : 1} />
      </article>)}
    </div>
    <p className="feature-caption">{c.previewNote} {c.quietText}</p>
  </section>;
}
