import { IFilterWeighingDTO } from '@modules/weighings/dtos/FilterWeighingDTO'
import { inject, injectable } from 'tsyringe'
import { IWeighingRepository } from '../../repositories/IWeighingRepository'

@injectable()
class ListWeighingSummaryUseCase {
    constructor(
        @inject('WeighingRepository')
        private weighingRepository: IWeighingRepository
    ) {}

    async execute({ productor_type, lot }: IFilterWeighingDTO) {
        const weighings = await this.weighingRepository.findByFilters({
            productor_type,
            lot,
        })

        return weighings
    }
}

export { ListWeighingSummaryUseCase }
