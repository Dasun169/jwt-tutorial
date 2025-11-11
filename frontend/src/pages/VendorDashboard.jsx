import React, { useState, useEffect } from "react";
import api from "../services/api";

const VendorDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashResponse, productsResponse] = await Promise.all([
          api.get("/vendor/dashboard"),
          api.get("/vendor/products"),
        ]);
        setDashboardData(dashResponse.data);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="page-container">
      <h1>Vendor Dashboard</h1>

      {dashboardData && (
        <div className="dashboard-card">
          <h2>{dashboardData.message}</h2>
          <p>{dashboardData.description}</p>

          <h3>Vendor Features:</h3>
          <ul className="features-list">
            {dashboardData.features?.map((feature, index) => (
              <li key={index}>🔧 {feature}</li>
            ))}
          </ul>
        </div>
      )}

      {products && (
        <div className="dashboard-card">
          <h2>Your Products</h2>
          <ul className="products-list">
            {products.products?.map((product, index) => (
              <li key={index}>📦 {product}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;
