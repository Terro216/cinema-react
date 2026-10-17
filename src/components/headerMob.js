import './headerMob.scss'
import logo from '../logo.svg'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
export default function HeaderMob({ open, toggle, close }) {
  const [search, setSearch] = useState(''), history = useHistory()
  function submit(event) {
    event.preventDefault()
    if (!search.trim()) return
    history.push(`/search/${encodeURIComponent(search.trim())}`)
    setSearch(''); close()
  }
  return <header className="headerMob-wrapper">
    <div className="headerMob">
      <div className="header-brand"><img className="logo" alt="" src={logo} /><Link to="/" onClick={close}><span>CINEMA</span></Link></div>
      <button type="button" aria-label="Поиск и жанры" aria-expanded={open} aria-controls="genre-menu" className={`hamburger-icon${open ? ' open' : ''}`} onClick={toggle}><span></span><span></span><span></span><span></span></button>
    </div>
    <div className={`hamburger-links${open ? ' is-open' : ''}`}>
      <form className="mobSearch" role="search" onSubmit={submit}>
        <input type="search" aria-label="Название фильма" className="mobSearchBar" placeholder="Название..." value={search} onChange={event => setSearch(event.target.value)} />
        <button type="submit" className="mobSearchButton">Поиск</button>
      </form>
    </div>
  </header>
}
