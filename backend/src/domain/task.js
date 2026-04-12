/* 

*/

export function createTask({ title, description, shortId, projectId }, user) {
    if (!title || !shortId || !projectId || !user.id) {
        throw new Error("Missing required fields");
    }
    
    return {
        title,
        description,
        projectId,
        shortId
    }
}

export function updateTask(task, data) {
    if (data.title) {
        task.title = data.title;
    }
    if (data.description) {
        task.description = data.description;
    }
    if (data.status) {
        task.status = data.status;
    }
    return task;
}


//policy enforcement functions for authorization
export function canEditTask(task, user) {
    // Only the project owner or assignee can edit the task
    return task.assigneeId === user.id || task.project.ownerId === user.id;
}

export function canViewTask(task, user) {
    // The project owner, assignee, or anyone if the project is public can view the task
    return task.assigneeId === user.id || task.project.ownerId === user.id; // TODO: add public projects later
}

export function canDeleteTask(task, user) {
    // Only the project owner can delete the task
    return task.project.ownerId === user.id;
}