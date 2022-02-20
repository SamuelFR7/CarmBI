import { Entity } from "../../core/domain/Entity"

type WeighingProps = {
    code: string
    depositor: string
    lot: string
    product: string
    input: number
    output: number
    sync: string
}

class Weighing extends Entity<WeighingProps> {
    private constructor(props: WeighingProps, id?: string) {
        super(props, id)
    }

    static create(props: WeighingProps, id?: string) {
        const weighing = new Weighing(props)

        return weighing
    }
}

export { Weighing }