import { generateShortId } from "../utils/id.js";

export class TaskService {
    constructor({ taskDomain, taskRepo }) {
        this.taskDomain = taskDomain;
        this.taskRepo = taskRepo;
    }
    
    //NOTE: keeping assigneeId nullable until membership service is built
    async createTask(data, user) {
        const task = await this.taskDomain.createTask({
            ...data,
            shortId: generateShortId()
        }, user);
        return await this.taskRepo.createTask(task);
    }

    async getTasksByProjectId(projectId, user) {
        const tasks = await this.taskRepo.getTasksByProjectId(projectId);
        if (!tasks || tasks.length === 0) throw new Error("Not found");
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