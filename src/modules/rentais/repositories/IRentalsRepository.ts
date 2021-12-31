import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO'
import { Rental } from '../infra/typeorm/entities/Rental'

export interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>
  findById(id: string): Promise<Rental | undefined>
  findAllByUser(user_id: string): Promise<Rental[]>
  findOpenRentalByCarId(car_id: string): Promise<Rental>
  findOpenRentalByUserId(user_id: string): Promise<Rental>
}
