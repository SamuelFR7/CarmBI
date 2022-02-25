import 'reflect-metadata'
import { CreateUserUseCase } from './CreateUserUseCase'
import { UserRepositoryInMemory } from '@modules/users/repositories/in-memory/UserRepositoryInMemory'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { AppError } from '@shared/errors/AppError'
let createUserUseCase: CreateUserUseCase
let userRepositoryInMemory: UserRepositoryInMemory

describe('Create user use case', () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory()
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    })

    it('should be able to create a new user', async () => {
        await createUserUseCase.execute({
            username: 'teste',
            password: 'teste',
        })

        const createdUser = await userRepositoryInMemory.findByUsername('teste')

        expect(createdUser).toHaveProperty('id')
    })

    it('should not be able to create a user if username exists', async () => {
        const user: ICreateUserDTO = {
            password: 'teste',
            username: 'teste',
        }

        await createUserUseCase.execute(user)

        await expect(createUserUseCase.execute(user)).rejects.toEqual(
            new AppError('User already exists')
        )
    })
})
