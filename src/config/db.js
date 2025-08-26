import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "gencidev_notes",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
