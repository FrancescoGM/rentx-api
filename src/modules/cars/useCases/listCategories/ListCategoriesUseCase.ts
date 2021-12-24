import { inject, injectable } from 'tsyringe'

import { Category } from '@modules/cars/infra/typeorm/entities/Category'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/implementations/CategoriesRepository'

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: CategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list()
    return categories
  }
}
