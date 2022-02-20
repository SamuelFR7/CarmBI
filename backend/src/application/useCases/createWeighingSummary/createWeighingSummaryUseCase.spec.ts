import { CreateWeighingSummaryUseCase } from "./createWeighingSummaryUseCase"
import { v4 as uuid } from 'uuid'
import { InMemoryWeighingRepository } from "../../repositories/in-memory/inMemoryWeighingRepository"

describe('Create weighing summary use case', () => {
    it('should be able to create a new weighing summary', async () => {
        const weighingRepository = new InMemoryWeighingRepository()
        const sut = new CreateWeighingSummaryUseCase(
            weighingRepository
        )

        const sync = uuid()

        await weighingRepository.create({
            code: '002',
            depositor: 'JOÃO',
            lot: '001',
            product: 'SOJA',
            input: 1200,
            output: 1,
            sync,
        })

        await weighingRepository.create({
            code: '003',
            depositor: 'JEFFERSON',
            lot: '003',
            product: 'Feijão',
            input: 200,
            output: 1,
            sync
        })

        const response = await sut.execute([
            {
                code: '002',
                depositor: 'MARCOS',
                lot: '001',
                product: 'SOJA',
                input: 1200,
                output: 1,
            },
            {
                code: '001',
                depositor: 'ALDELINO',
                lot: '005',
                product: 'MILHO',
                input: 0,
                output: 200
            }
        ])

        expect(response).toBeTruthy()
    })
})