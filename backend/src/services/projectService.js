 /*
    Project Service responsible for business logic related to projects
    */
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
        const project = this.projectDomain.createProject({...data}, user); //have to add auth for the user.id to work //added 4/6/26
        const created = await this.projectRepo.create(project);
        return created;
    }

    //user specific
    // PARAMS: user: { id, name, ... }
    async getMyProjects(user) {
        return await this.projectRepo.getById(user.id);
    }

    async getProjectById(projectId, user) {
        const project = await this.projectRepo.getById(projectId);
        if (project.ownerId !== user.id) {
            throw new Error("Unauthorized");
        }
        return project;
    }

    async deleteProject(projectId, user) {
        const project = await this.projectRepo.getById(projectId);
        if (project.ownerId !== user.id) {
            throw new Error("Unauthorized");
        }
        return await this.projectRepo.delete(projectId);
    }

    async updateProject(projectId, data, user) {
        const project = await this.projectRepo.getById(projectId);
        if (project.ownerId !== user.id) {
            throw new Error("Unauthorized");
        }
        const updatedProject = this.projectDomain.updateProject(project, data);
        return await this.projectRepo.update(updatedProject);
    }    
}
