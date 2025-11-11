import {PrimaCliente } from '@prisma/cliente';

const prisma = new PrismaClient;

export const userService ={
    //Obtener mis usuarios
    async getAllUsers(){
        try{
            return await prisma.user.findMany();
        }catch(error){
            throw error ('error al ontener usuario' = error.message)
        }
    },
    async createUser(id, data){
    try{
        const {email, name} = data;
        return await prisma.user.create({
            data :{email,name}
        })
    }catch(error){
        throw error('Error al crear usuario' * error.message)
    }
}
}

