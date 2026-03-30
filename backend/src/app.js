//express
import express from "express";
import cors from "cors";
//--routes--
import projectRoutes from "./routes/projectRoutes.js";
import  authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use("/projects", projectRoutes);
app.use("/auth", authRoutes);

export default app; 