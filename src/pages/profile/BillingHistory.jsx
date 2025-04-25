"use client"

import { useState } from "react"

const BillingHistory = () => {
  // Mock billing data
  const [transactions, setTransactions] = useState([
    {
      id: "1",
      date: "2025-05-15T10:30:00",
      description: "Summer Music Festival - VIP Pass (x2)",
      amount: 299.98,
      status: "completed",
      paymentMethod: "**** **** **** 4242",
      invoiceUrl: "#",
    },
    {
      id: "2",
      date: "2025-04-20T14:45:00",
      description: "Rock Concert - General Admission",
      amount: 89.99,
      status: "completed",
      paymentMethod: "**** **** **** 4242",
      invoiceUrl: "#",
    },
    {
      id: "3",
      date: "2024-12-10T09:15:00",
      description: "Jazz Night - VIP Seating",
      amount: 75.0,
      status: "completed",
      paymentMethod: "**** **** **** 5555",
      invoiceUrl: "#",
    },
    {
      id: "4",
      date: "2024-11-05T16:20:00",
      description: "Electronic Dance Music Festival",
      amount: 199.99,
      status: "refunded",
      paymentMethod: "**** **** **** 4242",
      invoiceUrl: "#",
    },
  ])

  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date-desc")

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  // Apply filters and sorting
  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === "all") return true
    return transaction.status === filter
  })

  // Apply sorting
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)

    if (sortBy === "date-desc") {
      return dateB - dateA
    } else if (sortBy === "date-asc") {
      return dateA - dateB
    } else if (sortBy === "amount-desc") {
      return b.amount - a.amount
    } else if (sortBy === "amount-asc") {
      return a.amount - b.amount
    }

    return 0
  })

  const downloadInvoice = (transaction) => {
    // In a real app, this would download the invoice
    console.log("Downloading invoice for transaction:", transaction)
    alert(`Invoice for ${transaction.description} downloaded!`)
  }

  return (
    <div className="billing-history">
      <div className="section-header">
        <h2>Billing History</h2>
      </div>

      <div className="billing-filters">
        <div className="filter-group">
          <label htmlFor="filter">Filter:</label>
          <select id="filter" value={filter} onChange={handleFilterChange} className="form-input">
            <option value="all">All Transactions</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="sortBy">Sort By:</label>
          <select id="sortBy" value={sortBy} onChange={handleSortChange} className="form-input">
            <option value="date-desc">Date (Newest First)</option>
            <option value="date-asc">Date (Oldest First)</option>
            <option value="amount-desc">Amount (Highest First)</option>
            <option value="amount-asc">Amount (Lowest First)</option>
          </select>
        </div>
      </div>

      <div className="transactions-list">
        {sortedTransactions.length > 0 ? (
          <div className="transactions-table">
            <div className="transactions-header">
              <div className="transaction-cell">Date</div>
              <div className="transaction-cell">Description</div>
              <div className="transaction-cell">Amount</div>
              <div className="transaction-cell">Status</div>
              <div className="transaction-cell">Payment Method</div>
              <div className="transaction-cell">Actions</div>
            </div>
            {sortedTransactions.map((transaction) => (
              <div key={transaction.id} className="transaction-row">
                <div className="transaction-cell">
                  {new Date(transaction.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div className="transaction-cell">{transaction.description}</div>
                <div className="transaction-cell">${transaction.amount.toFixed(2)}</div>
                <div className="transaction-cell">
                  <span className={`status-badge ${transaction.status}`}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </span>
                </div>
                <div className="transaction-cell">{transaction.paymentMethod}</div>
                <div className="transaction-cell">
                  <button className="btn-small" onClick={() => downloadInvoice(transaction)}>
                    <i className="fas fa-file-invoice"></i> Invoice
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-transactions">
            <i className="fas fa-receipt"></i>
            <h3>No Transactions Found</h3>
            <p>You don't have any billing history that matches your filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BillingHistory

