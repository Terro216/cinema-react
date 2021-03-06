import './header.css';

function Header() {
    return(
        <div className="header-wrapper">
            <div className="header-brand"><img className="logo" alt="logo"></img> CINEMA</div>
            <div className="header-pages">
                Новинки
                ТОП-100 фильмов
                
            </div>
            <div className="search"><input type="text" placeholder="Поиск..."></input></div>
        </div>
    );
}

export default Header;