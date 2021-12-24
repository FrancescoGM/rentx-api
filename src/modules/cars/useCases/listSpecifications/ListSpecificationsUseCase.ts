import { inject, injectable } from 'tsyringe'

import { Category } from '@modules/cars/infra/typeorm/entities/Category'
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/implementations/SpecificationsRepository'

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
