import { FaWolfPackBattalion } from "react-icons/fa6";
import "../css/Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <a className="footer-logo" href="/">
                    <FaWolfPackBattalion size={40} color="#3b0c6d" />
                    <span className="footer-logo-text">ONYX</span>
                </a>

                <p className="footer-tagline">Your next favorite game is waiting.</p>

                <p className="footer-credit">
                    Made by <span className="footer-author">Berat Karabulut</span>
                </p>

                <p className="footer-copy">
                    © {new Date().getFullYear()} ONYX
                </p>
            </div>
        </footer>
    );
}

export default Footer;