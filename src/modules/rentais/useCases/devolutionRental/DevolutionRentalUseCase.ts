import { injectable, inject } from 'tsyringe'

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { Rental } from '@modules/rentais/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentais/repositories/IRentalsRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'

import { DevolutionRentalError } from './DevolutionRentalError'

interface IRequest {
  id: string
  user_id: string
}

@injectable()
export class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id)
    const car = await this.carsRepository.findById(rental.car_id)

    if (!rental) {
      throw new DevolutionRentalError.RentalDoesNotExists()
    }

    if (rental.user_id !== user_id) {
      throw new DevolutionRentalError.UserDoesNotHavePermissionToDevolution()
    }

    if (rental.end_date) {
      throw new DevolutionRentalError.CarAlreadyDevolutioned()
    }

    const minimum_daily = 1
    const dateNow = this.dateProvider.dateNow()

    let daily = this.dateProvider.compareDateInDays(rental.start_date, dateNow)

    if (daily <= minimum_daily) {
      daily = minimum_daily
    }

    const delay = this.dateProvider.compareDateInDays(
      dateNow,
      rental.expected_return_date
    )

    let total = 0

    if (delay < 0) {
      const calculate_fine = daily * car.daily_rate
      total += calculate_fine
    }

    total += car.daily_rate * daily

    rental.total = total
    rental.end_date = dateNow

    await this.rentalsRepository.create(rental)
    await this.carsRepository.updateAvailable(car.id, true)

    return rental
  }
}
