//express
import express from "express";
//--routes--
import projectRoutes from "./routes/projectRoutes.js";
import  authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());
app.use("/projects", projectRoutes);
app.use("/auth", authRoutes);

export default app; 