import React, { useContext, useEffect } from 'react'
import UserContext from '../common/UserContext'
import Navbar from '../components/Navbar'
import SignIn from '../components/SignIn'

function Login() {
  const userContext = useContext(UserContext)
  useEffect(() => {
    userContext.setUser({ id: 0, firstName: 'Login', lastName: '', role: '', email: '', token: '' })
  }, [])
  return (
    <div>
      <Navbar />
      {<p>{userContext.user.firstName}</p>}
      <SignIn />
    </div>
  )
}

export default Login
