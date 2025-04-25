"use client"

import { useState } from "react"
import { mockTeamMembers } from "../data/mockData"
import "./MeetTheTeam.css"

const MeetTheTeam = () => {
  const [selectedMember, setSelectedMember] = useState(null)
  const [requestForm, setRequestForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    message: "",
    selectedPlanner: "",
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleMemberClick = (member) => {
    setSelectedMember(member)
    setRequestForm({
      ...requestForm,
      selectedPlanner: member.name,
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setRequestForm({
      ...requestForm,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    console.log("Form submitted:", requestForm)

    // Show success message
    setFormSubmitted(true)

    // Reset form after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false)
      setRequestForm({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        eventDate: "",
        message: "",
        selectedPlanner: selectedMember ? selectedMember.name : "",
      })
    }, 5000)
  }

  return (
    <div className="meet-team-page">
      <section className="team-hero-section">
        <div className="container">
          <h1 className="section-title">Meet Our Team</h1>
          <p className="team-intro">
            Our team of experienced event planners is dedicated to creating unforgettable music experiences. Get to know
            the people who will bring your event to life.
          </p>
        </div>
      </section>

      <section className="section team-members-section">
        <div className="container">
          <div className="grid grid-3">
            {mockTeamMembers.map((member) => (
              <div
                key={member.id}
                className={`team-member-card ${selectedMember?.id === member.id ? "selected" : ""}`}
                onClick={() => handleMemberClick(member)}
              >
                <div className="team-member-image">
                  <img src={member.image || "/placeholder.svg"} alt={member.name} />
                </div>
                <div className="team-member-info">
                  <h3>{member.name}</h3>
                  <p className="team-member-position">{member.position}</p>
                  <div className="team-member-specialties">
                    {member.specialties.map((specialty, index) => (
                      <span key={index} className="specialty-tag">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedMember && (
        <section className="section team-member-details-section">
          <div className="container">
            <div className="team-member-details">
              <div className="team-member-bio">
                <h2>{selectedMember.name}</h2>
                <p className="team-member-position">{selectedMember.position}</p>
                <p className="team-member-bio-text">{selectedMember.bio}</p>
                <div className="team-member-contact">
                  <p>
                    <strong>Contact:</strong> {selectedMember.contact}
                  </p>
                  <div className="team-member-social">
                    <a
                      href={selectedMember.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <i className="fab fa-linkedin"></i>
                    </a>
                    <a
                      href={selectedMember.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="team-member-request">
                <h3>Request {selectedMember.name} for Your Event</h3>
                {formSubmitted ? (
                  <div className="form-success-message">
                    <i className="fas fa-check-circle"></i>
                    <p>Thank you for your request! {selectedMember.name} will contact you soon.</p>
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
                        value={requestForm.name}
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
                        value={requestForm.email}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={requestForm.phone}
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
                        value={requestForm.eventType}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      >
                        <option value="">Select Event Type</option>
                        <option value="Concert">Concert</option>
                        <option value="Festival">Festival</option>
                        <option value="Corporate Event">Corporate Event</option>
                        <option value="Private Party">Private Party</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="eventDate" className="form-label">
                        Tentative Event Date
                      </label>
                      <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={requestForm.eventDate}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message" className="form-label">
                        Your Requirements
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={requestForm.message}
                        onChange={handleInputChange}
                        className="form-input"
                        rows="5"
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn">
                      Submit Request
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section team-cta-section">
        <div className="container">
          <div className="team-cta">
            <h2>Ready to Plan Your Next Music Event?</h2>
            <p>Our team of experts is ready to help you create an unforgettable experience.</p>
            <a href="#" className="btn">
              Contact Us Today
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MeetTheTeam

