import { Outlet } from "react-router-dom"; // Use Outlet to render nested routes
import Sidebar from "./sidebar/Sidebar"; // Import Sidebar component
import "./AdminLayout.css"; // Optional styling

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Outlet /> {/* Render the corresponding component here */}
      </div>
    </div>
  );
};

export default AdminLayout;
