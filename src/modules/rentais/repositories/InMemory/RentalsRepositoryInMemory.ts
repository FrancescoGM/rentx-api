import { ICreateRentalDTO } from '@modules/rentais/dtos/ICreateRentalDTO'
import { Rental } from '@modules/rentais/infra/typeorm/entities/Rental'

import { IRentalsRepository } from '../IRentalsRepository'

export class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = []

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental()

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    })

    this.rentals.push(rental)

    return rental
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    )

    return rental
  }
  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    )

    return rental
  }
}
