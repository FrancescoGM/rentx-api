import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateUserAvatarUserCase } from './UpdateUserAvatarUseCase'

export class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user
    const avatar_filename = req.file.filename

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUserCase)

    await updateUserAvatarUseCase.execute({ userId, avatar_filename })
    return res.status(204).send()
  }
}
