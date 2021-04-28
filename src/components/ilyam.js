import './ilyam.scss';
import Html from '../parser/page.js'
import { useEffect, useState } from 'react';

function Ilyam() {
    const [page,changePage] = useState(1);
    let maxPages;
    useEffect(() => {
        loadFilms();
    }); 
    function loadFilms(){
        let html = document.createElement('html');
        html.innerHTML=Html;
        for (let i=1;i<html.getElementsByClassName('num').length;i++) {
            getOneFilm(html.getElementsByClassName('nameRus')[i]) //end here
        }
        
    }
    async function getOneFilm(keyword){
    let request = new Request(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=${page}`,{
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
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
        console.log(error)
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