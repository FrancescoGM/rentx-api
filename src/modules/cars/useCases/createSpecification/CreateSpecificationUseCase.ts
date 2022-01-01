import { inject, injectable } from 'tsyringe'

import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'

import { CreateSpecificationError } from './CreateSpecificationError'

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
      throw new CreateSpecificationError()
    }

    await this.specificationRepository.create({ name, description })
  }
}
