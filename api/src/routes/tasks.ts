import express, { Request, Response } from "express";
import db from "../dbConfig";

const router = express.Router();

// GET /tasks - Retrieve tasks
router.get("/tasks", async (req: Request, res: Response) => {
  try {
    const tasks = await db("tasks").whereNull("deletedAt").select("*");

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving tasks");
  }
});

// POST /tasks - Create a new task
router.post("/tasks", async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    // Saves the task
    const [newTaskId] = await db("tasks").insert({ title }).returning("id");

    // Grabs the newly saved task
    const newTask = await db("tasks").where({ id: newTaskId }).first();

    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating task");
  }
});

// PATCH /tasks/:id - Update a task
router.patch("/tasks/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { title, completedAt, deletedAt } = req.body;

  const dateCompletedAt = completedAt ? new Date(completedAt) : null;
  const dateDeletedAt = deletedAt ? new Date(deletedAt) : null;

  try {
    await db("tasks").where({ id }).update({
      title,
      completedAt: dateCompletedAt,
      deletedAt: dateDeletedAt,
    });

    // Grabs the newly updated task
    const updatedTask = await db("tasks").where({ id }).first();

    res.status(200).json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating task");
  }
});

// DELETE /tasks/:id - Soft delete a task
router.delete("/tasks/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const deletedAt = new Date();

  try {
    await db("tasks").where({ id }).update({ deletedAt });

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error soft deleting task");
  }
});

export default router;
