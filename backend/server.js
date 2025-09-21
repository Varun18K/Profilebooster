// server.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD || "Varun@1807",
  database: "profile_booster"
});

db.connect(err => {
  if (err) console.error("❌ Database connection failed:", err);
  else console.log("✅ Connected to MySQL database: profile_booster");
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// JWT auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  jwt.verify(token, process.env.JWT_SECRET || "mysecretkey", (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token." });
    req.user = user; 
    next();
  });
};

// GET current user info (protected)
app.get("/users/me", authenticateToken, (req, res) => {
  const sql = "SELECT id, username, created_at FROM users WHERE id = ?";
  db.query(sql, [req.user.userId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0) return res.status(404).json({ error: "User not found" });
    res.json(results[0]);
  });
});

// POST signup
app.post(
  "/users",
  body("username").isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
      db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ error: "Database insert failed" });

        const token = jwt.sign(
          { userId: result.insertId, username },
          process.env.JWT_SECRET || "mysecretkey",
          { expiresIn: "1h" }
        );

        res.json({ message: "User created successfully", userId: result.insertId, token });
      });
    } catch (err) {
      res.status(500).json({ error: "Password hashing failed" });
    }
  }
);

// POST login
app.post(
  "/login",
  body("username").notEmpty(),
  body("password").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], async (err, results) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      if (results.length === 0) return res.status(404).json({ error: "User not found" });

      const user = results[0];
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(400).json({ error: "Invalid credentials" });

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET || "mysecretkey",
        { expiresIn: "1h" }
      );

      res.json({ message: "Login successful", token });
    });
  }
);

// PUT update user (protected)
app.put(
  "/users/:id",
  authenticateToken,
  body("username").optional().isLength({ min: 3 }),
  body("password").optional().isLength({ min: 6 }),
  async (req, res) => {
    if (parseInt(req.params.id) !== req.user.userId)
      return res.status(403).json({ error: "You can only update your own account" });

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    let { username, password } = req.body;

    if (!username && !password) return res.status(400).json({ error: "Provide username or password to update" });

    const fields = [];
    const values = [];

    if (username) {
      fields.push("username = ?");
      values.push(username);
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      fields.push("password = ?");
      values.push(hashedPassword);
    }

    values.push(id);
    const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    db.query(sql, values, (err, result) => {
      if (err) return res.status(500).json({ error: "Database update failed" });
      if (result.affectedRows === 0) return res.status(404).json({ error: "User not found" });
      res.json({ message: "User updated successfully" });
    });
  }
);

// DELETE user (protected)
app.delete("/users/:id", authenticateToken, (req, res) => {
  if (parseInt(req.params.id) !== req.user.userId)
    return res.status(403).json({ error: "You can only delete your own account" });

  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database delete failed" });
    if (result.affectedRows === 0) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
