import './App.scss';
import Header from './components/header.js';
import Main from './components/main.js';
import Sidebar from './components/sidebar.js';
import Footer from './components/footer.js';
import Film from './components/film.js';
import Ilyam from './components/ilyam.js';
import {
  HashRouter,
  Switch,
  Route, 
  Redirect
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      
    <HashRouter basename="/">
      <Header />
      <Switch>
      <Redirect exact from="/" to="/top/TOP_250_BEST_FILMS" component={Main} />
      
      <Route path="/film/:id" component={Film}/>
      <Route path="/:type/:keyword" component={Main}/>
      <Route path="/ilyam" component={Ilyam}/>
      </Switch>
      <Sidebar />
      <Footer />
    </HashRouter>
    </div>
  );
}

export default App;
