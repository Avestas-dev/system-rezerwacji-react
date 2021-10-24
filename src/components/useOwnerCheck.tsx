import React, { useContext, useEffect, useLayoutEffect } from 'react'
import UserContext from '../common/UserContext'

const useOwnerCheck = () => {
  const userContext = useContext(UserContext)
  useLayoutEffect(() => {
    userContext.user.role === 'owner'
    window.location.href = 'http://localhost:3000/unauthorized'
  }, [])
}

export default useOwnerCheck
