# Cinema restoration

Original branch: `master`.
Original revision: `7bcc2e2c2c3b312c94b5991b1cc9e4b1a2b38d42`
(2022-02-14, `fix redirect`). Full original Git history is retained.

Preservation baseline: original `src/**/*.scss`, fonts, logo, reference images
in `screenshots/`, animate.css 4 and parallax-js 3. React 17 and HashRouter 5
remain. Build tooling changes from CRA 4/node-sass 5 to Vite/Dart Sass to
build on supported Node 22 without native Python/LibSass dependencies.

Runtime metadata and players are independent. The bundled catalog contains
real API metadata and locally saved posters. No API key is shipped to browsers.
Catalog, search, genre filters, pagination, details, facts and recommendations
work without external network access. Ratings describe the saved snapshot.

Initial dependency probes on big-one, 2026-10-17:
- legacy top and film v2.1 endpoints: HTTP 200;
- yohoho.cc/yo.js: HTTP 403;
- pleer.videoplayers.club: DNS failure.

Browser reproduction, restoration checks and release evidence are recorded
in the release report after verification.
