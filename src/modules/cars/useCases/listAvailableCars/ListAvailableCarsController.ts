import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

interface IQueryParams {
  name?: string
  brand?: string
  category_id?: string
}

export class ListAvailableCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase)
    const { brand, category_id, name } = req.query as IQueryParams

    const list = await listAvailableCarsUseCase.execute({
      brand,
      category_id,
      name,
    })

    return res.status(201).json(list)
  }
}
