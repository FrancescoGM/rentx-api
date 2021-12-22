import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListSpecificationsUseCase } from './ListSpecificationsUseCase'

export class ListSpecificationsController {
  async handle(request: Request, response: Response) {
    const listSpecificationsUseCase = container.resolve(
      ListSpecificationsUseCase
    )
    const categories = await listSpecificationsUseCase.execute()

    response.json(categories)
  }
}
