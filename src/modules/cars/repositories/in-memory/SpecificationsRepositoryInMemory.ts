import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository'

export class SpecificationsRepositoryInMemory
  implements ISpecificationsRepository
{
  specifications: Specification[] = []

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification()

    Object.assign(specification, {
      name,
      description,
    })

    this.specifications.push(specification)
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    )

    return specification
  }

  async list(): Promise<Specification[]> {
    return this.specifications
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specification = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    )

    return specification
  }
}
