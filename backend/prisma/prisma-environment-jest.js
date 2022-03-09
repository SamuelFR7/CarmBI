const NodeEnvironment = require('jest-environment-node')
const { v4: uuid } = require('uuid')
const { Client } = require('pg')
const { resolve } = require('path')
const { execSync } = require('child_process')

const prismaCli = resolve(__dirname, '..', './node_modules/.bin/prisma')

require('dotenv').config({
    path: resolve(__dirname, '..', '.env.test')
})

class CustomEnvironment extends NodeEnvironment {
    constructor(config) {
        super(config)
        this.schema = `carm_schema_${uuid()}`
        this.connectionString = `${process.env.DATABASE_URL}${this.schema}`
    }

    setup() {
        process.env.DATABASE_URL = this.connectionString
        this.global.process.env.SCHEMA = this.schema
        this.global.process.env.DATABASE_URL = this.connectionString

        execSync(`${prismaCli} migrate dev`)
    }

    async teardown() {
        const client = new Client({
            connectionString: this.connectionString
        })

        await client.connect()
        await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`)
        await client.end()
    }
}

module.exports = CustomEnvironment