import dayjs from 'dayjs'

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { RentalsRepositoryInMemory } from '@modules/rentais/repositories/InMemory/RentalsRepositoryInMemory'
import { IRentalsRepository } from '@modules/rentais/repositories/IRentalsRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { AppError } from '@shared/errors/AppError'

import { CreateRentalUseCase } from './CreateRentalUseCase'

let dateProvider: IDateProvider
let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: IRentalsRepository
let carsRepositoryInMemory: ICarsRepository

const expected_return_date = dayjs().add(1, 'day').toDate()

const rental = {
  user_id: '1234',
  car_id: '1234',
  expected_return_date,
}

describe('Create Rental', () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider()
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider,
      carsRepositoryInMemory
    )
  })

  it('Should be able to create a new rental', async () => {
    const rentalCreated = await createRentalUseCase.execute(rental)

    expect(rentalCreated).toHaveProperty('id')
    expect(rentalCreated).toHaveProperty('start_date')
  })

  it('Should not be able to create a new rental if there is another rental open with the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute(rental)
      await createRentalUseCase.execute(rental)
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create a rental if there is another with the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute(rental)
      await createRentalUseCase.execute(rental)
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create a rental with at least 24 hours', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        ...rental,
        expected_return_date: dayjs().toDate(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
