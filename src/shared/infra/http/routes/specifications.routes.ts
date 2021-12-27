import { Router } from 'express'

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController'
import { ListSpecificationsController } from '@modules/cars/useCases/listSpecifications/ListSpecificationsController'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

import { ensureAdministrator } from '../middlewares/ensureAdministrator'

export const specificationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController()
const listSpecificationsController = new ListSpecificationsController()

specificationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdministrator,
  createSpecificationController.handle
)

specificationsRoutes.get('/', listSpecificationsController.handle)
