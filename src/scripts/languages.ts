// "In your language" band (components/Languages.astro): each language radio carries FriRSS's own
// labels for that language (`data-labels`); choosing one rewrites every element marked `data-l` in
// the band's FriRSS renderings. Only the element's own text changes, never its icon. The date
// header ("Today · 6 November") is rebuilt with the browser's date formatting for that language.
// Without this script the radios stay hidden and the renderings keep the page's language.

const day = new Date(2026, 10, 6);

function ownText(el: Element): Text | null {
  for (const node of el.childNodes)
    if (node.nodeType === Node.TEXT_NODE && node.textContent!.trim()) return node as Text;
  return null;
}

function apply(band: Element, code: string, labels: Record<string, string>) {
  for (const el of band.querySelectorAll<HTMLElement>('[data-l]')) {
    const key = el.dataset.l!;
    let text = labels[key];
    if (!text) continue;
    if (key === 'dates.today') {
      const date = new Intl.DateTimeFormat(code, { day: 'numeric', month: 'long' }).format(day);
      text = `${text} · ${date} `;
    }
    const node = ownText(el);
    if (node) node.textContent = node.textContent!.match(/^\s*/)![0] + text + ' ';
    else el.append(text);
  }
}

for (const band of document.querySelectorAll('[data-langs]')) {
  const pick = band.querySelector<HTMLElement>('.langs-pick');
  if (!pick) continue;
  const scope = band.closest('section') ?? band;
  pick.hidden = false;
  pick.addEventListener('change', (event) => {
    const input = event.target as HTMLInputElement;
    if (input.name !== 'ui-lang' || !input.checked) return;
    apply(scope, input.value, JSON.parse(input.dataset.labels ?? '{}'));
  });
}

export {};
