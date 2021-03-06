import { Router } from 'express'
import multer from 'multer'

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController'
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController'
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController'

import { ensureAdministrator } from '../middlewares/ensureAdministrator'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export const categoriesRoutes = Router()
const upload = multer({ dest: './tmp' })

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdministrator,
  createCategoryController.handle
)
categoriesRoutes.get('/', listCategoriesController.handle)
categoriesRoutes.post(
  '/import',
  ensureAuthenticated,
  ensureAdministrator,
  upload.single('file'),
  importCategoryController.handle
)
