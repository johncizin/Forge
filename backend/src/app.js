//express
import express from "express";
import cors from "cors";
//--routes--
import projectRoutes from "./routes/projectRoutes.js";
import  authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import inviteRoutes from "./routes/inviteRoutes.js";
import membershipRoutes from "./routes/membershipRoutes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use("/projects", projectRoutes);
app.use("/projects", membershipRoutes);
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/tasks", membershipRoutes);
app.use("/invite", inviteRoutes);
//app.use("/membership", membershipRoutes); dont think im gonna do this

export default app; 