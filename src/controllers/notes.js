import pool from "../config/db.js";

// Create Note
export const createNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, content } = req.body;

    const [result] = await pool.query(
      "INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)",
      [userId, title, content]
    );

    res.json({ message: "Note created", noteId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Notes (by logged-in user)
export const getNotes = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await pool.query("SELECT * FROM notes WHERE user_id = ?", [
      userId,
    ]);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Note by ID
export const getNoteById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM notes WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Note not found" });

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Note
export const updateNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { title, content } = req.body;

    const [result] = await pool.query(
      "UPDATE notes SET title = ?, content = ? WHERE id = ? AND user_id = ?",
      [title, content, id, userId]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Note not found or not yours" });

    res.json({ message: "Note updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Note
export const deleteNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM notes WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Note not found or not yours" });

    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
