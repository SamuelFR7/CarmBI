/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from '@shared/infra/http/app'
import request from 'supertest'

describe('Authenticate user controller', () => {
    it('should be able to authenticate a new user', async () => {
        await request(app).post('/users').send({
            username: 'test-integration-user',
            password: 'test-integration-password',
        })

        const response = await request(app).post('/users/session').send({
            username: 'test-integration-user',
            password: 'test-integration-password',
        })

        expect(response.status).toBe(200)
    })
})
