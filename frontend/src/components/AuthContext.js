import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // login function (fixed)
  const login = async (username, password) => {
    try {
      // Use the correct backend endpoint for login
      const res = await axios.post("http://localhost:5000/api/users/login", {
        username,
        password,
      });

      const data = res.data;

      if (data.success) {
        setUser(data.user); // save user info (role, id, etc.)
        localStorage.setItem("user", JSON.stringify(data.user)); // persist to localStorage
        return { success: true, role: data.user.role, user: data.user };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, message: "Server error" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // remove from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
