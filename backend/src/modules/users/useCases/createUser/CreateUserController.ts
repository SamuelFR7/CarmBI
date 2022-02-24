import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserUseCase } from './createUserUseCase'

class CreateUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { username, password } = req.body

        const createUserUseCase = container.resolve(CreateUserUseCase)

        await createUserUseCase.execute({
            username,
            password,
        })

        return res.status(201).send()
    }
}

export { CreateUserController }
