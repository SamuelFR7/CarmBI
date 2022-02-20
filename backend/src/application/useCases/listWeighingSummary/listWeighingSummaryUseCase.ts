import { IWeighingRepository } from "../../repositories/IWeighingRepository";

class ListWeighingSummaryUseCase {
    constructor(
        private weighingRepository: IWeighingRepository
    ) {}

    async execute() {
        const weighings = await this.weighingRepository.findAll()

        return weighings
    }
}

export { ListWeighingSummaryUseCase }