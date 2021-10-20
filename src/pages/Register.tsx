import React, { useContext, useEffect } from 'react'
import UserContext from '../common/UserContext'
import Navbar from '../components/Navbar'
import SignUp from '../components/SignUp'

function Register() {
  const userContext = useContext(UserContext)
  useEffect(() => {
    userContext.setUser({
      id: 0,
      firstName: 'Register',
      lastName: '',
      role: '',
      email: '',
      token: '',
    })
  }, [])
  return (
    <div>
      <Navbar />
      <p>{userContext.user.firstName}</p>
      <SignUp />
    </div>
  )
}

export default Register
