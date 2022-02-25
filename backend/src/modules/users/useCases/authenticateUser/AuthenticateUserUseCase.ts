import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { compare } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'
import { sign } from 'jsonwebtoken'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
    username: string
    password: string
}

interface IResponse {
    user: {
        username: string
    }
    token: string
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UserRepository')
        private usersRepository: IUserRepository
    ) {}

    async execute({ username, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByUsername(username)

        if (!user) {
            throw new AppError('Username or password incorrect!', 401)
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new AppError('Username or password incorrect!', 401)
        }

        const token = sign({}, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: '1d',
        })

        const tokenReturn: IResponse = {
            token,
            user: {
                username: user.username,
            },
        }

        return tokenReturn
    }
}

export { AuthenticateUserUseCase }
