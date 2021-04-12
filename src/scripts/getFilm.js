
function getFilm(page,type,keyword) {
    let maxPages;let req;
    if (type==="top") {
        req = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=${keyword}&page=${page}`
    } else if (type==="search") {
        req = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=${page}`
    }
    let request = new Request(req,{
        headers: new Headers({
            'accept': 'application/json',
            'X-API-KEY': '37970845-fd94-4f47-877f-229c8ce46304'})
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
        maxPages=data.pagesCount;
        if (page>maxPages||page<1) page=maxPages;
        console.log(page,' ',maxPages);
        let wrapper = document.getElementsByClassName('cards')[0];
        wrapper.innerHTML="";
        console.log(data);
        for (let i=0;i<data.films.length;i++) {
            let card = document.createElement('div');
            card.className="card";
            card.innerHTML = `
            <a href="/film/${data.films[i].filmId}">
            <img src='${data.films[i].posterUrlPreview}'></img>
            <br>
            <h3>${data.films[i].nameRu}</h3>
            </a>`;
            wrapper.appendChild(card);
        }
    })
    .catch((error) => {
        maxPages = getFilm(1,type,keyword);
      }
    );
    return maxPages;
}

export default getFilm;