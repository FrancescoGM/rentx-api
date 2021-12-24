import { Category } from '../infra/typeorm/entities/Category'

export interface ICreateCategoryDTO {
  name: string
  description: string
}

export interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<void>
  findByName(name: string): Promise<Category>
  list(): Promise<Category[]>
}
