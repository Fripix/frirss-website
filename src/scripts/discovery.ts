// Theme preview on the home page: recolours the HTML reader with the app's shipped themes.
// The theme only changes when the visitor chooses one. Nothing is stored or sent.
const demo = document.querySelector<HTMLElement>('[data-theme-demo]');
if (demo) {
  const picker = demo.querySelector<HTMLElement>('.theme-picker')!;
  const target = demo.querySelector<HTMLElement>('.theme-window')!;
  const choices = [...picker.querySelectorAll<HTMLButtonElement>('[data-theme-choice]')];
  const still = matchMedia('(prefers-reduced-motion: reduce)');

  const apply = (button: HTMLButtonElement) => {
    target.dataset.frTheme = button.dataset.themeChoice;
    demo.dataset.ground = button.dataset.themeChoice;
    choices.forEach((choice) => choice.setAttribute('aria-pressed', String(choice === button)));
  };

  choices.forEach((button) =>
    button.addEventListener('click', () => {
      // Where the browser can, the band and its window cross from one theme to the next as two
      // pictures (a View Transition, 300 ms) instead of recolouring every element. Elsewhere the
      // colours change with their CSS transition; with reduced motion, at once.
      if (still.matches || !('startViewTransition' in document)) {
        apply(button);
        return;
      }
      demo.classList.add('is-swapping');
      document
        .startViewTransition(() => apply(button))
        .finished.finally(() => demo.classList.remove('is-swapping'));
    }),
  );
  picker.hidden = false;
}
