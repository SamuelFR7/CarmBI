import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { v4 as uuid } from 'uuid'
import { User } from '@modules/users/entities/User'

import { IUserRepository } from '../IUserRepository'

class UserRepositoryInMemory implements IUserRepository {
    users: User[] = []

    async create(data: ICreateUserDTO): Promise<User> {
        const newUser = User.create({
            username: data.username,
            password: data.password,
            created_at: new Date(),
            is_admin: false,
        })

        Object.assign(newUser, {
            id: uuid(),
        })

        this.users.push(newUser)

        return newUser
    }

    async findByUsername(username: string): Promise<User> {
        const user = this.users.find((item) => item.username === username)

        return user
    }

    async findById(id: string): Promise<User> {
        const user = this.users.find((item) => item.id === id)

        return user
    }
}

export { UserRepositoryInMemory }
