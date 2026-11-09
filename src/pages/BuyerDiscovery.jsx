
import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import "./BuyerDiscovery.css";

const buyers = [
  {
    id: 1,
    name: "Green Basket Retailers",
    type: "Retailer",
    location: "Bengaluru",
    crops: ["Tomato", "Onion"],
    quantity: "500–1000 kg",
    requirement: "Fresh produce, Grade A",
    description:
      "A sample retail buyer profile looking for regular supplies of fresh vegetables.",
    icon: "🛒",
  },
  {
    id: 2,
    name: "Fresh Harvest Foods",
    type: "Food Processor",
    location: "Mysuru",
    crops: ["Tomato", "Potato"],
    quantity: "1–3 tonnes",
    requirement: "Consistent quality and bulk supply",
    description:
      "A sample food processing buyer interested in bulk agricultural produce.",
    icon: "🏭",
  },
  {
    id: 3,
    name: "City Vegetable Traders",
    type: "Wholesaler",
    location: "Bengaluru",
    crops: ["Onion", "Potato"],
    quantity: "800–1500 kg",
    requirement: "Clean, sorted produce",
    description:
      "A sample wholesale buyer sourcing vegetables from nearby farming regions.",
    icon: "📦",
  },
  {
    id: 4,
    name: "Daily Fresh Markets",
    type: "Retailer",
    location: "Hassan",
    crops: ["Tomato", "Potato"],
    quantity: "300–700 kg",
    requirement: "Fresh produce with minimal damage",
    description:
      "A sample retailer profile interested in frequent, smaller-volume purchases.",
    icon: "🌿",
  },
  {
    id: 5,
    name: "Agro Supply Network",
    type: "Distributor",
    location: "Mysuru",
    crops: ["Onion", "Tomato"],
    quantity: "2–5 tonnes",
    requirement: "Bulk lots with consistent grading",
    description:
      "A sample distributor profile connecting agricultural produce to multiple outlets.",
    icon: "🚚",
  },
  {
    id: 6,
    name: "Harvest Food Services",
    type: "Institutional Buyer",
    location: "Bengaluru",
    crops: ["Potato", "Onion"],
    quantity: "500–1200 kg",
    requirement: "Uniform size and regular supply",
    description:
      "A sample institutional buyer profile for kitchens and food service operations.",
    icon: "🍽️",
  },
];

function BuyerDiscovery() {
  const [search, setSearch] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedBuyer, setSelectedBuyer] = useState(null);

  const filteredBuyers = buyers.filter((buyer) => {
    const matchesSearch =
      buyer.name.toLowerCase().includes(search.toLowerCase()) ||
      buyer.location.toLowerCase().includes(search.toLowerCase()) ||
      buyer.crops.some((crop) =>
        crop.toLowerCase().includes(search.toLowerCase())
      );

    const matchesCrop =
      selectedCrop === "All" || buyer.crops.includes(selectedCrop);

    const matchesType =
      selectedType === "All" || buyer.type === selectedType;

    return matchesSearch && matchesCrop && matchesType;
  });

  return (
  <DashboardLayout activePage="Find Buyers">
    
      

      <main className="buyer-main">
        <header className="buyer-topbar">
          <div>
            <h1>Buyer Discovery</h1>
            <p>Find the right buyers for your agricultural produce.</p>
          </div>

          
        </header>

        <section className="buyer-hero">
          <div>
            <span className="buyer-eyebrow">GROW YOUR MARKET REACH</span>
            <h2>Your produce deserves the right market.</h2>
            <p>
              Discover potential buyers, understand their requirements
              and explore new selling opportunities.
            </p>
          </div>
          <div className="buyer-hero-icon">🤝</div>
        </section>

        <section className="buyer-summary">
          <div className="buyer-summary-card">
            <span>👥</span>
            <div>
              <h3>{buyers.length}</h3>
              <p>Sample buyer profiles</p>
            </div>
          </div>

          <div className="buyer-summary-card">
            <span>🌾</span>
            <div>
              <h3>3</h3>
              <p>Crop categories</p>
            </div>
          </div>

          <div className="buyer-summary-card">
            <span>📍</span>
            <div>
              <h3>3</h3>
              <p>Locations covered</p>
            </div>
          </div>
        </section>

        <section className="buyer-directory">
          <div className="buyer-directory-heading">
            <div>
              <h2>Explore Buyers</h2>
              <p>Browse potential buyers and their purchasing needs.</p>
            </div>
            <span className="buyer-demo-tag">DEMO PROFILES</span>
          </div>

          <div className="buyer-filters">
            <input
              type="text"
              placeholder="Search buyer, crop or location..."
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

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="All">All Buyer Types</option>
              <option value="Retailer">Retailer</option>
              <option value="Wholesaler">Wholesaler</option>
              <option value="Food Processor">Food Processor</option>
              <option value="Distributor">Distributor</option>
              <option value="Institutional Buyer">
                Institutional Buyer
              </option>
            </select>
          </div>

          <div className="buyer-card-grid">
            {filteredBuyers.map((buyer) => (
              <article className="buyer-card" key={buyer.id}>
                <div className="buyer-card-top">
                  <div className="buyer-avatar">{buyer.icon}</div>
                  <span className="buyer-type">{buyer.type}</span>
                </div>

                <h3>{buyer.name}</h3>

                <p className="buyer-location">
                  📍 {buyer.location}, Karnataka
                </p>

                <div className="buyer-crop-list">
                  {buyer.crops.map((crop) => (
                    <span key={crop}>{crop}</span>
                  ))}
                </div>

                <div className="buyer-info">
                  <div>
                    <span>Required quantity</span>
                    <strong>{buyer.quantity}</strong>
                  </div>

                  <div>
                    <span>Quality preference</span>
                    <strong>{buyer.requirement}</strong>
                  </div>
                </div>

                <button
                  className="buyer-details-button"
                  onClick={() =>
                    setSelectedBuyer(
                      selectedBuyer?.id === buyer.id ? null : buyer
                    )
                  }
                >
                  {selectedBuyer?.id === buyer.id
                    ? "Hide Details ↑"
                    : "View Details →"}
                </button>

                {selectedBuyer?.id === buyer.id && (
                  <div className="buyer-expanded-details">
                    <strong>About this buyer</strong>
                    <p>{buyer.description}</p>
                    <small>
                      Sample profile only. Contact and verification
                      details will be added through the backend.
                    </small>
                  </div>
                )}
              </article>
            ))}
          </div>

          {filteredBuyers.length === 0 && (
            <div className="buyer-empty">
              <span>🔎</span>
              <h3>No buyers found</h3>
              <p>Try changing your search or filters.</p>
            </div>
          )}
        </section>

        <p className="buyer-disclaimer">
          Note: These are fictional demonstration profiles. They are
          not real or verified buyers.
        </p>
      </main>
    </DashboardLayout>
  );
}

export default BuyerDiscovery;
