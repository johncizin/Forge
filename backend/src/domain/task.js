/* 

*/

export function createTask({ title, description, shortId, projectId, status, dueDate }, user) {
    console.log("in domain")
    if (!title || !projectId || !user.id || !shortId) {
        throw new Error("Missing required fields");
    }
    
    console.log("through domain")
    return {
        title,
        description: description || "",
        shortId,
        projectId,
        status: status || "TODO",
        dueDate: dueDate || null
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
    //updated for assignee 4/26/26
    return task.project.ownerId === user.id || 
           task.assignees?.some(a => a.userId === user.id);
}

export function canDeleteTask(task, user) {
    // Only the project owner can delete the task
    return task.project.ownerId === user.id;
}