import React, { ReactNode } from 'react'
import { NavLink as NavLinkRouter } from 'react-router-dom'

interface NavLinkProps {
  to: string
  children: ReactNode
  marginRight?: number
}

const NavLink = ({ to, children, marginRight = 13 }: NavLinkProps) => {
  return (
    <NavLinkRouter
      style={{ marginRight: marginRight }}
      to={to}
      activeStyle={{
        fontWeight: 'bold',
        color: 'white',
        textUnderlineOffset: 6,
        textDecoration: 'underline',
      }}
      exact={true}
    >
      {children}
    </NavLinkRouter>
  )
}
export default NavLink
