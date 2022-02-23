class Weighing {
    id?: string
    code: string
    depositor: string
    lot: string
    product: string
    productor_type: string
    input: number
    output: number
    sync: string

    private constructor(weighing: Weighing) {
        return Object.assign(this, {
            code: weighing.code,
            depositor: weighing.depositor,
            lot: weighing.lot,
            product: weighing.product,
            productor_type: weighing.productor_type,
            input: weighing.input,
            output: weighing.output,
            sync: weighing.sync,
        })
    }

    static create(weighingInfo: Weighing) {
        const weighing = new Weighing(weighingInfo)

        return weighing
    }
}

export { Weighing }
