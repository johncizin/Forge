    //central wiring
    //all dependencies are created and injected here

//---Services---
import { ProjectService } from "./services/projectService.js";
import { AuthService } from "./services/authService.js";
import { UserService } from "./services/userService.js";
import { TaskService } from "./services/taskService.js";
import { InviteService } from "./services/inviteService.js";
import { MembershipService } from "./services/membershipService.js";

//---Domain---
import * as projectDomain from "./domain/project.js";
import * as authDomain from "./domain/auth.js";
import * as taskDomain from "./domain/task.js";
import * as inviteDomain from "./domain/invite.js"
import * as membershipDomain from "./domain/membership.js";

//---Repositories---
import * as projectRepo from "./db/repos/projectRepos.js";
import * as userRepo from "./db/repos/userRepos.js";
import * as taskRepo from "./db/repos/taskRepos.js";
import * as inviteRepo from "./db/repos/inviteRepos.js";
import * as membershipRepo from "./db/repos/membershipRepos.js";

export const projectService = new ProjectService({
        projectDomain,
        projectRepo,
        membershipRepo
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
        projectRepo,
        membershipRepo
});

export const membershipService = new MembershipService({
        membershipDomain,
        membershipRepo,
        projectRepo
})

export const inviteService = new InviteService({
        inviteDomain,
        inviteRepo, 
        membershipService,
        membershipRepo,
        projectRepo
})


