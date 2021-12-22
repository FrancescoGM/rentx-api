import { getRepository, Repository } from 'typeorm'

import { Specification } from '../../entities/Specification'
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository'

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  async create(data: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name: data.name,
      description: data.description,
    })

    await this.repository.save(specification)
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find()
    return specifications
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ where: { name } })

    return specification
  }
}
