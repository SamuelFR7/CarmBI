import 'reflect-metadata'
import { WeighingRepositoryInMemory } from '@modules/weighings/repositories/in-memory/WeighingRepositoryInMemory'
import { ListWeighingsLotsUseCase } from './ListWeighingsLotsUseCase'
import { v4 as uuid } from 'uuid'
let listWeighingsLotsUseCase: ListWeighingsLotsUseCase
let weighingRepositoryInMemory: WeighingRepositoryInMemory

describe('List weighings lots use case', () => {
    beforeEach(() => {
        weighingRepositoryInMemory = new WeighingRepositoryInMemory()
        listWeighingsLotsUseCase = new ListWeighingsLotsUseCase(
            weighingRepositoryInMemory
        )
    })

    it('should be abel to list all weighings lots', async () => {
        await weighingRepositoryInMemory.create({
            code: '001',
            depositor: 'EDUARDO',
            lot: '001',
            product: 'SOJA',
            producer_type: '1',
            input: 1,
            output: 1200,
            sync: uuid(),
        })

        const newLot = {
            lot: '001',
            product: 'SOJA',
        }

        const allLots = await listWeighingsLotsUseCase.execute()

        expect(allLots[0]).toEqual(newLot)
    })
})
