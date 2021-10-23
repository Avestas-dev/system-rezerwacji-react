import { roleEnum } from '../enums/enums'

export interface userByTokenResponse {
  id: number
  firstName: 'string'
  lastName: 'string'
  email: 'string'
  phone: 'string'
  token: 'string'
  role: roleEnum
}
