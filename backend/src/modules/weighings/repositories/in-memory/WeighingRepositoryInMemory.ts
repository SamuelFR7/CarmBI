import { Weighing } from '@modules/weighings/entities/weighing'
import { IWeighingRepository } from '../IWeighingRepository'
import { v4 as uuid } from 'uuid'
import { IFilterWeighingDTO } from '@modules/weighings/dtos/FilterWeighingDTO'
import { IListWeighingLotsDTO } from '@modules/weighings/dtos/ListWeighingsLotsDTO'

class WeighingRepositoryInMemory implements IWeighingRepository {
    weighings: Weighing[] = []

    async findUnique(code: string, lot: string): Promise<Weighing> {
        const weighing = this.weighings.find(
            (item) => item.code === code && item.lot === lot
        )

        return weighing
    }

    async update(code: string, weighing: Weighing): Promise<Weighing> {
        const weighingToUpdate = this.weighings.find(
            (item) => item.code === code
        )

        const newWeighing = Object.assign(weighingToUpdate, weighing)

        return newWeighing
    }

    async create(weighing: Weighing): Promise<Weighing> {
        Object.assign(weighing, {
            id: uuid(),
        })

        this.weighings.push(weighing)

        return weighing
    }

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

    async findByFilters({
        producer_type,
        lot,
    }: IFilterWeighingDTO): Promise<Weighing[]> {
        const weighingsByProducerType = this.weighings.filter(
            (item) => item.producer_type === producer_type
        )

        const weighingsByLot = weighingsByProducerType.filter(
            (item) => item.lot === lot
        )

        return weighingsByLot
    }

    async listLots(): Promise<IListWeighingLotsDTO[]> {
        const lots: IListWeighingLotsDTO[] = []
        this.weighings.map((item) => {
            const thisLot: IListWeighingLotsDTO = {
                lot: item.lot,
                product: item.product,
            }

            lots.push(thisLot)
        })

        return lots
    }
}

export { WeighingRepositoryInMemory }
