# Initial Cinema release evidence — 17 October 2026

Superseded by the [live API correction](LIVE-API.md): live metadata is primary,
and the saved collection below is now the outage fallback.

Live: **https://cinema.ilyamedve.dev/**

- Original branch/revision: `master`, `7bcc2e2c2c3b312c94b5991b1cc9e4b1a2b38d42`.
- Restored source branch: `restore/2026-10-17` in `Terro216/cinema-react`.
- Published application source: `f86dcba4b036bfa93cc407ec6a1841df4a3d8b98`.
  A subsequent evidence-only commit records this report and improves the
  operational snapshot script; application assets are unchanged.
- Image: `cinema-react:restored-20261017`.
- Published image ID / local RepoDigest:
  `sha256:852d23e5231f4c1bead13c17eac5e9251895fbb975e5e80ff7e7e042ec4cc7de`.
- All 312 static files match the accepted candidate. Static manifest SHA-256:
  `27a3dcbe95c037677c16c0acc3f4d2967f9a0f96f2f80e21c672624fa5d648f5`.

## Preserved and restored

Original SCSS files, fonts, logo, colors, poster cards/shadows/hover scaling,
film background blur, genre ribbons, animate.css transitions and parallax-js
pointer movement are preserved. Repairs live in a separate restoration style
sheet. React 17 and HashRouter remain; only obsolete build tooling changed.

The saved collection contains **265 unique real films**: Top 250 (13 pages)
plus 36 historical favorites, with overlap. It includes real names, years,
descriptions, ratings, slogans, facts, countries, 265 posters and 31 local flags.
32 original genre filters remain; an empty genre/search has a useful empty
state. Russian/English title search, pagination, film opening, facts,
similar films, direct hash links, refresh and browser back/forward work.
Recommendations use shared saved genres/rating rather than the old remote
recommendation order. Metadata, images and fonts need no external requests.

## Verification

- Five data tests pass: complete local assets/details, every Top 250 page,
  search normalization, genre correctness and bounded recommendations/favorites.
- `npm audit`: **0 vulnerabilities** in locked dependencies at verification.
- Chromium on big-one: **45 checks passed before publication and 45 again on
  public HTTPS**, with zero application errors and zero external requests for
  catalog operation. Desktop 1280, tablet 768, widths 550/390/320, and actual
  touch/mobile emulation were exercised.
- Tested hover scaling, live parallax transforms, animation events, facts,
  additional recommendations, search from a film, empty search, invalid film,
  unknown route, direct links/reload, history restoration, final-page wrap,
  a new search during a pending animation, and reduced-motion preferences.
- Forced catalog 503: exactly one request, no retry loop; explicit retry
  restores both cards and genres. Injected player top-navigation was blocked.
- Every public poster/flag returned successfully: **296 assets**, 16,155,285 bytes.
  No API key is in the built JS. Container healthy, restarts 0, RAM limit 64 MiB,
  CPU 0.5, read-only, no host port bindings.
- DNS A agrees with the working big-one domains: `94.126.204.131`, no AAAA.
  No preexisting Cinema Caddy host. HTTPS certificate matches
  `cinema.ilyamedve.dev`, expires 15 January 2027; validated TLS 1.3.
- Gatus hot reload activated both `apps / Cinema` and `containers / cinema-react`;
  actual results are successful. Caddy/Gatus were not restarted.
- Full `scripts/bootstrap/check.sh` passed all 37 stack configurations and
  checked runtime fields. Existing config-hash warnings and separately managed
  museum/course/reviews deployments remain noted by that tool.

[Candidate checks](evidence/browser-candidate.json),
[public checks](evidence/browser-public.json),
[original failures](evidence/original-errors.json),
[image identity](evidence/image.json), [asset/runtime checks](evidence/public-assets.json),
[monitor results](evidence/monitors.json), [real player probes](evidence/players.json).

[Desktop](evidence/desktop-catalog.png) · [Mobile catalog](evidence/mobile-catalog.png) ·
[Mobile film](evidence/mobile-film.png).

## Server integration and neighbors

A separate Compose service uses existing Caddy and `caddy_net`, with healthcheck,
resource limits, log rotation and a retained image archive/rollback tag.
Production/recovery registries, server README, portal source catalog and generated
references were updated. The independent project is registered as a submodule.
Infrastructure/portal working changes are left in their existing repositories;
other projects' dirty changes and staged work are preserved.

The portal was being published concurrently by other restoration tasks. Its
previous-image guard stopped stale candidates. The final update used the latest
live image and changed only `catalog.json`; its UI hashes match the accepted
portal candidate. Existing entries and auth fingerprint were preserved.
Cinema was verified on the public portal in RU/EN at desktop/mobile widths;
anonymous catalog access still returns 401.

At the immediate post-Cinema and post-portal checks, preexisting Caddy route
hashes remained unchanged and core neighbors retained IDs/start times/restarts.
The portal replacement was intentional. A later final audit observed an
independent Vaultwarden replacement at 19:49:45 UTC, after the post-portal
snapshot at 19:48:14 UTC. Its image/container and vault route changed; it is
healthy and its public `/alive` returns 200. This task issued no Vaultwarden
mutation. The final snapshot therefore does not claim every neighboring
container stayed unchanged throughout parallel work. Dino/Tick/Cinema health
probes also returned 200. Concurrent new-project publications/QA containers
changed during the window and are recorded separately. Sanitized local release
snapshots remain on big-one under
`/home/me/.local/state/cinema-react-releases/20261017/`.

## Recovery and remaining limits

Rollback tag: `cinema-react:rollback-restored-20261017`; image archive:
`/home/me/.local/state/cinema-react-releases/20261017/cinema-react-image.tar`.
For subsequent regressions, from the project directory:

```sh
CINEMA_IMAGE=cinema-react:rollback-restored-20261017 docker compose up -d --no-deps --no-build --pull never --wait --wait-timeout 90 web
```

Before restoration there was no Cinema deployment; to withdraw this first
release, stop only `web`. Keep the archive and external Caddy network.
[Full recovery instructions](DEPLOYMENT.md).

No persistent app data or new secrets. Recovery from the remote Git branch and
pinned image is sufficient; Cinema is intentionally excluded from DE app-data
Restic. Active DE receipts verified: 17 October 16:48–16:49 UTC, 8 snapshots,
199,779,818 bytes, data_check/restore_verify/result all OK. Paused Yandex jobs
were not enabled. The saved catalog needs no application-data backup. Credential handling has
since changed: the exposed key was removed from Git. For optional live metadata,
follow [credential setup](CREDENTIALS.md) with a separately provisioned key.

The saved catalog is finite and ratings are a snapshot. Films outside it show
an informative message; updates are deliberate, not scheduled. Playback is
still unavailable: Pleer has DNS failure; Yohoho's script loads in Chromium but
does not establish a usable player and previously redirected the original page
to its 404. Optional legacy buttons are preserved in sandboxed iframes, with an
error/timeout state, and cannot navigate the parent page. No playable streams
are asserted.
