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
            <h3>{title}</h3>
            <p>{description}</p>
            <a className="text-link mode-link" href={i === 0 ? '#focus-mode' : '#life-mode'}>{link} <span aria-hidden="true">→</span></a>
            <Image src={`/images/horizon-${i === 0 ? 'deepfocus' : 'cooldown'}.png`} width={250} height={250} alt="" />
            <small>{c.quiet} · {c.preview}</small>
          </article>
        ))}
      </div>
      <p className="feature-caption">{c.modeNaming}</p>
    </section>
  );
}

export function RealLifeScenarios({ locale }: { locale: Locale }) {
  const c = getContent(locale, site.indexable);
  return (
    <section className="wrap steps-section" aria-labelledby="scenarios-heading">
      <p className="eyebrow">{c.scenarioKicker}</p>
      <h2 id="scenarios-heading">{c.scenarioTitle}</h2>
      <ol className="steps mode-scenarios">
        {c.scenarios.map(([title, body], i) => (
          <li key={title}>
            {i === 0 ? <Image className="scenario-photo" src="/images/scenario-study-v1.webp" width={1200} height={800} sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1280px) 45vw, 570px" alt={c.scenarioAlts[0]} /> : <div className="scenario-time-pair" role="group" aria-label={title}>
              {['daylight', 'evening'].map((time, index) => <figure key={time}>
                <Image src={`/images/scenario-${time}-v1.webp`} width={1200} height={800} sizes="(max-width: 760px) 43vw, (max-width: 1280px) 22vw, 280px" alt={c.timePairAlts[index]} />
                <figcaption>{c.timePairLabels[index]}</figcaption>
              </figure>)}
            </div>}
            <span className="step-number">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{body}</p>
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
