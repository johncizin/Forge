//router for projects
import express from "express";
import {projectService} from "../container.js"
//auth coming with middleware
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

//TODO: Left off here this and projectService

/*
The flow here is frontend -> endpoint -> service -> domain (for rules) -> repo (for db) and back up.

authenticate user then authorize with domain rules 
*/

//root creates project
router.post("/", requireAuth, async (req, res) => {
    try{
        const project = await projectService.createProject(req.body, req.user);
        res.json(project);
    } catch (err) {
        res.status(400).json({ error: err.message }); //better erroring soon
    }
})

//for dashboard GUI
router.get("/my-projects", requireAuth, async (req, res) => {
    try {
        const projects = await projectService.getMyProjects(req.user);
        res.json(projects);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

//for displaying project
router.get("/:id", requireAuth, async (req, res) => {
    try {
        const project = await projectService.getProjectById(req.params.id, req.user);
        res.json(project);
    } catch (err) {
         res.status(500).json({ error: "Internal server error" });
    }
})

router.delete("/:id", requireAuth, async (req, res) => {
    try {
        await projectService.deleteProject(req.params.id, req.user);
        res.json({ success: true });
    } catch (err) {
        res.status(403).json({ error: err.message });
    }
})

router.put("/:id", requireAuth, async (req, res) => {
    try {
        const updated = await projectService.updateProject(req.params.id, req.body, req.user);
        res.json(updated);
    }
    catch (err) {
        res.status(403).json({ error: err.message });
    }
})



export default router;

//more stubs to come just want the basics here for now

//router.get("/:id") 