import React, { useState, useEffect } from "react";
import api from "../services/api";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [users, setUsers] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashResponse, usersResponse, statsResponse] = await Promise.all([
          api.get("/admin/dashboard"),
          api.get("/admin/users"),
          api.get("/admin/stats"),
        ]);
        setDashboardData(dashResponse.data);
        setUsers(usersResponse.data);
        setStats(statsResponse.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="page-container">
      <h1>Admin Dashboard</h1>

      {dashboardData && (
        <div className="dashboard-card">
          <h2>{dashboardData.message}</h2>
          <p>{dashboardData.description}</p>

          <h3>Admin Features:</h3>
          <ul className="features-list">
            {dashboardData.features?.map((feature, index) => (
              <li key={index}>⚙️ {feature}</li>
            ))}
          </ul>
        </div>
      )}

      {stats && (
        <div className="dashboard-card">
          <h2>System Statistics</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <h3>{stats.totalUsers}</h3>
              <p>Total Users</p>
            </div>
            <div className="stat-item">
              <h3>{stats.totalVendors}</h3>
              <p>Total Vendors</p>
            </div>
            <div className="stat-item">
              <h3>{stats.totalCustomers}</h3>
              <p>Total Customers</p>
            </div>
            <div className="stat-item">
              <h3>{stats.totalOrders}</h3>
              <p>Total Orders</p>
            </div>
          </div>
        </div>
      )}

      {users && (
        <div className="dashboard-card">
          <h2>System Users</h2>
          <ul className="users-list">
            {users.users?.map((user, index) => (
              <li key={index}>👤 {user}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
