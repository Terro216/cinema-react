import './App.scss';
import Header from './components/header.js';
import HeaderMob from './components/headerMob.js';
import Main from './components/main.js';
import Sidebar from './components/sidebar.js';
import Footer from './components/footer.js';
import Film from './components/film.js';
import FilmMob from './components/filmMob.js'
import Ilyam from './components/ilyam.js';
import React from 'react';
import {
  HashRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  window.onresize = () => {
    let newWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (newWidth !== width) {
      width = newWidth
      window.location.reload();
    }
  };
  if (width > 550) {
    return (
      <div className="App">
        <HashRouter basename="/">
          <Header />
          <Switch>
            <Redirect exact from="/" to="/top/TOP_250_BEST_FILMS" component={Main} />
            <Route path="/film/:id" component={Film} />
            <Route path="/:type/:keyword" component={Main} />
            <Route path="/ilyam" component={Ilyam} />
          </Switch>
          <Sidebar />
          <Footer />
        </HashRouter>
      </div>
    );
  } else {
    return (
      <div className="App">
        <HashRouter basename="/">
          <HeaderMob />
          <Switch>
            <Redirect exact from="/" to="/top/TOP_250_BEST_FILMS" component={Main} />
            <Route path="/film/:id" component={FilmMob} />
            <Route path="/:type/:keyword" component={Main} />
            <Route path="/ilyam" component={Ilyam} />
          </Switch>
          <Sidebar />
          <Footer />
        </HashRouter>
      </div>
    );
  }

}

export default App;
