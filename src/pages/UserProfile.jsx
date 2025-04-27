"use client"

import { useState } from "react"
import { Routes, Route, Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./UserProfile.css"

// Profile sub-pages
import PersonalInfo from "./profile/PersonalInfo"
import MyTickets from "./profile/MyTickets"
import PaymentMethods from "./profile/PaymentMethods"
import AccountSettings from "./profile/AccountSettings"
import BillingHistory from "./profile/BillingHistory"

const UserProfile = () => {
  const { user } = useAuth()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="container">
          <h1>My Profile</h1>
          <p>Manage your account settings and preferences</p>
        </div>
      </div>

      <div className="pcontainer">
        <div className="profile-container">
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <i className="fas fa-bars"></i> Menu
          </button>

          <aside className={`profile-sidebar ${isMobileMenuOpen ? "active" : ""}`}>
            <div className="profile-user">
              <div className="profile-avatar">
                <img src="/placeholder.svg?height=100&width=100" alt={user?.name} />
              </div>
              <div className="profile-user-info">
                <h3>{user?.name}</h3>
                <p>{user?.email}</p>
              </div>
            </div>

            <nav className="profile-nav">
              <Link
                to="/profile"
                className={location.pathname === "/profile" ? "active" : ""}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fas fa-user"></i> Personal Information
              </Link>
              <Link
                to="/profile/tickets"
                className={location.pathname === "/profile/tickets" ? "active" : ""}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fas fa-ticket-alt"></i> My Bookings
              </Link>
              <Link
                to="/profile/payment-methods"
                className={location.pathname === "/profile/payment-methods" ? "active" : ""}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fas fa-credit-card"></i> Payment Methods
              </Link>
              <Link
                to="/profile/billing"
                className={location.pathname === "/profile/billing" ? "active" : ""}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fas fa-file-invoice-dollar"></i> Billing History
              </Link>
              <Link
                to="/profile/settings"
                className={location.pathname === "/profile/settings" ? "active" : ""}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className="fas fa-cog"></i> Account Settings
              </Link>
            </nav>
          </aside>

          <main className="profile-content">
            <Routes>
              <Route path="/" element={<PersonalInfo />} />
              <Route path="/tickets" element={<MyTickets />} />
              <Route path="/payment-methods" element={<PaymentMethods />} />
              <Route path="/billing" element={<BillingHistory />} />
              <Route path="/settings" element={<AccountSettings />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  )
}

export default UserProfile

