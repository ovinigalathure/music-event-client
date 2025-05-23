"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { mockVenues, mockEvents } from "../data/mockData"
import "./VenueDetails.css"

const VenueDetails = () => {
  const { id } = useParams()
  const [venue, setVenue] = useState(null)
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState("")
  const [activeTab, setActiveTab] = useState("about")

  const uploadsBase = "http://localhost:8080/uploads/";

  useEffect(() => {
    // Simulate API call
    const fetchVenue = async () => {
      setLoading(true)
      try {
        const response = await fetch(`http://localhost:8080/api/venues/${id}`)
        const venueData = await response.json()
        setVenue(venueData)
        setActiveImage(venueData.imageUrl ? `${uploadsBase}${venueData.imageUrl}` : "/placeholder.svg")

        // Get upcoming events for this venue
        if (venueData.upcoming_events && venueData.upcoming_events.length > 0) {
          const eventsResponse = await fetch(`http://localhost:8080/api/events?ids=${venueData.upcoming_events.join(",")}`)
          const eventsData = await eventsResponse.json()
          setUpcomingEvents(eventsData)
        }
      } catch (error) {
        console.error("Error fetching venue details:", error)
        setVenue(null)
      } finally {
        setLoading(false)
      }
    }

    fetchVenue()

    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [id])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleImageClick = (image) => {
    setActiveImage(image)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading venue details...</p>
      </div>
    )
  }

  if (!venue) {
    return (
      <div className="not-found-container">
        <h2>Venue Not Found</h2>
        <p>The venue you're looking for doesn't exist or has been removed.</p>
        <Link to="/venues" className="btn">
          Browse Venues
        </Link>
      </div>
    )
  }

  // Ensure gallery is an array, or fallback to an empty array if undefined or not an array
  const gallery = Array.isArray(venue.gallery) ? venue.gallery : [];

  return (
    <div className="venue-details-page">
      <div className="venue-header">
        <div className="container1">
          <div className="venue-header-content">
            <h1>{venue.name}</h1>
            <p className="venue-location">
              <i className="fas fa-map-marker-alt"></i> {venue.city}, {venue.state}
            </p>
          </div>
        </div>
      </div>

      <div className="container11">
        <div className="venue-details-content">
          <div className="venue-main">
            <div className="venue-gallery">
              <div className="venue-main-image">
                <img src={activeImage || "/placeholder.svg"} alt={venue.name} />
              </div>
              <div className="venue-thumbnails">
                {[venue.imageUrl, ...gallery].map((image, index) => (
                  <div
                    key={index}
                    className={`venue-thumbnail ${activeImage === image ? "active" : ""}`}
                    onClick={() => handleImageClick(image ? `${uploadsBase}${image}` : "/placeholder.svg")}
                  >
                    <img src={image ? `${uploadsBase}${image}` : "/placeholder.svg"} alt={`${venue.name} - ${index}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="venue-tabs">
              <div className="tabs-header">
                <button
                  className={`tab-btn ${activeTab === "about" ? "active" : ""}`}
                  onClick={() => handleTabChange("about")}
                >
                  About
                </button>
                <button
                  className={`tab-btn ${activeTab === "amenities" ? "active" : ""}`}
                  onClick={() => handleTabChange("amenities")}
                >
                  Amenities
                </button>
                <button
                  className={`tab-btn ${activeTab === "events" ? "active" : ""}`}
                  onClick={() => handleTabChange("events")}
                >
                  Upcoming Events
                </button>
              </div>
              <div className="tabs-content">
                {activeTab === "about" && (
                  <div className="tab-pane">
                    <h2>About This Venue</h2>
                    <p>{venue.description}</p>
                    <div className="venue-capacity-info">
                      <h3>Capacity</h3>
                      <p>
                        <i className="fas fa-users"></i> {venue.capacity.toLocaleString()} people
                      </p>
                    </div>
                    <div className="venue-location-info">
                      <h3>Location</h3>
                      <p>
                        <i className="fas fa-map-marker-alt"></i> {venue.city}, {venue.state}
                      </p>
                      <div className="venue-map">
                        <img src="/placeholder.svg?height=300&width=600" alt="Venue Map" />
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "amenities" && (
                  <div className="tab-pane">
                    <h2>Venue Amenities</h2>
                    <div className="amenities-list">
                      {venue.amenities.map((amenity, index) => (
                        <div key={index} className="amenity-item">
                          <i className="fas fa-check-circle"></i>
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                    <div className="venue-policies">
                      <h3>Venue Policies</h3>
                      <div className="policy-item">
                        <h4>Age Restrictions</h4>
                        <p>Varies by event. Please check individual event details.</p>
                      </div>
                      <div className="policy-item">
                        <h4>Prohibited Items</h4>
                        <p>Outside food and drinks, professional cameras, weapons, illegal substances.</p>
                      </div>
                      <div className="policy-item">
                        <h4>Accessibility</h4>
                        <p>This venue is wheelchair accessible. Service animals are welcome.</p>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "events" && (
                  <div className="tab-pane">
                    <h2>Upcoming Events at {venue.name}</h2>
                    {upcomingEvents.length > 0 ? (
                      <div className="venue-events-list">
                        {upcomingEvents.map((event) => (
                          <div key={event.id} className="venue-event-card">
                            <div className="venue-event-image">
                              <img src={event.image || "/placeholder.svg"} alt={event.name} />
                            </div>
                            <div className="venue-event-info">
                              <h3>{event.name}</h3>
                              <p className="venue-event-date">
                                <i className="fas fa-calendar-alt"></i>
                                {new Date(event.date).toLocaleDateString("en-US", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                              <p className="venue-event-time">
                                <i className="fas fa-clock"></i>
                                {new Date(event.date).toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                              <p className="venue-event-price">
                                <i className="fas fa-ticket-alt"></i> Starting at ${event.price.toFixed(2)}
                              </p>
                              <Link to={`/events/${event.id}`} className="btn-small">
                                View Event
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-events-message">
                        <p>No upcoming events scheduled at this venue.</p>
                        <Link to="/events" className="btn-small">
                          Browse All Events
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="venue-sidebar">
            <div className="venue-info-card">
              <h3>Venue Information</h3>
              <div className="venue-info-item">
                <i className="fas fa-users"></i>
                <div>
                  <h4>Capacity</h4>
                  <p>{venue.capacity.toLocaleString()} people</p>
                </div>
              </div>
              <div className="venue-info-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h4>Address</h4>
                  <p>{venue.location}</p>
                </div>
              </div>
              <div className="venue-info-item">
                <i className="fas fa-phone"></i>
                <div>
                  <h4>Contact</h4>
                  <p>(555) 123-4567</p>
                </div>
              </div>
              <div className="venue-info-item">
                <i className="fas fa-envelope"></i>
                <div>
                  <h4>Email</h4>
                  <p>info@{venue.name.toLowerCase().replace(/\s+/g, "")}venue.com</p>
                </div>
              </div>
              <Link to="/contact" className="btn venue-contact-btn">
                Contact About This Venue
              </Link>
            </div>

            <div className="venue-cta-card">
              <h3>Planning an Event?</h3>
              <p>Interested in hosting your music event at this venue? We can help you with the booking process.</p>
              <Link to="/meet-the-team" className="btn">
                Meet Our Team
              </Link>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  )
}

export default VenueDetails
