/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'

import { AppError } from '@shared/errors/AppError'

export function errorMessage(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    })
  }

  return res
    .status(500)
    .json({ message: `Internal server error - ${error.message}` })
}
