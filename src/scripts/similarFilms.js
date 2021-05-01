function similarFilms(id) {
    let request = new Request(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/similars`, {
        headers: new Headers({
            'accept': 'application/json',
            'X-API-KEY': 'REMOVED_EXPOSED_API_KEY'
        })
    });
    fetch(request)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        })
        .then((data) => {
            console.log(data)
            let wrapper = document.getElementsByClassName('anotherFilms')[0];
            wrapper.innerHTML = "";
                for (let i = 0; i < data.total; i++) {
                    let card = document.createElement('div');
                    card.className = "card";
                    card.innerHTML = `
                <a href="#/film/${data.items[i].filmId}">
                <div class="imgWrapper"><img class="noAnimation" src='${data.items[i].posterUrlPreview}'></img></div>
                <br>
                <h3>${data.items[i].nameRu}</h3>
                </a>`;
                    wrapper.appendChild(card);
                }
        })
}

export default similarFilms;