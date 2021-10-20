import React from 'react'
import Navbar from '../components/Navbar'
import resetUserStorage from '../utils/resetUseStorage'

const Logout = () => {
  resetUserStorage()
  //TODO: change this to env variable
  window.location.href = 'http://localhost:3000/'
  return (
    <div>
      <Navbar />
      <p>You have been logged out.</p>
    </div>
  )
}

export default Logout
