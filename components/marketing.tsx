import Image from 'next/image';
import { getContent } from '@/lib/content';
import { site, type Locale } from '@/lib/config';

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
            <span className="step-number">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Philosophy({ locale }: { locale: Locale }) {
  const c = getContent(locale, site.indexable);
  return <section className="wrap note-section"><h2>{c.philosophyTitle}</h2><p>{c.philosophyBody}</p></section>;
}
