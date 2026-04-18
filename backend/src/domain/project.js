/* 
Rules for the project
*/

//TODO: Pretty errors

export function createProject({ name, description, shortId, ownerId }) {
    if (!name || !shortId || !ownerId) {
        throw new Error("Missing required fields");
    }
    
    return {
        name,
        ownerId,
        description: description || "",
        shortId,
    } //everything else handled by PRISMA (id, createdAt)
}

export function updateProject(project, data) {
    if (data.name) {
        project.name = data.name;
    }
    if (data.description) {
        project.description = data.description;
    }
    return project;
}

//policy functions/ helper methods for authorization. 
//important for task creation
export function canEditProject(project, user) {
    return project.ownerId === user.id;
}

export function canViewProject(project, user) {
    // For now, only the owner can view the project
    return project.ownerId === user.id;
}

export const canDeleteProject = canEditProject; //same functionality




