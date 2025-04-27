"use client"

import { useState } from "react"
import { mockFAQs } from "../data/mockData"
import "./FAQ.css"

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState(null)

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setContactForm({
      ...contactForm,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)
    try {
      const response = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      })
      if (!response.ok) {
        throw new Error("Failed to submit form. Please try again later.")
      }
      setFormSubmitted(true)
      setTimeout(() => {
        setFormSubmitted(false)
        setContactForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      }, 5000)
    } catch (error) {
      setFormError(error.message)
    }
  }

  const filteredFAQs = mockFAQs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="faq-page">
      <section className="faq-hero-section">
        <div className="container">
          <h1 className="section-title">Frequently Asked Questions</h1>
          <p className="faq-intro">
            Find answers to common questions about our events, tickets, venues, and more. If you can't find what you're
            looking for, feel free to contact us directly.
          </p>
          <div className="faq-search">
            <input
              type="text"
              placeholder="Search for questions..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="form-input"
            />
            <i className="fas fa-search"></i>
          </div>
        </div>
      </section>

      <section className="section faq-content-section">
        <div className="container">
          <div className="faq-container">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <div key={faq.id} className={`faq-item ${activeIndex === index ? "active" : ""}`}>
                  <div className="faq-question" onClick={() => toggleFAQ(index)}>
                    <h3>{faq.question}</h3>
                    <span className="faq-icon">
                      <i className={`fas fa-chevron-${activeIndex === index ? "up" : "down"}`}></i>
                    </span>
                  </div>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <i className="fas fa-search"></i>
                <p>No results found for "{searchTerm}"</p>
                <p>Try different keywords or contact us directly with your question.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section faq-contact-section">
        <div className="container">
          <div className="faq-contact">
            <div className="faq-contact-info">
              <h2>Still Have Questions?</h2>
              <p>
                If you couldn't find the answer to your question, please feel free to contact us directly. Our support
                team is here to help!
              </p>
              <div className="contact-methods">
                <div className="contact-method">
                  <i className="fas fa-envelope"></i>
                  <h3>Email Us</h3>
                  <p>support@rhythmevents.com</p>
                </div>
                <div className="contact-method">
                  <i className="fas fa-phone-alt"></i>
                  <h3>Call Us</h3>
                  <p>(555) 123-4567</p>
                </div>
                <div className="contact-method">
                  <i className="fas fa-comment-alt"></i>
                  <h3>Live Chat</h3>
                  <p>Available 9am-5pm EST</p>
                </div>
              </div>
            </div>
            <div className="faq-contact-form">
              <h2>Send Us a Message</h2>
              {formSubmitted ? (
                <div className="form-success-message">
                  <i className="fas fa-check-circle"></i>
                  <p>Thank you for your message! We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={contactForm.message}
                      onChange={handleInputChange}
                      className="form-input"
                      rows="5"
                      required
                    ></textarea>
                  </div>
                  {formError && (
                    <div className="form-error-message">
                      <i className="fas fa-exclamation-circle"></i>
                      <p>{formError}</p>
                    </div>
                  )}
                  <button type="submit" className="btn">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FAQ
