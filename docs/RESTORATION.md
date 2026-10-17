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

Browser reproduction on the unchanged source:
- 20 original catalog cards rendered successfully.
- Failed metadata request (controlled 503): `/#/film/999999999` navigated to
  `/127.0.0.1`, which returned 404. The hostname assignment is a reproduced
  failure path, not an assumption about every historical 404.
- Catalog failure caused 85 requests in 700 ms.
- The real original player navigated the top-level page to
  `https://yohoho.cc/jsjumptopage`, which returned 404.

The restored public sandbox loaded Yohoho's HTTPS script with HTTP 200 in
Chromium (the initial non-browser probe had 403), but no working player was
established and a bounded unavailable state appeared. Pleer still failed DNS.
The parent page stayed on the film. See [release evidence](RELEASE.md).
