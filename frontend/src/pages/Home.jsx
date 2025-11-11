import React from "react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, hasRole } = useAuth();

  return (
    <div className="page-container">
      <div className="home-hero">
        <h1>Welcome to AuthSystem</h1>
        <p>Role-Based Authentication System with JWT</p>
      </div>

      <div className="cards-grid">
        <div className="info-card">
          <h2>Your Profile</h2>
          <p>
            <strong>Name:</strong> {user.fullName}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.roles?.join(", ")}
          </p>
        </div>

        <div className="info-card">
          <h2>Your Permissions</h2>
          <ul className="permissions-list">
            <li>✅ Access Home Page</li>
            {hasRole("CUSTOMER") && (
              <>
                <li>✅ Browse Products</li>
                <li>✅ Place Orders</li>
              </>
            )}
            {hasRole("VENDOR") && (
              <>
                <li>✅ Manage Products</li>
                <li>✅ View Sales</li>
                <li>✅ Access Vendor Dashboard</li>
              </>
            )}
            {hasRole("ADMIN") && (
              <>
                <li>✅ Manage Users</li>
                <li>✅ System Configuration</li>
                <li>✅ View All Data</li>
                <li>✅ Access Admin Dashboard</li>
              </>
            )}
          </ul>
        </div>

        {(hasRole("VENDOR") || hasRole("ADMIN")) && (
          <div className="info-card highlight">
            <h2>🎯 Quick Access</h2>
            <p>
              Use the hamburger menu (☰) to access your dashboard and management
              features.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
