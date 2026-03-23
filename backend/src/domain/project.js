/* 
Rules for the project
*/

export function createProject({ name, description, ownerId }) {
    if (!name || !description || !ownerId) {
        throw new Error("Missing required fields");
    }
    
    return {
        name,
        ownerId,
        description
    } //everything else handled by PRISMA (id, createdAt)
}





