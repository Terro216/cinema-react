import './headerMob.scss';
import logo from "../logo.svg"
import hamburger from '../hamburger.svg'
import { useState } from "react"
import { Link } from "react-router-dom"

function HeaderMob(props) {
    const [mobSearch, setMobSearch] = useState(" ");

    return (
        <div className='headerMob-wrapper'>

            <div className='headerMob'>
                <div className="header-brand">
                    <img className="logo" alt="logo" src={logo}></img>
                    <Link to="/" onClick={() => {
                        document.getElementsByClassName("mobSearchBar")[0].value = ''
                    }}>
                        <span>CINEMA</span>
                    </Link>
                </div>
                
                <button className="hamburgerButton" onClick={() => { props.tog() }}><img className="logo" alt="menu icon" src={hamburger}></img></button>
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
                                );
                                setMobSearch(word)
                            }}></input>
                        <Link
                            className="mobSearchButton"
                            to={`/search/${mobSearch}`}
                            onClick={() => {
                                props.tog()
                            }}>
                            Поиск
                        </Link>
                    </div>
                </div>
        </div>
    );
}

export default HeaderMob;