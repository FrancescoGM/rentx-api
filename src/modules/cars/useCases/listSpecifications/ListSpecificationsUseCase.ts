import { inject, injectable } from 'tsyringe'

import { Category } from '../../entities/Category'
import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository'

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
