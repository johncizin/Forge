//was going to be a service, repo, domain, route
// but its just joins in my prisma repo layer for both project + task
//so its going to be a utility file project will use its specific funcs and vice versa for task



export async function isMember(userId, projectId) {
    return prisma.membership.findFirst({
        where: { userId, projectId }
    });
}
