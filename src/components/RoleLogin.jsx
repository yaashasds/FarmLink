
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RoleLogin.css";

function RoleLogin({ role }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isFarmer = role === "farmer";

  function handleSubmit(event) {
    event.preventDefault();

    // Demonstration login only. Real authentication comes later.
    navigate(isFarmer ? "/farmer-dashboard" : "/consumer-dashboard");
  }

  return (
    <div className="role-login-page">
      <div className="login-decoration">
        <Link to="/" className="login-brand">
          🌱 FarmLink
        </Link>

        <div className="login-decoration-content">
          <span>{isFarmer ? "🌾" : "🛒"}</span>
          <h2>
            {isFarmer
              ? "Grow your opportunities."
              : "Discover fresher possibilities."}
          </h2>
          <p>
            {isFarmer
              ? "Connect with buyers, explore markets and manage your agricultural produce."
              : "Explore agricultural produce and connect with suppliers through FarmLink."}
          </p>
        </div>

        <small>Connecting farms to markets.</small>
      </div>

      <div className="login-form-area">
        <Link to="/" className="login-back-home">
          ← Back to Home
        </Link>

        <div className="login-form-card">
          <div className="login-mobile-brand">🌱 FarmLink</div>

          <span className="login-role-label">
            {isFarmer ? "FARMER PORTAL" : "CONSUMER PORTAL"}
          </span>

          <h1>
            {isFarmer ? "Welcome back, Farmer!" : "Welcome to FarmLink!"}
          </h1>

          <p className="login-subtitle">
            Sign in to continue to your {isFarmer ? "farmer" : "consumer"} account.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <label htmlFor="login-password">Password</label>
            <div className="login-password-wrapper">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={4}
                required
              />
              <button
                type="button"
                className="show-password-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button type="submit" className="login-submit-button">
              Login to {isFarmer ? "Farmer" : "Consumer"} Account →
            </button>
          </form>

          <div className="login-demo-note">
            <strong>Demo mode</strong>
            <p>
              This is a frontend demonstration. Account verification and
              registration will be added with the backend.
            </p>
          </div>

          <p className="login-switch">
            {isFarmer ? "Looking to buy produce?" : "Are you a farmer?"}
            {" "}
            <Link to={isFarmer ? "/consumer-login" : "/farmer-login"}>
              {isFarmer ? "Consumer Login" : "Farmer Login"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RoleLogin;
