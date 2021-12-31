import {
  ICreateCarDTO,
  IListAllAvailableCarsFilterDTO,
} from '../dtos/ICreateCarDTO'
import { Car } from '../infra/typeorm/entities/Car'

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>
  findById(id: string): Promise<Car | undefined>
  findByLicencePlate(licencePlate: string): Promise<Car | undefined>
  listAllCarsAvailable(filters: IListAllAvailableCarsFilterDTO): Promise<Car[]>
  updateAvailable(car_id: string, available: boolean): Promise<void>
}
