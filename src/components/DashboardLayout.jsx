
import React from "react";
import { Link } from "react-router-dom";
import "./DashboardLayout.css";

const navigation = [
  { label: "Overview", path: "/farmer-dashboard", icon: "▦" },
  { label: "My Crops", path: "/my-crops", icon: "🌾" },
  { label: "Market Prices", path: "/market-prices", icon: "📊" },
  { label: "Find Buyers", path: "/find-buyers", icon: "👥" },
  { label: "Orders", path: "/orders", icon: "📦" },
];

function DashboardLayout({ activePage, children }) {
  return (
    <div className="dashboard-layout">
      <aside className="shared-sidebar">
        <div className="shared-brand">
          <span>🌱</span>
          <h2>FarmLink</h2>
        </div>

        <p className="shared-menu-label">MAIN MENU</p>

        <nav className="shared-navigation">
          {navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={activePage === item.label ? "active" : ""}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="shared-sidebar-footer">
          <span>🌿</span>
          <p>Growing better opportunities together.</p>
          <small>FarmLink Platform</small>
        </div>
      </aside>

      <div className="dashboard-content">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
