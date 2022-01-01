import { inject, injectable } from 'tsyringe'

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { Rental } from '@modules/rentais/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentais/repositories/IRentalsRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'

import { CreateRentalError } from './CreateRentalError'

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}
  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const compareDate = this.dateProvider.compareDateInHours(
      this.dateProvider.dateNow(),
      expected_return_date
    )
    const minimumHours = 24

    if (compareDate < minimumHours) {
      throw new CreateRentalError.ExpectReturnDate()
    }

    const carAlreadyRented = await this.rentalsRepository.findOpenRentalByCarId(
      car_id
    )

    if (carAlreadyRented) {
      throw new CreateRentalError.CarAlreadyRented()
    }

    const userAlreadyRented =
      await this.rentalsRepository.findOpenRentalByUserId(user_id)

    if (userAlreadyRented) {
      throw new CreateRentalError.UserAlreadyRented()
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    })

    await this.carsRepository.updateAvailable(car_id, false)

    return rental
  }
}
