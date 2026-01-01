import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Login from "./pages/login";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
import CartPage from "./pages/CartPage";

import { AuthProvider, useAuth } from "./components/AuthContext";
import { CartProvider } from "./components/CartContext";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <HeaderWrapper />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

// Header wrapper to access AuthContext
function HeaderWrapper() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  return <Header user={user} isAdmin={isAdmin} />;
}

export default App;
