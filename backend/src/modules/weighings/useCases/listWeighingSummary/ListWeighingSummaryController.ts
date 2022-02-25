import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListWeighingSummaryUseCase } from './ListWeighingSummaryUseCase'

class ListWeighingSummaryController {
    async handle(req: Request, res: Response): Promise<Response> {
        const listWeighingUseCase = container.resolve(
            ListWeighingSummaryUseCase
        )

        const weighings = await listWeighingUseCase.execute()

        return res.status(200).json(weighings)
    }
}

export { ListWeighingSummaryController }
