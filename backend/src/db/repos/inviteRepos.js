import { prisma } from "../connection.js";

export async function createInvite(invite){
    return prisma.pendingInvite.create({
        data: invite
    })
}

export async function updateInviteStatus(inviteId, status){
    return prisma.pendingInvite.update({
        where: {
            id: inviteId
        },
        data: {
            status: status
        }
    })
}

export async function deleteInvite(inviteId){
    return prisma.pendingInvite.delete({
        where: {
            id: inviteId
        }
    })
}

export async function getInviteById(inviteId){
    return prisma.pendingInvite.findUnique({
        where: {
            id: inviteId
        }
    })
}

export async function getPendingInvitesByProjectId(projectId){
    return prisma.pendingInvite.findMany({
        where: {
            projectId: projectId,
            status: "PENDING"
        }
    })
}

export async function getInvitesByEmail(email){
    return prisma.pendingInvite.findMany({
        where: {
            email: email
        }
    })
}