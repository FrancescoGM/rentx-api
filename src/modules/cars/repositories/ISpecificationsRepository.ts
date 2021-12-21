import { Specification } from '../models/Specification'

export interface ICreateSpecificationDTO {
  name: string
  description: string
}

export interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): void
  findByName(name: string): Specification
  list(): Specification[]
}
