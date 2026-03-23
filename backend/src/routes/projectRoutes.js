//router for projects
import express from "express";
import {projectService} from "../container.js"
//auth coming with middleware
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

//TODO: Left off here this and projectService

//root creates project
router.post("/", requireAuth, async (req, res) => {
    console.log(req.body) //testing curl here 3/23/26
    /* 
    @PARAMS: name, description, ownerID
    */
   const project = await projectService.createProject(
    req.body, req.user);  //remember projectService is a singleton and its instaniated in  "../container.js" 
    // need a auth middleware to decode JWT token to get userID eventually 
   
    res.json(project); //testing curl here 3/23/26
})

export default router;

//more stubs to come just want the basics here for now

//router.get("/:id") 