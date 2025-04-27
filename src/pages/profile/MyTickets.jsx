"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext" // Import the useAuth hook

const MyTickets = () => {
  const { user, loading: authLoading } = useAuth()  // Get logged-in user from AuthContext
  const [activeTab, setActiveTab] = useState("upcoming")
  const [tickets, setTickets] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Ensure that the component only runs after the auth state is loaded
  if (authLoading) return <div className="loading-user-info">Loading user info...</div>
  if (!user) return <div className="login-prompt">Please log in to view your tickets.</div>  // If no user, prompt to log in

  // Fetch tickets from backend using the logged-in user's ID
  useEffect(() => {
    const fetchTickets = async () => {
      if (!user || !user.id) {
        setError("User ID is missing")
        return
      }

      try {
        const res = await fetch(`http://localhost:8080/api/tickets/users/${user.id}`)
        if (!res.ok) throw new Error("Failed to fetch tickets")

        const data = await res.json()
        console.log("Tickets Data:", data)  // Log the tickets data for debugging

        // Ensure the fetched data is an array of tickets
        if (Array.isArray(data)) {
          setTickets(data)
        } else {
          setError("Invalid ticket data format")
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTickets()
  }, [user])

  // Fetch events based on eventId in tickets
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventIds = [...new Set(tickets.map(ticket => ticket.eventId))] // Get unique event IDs from tickets
        const eventsData = await Promise.all(
          eventIds.map(async (eventId) => {
            const res = await fetch(`http://localhost:8080/api/events/${eventId}`)
            if (!res.ok) throw new Error(`Failed to fetch event ${eventId}`)
            return await res.json()
          })
        )
        setEvents(eventsData)
        console.log("Fetched Events:", eventsData)  // Log the events data for debugging
      } catch (err) {
        setError(err.message)
      }
    }

    if (tickets.length > 0) {
      fetchEvents()
    }
  }, [tickets])

  // Find event details based on eventId in tickets
  const getEventDetails = (eventId) => {
    return events.find(event => event.id === eventId)
  }

  // Split tickets by date using event's date
  const now = new Date()

  const upcomingTickets = tickets.filter(ticket => {
    const event = getEventDetails(ticket.eventId)
    const eventDate = event ? new Date(event.date) : null
    return eventDate && eventDate > now
  })

  const pastTickets = tickets.filter(ticket => {
    const event = getEventDetails(ticket.eventId)
    const eventDate = event ? new Date(event.date) : null
    return eventDate && eventDate <= now
  })

  const handleTabChange = (tab) => setActiveTab(tab)

  const downloadTicket = (ticket) => {
    // In a real app, this would generate and download a PDF ticket
    console.log("Downloading ticket:", ticket)
    alert(`Ticket for ${ticket.eventName} downloaded!`)
  }

  if (loading) return <div className="loading-tickets">Loading tickets...</div>
  if (error) return <div className="error-message">Error: {error}</div>

  return (
    <div className="my-tickets-container">
      <div className="my-tickets-header">
        <h2 className="my-tickets-title">My Bookings</h2>
      </div>

      <div className="my-tickets-tabs">
        <button
          className={`tab-btn ${activeTab === "upcoming" ? "active" : ""}`}
          onClick={() => handleTabChange("upcoming")}
        >
          Upcoming Events
        </button>
        <button
          className={`tab-btn ${activeTab === "past" ? "active" : ""}`}
          onClick={() => handleTabChange("past")}
        >
          Past Events
        </button>
      </div>

      <div className="my-tickets-list">
        {activeTab === "upcoming" ? (
          upcomingTickets.length > 0 ? (
            upcomingTickets.map((ticket) => {
              const event = getEventDetails(ticket.eventId)
              return (
                <div key={ticket.id} className="ticket-card">
                  <div className="ticket-details">
                    <h3 className="event-name">{event ? event.name : "Event not found"}</h3>
                    <div className="ticket-info">
                      <p>
                        <i className="fas fa-calendar-alt"></i>
                        {event ? new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }) : "N/A"}
                      </p>
                      <p>
                        <i className="fas fa-clock"></i>
                        {event ? new Date(event.date).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        }) : "N/A"}
                      </p>
                      <p>
                        <i className="fas fa-map-marker-alt"></i> {event ? event.venue : "N/A"}
                      </p>
                      <p>
                        <i className="fas fa-ticket-alt"></i> {ticket.quantity} x {event ? `$${event.price.toFixed(2)}` : "N/A"}
                      </p>
                      <p>
                        <i className="fas fa-money-bill-wave"></i> ${(ticket.totalPrice).toFixed(2)}
                      </p>
                    </div>
                    <div className="ticket-actions">
                      <Link to={`/events/${ticket.eventId}`} className="btn-small">
                        Event Details
                      </Link>
                      <button className="btn-small" onClick={() => downloadTicket(ticket)}>
                        <i className="fas fa-download"></i> Download
                      </button>
                    </div>
                  </div>
                  <div className="ticket-qr">
                    <img src={ticket.qrCode || "/placeholder.svg"} alt="Ticket QR Code" />
                    <p>Scan at the event</p>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="no-tickets">
              <i className="fas fa-ticket-alt"></i>
              <h3>No Upcoming Tickets</h3>
              <p>You don't have any tickets for upcoming events.</p>
              <Link to="/events" className="btn">
                Browse Events
              </Link>
            </div>
          )
        ) : pastTickets.length > 0 ? (
          pastTickets.map((ticket) => {
            const event = getEventDetails(ticket.eventId)
            return (
              <div key={ticket.id} className="ticket-card past">
                <div className="ticket-details">
                  <h3 className="event-name">{event ? event.name : "Event not found"}</h3>
                  <div className="ticket-info">
                    <p>
                      <i className="fas fa-calendar-alt"></i>
                      {event ? new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }) : "N/A"}
                    </p>
                    <p>
                      <i className="fas fa-clock"></i>
                      {event ? new Date(event.date).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      }) : "N/A"}
                    </p>
                    <p>
                      <i className="fas fa-map-marker-alt"></i> {event ? event.venue : "N/A"}
                    </p>
                    <p>
                      <i className="fas fa-ticket-alt"></i> {ticket.quantity} x {event ? `$${event.price.toFixed(2)}` : "N/A"}
                    </p>
                    <p>
                      <i className="fas fa-money-bill-wave"></i> ${(ticket.totalPrice).toFixed(2)}
                    </p>
                  </div>
                  <div className="ticket-actions">
                    <Link to={`/events/${ticket.eventId}`} className="btn-small">
                      Event Details
                    </Link>
                    <button className="btn-small" onClick={() => downloadTicket(ticket)}>
                      <i className="fas fa-download"></i> Download
                    </button>
                  </div>
                </div>
                <div className="ticket-qr">
                  <img src={ticket.qrCode || "/placeholder.svg"} alt="Ticket QR Code" />
                  <p>Event completed</p>
                </div>
              </div>
            )
          })
        ) : (
          <div className="no-tickets">
            <i className="fas fa-ticket-alt"></i>
            <h3>No Past Tickets</h3>
            <p>You don't have any tickets for past events.</p>
            <Link to="/events" className="btn">
              Browse Events
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyTickets
