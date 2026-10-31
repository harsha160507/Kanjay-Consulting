import type { CSSProperties } from 'react';
import '../../styles/client-logos.css';
import { logoDimensions, type ClientLogo } from '../../lib/client-logos';

export default function ClientLogoTile({ client, decorative = false }: { client: ClientLogo; decorative?: boolean }) {
  const size = logoDimensions(client);
  return <span className="client-logo-art" data-reversed={client.darkBacking ? '' : undefined}>
    <img src={client.image} alt={decorative ? '' : client.name} width={client.width} height={client.height}
      loading="lazy" decoding="async" draggable={false}
      style={{ '--logo-width': `${size.width}px`, '--logo-height': `${size.height}px` } as CSSProperties} />
  </span>;
}
