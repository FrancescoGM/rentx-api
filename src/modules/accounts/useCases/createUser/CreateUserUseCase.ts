import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@errors/AppError'
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('User already exists.', 400)
    }

    const hashedPassword = await hash(password, 8)

    await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      driver_license,
    })
  }
}
