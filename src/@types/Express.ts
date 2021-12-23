/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-namespace */
import { User } from '../modules/accounts/entities/User'

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}
