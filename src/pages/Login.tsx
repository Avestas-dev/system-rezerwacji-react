import React, { useContext, useEffect } from 'react'
import UserContext from '../common/UserContext'
import Navbar from '../components/Navbar'
import SignIn from '../components/SignIn'

function Login() {
  return (
    <div>
      <Navbar />
      <SignIn />
    </div>
  )
}

export default Login
