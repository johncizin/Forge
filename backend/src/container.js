    //central wiring
    //all dependencies are created and injected here

//---Services---
import { ProjectService } from "./services/projectService.js";
import { AuthService } from "./services/authService.js";
import { UserService } from "./services/userService.js";
import { TaskService } from "./services/taskService.js";

//---Domain---
import * as projectDomain from "./domain/project.js";
import * as authDomain from "./domain/auth.js";
import * as taskDomain from "./domain/task.js";

//---Repositories---
import * as projectRepo from "./db/repos/projectRepos.js";
import * as userRepo from "./db/repos/userRepos.js";
import * as taskRepo from "./db/repos/taskRepo.js";


export const projectService = new ProjectService({
        projectDomain,
        projectRepo
});

export const authService = new AuthService({
        userRepo,
        authDomain
});

export const userService = new UserService({
        userRepo,
        authDomain
});

export const taskService = new TaskService({
        taskDomain,
        taskRepo,
        projectRepo
});

//membership



//rest will come
