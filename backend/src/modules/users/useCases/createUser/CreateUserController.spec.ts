/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from '@shared/infra/http/app'
import request from 'supertest'

describe('Create user controller', () => {
    it('should be able to create a new user', async () => {
        const response = await request(app).post('/users').send({
            username: 'test-integration-user',
            password: 'test-integration-password',
        })

        expect(response.status).toBe(201)
    })
})
