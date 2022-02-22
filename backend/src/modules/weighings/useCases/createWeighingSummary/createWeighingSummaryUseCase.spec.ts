import 'reflect-metadata'
import { CreateWeighingSummaryUseCase } from './createWeighingSummaryUseCase'
import { WeighingRepositoryInMemory } from '../../repositories/in-memory/WeighingRepositoryInMemory'

let createWeighingSummaryUseCase: CreateWeighingSummaryUseCase
let weighingRepositoryInMemory: WeighingRepositoryInMemory

describe('Create weighing summary use case', () => {
    beforeEach(() => {
        weighingRepositoryInMemory = new WeighingRepositoryInMemory()
        createWeighingSummaryUseCase = new CreateWeighingSummaryUseCase(
            weighingRepositoryInMemory
        )
    })

    it('should be able to create a new weighing summary', async () => {
        await createWeighingSummaryUseCase.execute([
            {
                code: '001',
                depositor: 'EDUARDO',
                lot: '001',
                product: 'SOJA',
                input: 1,
                output: 1200,
            },
        ])

        const createdSummary = await weighingRepositoryInMemory.findAll()

        expect(createdSummary[0]).toBeTruthy()
    })

    it('should be able to substitute the older summary', async () => {
        await createWeighingSummaryUseCase.execute([
            {
                code: '001',
                depositor: 'EDUARDO',
                lot: '001',
                product: 'SOJA',
                input: 1,
                output: 1200,
            },
        ])

        await createWeighingSummaryUseCase.execute([
            {
                code: '002',
                depositor: 'JOÃO',
                lot: '003',
                product: 'SOJA',
                input: 1,
                output: 1200,
            },
        ])

        const substituteSummary = await weighingRepositoryInMemory.findAll()

        expect(substituteSummary[0].depositor).toBe('JOÃO')
    })
})
