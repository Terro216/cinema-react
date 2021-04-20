import './header.scss';
import logo from '../logo.svg';
import { useState } from 'react';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

function Header() {
    const [search,setSearch] = useState(' ');
    return(
        <div className="header-wrapper">
            <div className="header-brand"><img className="logo" alt="logo" src={logo}></img><Link to="/"><span>CINEMA</span></Link></div>
            <div className="search">
            <input type="text" className="searchBar" placeholder="Название..." onChange={()=>{let word = encodeURIComponent(document.getElementsByClassName('searchBar')[0].value);  setSearch(word)}}></input>
            <Link className="searchButton" to={`/search/${search}`} onClick={()=>{document.getElementsByClassName('searchBar')[0].value=''}}>Поиск</Link>
            </div>
        </div>
    );
}

export default Header;