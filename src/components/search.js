import './search.css';
import { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
  } from "react-router-dom";
  import getFilm from '../scripts/getFilm.js'

function Search() {
    const [page,changePage] = useState(1);
    let maxPages;
    let keyword = useParams();
    console.log(keyword.keyword);
    useEffect(() => {
    maxPages = getFilm(page,'search',keyword.keyword);
    });

    return(
        <div className="main-wrapper">
            <div className="cards"></div>
            <div className="pageListWrapper">
                <button onClick={()=>{(page-1)<1?changePage(maxPages):changePage(page-1)}} className="pageListButton"> Назад </button>
                <button onClick={()=>changePage(1)} className="pagListButton"> Первая страница </button>
                <button onClick={()=>{(page+1>maxPages)?changePage(1):changePage(page+1)}}  className="pageListButton"> Вперед </button>
            </div>
        </div>
    );

}

export default Search;