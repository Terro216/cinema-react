import './film.scss';
import { useEffect } from 'react';
import {
    useParams
  } from "react-router-dom";

function Film() {
    let {id} = useParams();
    useEffect(() => {
            let wrapper = document.getElementsByClassName('film')[0];
            wrapper.innerHTML='';
            let film = document.createElement('div');
            let script = document.createElement('script');
            script.type = "text/javascript";
            script.src = "//yohoho.cc/yo.js";
            film.className="player";
            film.innerHTML = `
            <div id="yohoho" data-kinopoisk="${id}"></div>
            `;
            //ver 2
            let film2 = document.createElement('div');
            let script2 = document.createElement('script');
            film2.className="uitools";
            film2.id='uitools';
            script2.type = "text/javascript";
            script2.src = `//pleer.uitools.space/get_player?w=610&h=370&type=watch&kp_id=${id}&players=apicollaps,videocdn,bazon,hdvb,alloha,ustore,iframe,trailer&bt_s=b_r:6;b_h:40;b_w:100;b_c:FFFFFF;b_bg:428BCA;b_f:18;&bt_n=Плеер 2&ani=COLLAPS&ati=&adi=&vni=VIDEOCDN&vti=&vdi=&hni=HDVB&hti=&hdi=&bni=BAZON&bti=&bdi=&alni=ALLOHATV&alti=&aldi=&usni=USTOREBZ&usti=&usdi=&idi=`;
            wrapper.appendChild(film);
            wrapper.appendChild(script);
            
            wrapper.appendChild(film2);
            wrapper.appendChild(script2);
    let request = new Request(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}?append_to_response=RATING`,{
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
      document.getElementsByClassName('filmScore')[0].innerHTML=`<div>КиноПоиск: ${data.rating.rating} (${data.rating.ratingVoteCount} шт.)</div><div>IMDB: ${data.rating.ratingImdb}  (${data.rating.ratingImdbVoteCount} шт.)</div> <div>Критики: ${data.rating.ratingFilmCritics} (${data.rating.ratingFilmCriticsVoteCount} шт.)</div>`;
      data=data.data;console.log(data);
          document.getElementsByClassName('bigPoster')[0].src=data.posterUrl;
          document.getElementsByClassName('filmName')[0].innerHTML=`${data.nameRu} (${data.year})<br/><br/><i class="filmQuote">&laquo;${data.slogan}&raquo;</i>`;
          document.getElementsByClassName('filmDescription')[0].innerHTML=`<h3>Про что фильм?</h3><p></p>${data.description}`;
          document.getElementsByClassName('filmOther')[0].innerHTML=`
          Произведен в: <div class="countryAdd"></div>
          Жанр: <div class="genreAdd"></div>
          `;
          for (let i=0;i<=data.countries.length;i++) {
            document.getElementsByClassName('countryAdd')[0].innerHTML+=`${data.countries[i].country}&nbsp; `;
          };
          for (let i=0;i<=data.genres.length;i++) {
            document.getElementsByClassName('genreAdd')[0].innerHTML+=`${data.genres[i].genre}&nbsp; `; //ГДЕ ЖАНРЫ ТО
          };
      })
    .catch((error) => {
        console.log(error);
      }
    );
    });

    return(

        <div className="film-wrapper">
          <div className="filmHeader">
            <img className="bigPoster"></img>
            <h1 className="filmName"></h1>
            <div className="filmScore"></div>
          </div>
          <div className="film"></div>
          <div className="filmDescription"></div>
          <p></p>
          <div className="filmOther"></div>
        </div>
    );
}

export default Film;