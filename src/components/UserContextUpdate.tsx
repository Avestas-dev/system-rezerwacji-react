import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import UserContext from '../common/UserContext'
import { userByTokenResponse } from '../models/userByTokenResponse'

const UserContextUpdate = () => {
  const userContext = useContext(UserContext)
  const token = localStorage.getItem('token')

  useQuery(
    'context-fill',
    () =>
      axios.get<userByTokenResponse>('/user-by-token').then((res) => {
        if (res && res?.data) {
          if (token) {
            userContext.setUser(res.data)
          }
        }
      }),
    { enabled: !!token },
  )
  return <div />
}

export default UserContextUpdate
