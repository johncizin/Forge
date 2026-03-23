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
        const project = this.projectDomain.createProject({...data, ownerId: user.id}); //have to add auth for the user.id to work

        await this.projectRepo.create(project);
        return project;
    }

    //user specific
    // PARAMS: user: { id, name, ... }
    async getMyProjects(user) {
        return await this.projectRepo.getById(user.id);
    }
}
