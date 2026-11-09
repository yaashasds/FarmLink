import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import "./MyCrops.css";

const initialCrops = [
  {
    id: 1,
    name: "Tomato",
    quantity: 500,
    unit: "kg",
    price: 24,
    location: "Bengaluru",
    status: "Available"
  },
  {
    id: 2,
    name: "Onion",
    quantity: 800,
    unit: "kg",
    price: 30,
    location: "Mysuru",
    status: "Available"
  }
];

function MyCrops() {
  const [crops, setCrops] = useState(() => {
    try {
      const saved = localStorage.getItem("farmerCrops");
      return saved ? JSON.parse(saved) : initialCrops;
    } catch {
      return initialCrops;
    }
  });

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    name: "",
    quantity: "",
    unit: "kg",
    price: "",
    location: ""
  };

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    localStorage.setItem("farmerCrops", JSON.stringify(crops));
  }, [crops]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.location.trim() ||
      Number(formData.quantity) <= 0 ||
      Number(formData.price) <= 0
    ) {
      alert("Please enter valid crop details.");
      return;
    }

    if (editingId !== null) {
      setCrops(
        crops.map((crop) =>
          crop.id === editingId
            ? { ...formData, id: editingId,
                quantity: Number(formData.quantity),
                price: Number(formData.price),
                status: crop.status }
            : crop
        )
      );
    } else {
      const newCrop = {
        ...formData,
        id: Date.now(),
        quantity: Number(formData.quantity),
        price: Number(formData.price),
        status: "Available"
      };

      setCrops([...crops, newCrop]);
    }

    setFormData(emptyForm);
    setShowForm(false);
    setEditingId(null);
  }

  function handleEdit(crop) {
    setFormData({
      name: crop.name,
      quantity: String(crop.quantity),
      unit: crop.unit,
      price: String(crop.price),
      location: crop.location
    });

    setEditingId(crop.id);
    setShowForm(true);
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this crop listing?"
    );

    if (confirmed) {
      setCrops(crops.filter((crop) => crop.id !== id));
    }
  }

  function handleCancel() {
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
  }

  return (
  <DashboardLayout activePage="My Crops">
    <div className="my-crops-page">

      <header className="crops-header">
        <div>
          <h1>My Crop Listings 🌾</h1>
          <p>Manage your agricultural produce and listings.</p>
        </div>

        
<div className="crops-header-actions">

  <Link to="/farmer-dashboard" className="back-dashboard">
    ← Dashboard
  </Link>

  <button
    className="add-crop-button"
    onClick={() => setShowForm(true)}
  >
    + Add New Crop
  </button>

</div>

      </header>

      <div className="crop-summary">
        <div className="crop-summary-card">
          <h3>{crops.length}</h3>
          <p>Total Listings</p>
        </div>

        <div className="crop-summary-card">
          <h3>
            {crops.filter(c => c.status === "Available").length}
          </h3>
          <p>Available Crops</p>
        </div>
      </div>

      {showForm && (
        <form className="crop-form" onSubmit={handleSubmit}>

          <h2>
            {editingId !== null ? "Edit Crop" : "Add New Crop"}
          </h2>

          <label>Crop Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Tomato"
            required
          />

          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            min="0.01"
            step="any"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
            required
          />

          <label>Unit</label>
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
          >
            <option value="kg">Kilograms (kg)</option>
            <option value="quintal">Quintals</option>
            <option value="tonne">Tonnes</option>
          </select>

          <label>Expected Price (₹ per unit)</label>
          <input
            type="number"
            name="price"
            min="0.01"
            step="any"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter expected price"
            required
          />

          <label>Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Bengaluru"
            required
          />

          <div className="form-actions">
            <button type="submit" className="save-button">
              {editingId !== null ? "Update Crop" : "Save Crop"}
            </button>

            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>

        </form>
      )}

      <section className="crop-list-section">
        <h2>Your Produce</h2>

        {crops.length === 0 ? (
          <div className="empty-crops">
            <span>🌱</span>
            <h3>No crops listed yet</h3>
            <p>Add your first crop to start connecting with buyers.</p>
          </div>
        ) : (
          <div className="crop-list">

            {crops.map((crop) => (
              <div className="crop-item" key={crop.id}>

                <div className="crop-info">
                  <h3>{crop.name}</h3>
                  <p>{crop.location}</p>
                </div>

                <div className="crop-info">
                  <strong>
                    {crop.quantity} {crop.unit}
                  </strong>
                  <p>Quantity</p>
                </div>

                <div className="crop-info">
                  <strong>₹{crop.price}</strong>
                  <p>Per {crop.unit}</p>
                </div>

                <span className="crop-badge">
                  {crop.status}
                </span>

                <div className="crop-actions">
                  <button onClick={() => handleEdit(crop)}>
                    Edit
                  </button>

                  <button onClick={() => handleDelete(crop.id)}>
                    Delete
                  </button>
                </div>

              </div>
            ))}

          </div>
        )}
      </section>

    </div>
    </DashboardLayout>
  );
}

export default MyCrops;
