import React, { useContext, useEffect } from 'react'
import UserContext from '../common/UserContext'
import Navbar from '../components/Navbar'
import SignUp from '../components/SignUp'

function Register() {
  return (
    <div>
      <Navbar />
      <SignUp />
    </div>
  )
}

export default Register
