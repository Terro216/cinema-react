# Live metadata and saved fallback — 17 October 2026

https://cinema.ilyamedve.dev/

Live API metadata is the primary source again: Top 250, title search, genres,
film descriptions/ratings/facts and the original API recommendation order.
Search and direct links can open films outside the 265 saved records. For
example, `/#/film/4540126` (Дюна: Часть вторая) is outside the archive and was
verified with its real poster, description and recommendations.

The initial restoration mistakenly used the saved collection as the only
provider. It is now an automatic, complete fallback during API failure. The
original visual design, animation and parallax remain. A brief saved-copy note
explains the reduced catalog during an outage; no fake titles/posters are used.

The browser sends same-origin requests to an allowlisted nginx proxy. An
optional, separately supplied credential is read from an ignored `.env` and
is not included in the frontend bundle or image. Nginx verifies the upstream certificate and supports its full
current Let's Encrypt chain (verification depth 5), bounds DNS/connect/read
waits and retries no upstream requests. API responses are cached in disposable,
size-limited tmpfs for ten minutes. No visitor cookies or auth headers go to
the metadata API, and search query access logging is disabled.

Client requests are deduplicated and cached. A timeout, rate limit or service
failure triggers the saved provider and a 30-second cooldown. There is no
automatic retry loop. Explicit retry can recover immediately. HTTP 400/404
for an unknown film does not disable healthy API calls or cause a redirect.
Live recommendation order is kept; shared-genre suggestions are only a fallback.

Checks on big-one: 12 data/provider tests; 20 live/outage browser scenarios;
45 desktop/mobile/touch scenarios in the forced-offline mode. Live checks
exercise real search pagination, an unsaved film, poster, live recommendations,
missing IDs, touch search during outage, bounded failed requests and recovery.
[Live candidate evidence](evidence/live-candidate.json), [20 public live checks](evidence/live-public.json),
[45 public fallback checks](evidence/fallback-public.json). Both public suites passed with zero application errors.

## Deployment and rollback

Current image: `cinema-react:live-20261017`.
Source/image identity and public acceptance are recorded alongside this report
in `docs/evidence/live-image.json` and `docs/evidence/live-public.json`.
The prior fully saved release is retained as
`cinema-react:rollback-restored-20261017`. To return to it:

```sh
CINEMA_IMAGE=cinema-react:rollback-restored-20261017 docker compose up -d --no-deps --no-build --pull never --wait --wait-timeout 90 web
```

Only `cinema-react/web` is replaced. Caddy and neighboring services are not restarted.
[Full deployment instructions](DEPLOYMENT.md).

## Recovery and credentials

The saved films/posters/fonts, source, lockfile and configuration are in Git.
The saved catalog works without an API key and has no server-side user state.
Live metadata requires a separately provisioned key; see
[credential setup](CREDENTIALS.md). The old key and the history-recovery
script have been removed. Never retrieve credentials from old commits.

Old external video providers remain isolated; no working playback is asserted.
