import { IWeighingRepository } from '@modules/weighings/repositories/IWeighingRepository'
import { inject, injectable } from 'tsyringe'
import { AppError } from '@shared/errors/AppError'

@injectable()
class ListWeighingUpdateTimeUseCase {
    constructor(
        @inject('WeighingRepository')
        private weighingRepository: IWeighingRepository
    ) {}

    async execute() {
        const weighings = await this.weighingRepository.findAll()

        if (!weighings[0]) {
            throw new AppError('Does not exists any weighing')
        }

        const updateTime = weighings[0].updated_at

        return updateTime
    }
}

export { ListWeighingUpdateTimeUseCase }
