import { Request, Response, NextFunction } from 'express'

import { PermissionError } from '@shared/errors/PermissionError'

export function ensureAdministrator(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.user.is_admin) {
    return next()
  }

  throw new PermissionError.MustBeAdministrator()
}
