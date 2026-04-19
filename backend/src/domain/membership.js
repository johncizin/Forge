// domain/membership.js

export function createMembership({ projectId, userId, role }) {
    if (!projectId || !userId) throw new Error("Missing required fields");
    
    return {
        projectId,
        userId,
        role: role ?? "MEMBER"
    };
}

export function createTaskAssignee({ taskId, userId }) {
    if (!taskId || !userId) throw new Error("Missing required fields");
    
    return { taskId, userId };
}
    
export function canRemoveMember(membership, user) {
    // only project owner can remove members
    return membership.project.ownerId === user.id;
}

export function canRemoveTaskAssignee(assignee, user) {
    // project owner or the assignee themselves can remove
    return assignee.task.project.ownerId === user.id || assignee.userId === user.id;
}