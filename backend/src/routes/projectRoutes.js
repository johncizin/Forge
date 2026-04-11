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
        console.log("backed to router after create"); // print debug
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
router.get("/:shortId", requireAuth, async (req, res) => {
    try {
        const project = await projectService.getProjectByShortId(req.params.shortId, req.user);
        console.log("route shortId project: ", project);
        res.json(project);
    } catch (err) {
         res.status(500).json({ error: "Internal server error" });
    }
})

router.delete("/:shortId", requireAuth, async (req, res) => {
    try {
        await projectService.deleteProject(req.params.shortId, req.user);
        res.json({ success: true });
    } catch (err) {
        res.status(403).json({ error: err.message });
    }
})

router.put("/:shortId", requireAuth, async (req, res) => {
    try {
        const updated = await projectService.updateProject(req.params.shortId, req.body, req.user);
        res.json(updated);
    }
    catch (err) {
        res.status(403).json({ error: err.message });
    }
})



export default router;