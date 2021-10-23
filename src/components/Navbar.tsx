import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../common/UserContext'
/** @jsxImportSource @emotion/react */
import 'twin.macro'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import Avatar from 'react-avatar'

function Navbar() {
  const userContext = useContext(UserContext)

  return (
    <div tw="bg-blue-800 text-white pt-5 pb-5 pl-3 pr-3 w-screen flex mb-5">
      <div tw="flex">
        <Link style={{ marginRight: 13 }} to="/">
          Główna
        </Link>

        <Link style={{ marginRight: 13 }} to="/register">
          Rejestracja
        </Link>

        {userContext.user.firstName && (
          <Link style={{ marginRight: 13 }} to="/specialists">
            Specjaliści
          </Link>
        )}
      </div>
      <div tw="flex ml-auto">
        {userContext.user.firstName && (
          <Link style={{ marginRight: 13 }} to="/logout">
            <Avatar
              name={userContext.user.firstName + ' ' + userContext.user.lastName}
              size="20"
              tw="mr-2"
              round
            />
            Logout
            <LogoutIcon sx={{ color: 'white' }} tw="ml-1" />
          </Link>
        )}
        {!userContext.user.firstName && (
          <Link tw="inline" style={{ marginRight: 13 }} to="/login">
            <div tw="flex">
              Login
              <LoginIcon sx={{ color: 'white' }} tw="ml-1" />
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
