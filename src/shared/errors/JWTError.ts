import { AppError } from './AppError'

export namespace JWTError {
  export class InvalidToken extends AppError {
    constructor() {
      super('Invalid token', 401)
    }
  }

  export class TokenIsMissing extends AppError {
    constructor() {
      super('Token is missing', 401)
    }
  }

  export class UserNotFound extends AppError {
    constructor() {
      super('User not found', 401)
    }
  }
}
