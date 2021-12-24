import { Request, Response } from 'express'

import { AppError } from '@errors/AppError'

export function errorMessage(
  error: Error,
  req: Request,
  res: Response
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
