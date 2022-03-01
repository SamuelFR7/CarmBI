import { Request, Response } from 'express'

import { container } from 'tsyringe'

import { ListWeighingUpdateTimeUseCase } from './ListWeighingUpdateTimeUseCase'

class ListWeighingUpdateTimeController {
    async handle(req: Request, res: Response): Promise<Response> {
        const listWeighingUpdateTimeUseCase = container.resolve(
            ListWeighingUpdateTimeUseCase
        )

        const updateTime = await listWeighingUpdateTimeUseCase.execute()

        return res.status(200).json(updateTime)
    }
}

export { ListWeighingUpdateTimeController }
