 /*
    Project Service responsible for business logic related to projects
    */

import { generateShortId } from "../utils/id.js";
export class ProjectService {
    /*
    @PARAMS
        projectDomain: domain logic (rules)
        projectRepo: data access (db interface)
        membershipRepo: data access (db interface)
    */
    constructor({ projectDomain, projectRepo, membershipRepo }) { // REMEMBER: this is passed from container:: "../container.js"
        this.projectDomain = projectDomain;
        this.projectRepo = projectRepo;
        this.membershipRepo = membershipRepo;
    }

    /* 
        @PARAMS 
            data: { name, description, ... }
            user: { id, name, ... } // from auth context
    */ 
    async createProject(data, user) {
        const project = await this.projectDomain.createProject({
            ...data,
            shortId: generateShortId(),
            ownerId: user.id
            });

        console.log("back to service after domain");
        const created = await this.projectRepo.create(project);
        console.log("repo fails?");
        return created;
    }

    //user specific
    // PARAMS: user: { id, name, ... }
    //returns all projects owner or member
    async getMyProjects(user) {
        return await this.projectRepo.getProjectsForUser(user.id);
    }

    //addition for filtering
    async getOwnedProjects(user) {
        return await this.projectRepo.getByOwnerId(user.id);
    }

    //fetching project details
    async getProjectByShortId(shortId, user) {
        const project = await this.projectRepo.getByShortId(shortId);
        if (!project) throw new Error("Not found");
        //think its best for service to fetch and pass to domain for authorization?
        const membership = this.membershipRepo.isProjectMember(user.id, project.id);
        //either way its clean and working fine
        if (!this.projectDomain.canViewProject(project, user, membership)) {
            throw new Error("Unauthorized");
        }
        return project;
    }

    async deleteProject(projectShortId, user) {
        const project = await this.projectRepo.getByShortId(projectShortId);
        if (!project)  throw new Error("Not found");
    
        if (!this.projectDomain.canDeleteProject(project, user)) {
            throw new Error("Unauthorized");
        }
        return await this.projectRepo.deleteById(project.id);
    }

    async updateProject(projectId, data, user) {
        const project = await this.projectRepo.getById(projectId);
        if (!project)  throw new Error("Not found");

        if (!this.projectDomain.canEditProject(project, user)) {
            throw new Error("Unauthorized");
        }
        const updatedProject = this.projectDomain.updateProject(project, data);
        return await this.projectRepo.update(updatedProject);
    }    
}
