import { Grid } from '@mui/material'
import React from 'react'
/** @jsxImportSource @emotion/react */
import 'twin.macro'
import PersonCard from './PersonCard'
import { specialistsModelResponse } from '../models/specialistsModelResponse'

interface SpecialistsGridProps {
  data: specialistsModelResponse[] | undefined
}

const SpecialistsGrid = ({ data }: SpecialistsGridProps) => {
  console.log(data)
  return (
    <Grid container spacing={3} alignItems="center" justifyContent="center">
      {data?.map((specialist) => (
        <Grid key={specialist.userId} item xs={4} md={3} lg={2} justifySelf="center">
          <PersonCard
            firstName={specialist.user.firstName}
            lastName={specialist.user.lastName}
            job={specialist.jobName}
            id={specialist.userId}
          />
        </Grid>
      ))}
    </Grid>
  )
}
export default SpecialistsGrid
