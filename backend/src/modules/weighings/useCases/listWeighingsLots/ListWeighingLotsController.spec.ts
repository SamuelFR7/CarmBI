/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from '@shared/infra/http/app'
import request from 'supertest'

describe('List weighing lots controller', () => {
    it('should be able to list weighing lots', async () => {
        await request(app).post('/users').send({
            username: 'test-integration-user',
            password: 'test-integration-password',
        })

        const { body } = await request(app).post('/users/session').send({
            username: 'test-integration-user',
            password: 'test-integration-password',
        })

        const response = await request(app)
            .get('/weighings/lots')
            .set('Authorization', 'bearer ' + body.token)

        expect(response.status).toBe(200)
    })
})
