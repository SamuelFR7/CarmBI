import { IWeighingRepository } from '@modules/weighings/repositories/IWeighingRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ListWeighingsLotsUseCase {
    constructor(
        @inject('WeighingRepository')
        private weighingRepository: IWeighingRepository
    ) {}

    async execute() {
        const lots = await this.weighingRepository.listLots()

        return lots
    }
}

export { ListWeighingsLotsUseCase }
