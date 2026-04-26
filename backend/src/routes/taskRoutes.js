import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { taskService } from "../container.js";

const router = express.Router();


//create task
router.post("/", requireAuth, async (req, res) => {
    try {
         console.log("create task body:", req.body);
        const task = await taskService.createTask(req.body, req.user);
        console.log("created task:", task);
        res.json(task);
    } catch (err) {
        console.error("create task error:", err);
        res.status(400).json({ error: err.message });
    }
})

//get tasks for project
router.get("/project/:projectId", requireAuth, async (req, res) => {
    try {
        const tasks = await taskService.getTasksByProjectId(req.params.projectId, req.user);
        res.json(tasks);
    } catch (err) {
        console.error("task route: ",err);
        res.status(400).json({ error: err.message });
    }
})

//get task by shortId
router.get("/:shortId", requireAuth, async (req, res) => {
    try {
        const task = await taskService.getTaskByShortId(req.params.shortId, req.user);
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

//delete task
router.delete("/:shortId", requireAuth, async (req, res) => {
    try {
        await taskService.deleteTask(req.params.shortId, req.user);
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

//update task
router.put("/:shortId", requireAuth, async (req, res) => {
    try {
        const updated = await taskService.updateTask(req.params.shortId, req.body, req.user);
        res.json(updated);
    } catch (err) {
       // console.error("update task error:", err); :: PrismaClientVslidation Error 4/26/26
        res.status(400).json({ error: err.message });
    }
})

//update task status
router.patch("/:shortId/status", requireAuth, async (req, res) => {
    console.log("updating status for task", req.params.shortId, "to", req.body.status); //data is correct
    try {
        const updated = await taskService.updateTaskStatus(req.params.shortId, req.body.status, req.user);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

export default router;