import { Category } from '../../models/Category'
import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository'

export class ListSpecificationsUseCase {
  constructor(
    private readonly specificationsRepository: SpecificationsRepository
  ) {}

  execute(): Category[] {
    return this.specificationsRepository.list()
  }
}
