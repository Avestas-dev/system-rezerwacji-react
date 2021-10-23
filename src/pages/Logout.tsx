import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import resetUserStorage from '../utils/resetUserStorage'
import { useHistory } from 'react-router'
import { clearUserContext } from '../common/UserContext'
const Logout = () => {
  resetUserStorage()
  clearUserContext()
  const routerHistory = useHistory()
  useEffect(() => {
    routerHistory.push('/')
  }, [])
  return (
    <div>
      <Navbar />
      <p>You have been logged out.</p>
    </div>
  )
}

export default Logout
