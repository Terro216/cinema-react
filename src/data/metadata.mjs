// Live metadata first; the versioned collection is a complete fallback.
// Both providers return the same objects, independently of React/the DOM.
const text = value => String(value || '').replace(/<[^>]*>/g, '')
  .replaceAll('&nbsp;', ' ').replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&amp;', '&')
const positive = value => Math.max(1, Math.floor(Number(value)) || 1)

export function createMetadataRepository(saved, { fetcher = globalThis.fetch, now = Date.now, timeout = 6500, cooldown = 30000 } = {}) {
  const cache = new Map(), pending = new Map()
  let unavailableUntil = 0
  async function request(path) {
    const existing = cache.get(path)
    if (existing && existing.expires > now()) return existing.value
    if (pending.has(path)) return pending.get(path)
    if (now() < unavailableUntil) throw new Error('Metadata temporarily unavailable')
    const work = (async () => {
      const abort = new AbortController()
      const timer = setTimeout(() => abort.abort(), timeout)
      try {
        const response = await fetcher(path, { signal: abort.signal })
        if (!response.ok) {
          const error = new Error('Metadata request failed')
          error.status = response.status
          throw error
        }
        const value = await response.json()
        cache.delete(path)
        cache.set(path, { value, expires: now() + 300000 })
        while (cache.size > 128) cache.delete(cache.keys().next().value)
        return value
      } catch (error) {
        if (![400, 404, 422].includes(error.status)) unavailableUntil = now() + cooldown
        throw error
      } finally { clearTimeout(timer) }
    })()
    pending.set(path, work)
    try { return await work } finally { pending.delete(path) }
  }
  function normalizeFilm(raw, ratings = {}) {
    const id = Number(raw.filmId || raw.kinopoiskId)
    const cached = saved.film(id)
    if (!Number.isSafeInteger(id) || id <= 0 || !(raw.nameRu || raw.nameEn || raw.nameOriginal)) throw new Error('Invalid film')
    const remote = raw.posterUrlPreview || raw.posterUrl
    let poster = cached?.poster
    if (!poster && remote) {
      const url = new URL(remote)
      if (url.protocol !== 'https:') throw new Error('Invalid poster')
      poster = url.hostname === 'kinopoiskapiunofficial.tech' && /^\/images\/posters\/(kp|kp_small)\/\d+\.(jpg|png)$/.test(url.pathname) ? url.pathname : url.href
    }
    return { id, nameRu: raw.nameRu || raw.nameEn || raw.nameOriginal,
      nameEn: raw.nameEn || raw.nameOriginal || '', year: raw.year || cached?.year || '',
      poster, posterBackup: cached?.poster || remote,
      description: text(raw.description) || cached?.description || '', slogan: text(raw.slogan),
      genres: (raw.genres || []).map(g => g.genre), countries: (raw.countries || []).map(c => c.country),
      facts: (raw.facts || []).map(text),
      ratings: { kinopoisk: ratings.rating ?? raw.ratingKinopoisk ?? raw.rating ?? null,
        imdb: ratings.ratingImdb ?? raw.ratingImdb ?? null,
        critics: ratings.ratingFilmCritics ?? raw.ratingFilmCritics ?? null } }
  }
  async function genres() {
    try {
      const data = await request('/api/v2.1/films/filters')
      if (!Array.isArray(data.genres)) throw new Error('Invalid genres')
      return data.genres.filter(g => g.genre).sort((a, b) => a.genre.localeCompare(b.genre, 'ru'))
    } catch { return saved.genres }
  }
  async function list({ type = 'top', keyword = 'TOP_250_BEST_FILMS', page = 1 } = {}) {
    page = Math.min(1000, positive(page))
    if (type === 'favorites') return { ...saved.list({ type, keyword, page }), source: 'saved' }
    let path
    if (type === 'top' && ['TOP_250_BEST_FILMS', 'TOP_100_POPULAR_FILMS', 'TOP_AWAIT_FILMS'].includes(keyword)) {
      path = `/api/v2.2/films/top?type=${keyword}&page=${page}`
    } else if (type === 'search' && keyword.trim()) {
      path = `/api/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(keyword.trim().slice(0, 200))}&page=${page}`
    } else if (type === 'genre' && /^\d+$/.test(keyword)) {
      path = `/api/v2.1/films/search-by-filters?genre=${keyword}&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1888&yearTo=2100&page=${page}`
    } else return { ...saved.list({ type, keyword, page }), source: 'saved' }
    try {
      const data = await request(path)
      if (!Array.isArray(data.films) || !Number.isFinite(data.pagesCount)) throw new Error('Invalid catalog')
      const films = data.films.map(f => normalizeFilm(f)), pages = Math.max(0, data.pagesCount)
      return { films, pages, page: Math.min(page, pages || 1),
        total: data.searchFilmsCountResult ?? (pages ? Math.max(films.length, (pages - 1) * 20 + 1) : 0), source: 'live' }
    } catch { return { ...saved.list({ type, keyword, page }), source: 'saved' } }
  }
  async function film(id) {
    if (!/^\d{1,10}$/.test(String(id))) return { film: null, source: 'live', unavailable: false }
    try {
      const data = await request(`/api/v2.1/films/${id}?append_to_response=RATING`)
      if (!data.data) throw new Error('Invalid film response')
      return { film: normalizeFilm(data.data, data.rating), source: 'live', unavailable: false }
    } catch (error) {
      const cached = saved.film(id) || null
      const unavailable = ![400, 404, 422].includes(error.status)
      return { film: cached, source: cached || unavailable ? 'saved' : 'live', unavailable }
    }
  }
  async function similar(id) {
    try {
      const data = await request(`/api/v2.2/films/${id}/similars`)
      if (!Array.isArray(data.items)) throw new Error('Invalid recommendations')
      return { films: data.items.map(f => normalizeFilm(f)), source: 'live' }
    } catch { return { films: saved.similar(id), source: 'saved' } }
  }
  return { list, film, similar, getGenres: genres, genres: saved.genres, flags: saved.flags,
    savedAt: saved.savedAt, count: saved.count, retry: () => { unavailableUntil = 0 } }
}
