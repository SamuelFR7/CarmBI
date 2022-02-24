import { UserRepository } from '@modules/users/infra/prisma/UserRepository'
import { AppError } from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'

async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user

    const usersRepository = new UserRepository()
    const user = await usersRepository.findById(id)

    if (!user.is_admin) {
        throw new AppError("User isn't admin", 401)
    }

    return next()
}

export { ensureAdmin }
