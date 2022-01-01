import { AppError } from '@shared/errors/AppError'

export class CreateCarSpecificationError extends AppError {
  constructor() {
    super('Car does not exists', 404)
  }
}
