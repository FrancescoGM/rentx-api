import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListRentalsByUserUseCase } from './ListRentalsByUserUseCase'

export class ListRentalsByUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listRentalsByUserUseCase = container.resolve(ListRentalsByUserUseCase)

    const { id: user_id } = req.user

    const rentals = await listRentalsByUserUseCase.execute(user_id)

    return res.status(201).json(rentals)
  }
}
