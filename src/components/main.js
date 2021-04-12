import './main.css';
import { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import getFilm from '../scripts/getFilm.js'

function Main(props) {
    const [page,changePage] = useState(1);
    let maxPages;console.log(props.type,props.keyword);
    useEffect(() => {
    maxPages = getFilm(page,props.type,props.keyword);
    });

    return(
        <div className="main-wrapper">
            <div className="cards"></div>
            <div className="pageListWrapper">
                <button onClick={()=>{(page-1)>=1?changePage(page-1):console.log()}} className="pageListButton"> Назад </button>
                <button onClick={()=>changePage(1)} className="pagListButton"> Первая страница </button>
                <button onClick={()=>{(page+1>maxPages)?changePage(1):changePage(page+1)}}  className="pageListButton"> Вперед </button>
            </div>
        </div>
    );
}

export default Main;