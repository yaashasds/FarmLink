import React from "react";
import "./ProductDetails.css";

function ProductDetails({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div
        className="product-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="product-close" onClick={onClose}>
          ×
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="product-detail-image"
        />

        <div className="product-detail-content">
          <span className="product-detail-category">
            {product.category}
          </span>

          <h2>{product.name}</h2>

          <h3>
            ₹{product.price} / {product.unit}
          </h3>

          <p>🌱 Farmer: {product.farmer}</p>
          <p>📍 Location: {product.location}</p>

          <p className="product-detail-description">
            Fresh agricultural produce available directly from
            the listed supplier through FarmLink.
          </p>

          <button
            className="product-add-cart"
            onClick={() => onAddToCart(product)}
          >
            + Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;