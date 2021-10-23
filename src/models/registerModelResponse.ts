import { roleEnum } from '../enums/enums'

export interface registerModelResponse {
  data: {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
    role: roleEnum
    token: string
  }
}
