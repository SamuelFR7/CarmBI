import { ICreateWeighingDTO, IWeighingRepository } from "../../src/application/repositories/IWeighingRepository";
import { Weighing } from "../../src/domain/entities/weighing";

class InMemoryWeighingRepository implements IWeighingRepository {
    public items: Weighing[] = []

    async findByCode(cod: string): Promise<Weighing | null> {
        const weighing = this.items.find(weighing => weighing.props.code === cod)

        if (!weighing) {
            return null
        }

        return weighing
    }

    async deleteByCode(cod: string): Promise<true | null> {
        const weighingToDelete = this.items.find(weighing => weighing.props.code === cod)

        if (!weighingToDelete) {
            return null
        }

        const index = this.items.indexOf(weighingToDelete)

        if (index > -1) {
            this.items.splice(index, 1)
        }

        return true
    }

    async findAll(): Promise<Weighing[]> {
        const weighings = this.items

        return weighings
    }

    async create({ code, depositor, input, lot, output, product, sync }: ICreateWeighingDTO): Promise<Weighing> {
        const newWeighing = Weighing.create({
            code,
            depositor,
            input,
            lot,
            output,
            product,
            sync
        })

        this.items.push(newWeighing)

        return newWeighing
    }

    async update(code: string, newWeighingInfo: ICreateWeighingDTO): Promise<Weighing | null> {
        const weighing = this.items.find(item => item.props.code === code)

        if (!weighing) {
            return null
        }

        weighing.props = {
            code: newWeighingInfo.code,
            depositor: newWeighingInfo.depositor,
            input: newWeighingInfo.input,
            lot: newWeighingInfo.lot,
            output: newWeighingInfo.output,
            product: newWeighingInfo.product,
            sync: newWeighingInfo.sync
        }

        return weighing
    }
}

export { InMemoryWeighingRepository }