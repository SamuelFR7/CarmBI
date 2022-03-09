/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from '@shared/infra/http/app'
import request from 'supertest'
import { Client } from 'pg'

describe('Create weighing summary controller', () => {
    it('should be able to create weighing summary', async () => {
        await request(app).post('/users').send({
            username: 'test-integration-user',
            password: 'test-integration-password',
        })

        const pgClient = new Client({
            connectionString: process.env.DATABASE_URL,
        })

        await pgClient.connect()
        await pgClient.query(`SET search_path TO '${process.env.SCHEMA}'`)
        await pgClient.query(
            "UPDATE users SET is_admin = true WHERE username = 'test-integration-user'"
        )
        await pgClient.end()

        const { body } = await request(app).post('/users/session').send({
            username: 'test-integration-user',
            password: 'test-integration-password',
        })

        const response = await request(app)
            .post('/weighings')
            .set('Authorization', 'bearer ' + body.token)
            .send({
                weighings: [
                    {
                        code: '001',
                        depositor: 'ALDELINO',
                        lot: '001',
                        product: 'SOJA',
                        producer_type: '1',
                        input: 1,
                        output: 1200,
                    },
                ],
            })

        expect(response.status).toBe(201)
    })
})
