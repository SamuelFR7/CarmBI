import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListWeighingsLotsUseCase } from './ListWeighingsLotsUseCase'

class ListWeighingsLotsController {
    async handle(req: Request, res: Response): Promise<Response> {
        const listWeighingsLotsUseCase = container.resolve(
            ListWeighingsLotsUseCase
        )

        const lots = await listWeighingsLotsUseCase.execute()

        return res.status(200).json(lots)
    }
}

export { ListWeighingsLotsController }
