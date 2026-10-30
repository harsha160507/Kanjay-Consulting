import { useState } from 'react';
import LogoLoop from './LogoLoop';
import { useReduced } from './useReduced';
const clients = [
  { file: 'EATON', name: 'Eaton' }, { file: 'AAVIZA', name: 'Aaviza Technologies' },
  { file: 'DEFORAY', name: 'Deforay' }, { file: 'ZUPPA', name: 'Zuppa' }, { file: 'WOYC', name: 'Woyc::OD' },
];
const logos = clients.map(p => ({ src: `/images/prototype-clients/${p.file}.webp`, alt: '', width: 160, height: 64 }));
export default function PrototypeClients() {
  const { reduced, ready } = useReduced();
  const [playing, setPlaying] = useState(false);
  return <section className="prototype-clients" aria-label="Approved client-logo treatment">
    <div className="prototype-strip-heading"><div><p className="eyebrow">Approved client assets / prototype subset</p><h2>A considered place for client brands.</h2></div>{ready && !reduced && <button className="proto-button outline" type="button" aria-pressed={playing} onClick={() => setPlaying(v => !v)}>{playing ? 'Pause logo motion' : 'Play logo motion'}</button>}</div>
    <div className="prototype-loop" aria-hidden="true">{!reduced && <LogoLoop logos={logos} speed={playing ? 28 : 0} intro={false} draggable={false} pauseOnHover={true} fadeOut={false} logoHeight={64} gap={48} renderItem={(item, key) => <div key={key} className={'logo-tile' + ('src' in item && item.src.includes('WOYC') ? ' woyc' : '')}>{'src' in item && <img src={item.src} alt="" width="160" height="64" />}</div>} />}</div>
    <ul className="prototype-client-grid">{clients.map(p => <li key={p.file}><div className={'logo-tile' + (p.file === 'WOYC' ? ' woyc' : '')}><img src={`/images/prototype-clients/${p.file}.webp`} alt={p.name} width="160" height="64" loading="lazy" /></div></li>)}</ul>
    <p className="small">Static approved-client grid remains available at all times. Motion is opt-in and disabled for reduced motion.</p>
  </section>;
}
