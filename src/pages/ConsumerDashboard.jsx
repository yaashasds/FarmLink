import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ConsumerDashboard.css";
import ProductDetails from "../components/ProductDetails";

const products = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    category: "Vegetables",
    price: 24,
    unit: "kg",
    location: "Bengaluru",
    farmer: "Green Valley Farms",
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600",
    tag: "Fresh Harvest",
  },
  {
    id: 2,
    name: "Red Onions",
    category: "Vegetables",
    price: 30,
    unit: "kg",
    location: "Mysuru",
    farmer: "Nature's Basket",
    image:
      "https://images.unsplash.com/photo-1508747703725-719777637510?w=600",
    tag: "Popular",
  },
  {
    id: 3,
    name: "Fresh Potatoes",
    category: "Vegetables",
    price: 22,
    unit: "kg",
    location: "Hassan",
    farmer: "Annapurna Farms",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600",
    tag: "Good Value",
  },
  {
    id: 4,
    name: "Sweet Oranges",
    category: "Fruits",
    price: 65,
    unit: "kg",
    location: "Bengaluru",
    farmer: "Sunrise Orchards",
    image:
      "https://images.unsplash.com/photo-1547514701-42782101795e?w=600",
    tag: "Fresh Harvest",
  },
  {
    id: 5,
    name: "Fresh Apples",
    category: "Fruits",
    price: 120,
    unit: "kg",
    location: "Mysuru",
    farmer: "Hilltop Produce",
    image:
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600",
    tag: "Popular",
  },
  {
    id: 6,
    name: "Wheat Grains",
    category: "Grains",
    price: 35,
    unit: "kg",
    location: "Hassan",
    farmer: "Harvest Fields",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600",
    tag: "Quality Produce",
  },
];

const categories = [
  { name: "All", icon: "🌱" },
  { name: "Vegetables", icon: "🥬" },
  { name: "Fruits", icon: "🍎" },
  { name: "Grains", icon: "🌾" },
];

