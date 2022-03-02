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
        const updated_at = new Date()

        await Promise.all(
            weighings.map(async (item) => {
                const weighingAlreadyExists =
                    await this.weighingRepository.findUnique(
                        item.code,
                        item.lot
                    )

                if (weighingAlreadyExists) {
                    await this.weighingRepository.update(
                        weighingAlreadyExists.id,
                        {
                            code: weighingAlreadyExists.code,
                            depositor: item.depositor,
                            input: item.input,
                            lot: item.lot,
                            producer_type: item.producer_type,
                            output: item.output,
                            product: item.product,
                            sync,
                            updated_at,
                        }
                    )
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
                        updated_at,
                    })
                }
            })
        )

        const allWeighings = await this.weighingRepository.findAll()

        allWeighings.map(async (item) => {
            if (item.sync !== sync) {
                await this.weighingRepository.deleteById(item.id)
            }
        })

        return true
    }
}

export { CreateWeighingSummaryUseCase }
