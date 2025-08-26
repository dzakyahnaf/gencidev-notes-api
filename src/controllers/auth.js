import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // validasi input
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password required" });
    }

    // cek apakah username sudah ada
    const [exist] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (exist.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // insert user baru
    const [result] = await pool.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashed]
    );

    res.json({ message: "User registered", userId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    console.log("DEBUG body:", req.body); // 👈 log body yang diterima
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password required" });
    }

    // cari user
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const user = rows[0];

    // cek password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // generate JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("DEBUG error:", err);
    res.status(500).json({ error: err.message });
  }
};
