import './UiverseButton.css';
export default function PrototypeHero({ prefix = '' }: { prefix?: string }) {
  const action = <a className="proto-button primary" href={prefix + 'contact/'}>Talk to our team <span className="link-arrow" aria-hidden="true">↗</span></a>;
  return <div className="prototype-hero">
    <div className="prototype-hero-copy"><p className="section-label">Kanjay Consulting · Component prototype</p>
      <h1>HR support.<br /><span className="prototype-accent">GeM seller guidance.</span></h1>
      <p className="lede">HR support worldwide. GeM seller support across India.</p><p>Established in 2014. GeM consulting since 2018.</p>
      <div className="prototype-actions">{action}<a className="proto-button outline" href={prefix + 'about/'}>Know more about us <span className="arrow-wrapper" aria-hidden="true"><span className="arrow" /></span></a></div>
    </div>
    <div className="prototype-hero-aside"><span className="section-label">Two areas of support</span><p>People &amp;<br />process.</p><p>Government<br />marketplace.</p><small>Draft presentation. Only owner-confirmed facts are used.</small></div>
  </div>;
}
