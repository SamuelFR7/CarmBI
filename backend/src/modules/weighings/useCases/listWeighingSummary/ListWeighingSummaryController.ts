import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListWeighingSummaryUseCase } from './ListWeighingSummaryUseCase'

class ListWeighingSummaryController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { lot, productor } = req.params

        const listWeighingUseCase = container.resolve(
            ListWeighingSummaryUseCase
        )

        const weighings = await listWeighingUseCase.execute({
            productor_type: productor,
            lot,
        })

        return res.status(200).json(weighings)
    }
}

export { ListWeighingSummaryController }
