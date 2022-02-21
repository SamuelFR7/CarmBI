import { WeighingRepository } from "../../../infra/repositories/WeighingRepository"
import { CreateWeighingSummaryController } from "./createWeighingSummaryController"
import { CreateWeighingSummaryUseCase } from "./createWeighingSummaryUseCase"

export default (): CreateWeighingSummaryController => {
    const weighingRepository = new WeighingRepository()

    const createWeighingSummaryUseCase = new CreateWeighingSummaryUseCase(
        weighingRepository
    )

    const createWeighingSummaryController = new CreateWeighingSummaryController(
        createWeighingSummaryUseCase
    )

    return createWeighingSummaryController
}