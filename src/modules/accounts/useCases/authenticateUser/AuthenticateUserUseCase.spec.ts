import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'

import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let usersRepositoryInMemory: UsersRepositoryInMemory
let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserUseCase

const user: ICreateUserDTO = {
  name: 'John Doe',
  email: 'johndoe@johndoe.com',
  password: '123456',
  driver_license: '123456789',
}

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    )
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('Should be able to authenticate an user', async () => {
    await createUserUseCase.execute(user)

    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toHaveProperty('name', user.name)
    expect(response.user).toHaveProperty('email', user.email)
  })

  it('Should not be able to authenticate an user with non-existing user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'johndoe@johndoe.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to authenticate an user with wrong password', async () => {
    await createUserUseCase.execute(user)

    expect(async () => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrong-password',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
