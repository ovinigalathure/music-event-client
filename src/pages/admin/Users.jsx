"use client"

import { useState, useEffect } from "react"
import "./Admin.css"

const Users = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name-asc")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)

  useEffect(() => {
    // Simulate API call
    const fetchUsers = () => {
      setTimeout(() => {
        // Generate mock user data
        const mockUsers = Array.from({ length: 50 }, (_, i) => {
          const id = (i + 1).toString()
          const firstName = ["John", "Jane", "Michael", "Emily", "David", "Sarah", "Robert", "Lisa"][
            Math.floor(Math.random() * 8)
          ]
          const lastName = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia"][
            Math.floor(Math.random() * 8)
          ]
          const name = `${firstName} ${lastName}`
          const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`
          const registrationDate = new Date()
          registrationDate.setDate(registrationDate.getDate() - Math.floor(Math.random() * 365))

          return {
            id,
            name,
            email,
            registrationDate: registrationDate.toISOString(),
            lastLogin: new Date(
              registrationDate.getTime() + Math.random() * (new Date() - registrationDate),
            ).toISOString(),
            role: Math.random() > 0.9 ? "admin" : "user",
            status: Math.random() > 0.1 ? "active" : "inactive",
          }
        })

        setUsers(mockUsers)
        setFilteredUsers(mockUsers)
        setLoading(false)
      }, 800)
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    // Apply filters and search
    let result = [...users]

    // Filter by role or status
    if (filter !== "all") {
      if (filter === "admin" || filter === "user") {
        result = result.filter((user) => user.role === filter)
      } else if (filter === "active" || filter === "inactive") {
        result = result.filter((user) => user.status === filter)
      }
    }

    // Apply search
    if (searchTerm) {
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply sorting
    if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name))
    } else if (sortBy === "email-asc") {
      result.sort((a, b) => a.email.localeCompare(b.email))
    } else if (sortBy === "email-desc") {
      result.sort((a, b) => b.email.localeCompare(a.email))
    } else if (sortBy === "date-asc") {
      result.sort((a, b) => new Date(a.registrationDate) - new Date(b.registrationDate))
    } else if (sortBy === "date-desc") {
      result.sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
    }

    setFilteredUsers(result)
  }, [users, filter, searchTerm, sortBy])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  const confirmDelete = (user) => {
    setUserToDelete(user)
    setShowDeleteModal(true)
  }

  const deleteUser = () => {
    // In a real app, you would send a request to delete the user
    const updatedUsers = users.filter((user) => user.id !== userToDelete.id)
    setUsers(updatedUsers)
    setShowDeleteModal(false)
    setUserToDelete(null)
  }

  const toggleUserStatus = (userId) => {
    // In a real app, you would send a request to update the user status
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === "active" ? "inactive" : "active",
        }
      }
      return user
    })

    setUsers(updatedUsers)
  }

  const toggleUserRole = (userId) => {
    // In a real app, you would send a request to update the user role
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          role: user.role === "admin" ? "user" : "admin",
        }
      }
      return user
    })

    setUsers(updatedUsers)
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading users...</p>
      </div>
    )
  }

  return (
    <div className="admin-users">
      <div className="admin-users-header">
        <h1>User Management</h1>
        <button className="btn">
          <i className="fas fa-plus"></i> Add User
        </button>
      </div>

      <div className="users-filters">
        <div className="filter-group">
          <label htmlFor="search">Search:</label>
          <input
            type="text"
            id="search"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-input"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="filter">Filter By:</label>
          <select id="filter" value={filter} onChange={handleFilterChange} className="form-input">
            <option value="all">All Users</option>
            <option value="admin">Admins</option>
            <option value="user">Regular Users</option>
            <option value="active">Active Users</option>
            <option value="inactive">Inactive Users</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="sortBy">Sort By:</label>
          <select id="sortBy" value={sortBy} onChange={handleSortChange} className="form-input">
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="email-asc">Email (A-Z)</option>
            <option value="email-desc">Email (Z-A)</option>
            <option value="date-desc">Registration (Newest First)</option>
            <option value="date-asc">Registration (Oldest First)</option>
          </select>
        </div>
      </div>

      <div className="users-table">
        <div className="table-header">
          <div className="table-cell">Name</div>
          <div className="table-cell">Email</div>
          <div className="table-cell">Registration Date</div>
          <div className="table-cell">Last Login</div>
          <div className="table-cell">Role</div>
          <div className="table-cell">Status</div>
          <div className="table-cell">Actions</div>
        </div>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.id} className="table-row">
              <div className="table-cell">{user.name}</div>
              <div className="table-cell">{user.email}</div>
              <div className="table-cell">
                {new Date(user.registrationDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="table-cell">
                {new Date(user.lastLogin).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="table-cell">
                <span
                  className={`role-badge ${user.role}`}
                  onClick={() => toggleUserRole(user.id)}
                  title="Click to change role"
                >
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </div>
              <div className="table-cell">
                <span
                  className={`status-badge ${user.status}`}
                  onClick={() => toggleUserStatus(user.id)}
                  title="Click to change status"
                >
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
              </div>
              <div className="table-cell">
                <div className="user-actions">
                  <button className="action-btn" title="Edit">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="action-btn delete" onClick={() => confirmDelete(user)} title="Delete">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No users found matching your criteria.</p>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete the user "{userToDelete?.name}"?</p>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn btn-danger" onClick={deleteUser}>
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

export default Users

