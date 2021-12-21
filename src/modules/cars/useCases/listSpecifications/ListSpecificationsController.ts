import { Request, Response } from 'express'

import { ListSpecificationsUseCase } from './ListSpecificationsUseCase'

export class ListSpecificationsController {
  constructor(private listSpecificationsUseCase: ListSpecificationsUseCase) {}

  handle(request: Request, response: Response) {
    const categories = this.listSpecificationsUseCase.execute()

    response.json(categories)
  }
}
