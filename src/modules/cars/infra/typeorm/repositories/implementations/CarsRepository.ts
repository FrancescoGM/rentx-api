import { getRepository, Repository } from 'typeorm'

import {
  ICreateCarDTO,
  IListAllAvailableCarsFilterDTO,
} from '@modules/cars/dtos/ICreateCarDTO'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'

import { Car } from '../../entities/Car'

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  async create({
    id,
    name,
    description,
    daily_rate,
    licence_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      id,
      name,
      description,
      daily_rate,
      licence_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
    })

    await this.repository.save(car)

    return car
  }

  async findByLicencePlate(licencePlate: string): Promise<Car> {
    const car = await this.repository.findOne({
      where: { licence_plate: licencePlate },
    })

    return car
  }

  async listAllCarsAvailable({
    name,
    brand,
    category_id,
  }: IListAllAvailableCarsFilterDTO = {}): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('cars')
      .where('cars.available = :available', { available: true })

    if (name) carsQuery.andWhere('LOWER(cars.name) = LOWER(:name)', { name })
    if (brand)
      carsQuery.andWhere('LOWER(cars.brand) = LOWER(:brand)', { brand })
    if (category_id)
      carsQuery.andWhere('LOWER(cars.category_id) = LOWER(:category_id)', {
        category_id,
      })

    const cars = await carsQuery.getMany()
    return cars
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id)

    return car
  }
}
