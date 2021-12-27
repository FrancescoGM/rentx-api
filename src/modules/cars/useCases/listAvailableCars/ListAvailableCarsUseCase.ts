import { inject, injectable } from 'tsyringe'

import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'

interface IRequest {
  name?: string
  brand?: string
  category_id?: string
}

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ brand, category_id, name }: IRequest = {}): Promise<Car[]> {
    const list = await this.carsRepository.listAllCarsAvailable({
      brand,
      category_id,
      name,
    })
    return list
  }
}
