import React, { useContext, useEffect, useLayoutEffect } from 'react'
import UserContext from '../common/UserContext'

const useOwnerCheck = () => {
  const userContext = useContext(UserContext)
  useLayoutEffect(() => {
    if (userContext.user.role !== 'owner') {
      console.log('something is wrong')
      window.location.href = 'http://localhost:3000/unauthorized'
    }
  }, [])
}

export default useOwnerCheck
