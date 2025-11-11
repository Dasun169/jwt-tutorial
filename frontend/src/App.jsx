import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CustomerDashboard from "./pages/CustomerDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />

              <Route
                path="/customer/dashboard"
                element={
                  <PrivateRoute roles={["CUSTOMER"]}>
                    <CustomerDashboard />
                  </PrivateRoute>
                }
              />

              <Route
                path="/vendor/dashboard"
                element={
                  <PrivateRoute roles={["VENDOR"]}>
                    <VendorDashboard />
                  </PrivateRoute>
                }
              />

              <Route
                path="/vendor/products"
                element={
                  <PrivateRoute roles={["VENDOR"]}>
                    <VendorDashboard />
                  </PrivateRoute>
                }
              />

              <Route
                path="/admin/dashboard"
                element={
                  <PrivateRoute roles={["ADMIN"]}>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />

              <Route
                path="/admin/users"
                element={
                  <PrivateRoute roles={["ADMIN"]}>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />

              <Route
                path="/admin/stats"
                element={
                  <PrivateRoute roles={["ADMIN"]}>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />

              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
