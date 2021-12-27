import { Specification } from '../infra/typeorm/entities/Specification'

export interface ICreateCarDTO {
  id?: string
  name: string
  description: string
  daily_rate: number
  licence_plate: string
  fine_amount: number
  brand: string
  category_id: string
  specifications?: Specification[]
}

export interface IListAllAvailableCarsFilterDTO {
  name?: string
  brand?: string
  category_id?: string
}
