/* eslint-disable @typescript-eslint/naming-convention */
import { User } from '@modules/accounts/infra/typeorm/entities/User'

declare module 'express' {
  interface Request {
    user: User
  }
}
