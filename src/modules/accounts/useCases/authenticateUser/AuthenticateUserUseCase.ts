import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import auth from '@config/auth'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'

import { IncorrectEmailOrPasswordError } from './IncorrectEmailOrPasswordError'

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
  refresh_token: string
  token: string
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider') private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new IncorrectEmailOrPasswordError()
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new IncorrectEmailOrPasswordError()
    }

    const token = sign(
      {
        email: user.email,
      },
      auth.secret_token,
      {
        subject: user.id,
        expiresIn: auth.expires_in_token,
      }
    )
    const refresh_token = sign(
      {
        email,
      },
      auth.secret_refresh_token,
      {
        subject: user.id,
        expiresIn: auth.expires_in_refresh_token,
      }
    )

    await this.usersTokensRepository.create({
      expires_date: this.dateProvider.addDays(auth.expires_refresh_token_days),
      user_id: user.id,
      refresh_token,
    })

    return {
      user: {
        name: user.name,
        email: user.email,
        is_admin: user.is_admin,
      },
      token,
      refresh_token,
    }
  }
}
