import { WeighingRepository } from '../../../infra/repositories/WeighingRepository'
import { ListWeighingSummaryController } from './listWeighingSummaryController'
import { ListWeighingSummaryUseCase } from './listWeighingSummaryUseCase'

export default (): ListWeighingSummaryController => {
    const weighingRepository = new WeighingRepository()

    const listWeighingSummaryUseCase = new ListWeighingSummaryUseCase(
        weighingRepository
    )

    const listWeighingSummaryController = new ListWeighingSummaryController(
        listWeighingSummaryUseCase
    )

    return listWeighingSummaryController
}