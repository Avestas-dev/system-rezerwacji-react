import { roleEnum } from '../enums/enums'

export interface userContextModel {
  id: number
  firstName: string
  lastName: string
  role: roleEnum
  email: string
  token: string
  phone: string
}
