import "./error404.scss"

function Error404() {
	return (
		<div className="error404-wrapper">
			<h2 className="error404-header">Страница не найдена :( </h2>
			<p></p>
			<a
				className="error404-button"
				type="button"
				href="https://terro216.github.io/cinema-react/"
				rel="noreferrer">
				На главную
			</a>
		</div>
	)
}

export default Error404
