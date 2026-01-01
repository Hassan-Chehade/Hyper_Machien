// server/routes/hero.js
const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer setup for hero images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  }
});

// ------------------ Routes ------------------

// GET all hero images
router.get("/", (req, res) => {
  console.log("Get hero route hit");
  db.query("SELECT * FROM hero", (err, results) => {
    if (err) {
      console.log("DB query error:", err);
      return res.status(500).json({ error: err.message });
    }
    console.log("Heroes fetched:", results.length);
    res.json(results);
  });
});

// ADD a hero image - moved to admin router for consistency with products

module.exports = router;
