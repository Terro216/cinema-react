// Pure metadata repository; independent of rendering and the old API schema.
export const PAGE_SIZE = 20
export const normalize = value => String(value).normalize('NFKC').toLocaleLowerCase('ru').replaceAll('ё', 'е').trim()
export function createRepository(data) {
  if (data.schema !== 1 || !Array.isArray(data.films) || !data.films.length) throw new Error('Invalid catalog')
  const films = new Map(data.films.map(film => [String(film.id), film]))
  const genres = data.genres
  function list({ type = 'top', keyword = 'TOP_250_BEST_FILMS', page = 1 } = {}) {
    let found
    if (type === 'top') found = data.top.map(id => films.get(String(id))).filter(Boolean)
    else if (type === 'favorites') found = data.favorites.map(id => films.get(String(id))).filter(Boolean)
    else if (type === 'genre') {
      const genre = data.genres.find(g => String(g.id) === String(keyword))
      found = genre ? data.films.filter(f => f.genres.includes(genre.genre)) : []
    } else if (type === 'search') {
      const term = normalize(keyword)
      found = term ? data.films.filter(f => normalize(f.nameRu + ' ' + f.nameEn).includes(term)) : []
    } else found = []
    const pages = Math.ceil(found.length / PAGE_SIZE)
    const current = Math.min(Math.max(1, Math.floor(Number(page)) || 1), pages || 1)
    return { films: found.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE), page: current, pages, total: found.length }
  }
  function similar(id) {
    const film = films.get(String(id))
    if (!film) return []
    return data.films.filter(f => f.id !== film.id)
      .map(f => ({ film: f, score: f.genres.filter(g => film.genres.includes(g)).length }))
      .filter(f => f.score > 0).sort((a, b) => b.score - a.score || Number(b.film.ratings.kinopoisk || 0) - Number(a.film.ratings.kinopoisk || 0))
      .map(f => f.film)
  }
  return { list, similar, film: id => films.get(String(id)), genres, flags: data.flags || {}, savedAt: data.savedAt, count: films.size }
}
let pending
export function loadCatalog({ retry = false } = {}) {
  if (retry) pending = undefined
  if (!pending) pending = fetch('/data/catalog.json').then(response => {
    if (!response.ok) throw new Error('Catalog unavailable')
    return response.json()
  }).then(createRepository)
  return pending
}
