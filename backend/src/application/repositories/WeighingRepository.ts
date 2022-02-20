import { Weighing } from "../../domain/entities/weighing";

export interface ICreateWeighingDTO {
    code: string
    depositor: string
    lot: string
    product: string
    input: number
    output: number
    sync: string
}

export interface WeighingRepository {
    findByCode(cod: string): Promise<Weighing | null>
    deleteByCode(cod: string): Promise<true | null>
    findAll(): Promise<Weighing[]>
    create({code, depositor, input, lot, output, product}: ICreateWeighingDTO): Promise<Weighing>
    update(code: string, newWeighingInfo: ICreateWeighingDTO): Promise<Weighing | null>
}