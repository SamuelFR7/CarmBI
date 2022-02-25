import { IFilterWeighingDTO } from '@modules/weighings/dtos/FilterWeighingDTO'
import { inject, injectable } from 'tsyringe'
import { IWeighingRepository } from '../../repositories/IWeighingRepository'

@injectable()
class ListWeighingSummaryUseCase {
    constructor(
        @inject('WeighingRepository')
        private weighingRepository: IWeighingRepository
    ) {}

    async execute({ producer_type, lot }: IFilterWeighingDTO) {
        const weighings = await this.weighingRepository.findByFilters({
            producer_type,
            lot,
        })

        return weighings
    }
}

export { ListWeighingSummaryUseCase }
