/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext } from 'react'

interface userContextModel {
  id: number
  firstName: string
  lastName: string
  role: string
  email: string
  token: string
}

export const initData = {
  id: 0,
  firstName: '',
  lastName: '',
  role: '',
  email: '',
  token: '',
}

const UserContext = createContext({
  user: initData,
  setUser: (user: userContextModel) => {},
})

export default UserContext
