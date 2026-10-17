import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRepository } from '../src/data/catalog.mjs'
import { createMetadataRepository } from '../src/data/metadata.mjs'
const saved = createRepository(JSON.parse(readFileSync(new URL('../public/data/catalog.json', import.meta.url))))
const liveFilm = { filmId: 4540126, nameRu: 'Дюна: Часть вторая', nameEn: 'Dune: Part Two', year: '2024', posterUrlPreview: 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/4540126.jpg', description: 'Описание, полученное из живого API.', genres: [{ genre: 'фантастика' }], countries: [{ country: 'США' }], facts: ['<a href="/">Настоящий факт</a>'] }
const response = (data, status = 200) => new Response(JSON.stringify(data), { status })
test('API is primary and search/detail can find films outside the saved set', async () => {
  assert.equal(saved.film(liveFilm.filmId), undefined)
  const paths = []
  const repo = createMetadataRepository(saved, { fetcher: async path => {
    paths.push(path)
    return path.includes('search-by-keyword') ? response({ films: [liveFilm], pagesCount: 3, searchFilmsCountResult: 41 }) : response({ data: liveFilm, rating: { rating: '8.2', ratingImdb: '8.5' } })
  } })
  const result = await repo.list({ type: 'search', keyword: 'Дюна', page: 2 })
  assert.equal(result.source, 'live'); assert.equal(result.page, 2); assert.equal(result.pages, 3); assert.equal(result.films[0].id, 4540126)
  assert.ok(paths[0].includes(encodeURIComponent('Дюна')))
  const detail = await repo.film(4540126)
  assert.equal(detail.source, 'live'); assert.equal(detail.film.ratings.imdb, '8.5'); assert.equal(detail.film.facts[0], 'Настоящий факт')
  assert.equal(detail.film.poster, '/images/posters/kp_small/4540126.jpg')
})
test('network failure uses full saved metadata and a bounded cooldown', async () => {
  let attempts = 0, clock = 1000
  const repo = createMetadataRepository(saved, { now: () => clock, fetcher: async () => { attempts++; return response({}, 503) } })
  const list = await repo.list(); assert.equal(list.source, 'saved'); assert.equal(list.films.length, 20)
  const detail = await repo.film(448); assert.equal(detail.film.id, 448); assert.ok(detail.film.description.length > 100)
  const similar = await repo.similar(448); assert.ok(similar.films.length > 0)
  await repo.list({ type: 'search', keyword: 'Матрица' }); assert.equal(attempts, 1)
  clock += 30001; await repo.list(); assert.equal(attempts, 2)
  repo.retry(); await repo.list(); assert.equal(attempts, 3)
})
test('concurrent identical queries and later revisits reuse one network response', async () => {
  let attempts = 0
  const repo = createMetadataRepository(saved, { fetcher: async () => { attempts++; await new Promise(r => setTimeout(r, 10)); return response({ films: [liveFilm], pagesCount: 1 }) } })
  await Promise.all([repo.list(), repo.list(), repo.list()]); await repo.list()
  assert.equal(attempts, 1)
})
test('a missing film does not disable working queries or redirect', async () => {
  let attempts = 0
  const repo = createMetadataRepository(saved, { fetcher: async path => { attempts++; return path.includes('/999999999?') ? response({}, 404) : path.includes('/999999998?') ? response({}, 400) : response({ data: liveFilm }) } })
  const missing = await repo.film(999999999); assert.equal(missing.film, null); assert.equal(missing.unavailable, false)
  const invalid = await repo.film(999999998); assert.equal(invalid.unavailable, false)
  const valid = await repo.film(4540126); assert.equal(valid.source, 'live'); assert.equal(attempts, 3)
})
test('live recommendations retain the API order, including unsaved films', async () => {
  const repo = createMetadataRepository(saved, { fetcher: async () => response({ items: [liveFilm, { ...liveFilm, filmId: 5458743, nameRu: 'Дюна: Часть третья' }] }) })
  const result = await repo.similar(448)
  assert.equal(result.source, 'live'); assert.deepEqual(result.films.map(f => f.id), [4540126, 5458743])
})
test('timeout aborts once and then uses saved films', async () => {
  let attempts = 0, aborted = false
  const repo = createMetadataRepository(saved, { timeout: 25, fetcher: (_path, { signal }) => {
    attempts++
    return new Promise((_resolve, reject) => signal.addEventListener('abort', () => { aborted = true; reject(new Error('timeout')) }, { once: true }))
  } })
  const result = await repo.film(448); await repo.list()
  assert.equal(aborted, true); assert.equal(result.source, 'saved'); assert.equal(attempts, 1)
})
test('malformed API data cannot replace saved real films with empty cards', async () => {
  const repo = createMetadataRepository(saved, { fetcher: async () => response({ films: [{}], pagesCount: 1 }) })
  const result = await repo.list(); assert.equal(result.source, 'saved'); assert.equal(result.films.length, 20); assert.ok(result.films.every(f => f.poster && f.nameRu))
})
