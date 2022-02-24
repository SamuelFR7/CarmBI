import { UserRepository } from '@modules/users/infra/prisma/UserRepository'
import { NextFunction, Request, Response } from 'express'

async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user

    const usersRepository = new UserRepository()
    const user = await usersRepository.findById(id)

    if (!user.is_admin) {
        throw new Error("User isn't admin")
    }

    return next()
}

export { ensureAdmin }
