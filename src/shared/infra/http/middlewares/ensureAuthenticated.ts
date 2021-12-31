import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import auth from '@config/auth'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/implementations/UsersRepository'
import { AppError } from '@shared/errors/AppError'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization as string

  if (!authToken) {
    throw new AppError('Token is missing', 401)
  }

  const [, token] = authToken.split(' ')

  try {
    const { sub: userId } = verify(token, auth.secret_token) as IPayload

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(userId)

    if (!user) {
      throw new AppError('User does not exists', 401)
    }

    req.user = user

    next()
  } catch {
    throw new AppError('Token invalid', 400)
  }
}
