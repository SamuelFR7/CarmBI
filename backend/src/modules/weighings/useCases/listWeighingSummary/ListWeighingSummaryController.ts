import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListWeighingSummaryUseCase } from './ListWeighingSummaryUseCase'

class ListWeighingSummaryController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { lot, producer } = req.params

        const listWeighingUseCase = container.resolve(
            ListWeighingSummaryUseCase
        )

        const weighings = await listWeighingUseCase.execute({
            producer_type: producer,
            lot,
        })

        return res.status(200).json(weighings)
    }
}

export { ListWeighingSummaryController }
