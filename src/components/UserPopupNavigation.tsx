import { Menu, MenuItem } from '@mui/material'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import React, { useContext } from 'react'
import Avatar from 'react-avatar'
import UserContext from '../common/UserContext'
import NavLink from './NavLink'
/** @jsxImportSource @emotion/react */
import 'twin.macro'

const UserPopupNavigation = () => {
  const userContext = useContext(UserContext)
  return (
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
  )
}

export default UserPopupNavigation