function ConsumerDashboard() {

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [showOrders, setShowOrders] = useState(false);

  const [orders, setOrders] = useState(() => {
  return JSON.parse(
    localStorage.getItem("farmLinkOrders") || "[]"
  );
});

const [customerDetails, setCustomerDetails] = useState({
  name: "",
  phone: "",
  address: "",
});

const [cart, setCart] = useState([]);


const handleAddToCart = (product) => {
  setCart((previousCart) => {
    const existingProduct = previousCart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      return previousCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [...previousCart, { ...product, quantity: 1 }];
  });

  setSelectedProduct(null);
};

const updateCartQuantity = (productId, change) => {
  setCart((previousCart) =>
    previousCart
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + change }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

const removeFromCart = (productId) => {
  setCart((previousCart) =>
    previousCart.filter((item) => item.id !== productId)
  );
};

const cartTotal = cart.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);
const handlePlaceOrder = (e) => {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const newOrder = {
    orderId: "FL" + Date.now(),
    customer: customerDetails,
    items: [...cart],
    total: cartTotal,
    orderDate: new Date().toLocaleString(),
    status: "Order Placed",
  };

  const updatedOrders = [...orders, newOrder];

setOrders(updatedOrders);

localStorage.setItem(
  "farmLinkOrders",
  JSON.stringify(updatedOrders)
);

  setLastOrder(newOrder);
  setCart([]);
  setShowCheckout(false);
};


  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.farmer.toLowerCase().includes(search.toLowerCase()) ||
      product.location.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "All" ||
      product.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="consumer-dashboard">

      {/* NAVIGATION BAR */}
      <nav className="consumer-navbar">
  <Link to="/" className="consumer-brand">
    <span>🌱</span> FarmLink
  </Link>

  <div className="consumer-nav-links">
    <a href="#home">Home</a>
    <a href="#products">Browse Produce</a>
    <a href="#farmers">Our Farmers</a>
  </div>

  <div className="consumer-nav-actions">
    

    {/* Shopping Cart Indicator */}
    <button
  className="consumer-cart-indicator"
  onClick={() => setShowCart(true)}
>
  🛒 Cart (
  {cart.reduce((total, item) => total + item.quantity, 0)}
  )
</button>
<button
  className="consumer-orders-button"
  onClick={() => setShowOrders(true)}
>
  📦 My Orders
</button>

    {/* Logout */}
    <Link to="/" className="consumer-logout">
      Logout ↗
    </Link>

  </div>
</nav>

      <main className="consumer-main">

        {/* WELCOME SECTION */}
        <section className="consumer-welcome" id="home">
          <div className="consumer-welcome-content">
            <span className="consumer-eyebrow">
              YOUR AGRICULTURAL MARKETPLACE
            </span>

            <h1>
              Fresh from farms,
              <br />
              <span>straight to you.</span>
            </h1>

            <p>
              Discover quality agricultural produce, compare prices
              and connect directly with trusted farmers.
            </p>

            <a href="#products" className="consumer-explore-button">
              Explore Products →
            </a>
          </div>

          <div className="consumer-welcome-visual">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=900"
              alt="Fresh vegetables at a farmers market"
            />

            <div className="consumer-image-note">
              <span>🌿</span>
              <div>
                <strong>Farm Fresh Produce</strong>
                <small>Direct farmer connections</small>
              </div>
            </div>
          </div>
        </section>

        {/* SEARCH SECTION */}
        <section className="consumer-search-section">
          <div>
            <h2>What are you looking for?</h2>
            <p>Find fresh produce from farmers near you.</p>
          </div>

          <div className="consumer-search-box">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search tomatoes, onions, fruits..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="consumer-category-section">
          <div className="consumer-section-heading">
            <div>
              <span>EXPLORE</span>
              <h2>Shop by Category</h2>
            </div>
          </div>

          <div className="consumer-category-list">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`consumer-category-button ${
                  activeCategory === category.name ? "active" : ""
                }`}
                onClick={() => setActiveCategory(category.name)}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="consumer-products-section" id="products">
          <div className="consumer-section-heading">
            <div>
              <span>HANDPICKED FOR YOU</span>
              <h2>Available Produce</h2>
            </div>

            <p>{filteredProducts.length} products found</p>
          </div>

          <div className="consumer-product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <article className="consumer-product-card" key={product.id}>
                  <div className="consumer-product-image">
                    <img src={product.image} alt={product.name} />
                    <span className="consumer-product-tag">
                      {product.tag}
                    </span>
                  </div>

                  <div className="consumer-product-info">
                    <span className="consumer-product-category">
                      {product.category}
                    </span>

                    <h3>{product.name}</h3>

                    <p className="consumer-product-farmer">
                      🌱 {product.farmer}
                    </p>

                    <p className="consumer-product-location">
                      📍 {product.location}
                    </p>

                    <div className="consumer-product-bottom">
                      <div>
                        <strong>₹{product.price}</strong>
                        <small> / {product.unit}</small>
                      </div>

                      <button
  className="consumer-view-button"
  onClick={() => setSelectedProduct(product)}
>
  View Details →
</button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="consumer-no-products">
                <span>🔍</span>
                <h3>No products found</h3>
                <p>Try another search or select a different category.</p>
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* FARMER CONNECTION SECTION */}
        <section className="consumer-farmer-section" id="farmers">
          <div>
            <span>GROWING TOGETHER</span>
            <h2>Supporting farmers. Bringing freshness closer.</h2>
            <p>
              FarmLink helps consumers discover agricultural produce
              while giving farmers better opportunities to reach buyers.
            </p>
          </div>

          <div className="consumer-farmer-icon">🤝</div>
        </section>

      </main>

            <footer className="consumer-footer">
        <strong>🌱 FarmLink</strong>
        <p>Connecting farms with the people who need them.</p>
        <small>© 2026 FarmLink. All rights reserved.</small>
      </footer>

