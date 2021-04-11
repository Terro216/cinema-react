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

    return(
        <div className="film-wrapper">
        <script src="//yohoho.cc/yo.js"></script>
        </div>
    );
}

export default Film;