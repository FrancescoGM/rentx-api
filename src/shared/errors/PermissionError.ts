import { AppError } from './AppError'

export namespace PermissionError {
  export class MustBeAdministrator extends AppError {
    constructor() {
      super('You must be an administrator to do that', 401)
    }
  }
}
