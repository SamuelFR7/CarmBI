import { inject, injectable } from "tsyringe"
import { IWeighingRepository } from "../../repositories/IWeighingRepository";

@injectable()
class ListWeighingSummaryUseCase {
    constructor(
        @inject('WeighingRepository')
        private weighingRepository: IWeighingRepository
    ) {}

    async execute() {
        const weighings = await this.weighingRepository.findAll()

        return weighings
    }
}

export { ListWeighingSummaryUseCase }