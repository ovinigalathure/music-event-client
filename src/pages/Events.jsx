"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import EventCard from "../components/EventCard"
import "./Events.css"

const Events = () => {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/events")
        const data = await res.json()
        setEvents(data)
        setFilteredEvents(data)
      } catch (error) {
        console.error("Failed to fetch events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()

    const urlParams = new URLSearchParams(window.location.search)
    const filterParam = urlParams.get("filter")
    if (filterParam) {
      setFilter(filterParam)
    }
  }, [])

  useEffect(() => {
    let result = [...events]
    const now = new Date()

    if (filter !== "all") {
      if (filter === "past") {
        result = result.filter((event) => new Date(event.date) < now)
      } else if (filter === "upcoming") {
        result = result.filter((event) => new Date(event.date) >= now)
      } else {
        result = result.filter((event) => event.category.toLowerCase() === filter.toLowerCase())
      }
    }

    if (searchTerm) {
      result = result.filter(
        (event) =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.venue.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (sortBy === "date") {
      result.sort((a, b) => new Date(a.date) - new Date(b.date))
    } else if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredEvents(result)
  }, [events, filter, searchTerm, sortBy])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setFilter("all")
    setSortBy("date")
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading events...</p>
      </div>
    )
  }

  return (
    <div className="events-page">
      <section className="events-hero-section">
        <div className="container4">
          <h1 className="section-title2">Explore Events</h1>
          <p className="events-intro">
            Discover and book tickets for the best music events in your area. Use the filters below to find the perfect
            event for you.
          </p>
        </div>
      </section>

      <section className="section events-filter-section">
        <div className="container11">
          <div className="events-filters">
            <div className="search-filter">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="form-input"
              />
              <i className="fas fa-search"></i>
            </div>
            <div className="filter-controls">
              <div className="filter-group">
                <label htmlFor="filter">Filter By:</label>
                <select id="filter" value={filter} onChange={handleFilterChange} className="form-input">
                  <option value="all">All Events</option>
                  <option value="upcoming">Upcoming Events</option>
                  <option value="past">Past Events</option>
                  <option value="festival">Festivals</option>
                  <option value="concert">Concerts</option>
                  <option value="jazz">Jazz</option>
                  <option value="rock">Rock</option>
                  <option value="electronic">Electronic</option>
                  <option value="classical">Classical</option>
                  <option value="country">Country</option>
                  <option value="hip hop">Hip Hop</option>
                </select>
              </div>
              <div className="filter-group">
                <label htmlFor="sort">Sort By:</label>
                <select id="sort" value={sortBy} onChange={handleSortChange} className="form-input">
                  <option value="date">Date (Soonest)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>
              <button className="btn-small2" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          </div>

          <div className="events-results">
            <p className="results-count">
              {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"} found
            </p>

            {filteredEvents.length > 0 ? (
              <div className="grid grid-3">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="no-events-found">
                <i className="fas fa-calendar-times"></i>
                <h3>No Events Found</h3>
                <p>Try adjusting your filters or search criteria.</p>
                <button className="btn" onClick={clearFilters}>
                  View All Events
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section events-cta-section">
        <div className="container11">
          <div className="events-cta">
            <div className="cta-content">
              <h2>Can't Find What You're Looking For?</h2>
              <p>Contact us to request a specific type of event or to organize your own music event.</p>
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

export default Events
