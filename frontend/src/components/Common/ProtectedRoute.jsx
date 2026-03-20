import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // Assuming role is stored. If not, just token verification is better than nothing!
  const location = useLocation();

  if (!token) {
    // Redirect them to the login page, but save the current location they were trying to go to
    // They can be redirected back after successful login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If this route strictly requires an admin and they aren't one:
  if (requireAdmin && userRole !== "admin") {
    // You could route to a 403 Unauthorised page or Home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
