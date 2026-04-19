import express from "express";

//import { inviteService } from "../container.js"
import { requireAuth } from "../middleware/requireAuth.js" //not sure if necessary idk, i guess mine as well check it has to be good practice
import { isMember } from "../utils/membershipUtil.js";
// import { inivteService } from "../container.js";

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

})

//accept invite
router.post("/accept/:inviteId", requireAuth, async (req, res) => {

})

//decline invite
router.post("/decline/:inviteId", requireAuth, async(req, res) => {

})

//deleting invite 
router.delete("/:inviteId", requireAuth, async(req, res) => {
    
})

router.get("/my-invites", requireAuth, async(req, res) => {
    
})

//might show in user settings, idk this is tough should the members be able to see who is pending (i think so)
router.get("/pending/:projectId", requireAuth, async(req, res) => {

})


export default router;