import crypto from 'crypto'
import multer from 'multer'
import { resolve } from 'path'

export function uploadConfig(folder: string) {
  return {
    storage: multer.diskStorage({
      destination: resolve(__dirname, '..', '..', 'tmp', folder),
      filename: (req, file, callback) => {
        const fileHash = crypto.randomBytes(16).toString('hex')
        const fileName = `${fileHash}-${file.originalname}`
        callback(null, fileName)
      },
    }),
  }
}
