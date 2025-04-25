"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { mockEvents } from "../../data/mockData"
import "./Admin.css"

const Events = () => {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date-desc")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [eventToDelete, setEventToDelete] = useState(null)

  useEffect(() => {
    // Simulate API call
    const fetchEvents = () => {
      setTimeout(() => {
        setEvents(mockEvents)
        setFilteredEvents(mockEvents)
        setLoading(false)
      }, 800)
    }

    fetchEvents()
  }, [])

  useEffect(() => {
    // Apply filters and search
    let result = [...events]

    // Filter by status
    if (filter !== "all") {
      const now = new Date()

      if (filter === "upcoming") {
        result = result.filter((event) => new Date(event.date) > now)
      } else if (filter === "past") {
        result = result.filter((event) => new Date(event.date) < now)
      } else if (filter === "featured") {
        result = result.filter((event) => event.featured)
      }
    }

    // Apply search
    if (searchTerm) {
      result = result.filter(
        (event) =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply sorting
    if (sortBy === "date-desc") {
      result.sort((a, b) => new Date(b.date) - new Date(a.date))
    } else if (sortBy === "date-asc") {
      result.sort((a, b) => new Date(a.date) - new Date(b.date))
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name))
    } else if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price)
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

  const confirmDelete = (event) => {
    setEventToDelete(event)
    setShowDeleteModal(true)
  }

  const deleteEvent = () => {
    // In a real app, you would send a request to delete the event
    const updatedEvents = events.filter((event) => event.id !== eventToDelete.id)
    setEvents(updatedEvents)
    setShowDeleteModal(false)
    setEventToDelete(null)
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading events...</p>
      </div>
    )
  }

  return (
    <div className="admin-events">
      <div className="admin-events-header">
        <h1>Manage Events</h1>
        <Link to="/admin/events/create" className="btn">
          <i className="fas fa-plus"></i> Create Event
        </Link>
      </div>

      <div className="events-filters">
        <div className="filter-group">
          <label htmlFor="search">Search:</label>
          <input
            type="text"
            id="search"
            placeholder="Search events..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-input"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="filter">Filter By:</label>
          <select id="filter" value={filter} onChange={handleFilterChange} className="form-input">
            <option value="all">All Events</option>
            <option value="upcoming">Upcoming Events</option>
            <option value="past">Past Events</option>
            <option value="featured">Featured Events</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="sortBy">Sort By:</label>
          <select id="sortBy" value={sortBy} onChange={handleSortChange} className="form-input">
            <option value="date-desc">Date (Newest First)</option>
            <option value="date-asc">Date (Oldest First)</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="events-table">
        <div className="table-header">
          <div className="table-cell">Event</div>
          <div className="table-cell">Date</div>
          <div className="table-cell">Venue</div>
          <div className="table-cell">Price</div>
          <div className="table-cell">Status</div>
          <div className="table-cell">Actions</div>
        </div>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} className="table-row">
              <div className="table-cell">
                <div className="event-cell">
                  <img src={event.image || "/placeholder.svg"} alt={event.name} />
                  <span>{event.name}</span>
                </div>
              </div>
              <div className="table-cell">
                {new Date(event.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="table-cell">{event.venue}</div>
              <div className="table-cell">${event.price.toFixed(2)}</div>
              <div className="table-cell">
                <span className={`status-badge ${new Date(event.date) > new Date() ? "upcoming" : "past"}`}>
                  {new Date(event.date) > new Date() ? "Upcoming" : "Past"}
                </span>
              </div>
              <div className="table-cell">
                <div className="event-actions">
                  <Link to={`/admin/events/edit/${event.id}`} className="action-btn" title="Edit">
                    <i className="fas fa-edit"></i>
                  </Link>
                  <Link to={`/events/${event.id}`} className="action-btn" title="View">
                    <i className="fas fa-eye"></i>
                  </Link>
                  <button className="action-btn delete" onClick={() => confirmDelete(event)} title="Delete">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No events found matching your criteria.</p>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete the event "{eventToDelete?.name}"?</p>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn btn-danger" onClick={deleteEvent}>
                Delete
              </button>
              <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Events

