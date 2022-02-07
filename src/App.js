import "./App.scss"
import "animate.css"
import Header from "./components/header.js"
import HeaderMob from "./components/headerMob.js"
import Main from "./components/main.js"
import Sidebar from "./components/sidebar.js"
import Footer from "./components/footer.js"
import Film from "./components/film.js"
import Ilyam from "./components/ilyam.js"
import Copy from "./components/copy.js"
import Error404 from "./components/error404.js"
import React, { useState } from "react"
import { HashRouter, Switch, Route, Redirect } from "react-router-dom"

function App() {
	let width = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth
	const [hamburgerState, toggleHamburger] = useState(0)
	function toggleH() {
		if (hamburgerState === 1) {
			document.getElementsByClassName("hamburger-links")[0].style.display = "none"
			document.getElementsByClassName("sidebar-wrapper")[0].style.display = "none"
			document.getElementsByClassName("mobSearchBar")[0].value = ""
			toggleHamburger(0)
		} else {
			document.getElementsByClassName("hamburger-links")[0].style.display = "flex"
			document.getElementsByClassName("sidebar-wrapper")[0].style.display = "block"
			document.getElementsByClassName("mobSearchBar")[0].value = ""
			window.scrollTo(0, 0)
			toggleHamburger(1)
		}
	}
	/*window.onresize = () => {
		let newWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
		if (newWidth !== width || newWidth !== height) {
			width = newWidth
			height = newHeight
			window.location.reload()
		}
	}*/
	if (width > 550) {
		//full version
		return (
			<div className="App">
				<HashRouter basename="/">
					<Header />
					<Switch>
						<Redirect exact from="/" to="/top/TOP_250_BEST_FILMS" component={Main} />
						<Route path="/film/:id" component={Film} />
						<Route path="/:type/:keyword" component={Main} />
						<Route path="/ilyam" component={Ilyam} />
						<Route path="/copyright" component={Copy} />
						<Route path="*" component={Error404} />
					</Switch>
					<Sidebar />
					<Footer />
				</HashRouter>
			</div>
		)
	} else {
		//mobile version
		return (
			<div className="App">
				<HashRouter basename="/">
					<HeaderMob tog={toggleH} />
					<Switch>
						<Redirect exact from="/" to="/top/TOP_250_BEST_FILMS" component={Main} />
						<Route path="/film/:id" component={Film} />
						<Route path="/:type/:keyword" component={Main} />
						<Route path="/ilyam" component={Ilyam} />
						<Route path="/copyright" component={Copy} />
						<Route path="*" component={Error404} />
					</Switch>
					<Sidebar tog={toggleH} />
					<Footer />
				</HashRouter>
			</div>
		)
	}
}

export default App
