import { AppError } from '../../../../shared/errors/AppError'

export namespace CreateRentalError {
  export class CarAlreadyRented extends AppError {
    constructor() {
      super('Car already rented', 400)
    }
  }

  export class UserAlreadyRented extends AppError {
    constructor() {
      super('User already rented a car', 400)
    }
  }

  export class ExpectReturnDate extends AppError {
    constructor() {
      super('Expected return date must be at least 24 hours from now', 400)
    }
  }
}
