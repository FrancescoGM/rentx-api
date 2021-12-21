import { Category } from '../models/Category'

export interface ICreateCategoryDTO {
  name: string
  description: string
}

export interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): void
  findByName(name: string): Category
  list(): Category[]
}
