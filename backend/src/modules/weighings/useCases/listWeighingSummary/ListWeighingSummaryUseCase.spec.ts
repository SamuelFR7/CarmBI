import 'reflect-metadata'
import { WeighingRepositoryInMemory } from '../../repositories/in-memory/WeighingRepositoryInMemory'
import { ListWeighingSummaryUseCase } from './ListWeighingSummaryUseCase'
import { v4 as uuid } from 'uuid'

let listWeighingSummaryUseCase: ListWeighingSummaryUseCase
let weighingRepositoryInMemory: WeighingRepositoryInMemory

describe('List weighing summary use case', () => {
    beforeEach(() => {
        weighingRepositoryInMemory = new WeighingRepositoryInMemory()
        listWeighingSummaryUseCase = new ListWeighingSummaryUseCase(
            weighingRepositoryInMemory
        )
    })

    it('should be able to list all weighing summary', async () => {
        const weighing = await weighingRepositoryInMemory.create({
            code: '001',
            depositor: 'EDUARDO',
            lot: '001',
            product: 'SOJA',
            productor_type: '1',
            input: 1,
            output: 1200,
            sync: uuid(),
        })

        const allWeighings = await listWeighingSummaryUseCase.execute({
            productor_type: '1',
            lot: '001',
        })

        expect(allWeighings[0]).toEqual(weighing)
    })
})
