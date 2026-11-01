// Enhance existing native content in place. Failure/no JS leaves both articles visible.
export function enhanceWorkingStepper(root: HTMLElement) {
  const panes = Array.from(root.querySelectorAll<HTMLElement>('.stepper__pane'));
  const links = Array.from(root.querySelectorAll<HTMLAnchorElement>('.stepper__segment'));
  const controls = root.querySelector<HTMLElement>('[data-stepper-controls]');
  const back = root.querySelector<HTMLButtonElement>('[data-stepper-back]');
  const next = root.querySelector<HTMLButtonElement>('[data-stepper-next]');
  const status = root.querySelector<HTMLElement>('[data-stepper-status]');
  if (panes.length !== links.length || !panes.length || !controls || !back || !next || !status) return;
  let active = 0;
  const show = (index: number, focus = false) => {
    active = Math.max(0, Math.min(panes.length - 1, index));
    // A hidden pane cannot receive focus: reveal the existing node first.
    if (focus) { panes[active].hidden = false; panes[active].focus({ preventScroll: true }); }
    panes.forEach((pane, i) => { pane.hidden = i !== active; });
    links.forEach((link, i) => { if (i === active) link.setAttribute('aria-current', 'step'); else link.removeAttribute('aria-current'); });
    back.disabled = active === 0; next.disabled = active === panes.length - 1;
    status.textContent = panes[active].querySelector('h3')?.textContent ?? '';
  };
  const applyHash = () => { const index = panes.findIndex(p => '#' + p.id === location.hash); if (index >= 0) show(index, panes.some(p => p.contains(document.activeElement))); };
  links.forEach((link, index) => link.addEventListener('click', event => {
    if (event.button || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); show(index, true); history.pushState(null, '', link.hash);
    panes[index].scrollIntoView({ block: 'nearest' });
  }));
  const move = (offset: number) => { show(active + offset, true); history.replaceState(null, '', '#' + panes[active].id); };
  back.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  window.addEventListener('hashchange', applyHash); window.addEventListener('popstate', applyHash);
  const focused = panes.findIndex(p => p.contains(document.activeElement));
  show(focused >= 0 ? focused : Math.max(0, panes.findIndex(p => '#' + p.id === location.hash)));
  controls.hidden = false;
  root.setAttribute('data-stepper-enhanced', 'true');
}
