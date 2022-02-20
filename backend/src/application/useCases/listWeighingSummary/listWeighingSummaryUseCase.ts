import { WeighingRepository } from "../../repositories/WeighingRepository";

class ListWeighingSummaryUseCase {
    constructor(
        private weighingRepository: WeighingRepository
    ) {}

    async execute() {
        const weighings = await this.weighingRepository.findAll()

        return weighings
    }
}

export { ListWeighingSummaryUseCase }