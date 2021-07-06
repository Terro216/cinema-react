import './footer.scss';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className="footer-wrapper">
            <span>(c) 2021</span>

            <span>made by  <a href="https://ilyamed.site/" target="_blank" rel="noreferrer">i l y a m e d</a></span>

            <Link className='copy-link' to='/copyright'>Правообладателям</Link>
        </div>
    );
}

export default Footer;