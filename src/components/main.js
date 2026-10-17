import './main.scss'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useHistory, useParams } from 'react-router-dom'
import useCatalog from '../data/useCatalog.js'
import Card from './card.js'
import animateCSS from '../scripts/animate.js'
export default function Main({ favorites = false }) {
  const { type, keyword } = useParams()
  const location = useLocation(), history = useHistory(), wrapper = useRef()
  const entryAnimation = useRef(null)
  const { repository, error, retry } = useCatalog()
  const [moving, setMoving] = useState(false)
  const requested = new URLSearchParams(location.search).get('page') || 1
  const result = repository?.list({ type: favorites ? 'favorites' : type, keyword, page: requested })
  useEffect(() => {
    setMoving(false)
    window.scrollTo(0, 0)
    animateCSS(wrapper.current, entryAnimation.current || 'fadeInUp')
    entryAnimation.current = null
  }, [location.pathname, location.search, repository])
  useEffect(() => {
    if (result && Number(requested) !== result.page) history.replace({ pathname: location.pathname, search: result.page > 1 ? `?page=${result.page}` : '' })
  }, [result?.page, requested, history, location.pathname])
  async function turn(page, direction) {
    if (moving) return
    setMoving(true)
    const start = history.location.pathname + history.location.search
    await animateCSS(wrapper.current, direction === 'next' ? 'fadeOutLeft' : 'fadeOutRight')
    if (history.location.pathname + history.location.search !== start) return
    entryAnimation.current = direction === 'next' ? 'fadeInRight' : 'fadeInLeft'
    history.push({ pathname: location.pathname, search: page > 1 ? `?page=${page}` : '' })
    setMoving(false)
  }
  return <main className="main-wrapper" ref={wrapper} style={{ '--animate-duration': '.4s' }}>
    {!repository && <div className="catalog-state" role="status">{error ? <><p>Не удалось загрузить сохранённый каталог.</p><button onClick={retry}>Повторить</button></> : 'Загрузка фильмов…'}</div>}
    {repository && !result.total && <div className="notFound" style={{ display: 'block' }} role="status"><div>К сожалению, по данному запросу ничего не найдено :(</div><p>Попробуйте другое название.</p><Link className="home-link" to="/">На главную</Link></div>}
    <div className="cards">{result?.films.map(film => <Card key={film.id} film={film} />)}</div>
    {result?.total > 0 && <>
      <nav className="pageListWrapper" aria-label="Страницы каталога">
        <button disabled={moving || result.pages < 2} onClick={() => turn(result.page > 1 ? result.page - 1 : result.pages, 'previous')} className="pageListButton">Назад</button>
        <button disabled={moving || result.page === 1} onClick={() => turn(1, 'previous')} className="pageListButton">Первая страница</button>
        <button disabled={moving || result.pages < 2} onClick={() => turn(result.page < result.pages ? result.page + 1 : 1, 'next')} className="pageListButton">Вперед</button>
      </nav>
      <p className="page-counter" aria-live="polite">Страница {result.page} из {result.pages}</p>
    </>}
  </main>
}
