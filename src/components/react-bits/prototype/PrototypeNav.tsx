import PillNav from './PillNav';
import { useReduced } from './useReduced';
export default function PrototypeNav({ prefix = '' }: { prefix?: string }) {
  const { reduced } = useReduced();
  const items = ['About Us', 'Services', 'Clients', 'Contact Us'].map((label, i) => ({ label, href: prefix + ['about/', 'services/', 'clients/', 'contact/'][i] }));
  return <div className="prototype-nav">{reduced ? <nav aria-label="Prototype Pill Nav static fallback"><ul>{items.map(p => <li key={p.href}><a href={p.href}>{p.label}</a></li>)}</ul></nav> : <PillNav items={items} activeHref="" collapse="never" intro={false} theme="light" surface="none" indicator="none" hoverEffect="fill" ariaLabel="Prototype React Bits Pill Nav" style={{ '--pn-ring': 'var(--focus)', '--pn-tile': 'var(--surface)', '--pn-tile-rim': 'none', '--pn-pill-shadow': 'none', '--pn-strong': 'var(--text)', '--pn-text': 'var(--text)', '--pn-pill': 'var(--text)', '--pn-pill-ink': 'var(--bg)' } as React.CSSProperties} />}</div>;
}
