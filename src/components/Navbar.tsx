import { Link } from '@mui/material'
import * as React from 'react'

function Navbar() {
  return (
    <>
      <Link style={{ marginRight: 10 }} href="/">
        Home
      </Link>
      <Link style={{ marginRight: 10 }} href="/login">
        Login
      </Link>
      <Link style={{ marginRight: 10 }} href="/register">
        Register
      </Link>
    </>
  )
}

export default Navbar
