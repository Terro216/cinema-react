import "./main.scss"
import { useEffect, useState } from "react"
import getFilm from "../scripts/getFilm.js"

function Main(props) {
	const [page, changePage] = useState(1)
	let maxPages
	useEffect(async () => {
		maxPages = await getFilm(page, props.match.params.type, props.match.params.keyword)
	})

	return (
		<div className="main-wrapper">
			<div className="cards">
				<div className="notFound">
					К сожалению, по данному запросу ничего не найдено :( <br></br> Напишите мне на почту
				</div>
			</div>
			<div className="pageListWrapper">
				<button
					onClick={() => {
						page - 1 >= 1 ? changePage(page - 1) : changePage(maxPages)
					}}
					className="pageListButton">
					Назад
				</button>
				<button onClick={() => changePage(1)} className="pageListButton">
					Первая страница
				</button>
				<button
					onClick={() => {
						page + 1 > maxPages ? changePage(1) : changePage(page + 1)
					}}
					className="pageListButton">
					Вперед
				</button>
			</div>
		</div>
	)
}

export default Main
