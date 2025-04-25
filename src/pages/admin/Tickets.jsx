"use client"

import { useState, useEffect } from "react"
import { mockEvents } from "../../data/mockData"
import "./Admin.css"

const Tickets = () => {
  const [ticketSales, setTicketSales] = useState([])
  const [filteredSales, setFilteredSales] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  })

  useEffect(() => {
    // Simulate API call
    const fetchTicketSales = () => {
      setTimeout(() => {
        // Generate mock ticket sales data based on events
        const sales = mockEvents.flatMap((event) => {
          // Generate between 5-15 sales per event
          const salesCount = Math.floor(Math.random() * 10) + 5

          return Array.from({ length: salesCount }, (_, i) => {
            const saleDate = new Date(event.date)
            saleDate.setDate(saleDate.getDate() - Math.floor(Math.random() * 30) - 1)

            const ticketTypes = ["General Admission", "VIP", "Early Bird", "Group Package"]
            const ticketType = ticketTypes[Math.floor(Math.random() * ticketTypes.length)]

            const quantity = Math.floor(Math.random() * 4) + 1
            const price = event.price * (ticketType === "VIP" ? 2 : ticketType === "Group Package" ? 0.8 : 1)

            return {
              id: `${event.id}-${i}`,
              eventId: event.id,
              eventName: event.name,
              eventDate: event.date,
              purchaseDate: saleDate.toISOString(),
              customerName: `Customer ${i + 1}`,
              customerEmail: `customer${i + 1}@example.com`,
              ticketType,
              quantity,
              price,
              total: price * quantity,
              status: Math.random() > 0.1 ? "completed" : "refunded",
            }
          })
        })

        // Sort by purchase date (newest first)
        sales.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate))

        setTicketSales(sales)
        setFilteredSales(sales)
        setLoading(false)
      }, 800)
    }

    fetchTicketSales()
  }, [])

  useEffect(() => {
    // Apply filters and search
    let result = [...ticketSales]

    // Filter by status
    if (filter !== "all") {
      result = result.filter((sale) => sale.status === filter)
    }

    // Apply date range filter
    if (dateRange.startDate) {
      const startDate = new Date(dateRange.startDate)
      result = result.filter((sale) => new Date(sale.purchaseDate) >= startDate)
    }

    if (dateRange.endDate) {
      const endDate = new Date(dateRange.endDate)
      endDate.setHours(23, 59, 59, 999) // End of day
      result = result.filter((sale) => new Date(sale.purchaseDate) <= endDate)
    }

    // Apply search
    if (searchTerm) {
      result = result.filter(
        (sale) =>
          sale.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sale.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sale.ticketType.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredSales(result)
  }, [ticketSales, filter, dateRange, searchTerm])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const handleDateChange = (e) => {
    const { name, value } = e.target
    setDateRange({
      ...dateRange,
      [name]: value,
    })
  }

  const getTotalRevenue = () => {
    return filteredSales
      .filter((sale) => sale.status === "completed")
      .reduce((total, sale) => total + sale.total, 0)
      .toFixed(2)
  }

  const getTotalTickets = () => {
    return filteredSales.filter((sale) => sale.status === "completed").reduce((total, sale) => total + sale.quantity, 0)
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading ticket sales...</p>
      </div>
    )
  }

  return (
    <div className="admin-tickets">
      <div className="admin-tickets-header">
        <h1>Ticket Sales</h1>
      </div>

      <div className="tickets-summary">
        <div className="summary-card">
          <h3>Total Revenue</h3>
          <p className="summary-value">${getTotalRevenue()}</p>
        </div>
        <div className="summary-card">
          <h3>Tickets Sold</h3>
          <p className="summary-value">{getTotalTickets()}</p>
        </div>
        <div className="summary-card">
          <h3>Total Orders</h3>
          <p className="summary-value">{filteredSales.filter((sale) => sale.status === "completed").length}</p>
        </div>
      </div>

      <div className="tickets-filters">
        <div className="filter-group">
          <label htmlFor="search">Search:</label>
          <input
            type="text"
            id="search"
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-input"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="filter">Status:</label>
          <select id="filter" value={filter} onChange={handleFilterChange} className="form-input">
            <option value="all">All Orders</option>
            <option value="completed">Completed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="startDate">From:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={dateRange.startDate}
            onChange={handleDateChange}
            className="form-input"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="endDate">To:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={dateRange.endDate}
            onChange={handleDateChange}
            className="form-input"
          />
        </div>
      </div>

      <div className="tickets-table">
        <div className="table-header">
          <div className="table-cell">Order ID</div>
          <div className="table-cell">Event</div>
          <div className="table-cell">Customer</div>
          <div className="table-cell">Purchase Date</div>
          <div className="table-cell">Ticket Type</div>
          <div className="table-cell">Quantity</div>
          <div className="table-cell">Total</div>
          <div className="table-cell">Status</div>
        </div>
        {filteredSales.length > 0 ? (
          filteredSales.map((sale) => (
            <div key={sale.id} className="table-row">
              <div className="table-cell">{sale.id}</div>
              <div className="table-cell">{sale.eventName}</div>
              <div className="table-cell">
                <div>
                  <div>{sale.customerName}</div>
                  <div className="email">{sale.customerEmail}</div>
                </div>
              </div>
              <div className="table-cell">
                {new Date(sale.purchaseDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="table-cell">{sale.ticketType}</div>
              <div className="table-cell">{sale.quantity}</div>
              <div className="table-cell">${sale.total.toFixed(2)}</div>
              <div className="table-cell">
                <span className={`status-badge ${sale.status}`}>
                  {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No ticket sales found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tickets

