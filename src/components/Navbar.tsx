import React, { useContext } from 'react'

import UserContext from '../common/UserContext'
/** @jsxImportSource @emotion/react */
import 'twin.macro'
import NavLink from './NavLink'
import UserPopupNavigation from './UserPopupNavigation'

function Navbar() {
  const userContext = useContext(UserContext)
  console.log(userContext.user.role)
  return (
    <div tw="bg-blue-800 text-white pt-5 pb-5 pl-3 pr-3 w-screen flex mb-5">
      <div tw="flex">
        <NavLink to="/">Główna</NavLink>
        <NavLink to="/register">Rejestracja</NavLink>
        {userContext.user.firstName && <NavLink to="/specialists">Specjaliści</NavLink>}
      </div>
      {userContext.user.role === 'owner' && <NavLink to="/owner">Panel</NavLink>}

      <div tw="flex ml-auto ">
        {userContext.user.firstName && <UserPopupNavigation />}
        {!userContext.user.firstName && (
          <NavLink tw="inline" to="/login">
            <div tw="flex">Login</div>
          </NavLink>
        )}
      </div>
    </div>
  )
}

export default Navbar
