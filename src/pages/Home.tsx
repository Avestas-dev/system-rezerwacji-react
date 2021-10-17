import React from 'react'
import Navbar from '../components/Navbar'
/** @jsxImportSource @emotion/react */
import tw from 'twin.macro'

function Home() {
  return (
    <div>
      <Navbar />
      <p tw="font-bold text-center text-5xl ">Strona startowa</p>
    </div>
  )
}

export default Home
