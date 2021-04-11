import './main.css';
import { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function Main() {


    const [page,changePage] = useState(1);
    let maxPages;
    useEffect(() => {
    if (page<1) changePage(1)
    else if (page>maxPages) changePage(page-1);
    let request = new Request(`https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${page}`,{
        headers: new Headers({
            'accept': 'application/json',
            'X-API-KEY': '37970845-fd94-4f47-877f-229c8ce46304'})
    });
    fetch(request)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        maxPages=data.pagesCount; //ДОДЕЛАТЬ ВЫХОД ЗА МАКСИМАЛЬНЮ СТРАНИЦУ
        let wrapper = document.getElementsByClassName('cards')[0];
        wrapper.innerHTML="";
        console.log(data);
        let pages = data.pagesCount;
        for (let i=0;i<20;i++) {
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
        /*for (let i=1;i<=pages;i++){
            let wrapper = document.getElementsByClassName('pageList')[0];
            let li = document.createElement('li');
            li.innerHTML=`
            <a href="/test">${i}</a>
            `;
            wrapper.appendChild(li);
        }*/
    });
    });

    return(
        <div className="main-wrapper">
            <div className="cards"></div>
            <div className="pageListWrapper">
                <button onClick={()=>changePage(page+1)} className="pagListButton"> Назад </button>
                <button onClick={()=>changePage(1)} className="pagListButton"> Первая страница </button>
                <button onClick={()=>changePage(page+1)}  className="pagListButton"> Вперед </button>
            </div>
        </div>
    );
}

export default Main;