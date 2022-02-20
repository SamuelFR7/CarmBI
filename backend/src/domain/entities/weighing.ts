import { v4 as uuid } from 'uuid'

class Weighing {
    id?: string
    code: string
    depositor: string
    lot: string
    product: string
    input: number
    output: number
    sync: string

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}


export { Weighing }