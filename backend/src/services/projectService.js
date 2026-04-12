 /*
    Project Service responsible for business logic related to projects
    */

import { generateShortId } from "../utils/id";
export class ProjectService {
    /*
    @PARAMS
        projectDomain: domain logic (rules)
        projectRepo: data access (db interface)
    */
    constructor({ projectDomain, projectRepo }) { // REMEMBER: this is passed from container:: "../container.js"
        this.projectDomain = projectDomain;
        this.projectRepo = projectRepo;
    }

    /* 
        @PARAMS 
            data: { name, description, ... }
            user: { id, name, ... } // from auth context
    */ 
    async createProject(data, user) {
        console.log("Creating project with data:", data, "for user:", user); // print debug
        
        const project = await this.projectDomain.createProject({
            ...data,
            shortId: generateShortId()
            }, user);

        console.log("back to service after domain");
        const created = await this.projectRepo.create(project);
        console.log("repo fails?");
        return created;
    }

    //user specific
    // PARAMS: user: { id, name, ... }
    async getMyProjects(user) {
        return await this.projectRepo.getByOwnerId(user.id);
    }

    async getProjectByShortId(shortId, user) {
        const project = await this.projectRepo.getByShortId(shortId);
        if (!project) throw new Error("Not found");

        if (!this.projectDomain.canViewProject(project, user)) {
            throw new Error("Unauthorized");
        }
        return project;
    }

    async deleteProject(projectId, user) {
        const project = await this.projectRepo.getById(projectId);
        if (!project)  throw new Error("Not found");
    
        if (!this.projectDomain.canDeleteProject(project, user)) {
            throw new Error("Unauthorized");
        }
        return await this.projectRepo.delete(projectId);
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
