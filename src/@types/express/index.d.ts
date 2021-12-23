/* eslint-disable @typescript-eslint/naming-convention */
import { User } from '../../modules/accounts/entities/User'

declare module 'express' {
  interface Request {
    user: User
  }
}
