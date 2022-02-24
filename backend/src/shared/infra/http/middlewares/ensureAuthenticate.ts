import { UserRepository } from '@modules/users/infra/prisma/UserRepository'
import { AppError } from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
    sub: string
}

async function ensureAuthenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        throw new AppError('Token missing', 401)
    }

    const [, token] = authHeader.split(' ')

    try {
        const { sub: user_id } = verify(
            token,
            process.env.JWT_SECRET
        ) as IPayload

        const usersRepository = new UserRepository()

        const user = usersRepository.findById(user_id)

        if (!user) {
            throw new AppError('User does not exists', 401)
        }

        req.user = {
            id: user_id,
        }

        next()
    } catch (error) {
        throw new AppError('Invalid token', 401)
    }
}

export { ensureAuthenticate }
