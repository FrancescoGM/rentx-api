import { AppError } from '@errors/AppError'
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    )
  })

  it('Should be able to create a new category', async () => {
    const category = {
      name: 'john doe name',
      description: 'john doe description',
    }
    await createCategoryUseCase.execute(category)

    const createdCategory = await categoriesRepositoryInMemory.findByName(
      category.name
    )

    expect(categoriesRepositoryInMemory.categories.length).toBe(1)
    expect(createdCategory).toHaveProperty('id')
    expect(createdCategory.name).toBe(category.name)
    expect(createdCategory.description).toBe(category.description)
  })

  it('should not be able to create a new category when name already exists', async () => {
    expect(async () => {
      const category = {
        name: 'john doe name',
        description: 'john doe description',
      }
      await createCategoryUseCase.execute(category)
      await createCategoryUseCase.execute(category)
    }).rejects.toBeInstanceOf(AppError)
  })
})
