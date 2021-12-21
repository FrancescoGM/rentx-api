import { v4 as uuidV4 } from 'uuid'

export class Specification {
  id?: string
  name: string
  description: string
  created_at?: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
    if (!this.created_at) {
      this.created_at = new Date()
    }
  }
}
