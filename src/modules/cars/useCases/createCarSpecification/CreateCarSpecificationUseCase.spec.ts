import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'

import { CreateCarSpecificationError } from './CreateCarSpecificationError'
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

let carsRepository: ICarsRepository
let specificationsRepository: ISpecificationsRepository
let createCarSpecificationUseCase: CreateCarSpecificationUseCase

describe('Create car specification', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory()
    specificationsRepository = new SpecificationsRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepository,
      specificationsRepository
    )
  })

  it('Should be able to add a new specification to an car', async () => {
    await specificationsRepository.create({ name: 'test', description: 'test' })
    const specification = await specificationsRepository.findByName('test')
    const newCar = await carsRepository.create({
      name: 'John doe car name',
      description: 'John doe car description',
      licence_plate: 'ABC-1234',
      daily_rate: 100,
      fine_amount: 10,
      brand: 'Ford',
      category_id: '1',
    })

    const specifications_id = [specification.id]

    const car = await createCarSpecificationUseCase.execute({
      car_id: newCar.id,
      specifications_id,
    })

    expect(car).toHaveProperty('specifications')
    expect(car.specifications.length).toBe(1)
  })

  it('Should not be able to add a new specification to a non-existent car', async () => {
    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id: '123',
        specifications_id: ['123'],
      })
    }).rejects.toBeInstanceOf(CreateCarSpecificationError)
  })
})
