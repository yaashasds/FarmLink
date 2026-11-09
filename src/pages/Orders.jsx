
import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import "./Orders.css";

const initialOrders = [
  {
    id: 101,
    buyer: "Green Basket Retailers",
    crop: "Tomato",
    quantity: 500,
    unit: "kg",
    price: 24,
    date: "08 Nov 2026",
    status: "Pending",
  },
  {
    id: 102,
    buyer: "Fresh Harvest Foods",
    crop: "Potato",
    quantity: 1000,
    unit: "kg",
    price: 22,
    date: "07 Nov 2026",
    status: "Accepted",
  },
  {
    id: 103,
    buyer: "City Vegetable Traders",
    crop: "Onion",
    quantity: 800,
    unit: "kg",
    price: 30,
    date: "05 Nov 2026",
    status: "Completed",
  },
  {
    id: 104,
    buyer: "Daily Fresh Markets",
    crop: "Tomato",
    quantity: 300,
    unit: "kg",
    price: 25,
    date: "04 Nov 2026",
    status: "Pending",
  },
];

function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const updateStatus = (id, newStatus) => {
    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        order.id === id
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      activeFilter === "All" || order.status === activeFilter;

    const matchesSearch =
      order.buyer.toLowerCase().includes(search.toLowerCase()) ||
      order.crop.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const pendingCount = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const acceptedCount = orders.filter(
    (order) => order.status === "Accepted"
  ).length;

  const completedCount = orders.filter(
    (order) => order.status === "Completed"
  ).length;

  const totalSales = orders
    .filter((order) => order.status === "Completed")
    .reduce(
      (total, order) => total + order.quantity * order.price,
      0
    );

  return (
  <DashboardLayout activePage="Orders">
    

      <main className="orders-main">
        <header className="orders-topbar">
          <div>
            <h1>Orders & Offers</h1>
            <p>Manage buyer offers and track your sales.</p>
          </div>

      
        </header>

        <section className="orders-hero">
          <div>
            <span className="orders-eyebrow">YOUR SALES OVERVIEW</span>
            <h2>Every successful sale starts with an offer.</h2>
            <p>
              Review buyer proposals, manage accepted orders
              and keep track of completed sales.
            </p>
          </div>
          <div className="orders-hero-icon">📦</div>
        </section>

        <section className="orders-stats">
          <article className="orders-stat-card">
            <span>📩</span>
            <p>Pending Offers</p>
            <h3>{pendingCount}</h3>
          </article>

          <article className="orders-stat-card">
            <span>🤝</span>
            <p>Accepted Orders</p>
            <h3>{acceptedCount}</h3>
          </article>

          <article className="orders-stat-card">
            <span>✅</span>
            <p>Completed Orders</p>
            <h3>{completedCount}</h3>
          </article>

          <article className="orders-stat-card">
            <span>💰</span>
            <p>Completed Sales Value</p>
            <h3>₹{totalSales.toLocaleString("en-IN")}</h3>
          </article>
        </section>

        <section className="orders-content">
          <div className="orders-section-heading">
            <div>
              <h2>Manage Your Orders</h2>
              <p>Review and update your buyer transactions.</p>
            </div>
            <span className="orders-demo-tag">DEMO DATA</span>
          </div>

          <div className="orders-toolbar">
            <input
              type="text"
              placeholder="Search buyer or crop..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <div className="orders-filters">
              {["All", "Pending", "Accepted", "Completed", "Rejected"].map(
                (filter) => (
                  <button
                    key={filter}
                    className={
                      activeFilter === filter ? "selected" : ""
                    }
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="orders-list">
            {filteredOrders.map((order) => (
              <article className="order-card" key={order.id}>
                <div className="order-card-header">
                  <div>
                    <span className="order-id">
                      ORDER #{order.id}
                    </span>
                    <h3>{order.buyer}</h3>
                    <p className="order-date">
                      Received: {order.date}
                    </p>
                  </div>

                  <span
                    className={`order-status ${order.status.toLowerCase()}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="order-details-grid">
                  <div>
                    <span>Crop</span>
                    <strong>🌾 {order.crop}</strong>
                  </div>

                  <div>
                    <span>Quantity</span>
                    <strong>{order.quantity} {order.unit}</strong>
                  </div>

                  <div>
                    <span>Offered price</span>
                    <strong>₹{order.price}/{order.unit}</strong>
                  </div>

                  <div>
                    <span>Order value</span>
                    <strong>
                      ₹{(order.quantity * order.price).toLocaleString("en-IN")}
                    </strong>
                  </div>
                </div>

                {order.status === "Pending" && (
                  <div className="order-actions">
                    <p>Review this buyer's offer:</p>

                    <div>
                      <button
                        className="accept-order"
                        onClick={() => updateStatus(order.id, "Accepted")}
                      >
                        ✓ Accept Offer
                      </button>

                      <button
                        className="reject-order"
                        onClick={() => updateStatus(order.id, "Rejected")}
                      >
                        ✕ Reject
                      </button>
                    </div>
                  </div>
                )}

                {order.status === "Accepted" && (
                  <div className="order-progress">
                    <p>Order accepted and awaiting fulfilment.</p>
                    <button
                      className="complete-order"
                      onClick={() => updateStatus(order.id, "Completed")}
                    >
                      Mark as Completed
                    </button>
                  </div>
                )}

                {order.status === "Completed" && (
                  <div className="order-completed-message">
                    ✓ This order has been marked as completed.
                  </div>
                )}

                {order.status === "Rejected" && (
                  <div className="order-rejected-message">
                    This offer was rejected.
                  </div>
                )}
              </article>
            ))}

            {filteredOrders.length === 0 && (
              <div className="orders-empty">
                <span>🔎</span>
                <h3>No orders found</h3>
                <p>Try a different search or status filter.</p>
              </div>
            )}
          </div>
        </section>

        <p className="orders-disclaimer">
          Note: These are sample transactions. Status changes are
          temporary and will reset when the page is refreshed.
          Backend persistence and real buyer communication will
          be implemented later.
        </p>
      </main>
    </DashboardLayout>
  );
}

export default Orders;
