"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { mockVenues } from "../data/mockData"
import "./Venues.css"

const Venues = () => {
  const [venues, setVenues] = useState([])
  const [filteredVenues, setFilteredVenues] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Simulate API call
    const fetchVenues = () => {
      setTimeout(() => {
        setVenues(mockVenues)
        setFilteredVenues(mockVenues)
        setLoading(false)
      }, 800)
    }

    fetchVenues()
  }, [])

  useEffect(() => {
    // Apply search filter
    if (searchTerm) {
      const filtered = venues.filter(
        (venue) =>
          venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          venue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          venue.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredVenues(filtered)
    } else {
      setFilteredVenues(venues)
    }
  }, [venues, searchTerm])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading venues...</p>
      </div>
    )
  }

  return (
    <div className="venues-page">
      <section className="venues-hero-section">
        <div className="container">
          <h1 className="section-title">Explore Venues</h1>
          <p className="venues-intro">
            Discover the best music venues for your next event experience. From intimate jazz clubs to massive arenas,
            find the perfect venue.
          </p>
          <div className="venues-search">
            <input
              type="text"
              placeholder="Search venues by name or location..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="form-input"
            />
            <i className="fas fa-search"></i>
          </div>
        </div>
      </section>

      <section className="section venues-list-section">
        <div className="container">
          {filteredVenues.length > 0 ? (
            <div className="venues-grid">
              {filteredVenues.map((venue) => (
                <div key={venue.id} className="venue-card">
                  <div className="venue-image">
                    <img src={venue.image || "/placeholder.svg"} alt={venue.name} />
                    <div className="venue-capacity">
                      <i className="fas fa-users"></i> {venue.capacity.toLocaleString()} capacity
                    </div>
                  </div>
                  <div className="venue-content">
                    <h3>{venue.name}</h3>
                    <p className="venue-location">
                      <i className="fas fa-map-marker-alt"></i> {venue.location}
                    </p>
                    <p className="venue-description">{venue.description.substring(0, 100)}...</p>
                    <div className="venue-amenities">
                      {venue.amenities.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="venue-amenity">
                          {amenity}
                        </span>
                      ))}
                      {venue.amenities.length > 3 && (
                        <span className="venue-amenity">+{venue.amenities.length - 3} more</span>
                      )}
                    </div>
                    <Link to={`/venues/${venue.id}`} className="btn-small">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-venues-found">
              <i className="fas fa-building"></i>
              <h3>No Venues Found</h3>
              <p>Try adjusting your search criteria.</p>
              <button className="btn" onClick={() => setSearchTerm("")}>
                View All Venues
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="section venues-cta-section">
        <div className="container">
          <div className="venues-cta">
            <div className="cta-content">
              <h2>Looking for a Venue for Your Event?</h2>
              <p>We can help you find and book the perfect venue for your music event.</p>
            </div>
            <Link to="/contact" className="btn">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Venues

