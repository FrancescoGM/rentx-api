import { Request, Response, NextFunction } from 'express'

import { AppError } from '@shared/errors/AppError'

export function ensureAdministrator(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.user.is_admin) {
    return next()
  }

  throw new AppError('You must be an administrator to access this route', 401)
}
