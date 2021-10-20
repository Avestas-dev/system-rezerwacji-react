import * as React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
      <Link style={{ marginRight: 10 }} to="/">
        Główna
      </Link>
      <Link style={{ marginRight: 10 }} to="/login">
        Login
      </Link>
      <Link style={{ marginRight: 10 }} to="/register">
        Rejestracja
      </Link>
      <Link style={{ marginRight: 10 }} to="/specialists">
        Specjaliści
      </Link>
      <Link style={{ marginRight: 10 }} to="/logout">
        Logout
      </Link>
    </>
  )
}

export default Navbar
