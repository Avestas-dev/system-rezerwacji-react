import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
/** @jsxImportSource @emotion/react */
import 'twin.macro'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useLocation } from 'react-router'
//TODO: Add toast for displaying success after login
const Specialists = () => {
  const location = useLocation()
  console.log(location)
  useEffect(() => {
    console.log(JSON.stringify(location))
  }, [location])
  const { data, isSuccess } = useQuery(['specialists'], () =>
    axios.get('/specialists').then((res) => {
      console.log(res.data)
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
