import './header.css';
import { useState } from 'react';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

function Header() {
    const [search,setSearch] = useState(' ');
    return(
        <div className="header-wrapper">
            <div className="header-brand"><img className="logo" alt="logo"></img> CINEMA</div>
            <div className="header-pages">
                Новинки
                ТОП-100 фильмов
                
            </div>
            <div className="search"><input type="text" className="searchBar" placeholder="Название..." onChange={()=>{let word = document.getElementsByClassName('searchBar')[0].value;  setSearch(word)}}></input>
            {//<Link to={`/search/${//search}`}>Поиск</Link>
            }
            <Link to={`/search/${search}`}>Поиск</Link>
            </div>
        </div>
    );
}

export default Header;