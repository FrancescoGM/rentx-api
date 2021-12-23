import express from 'express'
import 'express-async-errors'
import swaggerUI from 'swagger-ui-express'

import './database'
import './shared/container'
import { errorMessage } from './middlewares/errorMessage'
import { router } from './routes'
import swagger from './swagger.json'

const app = express()

app.use(express.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger))
app.use(router)
app.use(errorMessage)

app.listen(3333, () => {
  console.log('server is running on port 3333')
})
