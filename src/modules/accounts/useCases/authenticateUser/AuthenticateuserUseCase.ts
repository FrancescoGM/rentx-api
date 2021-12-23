import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { AppError } from '../../../../errors/AppError'
import { IUsersRepository } from '../../repositories/IUsersRepository'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
    is_admin: boolean
  }
  token: string
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  async execute(data: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(data.email)

    if (!user) {
      throw new AppError('Email or password incorrect', 400)
    }

    const passwordMatched = await compare(data.password, user.password)

    if (!passwordMatched) {
      throw new AppError('Email or password incorrect', 400)
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
        is_admin: user.is_admin,
      },
      '644672066f00fc7eb6788c0be00b7a09',
      {
        subject: user.id,
        expiresIn: '1d',
      }
    )

    return {
      user: {
        name: user.name,
        email: user.email,
        is_admin: user.is_admin,
      },
      token,
    }
  }
}
