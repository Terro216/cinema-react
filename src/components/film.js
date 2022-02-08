import "./film.scss"
import animateCSS from "../scripts/animate.js"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import countriesJSON from "../scripts/countries.js"
import similarFilms from "../scripts/similarFilms.js"

function Film() {
	let { id } = useParams()
	let curNum = 0
	function updSimilar() {
		curNum = similarFilms(id, curNum)
	}
	useEffect(() => {
		//очистка всего, что остается при переходе с другого фильма:
		document.getElementsByClassName("filmGenre")[0].innerHTML = ""
		document.getElementsByClassName("filmFacts")[0].innerHTML = ""
		document.getElementsByClassName("similar-content")[0].innerHTML = ""
		document.getElementsByClassName("filmFacts")[0].style.display = "none"
		document.getElementsByClassName("factsInfo")[0].style.display = "flex"
		document.getElementsByClassName("controls-more")[0].disabled = false
		let wrapper = document.getElementsByClassName("film")[0]
		wrapper.innerHTML = ""
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
		document.querySelector(".film-wrapper").style.display = "none"

		//player 1
		let film = document.createElement("div")
		let script = document.createElement("script")
		script.type = "text/javascript"
		script.src = "//yohoho.cc/yo.js"
		film.className = "player"
		film.innerHTML = `
            <div id="yohoho" data-kinopoisk="${id}"></div>
            `
		//pleer 2
		let film2 = document.createElement("div")
		film2.className = "uitools"
		film2.id = "uitools"
		let script2 = document.createElement("script")
		script2.type = "text/javascript"
		script2.src = `//pleer.videoplayers.club/get_player?w=610&h=370&type=watch&kp_id=${id}&players=hdvb,apicollaps,videocdn,bazon,alloha,ustore,trailer,torrent&bt_s=b_r:6;b_h:40;b_w:100;b_c:FFFFFF;b_bg:428BCA;b_f:16;&bt_n=Плеер 2&ani=COLLAPS&ati=&adi=&vni=VIDEOCDN&vti=&vdi=&hni=HDVB&hti=&hdi=&bni=BAZON&bti=&bdi=&alni=ALLOHATV&alti=&aldi=&usni=USTOREBZ`
		script2.async = true

		wrapper.appendChild(film)
		wrapper.appendChild(script)

		wrapper.appendChild(film2)
		wrapper.appendChild(script2)

		let request = new Request(
			`https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}?append_to_response=RATING`,
			{
				headers: new Headers({
					accept: "application/json",
					"X-API-KEY": "37970845-fd94-4f47-877f-229c8ce46304",
				}),
			}
		)
		fetch(request)
			.then((response) => {
				if (response.ok) {
					return response.json()
				} else {
					throw new Error("Something went wrong")
				}
			})
			.then((data) => {
				let kprating = data.rating.rating || "нет оценок"
				let imdbrating = data.rating.ratingImdb || "нет оценок"
				let criticsrating =
					(data.rating.ratingFilmCriticsVoteCount === 0 ? "нет оценок" : data.rating.ratingFilmCritics) ||
					"нет оценок"
				document.getElementsByClassName(
					"filmScore"
				)[0].innerHTML = `<div>КиноПоиск: ${kprating}</div><div>IMDB: ${imdbrating}</div> <div>Критики: ${criticsrating}</div>`
				data = data.data
				document.getElementsByClassName("poster-img")[0].src = data.posterUrl
				document.getElementsByClassName("poster-bg")[0].style.backgroundImage = `url("${data.posterUrl}")`
				if (data.slogan !== null) {
					document.getElementsByClassName(
						"filmName"
					)[0].innerHTML = `${data.nameRu} (${data.year})<br/><br/><div class="flags"></div><br/><i class="filmQuote">&laquo;${data.slogan}&raquo;</i>`
				} else {
					document.getElementsByClassName(
						"filmName"
					)[0].innerHTML = `${data.nameRu} (${data.year}) <div class="flags"></div><br/>`
				}

				if (data.description !== null) {
					document.getElementsByClassName(
						"filmDescription"
					)[0].innerHTML = `<h3>Про что фильм?</h3><p></p>${data.description}`
				} else {
					document.getElementsByClassName(
						"filmDescription"
					)[0].innerHTML = `<h3>Про что фильм?</h3><p></p>Кто знает....`
				}

				for (let i = 0; i < data.countries.length; i++) {
					let country_code
					let kpCountry = data.countries[i].country
					if (kpCountry === "США") {
						kpCountry = "Соединённые Штаты Америки"
					}
					if (kpCountry === "СССР") {
						kpCountry = "Россия"
					}
					for (let c = 0; c < countriesJSON.length; c++) {
						/*console.log(kpCountry,countriesJSON[c].translations.rus.official)*/
						if (
							kpCountry === countriesJSON[c].translations.rus.official ||
							kpCountry === countriesJSON[c].translations.rus.common
						) {
							country_code = countriesJSON[c].cca2.toLowerCase()
							break
						}
					}
					document.getElementsByClassName(
						"flags"
					)[0].innerHTML += `<img class="flag" alt="флаг ${kpCountry}" title="${kpCountry}" src="https://raw.githubusercontent.com/lipis/flag-icon-css/master/flags/4x3/${country_code}.svg"/>&nbsp;`
				}

				for (let i = 0; i < data.genres.length; i++) {
					document.getElementsByClassName(
						"filmGenre"
					)[0].innerHTML += `<div class="labelOut"><div class="labelIn">${data.genres[i].genre}</div></div> `
				}
				if (data.facts.length !== 0) {
					for (let i = 0; i < data.facts.length; i++) {
						document.getElementsByClassName("filmFacts")[0].innerHTML += `${i + 1}. ${data.facts[i]}<p></p>`
					}
				} else {
					document.getElementsByClassName("filmFacts-wrapper")[0].style.display = "none"
				}

				updSimilar()
				//document.querySelector(".film-wrapper").style.setProperty("--animate-duration", "0.8s")
				document.querySelector(".film-wrapper").style.display = "block"
				animateCSS(".film-wrapper", "fadeIn")
			})
			.catch((error) => {
				console.log(error)
				window.location.href = window.location.hostname //если зайти в несуществующий фильм - выход на главную
			})
	})

	return (
		<div className="film-wrapper">
			<div className="filmHeader">
				<div className="poster-wrapper">
					<div className="poster-bg"></div>
					<img className="poster-img" alt="big poster"></img>
				</div>
				<h1 className="filmName"> </h1>
				<div className="filmGenre"></div>
				<div className="filmScore"></div>
			</div>
			<div className="film"></div>
			<div className="filmDescription"></div>
			<p></p>
			<p></p>
			<div
				className="filmFacts-wrapper"
				onClick={() => {
					document.getElementsByClassName("filmFacts")[0].style.display = "block"
					document.getElementsByClassName("factsInfo")[0].style.display = "none"
				}}>
				<div className="factsInfo">
					Нажмите сюда, что бы посмотреть интересные факты о фильме<br></br>P.S. возможны спойлеры
				</div>
				<div className="filmFacts">
					<h3>Интересные факты: </h3>
				</div>
			</div>
			<div className="similar-wrapper">
				<h2 className="similar-header">Похожие фильмы:</h2>
				<div className="similar-content"></div>
			</div>
			<div className="controls">
				<button className="controls-more" onClick={updSimilar}>
					Ещё похожих
				</button>
				<button
					className="controls-home"
					onClick={() => {
						window.location.href = window.location.origin
					}}>
					На главную
				</button>
			</div>
		</div>
	)
}

export default Film
