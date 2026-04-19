import { generateShortId } from "../utils/id.js";

export class TaskService {
    constructor({ taskDomain, taskRepo, projectRepo, membershipRepo }) {
        this.taskDomain = taskDomain;
        this.taskRepo = taskRepo;
        this.projectRepo = projectRepo;
        this.membershipRepo = membershipRepo;
    }
    
    //NOTE: keeping assigneeId nullable until membership service is built

    //careful this gave me so much trouble
    async createTask(data, user) {
        //get porject
        const project = await this.projectRepo.getByShortId(data.projectShortId);
        //if found
        if(!project) throw new Error("Project not found");

        const task = await this.taskDomain.createTask({
            ...data,
            shortId: generateShortId(),
            projectId: project.id
        }, user);

        return await this.taskRepo.createTask(task);
    }

    async getTasksByProjectId(shortId, user) {
        const project = await this.projectRepo.getByShortId(shortId);
        const tasks = await this.taskRepo.getTasksByProjectId(project.id);
        return tasks;
    }
    
    async getTaskByShortId(shortId, user) {
        const task = await this.taskRepo.getTaskByShortId(shortId);
        if (!task) throw new Error("Not found");
        return task;
    }
    
    async deleteTask(taskId, user) {
        const task = await this.taskRepo.getTaskByShortId(taskId);
        if (!task)  throw new Error("Not found");
        if (!this.taskDomain.canDeleteTask(task, user)) {
            throw new Error("Unauthorized");
        }
        return await this.taskRepo.deleteTask(taskId);
    }

    async updateTask(taskId, data, user) {
        const task = await this.taskRepo.getTaskByShortId(taskId);
        if (!task) throw new Error("Not found");
        if (!this.taskDomain.canEditTask(task, user)) {
            throw new Error("Unauthorized");
        }
        const updatedTask = { ...task, ...data };
        return await this.taskRepo.updateTask(taskId, updatedTask);
    }

}