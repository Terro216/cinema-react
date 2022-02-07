import "./footer.scss"
import animateCSS from "../scripts/animate.js"
import { Link } from "react-router-dom"
import { useEffect } from "react"

function Footer() {
	useEffect(() => {
		document.querySelector(".footer-wrapper").style.display = "flex"
		animateCSS(".footer-wrapper", "fadeInUp")
	})
	return (
		<footer className="footer-wrapper">
			<span>&copy; 2021-2022</span>
			<span>
				made by{" "}
				<a href="https://ilyamed.site/" target="_blank" rel="noreferrer">
					i l y a m e d
				</a>
			</span>
			<Link className="copy-link" to="/copyright">
				Правообладателям
			</Link>
		</footer>
	)
}

export default Footer
