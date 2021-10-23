import React, { ReactNode } from 'react'
import { NavLink as NavLinkRouter } from 'react-router-dom'

interface NavLinkProps {
  to: string
  children: ReactNode
}

const NavLink = ({ to, children }: NavLinkProps) => {
  return (
    <NavLinkRouter
      style={{ marginRight: 13 }}
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
