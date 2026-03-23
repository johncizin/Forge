    //central wiring
    //all dependencies are created and injected here

//---Services---
import { ProjectService } from "./services/projectService.js";

//---Domain---
import * as projectDomain from "./domain/project.js";

//---Repositories---
import * as projectRepo from "./db/repos/projectRepos.js";


export const projectService = new ProjectService({
        projectDomain,
        projectRepo
});

//rest will come
