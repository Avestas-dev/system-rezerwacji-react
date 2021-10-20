import React, { useContext } from 'react'
/** @jsxImportSource @emotion/react */
import 'twin.macro'
import UserContext from '../common/UserContext'
import Navbar from '../components/Navbar'

function Home() {
  const userContext = useContext(UserContext)
  const token = localStorage.getItem('token')
  return (
    <div>
      <Navbar />
      <p>{userContext.user.firstName}</p>
      <p tw="font-bold text-center text-5xl ">Strona startowa</p>
      {token && 'Użytkownik zalogowany'}
    </div>
  )
}

export default Home
