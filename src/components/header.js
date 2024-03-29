import "./header.scss"
import logo from "../logo.svg"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Header() {
	const [search, setSearch] = useState(" ")

	useEffect(() => {
		document.getElementsByClassName("searchBar")[0].addEventListener("keyup", function (event) {
			event.preventDefault()
			if (event.keyCode === 13) {
				document.getElementsByClassName("searchButton")[0].click()
			}
		})
	})

	return (
		<header className="header-wrapper">
			<div className="header-brand">
				<img className="logo" alt="logo" src={logo}></img>
				<Link to="/">
					<span>CINEMA</span>
				</Link>
			</div>

			{/*<div className="recommend">
        <Link className="recommendButton" to='/ilyam'>Мои любимые фильмы</Link>
        //когда-нибудь я это доделаю....
      </div>*/}
			<div className="search">
				<input
					type="text"
					className="searchBar"
					placeholder="Название..."
					onChange={() => {
						let word = encodeURIComponent(document.getElementsByClassName("searchBar")[0].value)
						setSearch(word)
					}}></input>
				<Link
					className="searchButton"
					to={`/search/${search}`}
					onClick={() => {
						document.getElementsByClassName("searchBar")[0].value = ""
						document.getElementsByClassName("cards")[0].innerHTML = ""
					}}>
					Поиск
				</Link>
			</div>
		</header>
	)
}

export default Header
