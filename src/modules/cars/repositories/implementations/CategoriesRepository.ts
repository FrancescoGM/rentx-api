import { Category } from '../../models/Category'
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository'

export class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[]

  private static INSTANCE: CategoriesRepository

  private constructor() {
    this.categories = []
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository()
    }

    return CategoriesRepository.INSTANCE
  }

  create(data: ICreateCategoryDTO) {
    const category = new Category()

    Object.assign(category, data)

    this.categories.push(category)
  }

  list(): Category[] {
    return this.categories
  }

  findByName(name: string): Category | undefined {
    return this.categories.find((category) => category.name === name)
  }
}
