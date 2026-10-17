# Cinema: deployment and recovery

Public URL: https://cinema.ilyamedve.dev/
Source: https://github.com/Terro216/cinema-react (restoration branch recorded in RELEASE.md).
Original: `master` at `7bcc2e2c2c3b312c94b5991b1cc9e4b1a2b38d42`.

## Run and update

Use Node >=22.12 on big-one. `npm ci && npm run build`; `npm start` or
`npm run preview -- --port 18177` binds only loopback. Keep all builds, browsers
and containers on big-one. No API credentials are required to run or build.
`npm test` validates the actual saved catalog; `npm run test:browser -- <URL> <output>`
tests the nginx candidate/public site with external requests blocked.

The Dockerfile pins Node and nginx by SHA-256; npm versions are locked.
Compose runs only this site's nginx: UID nginx, read-only filesystem,
16 MiB tmpfs, 64 MiB RAM, 0.5 CPU, 64 PIDs, logs 3 x 5 MiB, `/healthz`.
No host ports, persistent volumes, Docker socket or app credentials.
Caddy discovers only this service's labels on existing `caddy_net`.
HashRouter keeps original `/#/film/448` links. Catalog page numbers are stored
inside the hash query so back/forward and reload preserve them.

Build a new, uniquely named image. Pass its source commit as `SOURCE_REVISION`.
Run it without Caddy labels on a loopback port for browser acceptance first.
Before release record container IDs/StartedAt, Caddy config, current image,
configuration and a rollback tag. Publish only the approved image, for example:

```sh
CINEMA_IMAGE=cinema-react:restored-20261017 docker compose up -d --no-deps --no-build --pull never --wait --wait-timeout 90 web
```

Default Compose image is the first restored release. Future updates must record
an immutable tag/image ID and change the configured image deliberately.

## Rollback

There was no Cinema deployment before this restoration. To withdraw this first
publication, `docker compose stop web` from this directory removes its dynamic
Caddy route; do not stop Caddy or run a stack-wide down/restart.

The accepted first image is retained as `cinema-react:rollback-restored-20261017`.
For a later regression:

```sh
CINEMA_IMAGE=cinema-react:rollback-restored-20261017 docker compose up -d --no-deps --no-build --pull never --wait --wait-timeout 90 web
```

Then repeat public `/healthz`, catalog/search, direct film and mobile checks.
Release evidence and image archives live on big-one in
`/home/me/.local/state/cinema-react-releases/`. The portal catalog update has
its own previous image/config in that release directory.

## Restore from loss of host

This is a reproducible static site. Everything needed is versioned in this
independent Git repository: source, lockfile, fonts/logo, 265 real movie
records, 265 local posters, flags and nginx/Compose configuration. There is
no user state to back up. Restore the published source commit from Git,
`docker compose build` (or `docker load` the saved image archive), create
`caddy_net` as part of normal server bootstrap, then start only `web`.
Confirm DNS points to the host and verify HTTPS plus actual browser behavior.

Cinema is intentionally excluded from the DE app-data Restic profile because
it has no non-reproducible state. Do not enable paused Yandex timers for it.
The server production/recovery registries and portal catalog are in their
existing repositories. No new secrets or recovery key are introduced.
Current DE copy freshness and the encrypted recovery handoff are recorded
in RELEASE.md and the server BACKUPS.md. The owner updates the existing
`Server recovery: DE + big-one` note and downloads the encrypted handoff via
their local client; that manual step cannot be proved by a server export.

## Saved metadata and old players

`public/data/catalog.json` is a frozen API snapshot (timestamp in JSON): 250 top
films plus the original favorites, 265 unique films total, with real ratings,
descriptions, slogans, countries, genres and facts. Search and genres work
across the saved set. Genres without saved matches show a normal empty state.
Similar films are deterministically ranked by shared genres and saved rating;
they are not claimed to reproduce the external API's recommendation order.
Movies outside this set show an informative missing-film state without redirect.

To deliberately refresh, run `scripts/snapshot.py` on big-one with an owner's
API key supplied as `KP_API_KEY` through the environment. It uses at most three
connections, a resumable external cache and no automatic retries; review the
new catalog/posters before committing. Never put the key in Vite variables.
No scheduled API job or runtime API dependency is enabled.

The original player protocols were checked. Yohoho's HTTP script redirected
the original top-level page to a provider 404; HTTPS returned 403. Pleer had a
DNS failure. Restored buttons attempt the original integrations over HTTPS
only when clicked, inside a sandboxed iframe without top-navigation/popups.
A bounded timeout/error message leaves the catalog usable. No working movie
stream is asserted. Original analytics tags were removed from the restored
entrypoint; they are not needed for the historical visual design.
