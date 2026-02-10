const express = require("express");
const router = express.Router();
const db = require("../db"); // MySQL connection
const bcrypt = require("bcryptjs");

/* =========================
   REGISTER USER
========================= */
router.post("/register", (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const query =
      "INSERT INTO users (Username, Email, password) VALUES (?, ?, ?)";

    db.query(query, [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("REGISTER ERROR:", err);
        return res.status(500).json({
          success: false,
          message: "Database error",
        });
      }

      res.status(201).json({
        success: true,
        message: "User registered successfully",
      });
    });
  } catch (err) {
    console.error("REGISTER EXCEPTION:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* =========================
   LOGIN USER
========================= */
router.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    // Admin shortcut
    if (username === "admin" && password === "admin123") {
      return res.json({
        success: true,
        user: {
          id: 0,
          username: "admin",
          email: "admin@example.com",
          role: "admin",
        },
      });
    }

    // Query DB for normal users
    const query = "SELECT * FROM users WHERE Username = ?";

    db.query(query, [username], (err, results) => {
      if (err) {
        console.error("LOGIN ERROR:", err);
        return res.status(500).json({
          success: false,
          message: "Database error",
        });
      }

      if (!results || results.length === 0) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      const user = results[0];

      if (!user.password) {
        return res.status(500).json({
          success: false,
          message: "Password not set for user",
        });
      }

      // Compare hashed password
      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message: "Incorrect password",
        });
      }

      // Successful login
      res.json({
        success: true,
        user: {
          id: user.UserID,
          username: user.Username,
          email: user.Email,
          role: "user",
        },
      });
    });
  } catch (err) {
    console.error("LOGIN EXCEPTION:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
