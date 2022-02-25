import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { inject, injectable } from 'tsyringe'
import { hash } from 'bcryptjs'
import { AppError } from '@shared/errors/AppError'

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UserRepository')
        private usersRepository: IUserRepository
    ) {}

    async execute({ username, password }: ICreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByUsername(
            username
        )

        if (userAlreadyExists) {
            throw new AppError('User already exists')
        }

        const passwordHash = await hash(password, 8)

        await this.usersRepository.create({
            username,

            password: passwordHash,
        })
    }
}

export { CreateUserUseCase }
