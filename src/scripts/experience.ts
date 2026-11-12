// Site-wide behaviour: the mobile menu, the language menu, section markers and copy buttons.
// No storage, no network request, nothing moves on its own.
const header = document.querySelector<HTMLElement>('.nav');
const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const sheet = document.querySelector<HTMLElement>('#nav-sheet');

function measureHeader() {
  if (header)
    document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
}
if (header) new ResizeObserver(measureHeader).observe(header);
measureHeader();

function setMenu(open: boolean, returnFocus = false) {
  if (!toggle || !sheet) return;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? toggle.dataset.closeLabel! : toggle.dataset.openLabel!);
  sheet.hidden = !open;
  document.documentElement.classList.toggle('menu-open', open);
  if (returnFocus) toggle.focus();
}
toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
sheet?.addEventListener('click', (event) => {
  if ((event.target as HTMLElement).closest('a')) setMenu(false);
});
matchMedia('(min-width: 1024px)').addEventListener('change', (event) => {
  if (event.matches) setMenu(false);
});

const languageMenus = () => document.querySelectorAll<HTMLDetailsElement>('.lang[open]');
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (toggle?.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  languageMenus().forEach((menu) => {
    menu.open = false;
    menu.querySelector('summary')?.focus();
  });
});
document.addEventListener('click', (event) => {
  languageMenus().forEach((menu) => {
    if (!menu.contains(event.target as Node)) menu.open = false;
  });
});

// In-page section links (Features, Installation): mark the section being read.
const anchors = [...document.querySelectorAll<HTMLAnchorElement>('[data-section-nav] a')];
const sections = anchors.map((anchor) => document.querySelector<HTMLElement>(anchor.hash));
if (anchors.length) {
  let pending = false;
  const update = () => {
    pending = false;
    const offset = (header?.offsetHeight || 0) + 100;
    let current = -1;
    sections.forEach((section, i) => {
      if (section && section.getBoundingClientRect().top <= offset) current = i;
    });
    anchors.forEach((anchor, i) => {
      if (i === current) anchor.setAttribute('aria-current', 'location');
      else anchor.removeAttribute('aria-current');
    });
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!pending) {
        pending = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}

// Copy buttons write to the clipboard only when clicked.
document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((button) =>
  button.addEventListener('click', async () => {
    const block = button.closest('.code-block')!;
    const status = block.querySelector('.copy-status')!;
    try {
      await navigator.clipboard.writeText(block.querySelector('code')!.textContent!);
      status.textContent = button.dataset.success!;
      const label = button.querySelector('span')!;
      const original = label.textContent;
      label.textContent = button.dataset.success!;
      setTimeout(() => {
        label.textContent = original;
      }, 2000);
    } catch {
      status.textContent = button.dataset.error!;
    }
  }),
);
