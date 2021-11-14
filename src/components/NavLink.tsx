import React, { ReactNode } from 'react'
import { NavLink as NavLinkRouter } from 'react-router-dom'
/** @jsxImportSource @emotion/react */
import 'twin.macro'
interface NavLinkProps {
  to: string
  children: ReactNode
  marginRight?: number
  disableActiveStyles?: boolean
  exact?: boolean
}

const NavLink = ({
  to,
  children,
  marginRight = 13,
  disableActiveStyles,
  exact = true,
}: NavLinkProps) => {
  return (
    <NavLinkRouter
      style={{ marginRight: marginRight }}
      to={to}
      activeStyle={
        !disableActiveStyles
          ? {
              fontWeight: 'bold',
              color: 'white',
              textUnderlineOffset: 6,
              textDecoration: 'underline',
            }
          : {}
      }
      tw="transform hover:(scale-110) transition-duration[250ms]"
      exact={exact}
    >
      {children}
    </NavLinkRouter>
  )
}
export default NavLink
