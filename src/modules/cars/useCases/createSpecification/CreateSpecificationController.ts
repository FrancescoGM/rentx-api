import { Request, Response } from 'express'

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

export class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  handle(request: Request, response: Response) {
    try {
      const { name, description } = request.body

      this.createSpecificationUseCase.execute({ name, description })

      return response.status(201).end()
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      })
    }
  }
}
