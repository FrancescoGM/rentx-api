import { inject, injectable } from 'tsyringe'

import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'

import { CreateCarError } from './CreateCarError'

interface IRequest {
  name: string
  description: string
  daily_rate: number
  licence_plate: string
  fine_amount: number
  brand: string
  category_id: string
}

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}
  async execute({
    name,
    description,
    daily_rate,
    licence_plate,
    fine_amount,
    brand,
    category_id,
  }: IRequest): Promise<Car> {
    const cartAlreadyExists = await this.carsRepository.findByLicencePlate(
      licence_plate
    )

    if (cartAlreadyExists) {
      throw new CreateCarError()
    }

    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      licence_plate,
      fine_amount,
      brand,
      category_id,
    })

    return car
  }
}
