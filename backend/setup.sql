-- Create database if not exists
CREATE DATABASE IF NOT EXISTS hyper;

-- Use the database
USE hyper;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  UserID INT AUTO_INCREMENT PRIMARY KEY,
  Username VARCHAR(255) NOT NULL UNIQUE,
  Email VARCHAR(255) NOT NULL UNIQUE,
  PASSWORD VARCHAR(255) NOT NULL
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255),
  price DECIMAL(10, 2),
  img VARCHAR(255)
);

-- Create hero table
CREATE TABLE IF NOT EXISTS hero (
  id INT AUTO_INCREMENT PRIMARY KEY,
  img VARCHAR(255) NOT NULL
);

-- Insert admin user if not exists (optional, since login checks hardcoded)
-- But for consistency, perhaps not needed since admin is hardcoded in code.
