import './main.css';
import { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function Main() {

    useEffect(() => {
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
        let wrapper = document.getElementsByClassName('cards')[0];
        console.log(data);
        for (let i=0;i<20;i++) {
            let card = document.createElement('div');
            card.className="card";
            card.innerHTML = `
            <a href="/film/${data.films[i].filmId}">
            <img src='${data.films[i].posterUrlPreview}'></img>
            <br>
            <h2>${data.films[i].nameRu}</h2>
            </a>`;
            wrapper.appendChild(card);
        }
    });
    });

    return(
        <div className="main-wrapper">
            <div className="cards"></div>
        </div>
    );
}

export default Main;