import { getRepository, Repository } from 'typeorm'
import { ICreateWeighingDTO } from '@modules/weighings/dtos/CreateWeighingDTO'
import { IWeighingRepository } from '@modules/weighings/repositories/IWeighingRepository'
import { Weighing } from '../entities/weighing'

class WeighingRepository implements IWeighingRepository {
    private repository: Repository<Weighing>

    constructor() {
        this.repository = getRepository(Weighing)
    }

    async deleteByCode(cod: string): Promise<true> {
        const weighingToDelete = await this.repository.findOne({
            where: { code: cod },
        })

        await this.repository.remove(weighingToDelete)

        return true
    }

    async findAll(): Promise<Weighing[]> {
        const allWeighings = await this.repository.find()

        return allWeighings
    }

    async upsert(weighings: ICreateWeighingDTO[]): Promise<Weighing[]> {
        await this.repository.upsert(weighings, ['code'])

        const newWeighings = await this.repository.find()

        return newWeighings
    }
}

export { WeighingRepository }
