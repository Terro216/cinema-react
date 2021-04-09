import './film.css';
import { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
  } from "react-router-dom";

function Film() {

    let {id} = useParams();
    useEffect(() => {
    let wrapper = document.getElementsByClassName('film-wrapper')[0];
    wrapper.innerHTML='';
    let request = new Request('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1',{
        headers: new Headers({
            'accept': 'application/json',
            'X-API-KEY': '37970845-fd94-4f47-877f-229c8ce46304'})
    });
    fetch(request)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        console.log(id);
            let film = document.createElement('div');
            let script = document.createElement('script');
            script.type = "text/javascript";
            script.src = "//yohoho.cc/yo.js";
            film.className="player";
            film.innerHTML = `
            <div id="yohoho" data-kinopoisk="${id}"></div>
            `;
            wrapper.appendChild(film);
            wrapper.appendChild(script);
    });

    });

    return(
        <div className="film-wrapper">
        <script src="//yohoho.cc/yo.js"></script>
        </div>
    );
}

export default Film;