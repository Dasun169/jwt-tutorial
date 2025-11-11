import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            {user && (hasRole("VENDOR") || hasRole("ADMIN")) && (
              <button className="hamburger" onClick={toggleSidebar}>
                ☰
              </button>
            )}
            <Link to="/home" className="nav-logo">
              AuthSystem
            </Link>
          </div>

          <div className="nav-right">
            {user ? (
              <div className="user-section">
                <span className="welcome-text">Welcome, {user.fullName}</span>
                <span className="role-badge">{user.roles?.[0]}</span>
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="btn-link">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {user && (hasRole("VENDOR") || hasRole("ADMIN")) && (
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
