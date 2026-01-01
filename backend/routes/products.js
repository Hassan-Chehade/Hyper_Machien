const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// GET all products
router.get("/products", (req, res) => {
  const sql = "SELECT * FROM products ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ADD product
router.post("/admin/add-product", upload.single("img"), (req, res) => {
  const { name, category, price } = req.body;
  const img = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = "INSERT INTO products (name, category, price, img) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, category, price, img], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: result.insertId });
  });
});

// UPDATE product
router.put("/admin/update-product/:id", upload.single("img"), (req, res) => {
  const { id } = req.params;
  const { name, category, price } = req.body;
  const img = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = img
    ? "UPDATE products SET name=?, category=?, price=?, img=? WHERE id=?"
    : "UPDATE products SET name=?, category=?, price=? WHERE id=?";

  const params = img
    ? [name, category, price, img, id]
    : [name, category, price, id];

  db.query(sql, params, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// DELETE product
router.delete("/admin/delete-product/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM products WHERE id=?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

module.exports = router;
