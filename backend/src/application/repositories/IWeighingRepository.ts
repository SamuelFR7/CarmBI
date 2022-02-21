import { Weighing } from "../../domain/entities/weighing";
import { ICreateWeighingDTO } from "./dtos/CreateWeighingDTO";


export interface IWeighingRepository {
    deleteByCode(cod: string): Promise<true | null>
    findAll(): Promise<Weighing[]>
    upsert(weighings: Weighing[]): Promise<Weighing[]>
}