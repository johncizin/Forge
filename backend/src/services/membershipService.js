export class MembershipService {
    constructor({ membershipDomain, membershipRepo }){
        this.membershipDomain = membershipDomain;
        this.membershipRepo = membershipRepo;
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
        
        return await this.membershipRepo.addMemberToProject(membership);
    }

    async removeMemberFromProject(projectId, userId, user) {
        const membership = await this.membershipRepo.isProjectMember(projectId, userId);
        if (!membership) throw new Error("Membership not found");

        if (!this.membershipDomain.canRemoveMember(membership, user)) {
            throw new Error("Unauthorized");
        }
        return await this.membershipRepo.removeMemberFromProject(projectId, userId);
    }

    async getProjectMembers(projectId, user) {
        const memberships = await this.membershipRepo.getProjectMembers(projectId);
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