import express from "express";
const cors = require("cors");
import tasksRoutes from "./routes/tasks";

const app = express();
const port = 3000;

// Need this to allow CORS stuff
// Also need express.json to allow json post, patch payload
app.use(
  cors({
    origin: "http://localhost:4200", // Replace with your Angular app's URL
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
  express.json()
);

// Defined all of our routes
app.use("/api", tasksRoutes);

// Logging to let you know the backend is up
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
