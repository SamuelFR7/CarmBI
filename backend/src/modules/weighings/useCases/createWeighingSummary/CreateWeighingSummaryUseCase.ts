import { inject, injectable } from 'tsyringe'
import { IWeighingRepository } from '../../repositories/IWeighingRepository'
import { v4 as uuid } from 'uuid'
import { ICreateWeighingDTO } from '../../dtos/CreateWeighingDTO'

@injectable()
class CreateWeighingSummaryUseCase {
    constructor(
        @inject('WeighingRepository')
        private weighingRepository: IWeighingRepository
    ) {}

    async execute(weighings: ICreateWeighingDTO[]) {
        const sync = uuid()

        await Promise.all(
            weighings.map(async (item) => {
                const weighingAlreadyExists =
                    await this.weighingRepository.findByCode(item.code)

                if (weighingAlreadyExists) {
                    await this.weighingRepository.update(item.code, {
                        code: item.code,
                        depositor: item.depositor,
                        input: item.input,
                        lot: item.lot,
                        producer_type: item.producer_type,
                        output: item.output,
                        product: item.product,
                        sync,
                    })
                } else {
                    await this.weighingRepository.create({
                        code: item.code,
                        depositor: item.depositor,
                        input: item.input,
                        lot: item.lot,
                        producer_type: item.producer_type,
                        output: item.output,
                        product: item.product,
                        sync,
                    })
                }
            })
        )

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
