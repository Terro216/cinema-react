import './ilyam.scss';
import { useEffect, useState } from 'react';
///import * as html from '../parser/page_1.html'; add html loader

function Ilyam(props) {
    const [page,changePage] = useState(1);
    let maxPages;let keyword;
    useEffect(() => {
        loadFilms();
    }); 
    function loadFilms(){
        console.log(html);
    }
    function getOneFilm(keyword){
    let request = new Request(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=${page}`,{
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
        let wrapper = document.getElementsByClassName('cards')[0];
            let card = document.createElement('div');
            card.className="card";
            card.innerHTML = `
            <a href="#/film/${data.films[0].filmId}">
            <img src='${data.films[0].posterUrlPreview}'></img>
            <br>
            <h3>${data.films[0].nameRu} (${data.films[0].year})</h3>
            </a>`;
            wrapper.appendChild(card);
    })
    .catch((error) => {
        console.log('error catched')
      }
    );
    
    }

    return(
        <div className="main-wrapper">
            <div className="cards"></div>
            <div className="pageListWrapper">
                <button onClick={()=>{(page-1)>=1?changePage(page-1):console.log()}} className="pageListButton"> Назад </button>
                <button onClick={()=>changePage(1)} className="pageListButton"> Первая страница </button>
                <button onClick={()=>{(page+1>maxPages)?changePage(1):changePage(page+1)}}  className="pageListButton"> Вперед </button>
            </div>
        </div>
    );
}

export default Ilyam;