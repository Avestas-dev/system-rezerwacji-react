import React, { useContext } from 'react'

import UserContext from '../common/UserContext'
/** @jsxImportSource @emotion/react */
import 'twin.macro'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import Avatar from 'react-avatar'
import { Button, Menu, MenuItem } from '@mui/material'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import ContextUpdate from './ContextUpdate'
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
                  <MenuItem>
                    <NavLink to="/logout">Logout</NavLink>
                  </MenuItem>
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
