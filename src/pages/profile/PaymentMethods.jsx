"use client"

import { useState } from "react"

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "1",
      type: "credit",
      cardNumber: "**** **** **** 4242",
      expiryDate: "12/25",
      cardHolder: "John Doe",
      isDefault: true,
    },
    {
      id: "2",
      type: "credit",
      cardNumber: "**** **** **** 5555",
      expiryDate: "09/24",
      cardHolder: "John Doe",
      isDefault: false,
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    isDefault: false,
  })

  const [successMessage, setSuccessMessage] = useState("")

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewCard({
      ...newCard,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // In a real app, you would send this data to your backend
    const newPaymentMethod = {
      id: Date.now().toString(),
      type: "credit",
      cardNumber: `**** **** **** ${newCard.cardNumber.slice(-4)}`,
      expiryDate: newCard.expiryDate,
      cardHolder: newCard.cardHolder,
      isDefault: newCard.isDefault,
    }

    // If new card is default, update other cards
    let updatedPaymentMethods = [...paymentMethods]
    if (newCard.isDefault) {
      updatedPaymentMethods = updatedPaymentMethods.map((method) => ({
        ...method,
        isDefault: false,
      }))
    }

    // Add new card
    setPaymentMethods([...updatedPaymentMethods, newPaymentMethod])

    // Reset form
    setNewCard({
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
      isDefault: false,
    })

    // Hide form
    setShowAddForm(false)

    // Show success message
    setSuccessMessage("Payment method added successfully!")

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  const setDefaultPaymentMethod = (id) => {
    const updatedPaymentMethods = paymentMethods.map((method) => ({
      ...method,
      isDefault: method.id === id,
    }))

    setPaymentMethods(updatedPaymentMethods)

    // Show success message
    setSuccessMessage("Default payment method updated!")

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  const deletePaymentMethod = (id) => {
    // Check if trying to delete default payment method
    const isDefault = paymentMethods.find((method) => method.id === id)?.isDefault

    if (isDefault && paymentMethods.length > 1) {
      alert("You cannot delete your default payment method. Please set another card as default first.")
      return
    }

    const updatedPaymentMethods = paymentMethods.filter((method) => method.id !== id)

    // If we deleted the only card, there's no need to set a new default
    if (updatedPaymentMethods.length > 0 && isDefault) {
      updatedPaymentMethods[0].isDefault = true
    }

    setPaymentMethods(updatedPaymentMethods)

    // Show success message
    setSuccessMessage("Payment method deleted!")

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  return (
    <div className="payment-methods">
      <div className="section-header">
        <h2>Payment Methods</h2>
        <button className="btn-small" onClick={() => setShowAddForm(!showAddForm)}>
          <i className="fas fa-plus"></i> Add New
        </button>
      </div>

      {successMessage && (
        <div className="success-message">
          <i className="fas fa-check-circle"></i> {successMessage}
        </div>
      )}

      {showAddForm && (
        <div className="add-payment-form">
          <h3>Add New Payment Method</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="cardNumber" className="form-label">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={newCard.cardNumber}
                onChange={handleInputChange}
                className="form-input"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cardHolder" className="form-label">
                  Card Holder
                </label>
                <input
                  type="text"
                  id="cardHolder"
                  name="cardHolder"
                  value={newCard.cardHolder}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="expiryDate" className="form-label">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={newCard.expiryDate}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="MM/YY"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cvv" className="form-label">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={newCard.cvv}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="123"
                  required
                />
              </div>
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="isDefault"
                  name="isDefault"
                  checked={newCard.isDefault}
                  onChange={handleInputChange}
                />
                <label htmlFor="isDefault">Set as default payment method</label>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn">
                Add Payment Method
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="payment-methods-list">
        {paymentMethods.length > 0 ? (
          paymentMethods.map((method) => (
            <div key={method.id} className={`payment-method-card ${method.isDefault ? "default" : ""}`}>
              <div className="card-icon">
                {method.type === "credit" ? <i className="far fa-credit-card"></i> : <i className="fab fa-paypal"></i>}
              </div>
              <div className="card-details">
                <h3>{method.cardNumber}</h3>
                <p>Expires: {method.expiryDate}</p>
                <p>{method.cardHolder}</p>
                {method.isDefault && <span className="default-badge">Default</span>}
              </div>
              <div className="card-actions">
                {!method.isDefault && (
                  <button
                    className="action-btn"
                    onClick={() => setDefaultPaymentMethod(method.id)}
                    title="Set as default"
                  >
                    <i className="fas fa-star"></i>
                  </button>
                )}
                <button className="action-btn delete" onClick={() => deletePaymentMethod(method.id)} title="Delete">
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-payment-methods">
            <i className="far fa-credit-card"></i>
            <h3>No Payment Methods</h3>
            <p>You haven't added any payment methods yet.</p>
            <button className="btn" onClick={() => setShowAddForm(true)}>
              Add Payment Method
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentMethods

