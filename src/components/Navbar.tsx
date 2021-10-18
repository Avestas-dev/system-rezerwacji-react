import { Link } from '@mui/material'
import * as React from 'react'

function Navbar() {
  return (
    <>
      <Link style={{ marginRight: 10 }} href="/">
        Główna
      </Link>
      <Link style={{ marginRight: 10 }} href="/login">
        Logowanie
      </Link>
      <Link style={{ marginRight: 10 }} href="/register">
        Rejestracja
      </Link>
      <Link style={{ marginRight: 10 }} href="/specialists">
        Specjaliści
      </Link>
    </>
  )
}

export default Navbar
