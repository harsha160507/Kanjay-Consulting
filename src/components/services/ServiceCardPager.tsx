// Adapted from the owner-supplied ServiceCardPager.tsx; original retained in docs.
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import ServiceLineIcon from './ServiceLineIcon';

type ServiceFaq = { question: string; answer: string };
type Service = { id: string; name: string; who: string; problem: string; scope: string; faq: ServiceFaq };
type Group = { id: string; name: string; market: string; intro: string; services: readonly Service[] };
type Props = { group: Group; businessEmail: string; candidateEmail: string; staticListId: string };

export default function ServiceCardPager({ group, businessEmail, candidateEmail, staticListId }: Props) {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(true);
  const cardRef = useRef<HTMLElement>(null);
  const focusPending = useRef(false);
  const uid = `${group.id}-${useId()}`;
  const count = group.services.length;
  const service = group.services[active];

  const go = useCallback((index: number, moveFocus = true) => {
    const next = (index + count) % count;
    focusPending.current = moveFocus;
    setActive(next);
    // Copying the URL preserves the selected card; other query parameters stay.
    history.replaceState(null, '', `#${group.services[next].id}`);
  }, [count, group.services]);

  useLayoutEffect(() => {
    if (ready && focusPending.current) {
      cardRef.current?.focus({ preventScroll: true });
      focusPending.current = false;
    }
  }, [active, ready]);

  useEffect(() => {
    const list = document.getElementById(staticListId);
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = () => setReduced(query.matches);
    onMotion(); query.addEventListener('change', onMotion);
    let firstFrame = 0, secondFrame = 0;
    const applyHash = () => {
      let hash = location.hash.slice(1);
      try { hash = decodeURIComponent(hash); } catch { /* Malformed fragments are harmless. */ }
      const index = group.services.findIndex(item => item.id === hash);
      if (index < 0) return;
      setActive(index);
      cancelAnimationFrame(firstFrame); cancelAnimationFrame(secondFrame);
      firstFrame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(() => {
          document.getElementById(group.id)?.scrollIntoView({ block: 'start' });
          if (focusPending.current) { cardRef.current?.focus({ preventScroll: true }); focusPending.current = false; }
        });
      });
    };
    const activate = () => {
      // Preserve a link focused before hydration rather than hiding its DOM.
      if (!list?.contains(document.activeElement)) setReady(true);
    };
    const onFocusOut = () => queueMicrotask(activate);
    const onIndexClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      if (!anchor || !group.services.some(item => anchor.hash === `#${item.id}`)) return;
      event.preventDefault();
      if (location.hash !== anchor.hash) history.pushState(null, '', anchor.hash);
      focusPending.current = true;
      applyHash();
    };
    applyHash(); activate();
    list?.addEventListener('focusout', onFocusOut);
    document.addEventListener('click', onIndexClick);
    window.addEventListener('hashchange', applyHash);
    window.addEventListener('popstate', applyHash);
    window.addEventListener('kanjay-service-pager-ready', applyHash);
    return () => {
      cancelAnimationFrame(firstFrame); cancelAnimationFrame(secondFrame);
      list?.removeEventListener('focusout', onFocusOut);
      document.removeEventListener('click', onIndexClick);
      query.removeEventListener('change', onMotion);
      window.removeEventListener('hashchange', applyHash);
      window.removeEventListener('popstate', applyHash);
      window.removeEventListener('kanjay-service-pager-ready', applyHash);
    };
  }, [group, staticListId]);

  useEffect(() => {
    if (!ready) return;
    const list = document.getElementById(staticListId);
    if (!list) return;
    // The complete fallback remains in HTML; only its duplicate interactive
    // controls leave the accessibility/focus tree while the pager is active.
    list.inert = true;
    list.setAttribute('aria-hidden', 'true');
    list.setAttribute('data-pager-active', 'true');
    window.dispatchEvent(new Event('kanjay-service-pager-ready'));
    return () => {
      list.inert = false;
      list.removeAttribute('aria-hidden');
      list.removeAttribute('data-pager-active');
    };
  }, [ready, staticListId]);

  if (!ready) return null;
  const emailFor = (name: string) => `mailto:${businessEmail}?subject=${encodeURIComponent(name + ' enquiry')}`;
  const employer = service.id === 'recruitment-talent-acquisition';
  const emailLabel = employer ? 'Employer enquiry by email' : 'Discuss this service by email';
  return <div className="service-pager" data-group={group.id} data-active-service={service.id} aria-label={`${group.name} service cards`}>
    <div className="service-pager-controls">
      <button type="button" className="service-pager-nav" data-direction="previous" onClick={() => go(active - 1)} aria-label={`Previous ${group.name} service`}><span aria-hidden="true">←</span> Previous</button>
      <label className="service-pager-picker"><span className="sr-only">Choose a {group.name} service</span>
        <select value={service.id} onChange={event => go(group.services.findIndex(item => item.id === event.target.value), false)}>
          {group.services.map((item, index) => <option key={item.id} value={item.id}>{index + 1}. {item.name}</option>)}
        </select>
      </label>
      <button type="button" className="service-pager-nav" data-direction="next" onClick={() => go(active + 1)} aria-label={`Next ${group.name} service`}>Next <span aria-hidden="true">→</span></button>
    </div>
    <p className="service-pager-position" aria-hidden="true">Card {active + 1} of {count}</p>
    <p className="sr-only" role="status">Showing {service.name}, card {active + 1} of {count}.</p>
    <article key={service.id} ref={cardRef} tabIndex={-1} className={'service-detail service-pager-card' + (reduced ? '' : ' service-pager-card--motion')} aria-labelledby={`${uid}-title`}>
      <header className="service-card-title"><ServiceLineIcon serviceId={service.id} /><h3 id={`${uid}-title`}>{service.name}</h3></header>
      <dl className="service-facts"><dt>Who it serves</dt><dd>{service.who}</dd><dt>Need addressed</dt><dd>{service.problem}</dd><dt>Scope described</dt><dd>{service.scope}</dd></dl>
      <details className="service-faq"><summary>{service.faq.question}</summary><p>{service.faq.answer}</p></details>
      <a className="services-text-link service-email" href={emailFor(service.name)} aria-label={`${emailLabel}: ${service.name}`}>{emailLabel} <span className="link-arrow" aria-hidden="true">↗</span></a>
      {employer && <a className="services-text-link service-email" href={`mailto:${candidateEmail}`}>Candidate enquiry by email <span className="link-arrow" aria-hidden="true">↗</span></a>}
      <a className="service-back" href="#service-index">Back to service index <span className="link-arrow" aria-hidden="true">↑</span></a>
    </article>
  </div>;
}
