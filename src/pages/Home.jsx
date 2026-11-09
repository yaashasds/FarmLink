
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [loginOpen, setLoginOpen] = useState(false);
  return (
    <div className="home-page">
      <nav className="home-navbar">
        <Link to="/" className="home-brand">
          <span>🌱</span>
          <strong>FarmLink</strong>
        </Link>

        <div className="home-nav-links">
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#join">Get Started</a>
        </div>

        <div className="home-login-dropdown">
  <button
    className="home-nav-login"
    onClick={() => setLoginOpen(!loginOpen)}
    aria-expanded={loginOpen}
  >
    Login <span>⌄</span>
  </button>

  {loginOpen && (
    <div className="home-login-menu">
      <Link
        to="/farmer-login"
        onClick={() => setLoginOpen(false)}
      >
        🌾 Farmer Login
      </Link>

      <Link
        to="/consumer-login"
        onClick={() => setLoginOpen(false)}
      >
        🛒 Consumer Login
      </Link>
    </div>
  )}
</div>
      </nav>

      <main>
        <section className="home-hero">
          <div className="home-hero-content">
            <span className="home-eyebrow">
              CONNECTING FARMERS WITH OPPORTUNITIES
            </span>

            <h1>
              From the farm
              <br />
              <span>to the right market.</span>
            </h1>

            <p>
              FarmLink brings farmers, buyers and markets together.
              Discover opportunities, compare prices and make better
              agricultural connections.
            </p>

            <div className="home-hero-actions">
              <a href="#join" className="home-primary-button">
  Get Started →
</a>
              <a href="#about" className="home-secondary-button">
                Explore FarmLink
              </a>
            </div>

            <div className="home-trust-note">
              🌿 Building stronger connections across agriculture
            </div>
          </div>

         
          
<div className="home-hero-visual">
  <div className="home-image-placeholder">
    <img
      src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000"
      alt="Beautiful green agricultural farmland"
      className="home-hero-image"
    />

    <div className="home-image-overlay">
      <h3>Better markets.</h3>
      <p>Better opportunities.</p>
    </div>
  </div>

  <div className="home-floating-card">
    <span>🤝</span>
    <div>
      <strong>Direct Connections</strong>
      <small>Farmers meet buyers</small>
    </div>
  </div>
</div>

        </section>

        <section className="home-intro" id="about">
          <span className="home-section-label">WELCOME TO FARMLINK</span>
          <h2>A smarter way to connect agriculture</h2>
          <p>
            Whether you grow agricultural produce or source it for
            your business, FarmLink helps you discover the right
            opportunities in one place.
          </p>
        </section>




        <section className="home-role-section" id="join">
          <div className="home-role-heading">
            <span className="home-section-label">GET STARTED</span>
            <h2>How would you like to use FarmLink?</h2>
            <p>Choose your account type to continue.</p>
          </div>

          <div className="home-role-grid">
            <article className="home-role-card farmer-role">
              <div className="home-role-icon">🌾</div>
              <span className="home-role-tag">FOR FARMERS & FPOS</span>
              <h3>I'm a Farmer</h3>
              <p>
                List your crops, compare market prices, discover
                buyers and manage your orders.
              </p>
              <Link to="/farmer-login" className="home-role-button">
                Farmer Login →
              </Link>
            </article>

            <article className="home-role-card consumer-role">
              <div className="home-role-icon">🛒</div>
              <span className="home-role-tag">FOR BUYERS & CONSUMERS</span>
              <h3>I'm a Consumer</h3>
              <p>
                Explore available produce, discover suppliers and
                connect with farmers for your requirements.
              </p>
              <Link to="/consumer-login" className="home-role-button">
                Consumer Login →
              </Link>
            </article>
          </div>
        </section>

        <section className="home-features" id="features">
          <div>
            <span>📊</span>
            <h3>Market Intelligence</h3>
            <p>Compare crop prices across different markets.</p>
          </div>
          <div>
            <span>🤝</span>
            <h3>Buyer Connections</h3>
            <p>Discover buyers and their produce requirements.</p>
          </div>
          <div>
            <span>📦</span>
            <h3>Order Management</h3>
            <p>Keep track of offers and order progress.</p>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <strong>🌱 FarmLink</strong>
        <p>Connecting farms to markets, creating better opportunities.</p>
        <small>© 2026 FarmLink. Demonstration platform.</small>
      </footer>
    </div>
  );
}

export default Home;
