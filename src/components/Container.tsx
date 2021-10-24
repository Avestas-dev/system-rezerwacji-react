import React, { ReactNode } from 'react'

interface containerInterface {
  marginHorizontal?: number
  marginBottom?: number
  children?: ReactNode
}

const Container = ({
  marginHorizontal = 16,
  children = null,
  marginBottom = 16,
}: containerInterface) => {
  return (
    <div
      style={{ marginBottom, marginLeft: marginHorizontal / 2, marginRight: marginHorizontal / 2 }}
    >
      {children}
    </div>
  )
}

export default Container
