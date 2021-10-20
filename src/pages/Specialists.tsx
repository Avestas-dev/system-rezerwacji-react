import React from 'react'
import Navbar from '../components/Navbar'
/** @jsxImportSource @emotion/react */
import 'twin.macro'
import { Alert, Snackbar } from '@mui/material'
import { useQuery } from 'react-query'
import axios from 'axios'

function Specialists(props: any) {
  const token = localStorage.getItem('token')

  const { data, isLoading, isSuccess } = useQuery(['specialists'], () =>
    axios.get('/specialists').then((res) => {
      console.log(res)
      return res.data
    }),
  )
  console.log(data)
  return (
    <div>
      {isSuccess && (
        <>
          <Navbar />
          <p tw="text-center text-5xl font-bold">Specjaliści</p>
        </>
      )}
    </div>
  )
}

export default Specialists
