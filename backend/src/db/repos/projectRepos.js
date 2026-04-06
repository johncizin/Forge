import { prisma } from "../connection.js";

export async function create(project){
    return prisma.project.create({
        data: project
    })
}
 
export async function getById(id){
    return prisma.project.findUnique({
        where: {id}
    })
}

export async function update(project){
    return prisma.project.update({
        where: {id: project.id},
        data: project
    })
}

export async function deleteProject(id){
    return prisma.project.delete({
        where: {id}
    })
}