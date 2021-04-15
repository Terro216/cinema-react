import './App.css';
import Header from './components/header.js';
import Main from './components/main.js';
import Sidebar from './components/sidebar.js';
import Footer from './components/footer.js';
import Film from './components/film.js';
import Search from './components/search.js';
import * as QueryString from "query-string"

import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect,
  useLocation
} from "react-router-dom";

function App() {
<Search />
  return (
    <div className="App">
      
    <Router>
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
    </Router>
    </div>
  );
}

export default App;
