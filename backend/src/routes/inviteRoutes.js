import express from "express";

import { requireAuth } from "../middleware/requireAuth.js" //not sure if necessary idk, i guess mine as well check it has to be good practice
import { inviteService } from "../container.js";

//dilemma here:
/*
Invite service shouldn't know about project or task
as it is just an endpoint from frontEnd Modal to route. To service as orchestrator, domain for bus logic then repo for persistence.

but needs a way to update "membership" when accepted which shouldn't be handled by project
and same with task 

membership might have to be full stack

*/

const router = express.Router();

//sending invite
router.post("/", requireAuth, async (req, res) => {
    try{
        const invite = await inviteService.sendInvite(req.body.projectShortId, req.body.email, req.user);
        res.json(invite);
    } catch (err) {
        console.error("invite error:", err.message);
        res.status(400).json({ error: err.message });
    }
})

//accept invite
router.post("/accept/:token", requireAuth, async (req, res) => {
    try{
        const invite = await inviteService.acceptInvite(req.params.token, req.user);
        res.json(invite);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

//decline invite
router.post("/decline/:inviteId", requireAuth, async(req, res) => {
    try{
        const invite = await inviteService.declineInvite(req.params.inviteId, req.user);
        res.json(invite);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

//deleting invite 
router.delete("/:inviteId", requireAuth, async(req, res) => {
    try{
        await inviteService.deleteInvite(req.params.inviteId, req.user);
        res.json({ message: "Invite deleted successfully" });
    }catch (err) {
        res.status(400).json({ error: err.message });
    }
})
//my pending
router.get("/my-invites", requireAuth, async(req, res) => {
    try{
        const invites = await inviteService.getMyInvites(req.user);
        res.json(invites);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

//might show in user settings, idk this is tough should the members be able to see who is pending (i think so)
router.get("/pending/:projectId", requireAuth, async(req, res) => {
    try{
        const invites = await inviteService.getPendingInvites(req.params.projectId, req.user);
        res.json(invites);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})


export default router;