const express = require("express");
const router = express.Router();
const db = require("../db"); // your database connection
const bcrypt = require("bcryptjs");

// REGISTER route
router.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = "INSERT INTO users (Username, Email, PASSWORD) VALUES (?, ?, ?)";

  db.query(query, [username, email, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    res.json({ success: true, message: "User registered successfully" });
  });
});

// LOGIN route
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Missing username or password" });
  }

  // Check for admin login
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

  const query = "SELECT * FROM users WHERE Username = ?";

  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const user = results[0];

    // Compare password with hashed password stored in DB
    const passwordMatch = bcrypt.compareSync(password, user.PASSWORD);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    // Successful login: return user info without password
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
});

module.exports = router;
