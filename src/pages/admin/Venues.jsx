"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { mockVenues } from "../../data/mockData"
import "./Admin.css"

const Venues = () => {
  const [venues, setVenues] = useState([])
  const [filteredVenues, setFilteredVenues] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name-asc")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [venueToDelete, setVenueToDelete] = useState(null)

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
    // Apply search
    let result = [...venues]

    if (searchTerm) {
      result = result.filter(
        (venue) =>
          venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          venue.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply sorting
    if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name))
    } else if (sortBy === "capacity-asc") {
      result.sort((a, b) => a.capacity - b.capacity)
    } else if (sortBy === "capacity-desc") {
      result.sort((a, b) => b.capacity - a.capacity)
    } else if (sortBy === "location-asc") {
      result.sort((a, b) => a.location.localeCompare(b.location))
    } else if (sortBy === "location-desc") {
      result.sort((a, b) => b.location.localeCompare(a.location))
    }

    setFilteredVenues(result)
  }, [venues, searchTerm, sortBy])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  const confirmDelete = (venue) => {
    setVenueToDelete(venue)
    setShowDeleteModal(true)
  }

  const deleteVenue = () => {
    // In a real app, you would send a request to delete the venue
    const updatedVenues = venues.filter((venue) => venue.id !== venueToDelete.id)
    setVenues(updatedVenues)
    setShowDeleteModal(false)
    setVenueToDelete(null)
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading venues...</p>
      </div>
    )
  }

  return (
    <div className="admin-venues">
      <div className="admin-venues-header">
        <h1>Manage Venues</h1>
        <Link to="/admin/venues/create" className="btn">
          <i className="fas fa-plus"></i> Add Venue
        </Link>
      </div>

      <div className="venues-filters">
        <div className="filter-group">
          <label htmlFor="search">Search:</label>
          <input
            type="text"
            id="search"
            placeholder="Search venues..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-input"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="sortBy">Sort By:</label>
          <select id="sortBy" value={sortBy} onChange={handleSortChange} className="form-input">
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="capacity-asc">Capacity (Low to High)</option>
            <option value="capacity-desc">Capacity (High to Low)</option>
            <option value="location-asc">Location (A-Z)</option>
            <option value="location-desc">Location (Z-A)</option>
          </select>
        </div>
      </div>

      <div className="venues-grid">
        {filteredVenues.length > 0 ? (
          filteredVenues.map((venue) => (
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
                <div className="venue-actions">
                  <Link to={`/admin/venues/edit/${venue.id}`} className="btn-small">
                    <i className="fas fa-edit"></i> Edit
                  </Link>
                  <Link to={`/venues/${venue.id}`} className="btn-small">
                    <i className="fas fa-eye"></i> View
                  </Link>
                  <button className="btn-small btn-danger" onClick={() => confirmDelete(venue)}>
                    <i className="fas fa-trash-alt"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No venues found matching your criteria.</p>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete the venue "{venueToDelete?.name}"?</p>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn btn-danger" onClick={deleteVenue}>
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

export default Venues

