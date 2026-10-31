/** Progressive adaptation of the owner's supplied Fade Content component.
 * No hidden initial styles, React hydration, GSAP, noise, stagger or scroll control.
 * Native animations leave no persistent styles even if enhancement fails.
 */
export function enhanceFadeContent(doc: Document, view: Window & typeof globalThis) {
  if (!view.matchMedia || !view.IntersectionObserver || !view.Element.prototype.animate) return;
  const preference = view.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches) return;
  const running = new Map<Element, Animation>();
  const cancel = () => { running.forEach(animation => animation.cancel()); running.clear(); };
  try {
    const observer = new view.IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const target = entry.target;
        observer.unobserve(target); // Each section enters once; never replay on return.
        if (preference.matches || target.contains(doc.activeElement)) continue;
        try {
          const animation = target.animate(
            [{ opacity: 0.5, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }],
            { duration: 320, easing: 'ease-out', fill: 'none' }
          );
          running.set(target, animation);
          animation.finished.then(() => running.delete(target), () => running.delete(target));
        } catch { /* Static content remains visible if animation is unavailable. */ }
      }
    }, { threshold: 0 });
    doc.querySelectorAll('[data-fade-content]').forEach(section => observer.observe(section));
    preference.addEventListener('change', () => {
      if (preference.matches) { cancel(); observer.disconnect(); }
    });
    // Never animate a section containing the visitor's keyboard focus.
    doc.addEventListener('focusin', event => {
      for (const [target, animation] of running) {
        if (event.target instanceof view.Node && target.contains(event.target)) {
          animation.cancel(); running.delete(target);
        }
      }
    });
    view.addEventListener('pagehide', () => { cancel(); observer.disconnect(); }, { once: true });
  } catch { cancel(); }
}
