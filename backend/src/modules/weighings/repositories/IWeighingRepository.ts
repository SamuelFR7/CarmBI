import { Weighing } from '@modules/weighings/entities/weighing'

export interface IWeighingRepository {
    deleteByCode(cod: string): Promise<true | null>
    findAll(): Promise<Weighing[]>
    findByCode(code: string): Promise<Weighing>
    update(code: string, weighing: Weighing): Promise<Weighing>
    create(weighing: Weighing): Promise<Weighing>
}
