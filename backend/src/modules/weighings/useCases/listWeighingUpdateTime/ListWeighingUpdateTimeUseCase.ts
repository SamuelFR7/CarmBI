import { IWeighingRepository } from '@modules/weighings/repositories/IWeighingRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
class ListWeighingUpdateTimeUseCase {
    constructor(
        @inject('WeighingRepository')
        private weighingRepository: IWeighingRepository
    ) {}

    async execute() {
        const weighings = await this.weighingRepository.findAll()

        const updateTime = weighings[0].updated_at

        return updateTime
    }
}

export { ListWeighingUpdateTimeUseCase }
