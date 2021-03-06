import { Specification } from '../infra/typeorm/entities/Specification'

export interface ICreateSpecificationDTO {
  name: string
  description: string
}

export interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): Promise<void>
  findByName(name: string): Promise<Specification>
  list(): Promise<Specification[]>
  findByIds(ids: string[]): Promise<Specification[]>
}
