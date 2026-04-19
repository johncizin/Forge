import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
// import { membershipService } from "../container.js";

const router = express.Router();

//thinking through this still
//going to mount this as "/projects" in app.js to keep clean RESTful patterns while having

//Project
router.get("/:projectId/members", requireAuth, async (req, res) => {

})

router.post("/:projectId/members", requireAuth, async (req, res) => {
    
})

router.delete("/:projectId/members/:memberId", requireAuth, async (req, res) => {
    
})

//Task 
router.get("/:taskId/members", requireAuth, async (req, res) => {

})

router.post("/:taskId/members", requireAuth, async (req, res) => {
    
})

router.delete("/:taskId/members/:memberId", requireAuth, async (req, res) => {
    
})


export default router;

