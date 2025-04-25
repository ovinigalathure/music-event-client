import { Link } from "react-router-dom"
import "./NotFound.css"

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you are looking for doesn't exist or has been moved.</p>
          <div className="not-found-actions">
            <Link to="/" className="btn">
              Go to Homepage
            </Link>
            <Link to="/events" className="btn btn-secondary">
              Browse Events
            </Link>
          </div>
        </div>
        <div className="not-found-image">
          <img src="/placeholder.svg?height=400&width=400" alt="Page Not Found" />
        </div>
      </div>
    </div>
  )
}

export default NotFound

