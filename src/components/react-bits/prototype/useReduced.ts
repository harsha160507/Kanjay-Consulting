import { useEffect, useState } from 'react';
export function useReduced() {
  const [reduced, setReduced] = useState(true); // Static server/first render is always safe.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { setReduced(query.matches || document.documentElement.hasAttribute('data-motion-reduced')); setReady(true); };
    update(); query.addEventListener('change', update);
    window.addEventListener('kanjay-motion-change', update);
    return () => { query.removeEventListener('change', update); window.removeEventListener('kanjay-motion-change', update); };
  }, []);
  return { reduced, ready };
}
