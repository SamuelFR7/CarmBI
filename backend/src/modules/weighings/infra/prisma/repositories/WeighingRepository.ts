import { prisma } from '@shared/infra/database/prisma/client'
import { Weighing } from '@modules/weighings/entities/weighing'
import { IWeighingRepository } from '@modules/weighings/repositories/IWeighingRepository'
import { IFilterWeighingDTO } from '@modules/weighings/dtos/FilterWeighingDTO'
import { IListWeighingLotsDTO } from '@modules/weighings/dtos/ListWeighingsLotsDTO'

class WeighingRepository implements IWeighingRepository {
    async findUnique(code: string, lot: string): Promise<Weighing> {
        const weighing = await prisma.weighing.findMany({
            where: {
                code,
                lot,
            },
        })

        return weighing[0]
    }

    async update(id: string, weighing: Weighing): Promise<Weighing> {
        const updatedWeighing = await prisma.weighing.update({
            where: {
                id,
            },
            data: {
                code: weighing.code,
                depositor: weighing.depositor,
                input: weighing.input,
                lot: weighing.lot,
                output: weighing.output,
                product: weighing.product,
                producer_type: weighing.producer_type,
                sync: weighing.sync,
                updated_at: weighing.updated_at,
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
                producer_type: weighing.producer_type,
                sync: weighing.sync,
                updated_at: weighing.updated_at,
            },
        })

        return newWeighing
    }

    async deleteById(id: string): Promise<true> {
        await prisma.weighing.delete({ where: { id } })
        return true
    }

    async findAll(): Promise<Weighing[]> {
        const allWeighing = await prisma.weighing.findMany()

        return allWeighing
    }

    async findByFilters({
        producer_type,
        lot,
    }: IFilterWeighingDTO): Promise<Weighing[]> {
        const filteredWeighings = await prisma.weighing.findMany({
            where: {
                producer_type,
                lot,
            },
        })

        return filteredWeighings
    }

    async listLots(): Promise<IListWeighingLotsDTO[]> {
        const lots = await prisma.weighing.findMany({
            distinct: ['lot'],
            orderBy: [
                {
                    lot: 'desc',
                },
            ],
            select: {
                lot: true,
                product: true,
            },
        })

        return lots
    }
}

export { WeighingRepository }
