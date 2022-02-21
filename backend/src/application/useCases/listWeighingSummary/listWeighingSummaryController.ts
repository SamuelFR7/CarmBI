import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListWeighingSummaryUseCase } from './listWeighingSummaryUseCase'

class ListWeighingSummaryController {
    async handle(req: Request, res: Response): Promise<Response> {
        const listWeighingUseCase = container.resolve(ListWeighingSummaryUseCase)

        const weighings = await listWeighingUseCase.execute()

        return res.status(201).json(weighings)
    }
}

export { ListWeighingSummaryController }