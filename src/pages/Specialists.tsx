import React, { useState } from 'react'
import Navbar from '../components/Navbar'
/** @jsxImportSource @emotion/react */
import 'twin.macro'
import { Alert, Snackbar } from '@mui/material'
function Specialists(props: any) {
  // const [open, setOpen] = useState(props?.location?.state?.showToast || false)
  console.log(JSON.stringify(props))
  // const handleClose = () => {
  //   setOpen(false)
  // }
  return (
    <div>
      {/* {props.location.state.showToast && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={() => setOpen} severity={'success'} sx={{ width: '100%' }}>
            Pomyślnie zarejestrowano
          </Alert>
        </Snackbar>
      )} */}
      <Navbar />
      <p tw="text-center text-5xl font-bold">Specjaliści</p>
    </div>
  )
}

export default Specialists
