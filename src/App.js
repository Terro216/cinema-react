import './App.css';
import Header from './components/header.js';
import Main from './components/main.js';
import Sidebar from './components/sidebar.js';
import Footer from './components/footer.js';
import Film from './components/film.js';
import Search from './components/search.js';
import * as QueryString from "query-string"

import {
  HashRouter,
  Switch,
  Route, Redirect
} from "react-router-dom";

function App() {
<Search />
  return (
    <div className="App">
      
    <HashRouter basename="/">
      <Header />
      <Switch>
      <Redirect exact from="/" to="/top/TOP_250_BEST_FILMS" component={Main} />
      
      <Route path="/film/:id">
          <Film />
      </Route>
      <Route path="/:type/:keyword" component={Main}/>
      </Switch>
      <Sidebar />
      <Footer />
    </HashRouter>
    </div>
  );
}

export default App;
