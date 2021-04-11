import './search.css';
import { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
  } from "react-router-dom";

function Search() {
    
    let {keyword} = useParams();
    useEffect(() => {
    let page = 1;
    let request = new Request(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=${page}`,{
        headers: new Headers({
            'accept': 'application/json',
            'X-API-KEY': 'REMOVED_EXPOSED_API_KEY'})
    });
    fetch(request)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        let wrapper = document.getElementsByClassName('cards')[0];
        wrapper.innerHTML="";
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

export default Search;