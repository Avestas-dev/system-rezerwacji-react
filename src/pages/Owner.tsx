import React from 'react'
import Navbar from '../components/Navbar'
/** @jsxImportSource @emotion/react */
import 'twin.macro'

import useOwnerCheck from '../components/useOwnerCheck'
function Owner() {
  useOwnerCheck()
  return (
    <div>
      <Navbar />
      <p tw="text-center text-5xl font-bold">Owner</p>
    </div>
  )
}

export default Owner
