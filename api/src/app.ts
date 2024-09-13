import express from "express";
const cors = require("cors");
// import tasksRoutes from "./routes/tasks"; I would use this if we had a mysqldb
import mockTaskRoutes from "./routes/mock-db-tasks";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Need this to allow CORS stuff
// Also need express.json to allow json post, patch payload
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:4200",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
  express.json()
);

// Defined all of our routes
// This would be used if the user had a local mysql instance and a tonic db with a tasks table
// app.use("/api", tasksRoutes);

app.use("/api", mockTaskRoutes);

// Logging to let you know the backend is up
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
