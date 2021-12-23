import { Router } from 'express'
import multer from 'multer'

import { uploadConfig } from '../config/upload'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController'
import { UpdateUserAvatarController } from '../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController'

const uploadAvatar = multer(uploadConfig('avatar'))

export const usersRoutes = Router()

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()

usersRoutes.post('/', createUserController.handle)

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('file'),
  updateUserAvatarController.handle
)
