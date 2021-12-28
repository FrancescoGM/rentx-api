import { hash } from 'bcrypt'
import request from 'supertest'
import { Connection } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { app } from '@shared/infra/http/app'
import createConnection from '@shared/infra/typeorm'

let connection: Connection

describe('Create category controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = uuidV4()
    const password = await hash('admin', 8)

    await connection.query(`
    INSERT INTO USERS(id, name, email, password, is_admin, driver_license, created_at) 
    VALUES('${id}', 'admin', 'admin@rentx.com', '${password}', true, '123456789', 'NOW()')
    `)
  })
  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })
  it('Should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    })

    const { token } = responseToken.body

    const res = await request(app)
      .post('/categories')
      .send({
        name: 'test',
        description: 'test',
      })
      .auth(token, { type: 'bearer' })

    expect(res.status).toBe(204)
  })
  it('should not be able to create a category with the same name', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    })

    const { token } = responseToken.body

    await request(app)
      .post('/categories')
      .send({
        name: 'test',
        description: 'test',
      })
      .auth(token, { type: 'bearer' })

    const res = await request(app)
      .post('/categories')
      .send({
        name: 'test',
        description: 'test',
      })
      .auth(token, { type: 'bearer' })

    expect(res.status).toBe(400)
  })
})
