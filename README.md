# CINEMA

A careful restoration of my 2021–2022 React movie theater.

**[Open Cinema](https://cinema.ilyamedve.dev/)**

Original React 17 / HashRouter interface, fonts, cards, colors, animate.css
transitions and parallax-js poster movement are preserved. The build now uses
Vite and Dart Sass with a lockfile and pinned Docker bases.

265 real films (Top 250 plus the old personal list), posters, descriptions,
ratings, facts and flags are included in the repository. Catalog, search,
genres, pagination and recommendations use live metadata, with this complete
saved collection as an automatic fallback during API outages.
The existing API key is used only by an allowlisted nginx proxy; it is absent
from the browser bundle. No application database or data backup is needed.
External movie players are currently unavailable; their optional integrations
are isolated from the rest of the site.

```sh
npm ci
npm start
npm test
npm run build
```

Use Node >=22.12. In the server tree these commands run on big-one via shims.

[Restoration baseline](docs/RESTORATION.md) · [Deployment, rollback, recovery](docs/DEPLOYMENT.md) · [Live API release](docs/LIVE-API.md) · [Initial release evidence](docs/RELEASE.md)

Original screenshots remain in `screenshots/`. Original source commit:
`7bcc2e2c2c3b312c94b5991b1cc9e4b1a2b38d42`.

Author: [Ilya Medvedev](https://github.com/Terro216)
