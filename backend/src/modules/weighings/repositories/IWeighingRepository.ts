import { Weighing } from '@modules/weighings/entities/weighing'
import { IFilterWeighingDTO } from '../dtos/FilterWeighingDTO'
import { IListWeighingLotsDTO } from '../dtos/ListWeighingsLotsDTO'

export interface IWeighingRepository {
    deleteByCode(cod: string): Promise<true | null>
    findAll(): Promise<Weighing[]>
    findUnique(code: string, lot: string): Promise<Weighing>
    update(code: string, weighing: Weighing): Promise<Weighing>
    create(weighing: Weighing): Promise<Weighing>
    findByFilters({
        producer_type,
        lot,
    }: IFilterWeighingDTO): Promise<Weighing[]>
    listLots(): Promise<IListWeighingLotsDTO[]>
}
