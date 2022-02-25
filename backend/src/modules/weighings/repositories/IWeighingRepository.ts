import { Weighing } from '@modules/weighings/entities/weighing'
import { IFilterWeighingDTO } from '../dtos/FilterWeighingDTO'

export interface IWeighingRepository {
    deleteByCode(cod: string): Promise<true | null>
    findAll(): Promise<Weighing[]>
    findByCode(code: string): Promise<Weighing>
    update(code: string, weighing: Weighing): Promise<Weighing>
    create(weighing: Weighing): Promise<Weighing>
    findByFilters({
        producer_type,
        lot,
    }: IFilterWeighingDTO): Promise<Weighing[]>
}
