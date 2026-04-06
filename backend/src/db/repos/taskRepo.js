import { prisma } from "../connection.js";

/*


*/

export async function create(task){
    return prisma.task.create({
        data: task
    })
}
    
export async function getById(id){
    return prisma.task.findUnique({
        where: {id}
    })
}