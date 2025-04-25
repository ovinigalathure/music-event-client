"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

const MyTickets = () => {
  const [activeTab, setActiveTab] = useState("upcoming")

  // Mock ticket data
  const upcomingTickets = [
    {
      id: "1",
      eventId: "1",
      eventName: "Summer Music Festival",
      date: "2025-06-15T14:00:00",
      venue: "Central Park, New York",
      ticketType: "VIP Pass",
      price: 149.99,
      quantity: 2,
      qrCode: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "2",
      eventId: "3",
      eventName: "Rock Concert",
      date: "2025-07-10T18:00:00",
      venue: "Madison Square Garden, New York",
      ticketType: "General Admission",
      price: 89.99,
      quantity: 1,
      qrCode: "/placeholder.svg?height=200&width=200",
    },
  ]

  const pastTickets = [
    {
      id: "3",
      eventId: "8",
      eventName: "Indie Music Showcase",
      date: "2023-05-10T18:30:00",
      venue: "The Independent, San Francisco",
      ticketType: "General Admission",
      price: 45.0,
      quantity: 2,
      qrCode: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "4",
      eventId: "10",
      eventName: "Blues & Soul Night",
      date: "2023-06-05T20:00:00",
      venue: "House of Blues, New Orleans",
      ticketType: "VIP Seating",
      price: 65.0,
      quantity: 1,
      qrCode: "/placeholder.svg?height=200&width=200",
    },
  ]

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const downloadTicket = (ticket) => {
    // In a real app, this would generate and download a PDF ticket
    console.log("Downloading ticket:", ticket)
    alert(`Ticket for ${ticket.eventName} downloaded!`)
  }

  return (
    <div className="my-tickets">
      <div className="section-header">
        <h2>My Tickets</h2>
      </div>

      <div className="tickets-tabs">
        <button
          className={`tab-btn ${activeTab === "upcoming" ? "active" : ""}`}
          onClick={() => handleTabChange("upcoming")}
        >
          Upcoming Events
        </button>
        <button className={`tab-btn ${activeTab === "past" ? "active" : ""}`} onClick={() => handleTabChange("past")}>
          Past Events
        </button>
      </div>

      <div className="tickets-container">
        {activeTab === "upcoming" ? (
          upcomingTickets.length > 0 ? (
            upcomingTickets.map((ticket) => (
              <div key={ticket.id} className="ticket-card">
                <div className="ticket-details">
                  <h3>{ticket.eventName}</h3>
                  <div className="ticket-info">
                    <p>
                      <i className="fas fa-calendar-alt"></i>
                      {new Date(ticket.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p>
                      <i className="fas fa-clock"></i>
                      {new Date(ticket.date).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p>
                      <i className="fas fa-map-marker-alt"></i> {ticket.venue}
                    </p>
                    <p>
                      <i className="fas fa-ticket-alt"></i> {ticket.ticketType} x {ticket.quantity}
                    </p>
                    <p>
                      <i className="fas fa-money-bill-wave"></i> ${(ticket.price * ticket.quantity).toFixed(2)}
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
            ))
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
          pastTickets.map((ticket) => (
            <div key={ticket.id} className="ticket-card past">
              <div className="ticket-details">
                <h3>{ticket.eventName}</h3>
                <div className="ticket-info">
                  <p>
                    <i className="fas fa-calendar-alt"></i>
                    {new Date(ticket.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p>
                    <i className="fas fa-clock"></i>
                    {new Date(ticket.date).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p>
                    <i className="fas fa-map-marker-alt"></i> {ticket.venue}
                  </p>
                  <p>
                    <i className="fas fa-ticket-alt"></i> {ticket.ticketType} x {ticket.quantity}
                  </p>
                  <p>
                    <i className="fas fa-money-bill-wave"></i> ${(ticket.price * ticket.quantity).toFixed(2)}
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
          ))
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

