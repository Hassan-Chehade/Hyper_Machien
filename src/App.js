import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Login from "./pages/login";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";

import { AuthProvider } from "./components/AuthContext";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />        
          <Route path="/login" element={<Login />} />  
          <Route path="/products" element={<ProductsPage />} /> 
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
