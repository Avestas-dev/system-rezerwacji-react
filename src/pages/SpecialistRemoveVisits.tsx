import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import DatePicker from '@mui/lab/DatePicker'
import TextField from '@mui/material/TextField'
/** @jsxImportSource @emotion/react */
import 'twin.macro'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { pl } from 'date-fns/locale'

import { Alert, AlertColor, Button, Snackbar } from '@mui/material'
import moment from 'moment'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { removeReservationFromToRequest } from '../models/removeReservationFromToRequest'

function SpecialistRemoveVisits() {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [severity, setSeverity] = useState<AlertColor>('success')
  const [message, setMessage] = useState('')
  const [startDateValue, setStartDateValue] = useState<Date | null>(null)
  const [endDateValue, setEndDateValue] = useState<Date | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    if (!(startDateValue && endDateValue)) {
      setErrorMessage('Wszystkie pola muszą być wybrane.')
      return
    }
    if (moment(startDateValue) >= moment(endDateValue)) {
      setErrorMessage('Data początku usuwania wizyt musi być późniejsza od daty końca wizyt.')
      return
    }
    setErrorMessage('')
    removeVisitsFromToMutation.mutate({
      date_start: startDateValue,
      date_end: endDateValue,
    })
  }
  const removeVisitsFromToMutation = useMutation<any, any, removeReservationFromToRequest>(
    (removeData) => {
      return axios.post('/delete-reservation-from-to', removeData)
    },
    {
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries('specialist-visits')
        console.log(JSON.stringify(data))
        setSeverity('success')
        setOpen(true)
        setMessage(data)
      },
      onError: (err) => {
        console.log(err.response.data.msg)
        setSeverity('error')
        setOpen(true)
        setMessage(err.response.data.msg)
      },
    },
  )

  return (
    <div>
      <Navbar />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <p tw="text-center text-3xl font-bold pb-10">Usuwanie wizyt</p>
      <div tw="pb-2 ml-2 mr-2">
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={pl}>
          <div tw="grid grid-cols-2  pl-4 pr-4 pt-2 pb-2 ">
            <div tw="pr-1 text-right">
              <DatePicker
                label="Data początkowa"
                value={startDateValue}
                onChange={(newValue) => {
                  setStartDateValue(newValue)
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div tw="pl-1 text-left">
              <DatePicker
                label="Data końcowa"
                value={endDateValue}
                onChange={(newValue) => {
                  setEndDateValue(newValue)
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </div>
          <div tw="text-center">
            {errorMessage && <p tw="text-red-600">{errorMessage}</p>}
            <Button onClick={handleSubmit} tw="mt-5 " variant="contained">
              Usuń wizyty
            </Button>
          </div>
        </LocalizationProvider>
      </div>
    </div>
  )
}

export default SpecialistRemoveVisits
