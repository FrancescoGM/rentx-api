import { AppError } from '@shared/errors/AppError'

export namespace DevolutionRentalError {
  export class RentalDoesNotExists extends AppError {
    constructor() {
      super('Rental does not exists', 404)
    }
  }

  export class UserDoesNotHavePermissionToDevolution extends AppError {
    constructor() {
      super('User does not have permission to devolution', 403)
    }
  }

  export class CarAlreadyDevolutioned extends AppError {
    constructor() {
      super('Car already devolutioned', 400)
    }
  }
}
