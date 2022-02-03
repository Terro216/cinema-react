function similarFilms(id) {
	let hasSimilar = true
	let request = new Request(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/similars`, {
		headers: new Headers({
			accept: "application/json",
			"X-API-KEY": "37970845-fd94-4f47-877f-229c8ce46304",
		}),
	})
	fetch(request)
		.then((response) => {
			if (response.ok) {
				return response.json()
			} else {
				hasSimilar = false
				throw new Error("Something went wrong")
			}
		})
		.then((data) => {
			//console.log(data)
			if (data.total === 0) {
				hasSimilar = false
				document.getElementsByClassName("similar-wrapper")[0].style.display = "none"
			} else {
				let wrapper = document.getElementsByClassName("similar-content")[0]
				wrapper.innerHTML = ""
				for (let i = 0; i < data.total; i++) {
					let card = document.createElement("div")
					card.className = "card"
					card.innerHTML = `
                <a href="#/film/${data.items[i].filmId}">
                <div class="imgWrapper"><img src='${data.items[i].posterUrlPreview}'></img></div>
                <br>
                <h3 class='fn'>${data.items[i].nameRu}</h3>
                </a>`
					wrapper.appendChild(card)
					let h = parseFloat(
						getComputedStyle(document.getElementsByClassName("fn")[i], null).height.replace("px", "")
					)
					document.getElementsByClassName("card")[i].style.paddingBottom = h + "px"
				}
			}
		})
	return hasSimilar
}

export default similarFilms
