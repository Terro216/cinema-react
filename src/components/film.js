import './film.scss'
import animateCSS from '../scripts/animate.js'
import Parallax from 'parallax-js'
import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useCatalog from '../data/useCatalog.js'
import useMetadata from '../data/useMetadata.js'
import Card, { posterFallback } from './card.js'
import Players from './players.js'

function FilmContent({ id }) {
  const { repository, error, retry } = useCatalog()
  const [facts, setFacts] = useState(false), [visible, setVisible] = useState(8)
  const scene = useRef(), wrapper = useRef()
  const { data: detail, retry: retryFilm } = useMetadata('film', [id])
  const film = detail?.film
  const { data: recommendations } = useMetadata(film ? 'similar' : null, [id])
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (!film) return
    animateCSS(wrapper.current, 'fadeIn')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const parallax = new Parallax(scene.current, { relativeInput: true })
    return () => parallax.destroy()
  }, [film])
  if (!repository || !detail) return <main className="film-wrapper catalog-state" role="status">{error ? <><p>Не удалось загрузить сохранённый каталог.</p><button onClick={retry}>Повторить</button></> : 'Загрузка фильма…'}</main>
  if (!film) return <main className="film-wrapper catalog-state"><h2>{detail.source === 'saved' ? 'Фильм не найден в сохранённом каталоге.' : 'Фильм не найден.'}</h2>{detail.unavailable && <><p>Не удалось получить фильм. Попробуйте позже.</p><button onClick={retryFilm}>Повторить</button><p></p></>}<Link className="home-link" to="/">На главную</Link></main>
  const similar = recommendations?.films || []
  return <main className="film-wrapper" ref={wrapper} data-metadata-source={detail.source}>
    <div className="filmHeader">
      <div className="poster-wrapper">
        <div className="poster-bg" style={{ backgroundImage: `url("${film.poster}")` }}></div>
        <div className="poster-img-wrapper" ref={scene}>
          <img data-depth={window.innerWidth > 600 ? '0.15' : '0.55'} className="poster-img" src={film.poster} alt={`Постер: ${film.nameRu}`} onError={event => posterFallback(event, film)} />
        </div>
      </div>
      <h1 className="filmName">{film.nameRu} ({film.year})<br /><br />
        <span className="flags">{film.countries.map(country => repository.flags[country]
          ? <img key={country} className="flag" src={repository.flags[country]} alt={`Флаг: ${country}`} title={country} />
          : <span key={country}>{country}</span>)}</span><br />
        {film.slogan && <i className="filmQuote">«{film.slogan}»</i>}
      </h1>
      <div className="filmGenre">{film.genres.map(genre => <div className="labelOut" key={genre}><div className="labelIn">{genre}</div></div>)}</div>
      <div className="filmScore"><div>КиноПоиск: {film.ratings.kinopoisk || 'нет оценок'}</div><div>IMDB: {film.ratings.imdb || 'нет оценок'}</div><div>Критики: {film.ratings.critics || 'нет оценок'}</div></div>
    </div>
    {detail.source === 'saved' && <p className="source-note" role="status">Показана сохранённая копия фильма.</p>}
    <Players id={id} name={film.nameRu} />
    <div className="filmDescription"><h3>Про что фильм?</h3><p></p>{film.description || 'Описание пока недоступно.'}</div>
    <p></p><p></p>
    {film.facts.length > 0 && <div className="filmFacts-wrapper">
      {!facts ? <button className="factsInfo" onClick={() => setFacts(true)}>Нажмите сюда, чтобы посмотреть интересные факты о фильме<br />P.S. возможны спойлеры</button>
        : <div className="filmFacts"><h3>Интересные факты:</h3>{film.facts.map((fact, index) => <p key={index}>{index + 1}. {fact}</p>)}</div>}
    </div>}
    {similar.length > 0 && <div className="similar-wrapper" data-metadata-source={recommendations?.source}>
      <h2 className="similar-header">Похожие фильмы:</h2>
      <div className="similar-content">{similar.slice(0, visible).map(movie => <Card key={movie.id} film={movie} similar />)}</div>
    </div>}
    <div className="controls">
      <button className="controls-more" disabled={visible >= similar.length} onClick={() => setVisible(n => n + 8)}>Ещё похожих</button>
      <Link className="controls-home" to="/">На главную</Link>
    </div>
  </main>
}
export default function Film() { const { id } = useParams(); return <FilmContent key={id} id={id} /> }
