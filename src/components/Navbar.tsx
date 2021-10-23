import React, { useContext } from 'react'

import UserContext from '../common/UserContext'
/** @jsxImportSource @emotion/react */
import 'twin.macro'
import Avatar from 'react-avatar'
import { Menu, MenuItem } from '@mui/material'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import NavLink from './NavLink'

function Navbar() {
  const userContext = useContext(UserContext)

  return (
    <div tw="bg-blue-800 text-white pt-5 pb-5 pl-3 pr-3 w-screen flex mb-5">
      <div tw="flex">
        <NavLink to="/">Główna</NavLink>
        <NavLink to="/register">Rejestracja</NavLink>
        {userContext.user.firstName && <NavLink to="/specialists">Specjaliści</NavLink>}
      </div>
      <div tw="flex ml-auto ">
        {userContext.user.firstName && (
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <>
                <Avatar
                  name={userContext.user.firstName + ' ' + userContext.user.lastName}
                  size="25"
                  tw="mr-2"
                  round
                  {...bindTrigger(popupState)}
                />

                <Menu {...bindMenu(popupState)}>
                  <NavLink marginRight={0} to="/logout">
                    <MenuItem>Logout</MenuItem>
                  </NavLink>
                </Menu>
              </>
            )}
          </PopupState>
        )}
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
