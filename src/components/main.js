import "./main.scss"

import { useEffect, useState } from "react"
import getFilm from "../scripts/getFilm.js"
import animateCSS from "../scripts/animate.js"

function Main(props) {
	const [page, changePage] = useState(1)
	let maxPages
	useEffect(async () => {
		animateCSS(".main-wrapper", "fadeInUp").then(() => {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			})
		})
		document.getElementsByClassName("notFound")[0].style.display = "none"
		maxPages = await getFilm(page, props.match.params.type, props.match.params.keyword)
	})
	useEffect(() => {
		document.querySelector(".main-wrapper").style.setProperty("--animate-duration", "0.5s")
	}, [])

	return (
		<div className="main-wrapper">
			<div className="notFound">
				<div>
					К сожалению, по данному запросу ничего не найдено :(
					<br></br>
					Если вы думаете, что это ошибка, напишите мне на{" "}
					<a href="mailto:cinema@ilyamed.site">cinema@ilyamed.site</a> или свяжитесь любым другим возможным
					способом.
				</div>
				<br></br>
				<button
					onClick={() => {
						window.location.href = window.location.hostname
					}}>
					На главную
				</button>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
			</div>
			<div className="cards"></div>

			<div className="pageListWrapper">
				<button
					onClick={() => {
						window.scrollTo(0, 0)
						page - 1 >= 1 ? changePage(page - 1) : changePage(maxPages)
						animateCSS(".main-wrapper", "fadeOutRight").then(() => {
							animateCSS(".cards", "fadeInLeft") //WHY HEADER GO BIG
						})
					}}
					className="pageListButton">
					Назад
				</button>
				<button
					onClick={() => {
						window.scrollTo({
							top: 0,
							behavior: "smooth",
						})
						changePage(1)
					}}
					className="pageListButton">
					Первая страница
				</button>
				<button
					onClick={() => {
						window.scrollTo(0, 0)
						page + 1 > maxPages ? changePage(1) : changePage(page + 1)
						animateCSS(".main-wrapper", "fadeOutLeft").then(() => {
							animateCSS(".cards", "fadeInRight")
						})
					}}
					className="pageListButton">
					Вперед
				</button>
			</div>
		</div>
	)
}

export default Main
