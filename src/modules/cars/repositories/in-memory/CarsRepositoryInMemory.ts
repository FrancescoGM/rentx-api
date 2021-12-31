import {
  ICreateCarDTO,
  IListAllAvailableCarsFilterDTO,
} from '@modules/cars/dtos/ICreateCarDTO'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'

import { ICarsRepository } from '../ICarsRepository'

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []

  async findByLicencePlate(licencePlate: string): Promise<Car> {
    return this.cars.find((car) => car.licence_plate === licencePlate)
  }

  async create({
    id,
    name,
    description,
    licence_plate,
    daily_rate,
    fine_amount,
    brand,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      id,
      name,
      description,
      licence_plate,
      daily_rate,
      fine_amount,
      brand,
      category_id,
      specifications,
    })

    const cars = this.cars.filter((item) => (id ? item.id !== id : true))

    this.cars = [...cars, car]

    return car
  }

  async listAllCarsAvailable({
    name,
    brand,
    category_id,
  }: IListAllAvailableCarsFilterDTO = {}): Promise<Car[]> {
    let cars = this.cars.filter((car) => car.available)

    if (name) cars = cars.filter((car) => car.name === name)
    if (brand) cars = cars.filter((car) => car.brand === brand)
    if (category_id)
      cars = cars.filter((car) => car.category_id === category_id)

    return cars
  }

  async findById(id: string): Promise<Car | undefined> {
    const car = this.cars.find((car) => car.id === id)

    return car
  }

  async updateAvailable(car_id: string, available: boolean): Promise<void> {
    const car = this.cars.find((car) => car.id === car_id)

    if (car) {
      car.available = available
    }
  }
}
