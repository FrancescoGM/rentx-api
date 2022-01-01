import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'

import { CreateCarError } from './CreateCarError'
import { CreateCarUseCase } from './CreateCarUseCase'

let carsRepository: ICarsRepository
let createCarUseCase: CreateCarUseCase
const car = {
  name: 'john doe car name',
  description: 'john doe car description',
  daily_rate: 100,
  licence_plate: 'ABC-1234',
  fine_amount: 10,
  brand: 'john doe car brand',
  category_id: 'john doe car category_id',
}

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepository)
  })
  it('should be able to create a new car', async () => {
    const createdCar = await createCarUseCase.execute(car)

    expect(createdCar).toHaveProperty('id')
    expect(createdCar.name).toBe(car.name)
    expect(createdCar.description).toBe(car.description)
  })

  it('should not be able to create a car with exists licence plate', () => {
    expect(async () => {
      await createCarUseCase.execute(car)
      await createCarUseCase.execute(car)
    }).rejects.toBeInstanceOf(CreateCarError)
  })

  it('should be able to create a car with available true by default', async () => {
    const createdCar = await createCarUseCase.execute(car)

    expect(createdCar.available).toBe(true)
  })
})
