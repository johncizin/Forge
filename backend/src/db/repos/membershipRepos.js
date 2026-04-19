import { prisma } from "../connection.js";

//for project
export async function addMemberToProject(projectId, userId) {
    return prisma.membership.create({
        data: {
            projectId,
            userId,
            role: "MEMBER" //hard coded for now later release might have different perms:: same as my ENUN
        }
    });
}

export async function removeMemberFromProject(userId) {
    return prisma.membership.deleteMany({
        where: { userId }
    });
}

export async function getProjectMembers(projectId) {
    return prisma.membership.findMany({
        where: { projectId },
        include: { user: true }
    });
}


//Task
export async function addMemberToTask(taskId, userId) {
    return prisma.taskAssignee.create({
        data: {
            taskId,
            userId
        }
    });
}

export async function removeMemberFromTask(taskId, userId) {
    return prisma.taskAssignee.deleteMany({
        where: { taskId, userId }
    });
}

export async function getTaskMembers(taskId) {
    return prisma.taskAssignee.findMany({
        where: { taskId },
        include: { user: true } 
    });
}


//util funcs for project and task
export async function isProjectMember(userId, projectId) {
    return prisma.membership.findFirst({
        where: { userId, projectId }
    });
}

export async function isTaskAssignee(userId, taskId) {
    return prisma.taskAssignee.findFirst({
        where: { userId, taskId }
    });
}
