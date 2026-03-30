import {prisma}  from "../connection.js" 

export async function create(user){
    return prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            passwordHash: user.passwordHash
        }
    })
}

export async function getById(id){
    return prisma.user.findUnique({
        where: {id}
    })
}

export async function getByEmail(email){
    return prisma.user.findUnique({
        where: {email}
    })
}
