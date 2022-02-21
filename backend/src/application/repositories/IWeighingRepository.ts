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

export interface IWeighingRepository {
    findByCode(cod: string): Promise<Weighing | null>
    deleteByCode(cod: string): Promise<true | null>
    findAll(): Promise<Weighing[]>
    create({code, depositor, input, lot, output, product, sync}: ICreateWeighingDTO): Promise<Weighing>
    update(cod: string, {code, depositor, input, lot, output, product, sync}: ICreateWeighingDTO): Promise<Weighing | null>
}