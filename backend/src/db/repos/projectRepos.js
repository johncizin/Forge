import { prisma } from "../connection.js";

/*
ONLY FIELDS HERE
model Project {
  id          String          @id @default(uuid()) //prisma makes
  shortId     String          @unique // i created good
  name        String            //sent
  description String            //sent  
  ownerId     String        // sent but jwt auth decode
  createdAt   DateTime        @default(now()) 
}

*/

export async function create(project){
    console.log("into repo from service with project dat:", project);
    try{
        const result = await prisma.project.create({
            data: project
        })
        console.log("created project in repo:", result);
        return result;
    } catch (err) {
        console.error("Error creating project in repo:", err);
        throw err; // rethrow to be handled by service
    }
}
 
export async function getById(id){
    return prisma.project.findUnique({
        where: {id}
    })
}

export async function getByShortId(shortId){
    return prisma.project.findUnique({
        where: {shortId}
    })
}

export async function getByOwnerId(ownerId){
    return prisma.project.findMany({
        where: {ownerId},
        orderBy: {createdAt: "desc"}
    })
}

export async function update(project){
    return prisma.project.update({
        where: {id: project.id},
        data: project
    })
}

export async function deleteById(id){
    return prisma.project.delete({
        where: {id}
    })
}