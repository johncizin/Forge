/* 
Rules for the project
*/

//TODO: Pretty errors

export function createProject({ name, description, ownerId }) {
    if (!name || !description || !ownerId) {
        throw new Error("Missing required fields");
    }
    
    return {
        name,
        ownerId,
        description,
        ownerId: ownerId
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
export function canEditProject(project, user) {
    return project.ownerId === user.id;
}

export function canViewProject(project, user) {
    // For now, only the owner can view the project
    return project.ownerId === user.id;
}

export function canDeleteProject(project, user) {
    return project.ownerId === user.id;
}




