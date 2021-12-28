import express from 'express'
import 'reflect-metadata'
import 'express-async-errors'
import swaggerUI from 'swagger-ui-express'

import createConnection from '@shared/infra/typeorm'

import '@shared/container'
import swagger from '../../../swagger.json'
import { errorMessage } from './middlewares/errorMessage'
import { router } from './routes'

createConnection()
export const app = express()

app.use(express.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger))
app.use(router)
app.use(errorMessage)
