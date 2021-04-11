import './App.css';
import Header from './components/header.js';
import Main from './components/main.js';
import Sidebar from './components/sidebar.js';
import Footer from './components/footer.js';
import Film from './components/film.js';
import Search from './components/search.js';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      
    <Router>
      <Header />
      <Switch>
      <Route exact path="/">
          <Main />
      </Route>
      <Route path="/film/:id">
          <Film />
      </Route>
      <Route path="/search/:keyword">
          <Search />
      </Route>
      </Switch>
      <Sidebar />
      <Footer />
    </Router>
    </div>
  );
}

export default App;
