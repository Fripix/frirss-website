// Motion that shows FriRSS at work. No pause button anywhere, so nothing moves without end:
// - everything is cut with prefers-reduced-motion (the page then shows the final, static state),
// - nothing runs off screen or in a background tab,
// - every automatic movement ends by itself in under five seconds (WCAG 2.2.2).
// No opacity on text: elements move or are revealed, they never sit half transparent.

const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const root = document.documentElement;

// Finite loops: a block marked `data-loop` plays its demonstration (two short cycles in CSS, under
// five seconds in all) when it comes on screen, then rests on its final state. It plays again when
// it is hovered, when the keyboard focus enters its section, or when it comes back on screen.
// The CSS keeps the final state as the resting state, so removing the class changes nothing visible.
const LOOP_MS = 5000;
type Loop = { el: HTMLElement; onScreen: boolean; armed: boolean; timer: number };
const loops = new Map<HTMLElement, Loop>();

function rest(loop: Loop) {
  clearTimeout(loop.timer);
  loop.el.classList.remove('is-playing');
}
function play(loop: Loop) {
  if (reduce.matches || document.hidden || loop.el.classList.contains('is-playing')) return;
  loop.el.classList.add('is-playing');
  loop.timer = window.setTimeout(() => rest(loop), LOOP_MS);
}

function setupLoops() {
  const seen = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        const loop = loops.get(entry.target as HTMLElement);
        if (!loop) return;
        if (!entry.isIntersecting) {
          // Fully out: nothing runs off screen, and the next arrival plays again.
          loop.onScreen = false;
          loop.armed = true;
          rest(loop);
        } else if (entry.intersectionRatio >= 0.4) {
          loop.onScreen = true;
          if (loop.armed) {
            loop.armed = false;
            play(loop);
          }
        }
      }),
    { threshold: [0, 0.4] },
  );
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  document.querySelectorAll<HTMLElement>('[data-loop]').forEach((el) => {
    const loop: Loop = { el, onScreen: false, armed: true, timer: 0 };
    loops.set(el, loop);
    seen.observe(el);
    el.addEventListener('pointerenter', () => {
      if (fine.matches) play(loop);
    });
  });
  // Keyboard: when the focus arrives in a section, its demonstrations on screen play again.
  document.addEventListener('focusin', (event) => {
    const target = event.target as HTMLElement;
    if (!target.matches(':focus-visible')) return;
    const section = target.closest('section');
    if (!section) return;
    loops.forEach((loop) => {
      if (loop.onScreen && section.contains(loop.el)) play(loop);
    });
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) loops.forEach(rest);
  });
}

// The hero window: two articles arrive at the top of the list, the counters follow, then it rests.
// The second arrival has finished within five seconds. Once the hero has left the screen the list
// goes back to its first state, so the same short scene plays when it comes back.
const ARRIVALS = [1200, 3100];
let resetHero = () => {};

function setupHero() {
  const hero = document.querySelector<HTMLElement>('[data-live-window]');
  const section = hero?.closest<HTMLElement>('section');
  const list = hero?.querySelector<HTMLElement>('.fr-rows');
  if (!hero || !section || !list) return;
  const rows = [...list.children] as HTMLElement[];
  const selected = list.querySelector<HTMLElement>('.is-selected');
  const counters = [...hero.querySelectorAll<HTMLElement>('[data-unread]')].map((el) => ({
    el,
    start: el.textContent ?? '',
  }));
  let timers: number[] = [];

  resetHero = () => {
    timers.forEach((timer) => clearTimeout(timer));
    timers = [];
    rows.forEach((row) => {
      row.classList.remove('is-arriving', 'is-selected');
      list.append(row);
    });
    selected?.classList.add('is-selected');
    counters.forEach(({ el, start }) => {
      el.textContent = start;
    });
  };
  const arrive = () => {
    if (reduce.matches || document.hidden) return;
    const row = list.lastElementChild as HTMLElement;
    list.querySelector('.is-selected')?.classList.remove('is-selected');
    list.prepend(row);
    void row.offsetWidth;
    row.classList.add('is-arriving', 'is-selected');
    counters.forEach(({ el }) => {
      el.textContent = String(Number(el.textContent) + 1);
    });
  };
  new IntersectionObserver((entries) =>
    entries.forEach((entry) => {
      if (!entry.isIntersecting) resetHero();
      else if (!timers.length) timers = ARRIVALS.map((ms) => window.setTimeout(arrive, ms));
    }),
  ).observe(section);
}

function setup() {
  if (reduce.matches) return;
  root.classList.add('has-motion');

  // 1. Entrances: titles rise, texts follow, visuals are revealed. One time only.
  const reveal = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        reveal.unobserve(entry.target);
      }),
    { rootMargin: '0px 0px -12% 0px' },
  );
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => reveal.observe(el));

  // 2. Finite loops: feature tiles, the star tile.
  setupLoops();

  // 3. The hero window receives two articles, then rests.
  setupHero();

  // Layouts and themes never change by themselves: the visitor chooses (tabs.ts, discovery.ts).
}

// Tabs and theme buttons are enhanced by their own scripts first.
requestAnimationFrame(setup);
reduce.addEventListener('change', () => {
  if (reduce.matches) {
    loops.forEach(rest);
    resetHero();
    root.classList.remove('has-motion');
  }
});
