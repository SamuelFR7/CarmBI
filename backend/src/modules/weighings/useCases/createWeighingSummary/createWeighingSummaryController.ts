import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateWeighingSummaryUseCase } from './createWeighingSummaryUseCase'

class CreateWeighingSummaryController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { weighings } = req.body
        const createCategoryUseCase = container.resolve(
            CreateWeighingSummaryUseCase
        )

        await createCategoryUseCase.execute(weighings)

        return res.status(201).send()
    }
}

export { CreateWeighingSummaryController }
