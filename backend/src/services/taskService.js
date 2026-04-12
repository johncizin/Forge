import { generateShortId } from "../utils/id";

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
        return await this.taskRepo.create(task);
    }

    async getTasksByProjectId(projectId, user) {
        const tasks = await this.taskRepo.getByProjectId(projectId);
        return tasks.filter(task => this.taskDomain.canViewTask(task, user));
    }
    
    async getTaskByShortId(shortId, user) {
        const task = await this.taskRepo.getByShortId(shortId);
        if (!task) throw new Error("Not found");
        if (!this.taskDomain.canViewTask(task, user)) {
            throw new Error("Unauthorized");
        }
        return task;
    }
    
    async deleteTask(taskId, user) {
        const task = await this.taskRepo.getById(taskId);
        if (!task)  throw new Error("Not found");
        if (!this.taskDomain.canDeleteTask(task, user)) {
            throw new Error("Unauthorized");
        }
        return await this.taskRepo.delete(taskId);
    }

    async updateTask(taskId, data, user) {
        const task = await this.taskRepo.getById(taskId);
        if (!task) throw new Error("Not found");
        if (!this.taskDomain.canEditTask(task, user)) {
            throw new Error("Unauthorized");
        }
        const updatedTask = { ...task, ...data };
        return await this.taskRepo.update(taskId, updatedTask);
    }

}