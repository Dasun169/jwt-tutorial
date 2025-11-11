import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ isOpen, onClose }) => {
  const { hasRole } = useAuth();

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
      ></div>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <nav className="sidebar-nav">
          <Link to="/home" className="sidebar-link" onClick={onClose}>
            🏠 Home
          </Link>

          {hasRole("VENDOR") && (
            <>
              <Link
                to="/vendor/dashboard"
                className="sidebar-link"
                onClick={onClose}
              >
                📊 Vendor Dashboard
              </Link>
              <Link
                to="/vendor/products"
                className="sidebar-link"
                onClick={onClose}
              >
                📦 Products
              </Link>
            </>
          )}

          {hasRole("ADMIN") && (
            <>
              <Link
                to="/admin/dashboard"
                className="sidebar-link"
                onClick={onClose}
              >
                ⚙️ Admin Dashboard
              </Link>
              <Link
                to="/admin/users"
                className="sidebar-link"
                onClick={onClose}
              >
                👥 Manage Users
              </Link>
              <Link
                to="/admin/stats"
                className="sidebar-link"
                onClick={onClose}
              >
                📈 Statistics
              </Link>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
