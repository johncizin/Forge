//router for projects
import express from "express";
import {projectService} from "../container.js"
//auth coming with middleware

const router = express.Router();

//TODO: Left off here this and projectService

//root creates project
router.post("/", (req, res) => {
   const project = await projectService.createProject(req.body); //doesnt exist yet but will soon 
    //remember projectService is a singleton and its instaniated in  "../container.js"
})

//more stubs to come just want the basics here for now

//router.get("/:id") 