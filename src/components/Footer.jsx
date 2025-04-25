import { Link } from "react-router-dom"
import "./Footer.css"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <Link to="/">
              <span>Rhythm</span>
              <span className="highlight">Events</span>
            </Link>
            <p>Creating unforgettable music experiences since 2010.</p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-links-column">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/events">Events</Link>
                </li>
                <li>
                  <Link to="/venues">Venues</Link>
                </li>
                <li>
                  <Link to="/meet-the-team">Meet The Team</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h3>Support</h3>
              <ul>
                <li>
                  <Link to="/faq">FAQ</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms-of-service">Terms of Service</Link>
                </li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h3>Contact</h3>
              <address>
                <p>
                  <i className="fas fa-map-marker-alt"></i> 123 Music Street, Melody City
                </p>
                <p>
                  <i className="fas fa-phone"></i> +1 (555) 123-4567
                </p>
                <p>
                  <i className="fas fa-envelope"></i> info@rhythmevents.com
                </p>
              </address>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} RhythmEvents. All rights reserved.</p>
          <p>
            Designed with <i className="fas fa-heart"></i> for music lovers
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

