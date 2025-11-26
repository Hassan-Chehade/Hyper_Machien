import React, { useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import { useAuth } from "./AuthContext";
import logo from "../assets/logoo.png";
import yellowLogo from "../assets/yellow.png";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = () => setNavOpen(!navOpen);
  const handleClose = () => setNavOpen(false);

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
      navigate("/", { replace: false });
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    handleClose();
  };

  return (
    <header className="fixed w-full top-0 left-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-5 lg:px-20">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavClick("hero")}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src={hovered ? yellowLogo : logo}
            alt="Logo"
            className="w-10 h-10 object-contain transition-all duration-200"
          />
          <span
            className={`text-2xl font-bold underline italic transition-colors duration-200 ${
              hovered ? "text-[#f5e60d]" : "text-[#502ec3]"
            }`}
          >
            Hyper Machines
          </span>
        </div>

        <nav className="hidden lg:flex gap-8 items-center">
          {navLinks.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(item.link)}
              className="cursor-pointer bg-[#502ec3] text-white px-3 py-2 rounded-lg hover:bg-[#f5e60d] hover:text-black transition-colors"
            >
              {item.name}
            </button>
          ))}

          {user ? (
            <button
              onClick={logout}
              className="bg-[#502ec3] hover:bg-[#f5e60d] text-white px-3 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          ) : (
            <RouterLink
              to="/login"
              className="bg-[#502ec3] hover:bg-[#f5e60d] text-white px-3 py-2 rounded-lg transition-colors"
            >
              Login
            </RouterLink>
          )}
        </nav>

        <div className="lg:hidden flex items-center gap-4">
          <button onClick={handleToggle}>
            {navOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
      </div>

      {navOpen && (
        <div className="lg:hidden bg-white w-full py-5 px-5 shadow-md absolute top-full left-0">
          {navLinks.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(item.link)}
              className="block py-3 w-full text-left hover:text-[#502ec3] transition-colors"
            >
              {item.name}
            </button>
          ))}

          {user ? (
            <button
              onClick={() => {
                logout();
                handleClose();
              }}
              className="block py-3 w-full text-left hover:text-[#502ec3] transition-colors"
            >
              Logout
            </button>
          ) : (
            <RouterLink
              to="/login"
              onClick={handleClose}
              className="block py-3 cursor-pointer hover:text-[#502ec3] transition-colors"
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
