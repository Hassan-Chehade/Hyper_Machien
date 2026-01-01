const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const db = require("./db"); // your database connection

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const usersRouter = require("./routes/users");
const adminRouter = require("./routes/admin");
const heroRouter = require("./routes/hero");
app.use("/api", usersRouter);
app.use("/api/admin", adminRouter);
app.use("/api/hero", heroRouter);

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ---------------- Products Routes ----------------
app.get("/api/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// ---------------- Server ----------------
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
