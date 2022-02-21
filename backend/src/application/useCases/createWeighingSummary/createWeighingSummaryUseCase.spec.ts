import 'reflect-metadata'
import { CreateWeighingSummaryUseCase } from "./createWeighingSummaryUseCase"
import { v4 as uuid } from 'uuid'
import { InMemoryWeighingRepository } from "../../repositories/in-memory/inMemoryWeighingRepository"

describe('Create weighing summary use case', () => {
    it('should be able to create a new weighing summary', async () => {
        const weighingRepository = new InMemoryWeighingRepository()
        const sut = new CreateWeighingSummaryUseCase(
            weighingRepository
        )

        await sut.execute([
            {
                code: '001',
                depositor: 'ALDELINO',
                lot: '001',
                product: 'SOJA',
                input: 1,
                output: 1200,
            },
            {
                code: '002',
                depositor: 'JOÃO',
                lot: '003',
                product: 'MILHO',
                input: 1200,
                output: 1,
            }
        ])

        const response = await sut.execute([
            {
                code: '001',
                depositor: 'EDUARDO',
                lot: '001',
                product: 'SOJA',
                input: 1,
                output: 1200,
            },
            {
                code: '003',
                depositor: 'MARCOS',
                lot: '005',
                product: 'FEIJÃO',
                input: 2400,
                output: 1,
            }
        ])

        expect(response).toBeTruthy()
    })
})