// Enhance ordinary content only after the keyboard and panel controls are ready.
document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((root) => {
  const list = root.querySelector<HTMLElement>('[data-tablist]')!;
  const tabs = [...list.querySelectorAll<HTMLButtonElement>('[data-panel]')];
  const panels = tabs.map((tab) => document.getElementById(tab.dataset.panel!)!);
  const syncHash = root.hasAttribute('data-tabs-hash');
  // `data-tabs-keep`: the panels that are not chosen stay in place, invisible and inert, so the
  // container keeps the height of the tallest one (see custom.css). Otherwise they are hidden.
  const keep = root.hasAttribute('data-tabs-keep');
  let selected = 0;

  function select(index: number, focus = false) {
    selected = index;
    root.dataset.selected = tabs[index].dataset.panel;
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      if (keep) {
        panels[i].inert = i !== index;
        panels[i].classList.toggle('is-off', i !== index);
      } else panels[i].hidden = i !== index;
    });
    if (focus) tabs[index].focus();
  }
  list.setAttribute('role', 'tablist');
  tabs.forEach((tab, i) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panels[i].id);
    panels[i].setAttribute('role', 'tabpanel');
    panels[i].setAttribute('aria-labelledby', tab.id);
    panels[i].tabIndex = 0;
    tab.addEventListener('click', () => {
      select(i);
      if (syncHash) history.replaceState(null, '', `#${panels[i].id}`);
    });
    tab.addEventListener('keydown', (event) => {
      const direction = document.documentElement.dir === 'rtl' ? -1 : 1;
      let next = selected;
      if (event.key === 'ArrowRight') next += direction;
      else if (event.key === 'ArrowLeft') next -= direction;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      const target = (next + tabs.length) % tabs.length;
      select(target, true);
      if (syncHash) history.replaceState(null, '', `#${panels[target].id}`);
    });
  });

  function fromHash() {
    const index = panels.findIndex((panel) => `#${panel.id}` === location.hash);
    if (index < 0) return;
    select(index);
    requestAnimationFrame(() => root.scrollIntoView({ block: 'start', behavior: 'instant' }));
  }
  select(0);
  list.hidden = false;
  root.dataset.enhanced = 'true';
  if (syncHash) {
    fromHash();
    window.addEventListener('hashchange', fromHash);
  }
});
