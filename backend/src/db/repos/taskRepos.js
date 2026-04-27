import { prisma } from "../connection.js";

/*
model Task {
  id          String       @id @default(uuid())
  shortId     String       @unique
  title       String
  status      TaskStatus   @default(TODO)
  description String?
  projectId   String
  createdAt   DateTime     @default(now())
  dueDate     DateTime?

  assignees   TaskAssignee[] 
  attachments Attachment[]
  comments    Comment[]
  project     Project      @relation(fields: [projectId], references: [id])

  @@index([projectId], map: "Task_projectId_fkey")
}
*/

//assignee nullable
export async function createTask(task){
    return prisma.task.create({
        data: task
    })
}
    
export async function getTaskByShortId(shortId){
    return prisma.task.findUnique({
        where: {shortId},
        include: { 
            project: true,
            assignees: true
         } // include project for authorization checks in service layer
    })
}

//adding counting
export async function getTasksByProjectId(projectId){
    return prisma.task.findMany({
        where: {projectId},
        include: {     
            project: true, 
            assignees: true,
            _count: {
                select: {
                    assignees: true
                }
            }
        }
    })
}

export async function deleteTask(shortId){
    return prisma.task.delete({
        where: {shortId}
    })
}

export async function updateTask(shortId, data){
    return prisma.task.update({
        where: {shortId},
        data
    })
}

export async function updateTaskStatus(shortId, status){
    return prisma.task.update({
        where: {shortId},
        data: { status }
    })
}

export async function getTaskById(id){
    return prisma.task.findUnique({
        where: {id}
    })
}