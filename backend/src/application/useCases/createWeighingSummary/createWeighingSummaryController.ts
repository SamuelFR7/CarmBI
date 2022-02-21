import { Request, Response } from 'express'
import { CreateWeighingSummaryUseCase } from './createWeighingSummaryUseCase'

class CreateWeighingSummaryController {
    constructor(
        private createCategoryUseCase: CreateWeighingSummaryUseCase
    ) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { weighings } = req.body

        await this.createCategoryUseCase.execute(weighings)

        return res.status(201).send()
    }
}

export { CreateWeighingSummaryController }