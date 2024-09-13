import express, { Request, Response } from "express";

const router = express.Router();

let tasks: any[] = [];
let currentId = 1;

// GET /tasks - Retrieve tasks
router.get("/tasks", async (req: Request, res: Response) => {
  try {
    const activeTasks = tasks.filter((task) => !task.deletedAt);

    res.json(activeTasks);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving tasks");
  }
});

// POST /tasks - Create a new task
router.post("/tasks", async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    // Mocked new task
    const newTask = {
      id: currentId++,
      title,
      completedAt: null,
      deletedAt: null,
    };
    tasks.push(newTask);
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

  try {
    const taskIndex = tasks.findIndex((task) => task.id === id);

    // A check to make sure we find an updatable task
    if (taskIndex === -1) {
      return res.status(404).send("Task not found");
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      title: title || tasks[taskIndex].title,
      completedAt: completedAt ? new Date(completedAt) : null,
      deletedAt: deletedAt ? new Date(deletedAt) : tasks[taskIndex].deletedAt,
    };

    res.status(200).json(tasks[taskIndex]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating task");
  }
});

// DELETE /tasks/:id - Soft delete a task
router.delete("/tasks/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  try {
    // Finds the task we want to soft delete
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      return res.status(404).send("Task not found");
    }

    tasks[taskIndex].deletedAt = new Date();
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error soft deleting task");
  }
});

export default router;
