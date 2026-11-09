
import React from "react";
import DashboardLayout from "../components/DashboardLayout";
import "./FarmerDashboard.css";
import { Link } from "react-router-dom";

const stats = [
  { title: "Listed Crops", value: "12", icon: "🌾" },
  { title: "Active Offers", value: "08", icon: "🤝" },
  { title: "Buyer Matches", value: "24", icon: "👥" },
  { title: "Orders", value: "05", icon: "📦" }
];

const crops = [
  { name: "Tomato", quantity: "500 kg", price: "₹24/kg", status: "Listed" },
  { name: "Onion", quantity: "800 kg", price: "₹30/kg", status: "Listed" },
  { name: "Potato", quantity: "600 kg", price: "₹18/kg", status: "Pending" }
];

function FarmerDashboard() {
  return (
    <DashboardLayout activePage="Overview">

      <main className="dashboard-main">

        <header className="dashboard-header">
          <div>
            <h2>Farmer Dashboard</h2>
            <p>Manage your farm and explore market opportunities.</p>
          </div>

          <div className="profile">

            <span>🔔</span>
            <span className="avatar">F</span>
            <span>Farmer</span>
                                  <Link to="/" className="farmer-logout-button">
  <span>↪</span> Logout
</Link>
          </div>
        </header>

        <section className="welcome-section">
          <div>
            <h1>Welcome back, Farmer! 👋</h1>
            <p>
              Here's an overview of your agricultural marketplace.
            </p>
  
          </div>

          <Link to="/my-crops" className="add-crop-button">
  + Add Crop
</Link>
        </section>

        <section className="stats-grid">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.title}>
              <span className="stat-icon">{stat.icon}</span>
              <p>{stat.title}</p>
              <h2>{stat.value}</h2>
            </div>
          ))}
        </section>

        <section className="dashboard-sections">

          <div className="content-card crops-card">
            <div className="card-heading">
              <h3>My Listed Crops</h3>
              <a href="#crops">View All</a>
            </div>

            {crops.map((crop) => (
              <div className="crop-row" key={crop.name}>
                <div>
                  <strong>{crop.name}</strong>
                  <p>{crop.quantity}</p>
                </div>

                <div>
                  <strong>{crop.price}</strong>
                  <span className="crop-status">
                    {crop.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="content-card market-card">
            <h3>Market Insights</h3>
            <p>Explore commodity prices and market opportunities.</p>

            <div className="market-highlight">
              <span>🌾</span>
              <div>
                <strong>Market Price Trends</strong>
                <p>Compare prices across nearby markets.</p>
              </div>
            </div>

            <button className="market-btn">
              Explore Market Prices →
            </button>
          </div>

        </section>

      </main>

    </DashboardLayout>
  );
}

export default FarmerDashboard;
