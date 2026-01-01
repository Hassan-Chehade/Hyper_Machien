const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Admin credentials
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

// Upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Hero upload setup
const heroStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/hero/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const heroUpload = multer({ storage: heroStorage });

// Admin login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD)
    return res.json({ success: true, message: "Admin logged in" });
  res.status(401).json({ success: false, message: "Invalid admin credentials" });
});

// --- Products ---
// Add product
router.post("/add-product", upload.single("img"), (req, res) => {
  const { name, category, price } = req.body;
  const img = req.file ? `/uploads/${req.file.filename}` : "";

  db.query(
    "INSERT INTO products (name, category, price, img) VALUES (?, ?, ?, ?)",
    [name, category, price, img],
    (err, result) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.json({ success: true, productId: result.insertId });
    }
  );
});

// Update product
router.put("/update-product/:id", upload.single("img"), (req, res) => {
  const { id } = req.params;
  const { name, category, price } = req.body;
  const img = req.file ? `/uploads/${req.file.filename}` : req.body.img;

  db.query(
    "UPDATE products SET name=?, category=?, price=?, img=? WHERE id=?",
    [name, category, price, img, id],
    (err) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.json({ success: true });
    }
  );
});

// Delete product
router.delete("/delete-product/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true });
  });
});

// --- Hero ---
// Get latest hero
router.get("/hero", (req, res) => {
  db.query("SELECT * FROM hero ORDER BY id DESC LIMIT 1", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0] || null);
  });
});

// Add hero
router.post("/add-hero", heroUpload.single("img"), (req, res) => {
  console.log("Add hero route hit");
  console.log("req.file:", req.file);
  if (!req.file) {
    console.log("No file uploaded");
    return res.status(400).json({ error: "Image is required" });
  }
  const img = `/uploads/hero/${req.file.filename}`;
  console.log("Inserting img path:", img);

  db.query("INSERT INTO hero (img) VALUES (?)", [img], (err, result) => {
    if (err) {
      console.log("DB insert error:", err);
      return res.status(500).json({ error: err.message });
    }
    console.log("Hero inserted, id:", result.insertId);
    res.json({ success: true, id: result.insertId, img });
  });
});

// Update hero
router.put("/update-hero/:id", heroUpload.single("img"), (req, res) => {
  const { id } = req.params;
  if (!req.file) return res.status(400).json({ error: "Image is required" });
  const img = `/uploads/hero/${req.file.filename}`;

  db.query("UPDATE hero SET img=? WHERE id=?", [img, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, img });
  });
});

// Delete hero
router.delete("/delete-hero/:id", (req, res) => {
  const { id } = req.params;

  // First get image path to delete the file
  db.query("SELECT img FROM hero WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Not found" });

    const imgPath = path.join(__dirname, "..", results[0].img.replace(/^\/+/, ''));
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath); // delete file

    // Delete from database
    db.query("DELETE FROM hero WHERE id = ?", [id], (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json({ success: true });
    });
  });
});

module.exports = router;
