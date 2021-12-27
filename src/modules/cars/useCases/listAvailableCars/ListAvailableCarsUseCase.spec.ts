import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

let carsRepository: ICarsRepository
let listAvailableCarsUseCase: ListAvailableCarsUseCase

const car1: ICreateCarDTO = {
  name: 'car 1 name',
  description: 'car 1 description',
  licence_plate: 'car 1 licence plate',
  daily_rate: 100,
  fine_amount: 10,
  brand: 'car 1 brand',
  category_id: '1234',
}

const car2: ICreateCarDTO = {
  name: 'car 2 name',
  description: 'car 2 description',
  licence_plate: 'car 2 licence plate',
  daily_rate: 200,
  fine_amount: 10,
  brand: 'car 2 brand',
  category_id: '4567',
}

describe('List cars', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository)
  })

  it('Should be able to list all available cars', async () => {
    await carsRepository.create(car1)
    await carsRepository.create(car2)
    const list = await listAvailableCarsUseCase.execute()

    expect(list).toHaveLength(2)
    expect(list[0].available).toBeTruthy()
    expect(list[1].available).toBeTruthy()
  })

  it('Should be able to list all available cars by name', async () => {
    await carsRepository.create(car1)
    await carsRepository.create(car2)

    const list = await listAvailableCarsUseCase.execute({ name: car1.name })

    expect(list).toHaveLength(1)
    expect(list[0].available).toBeTruthy()
    expect(list[0].name).toBe(car1.name)
  })

  it('Should be able to list all available cars by brand', async () => {
    await carsRepository.create(car1)
    await carsRepository.create(car2)

    const list = await listAvailableCarsUseCase.execute({ brand: car1.brand })

    expect(list).toHaveLength(1)
    expect(list[0].available).toBeTruthy()
    expect(list[0].brand).toBe(car1.brand)
  })

  it('Should be able to list all available cars by category id', async () => {
    await carsRepository.create(car1)
    await carsRepository.create(car2)

    const list = await listAvailableCarsUseCase.execute({
      category_id: car1.category_id,
    })

    expect(list).toHaveLength(1)
    expect(list[0].available).toBeTruthy()
    expect(list[0].category_id).toBe(car1.category_id)
  })
})
