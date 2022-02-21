import { Weighing } from '../infra/typeorm/entities/weighing'

export interface IWeighingRepository {
    deleteByCode(cod: string): Promise<true | null>
    findAll(): Promise<Weighing[]>
    upsert(weighings: Weighing[]): Promise<Weighing[]>
}
