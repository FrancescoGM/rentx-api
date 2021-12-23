import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body
      const createUserUseCase = container.resolve(CreateUserUseCase)

      await createUserUseCase.execute(data)
      return res.status(201).send()
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
}
