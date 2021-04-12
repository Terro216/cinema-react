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
  Route
} from "react-router-dom";
import { queryAllByAltText } from '@testing-library/dom';

function App() {<Search />
  return (
    <div className="App">
      
    <Router>
      <Header />
      <Switch>
      <Route exact path="/" children={<Main type='top' keyword='TOP_250_BEST_FILMS'/>}>
          
      </Route>
      <Route path="/film/:id">
          <Film />
      </Route>
      <Route path="/search?type=:type&keyword=:keyword" children={({ location }) => (console.log( QueryString.parse(location)))//<Main type={query.type} />
      }> {//ДОДЕЛАТЬ НОРМАЛЬНЫЙ РОУТИНГ
      }
      </Route>
      </Switch>
      <Sidebar />
      <Footer />
    </Router>
    </div>
  );
}

export default App;
