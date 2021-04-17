import './film.scss';
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
    /*
    let req;
    if ("top") {
        req = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=keyword&page=page`
    } else if ("search") {
        req = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=keyword&page=page`
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

        }
    )
    .catch((error) => {
        console.log(error);
      }
    );*/
    });

    return(

        <div className="film-wrapper">

        </div>
    );
}

export default Film;