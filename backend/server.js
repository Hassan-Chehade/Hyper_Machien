const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const db = require("./db"); // MySQL connection

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(cors()); // allows all origins; adjust if needed
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* =========================
   ROUTES
========================= */
app.use("/api/users", require("./routes/users")); // login & register
app.use("/api/admin", require("./routes/admin"));
app.use("/api/hero", require("./routes/hero"));

/* =========================
   MULTER CONFIG (file uploads)
========================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

/* =========================
   PRODUCTS ROUTE
========================= */
app.get("/api/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});

/* =========================
   SERVER START
========================= */
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
