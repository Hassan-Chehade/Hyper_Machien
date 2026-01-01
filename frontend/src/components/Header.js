import React, { useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext"; // import cart context

import logo from "../assets/logoo.png";
import yellowLogo from "../assets/yellow.png";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { user, logout } = useAuth();
  const { cart } = useCart(); // get cart
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    logout();
    navigate("/login");
    setNavOpen(false);
  };

  const navLinks = [
    { name: "Home", link: "hero" },
    { name: "Products", link: "Products" },
    { name: "Types", link: "Types" },
    { name: "Services", link: "Services" },
    { name: "Reviews", link: "Reviews" },
    { name: "Contact", link: "Contact" },
  ];

  const handleNavClick = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setNavOpen(false);
  };

  return (
    <header className="fixed w-full top-0 left-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-5 lg:px-20">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavClick("hero")}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img src={hovered ? yellowLogo : logo} alt="Logo" className="w-10 h-10" />
          <span
            className={`text-2xl font-bold underline italic ${
              hovered ? "text-[#f5e60d]" : "text-[#502ec3]"
            }`}
          >
            Hyper Machines
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-6 items-center">
          {navLinks.map((item, i) => (
            <button
              key={i}
              onClick={() => handleNavClick(item.link)}
              className="bg-[#502ec3] text-white px-3 py-2 rounded-lg hover:bg-[#f5e60d] hover:text-black"
            >
              {item.name}
            </button>
          ))}

          {isAdmin && (
            <RouterLink
              to="/admin"
              className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-400"
            >
              Admin Panel
            </RouterLink>
          )}

          {/* Cart icon only for users */}
          {user && !isAdmin && (
            <button
              onClick={() => navigate("/cart")}
              className="relative bg-[#502ec3] text-white px-3 py-2 rounded-lg hover:bg-[#f5e60d] hover:text-black flex items-center"
            >
              <FaShoppingCart className="mr-2" />
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                  {cart.length}
                </span>
              )}
            </button>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-[#502ec3] text-white px-3 py-2 rounded-lg hover:bg-[#f5e60d]"
            >
              Logout ({user.username})
            </button>
          ) : (
            <RouterLink
              to="/login"
              className="bg-[#502ec3] text-white px-3 py-2 rounded-lg hover:bg-[#f5e60d]"
            >
              Login
            </RouterLink>
          )}
        </nav>

        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <button onClick={() => setNavOpen(!navOpen)}>
            {navOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {navOpen && (
        <div className="lg:hidden bg-white w-full py-5 px-5 shadow-md">
          {navLinks.map((item, i) => (
            <button
              key={i}
              onClick={() => handleNavClick(item.link)}
              className="block py-3 w-full text-left hover:text-[#502ec3]"
            >
              {item.name}
            </button>
          ))}

          {isAdmin && (
            <RouterLink
              to="/admin"
              onClick={() => setNavOpen(false)}
              className="block py-3 font-semibold text-red-500"
            >
              Admin Panel
            </RouterLink>
          )}

          {/* Cart icon for users in mobile menu */}
          {user && !isAdmin && (
            <button
              onClick={() => {
                navigate("/cart");
                setNavOpen(false);
              }}
              className="block py-3 w-full text-left flex items-center gap-2"
            >
              <FaShoppingCart /> Cart ({cart.length})
            </button>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="block py-3 w-full text-left hover:text-[#502ec3]"
            >
              Logout ({user.username})
            </button>
          ) : (
            <RouterLink
              to="/login"
              onClick={() => setNavOpen(false)}
              className="block py-3 font-semibold hover:text-[#502ec3]"
            >
              Login
            </RouterLink>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
