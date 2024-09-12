import express, { Request, Response } from "express";
import pool from "../dbConfig"; // Your database connection

const router = express.Router();

router.get("/tasks", async (req: Request, res: Response) => {
  try {
    const [tasks] = await pool.query(
      "SELECT * FROM tasks WHERE deletedAt IS NULL"
    );

    res.json(tasks);
  } catch (err) {
    res.status(500).send("Error retrieving tasks");
  }
});

router.post("/tasks", async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    const result = await pool.query("INSERT INTO tasks (title) VALUES (?)", [
      title,
    ]);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send("Error creating task");
  }
});

router.patch("/tasks/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  const { title, completedAt, deletedAt } = req.body;

  const dateCompletedAt = !!completedAt ? new Date(completedAt) : null;

  try {
    await pool.query(
      "UPDATE tasks SET title = ?, completedAt = ?, deletedAt = ? WHERE id = ?",
      [title, dateCompletedAt, deletedAt, id]
    );
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send("Error updating task");
  }
});

router.delete("/tasks/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const deletedAt = new Date();

  try {
    await pool.query("UPDATE tasks SET deletedAt = ? WHERE id = ?", [
      deletedAt,
      id,
    ]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send("Error soft deleting task");
  }
});

export default router;
