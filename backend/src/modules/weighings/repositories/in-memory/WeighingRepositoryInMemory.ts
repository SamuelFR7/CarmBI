import { Weighing } from '../../infra/typeorm/entities/weighing'
import { IWeighingRepository } from '../IWeighingRepository'

class WeighingRepositoryInMemory implements IWeighingRepository {
    weighings: Weighing[] = []

    async deleteByCode(cod: string): Promise<true | null> {
        const weighingToDelete = this.weighings.find(
            (item) => item.code === cod
        )

        if (!weighingToDelete) {
            throw new Error('Has no item do delete')
        }

        const index = this.weighings.indexOf(weighingToDelete)
        if (index > -1) {
            this.weighings.splice(index, 1)
        }

        return true
    }

    async findAll(): Promise<Weighing[]> {
        const allWeighing = this.weighings

        return allWeighing
    }

    async upsert(weighings: Weighing[]): Promise<Weighing[]> {
        weighings.map((weighing) => {
            const weighingAlreadyExists = this.weighings.find(
                (item) => item.code === weighing.code
            )

            if (weighingAlreadyExists) {
                Object.assign(weighingAlreadyExists, {
                    code: weighing.code,
                    depositor: weighing.depositor,
                    lot: weighing.lot,
                    product: weighing.product,
                    input: weighing.input,
                    output: weighing.output,
                    sync: weighing.sync,
                })
            } else {
                this.weighings.push(weighing)
            }
        })

        return this.weighings
    }
}

export { WeighingRepositoryInMemory }
