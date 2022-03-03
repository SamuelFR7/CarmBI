import 'reflect-metadata'
import { WeighingRepositoryInMemory } from '@modules/weighings/repositories/in-memory/WeighingRepositoryInMemory'
import { ListWeighingUpdateTimeUseCase } from './ListWeighingUpdateTimeUseCase'
import { v4 as uuid } from 'uuid'
import { AppError } from '@shared/errors/AppError'

let listWeighingUpdateUseCase: ListWeighingUpdateTimeUseCase
let weighingRepositoryInMemory: WeighingRepositoryInMemory

describe('List weighing update use case', () => {
    beforeEach(() => {
        weighingRepositoryInMemory = new WeighingRepositoryInMemory()
        listWeighingUpdateUseCase = new ListWeighingUpdateTimeUseCase(
            weighingRepositoryInMemory
        )
    })

    it('should be able to list the last update time', async () => {
        const updated_at = new Date()

        await weighingRepositoryInMemory.create({
            code: '001',
            depositor: 'EDUARDO',
            lot: '001',
            product: 'SOJA',
            producer_type: '1',
            input: 1,
            output: 1200,
            sync: uuid(),
            updated_at,
        })

        const updateTime = await listWeighingUpdateUseCase.execute()

        expect(updateTime).toEqual(updated_at)
    })

    it('should not be able to list if no exists any weighings', async () => {
        await expect(listWeighingUpdateUseCase.execute()).rejects.toEqual(
            new AppError('Does not exists any weighing')
        )
    })
})
