import { ICreateWeighingDTO, IWeighingRepository } from "../IWeighingRepository";
import { Weighing } from "../../../domain/entities/weighing";

class InMemoryWeighingRepository implements IWeighingRepository {
    weighings: Weighing[] = []

    async findByCode(cod: string): Promise<Weighing> {
        const weighing = this.weighings.find(item => item.code === cod)

        return weighing
    }

    async deleteByCode(cod: string): Promise<true | null> {
        const weighingToDelete = this.weighings.find(item => item.code === cod)

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

    async create({ code, depositor, input, lot, output, product }: ICreateWeighingDTO): Promise<Weighing> {
        const weighing = new Weighing()

        Object.assign(weighing, {
            code,
            depositor,
            input,
            lot,
            output,
            product
        })

        this.weighings.push(weighing)

        return weighing
    }

    async update(code: string, newWeighingInfo: ICreateWeighingDTO): Promise<Weighing> {
        const weighing = this.weighings.find(item => item.code === code)

        Object.assign(weighing, newWeighingInfo)

        return weighing
    }
    
}

export { InMemoryWeighingRepository }