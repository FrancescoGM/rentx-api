import { Request, Response } from 'express'

import { ListCategoriesUseCase } from './ListCategoriesUseCase'

export class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  handle(request: Request, response: Response) {
    const categories = this.listCategoriesUseCase.execute()

    response.json(categories)
  }
}
