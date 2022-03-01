class Weighing {
    id?: string
    code: string
    depositor: string
    lot: string
    product: string
    producer_type: string
    input: number
    output: number
    sync: string
    updated_at: Date

    private constructor(weighing: Weighing) {
        return Object.assign(this, {
            code: weighing.code,
            depositor: weighing.depositor,
            lot: weighing.lot,
            product: weighing.product,
            producer_type: weighing.producer_type,
            input: weighing.input,
            output: weighing.output,
            sync: weighing.sync,
            updated_at: weighing.updated_at,
        })
    }

    static create(weighingInfo: Weighing) {
        const weighing = new Weighing(weighingInfo)

        return weighing
    }
}

export { Weighing }
