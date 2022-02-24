import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { User } from '@modules/users/entities/User'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { prisma } from '@shared/infra/database/prisma/client'

class UserRepository implements IUserRepository {
    async create(data: ICreateUserDTO): Promise<User> {
        const newUser = await prisma.user.create({
            data: {
                username: data.username,
                password: data.password,
            },
        })

        return newUser
    }

    async findByUsername(username: string): Promise<User> {
        const user = await prisma.user.findUnique({ where: { username } })

        return user
    }

    async findById(id: string): Promise<User> {
        const user = await prisma.user.findUnique({ where: { id } })

        return user
    }
}

export { UserRepository }
