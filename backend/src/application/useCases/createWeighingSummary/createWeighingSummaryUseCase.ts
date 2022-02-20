import { IWeighingRepository } from "../../repositories/IWeighingRepository";
import { v4 as uuid } from 'uuid'

type CreateWeighingSummaryUseCaseRequest = {
    code: string
    depositor: string
    lot: string
    product: string
    input: number
    output: number
}

class CreateWeighingSummaryUseCase {
    constructor(
        private weighingRepository: IWeighingRepository
    ) {}

    async execute(weighings: CreateWeighingSummaryUseCaseRequest[]) {
        const sync = uuid()

        weighings.map(async item => {
            const weighingAlreadyExists = await this.weighingRepository.findByCode(item.code)

            if (weighingAlreadyExists) {
                await this.weighingRepository.update(weighingAlreadyExists.props.code, {
                    code: item.code,
                    depositor: item.depositor,
                    lot: item.lot,
                    product: item.product,
                    input: item.input,
                    output: item.output,
                    sync
                })
            } else {
                await this.weighingRepository.create({
                    code: item.code,
                    depositor: item.depositor,
                    lot: item.lot,
                    product: item.product,
                    input: item.input,
                    output: item.output,
                    sync
                })
            }
        })

        const allWeighings = await this.weighingRepository.findAll()
        
        allWeighings.map(async item => {
            if (item.props.sync != sync) {
                await this.weighingRepository.deleteByCode(item.props.code)
            }
        })

        return true
    }
}

export { CreateWeighingSummaryUseCase }