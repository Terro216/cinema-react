import "./sidebar.scss"
import { useEffect } from "react"

function Sidebar(props) {
	useEffect(() => {
		if (document.getElementsByClassName("genre").length === 0) {
			let request = new Request("https://kinopoiskapiunofficial.tech/api/v2.1/films/filters", {
				headers: new Headers({
					accept: "application/json",
					"X-API-KEY": "37970845-fd94-4f47-877f-229c8ce46304",
				}),
			})

			function up(e) {
				return e.charAt(0).toUpperCase() + e.slice(1)
			}

			fetch(request)
				.then((response) => {
					if (response.ok) {
						return response.json()
					} else {
						throw new Error("Something went wrong")
					}
				})
				.then((data) => {
					console.log(data)
					let wrapper = document.getElementsByClassName("sidebar-wrapper")[0]
					let header = document.createElement("div")
					header.className = "sidebar-header"
					header.innerHTML = "<h3>ЖАНРЫ</h3>"
					wrapper.appendChild(header)
					for (let i = 0; i < data.genres.length; i++) {
						break // ТУТ НАДО ДОДЕЛАТЬ ПОКАЗ ЖАНРОВ
						let genre = document.createElement("div")
						genre.className = "genre"
						genre.innerHTML = `
            <a class="genre-card" href="#/genre/${data.genres[i].id}">
            <h3>${up(data.genres[i].genre)}</h3>
            </a>`
						wrapper.appendChild(genre)
					}
				})
				.catch((error) => {
					console.log(error)
				})
		}
	})
	return (
		<aside className="sidebar-wrapper" onClick={props.tog}>
			<div className="genres">.</div>
		</aside>
	)
}

export default Sidebar
