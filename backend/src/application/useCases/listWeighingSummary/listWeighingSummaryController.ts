import { Request, Response } from 'express'
import { ListWeighingSummaryUseCase } from './listWeighingSummaryUseCase'

class ListWeighingSummaryController {
    constructor(
        private listWeighingUseCase: ListWeighingSummaryUseCase
    ) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const weighings = await this.listWeighingUseCase.execute()

        return res.status(201).json(weighings)
    }
}

export { ListWeighingSummaryController }