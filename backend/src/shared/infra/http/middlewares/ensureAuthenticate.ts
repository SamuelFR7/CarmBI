import { UserRepository } from '@modules/users/infra/prisma/UserRepository'
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
        throw new Error('Token missing')
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
            throw new Error('User does not exists')
        }

        req.user = {
            id: user_id,
        }

        next()
    } catch (error) {
        throw new Error('Invalid token')
    }
}

export { ensureAuthenticate }
