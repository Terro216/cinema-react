(this["webpackJsonpcinema-react"]=this["webpackJsonpcinema-react"]||[]).push([[0],{22:function(e,t,c){},23:function(e,t,c){},24:function(e,t,c){},31:function(e,t,c){},32:function(e,t,c){},33:function(e,t,c){},34:function(e,t,c){},35:function(e,t,c){},38:function(e,t,c){"use strict";c.r(t);var n=c(0),a=c(16),s=c.n(a),r=(c(22),c(23),c(9)),i=(c(24),c(7)),o=c(1);var l=function(){var e=Object(n.useState)(" "),t=Object(r.a)(e,2),c=t[0],a=t[1];return Object(o.jsxs)("div",{className:"header-wrapper",children:[Object(o.jsxs)("div",{className:"header-brand",children:[Object(o.jsx)("img",{className:"logo",alt:"logo"})," CINEMA"]}),Object(o.jsx)("div",{className:"header-pages",children:"\u041d\u043e\u0432\u0438\u043d\u043a\u0438 \u0422\u041e\u041f-100 \u0444\u0438\u043b\u044c\u043c\u043e\u0432"}),Object(o.jsxs)("div",{className:"search",children:[Object(o.jsx)("input",{type:"text",className:"searchBar",placeholder:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435...",onChange:function(){var e=document.getElementsByClassName("searchBar")[0].value;a(e)}}),Object(o.jsx)(i.b,{to:"/search/".concat(c),children:"\u041f\u043e\u0438\u0441\u043a"})]})]})};c(31);var d=function e(t,c,n){var a,s;"top"===c?s="https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=".concat(n,"&page=").concat(t):"search"===c&&(s="https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=".concat(n,"&page=").concat(t));var r=new Request(s,{headers:new Headers({accept:"application/json","X-API-KEY":"37970845-fd94-4f47-877f-229c8ce46304"})});return fetch(r).then((function(e){if(e.ok)return e.json();throw new Error("Something went wrong")})).then((function(e){a=e.pagesCount,(t>a||t<1)&&(t=a),console.log(t," ",a);var c=document.getElementsByClassName("cards")[0];c.innerHTML="",console.log(e);for(var n=0;n<e.films.length;n++){var s=document.createElement("div");s.className="card",s.innerHTML='\n            <a href="/film/'.concat(e.films[n].filmId,"\">\n            <img src='").concat(e.films[n].posterUrlPreview,"'></img>\n            <br>\n            <h3>").concat(e.films[n].nameRu,"</h3>\n            </a>"),c.appendChild(s)}})).catch((function(t){a=e(1,c,n)})),a};var p=function(e){var t,c=Object(n.useState)(1),a=Object(r.a)(c,2),s=a[0],i=a[1];return Object(n.useEffect)((function(){console.log(e.location,e.match.params.type,e.match.params.keyword),t=d(s,e.match.params.type,e.match.params.keyword)})),Object(o.jsxs)("div",{className:"main-wrapper",children:[Object(o.jsx)("div",{className:"cards"}),Object(o.jsxs)("div",{className:"pageListWrapper",children:[Object(o.jsx)("button",{onClick:function(){s-1>=1?i(s-1):console.log()},className:"pageListButton",children:" \u041d\u0430\u0437\u0430\u0434 "}),Object(o.jsx)("button",{onClick:function(){return i(1)},className:"pagListButton",children:" \u041f\u0435\u0440\u0432\u0430\u044f \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430 "}),Object(o.jsx)("button",{onClick:function(){i(s+1>t?1:s+1)},className:"pageListButton",children:" \u0412\u043f\u0435\u0440\u0435\u0434 "})]})]})};c(32);var j=function(){return Object(o.jsx)("div",{className:"sidebar-wrapper",children:"sidebar"})};c(33);var m=function(){return Object(o.jsx)("div",{className:"footer-wrapper",children:"made by i l y a m e d"})},u=(c(34),c(2));var h=function(){var e=Object(u.g)().id;return Object(n.useEffect)((function(){var t=document.getElementsByClassName("film-wrapper")[0];t.innerHTML="";var c=document.createElement("div"),n=document.createElement("script");n.type="text/javascript",n.src="//yohoho.cc/yo.js",c.className="player",c.innerHTML='\n            <div id="yohoho" data-kinopoisk="'.concat(e,'"></div>\n            '),t.appendChild(c),t.appendChild(n)})),Object(o.jsx)("div",{className:"film-wrapper",children:Object(o.jsx)("script",{src:"//yohoho.cc/yo.js"})})};c(35);c(36);var f=function(){return Object(o.jsx)("div",{className:"App",children:Object(o.jsxs)(i.a,{children:[Object(o.jsx)(l,{}),Object(o.jsxs)(u.d,{children:[Object(o.jsx)(u.a,{exact:!0,from:"/",to:"/top/TOP_250_BEST_FILMS",component:p}),Object(o.jsx)(u.b,{path:"/film/:id",children:Object(o.jsx)(h,{})}),Object(o.jsx)(u.b,{path:"/:type/:keyword",component:p})]}),Object(o.jsx)(j,{}),Object(o.jsx)(m,{})]})})},b=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,39)).then((function(t){var c=t.getCLS,n=t.getFID,a=t.getFCP,s=t.getLCP,r=t.getTTFB;c(e),n(e),a(e),s(e),r(e)}))};s.a.render(Object(o.jsx)(f,{}),document.getElementById("root")),b()}},[[38,1,2]]]);
//# sourceMappingURL=main.3495ef96.chunk.js.map