import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UploadCarImagesUseCase } from './UploadCarImagesUseCase'

export class UploadCarImagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase)
    const images = req.files as Express.Multer.File[]
    const { id: car_id } = req.params

    const images_name = images.map((image) => image.filename)

    await uploadCarImagesUseCase.execute({
      car_id,
      images_name,
    })

    return res.status(204).send()
  }
}
