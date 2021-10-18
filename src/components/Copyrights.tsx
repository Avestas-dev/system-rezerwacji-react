import { Link, Typography } from '@mui/material'
import * as React from 'react'

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Kamil Poręba, Paweł Szantula, Konrad Żak, Szymon Uzdowski
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Copyright
