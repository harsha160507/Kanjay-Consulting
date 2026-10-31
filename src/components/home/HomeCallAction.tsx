import Magnet from '../react-bits/prototype/Magnet';
import { useReduced } from '../react-bits/prototype/useReduced';

export default function HomeCallAction({ phone }: { phone: string }) {
  const { reduced } = useReduced();
  return <Magnet disabled={reduced} wrapperClassName="home-call-magnet" innerClassName="home-call-inner"
    maxOffset={2} padding={12} magnetStrength={10} tilt={0} scale={1} spring={{ stiffness: 170, damping: 30 }}>
    <a className="proto-button home-primary" href={`tel:${phone}`}>Call our team <span className="link-arrow" aria-hidden="true">↗</span></a>
  </Magnet>;
}
