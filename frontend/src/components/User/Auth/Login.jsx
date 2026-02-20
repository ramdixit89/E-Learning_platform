import React, { useState } from "react";
import { FaEnvelope, FaLock, FaArrowRight, FaCode } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      Swal.fire("Error", "All fields are required!", "error");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, formData);
      const { token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", response.data.user.id);
      Swal.fire({ icon: "success", title: "Welcome back!", text: "Login successful.", timer: 1500, showConfirmButton: false }).then(() => navigate("/"));
    } catch (error) {
      Swal.fire("Login Failed", error.response?.data?.message || "Invalid credentials!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Background orbs */}
      <div style={{ position: "fixed", top: "10%", left: "10%", width: 400, height: 400, borderRadius: "50%", background: "rgba(99,102,241,0.1)", filter: "blur(120px)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "10%", right: "10%", width: 350, height: 350, borderRadius: "50%", background: "rgba(6,182,212,0.08)", filter: "blur(100px)", pointerEvents: "none" }} />

      <div className="auth-card" style={{ animation: "fadeInUp 0.5s ease" }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "2rem" }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: "linear-gradient(135deg, #6366f1, #06b6d4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 20px rgba(99,102,241,0.4)",
            }}>
              <FaCode style={{ color: "white" }} />
            </div>
            <span style={{
              fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem",
              background: "linear-gradient(90deg, #818cf8, #06b6d4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              RDCoders
            </span>
          </div>
        </Link>

        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.6rem", marginBottom: "0.4rem" }}>
          Welcome back 👋
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "2rem" }}>
          Sign in to continue your learning journey.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          {/* Email */}
          <div>
            <label className="form-label-custom">Email Address</label>
            <div className="input-wrapper">
              <FaEnvelope className="icon" style={{ fontSize: "13px" }} />
              <input
                type="email" name="email" value={formData.email}
                onChange={handleChange} placeholder="you@example.com"
                className="input-field" required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label className="form-label-custom">Password</label>
              <Link to="/forgot-password" style={{ fontSize: "0.8rem", color: "#818cf8", textDecoration: "none" }}>
                Forgot password?
              </Link>
            </div>
            <div className="input-wrapper">
              <FaLock className="icon" style={{ fontSize: "13px" }} />
              <input
                type="password" name="password" value={formData.password}
                onChange={handleChange} placeholder="••••••••"
                className="input-field" required
              />
            </div>
          </div>

          <button
            type="submit" className="btn-primary-custom"
            style={{ width: "100%", justifyContent: "center", padding: "0.8rem", fontSize: "0.95rem", marginTop: "0.5rem" }}
            disabled={loading}
          >
            {loading ? "Signing in..." : <><span>Sign In</span> <FaArrowRight /></>}
          </button>
        </form>

        <div className="divider" style={{ margin: "1.5rem 0" }} />

        <p style={{ textAlign: "center", fontSize: "0.875rem", color: "var(--text-muted)", margin: 0 }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#818cf8", fontWeight: 600, textDecoration: "none" }}>
            Create one free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
