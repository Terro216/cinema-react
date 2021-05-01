import './headerMob.scss';
import logo from "../logo.svg"
import Sidebar from './sidebar.js'
import hamburger from '../hamburger.svg'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function HeaderMob() {
    const [search, setSearch] = useState(" ")
    let hamburgerState = 1;

    function toggleHamburger() {
        if (hamburgerState===0) {
            document.getElementsByClassName('hamburger-links')[0].style.display='none';
            document.getElementsByClassName('sidebar-wrapper')[0].style.display='none';
            hamburgerState=1;
        } else {
            document.getElementsByClassName('hamburger-links')[0].style.display='flex';
            document.getElementsByClassName('sidebar-wrapper')[0].style.display='block';
            hamburgerState=0;
        }
        console.log(hamburgerState);
    }

    return(
        <div className='headerMob-wrapper'>
        
        <div className='headerMob'>
            <div className="header-brand">
                <img className="logo" alt="logo" src={logo}></img>
                <Link to="/">
                <span>CINEMA</span>
                </Link>
            </div>
            <div className="hamburger-links">
                <div className="search">
                    <input
                    type="text"
                    className="searchBar"
                    placeholder="Название..."
                    onChange={() => {
                        let word = encodeURIComponent(
                        document.getElementsByClassName("searchBar")[0].value
                        )
                        setSearch(word)
                    }}></input>
                    <Link
                    className="searchButton"
                    to={`/search/${search}`}
                    onClick={() => {
                        document.getElementsByClassName("searchBar")[0].value = ""
                    }}>
                    Поиск
                    </Link>
                </div>
                {//<Sidebar className="sidebar"/>
}
            </div>
            <button className="hamburgerButton" onClick={()=>{toggleHamburger()}}><img className="logo" alt="menu icon" src={hamburger}></img></button>
        </div>
        
        </div>
    );
}

export default HeaderMob;