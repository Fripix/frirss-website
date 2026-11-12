// The sliding comparison: a pointer drags the divider anywhere on the frame, the range input does
// the same from the keyboard. The position is one CSS property on the frame.
// A module of its own, so its names stay out of the site's scripts.
export {};

// Under 640 px there is no room for two interfaces side by side: one is shown at full width and a
// two-button switch swaps it (the CSS reads `data-side` on the section). The comparison then opens
// on the phone view. (The tabs are set up by tabs.ts, loaded before.)
const narrow = matchMedia('(max-width: 639px)');
document.querySelectorAll<HTMLElement>('[data-compare-switch]').forEach((group) => {
  const section = group.closest<HTMLElement>('[data-tabs]') ?? group.parentElement!;
  const buttons = [...group.querySelectorAll<HTMLButtonElement>('[data-compare-side]')];
  const show = (side: string) => {
    section.dataset.side = side;
    buttons.forEach((button) =>
      button.setAttribute('aria-pressed', String(button.dataset.compareSide === side)),
    );
  };
  buttons.forEach((button) =>
    button.addEventListener('click', () => show(button.dataset.compareSide!)),
  );
  show('fri');
  group.hidden = false;
});
if (narrow.matches) document.querySelector<HTMLButtonElement>('[data-compare-phone]')?.click();

const stillOnly = matchMedia('(prefers-reduced-motion: reduce)');

document.querySelectorAll<HTMLElement>('[data-compare]').forEach((frame) => {
  const range = frame.querySelector<HTMLInputElement>('input[type="range"]')!;
  let touched = false;
  const set = (value: number) => {
    const position = Math.min(100, Math.max(0, value));
    frame.style.setProperty('--pos', `${position}%`);
    range.value = String(Math.round(position));
    range.setAttribute(
      'aria-valuetext',
      `FreshRSS ${Math.round(position)} %, FriRSS ${100 - Math.round(position)} %`,
    );
  };
  const fromPointer = (event: PointerEvent) => {
    const box = frame.getBoundingClientRect();
    set(((event.clientX - box.left) / box.width) * 100);
  };
  frame.addEventListener('pointerdown', (event) => {
    if (narrow.matches) return;
    touched = true;
    frame.setPointerCapture(event.pointerId);
    frame.classList.add('is-dragging');
    fromPointer(event);
  });
  frame.addEventListener('pointermove', (event) => {
    if (frame.hasPointerCapture(event.pointerId)) fromPointer(event);
  });
  const release = () => frame.classList.remove('is-dragging');
  frame.addEventListener('pointerup', release);
  frame.addEventListener('pointercancel', release);
  range.addEventListener('input', () => {
    touched = true;
    set(Number(range.value));
  });

  // Entrance, once, when the frame comes on screen: it opens on FreshRSS and the divider travels
  // to the middle, which shows what the control does. Under a second and a half; skipped with
  // reduced motion.
  const rest = Number(range.value);
  if (stillOnly.matches) return set(rest);
  const from = 94;
  const duration = 1100;
  const delay = 350;
  set(from);
  const seen = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      seen.disconnect();
      const start = performance.now() + delay;
      const step = (now: number) => {
        if (touched) return;
        const progress = Math.min(1, Math.max(0, (now - start) / duration));
        const eased = 1 - Math.pow(1 - progress, 3);
        set(from + (rest - from) * eased);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    },
    { threshold: 0.4 },
  );
  seen.observe(frame);
});
