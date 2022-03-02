import { Weighing } from '@modules/weighings/entities/weighing'
import { IFilterWeighingDTO } from '../dtos/FilterWeighingDTO'
import { IListWeighingLotsDTO } from '../dtos/ListWeighingsLotsDTO'

export interface IWeighingRepository {
    deleteById(id: string): Promise<true | null>
    findAll(): Promise<Weighing[]>
    findUnique(code: string, lot: string): Promise<Weighing>
    update(id: string, weighing: Weighing): Promise<Weighing>
    create(weighing: Weighing): Promise<Weighing>
    findByFilters({
        producer_type,
        lot,
    }: IFilterWeighingDTO): Promise<Weighing[]>
    listLots(): Promise<IListWeighingLotsDTO[]>
}
