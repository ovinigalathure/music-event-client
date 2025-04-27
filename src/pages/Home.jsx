"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import EventCard from "../components/EventCard"
import Countdown from "../components/Countdown"
import axios from "axios"
import "./Home.css"

// Define mockArtists for now
const mockArtists = [
  {
    id: 1,
    name: "Artist 1",
    genre: "Rock",
    social: {
      spotify: "https://spotify.com/artist1",
      instagram: "https://instagram.com/artist1",
      youtube: "https://youtube.com/artist1"
    }
  },
  {
    id: 2,
    name: "Artist 2",
    genre: "Jazz",
    social: {
      spotify: "https://spotify.com/artist2",
      instagram: "https://instagram.com/artist2",
      youtube: "https://youtube.com/artist2"
    }
  },
  // Add more artists as needed
];

const Home = () => {
  const [featuredEvents, setFeaturedEvents] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [pastEvents, setPastEvents] = useState([])
  const [nextEvent, setNextEvent] = useState(null)
  const [featuredArtists, setFeaturedArtists] = useState([]) // For artists
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscribeMessage, setSubscribeMessage] = useState("")

  // Only for past event images
  const [pastEventImages, setPastEventImages] = useState({})

  useEffect(() => {
    // Fetch events from the backend API
    axios
      .get("http://localhost:8080/api/events")
      .then(async (response) => {
        const events = response.data;  // Assuming the API returns an array of events

        // Get current date for comparison
        const now = new Date()

        // Filter events into upcoming and past
        const upcoming = events
          .filter((event) => new Date(event.date) > now)
          .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date ascending

        const past = events
          .filter((event) => new Date(event.date) < now)
          .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending

        // Set next event (closest upcoming)
        setNextEvent(upcoming.length > 0 ? upcoming[0] : null)

        // Set featured events (random selection)
        const featured = events.filter(event => event.featured) // Filter featured events
        setFeaturedEvents(featured.slice(0, 3)) // Get the first 3 featured events

        // Set upcoming and past events
        setUpcomingEvents(upcoming.slice(0, 6)) // Show up to 6 upcoming events
        setPastEvents(past.slice(0, 3)) // Show up to 3 past events

        // --- Fetch images for past events ---
        const images = {}
        await Promise.all(
          past.slice(0, 3).map(async (event) => {
            try {
              const imgRes = await axios.get(
                `http://localhost:8080/api/events/${event.id}/image`
              )
              const { base64, mimeType } = imgRes.data
              images[event.id] = `data:${mimeType};base64,${base64}`
            } catch (err) {
              images[event.id] = "/src/Assests/back 3.jpg" // fallback image
            }
          })
        )
        setPastEventImages(images)
      })
      .catch((error) => {
        console.error("Error fetching events:", error)
      })

    // Use the mock artists for now
    setFeaturedArtists(mockArtists)
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

      {/* Past Events */}
      <section className="section past-events-section">
        <div className="container">
          <h2 className="section-title">Past Events</h2>
          <div className="grid grid-3">
            {pastEvents.map((event) => (
              <div key={event.id} className="past-event-card">
                <div className="past-event-image">
                  <img
                    src={pastEventImages[event.id] || "/src/Assests/back 3.jpg"}
                    alt={event.name}
                  />
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
