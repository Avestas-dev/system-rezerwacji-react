import React from 'react'
import Navbar from '../components/Navbar'
/** @jsxImportSource @emotion/react */
import 'twin.macro'
import { useQuery } from 'react-query'
import axios from 'axios'
import Container from '../components/Container'
import SpecialistsGrid from '../components/SpecialistsGrid'
import { specialistsModelResponse } from '../models/specialistsModelResponse'
//TODO: Add toast for displaying success after login
const Specialists = () => {
  const { data, isSuccess } = useQuery(['specialists'], () =>
    axios.get<specialistsModelResponse[]>('/specialists').then((res) => {
      return res.data
    }),
  )
  return (
    <div>
      {isSuccess && (
        <>
          <Navbar />
          <Container marginBottom={10}>
            <p tw="text-center text-3xl font-bold pb-10">Specialiści</p>

            <SpecialistsGrid data={data} />
          </Container>
        </>
      )}
    </div>
  )
}

export default Specialists
