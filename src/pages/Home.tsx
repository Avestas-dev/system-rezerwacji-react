import React from 'react'
/** @jsxImportSource @emotion/react */
import 'twin.macro'
import Navbar from '../components/Navbar'

function Home() {
  const token = localStorage.getItem('token')
  return (
    <div>
      <Navbar />
      <p tw="font-bold text-center text-5xl ">Strona startowa</p>
      {token && 'Użytkownik zalogowany'}
    </div>
  )
}

export default Home
