import { v4 as uuid } from 'uuid'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('weighings')
class Weighing {
    @PrimaryColumn()
    id?: string

    @Column()
    code: string

    @Column()
    depositor: string

    @Column()
    lot: string

    @Column()
    product: string

    @Column()
    input: number

    @Column()
    output: number

    @Column()
    sync: string

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}

export { Weighing }
