import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity('cars_image')
export class CarImage {
  @PrimaryColumn('uuid')
  id: string

  @Column('uuid')
  car_id: string

  @Column('varchar')
  image_name: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}
