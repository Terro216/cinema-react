import './film.scss';
import { useEffect } from 'react';
import {
    useParams
  } from "react-router-dom";

function Film() {
  function getXMLDocument(url)  
  {  
      let xml;  
      if(window.XMLHttpRequest)  
      {  
          xml=new window.XMLHttpRequest();  
          xml.open("GET", url, false);  
          xml.send("");  
          return xml.responseXML;  
      }  
  }  
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
      data=data.data;
          document.getElementsByClassName('bigPoster')[0].src=data.posterUrl;
          if (data.slogan!==null) {document.getElementsByClassName('filmName')[0].innerHTML=`${data.nameRu} (${data.year})<br/><br/><i class="filmQuote">&laquo;${data.slogan}&raquo;</i>`;} 
          else {document.getElementsByClassName('filmName')[0].innerHTML=`${data.nameRu} (${data.year}) <div className="flags"></div><br/>`;}
          if (data.description!==null) {document.getElementsByClassName('filmDescription')[0].innerHTML=`<h3>Про что фильм?</h3><p></p>${data.description}`;}
          else {document.getElementsByClassName('filmDescription')[0].innerHTML=`<h3>Про что фильм?</h3><p></p>не знаю....`;}
          document.getElementsByClassName('filmOther')[0].innerHTML=`
          Произведен в: <div class="countryAdd"></div>
          `;
          for (let i=0;i<data.countries.length;i++) {
            let country_code;

            var x = getXMLDocument('https://www.artlebedev.ru/country-list/xml/'); //доделать значки флагов около названия
            console.log(x);


            document.getElementsByClassName('flags')[0].innerHTML+=`<img src="https://www.countryflags.io/${country_code}/flat/64.png">&nbsp;`;
          };
          for (let i=0;i<data.genres.length;i++) {
            document.getElementsByClassName('filmGenre')[0].innerHTML+=`<div class="labelOut"><div class="labelIn">${data.genres[i].genre}</div></div> `;
          };
          if (data.facts.length!==0) {for (let i=0;i<data.facts.length;i++){
            document.getElementsByClassName('spoiler')[0].innerHTML+=`${i+1}. ${data.facts[i]}<p></p>`;
          }} else {document.getElementsByClassName('filmFacts')[0].classList.add('spoiler')}
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
            <div className="filmGenre"></div>
            <div className="filmScore"></div>
          </div>
          <div className="film"></div>
          <div className="filmDescription"></div>
          <p></p>
          <div className="filmOther"></div>
          <p></p>
          <div className="filmFacts" onClick={()=>{document.getElementsByClassName('spoiler')[0].style.visibility='visible'}}>
            <h3>Интересные факты: (для просмотра нажать сюда. P.S. возможны спойлеры)</h3>
            <div className="spoiler">

            </div>
          </div>
        </div>
    );
}

export default Film;