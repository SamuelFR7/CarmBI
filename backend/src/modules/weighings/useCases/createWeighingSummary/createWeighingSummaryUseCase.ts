import { inject, injectable } from 'tsyringe'
import { IWeighingRepository } from '../../repositories/IWeighingRepository'
import { v4 as uuid } from 'uuid'
import { ICreateWeighingDTO } from '../../dtos/CreateWeighingDTO'
import { Weighing } from '../../infra/typeorm/entities/weighing'

@injectable()
class CreateWeighingSummaryUseCase {
    constructor(
        @inject('WeighingRepository')
        private weighingRepository: IWeighingRepository
    ) {}

    async execute(weighings: ICreateWeighingDTO[]) {
        const sync = uuid()

        const newWeighings: Weighing[] = []

        weighings.map((item) => {
            const newWeighing = new Weighing()
            Object.assign(newWeighing, {
                code: item.code,
                depositor: item.depositor,
                lot: item.lot,
                product: item.product,
                input: item.input,
                output: item.output,
                sync,
            })

            newWeighings.push(newWeighing)
        })

        await this.weighingRepository.upsert(newWeighings)

        const allWeighings = await this.weighingRepository.findAll()

        allWeighings.map(async (item) => {
            if (item.sync !== sync) {
                await this.weighingRepository.deleteByCode(item.code)
            }
        })

        return true
    }
}

export { CreateWeighingSummaryUseCase }
