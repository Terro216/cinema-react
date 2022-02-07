async function getFilm(page, type, keyword) {
	let req
	if (type === "top") {
		req = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=${keyword}&page=${page}`
	} else if (type === "search") {
		req = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=${page}`
	} else if (type === "genre") {
		req = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-filters?genre=${keyword}&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1888&yearTo=2020&page=${page}`
	}
	let request = new Request(req, {
		headers: new Headers({
			accept: "application/json",
			"X-API-KEY": "37970845-fd94-4f47-877f-229c8ce46304",
		}),
	})
	let maxPages = await fetch(request)
		.then((response) => {
			if (response.ok) {
				return response.json()
			} else {
				throw new Error("Something went wrong")
			}
		})
		.then((data) => {
			console.log(data)
			if (type === "search" && data.pagesCount <= 0) {
				document.getElementsByClassName("notFound")[0].style.display = "block"
				document.getElementsByClassName("pageListWrapper")[0].style.display = "none"
				document.getElementsByClassName("cards")[0].innerHTML = ""
				return 0
			}
			let wrapper = document.getElementsByClassName("cards")[0]
			wrapper.innerHTML = ""
			for (let i = 0; i < data.films.length; i++) {
				let card = document.createElement("div")
				card.className = "card"
				//console.log(data.films[i])
				card.innerHTML = `
            <a href="#/film/${data.films[i].filmId}">
            <div class="imgWrapper"><img alt="${data.films[i].nameRu}" src='${data.films[i].posterUrlPreview}'></img></div>
            <h3 class="fn">${data.films[i].nameRu} (${data.films[i].year})</h3>
            </a>`
				wrapper.appendChild(card)
				let h = parseFloat(
					getComputedStyle(document.getElementsByClassName("fn")[i], null).height.replace("px", "")
				)
				if (h > 100) {
					document.getElementsByClassName("card")[i].style.marginBottom = h - 100 + "px"
				}
			}
			return data.pagesCount
		})
		.catch((error) => {
			console.log(error)
			return getFilm(1, type, keyword)
		})
	return maxPages
}

export default getFilm
