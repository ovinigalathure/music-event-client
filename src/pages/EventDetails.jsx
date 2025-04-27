"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import Countdown from "../components/Countdown"
import { useAuth } from "../context/AuthContext"
import { useNotification } from "../context/NotificationContext"
import "./EventDetails.css"

const EventDetails = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("details")
  const [ticketQuantity, setTicketQuantity] = useState(1)
  const [eventArtists, setEventArtists] = useState([])
  const [activeImage, setActiveImage] = useState("")
  const { user } = useAuth()
  const { addNotification } = useNotification()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEventData = async () => {
      setLoading(true)
      try {
        // Fetch event details
        const eventResponse = await axios.get(`http://localhost:8080/api/events/${id}`)
        const eventData = eventResponse.data
        setEvent(eventData)
        setActiveImage(eventData.image)

        // Fetch associated artists if available
        if (eventData.artists?.length > 0) {
          const artistsResponse = await axios.get(
            `http://localhost:8080/api/artists?ids=${eventData.artists.join(",")}`
          )
          setEventArtists(artistsResponse.data)
        }
      } catch (error) {
        console.error("Error fetching event details:", error)
        setEvent(null)
      } finally {
        setLoading(false)
        window.scrollTo(0, 0)
      }
    }

    fetchEventData()
  }, [id])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleQuantityChange = (e) => {
    setTicketQuantity(Number.parseInt(e.target.value))
  }

  const handleImageClick = (image) => {
    setActiveImage(image)
  }

  const handleBookTicket = async () => {
    if (!user) {
      window.location.href = `/login?redirect=/events/${id}`
      return
    }

    const price = event.price
    const totalPrice = (price * ticketQuantity).toFixed(2)
    const serviceFee = (price * 0.1 * ticketQuantity).toFixed(2)
    const grandTotal = (Number(totalPrice) + Number(serviceFee)).toFixed(2)

    try {
      await axios.post("http://localhost:8080/api/tickets/book", {
        eventId: event.id,
        userId: user.id,
        price: price,
        quantity: ticketQuantity,
        totalPrice: totalPrice,
        serviceFee: serviceFee,
        grandTotal: grandTotal,
      })

      addNotification({
        message: `Booked ${ticketQuantity} ticket(s) for "${event.name}"`,
        type: "success"
      })
      
      navigate(`/confirmation/${event.id}?quantity=${ticketQuantity}&totalPrice=${totalPrice}&serviceFee=${serviceFee}&grandTotal=${grandTotal}`)
      setTicketQuantity(1)
    } catch (error) {
      console.error("Booking failed:", error)
      addNotification({
        message: "Booking failed. Please try again.",
        type: "error"
      })
      alert("Booking failed. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading event details...</p>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="not-found-container">
        <h2>Event Not Found</h2>
        <p>The requested event could not be found.</p>
        <Link to="/events" className="btn">
          Browse Events
        </Link>
      </div>
    )
  }

  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  const totalPrice = (event.price * ticketQuantity).toFixed(2)
  const serviceFee = (event.price * 0.1 * ticketQuantity).toFixed(2)
  const grandTotal = (Number(totalPrice) + Number(serviceFee)).toFixed(2)
  const uploadsBase = "http://localhost:8080/uploads/";
  return (
    <div className="event-details-page">
      <div className="event-header">
        <div className="container11">
          <div className="event-header-content">
            <h1>{event.name}</h1>
            <div className="event-meta">
              <div className="event-meta-item">
                <i className="fas fa-calendar-alt"></i>
                <span>{formattedDate} at {formattedTime}</span>
              </div>
              <div className="event-meta-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>{event.venue}</span>
              </div>
              <div className="event-meta-item">
                <i className="fas fa-ticket-alt"></i>
                <span>
                  {event.tickets?.sold} / {event.tickets?.total} tickets sold
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container11">
        <div className="event-details-content">
          <div className="event-main">
            <div className="event-gallery">
              <div className="event-main-image">
              
                <img
                  src={
                    event.imagePath
                      ? `${uploadsBase}${event.imagePath}`
                      : "/placeholder.svg"
                  }
                  alt={event.name}
                />

              </div>
              <div className="event-thumbnails">
              {[event.image, ...(event.gallery || [])]
  .filter(Boolean)
  .map((imageFilename, index) => (
    <div
      key={index}
      className={`event-thumbnail ${activeImage === imageFilename ? "active" : ""}`}
      onClick={() => handleImageClick(imageFilename)}
    >
      <img
        src={`${uploadsBase}${imageFilename}`}
        alt={`${event.name} - ${index + 1}`}
        style={{ width: 60, height: 60, objectFit: "cover" }}
      />
    </div>
))}
              </div>
            </div>

            <div className="event-tabs">
              <div className="tabs-header">
                <button
                  className={`tab-btn ${activeTab === "details" ? "active" : ""}`}
                  onClick={() => handleTabChange("details")}
                >
                  Event Details
                </button>
                <button
                  className={`tab-btn ${activeTab === "venue" ? "active" : ""}`}
                  onClick={() => handleTabChange("venue")}
                >
                  Venue Info
                </button>
                <button
                  className={`tab-btn ${activeTab === "artists" ? "active" : ""}`}
                  onClick={() => handleTabChange("artists")}
                >
                  Artists
                </button>
              </div>
              <div className="tabs-content">
                {activeTab === "details" && (
                  <div className="tab-pane">
                    <h2>About This Event</h2>
                    <p>{event.description}</p>
                    <div className="event-countdown">
                      <h3>Event Starts In</h3>
                      <Countdown targetDate={event.date} />
                    </div>
                  </div>
                )}
                {activeTab === "venue" && (
                  <div className="tab-pane">
                    <h2>Venue Information</h2>
                    <div className="venue-info">
                      <h3>{event.venue}</h3>
                      <p>{event.venueAddress}</p>
                    </div>
                  </div>
                )}
                {activeTab === "artists" && (
                  <div className="tab-pane">
                    <h2>Featured Artists</h2>
                    {eventArtists.length > 0 ? (
                      <div className="artists-list">
                        {eventArtists.map((artist) => (
                          <div key={artist.id} className="artist-card">
                            <div className="artist-image">
                              <img src={artist.image} alt={artist.name} />
                            </div>
                            <div className="artist-info">
                              <h3>{artist.name}</h3>
                              <p className="artist-genre">{artist.genre}</p>
                              <p className="artist-bio">{artist.bio}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No artist information available</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="event-sidebar">
            <div className="ticket-booking-card">
              <h2>Get Tickets</h2>
              <div className="ticket-price">
                <span>Price:</span>
                <span>${event.price?.toFixed(2)}</span>
              </div>
              <div className="ticket-quantity">
                <label>Quantity:</label>
                <select value={ticketQuantity} onChange={handleQuantityChange}>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
              <div className="ticket-summary">
                <div className="summary-item">
                  <span>Tickets ({ticketQuantity}x)</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="summary-item">
                  <span>Service Fee</span>
                  <span>${serviceFee}</span>
                </div>
                <div className="summary-total">
                  <span>Total</span>
                  <span>${grandTotal}</span>
                </div>
              </div>
              <button className="btn book-btn" onClick={handleBookTicket}>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetails
