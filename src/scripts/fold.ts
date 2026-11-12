// Folds on small screens. Blocks marked `data-fold` hold native <details>, open in the HTML, so
// everything is readable without JavaScript. From 640 px they stay open and do not toggle: the
// page looks and reads as before. Under 640 px they start closed and open one by one on a tap.
const narrow = matchMedia('(max-width: 639px)');
const folds = [...document.querySelectorAll<HTMLElement>('[data-fold]')];

function apply() {
  folds.forEach((fold) =>
    fold.querySelectorAll<HTMLDetailsElement>(':scope > details').forEach((details) => {
      details.open = !narrow.matches;
      // From 640 px the question is not a control: out of the tab order, and a click does nothing.
      details.querySelector('summary')!.tabIndex = narrow.matches ? 0 : -1;
    }),
  );
}

document.addEventListener('click', (event) => {
  if (narrow.matches) return;
  const summary = (event.target as Element).closest('summary');
  if (summary && summary.closest('[data-fold]')) event.preventDefault();
});
apply();
narrow.addEventListener('change', apply);
