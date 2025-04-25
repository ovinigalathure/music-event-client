"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { mockEvents, mockArtists } from "../data/mockData"
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

  useEffect(() => {
    // Simulate API call
    const fetchEvent = () => {
      setTimeout(() => {
        const foundEvent = mockEvents.find((e) => e.id === id)

        if (foundEvent) {
          setEvent(foundEvent)
          setActiveImage(foundEvent.image)

          // Get artists for this event
          if (foundEvent.artists && foundEvent.artists.length > 0) {
            const artists = mockArtists.filter((artist) => foundEvent.artists.includes(artist.id))
            setEventArtists(artists)
          }
        }

        setLoading(false)
      }, 800)
    }

    fetchEvent()

    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [id])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value)
    setTicketQuantity(value)
  }

  const handleImageClick = (image) => {
    setActiveImage(image)
  }

  const handleBookTicket = async () => {
    if (!user) {
      // Redirect to login if not logged in
      window.location.href = `/login?redirect=/events/${id}`;
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8080/api/tickets/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: event.id,
          quantity: ticketQuantity,
          userId: user.id,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to book ticket");
      }
  
      const data = await response.json();
  
      addNotification({
        message: `You have successfully booked ${ticketQuantity} ticket(s) for "${event.name}"`,
      });
  
      // Reset quantity
      setTicketQuantity(1);
    } catch (error) {
      console.error("Booking failed:", error);
      addNotification({
        message: "Booking failed. Please try again later.",
        type: "error",
      });
    }
  };
  

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
        <p>The event you're looking for doesn't exist or has been removed.</p>
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
  const grandTotal = (Number.parseFloat(totalPrice) + Number.parseFloat(serviceFee)).toFixed(2)

  return (
    <div className="event-details-page">
      <div className="event-header">
        <div className="container">
          <div className="event-header-content">
            <h1>{event.name}</h1>
            <div className="event-meta">
              <div className="event-meta-item">
                <i className="fas fa-calendar-alt"></i>
                <span>
                  {formattedDate} at {formattedTime}
                </span>
              </div>
              <div className="event-meta-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>{event.venue}</span>
              </div>
              <div className="event-meta-item">
                <i className="fas fa-ticket-alt"></i>
                <span>
                  {event.tickets.sold} / {event.tickets.total} tickets sold
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="event-details-content">
          <div className="event-main">
            <div className="event-gallery">
              <div className="event-main-image">
                <img src={activeImage || "/placeholder.svg"} alt={event.name} />
              </div>
              <div className="event-thumbnails">
                {[event.image, ...event.gallery].map((image, index) => (
                  <div
                    key={index}
                    className={`event-thumbnail ${activeImage === image ? "active" : ""}`}
                    onClick={() => handleImageClick(image)}
                  >
                    <img src={image || "/placeholder.svg"} alt={`${event.name} - ${index}`} />
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
                    <div className="event-share">
                      <h3>Share This Event</h3>
                      <div className="share-buttons">
                        <a href="#" className="share-btn facebook">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="share-btn twitter">
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="share-btn instagram">
                          <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="share-btn email">
                          <i className="fas fa-envelope"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "venue" && (
                  <div className="tab-pane">
                    <h2>Venue Information</h2>
                    <div className="venue-info">
                      <h3>{event.venue}</h3>
                      <p>
                        <i className="fas fa-map-marker-alt"></i> 123 Music Street, City, State
                      </p>
                      <div className="venue-map">
                        <img src="/placeholder.svg?height=300&width=600" alt="Venue Map" />
                      </div>
                      <h3>Getting There</h3>
                      <div className="transportation-options">
                        <div className="transport-option">
                          <i className="fas fa-car"></i>
                          <h4>By Car</h4>
                          <p>Parking available on-site for $15 per vehicle.</p>
                        </div>
                        <div className="transport-option">
                          <i className="fas fa-subway"></i>
                          <h4>Public Transit</h4>
                          <p>Take the Blue Line to Music Station, 5-minute walk.</p>
                        </div>
                        <div className="transport-option">
                          <i className="fas fa-bicycle"></i>
                          <h4>Bicycle</h4>
                          <p>Bike racks available at the north and south entrances.</p>
                        </div>
                      </div>
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
                              <img src={artist.image || "/placeholder.svg"} alt={artist.name} />
                            </div>
                            <div className="artist-info">
                              <h3>{artist.name}</h3>
                              <p className="artist-genre">{artist.genre}</p>
                              <p className="artist-bio">{artist.bio}</p>
                              <div className="artist-social">
                                <a
                                  href={artist.social.spotify}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="Spotify"
                                >
                                  <i className="fab fa-spotify"></i>
                                </a>
                                <a
                                  href={artist.social.instagram}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="Instagram"
                                >
                                  <i className="fab fa-instagram"></i>
                                </a>
                                <a
                                  href={artist.social.youtube}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="YouTube"
                                >
                                  <i className="fab fa-youtube"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No artist information available for this event.</p>
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
                <span className="price-label">Price:</span>
                <span className="price-value">${event.price.toFixed(2)}</span>
              </div>
              <div className="ticket-quantity">
                <label htmlFor="quantity">Quantity:</label>
                <select id="quantity" value={ticketQuantity} onChange={handleQuantityChange}>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="ticket-summary">
                <div className="summary-item">
                  <span>
                    Tickets ({ticketQuantity} x ${event.price.toFixed(2)})
                  </span>
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
              <p className="ticket-note">
                <i className="fas fa-info-circle"></i> Tickets are non-refundable but can be transferred.
              </p>
            </div>

            <div className="event-organizer-card">
              <h3>Event Organizer</h3>
              <div className="organizer-info">
                <img src="/placeholder.svg?height=50&width=50" alt="Organizer" />
                <div>
                  <h4>RhythmEvents</h4>
                  <p>Organizing quality music events since 2010</p>
                </div>
              </div>
              <a href="#" className="contact-organizer">
                <i className="fas fa-envelope"></i> Contact Organizer
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="section similar-events-section">
        <div className="container">
          <h2 className="section-title">Similar Events You Might Like</h2>
          <div className="similar-events">
            {mockEvents
              .filter((e) => e.id !== event.id && e.category === event.category)
              .slice(0, 3)
              .map((similarEvent) => (
                <div key={similarEvent.id} className="similar-event-card">
                  <div className="similar-event-image">
                    <img src={similarEvent.image || "/placeholder.svg"} alt={similarEvent.name} />
                  </div>
                  <div className="similar-event-content">
                    <h3>{similarEvent.name}</h3>
                    <p className="similar-event-date">
                      <i className="fas fa-calendar-alt"></i>
                      {new Date(similarEvent.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p className="similar-event-venue">
                      <i className="fas fa-map-marker-alt"></i> {similarEvent.venue}
                    </p>
                    <Link to={`/events/${similarEvent.id}`} className="btn-small">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default EventDetails

