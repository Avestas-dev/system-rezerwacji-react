/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext, useEffect } from 'react'
import { userContextModel } from '../models/userContextModel'

export const initData = {
  id: 0,
  firstName: '',
  lastName: '',
  phone: '',
  role: '',
  email: '',
  token: '',
}

const UserContext = createContext({
  user: initData,
  setUser: (user: userContextModel) => {},
})

export const clearUserContext = () => {
  const userContext = useContext(UserContext)
  useEffect(() => {
    userContext.setUser(initData)
  }, [])
}

export default UserContext
