import { roleEnum } from '../enums/enums'

export interface loginModelResponse {
  data: {
    email: string
    firstName: string
    id: number
    lastName: string
    phone: string
    role: roleEnum
    token: string
  }
}
