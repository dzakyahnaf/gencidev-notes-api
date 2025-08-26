// index.js (routes)
import express from "express";
import authRoutes from "./auth.js";
import notesRoutes from "./notes.js";

const router = express.Router();
router.get("/health", (req, res) => res.json({ status: "ok" }));
router.use("/auth", authRoutes);
router.use("/notes", notesRoutes);

export default router;
