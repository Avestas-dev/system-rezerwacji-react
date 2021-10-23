import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import UserContext from '../common/UserContext'

const ContextUpdate = () => {
  const userContext = useContext(UserContext)
  const token = localStorage.getItem('token')

  useQuery('context-fill', () =>
    axios.get('/user-by-token').then((res: any) => {
      if (res && res?.data) {
        if (token) {
          userContext.setUser(res.data)
        }
      }
    }),
  )
  return <div />
}

export default ContextUpdate
