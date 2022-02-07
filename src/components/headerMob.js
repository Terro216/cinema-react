import "./headerMob.scss"
import animateCSS from "../scripts/animate.js"
import logo from "../logo.svg"
import { useState } from "react"
import { Link } from "react-router-dom"

function HeaderMob(props) {
	const [mobSearch, setMobSearch] = useState(" ")

	return (
		<div className="headerMob-wrapper">
			<div className="headerMob">
				<div className="header-brand">
					<img className="logo" alt="logo" src={logo}></img>
					<Link
						to="/"
						onClick={() => {
							document.getElementsByClassName("mobSearchBar")[0].value = ""
						}}>
						<span>CINEMA</span>
					</Link>
				</div>
				<div
					className="hamburger-icon"
					onClick={(e) => {
						props.tog()
						document.getElementsByClassName("hamburger-icon")[0].classList.toggle("open")
						animateCSS(".sidebar-wrapper", "slideInDown")
					}}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
			<div className="hamburger-links">
				<div className="mobSearch">
					<input
						type="text"
						className="mobSearchBar"
						placeholder="Название..."
						onChange={() => {
							let word = encodeURIComponent(document.getElementsByClassName("mobSearchBar")[0].value)
							setMobSearch(word)
						}}></input>
					<Link
						className="mobSearchButton"
						to={`/search/${mobSearch}`}
						onClick={() => {
							props.tog()
							document.getElementsByClassName("hamburger-icon")[0].classList.toggle("open")
							document.getElementsByClassName("cards")[0].innerHTML = ""
						}}>
						Поиск
					</Link>
				</div>
			</div>
		</div>
	)
}

export default HeaderMob
