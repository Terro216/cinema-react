import './header.scss'
import logo from '../logo.svg'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
export default function Header() {
  const [search, setSearch] = useState(''), history = useHistory()
  function submit(event) {
    event.preventDefault()
    if (!search.trim()) return
    history.push(`/search/${encodeURIComponent(search.trim())}`)
    setSearch('')
  }
  return <header className="header-wrapper">
    <div className="header-brand"><img className="logo" alt="" src={logo} /><Link to="/"><span>CINEMA</span></Link></div>
    <form className="search" onSubmit={submit} role="search">
      <input type="search" aria-label="Название фильма" className="searchBar" placeholder="Название..." value={search} onChange={event => setSearch(event.target.value)} />
      <button type="submit" className="searchButton">Поиск</button>
    </form>
  </header>
}
