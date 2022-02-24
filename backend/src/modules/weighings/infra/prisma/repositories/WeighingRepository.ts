import { prisma } from '@shared/infra/database/prisma/client'
import { Weighing } from '@modules/weighings/entities/weighing'
import { IWeighingRepository } from '@modules/weighings/repositories/IWeighingRepository'

class WeighingRepository implements IWeighingRepository {
    async findByCode(code: string): Promise<Weighing> {
        const weighing = await prisma.weighing.findUnique({ where: { code } })

        return weighing
    }

    async update(code: string, weighing: Weighing): Promise<Weighing> {
        const updatedWeighing = await prisma.weighing.update({
            where: {
                code,
            },
            data: {
                code: weighing.code,
                depositor: weighing.depositor,
                input: weighing.input,
                lot: weighing.lot,
                output: weighing.output,
                product: weighing.product,
                productor_type: weighing.productor_type,
                sync: weighing.sync,
            },
        })

        return updatedWeighing
    }

    async create(weighing: Weighing): Promise<Weighing> {
        const newWeighing = await prisma.weighing.create({
            data: {
                code: weighing.code,
                depositor: weighing.depositor,
                input: weighing.input,
                lot: weighing.lot,
                output: weighing.output,
                product: weighing.product,
                productor_type: weighing.productor_type,
                sync: weighing.sync,
            },
        })

        return newWeighing
    }

    async deleteByCode(cod: string): Promise<true> {
        await prisma.weighing.delete({ where: { code: cod } })
        return true
    }

    async findAll(): Promise<Weighing[]> {
        const allWeighing = await prisma.weighing.findMany()

        return allWeighing
    }
}

export { WeighingRepository }
