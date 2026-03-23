//express setup
import express from "express";
//--routes--
import projectRoutes from "./routes/projectRoutes.js";

const app = express();

app.use(express.json());
app.use("/projects", projectRoutes);

export default app; 