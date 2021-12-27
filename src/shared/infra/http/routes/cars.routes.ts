import { Router } from 'express'
import multer from 'multer'

import { uploadConfig } from '@config/upload'
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImage/UploadCarImagesController'

import { ensureAdministrator } from '../middlewares/ensureAdministrator'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const upload = multer(uploadConfig('cars'))

export const carsRoutes = Router()

const createCarsController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImagesController = new UploadCarImagesController()

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdministrator,
  createCarsController.handle
)

carsRoutes.get('/available', listAvailableCarsController.handle)
carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdministrator,
  createCarSpecificationController.handle
)
carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdministrator,
  upload.array('images'),
  uploadCarImagesController.handle
)
