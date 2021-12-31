import { getRepository, Repository } from 'typeorm'

import { ICreateRentalDTO } from '@modules/rentais/dtos/ICreateRentalDTO'
import { IRentalsRepository } from '@modules/rentais/repositories/IRentalsRepository'

import { Rental } from '../entities/Rental'

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  async create({
    id,
    end_date,
    total,
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      id,
      end_date,
      total,
      car_id,
      user_id,
      expected_return_date,
    })

    await this.repository.save(rental)

    return rental
  }
  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: {
        car_id,
        end_date: null,
      },
    })

    return rental
  }
  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: {
        user_id,
        end_date: null,
      },
    })

    return rental
  }

  async findById(id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne(id)

    return rental
  }

  async findAllByUser(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: {
        user_id,
      },
      relations: ['car'],
    })

    return rentals
  }
}
