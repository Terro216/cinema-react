import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { createRepository } from '../src/data/catalog.mjs'
const data = JSON.parse(readFileSync(new URL('../public/data/catalog.json', import.meta.url)))
const repo = createRepository(data)
test('saved catalog is complete with real local assets', () => {
  assert.equal(data.top.length, 250)
  assert.equal(new Set(data.films.map(f => f.id)).size, data.films.length)
  for (const f of data.films) {
    assert.ok(f.nameRu && f.description.length > 25 && f.year)
    assert.ok(existsSync(new URL('../public' + f.poster, import.meta.url)))
    assert.ok(repo.similar(f.id).length > 0)
  }
  for (const flag of Object.values(data.flags)) assert.ok(existsSync(new URL('../public' + flag, import.meta.url)))
})
test('all 250 movies are reachable once through pagination', () => {
  const all = []
  for (let page = 1; page <= 13; page++) {
    const result = repo.list({ page })
    assert.equal(result.pages, 13)
    all.push(...result.films.map(f => f.id))
  }
  assert.deepEqual(all, data.top)
  assert.equal(repo.list({ page: -8 }).page, 1)
  assert.equal(repo.list({ page: 'oops' }).page, 1)
  assert.equal(repo.list({ page: 100000 }).page, 13)
})
test('Cyrillic, English, case, whitespace and ё search work', () => {
  assert.ok(repo.list({ type: 'search', keyword: '  ФОРРЕСТ  ' }).films.some(f => f.id === 448))
  assert.ok(repo.list({ type: 'search', keyword: 'Forrest Gump' }).films.some(f => f.id === 448))
  assert.equal(repo.list({ type: 'search', keyword: 'несуществующийфильмxyzzz' }).total, 0)
  assert.equal(repo.list({ type: 'search', keyword: '' }).total, 0)
  assert.equal(repo.list({ type: 'search', keyword: 'зеленая миля' }).total, repo.list({ type: 'search', keyword: 'зелёная миля' }).total)
})
test('every visible genre has complete details and matching results', () => {
  for (const genre of repo.genres) {
    const result = repo.list({ type: 'genre', keyword: String(genre.id) })
    assert.equal(result.total, data.films.filter(f => f.genres.includes(genre.genre)).length)
    for (const film of result.films) assert.ok(film.genres.includes(genre.genre))
  }
  assert.equal(repo.list({ type: 'genre', keyword: '99999999' }).total, 0)
})
test('unknown films, recommendations and favorites are bounded', () => {
  assert.equal(repo.film('999999999'), undefined)
  for (const film of repo.similar(448)) {
    assert.notEqual(film.id, 448)
    assert.ok(film.genres.some(genre => repo.film(448).genres.includes(genre)))
  }
  assert.equal(repo.list({ type: 'favorites' }).total, data.favorites.length)
})
