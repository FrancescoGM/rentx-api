import { inject, injectable } from 'tsyringe'

import { Category } from '@modules/cars/entities/Category'
import { SpecificationsRepository } from '@modules/cars/repositories/implementations/SpecificationsRepository'

@injectable()
export class ListSpecificationsUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private readonly specificationsRepository: SpecificationsRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.specificationsRepository.list()
    return categories
  }
}
