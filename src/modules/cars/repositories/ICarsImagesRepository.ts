import { ICreateCarImageDTO } from '../dtos/ICreateCarImageDTO'
import { CarImage } from '../infra/typeorm/entities/CarImage'

export interface ICarsImagesRepository {
  create(data: ICreateCarImageDTO): Promise<CarImage>
}
