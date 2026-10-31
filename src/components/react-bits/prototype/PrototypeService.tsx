import SpotlightCard from './SpotlightCard';
export default function PrototypeService({ prefix = '' }: { prefix?: string }) {
  const content = <><h3>Recruitment &amp; Talent Acquisition</h3><p>We support job descriptions, candidate sourcing, screening, interview coordination and selection follow-ups.</p><a href={prefix + 'services/'}>Explore services <span className="link-arrow" aria-hidden="true">↗</span></a></>;
  // Preserve the mounted fallback link; the revision disables decorative glow.
  return <SpotlightCard disabled={true} className="prototype-service" intensity={0.08} spotlightColor="var(--accent)" ambient={false} flare={false} grain={0} style={{ '--spotlight-card-surface': 'var(--surface)', '--spotlight-card-border': 'var(--line)' } as React.CSSProperties}>{content}</SpotlightCard>;
}
