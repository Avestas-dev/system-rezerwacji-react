import React, { useState } from 'react'
import Navbar from '../components/Navbar'
/** @jsxImportSource @emotion/react */
import 'twin.macro'
import SpecialistTable from '../components/SpecialistTable'
import { GridRowData } from '@mui/x-data-grid'
import { useQuery } from 'react-query'
import axios from 'axios'
import { specialistsModelResponse } from '../models/specialistsModelResponse'
import { getJobNameAndPhotoFromEnum } from '../utils/getJobNameAndPhotoFromEnum'

const rows: readonly GridRowData[] = [
  {
    id: 1,
    firstName: 'Jon',
    lastName: 'Snow',
    phone: '123456',
    email: 'test@o2.pl',
    job: 'dentist',
  },
]
const SpecialistsList = () => {
  const [rows, setRows] = useState([
    {
      id: 0,
    },
  ])
  const { data, isSuccess } = useQuery(['specialists'], () =>
    axios.get<specialistsModelResponse[]>('/specialists').then((res) => {
      setRows(
        res.data.map((specialist) => ({
          id: specialist.userId,
          firstName: specialist.user.firstName,
          lastName: specialist.user.lastName,
          phone: specialist.user.phone,
          email: specialist.user.email,
          job: getJobNameAndPhotoFromEnum(specialist.jobName).name,
        })),
      )
      return res.data
    }),
  )

  return (
    <>
      <Navbar />
      <SpecialistTable rows={rows} />
    </>
  )
}

export default SpecialistsList
