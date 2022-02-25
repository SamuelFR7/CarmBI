import 'reflect-metadata'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'
import { UserRepositoryInMemory } from '@modules/users/repositories/in-memory/UserRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'
import { config } from 'dotenv'
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
let authenticateUserUseCase: AuthenticateUserUseCase
let userRepositoryInMemory: UserRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe('Authenticate user use case', () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory()
        authenticateUserUseCase = new AuthenticateUserUseCase(
            userRepositoryInMemory
        )
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)

        config({})
    })

    it('should be able to authenticate a user', async () => {
        const newUser: ICreateUserDTO = {
            username: 'teste',
            password: 'teste',
        }

        await createUserUseCase.execute(newUser)

        const authenticatedUser = await authenticateUserUseCase.execute(newUser)

        expect(authenticatedUser).toBeTruthy()
    })

    it('should not be able to authenticate an nonexistent user', async () => {
        await expect(
            authenticateUserUseCase.execute({
                username: 'teste',
                password: 'teste',
            })
        ).rejects.toEqual(new AppError('Username or password incorrect!', 401))
    })

    it('should not be able to authenticate an user with incorrect password', async () => {
        const newUser: ICreateUserDTO = {
            username: 'teste',
            password: 'teste',
        }

        await createUserUseCase.execute(newUser)

        await expect(
            authenticateUserUseCase.execute({
                username: 'teste',
                password: 'teste1',
            })
        ).rejects.toEqual(new AppError('Username or password incorrect!', 401))
    })
})
