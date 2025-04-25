import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mockEvents, mockVenues } from "../../data/mockData";
import "./Admin.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalTicketsSold: 0,
    totalRevenue: 0,
    totalVenues: 0,
    totalUsers: 0,
  });

  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        const now = new Date();
        const upcoming = mockEvents.filter((event) => new Date(event.date) > now);

        const totalTicketsSold = mockEvents.reduce((total, event) => total + event.tickets.sold, 0);
        const totalRevenue = mockEvents.reduce((total, event) => total + event.price * event.tickets.sold, 0);

        setStats({
          totalEvents: mockEvents.length,
          upcomingEvents: upcoming.length,
          totalTicketsSold,
          totalRevenue,
          totalVenues: mockVenues.length,
          totalUsers: 1250, // Mock user count
        });

        const recent = [...mockEvents].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
        setRecentEvents(recent);
        setLoading(false);
      }, 800);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-calendar-alt"></i>
          </div>
          <div className="stat-content">
            <h3>Total Events</h3>
            <p className="stat-value">{stats.totalEvents}</p>
          </div>
        </div>
        {/* Repeat similar structure for other stats */}
      </div>

      <div className="admin-sections">
        <div className="admin-section">
          <div className="section-header">
            <h2>Recent Events</h2>
            <Link to="/admin/events" className="btn-small">
              View All
            </Link>
          </div>
          <div className="recent-events-table">
            <div className="table-header">
              <div className="table-cell">Event</div>
              <div className="table-cell">Date</div>
              <div className="table-cell">Venue</div>
              <div className="table-cell">Tickets Sold</div>
              <div className="table-cell">Revenue</div>
            </div>
            {recentEvents.map((event) => (
              <div key={event.id} className="table-row">
                <div className="table-cell">
                  <div className="event-cell">
                    <img src={event.image || "/placeholder.svg"} alt={event.name} />
                    <span>{event.name}</span>
                  </div>
                </div>
                <div className="table-cell">{new Date(event.date).toLocaleDateString()}</div>
                <div className="table-cell">{event.venue}</div>
                <div className="table-cell">{event.tickets.sold} / {event.tickets.total}</div>
                <div className="table-cell">${(event.price * event.tickets.sold).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
