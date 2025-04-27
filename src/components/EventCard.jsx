import { Link } from "react-router-dom"
import "./EventCard.css"

const EventCard = ({ event }) => {
  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })
  const uploadsBase = "http://localhost:8080/uploads/";
  return (
    <div className="event-card">
      <div className="event-image">
      
      <img
        src={
          event.imagePath
            ? `${uploadsBase}${event.imagePath}`
            : "/placeholder.svg"
        }
        alt={event.name}
      />

        <div className="event-date-badge">
          <span className="event-month">{eventDate.toLocaleDateString("en-US", { month: "short" })}</span>
          <span className="event-day">{eventDate.getDate()}</span>
        </div>
      </div>
      <div className="event-content">
        <h3 className="event-title">{event.name}</h3>
        <div className="event-details">
          <p className="event-time">
            <i className="fas fa-clock"></i> {formattedDate} | {formattedTime}
          </p>
          <p className="event-location">
            <i className="fas fa-map-marker-alt"></i> {event.venue}
          </p>
        </div>
        <div className="event-description">
          <p>{event.description.substring(0, 100)}...</p>
        </div>
        <div className="event-footer">
          <span className="event-price">${event.price}</span>
          <Link to={`/events/${event.id}`} className="btn-small">
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EventCard

