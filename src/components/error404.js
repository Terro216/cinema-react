import "./error404.scss"

function Error404() {
	return (
		<div className="error404-wrapper">
			<h2 className="error404-header">Страница не найдена :( </h2>
			<p></p>
			<input className="error404-button" type="button" onclick="history.back();" value="Вернуться назад" />
		</div>
	)
}

export default Error404
