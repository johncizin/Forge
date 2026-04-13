/* 

*/

export function createTask({ title, description, shortId, projectId }, user) {
    console.log("in domain")
    if (!title || !projectId || !user.id || !shortId) {
        throw new Error("Missing required fields");
    }
    
    console.log("through domain")
    return {
        title,
        description,
        shortId,
        projectId
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
    return task.project.ownerId === user.id;
}

export function canDeleteTask(task, user) {
    // Only the project owner can delete the task
    return task.project.ownerId === user.id;
}