
import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import "./MarketPrices.css";
import { Link } from "react-router-dom";

const marketData = [
  {
    id: 1,
    crop: "Tomato",
    market: "Bengaluru APMC",
    location: "Bengaluru",
    price: 2400,
    unit: "quintal",
    change: "+8.5%",
    trend: "up",
    demand: "High",
  },
  {
    id: 2,
    crop: "Tomato",
    market: "Mysuru APMC",
    location: "Mysuru",
    price: 2100,
    unit: "quintal",
    change: "-2.3%",
    trend: "down",
    demand: "Medium",
  },
  {
    id: 3,
    crop: "Onion",
    market: "Bengaluru APMC",
    location: "Bengaluru",
    price: 3200,
    unit: "quintal",
    change: "+5.2%",
    trend: "up",
    demand: "High",
  },
  {
    id: 4,
    crop: "Onion",
    market: "Mysuru APMC",
    location: "Mysuru",
    price: 2900,
    unit: "quintal",
    change: "+1.4%",
    trend: "up",
    demand: "Medium",
  },
  {
    id: 5,
    crop: "Potato",
    market: "Hassan APMC",
    location: "Hassan",
    price: 1800,
    unit: "quintal",
    change: "-1.8%",
    trend: "down",
    demand: "Medium",
  },
  {
    id: 6,
    crop: "Potato",
    market: "Bengaluru APMC",
    location: "Bengaluru",
    price: 2000,
    unit: "quintal",
    change: "+3.1%",
    trend: "up",
    demand: "High",
  },
];

function MarketPrices() {
  const [search, setSearch] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("All");

  const filteredData = marketData.filter((item) => {
    const matchesSearch =
      item.crop.toLowerCase().includes(search.toLowerCase()) ||
      item.market.toLowerCase().includes(search.toLowerCase());

    const matchesCrop =
      selectedCrop === "All" || item.crop === selectedCrop;

    return matchesSearch && matchesCrop;
  });

 
return (
  <DashboardLayout activePage="Market Prices">
    <main className="market-main">
      <header className="market-topbar">
        <div>
          <h1>Market Intelligence</h1>
          <p>Understand prices. Compare markets. Make informed decisions.</p>
        </div>

        <Link to="/farmer-dashboard" className="market-back-link">
          ← Dashboard
        </Link>
      </header>

      <section className="market-welcome">
        <div>
          <span className="market-eyebrow">MARKET OVERVIEW</span>
          <h2>Know your market before you sell.</h2>
          <p>
            Explore crop prices across nearby markets and identify
            promising selling opportunities.
          </p>
        </div>
        <div className="market-welcome-icon">📈</div>
      </section>

      <section className="market-stat-grid">
        <article className="market-stat-card">
          <span>📍</span>
          <p>Markets tracked</p>
          <h3>3</h3>
          <small>Bengaluru, Mysuru, Hassan</small>
        </article>

        <article className="market-stat-card">
          <span>🌾</span>
          <p>Crops monitored</p>
          <h3>3</h3>
          <small>Tomato, Onion, Potato</small>
        </article>

        <article className="market-stat-card">
          <span>📊</span>
          <p>Price entries</p>
          <h3>6</h3>
          <small>Across selected markets</small>
        </article>
      </section>

      <section className="market-list-section">
        <div className="market-section-heading">
          <div>
            <h2>Today's Market Prices</h2>
            <p>Compare prices across different APMC markets.</p>
          </div>
          <span className="market-demo-tag">DEMO DATA</span>
        </div>

        <div className="market-filters">
          <input
            type="text"
            placeholder="Search crop or market..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
          >
            <option value="All">All Crops</option>
            <option value="Tomato">Tomato</option>
            <option value="Onion">Onion</option>
            <option value="Potato">Potato</option>
          </select>
        </div>

        <div className="market-table-wrapper">
          <table className="market-table">
            <thead>
              <tr>
                <th>Crop</th>
                <th>Market</th>
                <th>Price / Quintal</th>
                <th>Price Change</th>
                <th>Demand</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.crop}</strong>
                  </td>
                  <td>
                    <div>{item.market}</div>
                    <small>{item.location}</small>
                  </td>
                  <td className="market-price">
                    ₹{item.price.toLocaleString("en-IN")}
                  </td>
                  <td>
                    <span className={`market-change ${item.trend}`}>
                      {item.trend === "up" ? "↑" : "↓"} {item.change}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`market-demand ${item.demand.toLowerCase()}`}
                    >
                      {item.demand}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredData.length === 0 && (
            <p className="market-empty">
              No matching market prices found.
            </p>
          )}
        </div>
      </section>

      <section className="market-insight">
        <div className="market-insight-icon">💡</div>
        <div>
          <h3>Market insight</h3>
          <p>
            In this sample dataset, Bengaluru has a higher listed tomato
            price than Mysuru. Compare transport costs, quality requirements
            and buyer demand before choosing a market.
          </p>
        </div>
      </section>

      <p className="market-disclaimer">
        Note: All prices and trends shown here are sample demonstration
        data, not verified live market prices.
      </p>
    </main>
  </DashboardLayout>
);

}

export default MarketPrices;
