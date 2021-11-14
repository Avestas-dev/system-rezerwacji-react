import { Menu } from '@mui/material'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import React, { ReactNode } from 'react'
/** @jsxImportSource @emotion/react */
import 'twin.macro'

interface SpecialistPopupPanelNavigationProps {
  children: ReactNode
}

const SpecialistPopupPanelNavigation = ({ children }: SpecialistPopupPanelNavigationProps) => {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <p
            tw="transform hover:(scale-110) transition-duration[250ms] cursor-pointer"
            {...bindTrigger(popupState)}
          >
            Panel
          </p>
          <Menu {...bindMenu(popupState)}>{children}</Menu>
        </>
      )}
    </PopupState>
  )
}

export default SpecialistPopupPanelNavigation
