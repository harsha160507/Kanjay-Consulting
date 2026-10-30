import SpotlightCard from './SpotlightCard';
import { useReduced } from './useReduced';
export default function PrototypeService({ prefix = '' }: { prefix?: string }) {
  const { reduced } = useReduced();
  const content = <><p className="eyebrow">HR support / 01</p><h3>Recruitment &amp; Talent Acquisition</h3><p>We support job descriptions, candidate sourcing, screening, interview coordination and selection follow-ups.</p><a href={prefix + 'services/'}>Explore services <span aria-hidden="true">↗</span></a></>;
  return reduced ? <article className="prototype-service">{content}</article> : <SpotlightCard className="prototype-service" intensity={0.08} spotlightColor="var(--accent)" ambient={false} flare={false} grain={0} style={{ '--spotlight-card-surface': 'var(--surface)', '--spotlight-card-border': 'var(--line)' } as React.CSSProperties}>{content}</SpotlightCard>;
}
