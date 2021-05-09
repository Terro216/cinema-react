import './headerMob.scss';
import logo from "../logo.svg"
//import Sidebar from './sidebar.js'
import hamburger from '../hamburger.svg'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function HeaderMob() {
    const [mobSearch, setMobSearch] = useState(" ")
    let hamburgerState = 1;

    function toggleHamburger() {
        if (hamburgerState===0) {
            document.getElementsByClassName('hamburger-links')[0].style.display='none';
            document.getElementsByClassName('sidebar-wrapper')[0].style.display='none';
            //document.getElementsByClassName('card')[0].style.width='90%';
            hamburgerState=1;
        } else {
            document.getElementsByClassName('hamburger-links')[0].style.display='flex';
            document.getElementsByClassName('sidebar-wrapper')[0].style.display='block';
            //document.getElementsByClassName('card')[0].style.width='calc(100%/3)'; do 1 card
            hamburgerState=0;
        }
    }

    return(
        <div className='headerMob-wrapper'>
        
        <div className='headerMob'>
            <div className="header-brand">
                <img className="logo" alt="logo" src={logo}></img>
                <Link to="/" onClick={() => {
                        document.getElementsByClassName("mobSearchBar")[0].value=''
                    }}>
                <span>CINEMA</span>
                </Link>
            </div>
            <div className="hamburger-links">
                <div className="mobSearch">
                    <input
                    type="text"
                    className="mobSearchBar"
                    placeholder="Название..."
                    onChange={() => {
                        let word = encodeURIComponent(
                        document.getElementsByClassName("mobSearchBar")[0].value
                        )
                        setMobSearch(word)
                    }}></input>
                    <Link
                    className="mobSearchButton"
                    to={`/search/${mobSearch}`}
                    onClick={() => {
                        document.getElementsByClassName("mobSearchBar")[0].value = ""
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