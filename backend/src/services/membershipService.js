export class MembershipService {
    constructor({ membershipDomain, membershipRepo, projectRepo }) {
        this.membershipDomain = membershipDomain;
        this.membershipRepo = membershipRepo;
        this.projectRepo = projectRepo;
    }

    //role hardcoded
    async addMemberToProject(projectId, userId, user) {
    const existingMember = await this.membershipRepo.isProjectMember(projectId, userId);
    if (existingMember) throw new Error("User is already a member of the project");
    
    const membership = await this.membershipDomain.createMembership({
        projectId,
        userId,
        role: "MEMBER"
    });
    
    try {
        const result = await this.membershipRepo.addMemberToProject(membership.projectId, membership.userId);
        console.log("Result from addMemberToProject:", result);
        return result;
    } catch (err) {
        console.error("repo addMemberToProject error:", err.message);
        throw err;
    }
}


    async removeMemberFromProject(projectId, userId, user) {
        try {
            const membership = await this.membershipRepo.isProjectMember(projectId, userId);
            if (!membership) throw new Error("Membership not found");

        if (!this.membershipDomain.canRemoveMember(membership, user)) {
            throw new Error("Unauthorized");
        }
        return await this.membershipRepo.removeMemberFromProject(projectId, userId);
        } catch (err) {
            console.error("Error in removeMemberFromProject:", err.message);
            throw err; // rethrow the error after logging
        }
    }


    async getProjectMembers(projectId, user) {
        const project = await this.projectRepo.getByShortId(projectId);
        console.log("Fetched project in getProjectMembers:", project); //debug
        if (!project) throw new Error("Project not found");
        const memberships = await this.membershipRepo.getProjectMembers(project.id);
        return memberships.map(m => m.user); // extract user info from memberships
    }

    async addMemberToTask(taskId, userId, user) {
        const existingAssignee = await this.membershipRepo.isTaskAssignee(taskId, userId);
        if (existingAssignee) throw new Error("User is already assigned to the task");
        
        const taskAssignee = await this.membershipDomain.createTaskAssignee({
            taskId,
            userId
        });
        
        return await this.membershipRepo.addMemberToTask(taskAssignee);
    }

    async removeMemberFromTask(taskId, userId, user) {
        const assignee = await this.membershipRepo.isTaskAssignee(taskId, userId);
        if (!assignee) throw new Error("Task assignee not found");
        
        if (!this.membershipDomain.canRemoveTaskAssignee(assignee, user)) {
            throw new Error("Unauthorized");
        }
        return await this.membershipRepo.removeMemberFromTask(taskId, userId);
    }
    
    async getTaskMembers(taskId, user) {
        const assignees = await this.membershipRepo.getTaskMembers(taskId);
        return assignees.map(a => a.user); // extract user info from assignees
    }
}