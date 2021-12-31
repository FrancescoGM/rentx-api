import { inject, injectable } from 'tsyringe'

import { Rental } from '@modules/rentais/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentais/repositories/IRentalsRepository'

@injectable()
export class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute(user_id: string): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.findAllByUser(user_id)

    return rentals
  }
}
