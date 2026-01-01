const mysql = require("mysql2");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") }); // Load .env from backend directory

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database!");

    // Create tables if they don't exist
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        UserID INT AUTO_INCREMENT PRIMARY KEY,
        Username VARCHAR(255) NOT NULL UNIQUE,
        Email VARCHAR(255) NOT NULL UNIQUE,
        PASSWORD VARCHAR(255) NOT NULL
      )
    `;
    db.query(createUsersTable, (err) => {
      if (err) console.error("Error creating users table:", err);
      else console.log("Users table ready");
    });

    const createProductsTable = `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(255),
        price DECIMAL(10, 2),
        img VARCHAR(255)
      )
    `;
    db.query(createProductsTable, (err) => {
      if (err) console.error("Error creating products table:", err);
      else console.log("Products table ready");
    });

    const createHeroTable = `
      CREATE TABLE IF NOT EXISTS hero (
        id INT AUTO_INCREMENT PRIMARY KEY,
        img VARCHAR(255) NOT NULL
      )
    `;
    db.query(createHeroTable, (err) => {
      if (err) console.error("Error creating hero table:", err);
      else console.log("Hero table ready");
    });
  }
});

module.exports = db;
