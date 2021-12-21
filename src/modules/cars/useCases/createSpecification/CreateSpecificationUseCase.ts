import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository'

interface IRequest {
  name: string
  description: string
}

export class CreateSpecificationUseCase {
  constructor(private specificationRepository: SpecificationsRepository) {}

  execute({ name, description }: IRequest) {
    const specificationAlreadyExist =
      this.specificationRepository.findByName(name)

    if (specificationAlreadyExist) {
      throw new Error('Specification already exists')
    }

    this.specificationRepository.create({ name, description })
  }
}
