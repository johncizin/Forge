//express
import express from "express";
import cors from "cors";
//--routes--
import projectRoutes from "./routes/projectRoutes.js";
import  authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use("/projects", projectRoutes);
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

export default app; 