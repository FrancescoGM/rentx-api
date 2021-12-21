import { Specification } from '../../models/Specification'
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository'

export class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[]

  private static INSTANCE: SpecificationsRepository

  private constructor() {
    this.specifications = []
  }

  static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository()
    }

    return SpecificationsRepository.INSTANCE
  }

  create(data: ICreateSpecificationDTO) {
    const specification = new Specification()
    Object.assign(specification, data)

    this.specifications.push(specification)
  }

  list(): Specification[] {
    return this.specifications
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    )

    if (!specification) {
      throw new Error('Specification not found')
    }

    return specification
  }
}
