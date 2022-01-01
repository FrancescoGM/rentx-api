import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import auth from '@config/auth'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/implementations/UsersRepository'
import { JWTError } from '@shared/errors/JWTError'

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
    throw new JWTError.TokenIsMissing()
  }

  const [, token] = authToken.split(' ')

  try {
    const { sub: userId } = verify(token, auth.secret_token) as IPayload

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(userId)

    if (!user) {
      throw new JWTError.UserNotFound()
    }

    req.user = user

    next()
  } catch {
    throw new JWTError.InvalidToken()
  }
}
