import { Link } from "react-router-dom";
import "./Sidebar.css"; // Add your styles here for the sidebar

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>Admin Panel</h2>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/admin">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/events">Events</Link>
        </li>
        <li>
          <Link to="/admin/tickets">Tickets</Link>
        </li>
        <li>
          <Link to="/admin/users">Users</Link>
        </li>
        <li>
          <Link to="/admin/venues">Venues</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
