import './sidebar.scss'
import { Link } from 'react-router-dom'
import useCatalog from '../data/useCatalog.js'
export default function Sidebar({ open, close }) {
  const { repository } = useCatalog()
  return <aside id="genre-menu" className={`sidebar-wrapper${open ? ' is-open' : ''}`}>
    <div className="genres"></div>
    <div className="sidebar-header"><h3>ЖАНРЫ</h3></div>
    {repository?.genres.map(genre => <div className="genre" key={genre.id}>
      <Link className="genre-card" to={`/genre/${genre.id}`} onClick={close}><h3>{genre.genre.charAt(0).toUpperCase() + genre.genre.slice(1)}</h3></Link>
    </div>)}
  </aside>
}
