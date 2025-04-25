"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import EventCard from "../components/EventCard"
import Countdown from "../components/Countdown"
import { mockEvents, mockArtists } from "../data/mockData"
import "./Home.css"

const Home = () => {
  const [featuredEvents, setFeaturedEvents] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [pastEvents, setPastEvents] = useState([])
  const [nextEvent, setNextEvent] = useState(null)
  const [featuredArtists, setFeaturedArtists] = useState([])
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscribeMessage, setSubscribeMessage] = useState("")

  useEffect(() => {
    // Simulate API calls
    const loadData = () => {
      // Get current date for comparison
      const now = new Date()

      // Filter events
      const upcoming = mockEvents
        .filter((event) => new Date(event.date) > now)
        .sort((a, b) => new Date(a.date) - new Date(b.date))

      const past = mockEvents
        .filter((event) => new Date(event.date) < now)
        .sort((a, b) => new Date(b.date) - new Date(a.date))

      // Set next event (closest upcoming)
      setNextEvent(upcoming.length > 0 ? upcoming[0] : null)

      // Set featured events (random selection)
      const featured = [...mockEvents].sort(() => 0.5 - Math.random()).slice(0, 3)

      setFeaturedEvents(featured)
      setUpcomingEvents(upcoming.slice(0, 6))
      setPastEvents(past.slice(0, 3))

      // Set featured artists
      setFeaturedArtists(mockArtists.slice(0, 4))
    }

    loadData()
  }, [])

  const handleSubscribe = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubscribeMessage("Thank you for subscribing to our newsletter!")
      setEmail("")

      // Clear message after 5 seconds
      setTimeout(() => {
        setSubscribeMessage("")
      }, 5000)
    }, 1500)
  }

  return (
<div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="slide-in-left">Experience the Magic of Live Music</h1>
          <p className="slide-in-left">
            Discover, book, and enjoy the best music events in your area
          </p>
          <div className="hero-buttons slide-in-left">
            <Link to="/events" className="btn">
              Explore Events
            </Link>
            <Link to="/about" className="btn btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    
      {/* Next Event Countdown */}
      {nextEvent && (
        <section className="countdown-section">
          <div className="container">
            <div className="countdown-wrapper">
              <div className="countdown-info">
                <h2>Next Event</h2>
                <h3>{nextEvent.name}</h3>
                <p>
                  <i className="fas fa-map-marker-alt"></i> {nextEvent.venue}
                </p>
                <p>
                  <i className="fas fa-calendar-alt"></i>{" "}
                  {new Date(nextEvent.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <Link to={`/events/${nextEvent.id}`} className="btn">
                  Get Tickets
                </Link>
              </div>
              <div className="countdown-timer">
                <Countdown targetDate={nextEvent.date} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Events */}
      <section className="section featured-events-section">
        <div className="container">
          <h2 className="section-title">Featured Events</h2>
          <div className="grid grid-3">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/events" className="btn">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section how-it-works-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-icon">
                <i className="fas fa-search"></i>
              </div>
              <h3>Discover</h3>
              <p>Find amazing music events happening near you</p>
            </div>
            <div className="step">
              <div className="step-icon">
                <i className="fas fa-ticket-alt"></i>
              </div>
              <h3>Book</h3>
              <p>Secure your tickets with our easy booking system</p>
            </div>
            <div className="step">
              <div className="step-icon">
                <i className="fas fa-music"></i>
              </div>
              <h3>Experience</h3>
              <p>Enjoy the event and create lasting memories</p>
            </div>
            <div className="step">
              <div className="step-icon">
                <i className="fas fa-star"></i>
              </div>
              <h3>Share</h3>
              <p>Rate the event and share your experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section upcoming-events-section">
        <div className="container">
          <h2 className="section-title">Upcoming Events</h2>
          <div className="grid grid-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/events" className="btn">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="section featured-artists-section">
        <div className="container">
          <h2 className="section-title">Featured Artists</h2>
          <div className="grid grid-4">
            {featuredArtists.map((artist) => (
              <div key={artist.id} className="artist-card">
                <div className="artist-image">
                  <img src="/src/Assests/back 3.jpg" alt={artist.name} />
                </div>
                <h3>{artist.name}</h3>
                <p>{artist.genre}</p>
                <div className="artist-social">
                  <a href={artist.social.spotify} target="_blank" rel="noopener noreferrer" aria-label="Spotify">
                    <i className="fab fa-spotify"></i>
                  </a>
                  <a href={artist.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href={artist.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="section past-events-section">
        <div className="container">
          <h2 className="section-title">Past Events</h2>
          <div className="grid grid-3">
            {pastEvents.map((event) => (
              <div key={event.id} className="past-event-card">
                <div className="past-event-image">
                  <img src="/src/Assests/back 3.jpg" alt={event.name} />
                  <div className="past-event-overlay">
                    <Link to={`/events/${event.id}`} className="view-details">
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="past-event-content">
                  <h3>{event.name}</h3>
                  <p className="past-event-date">
                    <i className="fas fa-calendar-alt"></i>
                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="past-event-venue">
                    <i className="fas fa-map-marker-alt"></i> {event.venue}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/events?filter=past" className="btn">
              View All Past Events
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="testimonials-container">
            <div className="testimonial">
              <div className="testimonial-content">
                <p>
                  "RhythmEvents made it so easy to find and book tickets for my favorite band. The process was seamless
                  and the event was amazing!"
                </p>
              </div>
              <div className="testimonial-author">
                <img src="/src/Assests/back 3.jpg" alt="Sarah Johnson" />
                <div>
                  <h4>Sarah Johnson</h4>
                  <div className="testimonial-rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                <p>
                  "I've been to several events organized by RhythmEvents and each one has been better than the last.
                  Their attention to detail is impressive!"
                </p>
              </div>
              <div className="testimonial-author">
                <img src="/src/Assests/back 3.jpg" alt="Michael Chen" />
                <div>
                  <h4>Michael Chen</h4>
                  <div className="testimonial-rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                <p>
                  "The team at RhythmEvents are true professionals. They helped me plan a corporate event that exceeded
                  all expectations!"
                </p>
              </div>
              <div className="testimonial-author">
                <img src="/src/Assests/back 3.jpg" alt="Emily Rodriguez" />
                <div>
                  <h4>Emily Rodriguez</h4>
                  <div className="testimonial-rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section newsletter-section">
        <div className="container">
          <div className="newsletter-container">
            <div className="newsletter-content">
              <h2>Stay Updated</h2>
              <p>
                Subscribe to our newsletter to get the latest updates on upcoming events, exclusive offers, and more!
              </p>
            </div>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                />
                <button type="submit" className="btn" disabled={isSubmitting}>
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </div>
              {subscribeMessage && <p className="subscribe-message">{subscribeMessage}</p>}
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

