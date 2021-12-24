import { getRepository, Repository } from 'typeorm'

import { Category } from '@modules/cars/infra/typeorm/entities/Category'
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '@modules/cars/repositories/ICategoriesRepository'

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = getRepository(Category)
  }

  async create(data: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name: data.name,
      description: data.description,
    })

    await this.repository.save(category)
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find()
    return categories
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = await this.repository.findOne({
      where: { name },
    })
    return category
  }
}
