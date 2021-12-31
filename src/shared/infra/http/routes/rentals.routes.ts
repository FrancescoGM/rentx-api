import { Router } from 'express'

import { CreateRentalController } from '@modules/rentais/useCases/createRental/CreateRentalController'
import { DevolutionRentalController } from '@modules/rentais/useCases/devolutionRental/DevolutionRentalController'
import { ListRentalsByUserController } from '@modules/rentais/useCases/listRentalsByUser/ListRentalsByUserController'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export const rentalRoutes = Router()

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()
const listRentalsByUserController = new ListRentalsByUserController()

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle)
rentalRoutes.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle
)
rentalRoutes.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle
)
