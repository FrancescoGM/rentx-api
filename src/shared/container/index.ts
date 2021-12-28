import { container } from 'tsyringe'
import './providers'

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/implementations/UsersRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/implementations/CarsImagesRepository'
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/implementations/CarsRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/implementations/CategoriesRepository'
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/implementations/SpecificationsRepository'
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import { RentalsRepository } from '@modules/rentais/infra/typeorm/repositories/RentalsRepository'
import { IRentalsRepository } from '@modules/rentais/repositories/IRentalsRepository'

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository)

container.registerSingleton<ICarsImagesRepository>(
  'CarsImagesRepository',
  CarsImagesRepository
)

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository
)
