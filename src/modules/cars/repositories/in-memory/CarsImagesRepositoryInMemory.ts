import { ICreateCarImageDTO } from '@modules/cars/dtos/ICreateCarImageDTO'
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage'

import { ICarsImagesRepository } from '../ICarsImagesRepository'

export class CarsImagesRepositoryInMemory implements ICarsImagesRepository {
  carsImages: CarImage[] = []

  async create({ car_id, image_name }: ICreateCarImageDTO): Promise<CarImage> {
    const carImage = new CarImage()

    Object.assign(carImage, {
      car_id,
      image_name,
    })
    this.carsImages.push(carImage)

    return carImage
  }
}