{/* CHECKOUT */}
{showCheckout && (
  <div className="checkout-overlay">
    <div className="checkout-panel">
      <div className="checkout-header">
        <h2>Complete Your Order</h2>
        <button onClick={() => setShowCheckout(false)}>×</button>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <h3>Delivery Details</h3>

        <label>Full Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={customerDetails.name}
          onChange={(e) =>
            setCustomerDetails({
              ...customerDetails,
              name: e.target.value,
            })
          }
          required
        />

        <label>Mobile Number</label>
        <input
          type="tel"
          placeholder="10-digit mobile number"
          value={customerDetails.phone}
          onChange={(e) =>
            setCustomerDetails({
              ...customerDetails,
              phone: e.target.value,
            })
          }
          pattern="[0-9]{10}"
          maxLength="10"
          required
        />

        <label>Delivery Address</label>
        <textarea
          placeholder="Enter your complete delivery address"
          value={customerDetails.address}
          onChange={(e) =>
            setCustomerDetails({
              ...customerDetails,
              address: e.target.value,
            })
          }
          required
        />

        <div className="checkout-order-summary">
          <h3>Order Summary</h3>

          {cart.map((item) => (
            <div className="checkout-summary-item" key={item.id}>
              <span>
                {item.name} × {item.quantity}
              </span>
              <strong>₹{item.price * item.quantity}</strong>
            </div>
          ))}

          <div className="checkout-total">
            <strong>Total Amount</strong>
            <strong>₹{cartTotal}</strong>
          </div>
        </div>

        <p className="checkout-demo-note">
          Demo checkout: no payment will be collected.
        </p>

        <button type="submit" className="place-order-button">
          Place Order →
        </button>
      </form>
    </div>
  </div>
)}

{/* ORDER CONFIRMATION */}
{lastOrder && (
  <div className="checkout-overlay">
    <div className="order-confirmation">
      <div className="order-success-icon">✓</div>

      <h2>Order Placed Successfully!</h2>
      <p>Thank you for choosing FarmLink.</p>

      <div className="confirmation-details">
        <p>
          Order ID: <strong>{lastOrder.orderId}</strong>
        </p>
        <p>
          Customer: <strong>{lastOrder.customer.name}</strong>
        </p>
        <p>
          Total: <strong>₹{lastOrder.total}</strong>
        </p>
        <p>
          Status: <strong>{lastOrder.status}</strong>
        </p>
      </div>

      <button
        className="place-order-button"
        onClick={() => setLastOrder(null)}
      >
        Continue Shopping
      </button>
    </div>
  </div>
)}

{/* MY ORDERS PANEL */}
{showOrders && (
  <div
    className="orders-overlay"
    onClick={() => setShowOrders(false)}
  >
    <div
      className="orders-panel"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="orders-panel-header">
        <div>
          <span>YOUR PURCHASES</span>
          <h2>My Orders 📦</h2>
        </div>

        <button onClick={() => setShowOrders(false)}>
          ×
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <h3>No orders yet!</h3>
          <p>Your purchases will appear here.</p>
        </div>
      ) : (
        <div className="orders-list">
          {[...orders].reverse().map((order) => (
            <div className="buyer-order-card" key={order.orderId}>
              <div className="buyer-order-top">
                <div>
                  <span>ORDER ID</span>
                  <h3>{order.orderId}</h3>
                </div>

                <span className="buyer-order-status">
                  {order.status}
                </span>
              </div>

              <p className="buyer-order-date">
                Placed on: {order.orderDate}
              </p>

              <div className="buyer-order-products">
                {order.items.map((item) => (
                  <div key={item.id}>
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <strong>
                      ₹{item.price * item.quantity}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="buyer-order-bottom">
                <span>Total Amount</span>
                <strong>₹{order.total}</strong>
              </div>

              <div className="buyer-delivery-details">
                <strong>Delivery Address</strong>
                <p>{order.customer.address}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)}


      {/* SHOPPING CART */}
{showCart && (
  <div
    className="cart-overlay"
    onClick={() => setShowCart(false)}
  >
    <div
      className="cart-panel"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="cart-header">
        <h2>Your Shopping Cart 🛒</h2>

        <button onClick={() => setShowCart(false)}>
          ×
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h3>Your cart is empty</h3>
          <p>Explore fresh produce from our farmers!</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>₹{item.price} / {item.unit}</p>

                  <div className="cart-quantity">
                    <button
                      onClick={() =>
                        updateCartQuantity(item.id, -1)
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateCartQuantity(item.id, 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="cart-remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>

                <strong>
                  ₹{item.price * item.quantity}
                </strong>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>
              Total: <span>₹{cartTotal}</span>
            </h3>

            <button
              className="checkout-button"
              onClick={() => {
                setShowCart(false);
                setShowCheckout(true);
              }}
            >
              Proceed to Checkout →
            </button>
          </div>
        </>
      )}
    </div>
  </div>
)}

      {/* PRODUCT DETAILS POPUP */}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

    </div>
       
  );
}

export default ConsumerDashboard;