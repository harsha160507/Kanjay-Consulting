import { useState } from 'react';
import LogoLoop from './LogoLoop';
import { useReduced } from './useReduced';
import { currentClients } from '../../../data/clients';
import ClientLogoTile from '../../home/ClientLogoTile';
const selection = new Set(['eaton', 'aaviza-technologies', 'deforay', 'zuppa', 'woyc-od']);
const clients = currentClients.filter(client => selection.has(client.id));
const logos = clients.map(client => ({ node: <ClientLogoTile client={client} decorative /> }));
export default function PrototypeClients() {
  const { reduced, ready } = useReduced();
  const [playing, setPlaying] = useState(false);
  return <section className="prototype-clients" aria-label="Approved client-logo treatment">
    <div className="prototype-strip-heading"><div><p className="section-label">Approved client assets</p><h2>A considered place for client brands.</h2></div>{ready && !reduced && <button className="proto-button outline" type="button" aria-pressed={playing} onClick={() => setPlaying(v => !v)}>{playing ? 'Pause logo motion' : 'Play logo motion'}</button>}</div>
    <div className="prototype-loop" aria-hidden="true">{!reduced && <LogoLoop logos={logos} speed={playing ? 28 : 0} intro={false} draggable={false} pauseOnHover={true} fadeOut={false} logoHeight={64} gap={48} />}</div>
    <ul className="prototype-client-grid">{clients.map(client => <li key={client.id}><ClientLogoTile client={client} /></li>)}</ul>
    <p className="small">Static approved-client grid remains available at all times. Motion is opt-in and disabled for reduced motion.</p>
  </section>;
}
