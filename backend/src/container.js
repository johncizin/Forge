    //central wiring
    //all dependencies are created and injected here

//---Services---
import { ProjectService } from "./services/projectService.js";

//---Domain---
import * as projectDomain from "./domain/project.js";


export const projectService = new ProjectService({
        projectDomain
});

//rest will come
