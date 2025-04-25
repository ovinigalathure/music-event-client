"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Events from "./pages/Events"
import EventDetails from "./pages/EventDetails"
import Venues from "./pages/Venues"
import VenueDetails from "./pages/VenueDetails"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Register from "./pages/Register"
import UserProfile from "./pages/UserProfile"
import AdminDashboard from "./pages/admin/Dashboard"
import AdminEvents from "./pages/admin/Events"
import AdminVenues from "./pages/admin/Venues"
import AdminTickets from "./pages/admin/Tickets"
import AdminUsers from "./pages/admin/Users"
import NotFound from "./pages/NotFound"
import MeetTheTeam from "./pages/MeetTheTeam"
import FAQ from "./pages/FAQ"
import { ThemeProvider } from "./context/ThemeContext"
import { AuthProvider } from "./context/AuthContext"
import { NotificationProvider } from "./context/NotificationContext"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminRoute from "./components/AdminRoute"
import "./App.css"



function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-logo">
          <span>Rhythm</span>
          <span className="highlight">Events</span>
        </div>
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <div className="app">
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/events/:id" element={<EventDetails />} />
                  <Route path="/venues" element={<Venues />} />
                  <Route path="/venues/:id" element={<VenueDetails />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/meet-the-team" element={<MeetTheTeam />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/profile/*"
                    element={
                      <ProtectedRoute>
                        <UserProfile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />

                  <Route
                    path="/admin/events"
                    element={
                      <AdminRoute>
                        <AdminEvents />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/venues"
                    element={
                      <AdminRoute>
                        <AdminVenues />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/tickets"
                    element={
                      <AdminRoute>
                        <AdminTickets />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/users"
                    element={
                      <AdminRoute>
                        <AdminUsers />
                      </AdminRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

