import { useEffect, useRef, useState } from 'react';
import LogoLoop from '../react-bits/prototype/LogoLoop';
import { useReduced } from '../react-bits/prototype/useReduced';
import ClientLogoTile from './ClientLogoTile';
import type { ClientLogo } from '../../lib/client-logos';

export default function HomeClientLoop({ clients }: { clients: ClientLogo[] }) {
  const { ready, reduced } = useReduced();
  const [playing, setPlaying] = useState(true);
  const [prepared, setPrepared] = useState(false);
  const [near, setNear] = useState(false);
  const visual = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ready || reduced || !visual.current || typeof IntersectionObserver === 'undefined') return;
    try {
      // Reserve the strip early, but defer the supplied engine's layout work until
      // the visitor approaches it. The independent grid remains the accessible list.
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) { setNear(true); observer.disconnect(); }
      }, { rootMargin: '240px', threshold: 0 });
      observer.observe(visual.current);
      setPrepared(true);
      return () => observer.disconnect();
    } catch { setPrepared(false); }
  }, [ready, reduced]);
  // The independent Astro grid remains intact if this island never loads or fails.
  if (!ready || reduced) return null;
  return <div className="home-logo-loop" data-ready={prepared ? 'true' : undefined} data-playing={playing ? 'true' : 'false'}>
    <div className="home-loop-controls">
      <button type="button" className="home-loop-toggle" onClick={() => setPlaying(value => !value)}>
        {playing ? 'Pause logo motion' : 'Play logo motion'}
      </button>
    </div>
    <div ref={visual} className="home-loop-visual" aria-hidden="true">
      {near && <LogoLoop logos={clients.map(client => ({ node: <ClientLogoTile client={client} decorative /> }))}
        speed={playing ? 18 : 0} pauseOnHover hoverSpeed={0} scaleOnHover={false}
        layout="line" focus={0} magnify={0} tiltX={0} tiltY={0} step={false}
        draggable={false} scrollBoost={0} intro={false} fadeOut={false}
        gap={28} logoHeight={72} ariaLabel="Client logos" />}
    </div>
  </div>;
}
