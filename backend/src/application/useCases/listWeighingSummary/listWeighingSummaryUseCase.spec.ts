import { InMemoryWeighingRepository } from "../../../../tests/repositories/inMemoryWeighingRepository";
import { ListWeighingSummaryUseCase } from "./listWeighingSummaryUseCase";
import { v4 as uuid } from 'uuid'

describe('List weighing summary use case', () => {
    it('should be able to list all weighing summary', async () => {
        const weighingRepository = new InMemoryWeighingRepository()
        const sut = new ListWeighingSummaryUseCase(weighingRepository)

        await weighingRepository.create({
            code: '002',
            depositor: 'JOÃO',
            lot: '001',
            product: 'SOJA',
            input: 1200,
            output: 1,
            sync: uuid(),
        }) 

        const response = await sut.execute()

        expect(response).toBeTruthy()
    })
})