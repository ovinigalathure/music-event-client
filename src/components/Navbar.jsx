"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"
import { useNotification } from "../context/NotificationContext"
import "./Navbar.css"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const { notifications } = useNotification()
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    closeMenu()
  }, [location])

  const handleLogout = () => {
    logout()
    closeMenu()
  }

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span>Rhythm</span>
          <span className="highlight">Events</span>
        </Link>

        <div className="navbar-icons">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
          </button>

          {user && (
            <div className="notification-container">
              <button className="notification-btn" onClick={toggleNotifications} aria-label="Notifications">
                <i className="fas fa-bell"></i>
                {notifications.length > 0 && <span className="notification-badge">{notifications.length}</span>}
              </button>

              {isNotificationOpen && (
                <div className="notification-dropdown">
                  <h3>Notifications</h3>
                  {notifications.length > 0 ? (
                    <ul>
                      {notifications.map((notification, index) => (
                        <li key={index} className={notification.read ? "" : "unread"}>
                          <p>{notification.message}</p>
                          <span>{notification.time}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-notifications">No new notifications</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <button className={`menu-toggle ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <ul className="navbar-links">
            <li>
              <Link to="/" className={location.pathname === "/" ? "active" : ""}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/events" className={location.pathname.includes("/events") ? "active" : ""}>
                Events
              </Link>
            </li>
            <li>
              <Link to="/venues" className={location.pathname.includes("/venues") ? "active" : ""}>
                Venues
              </Link>
            </li>
            <li>
              <Link to="/meet-the-team" className={location.pathname === "/meet-the-team" ? "active" : ""}>
                Meet The Team
              </Link>
            </li>
            <li>
              <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>
                About
              </Link>
            </li>
            <li>
              <Link to="/faq" className={location.pathname === "/faq" ? "active" : ""}>
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>
                Contact
              </Link>
            </li>
          </ul>

          <div className="navbar-auth">
            {user ? (
              <>
                {user.isAdmin && (
                  <Link to="/admin" className="admin-link">
                    Admin Dashboard
                  </Link>
                )}
                <Link to="/profile" className="profile-link">
                  <i className="fas fa-user"></i> My Profile
                </Link>
                <button onClick={handleLogout} className="logout-btn">
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="login-btn">
                  Login
                </Link>
                <Link to="/register" className="register-btn">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

