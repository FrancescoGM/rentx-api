import { Request, Response } from 'express'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

export class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  handle(request: Request, response: Response) {
    try {
      const { name, description } = request.body

      this.createCategoryUseCase.execute({
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
