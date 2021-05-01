import './ilyam.scss';
import Html from '../parser/page.js'
import { useEffect//, useState 
} from 'react';

function Ilyam() {
    //const [page,changePage] = useState(1);
    //let maxPages = 1;
    //let filmCounter = 1; 
    let html = document.createElement('html');
    html.innerHTML=Html;
    let length = html.getElementsByClassName('num').length;
    //let filmsPerPage = 7; while ((Number.isInteger(length/filmsPerPage))!==true) {filmsPerPage+=1}; maxPages = (length/filmsPerPage);
    useEffect(() => {
        loadFilms();
    }); 
    function loadFilms(){
        for (let i=1;i<length;i++) {
            let regex = /\d+/gm;
            let id = html.getElementsByClassName('nameRus')[i].getElementsByTagName('a')[0].getAttribute("href");
            id = regex.exec(id)[0];
            getOneFilm(id);
        }
        /*console.log(filmCounter<(filmsPerPage*page),' ',filmCounter,' ',filmsPerPage,' ',page)
            for (let i=filmCounter;i<=(filmsPerPage*page);i++) {
                let regex = /\d+/gm;
                let id = html.getElementsByClassName('nameRus')[i].getElementsByTagName('a')[0].getAttribute("href");
                id = regex.exec(id)[0];
                getOneFilm(id)
            }
            filmCounter+=(filmsPerPage*page)-1; */
    }
    function getOneFilm(id){
    //let request = new Request(`https://icy-river-97ee.ilyamed.workers.dev/?https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}`,{
        let request = new Request(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}`,{
        headers: new Headers({
            'accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
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
        data=data.data;
        let wrapper = document.getElementsByClassName('cards')[0];
            let card = document.createElement('div');
            card.className="card";
            card.innerHTML = `
            <a href="#/film/${data.filmId}">
            <img src='${data.posterUrlPreview}'></img>
            <br>
            <h3>${data.nameRu} (${data.year})</h3>
            </a>`;
            console.log(card);
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
            {/*<div className="pageListWrapper">
                <button onClick={()=>{(page-1)>=1?changePage(page-1):console.log()}} className="pageListButton"> Назад </button>
                <button onClick={()=>changePage(1)} className="pageListButton"> Первая страница </button>
                <button onClick={()=>{(page+1>maxPages)?changePage(1):changePage(page+1)}}  className="pageListButton"> Вперед </button>
             </div>*/}
        </div>
    );
}

export default Ilyam;