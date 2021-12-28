import { inject, injectable } from 'tsyringe'

import { Rental } from '@modules/rentais/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentais/repositories/IRentalsRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'

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
    private dateProvider: IDateProvider
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
      throw new AppError(
        'Expected return date must be at least 24 hours from now',
        400
      )
    }

    const carAlreadyRented = await this.rentalsRepository.findOpenRentalByCarId(
      car_id
    )

    if (carAlreadyRented) {
      throw new AppError('Car already rented', 400)
    }

    const userAlreadyRented =
      await this.rentalsRepository.findOpenRentalByUserId(user_id)

    if (userAlreadyRented) {
      throw new AppError('User already rented a car', 400)
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    })

    return rental
  }
}
