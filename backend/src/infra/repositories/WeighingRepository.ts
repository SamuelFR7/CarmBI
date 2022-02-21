import { getRepository, Repository } from "typeorm";
import { ICreateWeighingDTO, IWeighingRepository } from "../../application/repositories/IWeighingRepository";
import { Weighing } from "../../domain/entities/weighing";

class WeighingRepository implements IWeighingRepository {
    private repository: Repository<Weighing>

    private constructor() {
        this.repository = getRepository(Weighing)
    }

    async findByCode(cod: string): Promise<Weighing> {
        const weighing = await this.repository.findOne({where: {code: cod}})

        return weighing
    }

    async deleteByCode(cod: string): Promise<true> {
        const weighingToDelete = await this.repository.findOne({where: {code: cod}})

        await this.repository.remove(weighingToDelete)

        return true
    }

    async findAll(): Promise<Weighing[]> {
        const allWeighings = await this.repository.find()

        return allWeighings
    }

    async create({ code, depositor, input, lot, output, product, sync }: ICreateWeighingDTO): Promise<Weighing> {
        const weighing = this.repository.create({
            code,
            depositor,
            input,
            lot,
            output,
            product,
            sync
        })

        await this.repository.save(weighing)

        return weighing
    }

    async update(code: string, newWeighingInfo: ICreateWeighingDTO): Promise<Weighing> {
        const weighingToUpdate = await this.repository.findOne({where: {code}})

        await this.repository.update(weighingToUpdate, newWeighingInfo)

        return newWeighingInfo
    }

}

export { WeighingRepository }