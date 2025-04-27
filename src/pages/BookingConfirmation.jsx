"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../context/AuthContext"
import { useNotification } from "../context/NotificationContext"
import "./BookingConfirmation.css"

const BookingConfirmation = () => {
  const { id } = useParams() // Get the ticket ID from the URL parameters
  const [bookingDetails, setBookingDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { addNotification } = useNotification()

  useEffect(() => {
    const fetchBookingDetails = async () => {
      setLoading(true)
      try {
        // Fetch booking details from the server using ticket ID and user ID
        const bookingResponse = await axios.get(`http://localhost:8080/api/tickets/${id}?userId=${user.id}`)
        const bookingData = bookingResponse.data
        setBookingDetails(bookingData)
      } catch (error) {
        console.error("Error fetching booking details:", error)
        setBookingDetails(null)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchBookingDetails()
    } else {
      addNotification({
        message: "You must be logged in to view your booking.",
        type: "error"
      })
    }
  }, [id, user, addNotification])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading booking details...</p>
      </div>
    )
  }

  if (!bookingDetails) {
    return (
      <div className="not-found-container">
        <h2>Booking Not Found</h2>
        <p>The requested booking could not be found or you are not authorized to view it.</p>
        <Link to="/events" className="btn">
          Browse Events
        </Link>
      </div>
    )
  }

  const { quantity, totalPrice, serviceFee, grandTotal } = bookingDetails

  return (
    <div className="booking-confirmation-page">
      <div className="container">
        <div className="confirmation-header">
          <h1>Booking Confirmation</h1>
          <p>Your booking has been confirmed! Here are your booking details:</p>
        </div>

        <div className="booking-details">
          <div className="ticket-info">
            <h3>Ticket Details</h3>
            <p>Ticket ID: {bookingDetails.id}</p>
            <p>Quantity: {quantity}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <p>Service Fee: ${serviceFee.toFixed(2)}</p>
            <p>Grand Total: ${grandTotal.toFixed(2)}</p>
          </div>

          <div className="confirmation-actions">
            <button className="btn primary-btn">
              <Link to="/my-bookings">View My Bookings</Link>
            </button>
            <button className="btn secondary-btn">
              <Link to="/events">Browse More Events</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingConfirmation
