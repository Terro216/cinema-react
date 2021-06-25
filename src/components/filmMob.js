import './filmMob.scss';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import countriesJSON from '../scripts/countries.js'
import similarFilms from '../scripts/similarFilms.js'

function FilmMob() {
  let { id } = useParams();

  useEffect(() => {
    //очистка всего, что остается при переходе с другого фильма:
    document.getElementsByClassName('filmGenre')[0].innerHTML = '';
    document.getElementsByClassName('filmFacts')[0].innerHTML = '';
    document.getElementsByClassName('spoiler')[0].style.display = 'none';
    document.getElementsByClassName('factsInfo')[0].style.display = 'flex';

    let wrapper = document.getElementsByClassName('film')[0];
    wrapper.innerHTML = '';
    let film = document.createElement('div');
    let script = document.createElement('script');
    script.type = "text/javascript";
    script.src = "//yohoho.cc/yo.js";
    film.className = "player";
    film.innerHTML = `
            <div id="yohoho" data-kinopoisk="${id}"></div>
            `;
    //ver 2
    let film2 = document.createElement('div');
    let script2 = document.createElement('script');
    script2.type = "text/javascript";
    script2.src = `//pleer.videoplayers.club/get_player?w=610&h=370&type=watch&kp_id=${id}&players=apicollaps,videocdn,bazon,hdvb,alloha,ustore,iframe,trailer&bt_s=b_r:6;b_h:40;b_w:100;b_c:FFFFFF;b_bg:428BCA;b_f:18;&bt_n=Плеер 2&ani=COLLAPS&ati=&adi=&vni=VIDEOCDN&vti=&vdi=&hni=HDVB&hti=&hdi=&bni=BAZON&bti=&bdi=&alni=ALLOHATV&alti=&aldi=&usni=USTOREBZ&usti=&usdi=&idi=`;
    film2.className = "uitools";
    film2.id = 'uitools';

    wrapper.appendChild(film);
    wrapper.appendChild(script);

    wrapper.appendChild(film2);
    wrapper.appendChild(script2);


    let request = new Request(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}?append_to_response=RATING`, {
      headers: new Headers({
        'accept': 'application/json',
        'X-API-KEY': '37970845-fd94-4f47-877f-229c8ce46304'
      })
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
        console.log(data);
        document.getElementsByClassName('filmScore')[0].innerHTML = `<div>КиноПоиск: ${data.rating.rating}</div><div>IMDB: ${data.rating.ratingImdb}</div> <div>Критики: ${data.rating.ratingFilmCritics}</div>`;
        data = data.data;
        document.getElementsByClassName('bigPoster')[0].src = data.posterUrl;

        if (data.slogan !== null) { document.getElementsByClassName('filmName')[0].innerHTML = `${data.nameRu} (${data.year})<br/><br/><div class="flags"></div><br/><i class="filmQuote">&laquo;${data.slogan}&raquo;</i>`; }
        else { document.getElementsByClassName('filmName')[0].innerHTML = `${data.nameRu} (${data.year}) <div class="flags"></div><br/>`; }

        if (data.description !== null) { document.getElementsByClassName('filmDescription')[0].innerHTML = `<h3>Про что фильм?</h3><p></p>${data.description}`; }
        else { document.getElementsByClassName('filmDescription')[0].innerHTML = `<h3>Про что фильм?</h3><p></p>не знаю....`; }


        for (let i = 0; i < data.countries.length; i++) {
          let country_code;
          let kpCountry = data.countries[i].country;
          if (kpCountry === "США") { kpCountry = 'Соединённые Штаты Америки' }
          if (kpCountry === "СССР") { kpCountry = 'Россия' }
          for (let c = 0; c < countriesJSON.length; c++) {
            /*console.log(kpCountry,countriesJSON[c].translations.rus.official)*/
            if ((kpCountry === countriesJSON[c].translations.rus.official) || (kpCountry === countriesJSON[c].translations.rus.common)) {
              country_code = countriesJSON[c].cca2.toLowerCase();
              break;
            }
          }
          document.getElementsByClassName('flags')[0].innerHTML += `<img class="flag" src="https://raw.githubusercontent.com/lipis/flag-icon-css/master/flags/4x3/${country_code}.svg"/>&nbsp;`;
        };


        /*for (let i = 0; i < data.genres.length; i++) {
          document.getElementsByClassName('filmGenre')[0].innerHTML += `<div class="labelOut"><div class="labelIn">${data.genres[i].genre}</div></div> `;
        };*/
        if (data.facts.length !== 0) {
          for (let i = 0; i < data.facts.length; i++) {
            document.getElementsByClassName('filmFacts')[0].innerHTML += `${i + 1}. ${data.facts[i]}<p></p>`;
          }
        } else { document.getElementsByClassName('filmFacts-wrapper')[0].style.display='none' }


        let hasSimilar = similarFilms(id);
      })
      .catch((error) => {
        console.log(error);
      }
      );
  });

  return (
    <div className="film-wrapper">
      <div className="filmHeader">
        <img className="bigPoster" alt="big poster"></img>
        <h1 className="filmName"> </h1>
        <div className="filmGenre"></div>
        <div className="filmScore"></div>
      </div>
      <div className="film"></div>
      <div className="filmDescription"></div>
      <p></p>
      <p></p>
      <div className="filmFacts-wrapper" onClick={() => {
        document.getElementsByClassName('spoiler')[0].style.display = 'block';
        document.getElementsByClassName('factsInfo')[0].style.display = 'none';
      }}>
        <span className='factsInfo'>Нажмите сюда, что бы прочитать интересные факты<br></br>P.S. возможны спойлеры</span></div>
      <div className="spoiler">
        <div className="filmFacts">
          <h3>Интересные факты: </h3>

        </div>
      </div>

      <div className="similar-wrapper">
      <h2>Похожие фильмы:</h2>
      <div className="anotherFilms">
      </div>
      </div>
    </div>
  );
}

export default FilmMob;