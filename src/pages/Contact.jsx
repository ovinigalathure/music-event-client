"use client"

import { useState } from "react"
import "./Contact.css"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    eventType: "",
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormError("Please fill in all required fields")
      return
    }

    // In a real app, you would send this data to your backend
    console.log("Form submitted:", formData)

    // Show success message
    setFormError("")
    setFormSubmitted(true)

    // Reset form after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        eventType: "",
      })
    }, 5000)
  }

  return (
    <div className="contact-page">
      <section className="contact-hero-section">
        <div className="container">
          <h1 className="section-title">Contact Us</h1>
          <p className="contact-intro">
            Have questions about our events or services? Want to organize your own music event? Get in touch with our
            team and we'll be happy to help.
          </p>
        </div>
      </section>

      <section className="section contact-info-section">
        <div className="container">
          <div className="contact-info-grid">
            <div className="contact-info-card">
              <i className="fas fa-map-marker-alt"></i>
              <h3>Visit Us</h3>
              <p>123 Music Street</p>
              <p>Melody City, MC 12345</p>
            </div>
            <div className="contact-info-card">
              <i className="fas fa-phone-alt"></i>
              <h3>Call Us</h3>
              <p>+1 (555) 123-4567</p>
              <p>Mon-Fri, 9am-5pm EST</p>
            </div>
            <div className="contact-info-card">
              <i className="fas fa-envelope"></i>
              <h3>Email Us</h3>
              <p>info@rhythmevents.com</p>
              <p>support@rhythmevents.com</p>
            </div>
            <div className="contact-info-card">
              <i className="fas fa-comment"></i>
              <h3>Live Chat</h3>
              <p>Available on our website</p>
              <p>Mon-Fri, 9am-5pm EST</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section contact-form-section">
        <div className="container">
          <div className="contact-form-container">
            <div className="contact-form-content">
              <h2>Send Us a Message</h2>
              <p>
                Fill out the form below and one of our team members will get back to you as soon as possible. We
                typically respond within 24-48 hours.
              </p>
              <div className="contact-social">
                <h3>Connect With Us</h3>
                <div className="social-links">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="contact-form">
              {formSubmitted ? (
                <div className="form-success-message">
                  <i className="fas fa-check-circle"></i>
                  <h3>Thank You!</h3>
                  <p>Your message has been sent successfully. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {formError && <div className="form-error">{formError}</div>}
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="eventType" className="form-label">
                        Event Type
                      </label>
                      <select
                        id="eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleInputChange}
                        className="form-input"
                      >
                        <option value="">Select Event Type</option>
                        <option value="Concert">Concert</option>
                        <option value="Festival">Festival</option>
                        <option value="Corporate Event">Corporate Event</option>
                        <option value="Private Party">Private Party</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-input"
                      rows="5"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section contact-map-section">
        <div className="container">
          <h2 className="section-title">Find Us</h2>
          <div className="contact-map">
            <img src="/placeholder.svg?height=400&width=1200" alt="Map" />
          </div>
        </div>
      </section>

      <section className="section contact-faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="contact-faq-grid">
            <div className="faq-item">
              <h3>How do I book an event?</h3>
              <p>
                You can book an event by filling out the contact form above or by calling our office directly. One of
                our event planners will guide you through the process.
              </p>
            </div>
            <div className="faq-item">
              <h3>What types of events do you organize?</h3>
              <p>
                We organize a wide range of music events including concerts, festivals, corporate events, private
                parties, and more. Contact us with your specific needs.
              </p>
            </div>
            <div className="faq-item">
              <h3>How far in advance should I book?</h3>
              <p>
                We recommend booking at least 3-6 months in advance for larger events and 1-3 months for smaller events
                to ensure availability.
              </p>
            </div>
            <div className="faq-item">
              <h3>Do you offer refunds?</h3>
              <p>
                Our refund policy varies depending on the event. Please refer to the specific event page or contact our
                support team for details.
              </p>
            </div>
          </div>
          <div className="faq-more">
            <p>Have more questions?</p>
            <a href="/faq" className="btn btn-secondary">
              View All FAQs
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact

