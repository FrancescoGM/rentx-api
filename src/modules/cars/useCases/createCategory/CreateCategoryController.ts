import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

export class CreateCategoryController {
  async handle(request: Request, response: Response) {
    try {
      const { name, description } = request.body

      const createCategoryUseCase = container.resolve(CreateCategoryUseCase)

      await createCategoryUseCase.execute({
        name,
        description,
      })

      return response.status(201).end()
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      })
    }
  }
}
