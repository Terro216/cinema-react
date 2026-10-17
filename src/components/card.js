import { Link } from 'react-router-dom'
export default function Card({ film, similar = false }) {
  return <div className="card">
    <Link to={`/film/${film.id}`}>
      <div className="imgWrapper"><img alt={film.nameRu} src={film.poster} loading="lazy" width="300" height="450" /></div>
      {similar && <br />}
      <h3 className="fn">{film.nameRu}{!similar && ` (${film.year})`}</h3>
    </Link>
  </div>
}
