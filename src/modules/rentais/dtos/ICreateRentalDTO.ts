export interface ICreateRentalDTO {
  id?: string
  end_date?: Date
  total?: number
  user_id: string
  car_id: string
  expected_return_date: Date
}
