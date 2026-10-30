import BlurText from './BlurText';
import GradientText from './GradientText';
import Magnet from './Magnet';
import { useReduced } from './useReduced';
import './UiverseButton.css';
export default function PrototypeHero({ prefix = '' }: { prefix?: string }) {
  const { reduced } = useReduced();
  const action = <a className="proto-button primary" href={prefix + 'contact/'}>Talk to our team <span aria-hidden="true">↗</span></a>;
  return <div className="prototype-hero">
    <div className="prototype-dots" aria-hidden="true" />
    <div className="prototype-hero-copy"><p className="eyebrow">Kanjay Consulting · Component prototype</p>
      <h1>{reduced ? <>HR support.<br /><span className="prototype-accent">GeM seller guidance.</span></> : <><BlurText text="HR support." delay={20} animationFrom={{ opacity: 1, filter: 'blur(2px)', y: 0 }} animationTo={[{ opacity: 1, filter: 'blur(0px)', y: 0 }]} stepDuration={0.25} /><GradientText colors={['var(--accent)', 'var(--text)']}>GeM seller guidance.</GradientText></>}</h1>
      <p className="lede">HR support worldwide. GeM seller support across India.</p><p>Established in 2014. GeM consulting since 2018.</p>
      <div className="prototype-actions">{reduced ? action : <Magnet maxOffset={3} magnetStrength={8} tilt={0} scale={0}>{action}</Magnet>}<a className="proto-button outline" href={prefix + 'about/'}>Know more about us <span className="arrow-wrapper" aria-hidden="true"><span className="arrow" /></span></a></div>
    </div>
    <div className="prototype-hero-aside"><span className="eyebrow">Two areas of support</span><p>People &amp;<br />process.</p><p>Government<br />marketplace.</p><small>Draft presentation. Only owner-confirmed facts are used.</small></div>
  </div>;
}
