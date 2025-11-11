import React, { useState, useEffect } from "react";
import api from "../services/api";

const CustomerDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashResponse, ordersResponse] = await Promise.all([
          api.get("/customer/dashboard"),
          api.get("/customer/orders"),
        ]);
        setDashboardData(dashResponse.data);
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="page-container">
      <h1>Customer Dashboard</h1>

      {dashboardData && (
        <div className="dashboard-card">
          <h2>{dashboardData.message}</h2>
          <p>{dashboardData.description}</p>

          <h3>Available Features:</h3>
          <ul className="features-list">
            {dashboardData.features?.map((feature, index) => (
              <li key={index}>✨ {feature}</li>
            ))}
          </ul>
        </div>
      )}

      {orders && (
        <div className="dashboard-card">
          <h2>Your Orders</h2>
          <ul className="orders-list">
            {orders.orders?.map((order, index) => (
              <li key={index}>📦 {order}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
