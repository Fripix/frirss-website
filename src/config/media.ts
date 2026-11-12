// The product film slot on the Features page.
// Today it shows a still: the three-column layout of the HTML rendering of FriRSS, the same as on
// the home page (src/assets/media/film-poster-{lang}.webp, 16:9, 2560 × 1440, WebP). To change it,
// replace those files.
// To show a film, put the files in public/media/ and fill `mp4` (H.264, 1280 × 720, under 30 s,
// silent, under 4 MB) and, if you have it, `webm`. The still then becomes the poster frame.
// The film never plays by itself and never loops: the visitor starts it (charter, Motion).
// `provisional: true` would keep `npm run publication:check` from passing (for a stand-in).
export const productFilm = {
  mp4: '',
  webm: '',
  width: 1280,
  height: 720,
  provisional: false,
};
