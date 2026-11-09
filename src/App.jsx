
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from "./pages/Home";
import FarmerLogin from "./pages/FarmerLogin";
import ConsumerLogin from "./pages/ConsumerLogin";
import ConsumerDashboard from "./pages/ConsumerDashboard";

import FarmerDashboard from "./pages/FarmerDashboard";
import MyCrops from "./pages/MyCrops";
import MarketPrices from "./pages/MarketPrices";
import BuyerDiscovery from "./pages/BuyerDiscovery";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Login Pages */}
        <Route path="/farmer-login" element={<FarmerLogin />} />
        <Route path="/consumer-login" element={<ConsumerLogin />} />

        {/* Farmer Portal */}
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/my-crops" element={<MyCrops />} />
        <Route path="/market-prices" element={<MarketPrices />} />
        <Route path="/find-buyers" element={<BuyerDiscovery />} />
        <Route path="/orders" element={<Orders />} />

        {/* Consumer Portal */}
        <Route
          path="/consumer-dashboard"
          element={<ConsumerDashboard />}
        />

        {/* Unknown Routes */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
