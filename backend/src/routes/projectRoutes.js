//router for projects
import express from "express";
import {projectService} from "../container.js"
//auth coming with middleware

const router = express.Router();

//root creates project
router.post("/", (req, res) => {
   const project = projectService.createProject(req.body); //doesnt exist yet but will soon 
    //remember projectService is a singleton and its instaniated in  "../container.js"
})

//more stubs to come just want the basics here for now