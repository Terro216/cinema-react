import './sidebar.scss';
import {
    Link
  } from "react-router-dom";
import { useEffect, useState } from 'react';

function Sidebar() {
    
    useEffect(() => {
    let request = new Request('https://kinopoiskapiunofficial.tech/api/v2.1/films/filters',{
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
        console.log(data);
        let wrapper = document.getElementsByClassName('sidebar-wrapper')[0];
        let header = document.createElement('div');
        header.className="sidebar-header";
        header.innerHTML='<h3>ЖАНРЫ</h3>';
        wrapper.appendChild(header);
        for (let i=0;i<data.genres.length;i++){
            let genre = document.createElement('div');
            genre.className="genre";
            genre.innerHTML = `
            <a class="genre-card" href="#/genre/${data.genres[i].id}">
            <h3>${data.genres[i].genre}</h3>
            </a>`;
            wrapper.appendChild(genre);
        }
        }
    )
    .catch((error) => {
        console.log(error);
      }
    );
    });
    return(
        <div className="sidebar-wrapper">

        </div>
    );
}

export default Sidebar;