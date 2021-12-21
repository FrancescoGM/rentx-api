import { Category } from '../../models/Category'
import { CategoriesRepository } from '../../repositories/CategoriesRepository'

export class ListCategoriesUseCase {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  execute(): Category[] {
    return this.categoriesRepository.list()
  }
}
