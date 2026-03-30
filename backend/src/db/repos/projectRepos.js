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