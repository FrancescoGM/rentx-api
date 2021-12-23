import { inject, injectable } from 'tsyringe'

import { AppError } from '../../../../errors/AppError'
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository'

interface IRequest {
  name: string
  description: string
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: ISpecificationsRepository
  ) {}
  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExist =
      await this.specificationRepository.findByName(name)

    if (specificationAlreadyExist) {
      throw new AppError('Specification already exists', 400)
    }

    await this.specificationRepository.create({ name, description })
  }
}
