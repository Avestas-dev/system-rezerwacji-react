import React, { useContext } from 'react'

import UserContext from '../common/UserContext'
/** @jsxImportSource @emotion/react */
import 'twin.macro'
import NavLink from './NavLink'
import UserPopupNavigation from './UserPopupNavigation'
import SpecialistPopupPanelNavigation from './SpecialistPopupPanelNavigation'
import { MenuItem } from '@mui/material'

function Navbar() {
  const userContext = useContext(UserContext)
  return (
    <div>
      <div
        style={{ fontFamily: 'Allerta Stencil' }}
        tw="bg-blue-800 text-white font-size[30px] pt-5 pb-5 pl-3 pr-3 text-center "
      >
        SYSTEM REZERWACJI TERMINÓW WIZYT
      </div>
      <div tw="bg-blue-800 text-white pb-5 pl-3 pr-3 flex mb-5">
        <div tw="flex">
          <NavLink to="/">Główna</NavLink>
          {!userContext.user.firstName && <NavLink to="/register">Rejestracja</NavLink>}
          {userContext.user.firstName && <NavLink to="/specialists">Specjaliści</NavLink>}
          {userContext.user.role === 'client' && (
            <NavLink to="/user-reservations">Rezerwacje</NavLink>
          )}
        </div>
        {userContext.user.role === 'owner' && (
          <SpecialistPopupPanelNavigation>
            <>
              <NavLink disableActiveStyles marginRight={0} to="/specialists-list">
                <MenuItem>Lista specjalistów</MenuItem>
              </NavLink>
              <NavLink disableActiveStyles marginRight={0} to="/specialist-add">
                <MenuItem>Dodaj specjalistę</MenuItem>
              </NavLink>
            </>
          </SpecialistPopupPanelNavigation>
        )}
        {userContext.user.role === 'specialist' && (
          <SpecialistPopupPanelNavigation>
            <>
              <NavLink disableActiveStyles marginRight={0} to="/add-visit">
                <MenuItem>Dodaj wizytę</MenuItem>
              </NavLink>
              <NavLink disableActiveStyles marginRight={0} to="/show-visits">
                <MenuItem>Pokaż wizyty</MenuItem>
              </NavLink>
              <NavLink disableActiveStyles marginRight={0} to="/delete-visits">
                <MenuItem>Usuń wizyty</MenuItem>
              </NavLink>
            </>
          </SpecialistPopupPanelNavigation>
        )}
        <div tw="flex ml-auto ">
          {userContext.user.firstName && <UserPopupNavigation />}
          {!userContext.user.firstName && (
            <NavLink tw="inline" to="/login">
              <div tw="flex">Login</div>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
