import './App.scss'
import 'animate.css'
import Header from './components/header.js'
import HeaderMob from './components/headerMob.js'
import Main from './components/main.js'
import Sidebar from './components/sidebar.js'
import Footer from './components/footer.js'
import Film from './components/film.js'
import Ilyam from './components/ilyam.js'
import Copy from './components/copy.js'
import Error404 from './components/error404.js'
import './restoration.scss'
import { CatalogProvider } from './data/useCatalog.js'
import { useState, useEffect } from 'react'
import { HashRouter, Switch, Route, Redirect, useLocation } from 'react-router-dom'
import animateCSS from './scripts/animate.js'
function Shell() {
  const [mobile, setMobile] = useState(window.matchMedia('(max-width: 550px)').matches)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useEffect(() => {
    const query = window.matchMedia('(max-width: 550px)')
    const resize = () => { setMobile(query.matches); setOpen(false) }
    query.addEventListener('change', resize)
    return () => query.removeEventListener('change', resize)
  }, [])
  useEffect(() => { setOpen(false) }, [location.pathname, location.search])
  useEffect(() => { if (open) { window.scrollTo(0, 0); animateCSS('.sidebar-wrapper', 'slideInDown') } }, [open])
  return <div className={`App${open ? ' menu-open' : ''}`}>
    {mobile ? <HeaderMob open={open} toggle={() => setOpen(value => !value)} close={() => setOpen(false)} /> : <Header />}
    <Switch>
      <Redirect exact from="/" to="/top/TOP_250_BEST_FILMS" />
      <Route exact path="/film/:id" component={Film} />
      <Route exact path="/ilyam" component={Ilyam} />
      <Route exact path="/copyright" component={Copy} />
      <Route exact path="/:type(top|search|genre)/:keyword" component={Main} />
      <Route component={Error404} />
    </Switch>
    <Sidebar open={open} close={() => setOpen(false)} />
    <Footer />
  </div>
}
export default function App() { return <CatalogProvider><HashRouter><Shell /></HashRouter></CatalogProvider> }
