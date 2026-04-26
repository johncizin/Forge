import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { membershipService } from "../container.js";

const router = express.Router();

//thinking through this still
//going to mount this as "/projects" in app.js to keep clean RESTful patterns while having

//Project
router.get("/:projectId/members", requireAuth, async (req, res) => {
    try{
        console.log("Fetching project members for projectId:", req.params.projectId); //debug
        const members = await membershipService.getProjectMembers(req.params.projectId, req.user);
        res.json(members);
    }catch (err) {
        res.status(400).json({ error: err.message });
    }
})

router.post("/:projectId/members", requireAuth, async (req, res) => {
    try {
        const member = await membershipService.addProjectMember(req.params.projectId, req.body.userId, req.user);
        res.json(member);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

router.delete("/:projectId/members/:memberId", requireAuth, async (req, res) => {
    try {
        await membershipService.removeProjectMember(req.params.projectId, req.params.memberId, req.user);
        res.json({ message: "Member removed successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

//Task 
router.get("/:taskId/members", requireAuth, async (req, res) => {
    try {
        const members = await membershipService.getTaskMembers(req.params.taskId, req.user);
        res.json(members);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

router.post("/:taskId/members", requireAuth, async (req, res) => {
    try {
        const member = await membershipService.addTaskMember(req.params.taskId, req.body.userId, req.user);
        res.json(member);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

router.delete("/:taskId/members/:memberId", requireAuth, async (req, res) => {
    try{
        await membershipService.removeTaskMember(req.params.taskId, req.params.memberId, req.user);
        res.json({ message: "Member removed successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})


export default router;

