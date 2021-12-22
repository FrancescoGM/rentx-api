import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

export class CreateSpecificationController {
  async handle(request: Request, response: Response) {
    try {
      const createSpecificationUseCase = container.resolve(
        CreateSpecificationUseCase
      )
      const { name, description } = request.body

      await createSpecificationUseCase.execute({ name, description })

      return response.status(201).end()
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      })
    }
  }
}
