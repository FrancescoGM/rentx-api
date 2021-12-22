import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListCategoriesUseCase } from './ListCategoriesUseCase'

export class ListCategoriesController {
  async handle(request: Request, response: Response) {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)
    const categories = await listCategoriesUseCase.execute()

    response.json(categories)
  }
}
