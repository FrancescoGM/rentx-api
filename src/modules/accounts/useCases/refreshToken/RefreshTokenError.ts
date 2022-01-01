import { AppError } from '@shared/errors/AppError'

export class RefreshTokenError extends AppError {
  constructor() {
    super('Refresh token does not exists', 401)
  }
}
