import 'reflect-metadata'
import { InMemoryWeighingRepository } from '../../repositories/in-memory/inMemoryWeighingRepository'
import { ListWeighingSummaryUseCase } from './listWeighingSummaryUseCase'

describe('List weighing summary use case', () => {
    it('should be able to list all weighing summary', async () => {
        const weighingRepository = new InMemoryWeighingRepository()
        const sut = new ListWeighingSummaryUseCase(weighingRepository)

        const response = await sut.execute()

        expect(response).toBeTruthy()
    })
})
